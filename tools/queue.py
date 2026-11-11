"""產生可輪替的複核佇列（純既有欄位計算，不連外、不寫入資料）。

為什麼需要這支工具：每輪的挑選規則都寫在當輪的臨時腳本裡，結果 2026-11-10 一天五輪之間
`taipei-youth-ai-subscription-subsidy-2026` 與 `amazon-ara-multilingual-contextual-ai-fall-2026`
各被複核 3 次（實際間隔 1–2 小時），同一時間卻有 621 筆可行動紀錄超過 24 小時沒被碰過、
嚴格逾期 0 筆。把規則固定成「逾期 > 即將到期 > 輪替補位，且 12 小時內已核者不再排入」，
下一輪就不必重新發明排序，也不會把預算花在一小時前才讀過的頁面。

輪替補位的排序在 2026-11-10 修正：原本只按 `verified_at` 由舊到新，完全不看 `next_review_at`，
於是預設 20 筆全是排程在 11/30 的 monthly 紀錄，而同時有 20 筆可行動、非冷卻中的紀錄自己的
複核日就在 11/14——兩份清單交集 0 筆，等於把卡片上「下次複核」的日期當裝飾。現在先比
`next_review_at`（排程較近者先），再用 `verified_at`（較久未核者先）決勝。

用法：
  python3 tools/queue.py                 # 顯示基準數字與佇列（預設 20 筆）
  python3 tools/queue.py --limit 40      # 加大佇列
  python3 tools/queue.py --json          # 輸出機器可讀結果
  python3 tools/queue.py --self-test     # 以合成資料驗證規則本身
  python3 tools/queue.py --explain ID [ID…]
                                         # 手動挑清單前先問：這些 ID 這一輪會不會被排入、
                                         # 不排入是因為冷卻、已截止，還是排程未到

只有 `status` 不在 CLOSED 內的紀錄才進佇列：已截止、已關閉與已合併的紀錄保留歷史，
但讀者已不能行動，重讀它們只是刷新時間。`on_new_signal` 沒有固定日期，只以截止點排入。
"""
import argparse
import datetime
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "offers.json"
DATE_ONLY = re.compile(r"\d{4}-\d{2}-\d{2}")

TZ_TPE = datetime.timezone(datetime.timedelta(hours=8))
CLOSED = {"expired", "expired_unverified", "closed", "applications_closed",
          "closed_to_new_subscriptions", "sunset_announced", "resolved_rumor_disproven",
          "duplicate_merged"}
DEFAULT_LIMIT = 20
DEFAULT_WINDOW_DAYS = 7
# 12 小時：日更紀錄仍會每天被排到兩次以上，但不會每小時重讀同一頁。
DEFAULT_COOLDOWN_HOURS = 12
# 截止前這段時間內，冷卻時間不阻擋排入——最後一天重讀一次勝過錯過停收。
URGENT_HOURS = 24


def parse_stamp(value, end_of_day=False):
    """解析 schedule 用的時間欄位；只有日期者，日期即代表當天仍可動作。

    `expiry.date` 允許只寫到月份（例如 `2028-06`）。只到月份的值不解析——不猜月末日，
    與 `tests/validate.py` 的 close_points() 同一原則。日期區間取最後一個完整日期，
    代表「最晚仍可動作」；帶註記的寫法（`2026-11-10（Asia/Taipei）`）同理。
    """
    if not isinstance(value, str) or not value.strip():
        return None
    raw = value.strip()
    # 只有日期的值必須先走下面的日期分支。`datetime.fromisoformat('2026-11-10')` 會「成功」並回傳
    # 當日 00:00，於是 `end_of_day` 形同無效：2026-11-10 實測 `deadline_at: 2026-11-10`（台北青年
    # AI 補助，期限就是當天）被算成當天 00:00 結束，`close_points()` 把「已過」的時點濾掉後，這筆
    # 紀錄在期限當天反而掉出 closing 桶，也沒有 24 小時緊急豁免，只能靠 next_review_at 碰巧排到。
    # 帶時刻（含 `2026-11-10（Asia/Taipei）` 這種只有日期加註記）才走 ISO 快路徑。
    if re.search(r"\d{1,2}:\d{2}", raw):
        try:
            stamp = datetime.datetime.fromisoformat(raw.replace("Z", "+00:00"))
            if stamp.tzinfo is not None:
                stamp = stamp.astimezone(TZ_TPE).replace(tzinfo=None)
            return stamp
        except ValueError:
            pass
    found = DATE_ONLY.findall(raw)
    if not found:
        return None
    stamp = datetime.datetime.strptime(found[-1], "%Y-%m-%d")
    if end_of_day:
        return stamp.replace(hour=23, minute=59, second=59)
    return stamp


def close_points(record):
    """讀者最後仍能行動的時點：申請截止、方案結束與舊式 expiry.date。"""
    points = []
    for field in ("deadline_at", "expires_at"):
        stamp = parse_stamp(record.get(field), end_of_day=True)
        if stamp is not None:
            points.append((field, record[field], stamp))
    expiry = record.get("expiry")
    if isinstance(expiry, dict):
        stamp = parse_stamp(expiry.get("date"), end_of_day=True)
        if stamp is not None:
            points.append(("expiry.date", expiry["date"], stamp))
    return points


def rotation_key(row):
    """輪替順序：先排程（next_review_at），再用最久未核決勝，最後用 ID 固定。

    2026-11-10 實測：只按 verified_at 排序時，預設 20 筆全部是排程在 11/30 的 monthly 紀錄，
    而同時有 20 筆可行動、非冷卻中的紀錄自己的 next_review_at 就在 11/14——兩份清單交集 0 筆。
    卡片上的「下次複核」是研究者依證據設定的日期（daily／weekly／事件日），佇列若完全不看它，
    就等於把排程當裝飾：每週該看的紀錄要等所有更舊的每月紀錄排完才會被讀到。
    """
    due = parse_stamp(row[1].get("next_review_at")) or datetime.datetime.max
    return (due, parse_stamp(row[1].get("verified_at")) or datetime.datetime.min, row[1]["id"])


def failed_lookup(record):
    """最新一次證據是不是「追查失敗」：last_review_attempt_at 晚於 verified_at（或根本沒有 verified_at）。

    2026-11-10 統計 8 筆紀錄的最新證據是失敗（4 筆已截止、4 筆仍可行動，其中 2 筆當天以瀏覽器渲染結案）。這些紀錄的
    next_review_at 仍是原本的每月日期或人工調整後的日期（stitch 11/20、coze 11/23），
    所以佇列只有在輪替剛好排到它們時才會重讀——而重讀同一批 URL 正是最沒有產出的事。
    tests/validate.py 已要求失敗後 14 天內重試，這裡把「重試」變成佇列裡獨立、優先於輪替的桶。
    """
    attempt = parse_stamp(record.get("last_review_attempt_at"))
    if attempt is None:
        return None
    verified = parse_stamp(record.get("verified_at"))
    return None if verified is not None and verified >= attempt else attempt


def classify(record, now, cooldown, window):
    """單筆紀錄在這一輪會落到哪個桶——queue 與 --explain 共用同一份規則。

    為什麼要抽出來：2026-11-11 13:05 這輪，主 agent 依 `next_review_at` 自己挑了一份
    「7 天內到期」的 8 筆名單派給子代理，其中 6 筆其實同一小時前（11:16–11:22）才被另一個
    回合核實過：`build_queue()` 會因 12 小時冷卻把它們濾掉，但沒有任何介面能對「手動清單」
    問同一句話，於是把稀缺的查核時間花在重讀同一批官方頁上。`--explain` 就是那個介面。
    """
    if record.get("status") in CLOSED:
        return {"bucket": None, "closed": True, "due": None, "soonest": None,
                "verified": None, "failed": None, "fresh": False, "urgent": False,
                "in_window": False}
    due = parse_stamp(record.get("next_review_at"))
    verified = parse_stamp(record.get("verified_at"))
    closes = [point for point in close_points(record) if point[2] > now]
    soonest = min(closes, key=lambda point: point[2]) if closes else None
    failed = failed_lookup(record)
    # 冷卻要看「最後一次真的打開官方頁」的時間：失敗的追查也是打開過一次，
    # 若只比 verified_at，2 小時前才失敗的紀錄會立刻從輪替回到佇列。
    touched = max([stamp for stamp in (verified, failed) if stamp is not None], default=None)
    fresh = touched is not None and now - touched < cooldown
    urgent = soonest is not None and soonest[2] - now <= datetime.timedelta(hours=URGENT_HOURS)
    in_window = soonest is not None and soonest[2] - now <= window
    bucket = None
    if due is not None and due < now:
        bucket = "overdue"
    elif in_window:
        # 冷卻中的非緊急紀錄不重排；24 小時內到期者不受冷卻限制。
        bucket = None if (fresh and not urgent) else "closing"
    elif failed is not None and not fresh:
        bucket = "retry"
    elif not fresh:
        bucket = "rotation"
    return {"bucket": bucket, "closed": False, "due": due, "soonest": soonest,
            "verified": verified, "failed": failed, "fresh": fresh,
            "urgent": urgent, "in_window": in_window}


def explain(records, ids, now=None, window_days=DEFAULT_WINDOW_DAYS,
            cooldown_hours=DEFAULT_COOLDOWN_HOURS):
    """回報手動挑選的 ID 這一輪會不會被排入、以及不排入的原因。"""
    now = now or datetime.datetime.now(TZ_TPE).replace(tzinfo=None)
    cooldown = datetime.timedelta(hours=cooldown_hours)
    window = datetime.timedelta(days=window_days)
    by_id = {record.get("id"): record for record in records}
    rows, unknown = [], []
    for record_id in ids:
        record = by_id.get(record_id)
        if record is None:
            unknown.append(record_id)
            continue
        info = classify(record, now, cooldown, window)
        touched = max([stamp for stamp in (info["verified"], info["failed"]) if stamp is not None],
                      default=None)
        if info["closed"]:
            verdict = "已截止／已合併，不進佇列（保留歷史）"
        elif info["bucket"]:
            verdict = f"會排入 [{info['bucket']}]"
        elif info["fresh"]:
            hours = (now - touched).total_seconds() / 3600 if touched else None
            verdict = ("冷卻中，不排入：" + (f"{hours:.1f} 小時前才打開官方頁" if hours is not None
                                            else "剛查核過"))
        else:
            verdict = "未排入（排程未到且無截止點）"
        rows.append({"id": record_id, "status": record.get("status"), "bucket": info["bucket"],
                     "next_review_at": record.get("next_review_at"),
                     "verified_at": record.get("verified_at"),
                     "last_review_attempt_at": record.get("last_review_attempt_at"),
                     "closes_at": info["soonest"][1] if info["soonest"] else None,
                     "cooldown_hours": round((now - touched).total_seconds() / 3600, 1) if touched else None,
                     "verdict": verdict})
    return rows, unknown


def build_queue(records, now=None, limit=DEFAULT_LIMIT, window_days=DEFAULT_WINDOW_DAYS,
                cooldown_hours=DEFAULT_COOLDOWN_HOURS):
    """回傳 (baseline, queue)。queue 為 [(bucket, record_id, reason, due, oldest_close)]。"""
    now = now or datetime.datetime.now(TZ_TPE).replace(tzinfo=None)
    cooldown = datetime.timedelta(hours=cooldown_hours)
    window = datetime.timedelta(days=window_days)

    actionable = [r for r in records if r.get("status") not in CLOSED]
    overdue, closing, retry, rotation = [], [], [], []
    closing_window = []  # 不看冷卻的「視窗內到期」總數，基準數字不能用排入數冒充
    cooled_in_window = 0
    cooled_retry = 0

    for record in actionable:
        info = classify(record, now, cooldown, window)
        if info["failed"] is not None and info["fresh"]:
            cooled_retry += 1
        if info["in_window"]:
            closing_window.append(("closing", record, info["due"], info["soonest"]))
        if info["bucket"] is None:
            # 落在這裡只剩「冷卻中」與「排程未到且無截止點」兩種；視窗內者要計入冷卻數。
            if info["in_window"] and info["fresh"] and not info["urgent"]:
                cooled_in_window += 1
            continue
        if info["bucket"] == "overdue":
            overdue.append(("overdue", record, info["due"], info["soonest"]))
        elif info["bucket"] == "closing":
            closing.append(("closing", record, info["due"], info["soonest"]))
        elif info["bucket"] == "retry":
            retry.append(("retry", record, info["failed"], info["soonest"]))
        else:
            rotation.append(("rotation", record, info["due"], info["soonest"]))

    overdue.sort(key=lambda row: row[2])
    closing.sort(key=lambda row: row[3][2])
    # 失敗的追查先於一般輪替：這些紀錄的最新證據就是「讀不到」，重讀同一個 URL 不會有新資訊，
    # 因此排在輪替之前，讓下一輪先去換路線。
    retry.sort(key=lambda row: (row[2], row[1]["id"]))
    # 先看排程再看新舊：next_review_at 是研究者依證據設定的複核日期，不該被「最久未核」蓋掉。
    rotation.sort(key=rotation_key)

    queue = []
    for bucket, record, due, soonest in (overdue + closing + retry + rotation)[:limit]:
        if bucket == "overdue":
            reason = f"next_review_at {record.get('next_review_at')} 已過"
        elif bucket == "closing":
            reason = f"{soonest[0]} {soonest[1]} 將在 {window_days} 天內到期"
        elif bucket == "retry":
            reason = f"上次追查失敗 {record.get('last_review_attempt_at')}（換一條路線，不要重讀同一個 URL）"
        else:
            reason = f"排程 {str(due)[:16]} 最近的可行動紀錄（未到期，輪替補位）"
        oldest_close = soonest[1] if soonest else None
        queue.append((bucket, record["id"], reason, record.get("next_review_at"), oldest_close,
                      record.get("verified_at")))

    baseline = {
        "total": len(records),
        "actionable": len(actionable),
        "overdue": len(overdue),
        "closing_window": len(closing_window),
        "closing": len(closing),
        "closing_cooled": cooled_in_window,
        "retry": len(retry),
        "retry_cooled": cooled_retry,
        "rotation": len(rotation),
        "stale_24h": sum(1 for r in actionable
                         if (parse_stamp(r.get("verified_at")) or datetime.datetime.min)
                         < now - datetime.timedelta(hours=24)),
        "reviewed_12h": sum(1 for r in actionable
                            if (parse_stamp(r.get("verified_at")) or datetime.datetime.min)
                            > now - cooldown),
    }
    return baseline, queue


def self_test():
    """規格值斷言：規則改了就要在這裡說明，而不是讓佇列悄悄變寬或變窄。"""
    now = datetime.datetime(2026, 11, 10, 6, 0)
    iso = lambda days=0, hours=0: (now + datetime.timedelta(days=days, hours=hours)).strftime("%Y-%m-%dT%H:%M:%S+08:00")
    records = [
        # 逾期的日更紀錄即使 1 小時前核過也要排入：排程說它該被檢查。
        {"id": "overdue-fresh", "status": "conditional", "next_review_at": iso(hours=-1), "verified_at": iso(hours=-1)},
        # 5 天後到期、2 小時前核過：冷卻中，不重排。
        {"id": "closing-cooled", "status": "active", "next_review_at": iso(days=5), "verified_at": iso(hours=-2),
         "deadline_at": (now + datetime.timedelta(days=5)).strftime("%Y-%m-%d")},
        # 6 小時後到期：緊急，冷卻時間不阻擋。
        {"id": "closing-urgent", "status": "active", "next_review_at": iso(days=3), "verified_at": iso(hours=-2),
         "expires_at": iso(hours=6)},
        # 最久未核的一般紀錄。
        {"id": "rotation-old", "status": "active", "next_review_at": iso(days=20), "verified_at": iso(days=-10)},
        # 已截止者永不排入，即使 next_review_at 已過。
        {"id": "closed-overdue", "status": "expired", "next_review_at": iso(days=-1), "verified_at": iso(days=-30)},
        # 沒有 next_review_at 的 on_new_signal 仍可因截止點排入。
        {"id": "signal-closing", "status": "conditional", "next_review_at": None, "verified_at": iso(days=-2),
         "expiry": {"date": (now + datetime.timedelta(days=2)).strftime("%Y-%m-%d")}},
        # 輪替必須先看排程再看新舊：較新核過但排程較近的 weekly，要排在更舊卻排到 20 天後的 monthly 前面。
        {"id": "rotation-weekly-sooner", "status": "conditional", "next_review_at": iso(days=4), "verified_at": iso(days=-1)},
        {"id": "rotation-monthly-older", "status": "conditional", "next_review_at": iso(days=20), "verified_at": iso(days=-10)},
        # 只寫日期的期限代表「當天仍可動作」：期限日當天（now 是當日 06:00）必須算到期，不能被
        # 讀成當日 00:00 已結束。2026-11-10 的 `taipei-youth-ai-subscription-subsidy-2026`
        # 就是這個情況，舊版因此在期限當天掉出 closing 桶。
        {"id": "closing-today-dateonly", "status": "conditional", "next_review_at": iso(days=2), "verified_at": iso(hours=-2),
         "deadline_at": now.strftime("%Y-%m-%d")},
        # 反向：昨天的日期期限已過，不得再算到期（仍有未來排程，所以只會落到輪替）。
        {"id": "closing-yesterday-dateonly", "status": "conditional", "next_review_at": iso(days=2), "verified_at": iso(days=-2),
         "deadline_at": (now - datetime.timedelta(days=1)).strftime("%Y-%m-%d")},
        # 追查失敗要自己成一個桶：最新證據是「讀不到」的紀錄，排程卻還在 10 天後。
        # 2026-11-10 的 stitch（11/20）與 coze（11/23）就是這樣被排到輪替的尾巴。
        {"id": "retry-failed", "status": "active", "next_review_at": iso(days=10), "verified_at": iso(days=-5),
         "last_review_attempt_at": iso(hours=-20), "last_review_attempt_reason": "頁面只回 JS 外殼"},
        # 上一筆 20 小時前試過（冷卻已過，要排入）；這一筆 2 小時前才試，冷卻內不重排。
        {"id": "retry-cooled", "status": "active", "next_review_at": iso(days=10), "verified_at": iso(days=-5),
         "last_review_attempt_at": iso(hours=-2), "last_review_attempt_reason": "逾時"},
        # 失敗後已重新核實者不得再進 retry 桶（較新的成功蓋過較舊的失敗）。
        {"id": "retry-resolved", "status": "active", "next_review_at": iso(days=10), "verified_at": iso(hours=-3),
         "last_review_attempt_at": iso(hours=-30)},
        # 已截止的失敗追查不排入：讀者已不能行動。
        {"id": "retry-closed", "status": "expired", "next_review_at": iso(days=10), "verified_at": iso(days=-30),
         "last_review_attempt_at": iso(hours=-20)},
    ]
    assert parse_stamp("2026-11-10", end_of_day=True) == datetime.datetime(2026, 11, 10, 23, 59, 59), \
        "只有日期的期限要算到當日 23:59:59（與 tests/validate.py 的 close_stamp 一致）"
    assert parse_stamp("2026-11-10") == datetime.datetime(2026, 11, 10), \
        "排程用的日期維持當日 00:00（next_review_at 當天就算已到期）"
    assert parse_stamp("2026-11-10T15:59:00+08:00", end_of_day=True) == datetime.datetime(2026, 11, 10, 15, 59), \
        "帶時刻的期限不得被改成當日 23:59"
    baseline, queue = build_queue(records, now=now, limit=20)
    ids = [row[1] for row in queue]
    assert "overdue-fresh" in ids, "逾期的紀錄必須排入"
    assert "closing-cooled" not in ids, "冷卻中的非緊急紀錄不得重排"
    assert "closing-urgent" in ids, "24 小時內到期者不受冷卻限制"
    buckets = {row[1]: row[0] for row in queue}
    assert "closing-today-dateonly" in ids, "期限只寫日期的紀錄，在期限當天仍必須排入"
    assert buckets["closing-today-dateonly"] == "closing", "期限當天要落在 closing 桶（不能只靠輪替）"
    assert buckets["closing-yesterday-dateonly"] != "closing", "期限日期已過者不得再由 closing 桶排入"
    assert "rotation-old" in ids, "未到期的可行動紀錄必須進輪替補位"
    assert "closed-overdue" not in ids, "已截止紀錄不得進佇列"
    assert "signal-closing" in ids, "on_new_signal 有截止點時仍要排入"
    assert ids.index("rotation-weekly-sooner") < ids.index("rotation-monthly-older"), \
        "輪替要先比 next_review_at：排程較近者優先，不能只看 verified_at"
    assert "retry-failed" in ids, "最新證據是追查失敗的紀錄要自己排入，不能等輪替剛好排到"
    assert buckets["retry-failed"] == "retry", "失敗的追查要落在 retry 桶，不能冒充輪替"
    assert "retry-cooled" not in ids, "12 小時內才試過的追查不重排（同一個 URL 立刻重讀沒有產出）"
    assert "retry-resolved" not in ids, "較新的成功核實蓋過較舊的失敗，不得再標成 retry"
    assert "retry-closed" not in ids, "已截止的紀錄即使追查失敗也不排入：讀者已不能行動"
    assert ids.index("retry-failed") < ids.index("rotation-old"), "retry 桶要先於一般輪替"
    assert baseline["overdue"] == 1 and baseline["closing"] == 3, f"bucket 計數不符: {baseline}"
    assert baseline["retry"] == 1 and baseline["retry_cooled"] == 1, f"retry 計數不符: {baseline}"
    # `--explain` 必須與 build_queue 說同一件事：手動挑的 ID 若在一小時前才核過，
    # 佇列會因冷卻濾掉它，explain 也要說「冷卻中」而不是「會排入」。
    rows, unknown = explain(records, ["closing-cooled", "rotation-old", "closed-overdue", "no-such-id"],
                            now=now, cooldown_hours=12)
    verdicts = {row["id"]: row["verdict"] for row in rows}
    assert "closing-cooled" in verdicts, "冷卻中的紀錄也要出現在 explain 的回報裡（說明為何不排入）"
    assert verdicts["closing-cooled"].startswith("冷卻中"), f"explain 要說明冷卻: {verdicts}"
    assert verdicts["rotation-old"].startswith("會排入"), f"explain 要說會排入: {verdicts}"
    assert verdicts["closed-overdue"].startswith("已截止"), f"explain 要說已截止: {verdicts}"
    assert unknown == ["no-such-id"], f"未知 ID 要另外列出: {unknown}"
    rotation_row = next(row for row in rows if row["id"] == "rotation-old")
    assert rotation_row["bucket"] == "rotation", "explain 的 bucket 要與 build_queue 一致"
    cooled_row = next(row for row in rows if row["id"] == "closing-cooled")
    assert cooled_row["cooldown_hours"] == 2.0, f"explain 要回報距上次查核小時數: {cooled_row}"
    # 兩份清單不得互相漏接：retry 的紀錄若同時符合 closing（期限先到），只能出現在 closing 一次。
    assert len(ids) == len(set(ids)), "同一個 ID 不得在佇列出現兩次"
    print("PASS: queue rules (overdue wins, 12h cooldown, 24h urgency override, date-only deadlines last all day, failed lookups retried before rotation, closed excluded, rotation ordered by next_review_at).")


def main():
    parser = argparse.ArgumentParser(description="產生可輪替的複核佇列")
    parser.add_argument("--limit", type=int, default=DEFAULT_LIMIT)
    parser.add_argument("--window-days", type=int, default=DEFAULT_WINDOW_DAYS)
    parser.add_argument("--cooldown-hours", type=int, default=DEFAULT_COOLDOWN_HOURS)
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--explain", nargs="+", metavar="ID",
                        help="只回報這些 ID 這一輪會不會被排入、以及不排入的原因")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        return

    data = json.loads(DATA.read_text())
    if args.explain:
        rows, unknown = explain(data["offers"], args.explain,
                                window_days=args.window_days,
                                cooldown_hours=args.cooldown_hours)
        if args.json:
            print(json.dumps({"explain": rows, "unknown": unknown}, ensure_ascii=False, indent=2))
            return
        for row in rows:
            print(f"  {row['id']} | {row['verdict']} | 核實 {str(row['verified_at'])[:16]} "
                  f"| 下次 {str(row['next_review_at'])[:16]} | 期限 {row['closes_at']}")
        for missing in unknown:
            print(f"  {missing} | 資料庫沒有這個 ID")
        return
    baseline, queue = build_queue(data["offers"], limit=args.limit,
                                  window_days=args.window_days,
                                  cooldown_hours=args.cooldown_hours)
    if args.json:
        print(json.dumps({"baseline": baseline,
                          "queue": [dict(zip(("bucket", "id", "reason", "next_review_at",
                                              "closes_at", "verified_at"), row)) for row in queue]},
                         ensure_ascii=False, indent=2))
        return

    print(f"基準：全庫 {baseline['total']} 筆、可行動 {baseline['actionable']} 筆、"
          f"嚴格逾期 {baseline['overdue']} 筆、{args.window_days} 天內到期 {baseline['closing_window']} 筆"
          f"（其中 {baseline['closing_cooled']} 筆冷卻中未排入）、"
          f"追查失敗待換路線 {baseline['retry']} 筆（另 {baseline['retry_cooled']} 筆冷卻中）、"
          f"24 小時未核 {baseline['stale_24h']} 筆、12 小時內已核 {baseline['reviewed_12h']} 筆")
    print(f"佇列（冷卻 {args.cooldown_hours}h、優先序 overdue→closing→retry→rotation）：")
    for bucket, record_id, reason, due, closes, verified in queue:
        print(f"  [{bucket:8}] {record_id} | 核實 {str(verified)[:16]} | 下次 {str(due)[:16]} | 期限 {closes} | {reason}")


if __name__ == "__main__":
    main()
