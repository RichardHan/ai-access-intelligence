"""產生可輪替的複核佇列（純既有欄位計算，不連外、不寫入資料）。

為什麼需要這支工具：每輪的挑選規則都寫在當輪的臨時腳本裡，結果 2026-11-10 一天五輪之間
`taipei-youth-ai-subscription-subsidy-2026` 與 `amazon-ara-multilingual-contextual-ai-fall-2026`
各被複核 3 次（實際間隔 1–2 小時），同一時間卻有 621 筆可行動紀錄超過 24 小時沒被碰過、
嚴格逾期 0 筆。把規則固定成「逾期 > 即將到期 > 最久未核，且 12 小時內已核者不再排入」，
下一輪就不必重新發明排序，也不會把預算花在一小時前才讀過的頁面。

用法：
  python3 tools/queue.py                 # 顯示基準數字與佇列（預設 20 筆）
  python3 tools/queue.py --limit 40      # 加大佇列
  python3 tools/queue.py --json          # 輸出機器可讀結果
  python3 tools/queue.py --self-test     # 以合成資料驗證規則本身

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


def build_queue(records, now=None, limit=DEFAULT_LIMIT, window_days=DEFAULT_WINDOW_DAYS,
                cooldown_hours=DEFAULT_COOLDOWN_HOURS):
    """回傳 (baseline, queue)。queue 為 [(bucket, record_id, reason, due, oldest_close)]。"""
    now = now or datetime.datetime.now(TZ_TPE).replace(tzinfo=None)
    cooldown = datetime.timedelta(hours=cooldown_hours)
    window = datetime.timedelta(days=window_days)

    actionable = [r for r in records if r.get("status") not in CLOSED]
    overdue, closing, rotation = [], [], []
    closing_window = []  # 不看冷卻的「視窗內到期」總數，基準數字不能用排入數冒充
    cooled_in_window = 0

    for record in actionable:
        due = parse_stamp(record.get("next_review_at"))
        verified = parse_stamp(record.get("verified_at"))
        closes = [point for point in close_points(record) if point[2] > now]
        soonest = min(closes, key=lambda point: point[2]) if closes else None
        fresh = verified is not None and now - verified < cooldown
        urgent = soonest is not None and soonest[2] - now <= datetime.timedelta(hours=URGENT_HOURS)

        if soonest is not None and soonest[2] - now <= window:
            closing_window.append(("closing", record, due, soonest))
        if due is not None and due < now:
            overdue.append(("overdue", record, due, soonest))
        elif soonest is not None and soonest[2] - now <= window:
            if fresh and not urgent:
                cooled_in_window += 1
            else:
                closing.append(("closing", record, due, soonest))
        elif not fresh:
            rotation.append(("rotation", record, due, soonest))

    overdue.sort(key=lambda row: row[2])
    closing.sort(key=lambda row: row[3][2])
    # 最久未核優先；相同時間再比下次複核，最後以 ID 固定順序（可重現）。
    rotation.sort(key=lambda row: (parse_stamp(row[1].get("verified_at")) or datetime.datetime.min,
                                   row[2] or datetime.datetime.max, row[1]["id"]))

    queue = []
    for bucket, record, due, soonest in (overdue + closing + rotation)[:limit]:
        if bucket == "overdue":
            reason = f"next_review_at {record.get('next_review_at')} 已過"
        elif bucket == "closing":
            reason = f"{soonest[0]} {soonest[1]} 將在 {window_days} 天內到期"
        else:
            reason = "最久未核的可行動紀錄"
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
    ]
    baseline, queue = build_queue(records, now=now, limit=20)
    ids = [row[1] for row in queue]
    assert "overdue-fresh" in ids, "逾期的紀錄必須排入"
    assert "closing-cooled" not in ids, "冷卻中的非緊急紀錄不得重排"
    assert "closing-urgent" in ids, "24 小時內到期者不受冷卻限制"
    assert "rotation-old" in ids, "最久未核者必須排入"
    assert "closed-overdue" not in ids, "已截止紀錄不得進佇列"
    assert "signal-closing" in ids, "on_new_signal 有截止點時仍要排入"
    assert baseline["overdue"] == 1 and baseline["closing"] == 2, f"bucket 計數不符: {baseline}"
    print("PASS: queue rules (overdue wins, 12h cooldown, 24h urgency override, closed excluded).")


def main():
    parser = argparse.ArgumentParser(description="產生可輪替的複核佇列")
    parser.add_argument("--limit", type=int, default=DEFAULT_LIMIT)
    parser.add_argument("--window-days", type=int, default=DEFAULT_WINDOW_DAYS)
    parser.add_argument("--cooldown-hours", type=int, default=DEFAULT_COOLDOWN_HOURS)
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        return

    data = json.loads(DATA.read_text())
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
          f"24 小時未核 {baseline['stale_24h']} 筆、12 小時內已核 {baseline['reviewed_12h']} 筆")
    print(f"佇列（冷卻 {args.cooldown_hours}h、優先序 overdue→closing→rotation）：")
    for bucket, record_id, reason, due, closes, verified in queue:
        print(f"  [{bucket:8}] {record_id} | 核實 {str(verified)[:16]} | 下次 {str(due)[:16]} | 期限 {closes} | {reason}")


if __name__ == "__main__":
    main()
