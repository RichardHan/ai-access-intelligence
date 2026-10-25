# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **395 筆**（297 項機會、44 項政策、54 筆觀察線索），資料集更新時間 **2026-10-25 14:27 Asia/Taipei**（不代表全庫已複核）。累計實讀官方來源複核 **32 筆既有案例**（23 項機會、4 項政策、5 筆觀察線索）；本次新增 **3 項機會**（AWS PartyRock、Lemonfox.ai、DeepInfra Two Minute Papers）；升級 **3 筆觀察線索至正式機會**（Google AI Studio / Gemini API、Claude Consumer Free、Render for Startups）；仍有 **357 筆既有記錄未查核**（265 項機會、40 項政策、52 筆觀察線索）。本次複核重點：Together AI 官方最新詳細計費文件確認組織首次最低預付已由 US$5 調高為 US$15（後續最低 US$5）且明確聲明全平台無免費試用；Google AI Studio 與 Claude 消費者免費方案正式核實支援台灣且免綁信用卡，Gemini 1.5 系列已於 2025-09-29 正式下線並由 3.8 Flash 等新模型接棒，未付費調用內容可能用於模型訓練與人工審查；Render 新創方案確認 US$500–$100,000 階梯額度與 1 年效期；Baseten 新創專用部署（$25,000）與 API（$2,500）額度獨立計算且 6 個月有效；CoreWeave ARIA 維持限期免費但未來加收 $0.50/M Agent 費率，Distillation 預覽免費與產品頁 SFT $2.70/hr 計費矛盾保留；Vapi 包含 1 個免費美國受話門號與 $5 額度但通話扣 $0.05/分託管費且新增 Add-ons 自動刷卡警示；Vultr 首充等額配對最高 $100 採 50/50 扣抵且 GPU 適用未獲證實；Qoder 1024 推進至 Round 4（10/30 23:59 UTC+8 截止）；Civo $250 額度需綁卡且停止機器仍計費、無自動停機保護；Friendli 預付最低 $10 且無保證自動註冊贈額；Letta Cloud Free 方案提供 3 agents 與輪替免費模型，逐模型計費需登入。新機會：AWS PartyRock 提供每日免費生成式 AI credits，免 AWS 帳戶與信用卡，禁止商業變現；Lemonfox.ai 提供首月免費 API 試用（含約 30 小時 Whisper large-v3 轉錄或文字模型），續用 $5/月；DeepInfra Two Minute Papers 活動提供 US$20 推論額度與專用申領入口。前批更新包含 Canva Education、BazaarLink 免費模型閘道、Meta Hackathon（10/26 11:59 截止）、台灣 ADI 算力與 Rime STT 等。

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
