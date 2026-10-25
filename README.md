# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **433 筆**（326 項機會、46 項政策、61 筆觀察線索），更新時間 **2026-10-25 22:24 Asia/Taipei**（不代表全庫複核）。本輪抽樣實讀官方來源複核 **16 筆既有紀錄**，新增 **1 筆多模態影像理解機會**（TwelveLabs）；原有432筆中 **416筆未在本輪複核**，部分查閱不刷新 `verified_at`。[TwelveLabs](https://www.twelvelabs.io/pricing) 2026-10-15起新制Free為3GB Managed Intelligence儲存與每月Basic工作量（舊600分鐘為累積總額非月贈且僅舊戶過渡）；[Meta全球AI黑客松](https://dev.meta.ai/events/global-hackathon)活動頁與Waiver存在ET/EST時區與效期矛盾，維持較早截止；[Lawson Google AI Pro抽選](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)新購買已截止，合格集點者応募至10/26且限日本在住；[Supermaven](https://supermaven.com/blog/sunsetting-supermaven)公告為2025-11-21且依剩餘時間比例退款，Neovim/JetBrains維持補全；[Mango Inference](https://www.mangoboost.io/)官方確認新戶$10額度與11/11前七折，社群$100 matching無官方依據；[Sarvam](https://docs.sarvam.ai/api/getting-started/ratelimits)驗證用戶₹100額度不過期且可用於商業語音，新創補助額度期滿失效；[Qdrant Cloud](https://qdrant.tech/pricing/)與[Upstash Vector](https://upstash.com/pricing/vector)釐清託管/Serverless規格、閒置刪除與條款矛盾，台灣資格修正為Unknown；[Cerebras](https://inference-docs.cerebras.ai/support/rate-limits)官方明確否認永久免費層，加卡領$5/30天試用。台灣個別帳戶、付款及法律結論不可由服務存在推定；限時案例每日、其他按月輪替。

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
