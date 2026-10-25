# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **412 筆**（309 項機會、44 項政策、59 筆觀察線索），更新時間 **2026-10-25 17:40 Asia/Taipei**（不代表全庫已複核）。本輪實讀官方來源複核 **20 筆既有紀錄**，其中包含算力新創、平台教育與特定免費 API 方案；新增 **2 項機會**（[Ideogram 免費版](https://ideogram.ai/pricing) 每週 30 credits、[Recraft 免費版](https://www.recraft.ai/pricing) 每日 30 credits 個人非商用圖像與向量）。Vast.ai 專頁現行消費等額匹配與舊公告 $2500 免費說法仍矛盾（標記 conflicting_official_usage_claims）；Together Startup Accelerator 官方專頁證實已擴展為三級（最高 $15K／$30K／$50K），且官方 JSON-LD areaServed 明列 Worldwide（涵蓋台灣申請範圍）；Together $150 贈額仍開放申請但平台計費文件要求首次購買最低 $15，贈額是否豁免首購門檻未解；AWS Free Tier 台灣頁正常讀取，移除連線缺口，但 FAQ 內部存在 6 個月 vs 升級後 12 個月抵用金到期之矛盾；Core.Today (AI놀이터) 條款明確免費點數亦每月不遞延；Z.ai 官方定價確認 GLM-4.7-Flash、4.5-Flash、4.6V-Flash 免費，新一代 GLM-5.3-Flash 付費；Ideogram 現為文件公告每週 30 credits（限第三方登入），否定舊傳每日 10 credits 或無限 slow queue；Recraft 每日 30 credits，但輸出公開且所有權歸 Recraft，限個人非商用；Azure Students 每年可續領 US$100 免卡，地域涵蓋台灣，但 OpenAI 一般模型配額不保證（正式配額表列 Batch 為 N/A）；Voyage AI 撤回無官方地區證據之 Taiwan Yes 改為 Unknown，且模型免費名單在定價表與正文間存在衝突。沿先前批次基線累計已實讀 **122 筆既有紀錄**，尚有 **288 筆既有紀錄未查核**（本輪其餘 390 筆未查核）。限時活動每日複核，其餘依最久未核案例按月輪替。服務有效性、條款資格與法律限制分開；本輪未取得適用台灣法律來源，法律狀態仍未核實。

## 使用方式

搜尋產品或資格關鍵字，依紀錄類別、優先層級（S–D）、台灣資格、地區、費用、設定時間、證據與用量篩選。預設以綜合優先度排序，由最值得先試的 S 級開始看。點開「資格、限制與來源」查看原始來源與證據缺口。

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

## 維護

保留穩定 ID、來源、各筆查閱時間與政策歷史。新增研究先去重並保留既有編輯；資料發布不代表已全面覆核。限時/即將到期案例每日追蹤，其餘案例依最久未核順序按月輪替。

本專案為無後端靜態網站，可由 GitHub Pages 的 main 根目錄發布。
驗證：python tests/validate.py；node --check app.js；node tests/filters.cjs。
