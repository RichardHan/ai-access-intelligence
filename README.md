# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **1,179 筆**（959 項機會、50 項政策、170 筆觀察線索），更新時間 **2026-11-23 13:08 Asia/Taipei**（含歷史與重複紀錄）。本輪成功局部複核 **19 筆**既有紀錄，新增機會 **2 筆**、政策 **0 筆**、觀察線索 **0 筆**；整筆追查失敗 **1 筆**。其餘 **1,158 筆**既有紀錄未完成本輪複核。重點確認 Swarms 官方申請頁遭遇 HTTP 429 請求過頻限制（保留舊查閱時間排入重試）、經濟部深科技跨域研發補助申請須知維持、Brisk Teaching 教師免費方案、魔搭 ModelScope API 每日 250 次免費調用、SchoolAI 空間試用、Pika 每日免費額度、Descript 每月免費 60 分鐘、Otter 免費每月 300 分鐘、Traceloop 每月 50,000 spans 與加入 ServiceNow 政策、Poe 每日運算積分、OVHcloud 雲端折抵、Morph 新創額度、Cloudflare Workers 每日 10 萬次請求、Claude 非營利折扣、Arize 新創 6 個月 Ax Pro、Zencoder 試用、Lambda Inception $1,000 算力、ElevenLabs 每月 10,000 字元、酷英網 Cool English 英語 AI 學習平臺及 Emergent 定價方案，並新增國科會生科與工程處 115 年度「人工智慧賦能加速藥物開發計畫」（最高補助 3,000 萬元/年）與 Kaggle Stanford RNA 3D Folding 立體結構預測挑戰賽（總獎金 $75,000）。

## 使用方式

- 想從台灣申請，可從「台灣條件適用」開始，再依資格、設定時間或證據等級縮小範圍。一般「台灣資格」篩選也能查到歷史紀錄。
- 搜尋涵蓋標題、摘要、資格、費用、額度與期限等卡片內容。「本輪更新」只列本批複核及新增的紀錄。
- 「免費方案」收錄設定費與月費皆為零的項目。費用缺值時須有明確免費標記；任一費用已知大於零即排除。可行動專區也排除暫停開放、已截止、疑似過期、公告終止與重複收錄的項目。
- 「無限／暫時不限量」和免費額度選單都依據 `quota_classification`。點開「資格、限制與來源」可查看適用條件、證據、查閱時間與下次複核安排。
- 預設按綜合優先度排序。選「截止日由近到遠」可先看有未來截止點的紀錄；60 天內到期的卡片會顯示倒數。每次載入 24 筆。

- [完整研究資料](data/offers.json)
- [政策歷史](data/policy-history.json)

## 解讀原則

- 官方支持標籤只適用來源支持的特定主張，不表示所有欄位已核實。社群自述、索引摘要與待覆核線索分開。
- Taiwan Yes 是條件式地區資格判斷，仍需滿足列出的帳戶、學籍、企業、付款或居住條件，不保證讀者本人合格。
- 未公布固定上限不等於無限；模型、背景代理、API、共用額度及時日週月限制不可互換。
- 設定費與續費分開。未知數字為 null，不是 0。免費效益成本比分母為零標不適用；沒有可靠情境時不估造節省金額。
- VPN 換 IP 不代表具有地區優惠資格。不建議偽造身分、地址、帳號轉讓或繞過限制。
- 促銷狀態、服務條款資格與法律/監管結論分開呈現；沒有查到適用官方法律來源時，法律狀態標為未核實。符合條款不等於法律意見。
- 促銷可能過期或撤銷，使用前應重查來源。本網站不登入帳戶、不代申請、不購買或啟動外部工作。

## 優先度評分

2026-10-24 起每筆紀錄附 `priority_tier`、`priority_score`、`priority_note`，僅由既有欄位衍生計算，不是新的外部查核，也不是可領取的保證。

- 評分＝可靠度×1.2＋價值＋台灣可用度×1.5＋省力×0.8。
- 可靠度＝證據等級（官方 3／社群回報 1.5／未驗證 0.5）×2＋狀態（active 3／條件式 1.5／已截止 0）×1.5＋用量分類。
- 價值＝類別（FREE、HIGH-QUOTA、VALUE-DEAL 等；REGION-LOCKED 扣分）＋零設定/續費獎勵＋已知可用效益。
- 台灣可用度：Yes ＋3／No −3；省力：≤15 分鐘 ＋2／≤45 分鐘 ＋1。
- 分層：S＝台灣資格標記 Yes；A＝≥19 分；B＝17–19 分；C＝14–17 分；D＝低於 14 分或已過期/截止。政策與待覆核紀錄不評級，優先度排序時列於最後。
- 資料變更後重算：`python3 tools/prioritize.py`。

## 本機預覽與檢查

在 repo 根目錄執行以下指令，再於瀏覽器開啟 `http://127.0.0.1:8000/`。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

維護工具使用 Python 3.11、Node.js 和 Make。macOS 或 Linux 初次設定後，即可執行資料驗證、前端測試與三項工具自測。

```sh
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements-dev.txt
make check
```

已安裝 Google Chrome 的環境可再執行 `make check-ui`，以手機與桌面寬度檢查搜尋、篩選與載入更多。

## 維護

逐輪研究範圍、來源衝突、證據缺口與下次追查項目記在 [維護紀錄](MAINTENANCE.md)。

1. 寫入資料前，在同一個 shell 執行 `python3 tools/round_lock.py acquire --pid "$$" --note "本輪範圍"`，成功後開始編輯。用 `status` 查看持有者，完成後執行 `python3 tools/round_lock.py release --pid "$$"`。
2. 執行 `python3 tools/queue.py --limit 20` 取得候選清單。順序為逾期、七日內截止、追查失敗待重試、輪替補位。`--explain ID` 顯示個案排入原因，`--json` 輸出結構化結果。
3. 複核時保留穩定 ID、來源與政策歷史。以實際查閱時間更新證據，並在 `verification_scope` 寫出查到的主張。需要檢查引用網址時，執行 `python3 tools/linkcheck.py --record ID`。
4. 資料改動後重算優先度、更新 README 首段與批次摘要，再執行 `make check`。驗證輸出會另列引用網址相同的紀錄，以及核實日期比所有來源晚超過七天的紀錄，供人工複核。
