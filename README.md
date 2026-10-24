# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

目前資料：344筆，包含259筆機會、44筆政策、41筆待覆核線索；非344項可直接領取優惠。資料集更新至2026-10-25 05:25 Asia/Taipei。本輪直接重開官方來源複核8筆案例（AICU熊本支援API、Meta Global AI Developer Hackathon、Vercel Laya、DeepSeek Search/Fetch、Suitup、WorkBuddy Step 5、Astamuse、GitHub Copilot Student，另修正Cursor文字），新增3筆紀錄（Novita Sandbox新戶問卷US$100額度、Baseten新工作區部署贈額、GitLab Education排除Duo AI credits政策）。341筆既有紀錄中，本輪深入查核8筆，尚有333筆未於本輪重查，未全面重核。重要變更與限制：AICU熊本災害支援API官方申請頁明列募集終了，新申請已關閉（狀態改為applications_closed，既有支援標至10/31）；Meta Hackathon申請將於10/25 11:59 PM EDT（台灣10/26 11:59 AM）截止或20,000名額滿提前關閉，正式規則預告發布中，入選者合作夥伴額度包含Baseten $100、Modal $100、Fireworks $25；Laya僅經Boundless免費至10/31；DeepSeek Search/Fetch確認11/1 00:00 UTC+8起每千次收US$0.75，目前暫免範圍收斂為Harness/Claude Code/Codex伺服器端呼叫；Suitup 7日試用及前三月20%折扣仍刊載至10/31，需先面談並於表單填寫活動名稱；WorkBuddy Step 5於10/25重查維持社群待核；Astamuse公告仍404維持待核；GitHub Copilot Student修正為13歲以上在學生（含高中與自學），無全面商業禁止條款，代碼補全不限但月AI credits未公布且無法自行取消；Novita Sandbox US$100額度限CPU/RAM沙箱且voucher期限未知，非LLM模型API；Baseten新workspace贈額依帳戶而異，綁卡後預算通知不停止專用部署；GitLab教育方案不配發included GitLab credits，需專案申請自託管100% DAP折扣。法律/監管結論除有明確官方來源外皆標未核實；資料更新不代表全庫重新核實。

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
