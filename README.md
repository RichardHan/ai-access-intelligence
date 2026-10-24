# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

目前資料：301 筆，包含 229 筆福利研究、40 筆政策、32 筆待覆核線索，不是 301 項可直接領取的優惠。資料集更新至 2026-10-24 23:35:00 Asia/Taipei。此批直接複核16筆既有案例（Meta Muse 訂閱公開與台灣未開放、Meta Muse Wonder 模型 rollout、v0 新舊戶額度與 10/23 文件、AICU 10/22 條款與 AP 評估用途、Mango Inference 官方 $10 額度、Fire Pass 維持關閉新訂閱、Gladia 新創條款實讀與台灣合格、Sarvam ₹100 永不過期與新創標記、Deepgram Speak '26 現場出席硬性截止、Deepgram Flux TTS 1:1 match 至年底、Replit Free Mode 計費涵蓋範圍、ElevenLabs 新創 33M 與轉 Free 規則、AMD 開發者 30 天/90 天二選一、Nebius Builder 90 天效期與制裁審查、Nebius 新創 VC $5M 門檻、Modal 新創/學術綁卡防濫用）；新增5筆（Qdrant Cloud 1GB RAM 永久免費叢集、Supabase Free 2 專案含 pgvector 原生支援、Pinecone Starter 免費 Serverless 向量庫、Weaviate Cloud 100K 物件免費叢集、Hyperbolic 推論需儲值 $5 轉 Pro 政策紀錄）。其餘280筆既有案例未於本批直接核實；仍有30筆已到複核日，先按限時風險及最久未核順序輪替處理。優先度評分與 S–D 分層由既有欄位衍生計算。

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
