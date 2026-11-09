"""加入綜合優先度評分與 S–D 分層（純既有欄位之衍生計算，無新增外部查核）。

評分＝可靠度×1.2＋價值＋台灣可用度×1.5＋省力×0.8
分層：S＝台灣資格 Yes；A＝≥19；B＝17–19；C＝14–17；D＝<14 或已過期/截止。
政策與待覆核紀錄不評級（tier/score 為 null），排序時排在最後。
"""
import datetime
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "offers.json"
APP = ROOT / "app.js"


def status_labels():
    """卡片狀態藥丸的中文標籤，直接讀 app.js 的 STATUS_LABELS。

    「優先度依據」與狀態藥丸是同一張卡上的兩句話，必須說同一件事。先前這裡把
    terms_conflict（藥丸寫「官方條款有差異」）、paused（「暫停開放」）、
    limited_availability（「有限度開放」）一律寫成「條件式」，21 筆機會因此同一張卡
    出現兩種結論（2026-11-09 統計）。改讀前端同一份對照表，避免兩邊各自維護而漂移。
    """
    source = APP.read_text()
    block = re.search(r"const STATUS_LABELS = \{(.*?)\n\};", source, re.S)
    if not block:
        raise SystemExit("app.js 找不到 STATUS_LABELS，優先度文案無法對齊前端")
    return dict(re.findall(r"(\w+):\s*'([^']*)'", block.group(1)))


STATUS_LABELS = status_labels()

DEAD = {"expired", "expired_unverified", "closed", "applications_closed",
        "closed_to_new_subscriptions", "sunset_announced", "resolved_rumor_disproven",
        "duplicate_merged"}
ALIVE = {"active", "active_verified"}
VER = {"Official": 3, "Community reported": 1.5, "Unverified": 0.5}
QUOTA = {"OFFICIALLY UNLIMITED": 3, "TEMPORARILY UNLIMITED": 2.5,
         "NO FIXED CAP PUBLISHED": 2, "HIGH BUT LIMITED": 2, "UNKNOWN": 1}
TIERS = ("S", "A", "B", "C", "D")


def score(o):
    ver = VER.get(o.get("verification"), 0)
    status = o.get("status")
    status_score = 3 if status in ALIVE else 0 if status in DEAD else 1.5
    reliability = ver * 2 + status_score * 1.5 + QUOTA.get(o.get("quota_classification"), 1)

    cats = set(o.get("categories") or [])
    value = 3 if "FREE" in cats else 1.5 if "LOW-COST" in cats else 0
    value += 1.5 * ("VALUE-DEAL" in cats) + 1.5 * ("HIGH-QUOTA" in cats)
    value += 1 * ("UNLIMITED-CLAIM" in cats) + 1 * ("BETA-ACCESS" in cats)
    value += 1.5 * ("EASY-EFFORT" in cats) - 2 * ("REGION-LOCKED" in cats)
    if o.get("setup_cost_usd") == 0:
        value += 0.5
    if o.get("recurring_cost_usd") == 0:
        value += 0.5
    if o.get("usable_benefit_usd"):
        value += min(3, o["usable_benefit_usd"] / 5000)

    taiwan = 3 if o.get("taiwan") == "Yes" else -3 if o.get("taiwan") == "No" else 0

    effort = o.get("effort_minutes_max")
    effort_score = 2 if effort is not None and effort <= 15 else 1 if effort is not None and effort <= 45 else 0

    return round(reliability * 1.2 + value + taiwan * 1.5 + effort_score * 0.8, 1)


def tier_of(o, s):
    if o.get("status") in DEAD:
        return "D"
    if o.get("taiwan") == "Yes":
        return "S"
    if s >= 19:
        return "A"
    if s >= 17:
        return "B"
    if s >= 14:
        return "C"
    return "D"


def note_of(o, s):
    if o["record_type"] != "opportunity":
        return "非機會紀錄（政策/待覆核），未評級"
    # 「官方」既是證據等級也是多數狀態標籤的開頭（官方條款有差異、官方說法有差異），
    # 兩個相鄰欄位都寫「官方」會讀成同一個意思，因此證據等級一律寫「官方來源」。
    ver = {"Official": "官方來源", "Community reported": "社群回報", "Unverified": "未驗證"}.get(o.get("verification"), "未知證據")
    status = o.get("status")
    # 缺 status 不等於「條件式」。2026-11-09 統計 22 筆機會沒有 status 欄位，
    # 卡片藥丸寫「狀態待釐清」，同一張卡的「優先度依據」卻寫「條件式」——同一份資料兩種結論。
    # 這裡只改文案，不動計分（缺值仍按 1.5 計，與 README 的評分說明一致）。
    # 同樣的道理適用於所有非 conditional 的狀態：標籤一律取自 app.js 的 STATUS_LABELS，
    # 卡片藥丸與優先度依據才不會互相矛盾。
    st = "狀態未記錄" if status is None else STATUS_LABELS.get(status, "狀態待釐清")
    if o.get("setup_cost_usd") == 0 and o.get("recurring_cost_usd") == 0:
        cost = "免費"
    elif o.get("setup_cost_usd") == 0:
        cost = "零設定費"
    elif o.get("setup_cost_usd") is not None:
        cost = f"設定US${o['setup_cost_usd']}"
    else:
        cost = "費用未知"
    tw = {"Yes": "台灣Yes", "No": "台灣No", "Unknown": "台灣未標記"}.get(o.get("taiwan"), "台灣未標記")
    effort = o.get("effort_minutes_max")
    ef = f"≤{effort}分鐘" if effort is not None and effort <= 45 else "較費工/未知" if effort is not None else "時間未知"
    parts = [ver, st, cost, tw, ef]
    if "REGION-LOCKED" in (o.get("categories") or []):
        parts.append("區域限定")
    if "QUALIFICATION" in (o.get("categories") or []):
        parts.append("有資格門檻")
    return "·".join(parts)


def main():
    now = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8)))
    data = json.loads(DATA.read_text())
    counts = {t: 0 for t in TIERS}
    counts["未評級"] = 0
    for o in data["offers"]:
        if o["record_type"] != "opportunity":
            o["priority_score"] = None
            o["priority_tier"] = None
            counts["未評級"] += 1
        else:
            s = score(o)
            t = tier_of(o, s)
            o["priority_score"] = s
            o["priority_tier"] = t
            counts[t] += 1
        o["priority_note"] = note_of(o, o.get("priority_score"))
    if "latest_research_at" in data:
        data["updated_at"] = data["latest_research_at"]
    else:
        data["updated_at"] = now.strftime("%Y-%m-%dT%H:%M:%S+08:00")
    if "加入優先度評分與 S–D 分層" not in data.get("scope", ""):
        data["scope"] += "；" + now.strftime("%Y-%m-%d") + " 加入優先度評分與 S–D 分層（既有欄位衍生計算，無新增外部查核）"
    DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2))
    print("優先度已寫入：", " ".join(f"{t}={counts[t]}" for t in (*TIERS, "未評級")))


if __name__ == "__main__":
    main()
