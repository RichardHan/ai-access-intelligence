"""檢查 data/offers.json 裡每個來源 URL 是否還能開啟（只讀資料，不修改任何紀錄）。

為什麼需要這支工具：來源清單是這份資料集唯一的證據基礎，但連結會默默失效。2026-11-10
實測 2,706 個唯一 URL：14 個回 HTTP 404、另有 5 個連線失敗，涉及 12 筆紀錄，其中
`elfa-api-free-once-thousand-credits` 引用的官方文件頁已改版 404（內容搬到
/get-started/pricing.md），卡片上仍顯示「官方來源支持」——讀者點進去看不到任何證據。
單靠每月輪替複核抓不到這種事：只有被排到的紀錄才會被讀。這支工具把「哪幾筆的證據已經
點不開」變成一次掃描就能看到的清單。

判定原則（保守，寧可漏報也不要誤判活動終止）：
- dead：HTTP 404／410。這是唯一可以直接說「頁面不存在」的證據。
- unreachable：連線逾時、DNS 失敗、TLS 失敗。只代表「這次沒連上」，不是頁面消失。
- blocked：400／401／403／405／429／5xx。多半是 Cloudflare／反爬或站方擋 HEAD，
  不代表頁面不存在，預設只統計不逐列。
- 403、逾時與 404 都不能單獨用來判定活動終止；404 也只能說「這個網址不再存在」，
  仍要看官方公告或 sitemap 才能下結論。工具只負責把線索排到前面。

用法：
  python3 tools/linkcheck.py                 # 掃全部來源，列出 dead 與 unreachable
  python3 tools/linkcheck.py --record ID     # 只掃某筆紀錄
  python3 tools/linkcheck.py --limit 200     # 只掃前 200 個唯一 URL（暖機／抽樣）
  python3 tools/linkcheck.py --json          # 機器可讀輸出
  python3 tools/linkcheck.py --self-test     # 以合成資料驗證分類規則（不連外）

這支工具**不**接入 tests/validate.py：驗證必須在離線、可重現的環境跑完，
網路狀態不是資料錯誤。每輪維護可選擇性跑一次，把 dead 清單併入下一輪的優先項目。
"""
import argparse
import json
import pathlib
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

# tools/queue.py 會遮住標準庫的 queue：直接執行 `python3 tools/linkcheck.py` 時，腳本所在目錄
# 會被放到 sys.path 最前面，於是 concurrent.futures 內部的 `import queue` 會拿到這支 repo 的
# 排程工具，並在 ThreadPoolExecutor() 以 AttributeError: SimpleQueue 爆掉。先把 tools/ 從
# sys.path 移除，再匯入需要的模組。
_TOOLS_DIR = pathlib.Path(__file__).resolve().parent
sys.path[:] = [path for path in sys.path if path and pathlib.Path(path).resolve() != _TOOLS_DIR]

import concurrent.futures  # noqa: E402  (必須在 sys.path 修正之後)

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "offers.json"
DEAD_CODES = {404, 410}
# 404 的延遲重試間隔（秒）。0 代表不重試，測試用。
RETRY_DELAY = 2.0
BLOCKED_CODES = {400, 401, 403, 405, 406, 409, 429, 500, 502, 503, 504, 520, 521, 522, 523, 530}
HEADERS = {
    # 不少站台對沒有 UA 的請求直接回 403；用一般瀏覽器 UA 降低假陽性。
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
}


def classify(status):
    """把 HTTP 狀態或例外名稱歸類成 ok／dead／blocked／unreachable。"""
    if isinstance(status, int):
        if status < 400:
            return "ok"
        if status in DEAD_CODES:
            return "dead"
        if status in BLOCKED_CODES:
            return "blocked"
        return "unreachable"
    return "unreachable"


def ascii_url(url):
    """urllib 只接受 ASCII；把非 ASCII 路徑與查詢字串百分比編碼，其餘保留原樣。"""
    return urllib.parse.quote(url, safe=":/?#[]@!$&'()*+,;=%~")


def http_status(url, method, timeout=10):
    """實際發一個請求，回傳 HTTP 狀態碼（int）或例外名稱（str）。"""
    target = ascii_url(url)
    try:
        request = urllib.request.Request(target, method=method, headers=HEADERS)
        with urllib.request.urlopen(request, timeout=timeout,
                                    context=ssl.create_default_context()) as response:
            return response.status
    except urllib.error.HTTPError as error:
        return error.code
    except Exception as error:  # 逾時、DNS、TLS、連線中斷
        return type(error).__name__


def probe(url, timeout=10, fetcher=None, retry_delay=RETRY_DELAY, sleep=time.sleep):
    """HEAD 之後再用 GET 確認，回傳 (status, method)。

    一定要有 GET 才算數：2026-11-10 實測 support.google.com/docs/answer/16143507 對 HEAD
    回 404、對 GET 回 200，codebuddy.cn 亦同。只憑 HEAD 就判 dead 會把還開得起來的官方
    文件列成失效——這正是這支工具最不該犯的錯。因此 HEAD 成功才提早結束，其餘一律再試 GET。

    404／410 再等一下重試一次：2026-11-10 24 路併發全掃把 neo4j 兩頁報成 404，同一 URL
    單筆重掃與 curl 都 200；併發或 CDN 邊緣節點會給出與實際狀態不符的 404。dead 清單是
    下一輪的證據維修佇列，寧可多花一次延遲，也不要讓研究者去修一個沒壞的來源。
    """
    fetcher = fetcher or http_status
    status, method = None, None
    for candidate in ("HEAD", "GET"):
        status, method = fetcher(url, candidate, timeout), candidate
        if isinstance(status, int) and status < 400:
            return status, method
    if status in DEAD_CODES and retry_delay > 0:
        sleep(retry_delay)
        return fetcher(url, "GET", timeout), "GET-retry"
    return status, method


def collect(records):
    """回傳 {url: [record_id, ...]}，同一 URL 只留一次，但保留所有引用它的紀錄。"""
    urls = {}
    for record in records:
        for source in record.get("sources") or []:
            url = source.get("url")
            if url:
                urls.setdefault(url, []).append(record["id"])
    return urls


def scan(urls, workers=24, timeout=10):
    results = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(probe, url, timeout): url for url in urls}
        for future in concurrent.futures.as_completed(futures):
            results[futures[future]] = future.result()
    return results


def summarise(urls, results):
    report = {"ok": [], "dead": [], "blocked": [], "unreachable": []}
    for url, (status, method) in results.items():
        report[classify(status)].append(
            {"url": url, "status": status, "method": method, "records": sorted(set(urls[url]))})
    for bucket in report.values():
        bucket.sort(key=lambda item: str(item["status"]))
    return report


def self_test():
    """分類規則與去重邏輯的規格值測試（不連外，所以可放進一般檢查）。"""
    assert classify(200) == "ok"
    assert classify(204) == "ok"
    assert classify(404) == "dead"
    assert classify(410) == "dead", "410 Gone 與 404 同屬頁面不存在"
    assert classify(403) == "blocked", "403 是反爬或權限，不是頁面不存在"
    assert classify(429) == "blocked"
    assert classify(503) == "blocked"
    assert classify("TimeoutError") == "unreachable", "連線失敗只代表這次沒連上"
    assert classify("URLError") == "unreachable"
    assert ascii_url("https://a.example/計畫") == "https://a.example/%E8%A8%88%E7%95%AB"
    assert ascii_url("https://a.example/x?y=1&z=2") == "https://a.example/x?y=1&z=2", "既有符號不得被重複編碼"

    # HEAD 回 404 但 GET 回 200 的站台真實存在（support.google.com、codebuddy.cn）。
    # 只憑 HEAD 判死會害研究者去「修」一個沒壞的來源。
    def head_only_404(url, method, timeout=10):
        return 404 if method == "HEAD" else 200

    assert probe("https://a.example/h", fetcher=head_only_404) == (200, "GET")
    assert classify(probe("https://a.example/h", fetcher=head_only_404)[0]) == "ok"

    def both_404(url, method, timeout=10):
        return 404

    assert probe("https://a.example/gone", fetcher=both_404, retry_delay=0.01,
                 sleep=lambda _: None) == (404, "GET-retry"), "HEAD、GET 與重試都 404 才算 dead"
    assert classify(probe("https://a.example/gone", fetcher=both_404, retry_delay=0.01,
                          sleep=lambda _: None)[0]) == "dead"

    # 併發下的假 404：2026-11-10 全掃把 neo4j 兩頁報成 404，單筆重掃與 curl 都 200。
    # 第一次 HEAD＋GET 都 404、延遲重試那一次 200 時，不得列進 dead 佇列。
    calls = {"n": 0}

    def flaky_404(url, method, timeout=10):
        calls["n"] += 1
        return 404 if calls["n"] <= 2 else 200

    status, method = probe("https://a.example/flaky", fetcher=flaky_404, retry_delay=0.01,
                           sleep=lambda _: None)
    assert (status, method) == (200, "GET-retry"), "延遲重試成功者不得判為 dead"
    assert classify(status) == "ok"
    calls["n"] = 0
    assert probe("https://a.example/flaky", fetcher=both_404, retry_delay=0.01,
                 sleep=lambda _: None) == (404, "GET-retry"), "重試後仍 404 才是 dead"

    def head_403_get_200(url, method, timeout=10):
        return 403 if method == "HEAD" else 200

    assert probe("https://a.example/blocked", fetcher=head_403_get_200) == (200, "GET"), "擋 HEAD 的站台不得判為 blocked"

    records = [
        {"id": "one", "sources": [{"url": "https://a.example/x"}, {"url": "https://a.example/y"}]},
        {"id": "two", "sources": [{"url": "https://a.example/x"}]},
    ]
    urls = collect(records)
    assert set(urls) == {"https://a.example/x", "https://a.example/y"}, "同一 URL 只能掃一次"
    assert urls["https://a.example/x"] == ["one", "two"], "同一 URL 的所有引用紀錄都要保留"
    report = summarise(urls, {"https://a.example/x": (404, "GET"), "https://a.example/y": (200, "HEAD")})
    assert [item["url"] for item in report["dead"]] == ["https://a.example/x"]
    assert report["dead"][0]["records"] == ["one", "two"]
    assert [item["url"] for item in report["ok"]] == ["https://a.example/y"]
    print("linkcheck self-test PASS：dead 只認 404／410，403 與逾時不得判為頁面消失")


def main():
    parser = argparse.ArgumentParser(description="掃描來源 URL 是否仍可開啟（只讀，不改資料）。")
    parser.add_argument("--record", help="只掃指定紀錄 ID")
    parser.add_argument("--limit", type=int, help="只掃前 N 個唯一 URL")
    parser.add_argument("--workers", type=int, default=24)
    parser.add_argument("--timeout", type=int, default=10)
    parser.add_argument("--json", action="store_true", help="輸出機器可讀結果")
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        return

    data = json.loads(DATA.read_text())
    records = data["offers"]
    if args.record:
        records = [record for record in records if record["id"] == args.record]
        if not records:
            raise SystemExit(f"找不到紀錄：{args.record}")
    urls = collect(records)
    if args.limit:
        urls = dict(list(urls.items())[: args.limit])

    started = time.time()
    results = scan(urls, workers=args.workers, timeout=args.timeout)
    report = summarise(urls, results)
    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=2))
        return

    print(f"掃描 {len(urls)} 個唯一 URL、{len(records)} 筆紀錄，耗時 {time.time() - started:.0f} 秒")
    print(f"ok {len(report['ok'])}｜dead {len(report['dead'])}｜unreachable {len(report['unreachable'])}｜blocked {len(report['blocked'])}")
    if report["dead"]:
        print("\n== dead（HTTP 404／410；只代表這個網址不再存在，不等於活動終止）==")
        for item in report["dead"]:
            print(f"  {item['status']}  {item['url']}")
            print(f"        {', '.join(item['records'])}")
    if report["unreachable"]:
        print("\n== unreachable（逾時／DNS／TLS；這次沒連上，不是頁面消失）==")
        for item in report["unreachable"]:
            print(f"  {item['status']}  {item['url']}")
            print(f"        {', '.join(item['records'])}")
    if report["blocked"]:
        print(f"\nblocked {len(report['blocked'])} 筆（400／401／403／405／429／5xx，多為反爬或擋 HEAD，未逐列）")
        print("  需要時用 --json 取得完整清單。")
    affected = {rid for bucket in ("dead",) for item in report[bucket] for rid in item["records"]}
    print(f"\n受 dead 影響的紀錄：{len(affected)} 筆")
    if affected:
        print("  " + ", ".join(sorted(affected)))
    print("\n提醒：404 只證明網址失效，不能單獨判定活動結束。找到替代官方頁後就地更新來源，"
          "並把查閱時間與新網址寫進該筆 evidence；查不到替代頁時記為證據缺口，不要改狀態。")
    return 0 if not report["dead"] else 1


if __name__ == "__main__":
    sys.exit(main())
