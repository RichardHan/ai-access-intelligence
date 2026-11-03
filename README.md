# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **791 筆**（590 項機會、47 項政策、154 筆觀察線索），更新時間 **2026-11-04 01:09 Asia/Taipei**（不代表全庫複核）。本輪局部複核 **5 筆**既有案例，其餘 **786 筆**未完成本輪複核；未新增。各案例僅核列明範圍，台灣個案資格須另確認；限時或重大條件衝突每日追蹤，其餘按月輪替。

## 使用方式

可先選「台灣條件適用、免費方案、開發者、本輪更新」快捷入口，再搜尋產品或資格關鍵字，依紀錄類別、優先層級（S–D）、地區、費用、設定時間、證據與用量篩選。免費專區排除明確已截止及宣布終止的紀錄，但設定費零不代表後續免費；歷史仍可從全部紀錄搜尋。預設按綜合優先度排序，每次顯示 24 筆；S 級仍需符合個人資格。本輪更新僅涵蓋批次紀錄明列的複核與新增案例。點開「資格、限制與來源」查看完整摘要、來源查閱時間、核實範圍與下次複核安排。

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

2026-11-04 01:05–01:09 本輪：起始 791 筆，截至01:06精確到期68筆（含已結束案例）；避開上輪剛核的 Couchbase、AkashML、Adobe 與 LM Studio。局部複核 `aicu-kumamoto-support`、`trelis-selected-grant-not-api-giveaway`、`nchc-gb200-nano4-trial`、`picsart-wan3-promotion-fair-use`、`fastino-glideis1-ten-credit-payment-verification`；新增機會、政策、線索各0，未完成複核786，讀取失敗 attempted 0。未登入、申請或付款。

NCHC 九月試用已結束，修正無來源支持的「固定點數」分類；另一企業徵案資源期限11/30，非原試用延期。AICU原救災支援已結束新申請，Trelis表單暫停；均不推論既有受領者後續處理。三者改低頻，NCHC 在企業案期限前再查。Picsart Ultra 官方價格頁年繳月折算US$60、WAN活動頁US$24.50，適用差異未明，價格衝突每日追蹤；原促銷已結束。Fastino 推論需付款驗證，訂閱可能自動續訂，停權或終止可沒收點數，推廣碼當前可兌換性未核。

新線索 Cherry Studio Community 與 Chatbox Apps 均有官方免費本機客戶端資料，但台灣下載及個案資格未核；模型、硬體及第三方API可能另有限制與成本，本輪未新增。Mango 活動頁仍列註冊US$10及11/11前七折，但年份、贈額效期與台灣付款未明；另行研究未納入本輪複核計數。

下輪優先：`mango-inference-community` 查[活動](https://www.mangoboost.io/platform/mango-inference)及[計費](https://inference.mangoboost.io/docs/operations/billing-and-payments/)的折扣年份、贈額效期與台灣付款；`fastino-glideis1-ten-credit-payment-verification` 查[官方條款](https://agent.fastino.ai/terms)及活動碼實際有效期；`picsart-wan3-promotion-fair-use` 查[價格頁](https://picsart.com/pricing/)與[WAN頁](https://picsart.com/ai-models/wan-3-0/) Ultra 價差及台灣結帳；`lets-go2-ai-ocr-launch-six-hundred-pages` 查官方活動及額度期限；`aocai-working-free-ai-courses-2026` 查官方課程與資格。依實際時間、next_review_at 與新訊號輪替；新候選可查 [Cherry Studio](https://github.com/CherryHQ/cherry-studio) 和 [Chatbox](https://chatboxai.app/pricing.md) 的台灣取得及各模型授權。

每輪先索引到期清單及前次 reviewed/new IDs；成功讀取才更新 verified_at 和具體來源查閱時間，失敗記錄嘗試而不延後一個月。僅有新條件、來源矛盾或新基準才追加政策歷史；核對完成後重算評分並執行下列測試、瀏覽器及 Pages 公開版本確認。

本專案為無後端靜態網站，可由 GitHub Pages 的 main 根目錄發布。
驗證：python tests/validate.py；node --check app.js；node tests/filters.cjs。
