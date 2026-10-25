# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **417 筆**（312 項機會、46 項政策、59 筆觀察線索），更新時間 **2026-10-25 18:30 Asia/Taipei**（不代表全庫已複核）。本次複核 **14 筆既有紀錄**，重點修正包括：[Antigravity](https://antigravity.google/pricing) 依官方 FAQ 地理清單確認支援台灣（Taiwan: Yes）升級 S 級，公告 Claude 4.6 與 GPT-OSS-120b 於 2026-11-02 移除；[Hugging Face Pro](https://huggingface.co/pro) 更正設定費為 US$0（首月 9 美元為月費非設定費）；[SoftBank Perplexity](https://www.softbank.jp/mobile/service/perplexity-ai/) 查實門號解約時 Pro 即終止且台灣一般用戶不符資格（Taiwan: No）；[Kiro 學生](https://kiro.dev/students/) 與 [v0 學生](https://v0.app/students) 依官方合作學校清單確認無台灣本土大學（Taiwan: No）；[さっとFAQ](https://www.satfaq.jp/news/20260918_2/) 查實至 2026-12-31 贈 2,000 點；[AMD 開發者](https://developer.amd.com/resources/) 更正 Fireworks 50 美元兌換後永久有效直至用罄。新增 **2 項機會**：[Coze Free](https://www.coze.com/premium) 每日 10 credits 與 [Coze Workflow](https://www.coze.com/open/docs/guides/billing) 每日 10 次免費工作流測試（注意官方橫幅明示不支援台灣付費金流且條款限個人非商業用途）。新增 **2 項退役政策**：[Sourcegraph Cody Free/Pro](https://sourcegraph.com/changelog/cody-plan-changes) 證實已於 2025-07-23 全面退役；[Tabnine Basic](https://www.tabnine.com/blog/scaling-enterprise-ai-why-were-sunsetting-tabnine-basic/) 證實已於 2025-04-02 全面退役，防止過期網路教學誤導讀者。累計已實讀 145 筆既有紀錄，仍有約 **272 筆舊紀錄**待後續輪替複核。限時活動每日查，其餘按最久未核案例按月輪替；法律狀態未獲適用官方監管來源證實時維持未核實。

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
