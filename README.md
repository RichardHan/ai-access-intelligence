# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **958 筆**（753 項機會、49 項政策、156 筆觀察線索），更新時間 **2026-11-09 19:29 Asia/Taipei**（不代表全庫複核）。本輪成功局部複核 **20 筆**既有案例，新增機會 **1 筆**、政策 **0 筆**、觀察線索 **0 筆**；其餘 **937 筆**既有紀錄未完成本輪複核，整筆來源追查失敗 **1 筆**（`quillbot-student-discount-current-terms-watch` 的學生入口 302 到註冊牆、Help Center 無學生價，未刷新核實時間）。各案例僅核列明範圍，台灣個案資格須另確認；限時案例在截止前至少每週檢查一次、3 日內到期者每日追蹤，其餘按月輪替，且「下次複核」標籤必須等於實際排程（`tests/validate.py` 管制 daily ≤3 天、weekly ≤10 天、biweekly ≤20 天，且複核日不得排在仍可行動的截止日之後；期限已過卻仍非已截止狀態亦會擋下）。

## 使用方式

可先選「台灣條件適用、免費方案、開發者、本輪更新」快捷入口，再搜尋產品或資格關鍵字，依紀錄類別、優先層級（S–D）、地區、費用、設定時間、免費額度分類與證據篩選。免費額度分類（官方宣稱不限量／暫時不限量／未公布固定上限／有明確限制／尚未核實）直接讀 `quota_classification`；「無限／暫時不限量」專區也由同一欄位判定，不看個別紀錄手動標記的 views。免費專區排除已截止、疑似過期、宣布終止及重複收錄的紀錄，且由 schema 管制的設定費與每月費用判定：兩者皆為 0 一律列入；每月費用未知者只在明確標記 free 時列入；已知每月費用大於 0 的試用（例如七日試用後 US$29.99／月）不列入。設定費零不代表後續免費；歷史仍可從全部紀錄搜尋。預設按綜合優先度排序，每次顯示 24 筆；S 級仍需符合個人資格。本輪更新僅涵蓋批次紀錄明列的複核與新增案例。點開「資格、限制與來源」查看完整摘要、來源查閱時間、核實範圍與下次複核安排。

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

定價頁文字擷取可能遺失勾叉、刪除線或互動選項；斷定方案包含或排除功能前須看原始頁面呈現或標記，不把圖示旁文字一律視為包含。

服務地區篩選曾在 `regions` 這種自由文字欄位上做字串完全比對（`(o.regions||[]).includes(f.region)`）。資料有 26 種寫法（TW／Taipei, Taiwan／United States／GLOBAL／Worldwide…），選「Taiwan」因此漏掉 6 筆 `taiwan=Yes` 但存成 `TW` 的紀錄，71 筆有地區值的紀錄在任何選項下都查不到。現改由 `regionMatches()` 分桶比對（Other 收其他具名地區、排除 Unknown 與空值）；`tests/filters.cjs` 對別名與「宣稱台灣地區者必須出現在 Taiwan 選項」做規格值斷言。同類原則：任何自由文字欄位都不能用列舉選項做完全比對。
同一欄位還有第二層漏洞：`regions` 常留空或只寫 Global，台灣資格其實記在 schema 管制的 `taiwan`。2026-11-09 統計 108 筆 `taiwan=Yes` 有 33 筆不進「Taiwan」選項（20 筆 `regions` 空、13 筆只寫 Global／Worldwide，含 AWS Free Tier、Azure 免費帳戶、Amazon Polly、Google AI 開發者額度），與資料自身「台灣可用」的主張矛盾。`regionMatches()` 因此在 Taiwan 桶也接受 `taiwan=Yes`，選 Taiwan 由 83 筆增至 116 筆；`tests/filters.cjs` 以資料驅動斷言「每個 `taiwan=Yes` 必入 Taiwan 選項、`taiwan=No` 不得入、`taiwan=Yes` 不得漏進 US 選項」。通則：同一事實存在兩個欄位時，篩選必須讀有 schema 管制的那一個，並在程式註解留下不一致的筆數。

篩選與專區只能讀 schema 管制的欄位。`quota_classification` 是五值 enum，`usage_type` 卻是自由文字（2026-11-08 統計：358 種值、262 筆 null）。原本「用量類型」下拉以 `usage_type` 精確比對 3 個英文字串，選 High quota 只回 9 筆（實際 HIGH BUT LIMITED 619 筆）、選 Unlimited 只回 2 筆（實際官方或暫時不限量 7 筆），262 筆完全篩不到；已改為直接比對 `quota_classification`，並讓「無限／暫時不限量」專區由同一欄位判定，不再依賴各筆手動 `views`（先前有一筆 HIGH BUT LIMITED 被標成 unlimited）。`tests/filters.cjs` 驗證 index.html 每個選項都對應實際資料，`tests/validate.py` 擋 `views` 與 `quota_classification` 互相矛盾。

同一 URL 再次查核時就地更新該筆來源（scope、evidence、查閱時間），不新增重複條目；`tests/validate.py` 對本輪批次強制「無重複 URL」與「每筆至少一個本次查閱時間」，前端則把同網址的歷次查核收在「較早的 N 筆同網址紀錄」內。

免費專區曾只讀各筆手動 `views` 標記（schema 不管制），造成兩個方向的誤導：3 筆已知每月費用的試用（Lindy US$29.99、Lemonfox US$5、GoodMem US$15）仍列在「免費方案」，而 40 筆設定費與每月費用皆為 0 的紀錄（含 Gemini API、Claude Free、Firecrawl、台灣人工智慧學校等）因漏標 `free` 而完全不出現。2026-11-09 改由 `viewMatches()` 以成本欄位判定：兩項費用皆 0 一律列入、已知每月費用 >0 排除、每月費用未知者保留人工標記；`tests/filters.cjs` 以三種規格值斷言（零費用未標記必入、US$29.99 試用必出、未知費用且標記 free 仍在）。實測免費專區由 413 筆增至 451 筆（含本輪新增 1 筆）。

「高免費額度」與「Beta 存取」兩個專區過去同樣只讀人工 `views`：2026-11-09 統計 view=quota 僅 63 筆，而 schema 的 HIGH-QUOTA 類別有 127 筆（69 筆沒標）；view=beta 僅 15 筆，BETA-ACCESS 有 50 筆（35 筆沒標）。兩個下拉標籤與類別一一對應，已改由 `viewMatches()` 讀 `categories`；同時把「已截止紀錄退出可行動專區」擴及這兩個專區（HIGH-QUOTA 含 5 筆、BETA-ACCESS 含 4 筆已截止紀錄，先前仍會出現在專區）。實測 quota 63→122、beta 15→46（911 筆下；差額為已截止項）。`tests/filters.cjs` 以規格值斷言「所有 HIGH-QUOTA 未截止紀錄必入 quota 專區、HIGH BUT LIMITED 單獨不得入、人工 view 標記不得單獨生效、已截止仍可從全庫搜尋」，`tests/validate.py` 新增 `quota`／`beta` view 與 categories 的一致性斷言，並移除 4 筆與 categories 相反的人工標記。`regional`／`value` 維持人工標記：REGION-LOCKED 不含台灣限定補助、VALUE-DEAL 與 LOW-COST／免費高值非一對一，語意未定前不改。

「機會專區」是可採取行動的入口，但排除規則先前只覆蓋免費／無限／高額度／Beta 四個選項。2026-11-09 統計：「新創與開發者」567 筆中有 39 筆已截止或已併入他筆（含 `copilot-free`、`lovable-student-discount` 等 `duplicate_merged`），「美國與地區限定」57 筆中有 15 筆已截止，「低價高值」55 筆中有 3 筆。`ACTIONABLE_VIEWS` 因此改為列出 index.html 的七個 view 選項，任一專區都不再顯示已截止、已關閉與重複合併紀錄（全庫搜尋仍找得到）；實測 developer 567→528、regional 57→42、value 55→52（915 筆下）。`tests/filters.cjs` 對 index.html 每個選項逐一斷言「已截止／合併紀錄不得出現」，並保留反向案例（未截止的 developer 紀錄仍須入列）。同類原則：新的專區或下拉選項若語意是「可採取行動」，必須同時加進 `ACTIONABLE_VIEWS` 與這組斷言，否則又會出現第二種行為。

數值型篩選門檻一律「含等於」，標籤也要寫清楚是 ≤。2026-11-08 修掉「設定時間」用嚴格小於比對的錯誤：選 15 分鐘會排除正好需 15 分鐘的 109 筆（當時全庫 205 筆落在 5／15／30／60 邊界），修正後 884 筆下為 9／138／300／343 筆（納入本輪新增後為 9／141／303／347）。`tests/filters.cjs` 原本用 `!f(free,{effort:'15'})` 把錯誤行為釘住，這類「現況即測試」的斷言必須改成規格值，並補一個邊界外的反向案例（16 分鐘不得入 15 分鐘）。

重複收錄以資料表達：同一方案的後一筆改為 `status: "duplicate_merged"` 並填 `duplicate_of` 指向較早的 ID，保留原 ID、來源與歷史但退出免費／行動篩選並在卡片標示；`tests/validate.py` 會檢查 `duplicate_of` 必須存在、不得串鏈，且標題完全相同的兩筆視為資料錯誤（本輪即由此攔到 `copilot-free` 與 `github-copilot-free`）。

同一筆紀錄若累積了同網址的多筆來源，會讓批次驗證失敗；合併時保留最新 scope／evidence，較早的證據文字以「較早紀錄：」接在原字串後，不刪除。

平行研究回報的來源查閱時間可能與實際時鐘不符（2026-11-08 收到比實際時間快約 1.5 小時的時間戳），主 agent 須自行重讀關鍵來源、以自己讀取的時間寫入 `accessed_at`，不得直接沿用未核對的時間。此問題在 2026-11-09 01:05 批次再次發生（`completed_at` 寫成 02:40、13 筆 `verified_at` 寫在 02:08–02:34，而實際 commit 是 01:46），已由 `tests/validate.py` 的「不得寫入未來時間戳」與「`verified_at` 不得晚於批次完成」兩條斷言攔下；寫入時間一律先跑 `TZ=Asia/Taipei date -Iseconds` 對錶。

同一工作樹可能有兩個維護流程同時執行：本輪 16:03–16:17 的批次由另一個 session 先寫入並 commit（`22b95a9`），第二個流程讀到未 commit 的檔案後，先等它 commit 完成、再以它的狀態為基準追加，避免 json 半寫入與互相覆蓋。做法是：寫入前後比對 `shasum` 與 `git rev-parse HEAD`；資料檔以 tmp + `os.replace` 原子替換；批次欄位只在既有 `last_research_run` 上聯集 ID，不另建新的狀態檔。

「台灣條件適用」是頁面上第一個捷徑按鈕，卻走 `taiwan:'Yes'` 這個一般篩選、不經 `viewMatches()`，所以上一輪把「已截止紀錄退出可行動專區」擴及七個 view 選項時漏掉它：2026-11-09 統計 106 筆 taiwan=Yes 中有 10 筆已截止／已關閉／重複合併（`moda-service-robot-virtual-scene-subsidy-2026`、`taiwan-ai-rap-pilot`、`taiwan-adi-ai-compute-115`、`nchc-university-ai-compute-discount-2026`…），卡片標題自己就寫著「已截止」。現由 `presetMatches()` 讓捷徑排除已截止紀錄，`台灣條件適用` 由 106 筆降為 96 筆，全庫搜尋與 `taiwan` 下拉仍查得到這 10 筆；`tests/filters.cjs` 以資料驅動斷言「捷徑內不得有已截止紀錄」「捷徑筆數必須等於未截止的 taiwan=Yes 筆數」「一般 taiwan 篩選仍能查到已截止案例」，避免只修好當下的資料快照。

精確截止時間只存在於三個欄位：`deadline_at`（申請截止）、`expires_at`（方案或免費期結束）、`expiry`（舊式物件，含 `date`／`text`／`timezone`）。2026-11-09 統計全庫分別只有 5／5／7 筆填了這些欄位，但卡片先前只渲染自由文字的「有效期間」，於是 Amazon ARA 的台北 11/12 15:59、DataCamp 的當日 12:59 這類真正要趕的時間點只藏在段落文字裡。已新增「截止與期限」列：帶時刻者換算成台北時間並標「（台北時間）」，只有日期者標「（來源未列時刻）」，`expiry.text` 原文照列、不改成推測日期。`tests/filters.cjs` 以資料驅動斷言「有這三個欄位就必須出現該列、沒有就不得出現」，並固定四筆規格值（Amazon ARA、DataCamp、Rime STT、Claude 教師）。新紀錄優先寫 `deadline_at`／`expires_at` 的 ISO 時間；來源只給日期時不要自行補時刻。2026-11-09 14:05 追加反向檢查：非已截止狀態不得帶已過的 `deadline_at`／`expires_at`（`tests/validate.py`）。觸發案例是 `aocai-working-free-ai-courses-2026`——期限只寫在摘要與標題，欄位全空，所以「複核日須早於截止日」那條看不到它，卡片整天寫著「報名表仍開放」。通則：任何可採取行動的截止時間都要回填到機器可讀欄位，散文日期等於沒有排程；複核時若發現頁面把期限改早（本例 11/09 23:59 → 11/08 23:59），以現行頁面與表單實際狀態為準，並把兩次讀值差異留在來源證據。
可採取行動的期限仍有一批只寫在散文裡。2026-11-09 19:0x 以「標題或摘要出現截止語句、但 `deadline_at`／`expires_at`／`expiry` 三個欄位全空」掃描，仍可行動的紀錄有 37 筆，其中 8 筆的日期落在 30 天內；這些卡片的「截止與期限」列不會出現，`tests/validate.py` 的「期限已過卻仍非已截止」與「複核日須早於截止日」兩條也看不到它們。本輪只補來源逐字載明、且屬整筆方案期限的 7 筆：UGREEN 黑客松（台北 11/16 15:45）、Kiroween credits 申請（台北 12/2 04:00）、臺北產業獎勵補助（11/30，來源只列日期）、緯創算力捐贈（12/13 23:59）、中央大學機器人培訓（12/4，只列日期）、IteraCompute 免費促銷（台北 11/24 16:00）、Fireworks Muse Glimmer 免費 SFT（台北 12/1 16:00）。刻意不補的例子說明為什麼不能機械化：`ntpc-uko-microsoft-ai-cert-free-2026` 的 11/18 是單一梯次的「取消」截止、`claude-duet-preview` 自己寫明 11/30「非預覽結束日」、`ant-ling-ling-3-2-flash-free-two-weeks` 是「約至」的換算值、`speechify-api-free-monthly-500k` 的 11/21 是方案內子額度降級日、`mem0-hobby-memory-api` 的 11/25 是舊戶過渡期、`fal-flux3-max-five-daily-sandbox` 的 11/22 是折扣分段。通則：標題或摘要出現日期只是「值得檢查」的訊號，能不能寫進機器可讀欄位取決於那個日期是不是讀者採取行動的期限；把它當正則斷言會逼出錯誤資料，所以這條維持人工判斷，掃描結果留給下一輪分批處理。同輪另把 `last_review_attempt_at` 的既有缺漏補齊（4 筆只有時間、沒有原因），並在 `tests/validate.py` 加全域斷言「有追查時間就必須有原因」；原因真的不詳時寫明「未留下原因」，不能留空——留空等於讓下一輪失去當時為什麼讀不到的線索。

已截止紀錄的卡片標籤：2026-11-09 統計全庫 76 筆已截止、已關閉或重複合併的紀錄中有 73 筆帶分類標籤（`expired` 30、`applications_closed` 22、`closed` 8、`duplicate_merged` 4、`closed_to_new_subscriptions` 3、`sunset_announced` 3、`resolved_rumor_disproven` 2、`expired_unverified` 1），這些卡片仍在標題下顯示分類標籤，其中 47 筆屬「免費機會」「高額度」「Beta 存取」等可領取字樣；其中 `amazon-q-developer-free-signup-conflict` 在 AWS 2026-05-15 停止新註冊後，卡片仍以「免費機會」開場，讀者要讀完整段摘要才會發現不能申請。`createCard()` 因此對 `CLOSED_STATUSES` 內的紀錄改渲染單一歷史標籤「<狀態>・原分類：…」，資料的 `categories` 不動（歷史事實與 quota／beta 篩選語意不變，兩者是 dead-record 以外的判定）。`tests/filters.cjs` 以規格值斷言「已截止卡片只有一個 `tag-closed`」「開卡仍有分類標籤」，並固定 `chatgpt-back-to-school-us`（expired）與 `amazon-q-developer-free-signup-conflict`（closed_to_new_subscriptions）兩個案例；通則：任何「可領取」字樣都必須跟隨狀態，而不是跟隨歷史分類。

`status` 是卡片狀態藥丸與優先度計分的輸入，但 33 筆舊紀錄（22 筆機會）沒有這個欄位（2026-11-09 統計，例：`google-cloud-startups`、`mem-free-plus-agent-boundary`、`weaviate-startup-undisclosed-discount`、`photoroom-sandbox-production-separated`）。這些卡片顯示「狀態待釐清」，但 `tools/prioritize.py` 的 `note_of()` 把缺值寫成「條件式」，同一張卡片同時主張「需符合條件」與「狀態不明」；計分也把缺值當 `conditional`（1.5）。本輪沒有逐筆回填——回填等於替 33 筆未重核的紀錄下結論；新增與複核紀錄一律寫 `status`，`tests/validate.py` 對批次紀錄強制檢查。下輪要清帳必須逐筆重讀官方頁後再寫，不要用推測值一次補齊。2026-11-09 13:22 修掉其中「同一張卡片兩種結論」的部分：`note_of()` 對缺值改寫「狀態未記錄」，計分維持原來的 1.5（README 的評分說明本來就寫條件式 1.5，計分不動），並由 `tests/validate.py` 斷言「沒有 `status` 的機會紀錄，`priority_note` 必須含『狀態未記錄』」；改前 22 筆會被這條斷言擋下，改後 19 筆（本輪補了 `codex-oss-six-months`、`google-cloud-startups`、`qdrant-startup-twenty-percent` 三筆有官方證據的）全部通過。原則是：文案只能陳述資料狀態，不能替缺值下結論。

來源失效與 SPA：`amazon-q-developer-free-signup-conflict` 是本輪最重要的更正——AWS 定價頁仍逐字寫「perpetual Free Tier」，個人入門文件也仍教 Builder ID 註冊，但 AWS 2026-04-30 的結束支援公告明列 2026-05-15 起封鎖新帳號與新訂閱、2027-04-30 結束 IDE 外掛與付費訂閱，而 Docs 的 `what-is` 頁已掛結束支援 banner：同一文件集三種說法。定價頁存在不是活動有效的證據；狀態必須以公告為準，官方頁衝突要留在摘要。公告只允許「active Q Developer Pro」加新使用者，Kiro 訂閱者僅被保證續用，純免費 Builder ID 使用者不在保留名單——把三者都寫成「可加席位」會讓既有付費者誤判。`baseten-startups-inference-training` 是一次反向教訓：行銷頁 `/startup-program` 以瀏覽器渲染回 404 並自 sitemap 移除，但申請頁 `/talk-to-us/startup-program` 仍在線並逐字寫「Up to $25,000 for Dedicated Deployments or Training and up to $2,500 for Model APIs」，條款頁也可讀；先前只憑行銷頁 404 就寫成「金額已無法確認」是錯的，現在改記 `application_based_unverified_terms`（金額可核、資格門檻只剩 2026-10-21 快照）。404 不等於終止，但也不等於仍可申請；SPA 站要分別檢查行銷頁與表單頁。`jetbrains-student-pack-ai` 與 `jetbrains-ai-free` 則是靜態抽取的陷阱：`read` 直接把 `help/ai-assistant/licensing-and-subscriptions` 轉成 markdown 時漏掉分頁表格，看起來像「3 AI credits 已被移除」；但以瀏覽器渲染同一頁（含 `/2026.2/` 路徑），授權表明確寫「AI Free ｜ Free ｜ 3 AI credits per 30-days」，FAQ 另寫額度與訂閱價格相符（1 credit 約 US$1）且每 30 天自首次使用重置。真正未解的是「是否每 30 天重置」——`help/ai/ai-service-license`（凍結於 2025-06-18）寫 one-time non-renewable，同頁 FAQ 又提 30 天重置，兩說並列。教訓：官方頁「找不到某段文字」不足以證明文字不存在，表格、分頁與 JS 內嵌內容要用瀏覽器渲染再判；引用時附頁面版本或頁尾日期。AI Pro 試用期滿會轉 AI Free（`jetbrains-ai-subscription`，2026-04-22），但「不自動扣款」不是官方原文，只寫 trial remains free。同類：`https://code.minimax.io/docs/code/account/usage` 與 `https://www.photoroom.com/api/pricing` 這類頁面會用 JS 內嵌資料，直接抓 HTML 再抽字串比整頁渲染快，但金額仍要回到頁面確認。

2026-11-09 18:05–18:32 本輪（接續 dfec56b 之後，獨立 commit）：起始 954 筆；`next_review_at` 已到期 0 筆（17:46 剛結算），佇列＝11/10–12/7 期限與台灣補助 6 筆（台北青年 AI 補助 11/10 送達日、Amazon ARA 11/12 15:59、HeyGen 免費 API 11/30、微軟 Foundry harness 12/1 起計費、經濟部跨域研發補助 12/7 17:30、Google AI 憑證的 11/6 兌換窗口 vs 行銷頁 2027-01-01）＋2026-10-30／10-31 最久未核輪替 8 筆（Z.ai Flash、Recraft、Deepgram、Supabase、Supermemory、Serper、Claude Academy、Framer 學生）＋缺 `status` 與來源補核 6 筆（Humata、Lelapa、MongoDB 新創、KERNEL 新創、Past.dev、fal FLUX 3 Max）＝20 筆成功複核；新增機會 3 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 934 筆；結果 957 筆。分工：3 個 subagent（到期與期限／最久未核輪替／新機會）只回 patch，主 agent 自行重讀會改變結論的官方頁（Z.ai 定價與 ToU、BytePlus 兩頁、LG 新聞與 ToS、Nanonets、Microsoft harness 22 區清單、MOEA 公告）後才寫入。本輪只有一個模型可用（`litellm/deepseek-v4-flash-0731-gmi-ray`），任務書舉例的 gpt-6.1-terra／Gemini 未在環境中，subagent 一律用預設模型。

最重要的新機會（皆官方頁逐字，未登入未申請）：[LG K-EXAONE 2.5 API](https://www.lgresearch.ai/news/view?seq=755)（2026-11-09 開放、750B MoE／512K 上下文、韓英；**官方自我矛盾**：新聞稿寫可做 service development，同日生效的[平台 ToS](https://docs.exaone.ai/en/terms/terms-of-service) §2.1 只准 non-commercial 且禁止整合進自家產品／讓第三方呼叫；API key 30 天失效、90 天未登入休眠、輸入輸出預設可訓練、19 歲以上、配額未公布）；[BytePlus ModelArk](https://docs.byteplus.com/en/docs/modelark/free-inference-quota)（新用戶每模型 500k tokens、依模型分開計算且主帳號共用，只抵線上推論 token、不含插件／知識庫／Batch／context cache，須自行開 Free Tokens Only 才不會直接計費；[International Availability](https://docs.byteplus.com/en/docs/modelark/availability) 逐字列 Taiwan 但排除 Restricted Models）；[Nanonets](https://nanonets.com/pricing)（Starter US$50 起始 credits、免卡、團隊共用不過期、含 API 與 3 席，用完是 US$100／月 100 credits；複雜 AI block US$0.30／次）。排除並記錄原因：Upstage×AWS 機構方案與數產署 aipower 115 年已在庫（後者 `applications_closed`）、Mistral Education 屬大廠主方案、Qwen Code 免費 OAuth 已不存在、Predibase／Galileo 已被併購、turbopuffer 明寫 commercial-only、十餘個匿名模型 relay 無官方條款可查。

資料更正與釐清：

- `zai-free-flash-api-models`：台灣由 Unknown 改判 **Yes**，依據是 2026-04-14 版 ToU 的禁用地區負面表列只有伊朗、北韓、古巴、克里米亞、頓內茨克、扎波羅熱（條款層級，不是「網站在台灣打得開」）；同時確認免費的是 GLM-4.7-Flash／GLM-4.5-Flash／GLM-4.6V-Flash 三款，名稱含 Flash 的 GLM-5.3-Flash／FlashX 等都要付費，且官方沒有任何 TPM／RPM 或每日上限（FAQ 只導向登入後 console）。status conditional→active_verified。
- `google-ai-professional-certificate-tw-pro-3mo`：11/6 已過但兩說都還在——台灣與美國行銷頁註腳仍寫 2027-01-01、註腳連結仍指向同一份 [Google One offer 條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)，該條款仍 `Last updated 2025-07-31`、仍寫「must be redeemed by November 6, 2026」、台灣仍在清單。無延期或結束公告，故維持 `terms_conflict`，不逕判 `expired`。
- `moea-sme-deep-tech-cross-domain-rd-grant-116`：首次讀完申請須知 PDF，補上「每一企業以參與 1 案為上限」「一律線上、不受理紙本」「資格文件缺漏 3 個工作天補件」「保留 30% 尾款」；截止仍為單一 115/12/7 17:30、無梯次。
- `microsoft-foundry-copilot-harness-free-runtime`：harness 支援區仍 22 區、**未列台灣**（讀原文清單確認），12/1 起 sandbox 依 US$0.0994/vCPU-hour、US$0.0118/GiB-hour 計費，runtime 在 12/1 前免費；台灣讀者須在支援區部署。
- `heygen-voice-turbo-free-api-until-2026-11-30`：免費期、30 req/min、1–5,000 字元不變；新增 WebSocket 每 context 10,000 字元、文件自承有未公布的 free quota（超量以 1008 關閉），Voice 補充條款明寫「不擴大 Free 方案輸出權利」→ 商用授權仍未解；API 文件、ToS、Voice 條款與定價頁都沒有國別限制，台灣仍記 Unknown。
- `taipei-youth-ai-subscription-subsidy-2026`：18:10 重讀仍受理（服務頁仍 9/22 版、公告首頁仍 35 筆，最新 11-09 那筆是實習補助要點廢止，與本案無關），`deadline_at` 維持只有日期，`next_review_at` 排 11/10 08:00；11/10 一過必須改 `applications_closed`。
- `mongodb-startup-atlas-voyage`／`kernel-startup-two-tiers`／`past-memory-once-starting-credits`：三筆原本缺 `status`（卡片顯示「狀態待釐清」、優先度依據卻寫「狀態未記錄」），本輪重讀官方頁後補上 `application_based`／`application_based`／`active`，並補上 MongoDB 的「<7 年且 Series A 或更早、單一軟體產品、未曾入選」與 KERNEL Prototype 的「new to KERNEL、成立未滿 2 年、募資 US$1m+」逐字資格。
- `fal-flux3-max-five-daily-sandbox`：折扣排程仍以兩個 endpoint 的 llms.txt 為準（75% 折至 11/7、11/8–11/22 五折、11/23 00:00 UTC 恢復 US$0.17／US$0.29），landing 的 11/21 與 /flux-video 的 12/31 仍不一致；官方 Sandbox 文件只寫「Sandbox occasionally offers free credits」、來源是活動或個別配額，**沒有定義每日重置**——介面的「7 free generations today」不是官方保證的日額。

品質改善（1 項）：缺 `status` 的卡片同時主張兩件事。資料沒有 `status` 時，卡片藥丸顯示「狀態待釐清」，但同一張卡的「優先度依據」由 `tools/prioritize.py` 寫「狀態未記錄」；「待釐清」還暗示該筆已排入追查，而缺 `status` 的紀錄不一定有 `next_review_at` 對應的處理。本輪把 `statusInfo()` 的缺值分支獨立成「狀態未記錄」（未知字串值仍留「狀態待釐清」），並在 `tests/filters.cjs` 加四條斷言：`{}`／`{status:null}` 必須是「狀態未記錄」、未知字串仍是「狀態待釐清」、且資料中每筆缺 `status` 的機會都不得顯示「狀態待釐清」。同時把三筆已重讀官方頁的 B 級機會補上 `status`（此類紀錄由 7 筆降為 4 筆：`weaviate-startup-undisclosed-discount`、`upstage-once-ten-credit`、`nlp-cloud-trial-card-and-hard-cap`、`adobe-firefly-twelve-month-model-promotion`）。

驗證：`python3 tests/validate.py`（957 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過。瀏覽器檢查（localhost，957 筆）：資料更新 2026/11/09 18:32、全庫 957、本輪更新 23（20+3）、免費專區 606、台灣條件適用 101、S 級 89、開發者 561；LG K-EXAONE 顯示「官方說法有差異」與「免費機會／Beta 存取」、BytePlus 顯示「已核實列明主張」「S · 台灣條件適用」「台灣資格 條件式適用」、Nanonets 顯示「每月費用說明：…不是每月補回的免費額度」；`weaviate-startup-undisclosed-discount` 藥丸與優先度依據都是「狀態未記錄」；載入更多 24→48、排序與關鍵字搜尋可用；390px 寬 `scrollWidth=390` 無水平溢出，console 無錯誤。

未解缺口：`google-ai-professional-certificate-tw-pro-3mo` 的 2027-01-01 與 2026-11-06 落差無官方解釋（需實際兌換才知道）；`heygen` 的 free quota 數值與商用授權；LG K-EXAONE 的免費配額與台灣註冊；BytePlus 的 Restricted Models 清單與台灣實名認證；`nlp-cloud-trial-card-and-hard-cap` 定價頁對 curl 回 403（需 headless 瀏覽器）；`adobe-firefly-twelve-month-model-promotion` 的台灣模型表版本。

下輪輪替起點（本輪結束時最久未核、仍可行動，皆 2026-10-30）：`jules-free-fifteen-tasks-entrypoint-watch`、`codex-banked-reset-policy`、`quillbot-student-discount-current-terms-watch`、`codex-students-credits`、`kiro-students`、`quillbot-free-basic-writing-daily-chat`、`traversaal-olive-startup-twelve-months`、`openai-chatgpt-subscriber-api-credits`，接著 2026-10-31 批（`nebius-research-grants-gpu-token-tavily`、`aws-student-rewards-taiwan-excluded`、`aimlapi-free-tier-paused-watch`、`magic-hour-signup-four-hundred-seven-daily-claims`、`fashn-app-once-ten-no-free-api`）。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026` 11/10 到期：當日確認收件與否，一過就改 `applications_closed`（`youth.gov.taipei/announcement/latest-announcement`）；② `google-ai-professional-certificate-tw-pro-3mo` 11/13 排程：確認 offer 條款是否改版或延期，若 11/6 後兌換確定失敗應改狀態（`one.google.com/offer/terms-and-conditions/google-career-certificates`）；③ `lg-exaone-25-api-free-noncommercial` 每日追：查 LG 是否有商用授權說明或新聞稿修正（`docs.exaone.ai/en/terms/terms-of-service`、`lgresearch.ai/news`）；④ `fal-flux3-max-five-daily-sandbox` 11/23 00:00 UTC 原價恢復後改狀態並移除 5 折敘述（兩個 endpoint 的 `llms.txt`）；⑤ `hsinchu-city-ai-youth-digital-tool-subsidy-2026` 每日追剩餘經費與 16／18 歲版本（`dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`）。

工具經驗：`docs.byteplus.com` 與 `docs.z.ai` 的正文常不在渲染後 DOM 而在內嵌 payload，`curl` 後直接 grep 原文（`500k token free quota`）比 reader 可靠；`nlpcloud.com/pricing.html` 對 `curl` 回 403（含自訂 UA），需瀏覽器；LG 的 ToS 與新聞稿要用同一平台網域交叉讀才看得出「免費可商用」與「非商用」的衝突；Z.ai 的定價頁把 `Limited-time Free` 與 `Free` 分開標，只讀到「Free」字樣會誤判 GLM-5.3-Flash 免費。

2026-11-09 17:05–17:46 本輪（接續 c8318b7 之後，獨立 commit）：起始 949 筆；`next_review_at` 已到期 0 筆（16:33 剛結算），佇列＝11/10–11/30 的期限與台灣補助 7 筆（台北青年 AI 補助 11/10、Amazon ARA 11/12 15:59、騰訊 Hy4 11/15、AutoClaw 11/15、StepFun 11/17、Rime 11/19、新竹市補助 11/30 且經費剩 4.4%）＋官方條款／台灣可用度衝突 3 筆（fal FLUX 3 Max、Canva Education、HAL-X THX-02）＋最久未核輪替 8 筆（Lemonfox、Inception、TinyFish、AKOOL、Runware、Gumloop、NHN Cloud、Datadog）＝18 筆成功複核；另 2 筆整筆追查失敗（`perplexity-education` 連 headless 瀏覽器都停在 Cloudflare 驗證頁、`kimi-free-web-app` 定價頁 JS-only 且全站無國別清單），只寫 `last_review_attempt_at` 與原因，未刷新 `verified_at`。新增機會 5 筆、政策 0、觀察線索 0；結果 954 筆。分工：3 個 subagent（期限 7 筆、衝突＋輪替 9 筆、新機會 6 候選）；第 2 個 agent 在 34 分鐘後仍停在約 45% 且無交付檔，已明確停止，其餘 9 筆由主 agent 自行重讀官方頁完成。

最重要的新機會（皆為官方頁逐字，未登入未申請）：[Airtable Free](https://support.airtable.com/docs/airtable-ai-billing)（每位 Editor 以上每月 500 AI credits、工作區共用、計費週期重置、月底到期；Omni 建置與匯入不扣點，對資料提問每次 10 點、文件分析約 200 點，屬體驗級；Free 另有每 base 1,000 筆與每月 1,000 次 API 上限；官方明寫非營利／教育折扣方案不含 Airtable AI）、[OpenAlex API](https://help.openalex.org/access/pricing/)（免費 key 每日 US$1 用量、免付款方式、UTC 午夜重置，資料 CC0 可商用）、[Semantic Scholar Graph API](https://www.semanticscholar.org/product/api)（多數端點免金鑰、未驗證流量共享 1000 RPS、免費 key 入門 1 RPS，資料部分 CC BY-NC）、[Qualcomm AI Hub Workbench](https://workbench.aihub.qualcomm.com/docs/hub/faq.html)（官方稱 currently completely free，可 BYOM 在雲端 50+ 真實裝置編譯與剖析，未公布任何額度，需 Qualcomm ID 與 work location）、[Notion 教育方案](https://www.notion.com/help/notion-for-education)（WHED 院校學校信箱可領單成員免費 Plus，每年驗證；官方明寫 Free／Plus 的 Notion AI 僅供試用且升級 Plus 不會增加 AI 用量）。

資料更正與釐清：

- `taipei-youth-ai-subscription-subsidy-2026` 仍受理、無停收或展延公告（公告列表 34→35 筆，11-09 新增的是實習補助要點廢止，與本案無關；原 7/29 公告詳頁同日改版只補上補助專頁連結與洽詢電話）。本輪把 `deadline_at` 從 23:59 改為日期 2026-11-10：計畫原文只寫「最遲應於11月10日前提出申請」「以送達本局之日為準」，23:59 是本庫推定，卡片卻顯示「申請截止 2026/11/10 23:59（台北時間）」。紙本申請要當日送達，這個假精度會害人。
- `hsinchu-city-ai-youth-digital-tool-subsidy-2026` 新增官方版本衝突：現行申辦頁與青年發展中心頁寫「自 115/8/14 起 16–40 歲」且 90% 擴及獨立負擔家計、身心障礙、原住民、新住民及語言認證，勞工及青年處 2026-05-08 舊公告仍寫「18 至 40 歲」、90% 僅限低收／中低收，兩版並存未撤。經費餘額 17:26 仍 NT$253,197（4.4%，08:09 為 340,843／5.9%）。
- `tencent-hy4-workbuddy-codebuddy-free-window-nov4-15`：新聞稿的 11/4–15 免費窗在四個產品頁都找不到。中國站實際是「體驗版 每月 500 積分 限時免費」、國際站 Free US$0／每月 100 credits＋每日活躍 30；中國站須「已實名認證的騰訊雲帳號」，國際站 7 天 Pro 試用必須先綁卡並開啟自動續訂，試滿自動收 US$10／月（或 US$96／年）。
- `fal-flux3-max-five-daily-sandbox`：折扣排程以模型 llms.txt 收斂為 5 折至 2026-11-22、11/23 00:00 UTC 恢復 US$0.17／US$0.29；landing 的 11/21 與 /flux-video FAQ 的 12/31 仍是滯後文案，維持 `terms_conflict`。另補官方 Sandbox 文件：免費 credits 來自全球活動或個別配額，且「只能用在 Sandbox 與 Playground，不能透過 API 或 Workflows 使用」。
- `canva-education-k12-teachers-ai`：Education 的 Standard AI 走公平使用、Premium／Ultra 為 Free 的 10 倍、每位成員各自額度；同一頁的「Premium 與 Ultra 可用方案」清單仍未列 Education，矛盾保留。
- `hal-x-thx-keyless-free-decision-api`：免金鑰 60 decisions／分／IP、每個問題算一個 decision、超量回 429 加 Retry-After；文件仍無國別清單，台灣可用度維持待核。
- `runware-startup-starter-no-deposit`：Starter 免入金、最高 US$1,000 且 credits 不過期；Growth 需 US$25,000 入金才多 US$10,000、Scale 需 US$50,000 才多 US$30,000——標題的「up to $30,000」只屬於要入金的 Scale。
- `gumloop-fourteen-day-card-required-pro-trial-watch`：官方明寫試用須綁卡、每客戶一次、期滿轉付費 Pro；Pro US$37/月含 20,000 credits，超額預設上限 1,000,000 credits（US$5,000）；試用實際配額仍未公布。
- `nhn-startup-gpu-exclusion`：首次 1,000 萬韓元、總計最高 5,400 萬；需無 NHN Cloud 基礎設施使用紀錄、個人事業者不可申請、GPU 與 Notification 排除、credits 期間由顧問與合約決定且期滿失效（同一 URL 的兩筆重複來源已合併）。
- `datadog-startup-partner-up-to-hundred-k-year`：Series A 或更早、新客戶、須官方合作夥伴轉介；最高 US$100,000、為期一年；條款頁標 Last updated August 3, 2026，連續三個月無活動可被移除（三筆來源補上查閱時間）。
- `akool-education-top-thousand-studio-three-months`：官方 FAQ（原始 HTML 的摺疊內容）新增兩項答覆——研究生可申請但須指導教授背書並由教授完成驗證入口；三個月後「there is no automatic billing; you choose whether to continue」。
- 其餘輪替（Lemonfox、Inception、TinyFish、AutoClaw、StepFun、Rime、Amazon ARA）逐字重讀後金額、配額與期限皆未變，只更新來源查閱時間與範圍；Lemonfox 同一 URL 的重複來源已就地合併。

品質改善（1 項）：「推定時刻」被當成來源事實呈現。`deadlineInfo()`對任何含 `T HH:MM` 的值都渲染成「（台北時間）」加分鐘，而台北青年 AI 補助的 `deadline_at` 是 23:59 這個當日邊界推定——卡片因此宣稱一個政府沒公布過的截止時鐘，而該計畫要求紙本當日送達。修法：資料端改存日期（前端自動標「來源未列時刻」），並在 `tests/validate.py` 加兩層規則——① 只寫日期的期限以當日 23:59:59 視為最後可動作時點（`close_stamp()`），否則新竹市 11/30、Rime 11/19 這類「最後一天還整天可申請」的紀錄會在當天 00:01 被要求標成已截止，複核也不得排在當天；② 若 `unknowns` 自己寫某欄位是「推定」，該欄位就不得帶時鐘時間。修改前後都以實際資料驗過（改前擋下 taipei-youth 一筆、改後通過），瀏覽器確認卡片顯示「申請截止 2026-11-10（來源未列時刻）」。

驗證：`python3 tests/validate.py`（954 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過。瀏覽器檢查（localhost，954 筆）：資料更新 2026/11/09 17:46、全庫 954、本輪更新 23（18+5）、免費專區 604、台灣條件適用 99、S 級 87、開發者 559；Airtable 與 OpenAlex 顯示「US$0／US$0」「已核實列明主張」，台北青年補助顯示「申請截止 2026-11-10（來源未列時刻）」；390px 寬 `scrollWidth=390` 無水平溢出，console 無錯誤。

未解缺口：`perplexity-education` 的教育方案配額（unlimited vs Weekly limits）仍無法取得正文；`kimi-free-web-app` 的台灣可用度無官方依據；Canva Education 的 Premium／Ultra 資格矛盾；fal sandbox「7 次」的重置週期與是否需要帳號；Qualcomm 的服務條款頁 404；Notion 教育方案的 AI 點數上限。

下輪輪替起點（本輪結束時最久未核、仍可行動，皆 2026-10-30）：`inception-api-once-hundred-million-shared` 之後的 `supermemory-startup-research-scale`、`serper-once-2500-b2b-search`、`codex-students-credits`、`kiro-students`、`humata-free-monthly-sixty-pages`、`quillbot-free-basic-writing-daily-chat`、`lelapa-vulavula-free-hundred-api-calls`、`traversaal-olive-startup-twelve-months`、`openai-chatgpt-subscriber-api-credits`，接著 2026-10-31 一批（`nebius-research-grants-gpu-token-tavily`、`zai-free-flash-api-models`、`recraft-free-daily-credits`、`framer-student-basic-agent-credits`、`magic-hour-signup-four-hundred-seven-daily-claims`）。

下輪優先（前五項）：① `perplexity-education` 與 `perplexity-watch`：只剩 Wayback 與 Mintlify 鏡像可讀，需決定是否改以「官方頁不可讀」長期標記，並停止每輪重試（`www.perplexity.ai/help-center/*`、`web.archive.org/cdx`）；② `fal-flux3-max-five-daily-sandbox` 11/23 00:00 UTC 恢復原價後改狀態，並查 sandbox 7 次的重置週期（`fal.ai/models/blackforestlabs/flux-3-max/text-to-video/llms.txt`、`fal.ai/docs/documentation/model-apis/sandbox.md`）；③ `hsinchu-city-ai-youth-digital-tool-subsidy-2026` 每日追剩餘經費與 16／18 歲版本適用（`dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`）；④ `taipei-youth-ai-subscription-subsidy-2026` 11/10 一過就改 `applications_closed`（`tests/validate.py` 會擋），並確認是否臨時停收；⑤ `tencent-hy4-workbuddy-codebuddy-free-window-nov4-15` 11/15 後確認免費窗是否兌現、中國站體驗版是否轉付費（`workbuddy.cn/pricing/`、`codebuddy.ai/docs/ide/Account/Subscription`）。

工具經驗：Canva 說明中心對 curl 回 403／「Unsupported client」，只有 headless 瀏覽器渲染得到正文；Perplexity 連 headless 瀏覽器都停在 Cloudflare 驗證頁（Ray ID 可留存），reader 與 curl 皆不可用；Kimi 全站 JS、reader 只取到 meta，且官網與 Help Center 都沒有國別清單，「台灣可否用」不能靠頁面在線推論。`fal.ai/llms.txt` 已改為目錄頁、不再逐模型列價，價格要抓 `fal.ai/models/<endpoint>/llms.txt`。

2026-11-09 16:05–16:33 本輪（接續 cc25504 之後，獨立 commit）：起始 945 筆；`next_review_at` 已到期 0 筆（15:38 剛結算），佇列＝最久未核的台灣 S 級 8 筆（ASUS×Google AI、台智雲免費體驗、DataCamp Classrooms、Khanmigo 教師工具、Atlassian 非營利、Gradium 語音、Azure 免費帳戶、Google 開發者抵用額）＋10/30 最久未核輪替 6 筆（NAVER Greenhouse、Muse 定價、Tinker 補助、Cekura、AgentQL、OpenHands Canvas）＋缺 `status`／金額與條款衝突 5 筆（Azure Startup、Alibaba AI Catalyst、EmberCloud、DirectCloud FreeAI、Photoroom 沙盒）＋Vertex AI express mode（同一計畫，併入既有 `google-express-new-user-ninety-days`，不新增 ID）＝20 筆；新增機會 4 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 925 筆；結果 949 筆。分工：3 個 subagent（台灣 S 級／最久未核輪替／新機會）只回報告與 `/tmp/report-*.json`，主 agent 重讀所有會改變結論的官方頁並自行蓋 `accessed_at`。此環境關閉了 task 的逐呼叫模型選擇（`task.perCallModel: off`），三個 subagent 一律使用執行環境預設模型，未指定 Gemini 或 gpt-6.1-terra；本輪未使用其他模型。

最重要的資料更正（皆為「只讀得到頁面某種版本」造成的誤判，或原本只停留在索引層）：

- `naver-greenhouse-faq-index-only` 從觀察線索升級為完整案例：`www.ncloud.com/support/faq/*` 的答案正文不在渲染後 DOM，而在 HTML 內嵌的 `__NUXT_DATA__` payload；改用 curl 解析後取得 FAQ 2861／2865／3451／3452／3454 全文。金額分 4 Track（Infra 1,000 萬／PMF 4,000 萬／GTM 與 SI 各 1 億韓元），以事業者登錄號合算、最多 2 年 4 次、合計上限 1 億韓元，首期 500 萬韓元、每筆 credit 自發放起 1 年有效不可遞延；1 億上限僅限已在用 NCP IaaS 的企業，須經合作機構 NAVER Form＋機構代碼申請，credit 管理頁需先登記付款方式（不等於付費）。`verification` Unverified→Official、`quota_classification` UNKNOWN→HIGH BUT LIMITED、`status` 補 `conditional`、`limited_confirmed` true；台灣維持 Unknown（合作機構名單以韓國為主，另含新加坡三間，未列台灣機構）。
- `azure-startups` 的金額衝突收斂：FAQ（2026-10-30）寫 US$200／90 天後「additional $4,800」，里程碑頁（2026-11-03）把同一級寫成 US$5,000——US$200＋US$4,800＝US$5,000，是同一里程碑的兩種寫法，不是兩個數字；後續自動升到 US$25,000／US$50,000／US$150,000（5／7／10 個 workload、連續 60 天各維持 US$1 以上用量），Investor Network 推薦碼起 US$1,000、總額上限 US$150,000。另補終身免費 Azure 額度上限 US$350,000、須全新個人 MSA、註冊國別未列即不適用。`status` 補 `application_based`、`quota_classification` UNKNOWN→HIGH BUT LIMITED，來源由 7 筆去重為 3 筆。
- `directcloud-freeai-september-expansion` 解除 MCP 不確定：官方 FAQ 明寫 MCP 伺服器在含 Free 的所有方案可用（每人每日 50 次操作），並補上 10,000 credits／月每月 1 日重置不累積、平均每次 Q&A 約 70 credits（約 142 次／月）、每人每日 50 次 AI 操作、50 資料夾／5GB／5,000 字。`status` 補 `conditional`、加 `cost_note`（Free 只隨付費底座方案提供）。
- `photoroom-sandbox-production-separated` 的「分池」說法被官方文件推翻：Basic 與 Plus 兩份 sandbox 文件同文寫「1,000 free calls by month to the Image Editing API」，指向同一個池；10 次是 Remove Background 的 production 呼叫（無浮水印、一次性）。標題改為「每月1000次沙盒與新戶10次Remove Background」，`status` 補 `active_verified`，來源 8 筆去重為 4 筆。
- `alibaba-ai-catalyst-split-cloud-token`、`embercloud-startup-verification-payment` 補 `status=application_based` 與條款證據（Alibaba 4–5 個工作日通知、credits 排除網域／CDN／Academy／Marketplace／預付型產品、不可轉讓；EmberCloud US$100 贈額、免卡只限申請、開始建置前須 US$5 驗證儲值且依 §9 不退）。

台灣 S 級 8 筆全部重讀、結論未變，但補上證據與缺口：ASUS 條款（2026-08-05）與活動頁、press release 的結束日仍差一日（條款 2027-08-10 01:00 UTC−7＝台北 16:00 vs 2027-08-09），兩份地區清單皆列台灣、需有效付款方式且期滿自動續訂；台智雲中英文頁（modified_time 2026-08-28）確認 NTD 10,000／最長 60 天／每會員一次／不展延／排除中資／無 SLA，英文頁已無 15 天殘留字樣，移除該缺口；DataCamp 新增「高中教師國家清單兩頁不一致」（行銷頁 8 國不含新加坡，客服 FAQ 另列 Singapore）與「課程範圍兩說」（行銷頁寫 every piece of curriculum content，客服 FAQ 排除 Tableau／Power BI）；Atlassian 以原始 HTML 內嵌 JSON 取得 100% off 清單與 25 席年繳上限，`limited_confirmed` 改 true；Azure 免費帳戶條款補上台灣以 TWD 列於適用國別表、US$1 暫扣授權與 30 天內須移除消費限制；Google 開發者抵用額補「官方未明示是否需綁卡」。

其餘輪替：`thinking-machines-tinker-research-teaching-grants-watch` 兩個 Typeform 的 `accessScheduling.isFormClosed` 皆為 false、`is_public` true，確認仍收件，補上「未用 Prepaid Credits 自核發起 1 年失效」，`status` 改 `application_based`；`cekura-once-three-hundred-voice-testing-credits` 確認 300 點為一次性（PAYG 每月含額「None (pay per use)」）、語音 5 credits／分、overage 2 倍、加購 US$10–US$10,000；`openhands-agent-canvas-free-self-hosted-byok` 補 `setup_cost_usd=0`、`quota_classification=NO FIXED CAP PUBLISHED`、DeepSeek V4 Flash 為免費 routed 模型、Teams US$500／月與 5,000 sessions 界線；`agentql-trial-three-hundred-monthly-fifty-metered` 與 ToS（2026-04-21）交叉後確認試用到期與 Starter 綁卡皆無官方明文。`muse-pricing-community-lead` 只前進一半：Meta help 證實免費版有「每週」上限、用盡後可訂閱／單次加購／等重置，但「每週 100M tokens」仍只存在於執行長 2026-09-08 的 X 貼文，help、pricing 與 newsroom 都沒有，因此維持 `verification=Community reported`、`status=unverified_numeric_claims`，不把社群貼文升格為官方定價證據。

新增 4 筆機會：[Azure Translator F0](https://azure.microsoft.com/en-us/pricing/details/translator/)（每月 200 萬字元、每小時 200 萬須平均消耗、每請求 5 萬字元、並行不限；定價頁 Region 清單列 Taiwan North、幣別列 TWD，FAQ 另稱 Translator 為非區域性資源，故記台灣 Yes；文件與影像翻譯為 S1 以上）、[Google Deep Review](https://research.google/blog/analyzing-technical-documents-with-deep-review/)（2026-10-14 公開，每人每週 2 次免費、全球開放、PDF 與純文字、上傳文件不用於訓練且保留一年，超量須自備 Gemini API key；台灣未點名記 Unknown）、[TAIDE 權重授權](https://taide.stpi.niar.org.tw/public/download-model)（非專屬、全球、不可轉讓、不可再授權、無償，可修改散布並對衍生模型收費；禁軍事／非法用途、須標示修改、散布附條款副本、Gemma-TAIDE 另附 Gemma Terms 通知、僅得自授權網站取用、上游 Llama 3／Gemma 條款同時適用；中華民國法律與智慧財產及商業法院管轄，台灣 Yes；無免費推論服務，算力自付）、[Vercel Token Pass](https://vercel.com/docs/ai-gateway/token-pass)（2026-10-15 Early Access，Pro 團隊 US$30／月換 US$80 額度，限 Kimi K3／GLM 5.3／DeepSeek V4.1 Flash，額度不結轉、用完請求即失敗不自動超額，Enterprise 不可訂閱、名額有限；非免費方案，台灣 Unknown）。

排除並記錄原因（皆已寫在 agent 報告、未進資料集）：Vertex AI express mode 90 天免費層與既有 `google-express-new-user-ninety-days` 是同一計畫（已把 Vertex 文件併入該筆來源，不新增重複 ID）；Qwen Code 的 OAuth 免費額度在現行官方認證文件已不存在（四個 auth 選項全為訂閱或自備金鑰），第三方 1,000–2,000 requests/day 說法過期；ZCode／BigModel 5 天 8M tokens 與 `zhipu-bigmodel-flash-free-api` 同供應商同產品，建議併入該筆 unknowns；`fx.dev` DNS 不存在；Agnes AI、SmarToken、YepAPI、Verdent、AgentRouter 只有第三方目錄或 JS 空殼，金額與資格無法逐字取得。

品質改善（1 項）：同一張卡的狀態藥丸與「優先度依據」互相矛盾。2026-11-09 統計 21 筆機會的 `status` 是 `terms_conflict`（藥丸「官方條款有差異」）、`conflicting_official_usage_claims`（「官方說法有差異」）、`paused`（「暫停開放」）、`limited_availability`（「有限度開放」）等，但 `tools/prioritize.py` 的 `note_of()` 只認得活躍／已截止／申請制，其餘一律寫成「條件式」，於是 `jetbrains-ai-free` 卡片同時寫「官方條款有差異」與「條件式」。修法是把狀態文字改成直接讀 `app.js` 的 `STATUS_LABELS`（單一真相，避免兩邊各自維護而漂移），並在 `tests/validate.py` 加斷言：只有 `conditional` 家族可以寫「需符合條件」，其他狀態不得冒稱條件式（改前 21 筆會被擋下，改後全庫通過）。證據等級欄位同時改寫「官方來源」，避免與「官方條款有差異」相鄰時讀成同一個詞。

驗證：`python3 tests/validate.py`（949 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過。瀏覽器檢查（localhost、949 筆、16:33）：資料更新 2026/11/09 16:33、全庫 949、本輪更新 24（20+4）、免費專區 599、台灣條件適用 99、S 級 87、載入更多 24→48；Azure Translator 顯示「免費機會／高額度／容易開始」與「台灣資格 條件式適用」、TAIDE 顯示「免費機會」與準備時間 ≤60 分鐘、Deep Review 顯示「免費機會／容易開始」、Vercel Token Pass 顯示「優惠組合／低成本／Beta 存取」與「每月費用說明：不是免費方案…」、NAVER Greenhouse 顯示「需符合條件」、OpenHands 顯示「設定費 US$0」；JetBrains 卡片藥丸與優先度依據同為「官方條款有差異」；390px 寬 `scrollWidth=390` 無水平溢出；console 無錯誤。

工具經驗：`www.ncloud.com/support/faq/<id>` 的答案正文只在 `__NUXT_DATA__`，且用 reader 讀 `/support/greenHouse` 會落到 `/support/overview`（curl 直取正常）——reader 的結果不能用來判定頁面下架。`www.meta.com/help/*` 對 curl 回 400 但 `read` 正常，且 zh-hk／ja／en-gb 鏡像的「更新時間」不一致，引用以英文頁為準。Typeform 是否收件要看內嵌 `rendererData.accessScheduling.isFormClosed` 與 `settings.is_public`，不是頁面文字。Atlassian 非營利頁是客戶端渲染，條款全文在 HTML 內嵌 JSON 的 `planAdditionalDetails`。Azure 定價頁的 Region／Currency 下拉是伺服器端文字，可作為「官方點名台灣」的證據（本輪用於 Translator），但價格欄位多為 `$-` 佔位，金額必須另找 Learn 文件。時間戳再次踩到同一個坑：本輪把 `verified_at`、`completed_at` 一路寫到 16:41，實際時鐘才 16:33，被「不得寫入未來時間戳」與「`verified_at` 不得晚於批次完成」兩條斷言擋下後統一壓回 16:32；寫入前先跑 `TZ=Asia/Taipei date -Iseconds` 對錶。

下輪輪替起點（本輪結束時最久未核、仍可行動）：`runware-startup-starter-no-deposit`、`gumloop-fourteen-day-card-required-pro-trial-watch`、`nhn-startup-gpu-exclusion`、`datadog-startup-partner-up-to-hundred-k-year`、`lemonfox-first-month-api-trial`、`inception-api-once-hundred-million-shared`、`akool-education-top-thousand-studio-three-months`、`jules-free-fifteen-tasks-entrypoint-watch`、`tinyfish-search-fetch-free-wallet-eight-once`、`claude-academy-free-ai-fluency-course-badge`（皆 2026-10-30），接著 `codex-banked-reset-policy`、`supermemory-startup-research-scale`、`serper-once-2500-b2b-search`。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026` 期限 11/10 23:59（`deadline_at` 已填）：11/10 當日以[青年局服務頁](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)與[公告首頁](https://youth.gov.taipei/announcement/latest-announcement)確認有無停收或展延，期限一過必須改 `applications_closed`（`validate.py` 會擋）；② `amazon-ara-multilingual-contextual-ai-fall-2026` 11/12 15:59 截止，過期後改狀態並保留展延證據；③ `fal-flux3-max-five-daily-sandbox`：11/21 與 11/22 差一日、sandbox 7 次的重置週期仍未解（`fal.ai/pricing.md`、`fal.ai/llms.txt`、`fal.ai/sandbox`），11/23 原價恢復後改 `monthly_or_new_signal`；④ 11/16 週批次：`perplexity-education`／`perplexity-watch`（Help Center 正文與 3/day vs five/day）、`respan`／`langwatch`（ToS 與定價頁互斥）、`sloyd`（Guest 商用授權）、`kimi-free-web-app`（台灣可用度）；⑤ 7 筆仍缺 `status` 的機會（`weaviate-startup-undisclosed-discount`、`mongodb-startup-atlas-voyage`、`kernel-startup-two-tiers`、`past-memory-once-starting-credits`、`upstage-once-ten-credit`、`nlp-cloud-trial-card-and-hard-cap`、`adobe-firefly-twelve-month-model-promotion`）逐筆重讀後回填。

2026-11-09 15:05–15:38 本輪（接續 9e835ee 之後，獨立 commit）：起始 942 筆；`next_review_at` 已到期且仍可行動 0 筆（14:37 剛結算），因此佇列＝期限與可行動 7 筆（台北青年補助 11/10 送達、Amazon ARA 11/12 15:59、新竹市補助 11/30、AutoClaw 11/15、騰訊 Hy4 11/15、StepFun 11/17、Rime 11/19）＋官方矛盾 6 筆（fal FLUX 3 Max、Vast 新創、Perplexity 教育／免費額度、Canva Education、Google AI 證書）＋最久未核且缺 `status` 7 筆（OVH 新創、Sarvam 創作者、TinyFish 新創、Mem、天秤 AI、Tripo、E2E Networks）＝20 筆；新增機會 3 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 922 筆；結果 945 筆。分工：4 個 subagent（期限／衝突／輪替／新機會，同時最多 3 個，輪替在期限批次結束後才開）只回報告，主 agent 逐頁重讀所有會改變結論的官方頁、自行蓋 `accessed_at`。

最重要的資料更正：`e2e-explorer-free-versus-usage-discounts` 的官方新創頁已無法複核——`/startup-program` 以 308 轉址到 `/contact-sales`、sitemap 200 筆 URL 中已無該頁、`/startup` 與 `/startups` 皆 404、原紀錄引用的 JS chunk 也 404，且三種請求（含預設 UA 與 `Accept: text/html`）結果相同。沒有任何停辦公告，依既有慣例不判 `closed`，改記 `needs_verification` 並把 Explorer US$5K／Builder 50K／Scaler 100K 降為歷史記載；一般服務國家清單仍列 Taiwan，但新創方案的台灣資格已無官方頁可核。同日 `hsinchu-city-ai-youth-digital-tool-subsidy-2026` 的剩餘經費由 NT$340,843（5.9%，08:09 讀）降為 NT$253,197（4.4%，15:16 讀），一日再減約 8.8 萬元，複核日提前到 11/13。

兩筆矛盾用「官方自己訂的權威順序」收斂，而不是任選一頁：`fal-flux3-max-five-daily-sandbox`——`fal.ai/pricing.md` 與 `llms.txt` 明文「The exact, current price of any model is in …/llms.txt」「do not infer them from anywhere else」，兩個 FLUX 3 Max endpoint 的 llms.txt 與模型頁一致寫 50% 至 2026-11-22、11/23 00:00 UTC 恢復 US$0.17／US$0.29，故 landing 的「until November 21」（自標 updated 11/5）與 `/flux-video` FAQ 的「until December 31」（自標 updated 11/3）判為滯後文案；11/21 與 11/22 仍差一日、sandbox「No account needed」與 `/flux-video` FAQ「Do I need an account? Yes」仍並存，維持 `terms_conflict`。`vast-startup-spend-match` 改 `conditional`：現行 `/startup` 明寫「No upfront giveaways. No free trials.」、機制是 spend match（`$2,500 → $2,500 back` 是匹配範例），2026-02-06 舊文的「$2,500 in free GPU credits」未撤回，但舊文 CTA 就指向 `/startup`，且 `/startup` 引用 2026-08-20 才公告的 SOC 2 Type II，故以 `/startup` 為現行版本、舊文視為未同步行銷殘留（標題同步改掉「舊文免費說法仍衝突」）。

其餘衝突維持並補證據：`perplexity-education` 仍 `conflicting_official_usage_claims`——同一份 11187416（頁尾 Last modified on November 6, 2026）正文寫「unlimited Pro Searches」、比較表 Education Pro 欄仍寫「Weekly limits (average use)」，Help Center 16 篇方案文中沒有任何配額定義文；`perplexity-watch` 同樣不改判，因為 3/day 表格在 2026-06-10 存檔即存在，不能用更新日期把 10352998 的 five/day 判成舊版。`www.perplexity.ai` 的 `/pricing`、`/help-center/`、文章 URL（含 `.html`／`.md`）、`/terms`、`/education` 全部 403 + `cf-mitigated: challenge`（Turnstile），正文只能取官方 Help Center 的 Mintlify 鏡像與 Wayback，已在 `verification_scope` 寫明。`canva-education-k12-teachers-ai` 修正一項資格錯誤：K–12 學生可經教師邀請加入（原寫「不含學生」），並把「AI 2.0／Memory Library 是否對 Education 開放」列為仍未解的互斥說法。`google-ai-professional-certificate-tw-pro-3mo` 改 `terms_conflict`：行銷頁註腳寫 2027-01-01，但同註腳明示完整條款見 Google One 會員方案優惠條款（Last updated 2025-07-31，寫「must be redeemed by November 6, 2026」），Google One ToS（2026-10-01）§3 又把 offer 資格交給該附加條款——適用順序可判、但不能逕判活動結束，故不填 `deadline_at`（填了會與「非已截止狀態不得帶已過期限」的驗證衝突，而兩份官方文本仍互相矛盾），複核改每週。

期限 7 筆全部仍可動作、無提前截止或延期：台北青年補助服務頁仍為 9/22 版、公告首頁最新 11/5、無用罄或停收公告，期限「11月10日前」且「以送達本局之日為準」，本輪補上 `deadline_at`（23:59 為當日邊界推定，已寫進 `unknowns`；補上後 11/10 一過就必須改 status）；Amazon ARA 新增官方展延證據——徵案索引頁 `Fall 2026: Open Now` 明寫「The submission period has been extended to November 11.」；AutoClaw、騰訊 Hy4、StepFun、Rime 四筆逐字重讀無變動（騰訊的 `workbuddy.cn`、`codebuddy.ai` 首頁與 pricing 皆 JS 空殼，讀不到正文，已記在 `unknowns`）。

輪替 7 筆都補上 `status`：OVH、Sarvam、TinyFish 為 `application_based`（皆為審核制，OVH 需 7 日內遴選、TinyFish 明寫「Is approval guaranteed? No.」）；Mem、天秤 AI、Tripo 為 `active_verified`（金額與配額逐項對上）；天秤 AI 另關掉一個舊缺口——個人向け FAQ 明寫 Free 與 Lite 皆每日 80 credits、每日 0 時重置（註明資料時點 2026 年 10 月）。缺 `status` 的機會紀錄由 18 筆降為 11 筆，其餘仍待逐筆重讀，不用推測值補齊。

新增 3 筆機會（台灣均 Unknown、未登入未申請，去重比對 942 筆的 ID／標題／1,068 個來源網域，三個網域皆為新供應商）：[UiPath Community](https://docs.uipath.com/automation-cloud/automation-cloud/latest/admin-guide/community-plan)（免費、無時間上限、授權每 12 個月自動續；Maestro 每月 10,000 次執行、Document Understanding 每小時 50 份、IXP 每月 500＋100 頁、MCP 每日 50 次；限制是資料僅駐留 EU、禁止 PII、年營收逾 US$5M 僅限非商業用途、可隨時無通知終止；每月 Credits 池官方未公布數量）、[ClickUp Free Forever](https://help.clickup.com/hc/en-us/articles/44297094474391-AI-Credits-availability-and-limits)（US$0、免卡，500 AI Credits 為「one-time…does not reset」，用完 AI 功能暫停，付費方案才每月重置）、[ZoomMate Basic](https://www.zoom.com/en/products/ai-assistant/)（隨 Workplace Basic 免費，每月 3 場會議摘要、20 次 AI 查詢、3 份 Canvas 文件；官方部落格明示「availability may vary by customer type, region, and industry vertical」，故 `conditional`＋Unknown）。排除並記錄原因：Firebase Studio（停止新註冊）、Gemini CLI 免費層（2026-06-18 起由 Antigravity CLI 取代）、Hugging Face Inference Providers（Free 無月度 credits）、Copilot Studio 個人試用（無額度數字與台灣字樣，降為備選）、數發部 115 年免費算力（與 `taiwan-adi-ai-compute-115` 同一計畫，10/30 已截止）。

品質改善（1 項）：「免費機會」標籤與同一張卡的「每月費用」並列卻沒有說明。2026-11-09 統計 8 筆 `categories` 含 FREE 的紀錄帶著已知月費（US$5–399：Lindy Team 29.99、AgentMail 期滿 200、Supermemory Scale 399、ZenML 39、Inworld Creator 25、GoodMem 15、Lemonfox 5），其中 5 筆連一句說明都沒有，讀者看到「免費機會」旁邊寫「每月費用 US$29.99」只能自己猜那是期滿續用價、替代付費方案還是免費期就要付。費用欄位是歷史事實、不改；改為要求這類非已截止紀錄必須有 `cost_note` 說明該月費是什麼，並在卡片正面以「每月費用說明」列出（`app.js`）。`tests/validate.py` 對資料側強制、`tests/filters.cjs` 以資料驅動斷言「每筆這類紀錄的卡片都必須出現該說明且金額相符」＋規格值（Lindy 必寫「不是」免費試用費用、零費用紀錄不得出現該列）。Lindy 卡片實測顯示「免費機會｜設定費 US$0｜每月費用 US$29.99｜每月費用說明：US$29.99 是 Team 付費方案的月費…」。

驗證：`python3 tests/validate.py`（945 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過。瀏覽器檢查（localhost、945 筆、15:38）：資料更新 2026/11/09 15:38、全庫 945、本輪更新 23（20+3）、免費專區 596、台灣條件適用 97、S 級 85；UiPath 卡片為「免費機會／資格審核」、狀態「方案仍列示」、台灣「資格待核實」；天秤 AI 狀態改「已核實列明主張」；新竹市顯示「申請截止 2026-11-30（來源未列時刻）」與剩餘 4.4%；Vast 為「需符合條件」；載入更多 24→48；390px 寬 `scrollWidth=390` 無水平溢出；console 無錯誤。

工具經驗：`perplexity.ai` 全站 Cloudflare Turnstile 對 curl 與 headless Chromium 都回 403，官方 Help Center 的 Mintlify 鏡像（`perplexity-help-center.mintlify.app/.../*.md`）與 Wayback 是唯一可讀正文；`fal.ai` 把價格權威寫在自己的 `pricing.md`／`llms.txt`，同站行銷頁會落後數日，判斷「哪一頁是現況」要先找這種自述的權威順序。`curl` 對 `tripo3d.ai/terms`、`canva.com/help/*` 回 403，`read` 可取正文（與上一輪 `x.ai`／`runwayml` 相反），同一輪內要用兩種讀法交叉確認。subagent 回報的時間戳一律不採用：本輪收到的 `verified_at` 寫到 15:45，實際寫入時鐘是 15:38，已由「不得寫入未來時間戳」斷言攔下並統一改寫。E2E 的 308 是伺服器端轉址（不是 SPA 空殼），判斷「頁面是否還在」要同時看 sitemap 與原 JS chunk，不能只看轉址後頁面沒有關鍵字。

下輪輪替起點（本輪結束時最久未核、仍可行動）：`muse-pricing-community-lead`、`thinking-machines-tinker-research-teaching-grant`、`naver-greenhouse-faq-index-only`、`runware-startup-starter-no-deposit`、`openhands-agent-canvas-free-self-hosted-byok`、`nhn-startup-gpu-exclusion`、`cekura-once-three-hundred-voice-testing-credits`、`agentql-trial-three-hundred-monthly-fifty-metered`（皆 2026-10-30），接著 `nebius-research-grants-gpu-token-tavily`、`algolia-startups`（10-31／11-01）。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026` 11/10 當日：以[青年局服務頁](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)與[公告首頁](https://youth.gov.taipei/announcement/latest-announcement)確認是否公告停收，並在 11/10 23:59 後改 `applications_closed`（`deadline_at` 已填，`validate.py` 會擋）；② `azure-startups` 首頁現稱「up to US$150K USD in Startup credits」，與紀錄的 US$200／US$4,800／US$1,000 分級並存，需重讀 `microsoft.com/en-us/startups` 與 `learn.microsoft.com/.../use-startup-credits` 後保留衝突、不可任選；③ `fal-flux3-max-five-daily-sandbox` 追 11/21 與 11/22 差一日的解釋與 sandbox 7 次的重置週期（`fal.ai/sandbox`、`fal.ai/docs`），11/23 原價恢復後改 `monthly_or_new_signal`；④ `google-ai-professional-certificate-tw-pro-3mo` 追 offer 條款是否更新為 2027-01-01 或行銷頁改回 11/06（`one.google.com/offer/terms-and-conditions/google-career-certificates`、`grow.google/intl/zh-TW_tw/ai-professional/`）；⑤ 11 筆缺 `status` 的機會紀錄（`azure-startups`、`weaviate-startup-undisclosed-discount`、`mongodb-startup-atlas-voyage`、`kernel-startup-two-tiers`、`past-memory-once-starting-credits`、`upstage-once-ten-credit`、`nlp-cloud-trial-card-and-hard-cap`、`alibaba-ai-catalyst-split-cloud-token`、`embercloud-startup-verification-payment`、`photoroom-sandbox-production-separated`、`adobe-firefly-twelve-month-model-promotion`）逐筆重讀後回填。

2026-11-09 14:05–14:33 本輪（接續 9cbecc0 之後，獨立 commit）：起始 939 筆；`next_review_at` 已到期 0 筆（13:22 剛結算），因此佇列＝官方衝突 8 筆（JetBrains AI Free／Student Pack、Make 新創、Memobase、StackOne、Seldon、Cognee、Nscale）＋最久未核輪替 10 筆（2026-10-30 批：Yating Studio、TAIONE、Scaleway 新創、Deepnote 教育、AgentMail、OpenAI Academy、ProWritingAid、Datadog AI 觀測、LiveKit 新創、Orq Gateway）＋期限當日 2 筆（AOCAI 服務業課程、AutoClaw 週福利）＝20 筆；新增機會 3 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 919 筆；結果 942 筆。分工：3 個 subagent（衝突／輪替／新機會）只回 patch，主 agent 重讀會改變結論的官方頁（orq 定價、JetBrains licensing、Make 表單 isClosed、Cognee quickstart、Venice 定價、TRC about/faq、經濟部 Taipei-1 公告與審查結果、AOCAI 報名表）後才寫入。

最重要更正：`aocai-working-free-ai-courses-2026` 卡片寫「報名表仍開放，11/9截止」，但 14:15 重讀活動頁報名期間已改列 `2026/11/08 23:59`，報名表 `JoinPNew.aspx` 只回 `alert('…活動已結束!!')` 並導回活動頁（同日 05:13 讀到的仍是 11/09 23:59、表單可填）。改判 `applications_closed`、補 `deadline_at`、退出每日輪替（`monthly_or_new_signal`，下次 12/09），並把兩次讀值差異寫進來源證據。

Orq Gateway 是實質條件變動：BYOK 由「每月前 100 萬次、超額 4%」改為官方定價頁「UNLIMITED / Free BYOK requests」與 FAQ「routing is free, with no request limit」；平台費改 4.5% 且只適用 Orq 金鑰／credits；免費計量改為每月 100K spans、5GB 處理資料、500 agent runs，未加帳單資料仍限每日 50 requests。標題一併改掉「每月百萬次」。

JetBrains 兩筆沒有照 subagent 的「已解決」結論收尾：licensing 頁表列 `AI Free | Free | 3 AI credits per 30-days`、通用 FAQ 說每 30 天自首次使用起重置，但同頁「額度用完怎麼辦」只把「等下一個 30 天週期」列給 Trial／Pro／Ultimate，舊版 ai-service-license 又寫 one-time non-renewable——三處不一致，維持 `terms_conflict`。Student Pack 另更正：academy FAQ 明寫 AI 只是「limited trial」，期滿「continue using JetBrains IDEs with all other Student Pack features at no cost」，即沒有學生專屬的長期 AI Pro，只剩 AI Free。

其餘衝突維持並補證據：Make 申請表 `isClosed":false`（可送件）但行銷頁 6 個月 vs 申請表 3 個月；Memobase 首頁 500 credits vs 條款 50 operations；StackOne 定價「failed calls aren't billed／1 project／免卡」vs 契約「成敗皆計 1 Action Call／2 projects／超額需付款資料」；Seldon 首頁稱 Audit 已退役、試行頁步驟 02 仍是 Live Audit；Cognee 1M vs 10M tokens，且 quickstart 明寫註冊可能額滿進入 waitlist；Nscale 2025-04-02 舊公告 US$5 與現行「先加值 US$5」並存。

新機會 3 筆：`google-tpu-research-cloud-free-quota`（TRC 免費 Cloud TPU，TPU 以外 GCP 自付、不可用於 Vertex 工作流、配額 temporary 且未公布大小）、`moea-nvidia-taipei-1-free-supercomputer`（台灣限定，第 6 次徵案 7/7 截止、8/31 公告推薦 DGX 4 案＋OVX 2 案，11/9 查最新消息未見第 7 次）、`venice-free-daily-text-image-prompts`（每日 10 則文字／15 則圖像，API 另購 credits）。三者皆無重複：去重比對 1,064 個來源網域與 939 個標題，TRC／Taipei-1／Venice 皆為新供應商。

品質改善（1 項）：`tests/validate.py` 新增「非已截止狀態不得帶已過的 `deadline_at`／`expires_at`」。原本只有「複核日不得排在未來截止日之後」，反向沒有檢查，AOCAI 這類只有摘要文字寫期限的紀錄就一路顯示「仍開放」；現在只要期限寫進機器可讀欄位就擋得住（本輪全庫 0 筆違反）。同時把 AOCAI、AutoClaw 的期限回填為 `deadline_at`／`expires_at`，AutoClaw 複核日由 11/16（活動結束後）提前到 11/14。

下輪優先（各附來源）：1) `perplexity-education`／`perplexity-watch` 官方說明頁能否取得正文（`https://www.perplexity.ai/help-center/`）；2) `taipei-youth-ai-subscription-subsidy-2026` 11/10 送達期限與當日是否公告停收（`https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796`）；3) `moea-nvidia-taipei-1-free-supercomputer` 第 7 次徵案（`https://service.moea.gov.tw/EE514/tw/aiip/50.html`）；4) `jetbrains-ai-free` AI Free 是否重置（licensing 頁與舊 ai-service-license 三處矛盾）；5) `google-ai-professional-certificate-tw-pro-3mo` 條款 11/6 與行銷頁 2027-01-01 的適用順序（`https://one.google.com/terms-of-service`）。

2026-11-09 13:06–13:24 本輪（接續 10d5478 之後，獨立 commit）：起始 934 筆；`next_review_at` 已到期 0 筆（13:02 剛結算），3 日內到期 22 筆中 19 筆是當日 03:20–12:59 才核過的 daily／weekly 項，故不重複刷新。佇列＝到期與高風險 6 筆（Antigravity 11/12、Neo4j 11/12、臺北產業補助 11/12、fal FLUX 3 Max、Vast、CoreWeave）＋最久未核輪替 10 筆（2026-10-30 批：Grok、Runway、Base44、Codex OSS、Render、ScrapingBee、Nomic、Google Developer Program、Google Cloud Startups、Qdrant）＝16 筆；新增機會 5 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 918 筆；結果 939 筆。分工：3 個 subagent（到期與高風險／輪替／新機會），主 agent 逐頁重讀所有會改變結論的官方頁、自行蓋 `accessed_at`，並以瀏覽器渲染補核靜態抽取漏掉的內容（fal sandbox breakdown、Neo4j Marketo 表單）。

兩個會影響判斷的更正（皆為前版把「頁面某種狀態」誤讀成「方案狀態」）：
- `fal-flux3-max-five-daily-sandbox`：前版寫「fal 已無 FLUX 3 Max 每日免費影片」，理由是 `/flux-video-free` 308、`/flux-3-max-free` 404。實際 sandbox 仍是免費入口：頁首「7 free generations today. No account needed.」，breakdown 逐模型列 FLUX 3 Max Text to Video 1、Image to Video 1，並註明同一模型額度由各操作共用。兩個舊網址的下架不能推論免費取消；已改標題與摘要，維持 `terms_conflict`（折扣結束日 11/21、11/22、12/31 三說並存），並記「各模型數字合計遠高於 7、實際分配未說明」。
- `neo4j-startup-aura-twentyk-application-unavailable`：前版以文字版殘留字串「This form is temporarily unavailable」寫成「不能宣稱可送件」。以瀏覽器渲染申請頁，該區塊 computed style 為 `display:none`（純備援），同一頁有 38 個表單欄位、Country 下拉 223 個選項（含 Taiwan）與可見可按的 Submit；已改標題與摘要，並保留「未提交、後端是否收件未測」。

其餘實質變動：`base44-startup-partner-bootstrapped-separated` 改 `terms_conflict`——方案頁本文現在只列合作方 Pro（worth $960）與獨立創辦人 Builder（worth $480）兩個免費年約，舊紀錄的「最高 US$1,000 點、啟用後 6 個月」只剩 meta description 與結構化資料，任何官方頁都查不到 6 個月效期，不能當成可領額度。`render-startup-body-missing`：前一版列為「Build $2,500 或 $5,000 矛盾」其實是「partner」與「select partners」兩類，Scale 依募資是否達 US$1M 分 $10K／$25K，所有額度自核准起 1 年；原「每家公司限領一次」在 `/startups` 未載明，改記為 docs/credits 的促銷兌換限制。`google-cloud-startups`、`qdrant-startup-twenty-percent`、`codex-oss-six-months` 補上 `status=application_based`（三者原本缺 status）：前兩者的來源也一併修正——`/startup/benefits` 已 301 轉回 `/startup`，Qdrant 舊路徑 `/startups/` 回 404、現行頁為 `/qdrant-for-startups/`。`taipei-industry-incentive-ai-rd-batch2-2026` 補申請須知限制（補助不得超過總經費 50%、不得同時領其他政府補助、須提供至少 1 名在學學生有薪實習、一年內最多申請 2 次），並以 2026-11-05 說明會公告確認徵件仍開放、無延長或額滿；截止時刻仍只列日期。

無實質變動 9 筆（逐字重讀後維持原結論）：`antigravity-free`（免費層仍列 Gemini 3.8 Flash、Gemini 4 Argon 與 5.5 系列為付費層、11/18 移除第三方模型；新增用量面板有「每五小時上限」且 Gemini 與 Claude/GPT 分池）、`grok-watch`（20/80、六個月效期、每公司一次均對上；Cursor 衝突更明確——首頁與 meta 列 Cursor、條款 Eligible Services 不含，另頁內同時寫「約六個月」與「六到十二個月」）、`runway-referral-two-paid-months`、`scrapingbee-trial-one-thousand-credits`、`nomic-individual-work-email-twenty-trial`、`google-developer-program-standard-gear`、`vast-startup-spend-match`（spend match 與舊文 US$2,500 免費說法仍並存、無更正公告）、`coreweave-distillation-private-preview`（定價頁免費 vs 產品頁標準費率逐字矛盾，兩頁都無 preview 結束日）。

台灣面：`taipei-industry-incentive-ai-rd-batch2-2026` 仍是本輪唯一 taiwan=Yes 的實質更新，其餘台灣資格均維持 Unknown——`aws-cloud-credit-for-research` 只排除「greater China region」且未點名台灣，`google-cloud-startups` 只寫「位於 Google Cloud GA 且可自助購買的地區」（台灣有 asia-east1 彰化區域可滿足字面，但官方未點名），`neo4j` 的 Country 下拉含 Taiwan 但無國別白名單。這三種「未排除但未點名」一律記 Unknown，不升為 Yes。

新增 5 筆機會（台灣均 Unknown、未申請）：[AWS Cloud Credit for Research](https://aws.amazon.com/government-education/research-and-technical-computing/cloud-credit-for-research/)（學生上限 US$5,000、教職員 not capped、機構信箱、典型 90–120 天、僅排除 greater China region）、[AWS Education Equity Initiative](https://aws.amazon.com/about-aws/our-impact/education-equity-initiative/)（機構最高 US$10,000、個人與自用學習不受理、通常只支持一次、3 週回覆）、[RevOps.ai for Startups](https://revops.ai/startups)（US$25,000、Pre-Seed 至 Series A、募資 <US$10M、<50 人、須有夥伴關係、6 個月不結轉、免卡）、[LegionEdge Startup](https://legionedge.ai/programs/startup)（最高 US$25k 自家產品 credits、12 個月、募資 <US$5M、<20 人、不取股權）、[AI Studios Free](https://www.aistudios.com/pricing)（US$0/月、每月 3 支 1 分鐘影片、3 次配音、16 個一次性生成 credits、720p）。排除：Vectorize Hindsight 新創階梯（US$15k／3 個月，與既有 `hindsight-cloud-once-welcome-credit-amount-unknown` 同廠商，留待下輪決定併入或獨立）、Vidu／Play.ai／Airtable／Clarifai（JS 空殼或無數字）、SingleStore／ClickUp Brain（AI 關聯薄弱或額度語意不明）、多個已在庫的重複方案。

品質改善（1 項）：卡片狀態藥丸與「優先度依據」互相矛盾（見上方維護註記）。`tools/prioritize.py` 對缺 `status` 的機會紀錄改寫「狀態未記錄」，計分不動，`tests/validate.py` 新增斷言攔回歸；本輪同時替 3 筆有官方證據的紀錄補上 status，缺 status 的機會由 22 筆降為 19 筆。

驗證：`python3 tests/validate.py`（939 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過；瀏覽器檢查（localhost、939 筆、13:22）：資料更新 2026/11/09 13:22、全庫 939、本輪更新 21、免費專區 592、台灣條件適用 98、S 級 86；fal 卡片標題改為「sandbox 每日仍有免費生成」且狀態「官方條款有差異」；Neo4j 顯示「申請表可實際送件」；AI Studios Free 為 A 級、RevOps 為 A 級、AWS 兩筆為 B／C 級；載入更多由 24 增至 48；390px 寬無水平溢出；console 無錯誤。

工具經驗：`fal.ai/sandbox` 的免費模型清單只在點開「View breakdown」後的 dialog 裡，靜態 HTML 完全沒有；`neo4j.com/startup-program/apply/` 的 Marketo 表單需等 `mktoFormsXDIframe` 載入後才數得到欄位（第一次量到 0 個，重試 5 秒後才有 38 個）。兩者都是「靜態頁看得到的文字不是完整內容」的同一類陷阱。`x.ai` 對 curl 回 403 但 `read` 可取全文，`help.runwayml.com` 相反（curl 403、`read` 可讀）；同一輪內要用兩種讀法交叉確認。

下輪輪替起點（本輪結束時最久未核、仍可行動）：`azure-startups`（11-02）、`alibaba-ai-catalyst-split-cloud-token`（11-02）、`upstage-once-ten-credit`（11-07）、`nlp-cloud-trial-card-and-hard-cap`（11-08）、`weaviate-startup-undisclosed-discount`／`mongodb-startup-atlas-voyage`／`kernel-startup-two-tiers`／`past-memory-once-starting-credits`（11-09 05:08，當時未寫 status）。

下輪優先（前五項）：① 19 筆缺 `status` 的機會紀錄逐筆重讀後回填，先做 `azure-startups`、`alibaba-ai-catalyst-split-cloud-token`、`weaviate-startup-undisclosed-discount`、`mongodb-startup-atlas-voyage`（已有 11-09 05:08 的 verification_scope 可作為起點，但仍需重讀官方頁才能寫 status）；② `fal-flux3-max-five-daily-sandbox` 追 sandbox「7 free generations today」的重置週期與各模型配額分配（fal.ai/sandbox、docs FAQ），並確認 11/21／11/22／12/31 哪一個是折扣真正結束日；③ `neo4j-startup-aura-twentyk-application-unavailable` 追台灣公司送件後的實際回覆與額度書面到期日（無官方公告可查，只能等回覆；若仍無訊號改 `on_new_signal`）；④ Vectorize Hindsight 新創階梯（US$15k／3 個月）決定併入 `hindsight-cloud-once-welcome-credit-amount-unknown` 或獨立成筆，並重讀 docs.hindsight.vectorize.io 確認歡迎額度是否與階梯共用；⑤ `base44-startup-partner-bootstrapped-separated` 追官方是否把 US$1,000 credits 與 6 個月效期補回本文或正式移除（`/solutions/startups`、登入後條款），目前只能記為官方文字衝突。

2026-11-09 11:05–13:05 本輪（接續 bd40dfa 之後，獨立 commit；11:05–12:02 的候選由同一工作樹的前一個 session 寫入，12:05 起由本 session 接手核對、修正與發布）：起始 929 筆；`next_review_at` 已到期 0 筆（10:27 剛結算），3 日內到期 22 筆中 19 筆已在當日 03:20–12:27 核過，故不重複刷新；佇列＝時限與期限 8 筆（DataCamp 台北 12:59、Amazon ARA 11/12 15:59、臺北青年 11/10 送達、騰訊 11/15、StepFun 11/17 11:59:59、Rime 11/19、新竹市 11/30、HeyGen 11/30）＋最久未核輪替 7 筆（AWS Educate、Gemini API、Gradium、JetBrains Student Pack、You.com、Amazon Q Developer、Pinecone）＋最舊 S 級 4 筆（Google Cloud Free Trial、AWS Free Tier 新客戶額度、Apple Foundation Models、JetBrains AI Free）＋Baseten 1 筆＝20 筆。局部複核 20 筆、新增機會 5 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 909 筆；結果 934 筆。並行 3 個 scout 核對高影響結論（AWS／JetBrains／Pinecone＋Baseten），主 agent 逐頁重讀所有會改變結論的官方頁、自行蓋 `accessed_at`，並以瀏覽器渲染補核靜態抽取漏掉的表格；scout 無法讀本機時鐘，回報時間一律不採用。

實質變動與更正：`amazon-q-developer-free-signup-conflict`（A→D）依 AWS 2026-04-30 公告改 `closed_to_new_subscriptions`、`expires_at 2027-04-30`、重寫標題與摘要——原紀錄把仍掛著的定價頁當現況，寫成「舊終止新註冊說法不成立」，但公告明列 2026-05-15 起封鎖新帳號與新訂閱、2027-04-30 結束 IDE 外掛與付費訂閱，且只有 active Q Developer Pro 可加新使用者（Kiro 訂閱僅保證續用、純免費 Builder ID 不在保留名單）；定價頁與入門文件的舊述保留為並存矛盾，Kiro Free 每月 50 credits、Pro US$20 另記。`pinecone-starter-free` 補 2026-11-04 至 12-31 的暫行 embedding 額度（Starter 10M、Builder 20M tokens／月／模型，2027-01-01 回復 5M）與 Builder US$20 固定月費、超量硬停，並記 rerank 文件與定價頁不一致。`jetbrains-student-pack-ai` 與 `jetbrains-ai-free` 同步改 `terms_conflict`，並在 12:35 自我更正一次：靜態抽取漏掉 licensing 頁的分頁表格，實際以瀏覽器渲染後，授權表仍列「AI Free ｜ Free ｜ 3 AI credits per 30-days」，所以「3 credits」不是已移除的數字；未解的是「是否每 30 天重置」（ai-service-license 寫 one-time non-renewable 並在自身 FAQ 提 30 天重置）。同一事實若只改一筆，就等於兩個結論，故兩筆同步並追加更正型 history。`baseten-startups-inference-training` 行銷頁 404、已自 sitemap 移除，但申請頁 `/talk-to-us/startup-program` 仍逐字寫 US$25,000／US$2,500，故改 `application_based_unverified_terms`（金額有現行頁支持、資格門檻只剩舊頁與快照），並刪除重複的條款頁來源。

時限類 8 筆逐字重讀、無提前結束或延長。DataCamp 活動頁在 12:44（台北截止前）仍掛完整條款與報名表單，13:00 截止後再讀：頁面仍在線、仍寫「until November 8」並保留註冊表單，但沒有延長或新一期公告，且條款明寫「After the Free Week Period, users will no longer be able to access the Premium Features … regardless of when during the Free Week Period the user actually signs up」，故改 `expired`、複核改 `monthly_or_new_signal`（12/09 追新一期）——頁面存在不是延長證據，AI Tutor／Google Labs／Microsoft Fabric 原本就不在範圍內。Amazon ARA 截止 11/12 15:59 與獎額（現金與 AWS credits 各平均至多 US$50,000）未變；騰訊新聞稿仍寫 11/4–15 WorkBuddy／CodeBuddy 免費、TokenHub 5 折至 12/31；StepFun 免費至 11/17 11:59:59、12:00 起新價；Rime STT 11/19 後 Flex US$0.002／分；新竹市剩餘經費仍 NT$340,843（5.9%）、無額滿公告；臺北青年補助最遲 11/10 送達、無停收公告；HeyGen 免費至 11/30、免費請求不會轉付費。其餘 7 筆無實質變動：AWS Educate（13 歲以上、免卡）、Gemini API（免費層仍列 3.8／3.6 Flash，4 Argon 無免費層；舊 docs 301 至 aistudio）、Gradium（31m-en Apache 2.0、40m 系列 CC BY-NC）、You.com（新戶 US$100、Web Search US$5/1k calls）、Google Cloud Free Trial（US$300／90 天，credit 不能用於 AI Studio Gemini API）、AWS Free Tier（US$100＋探索最多再 US$100、6 個月）、Apple Foundation Models（本機推論 free of cost；伺服器端功能另有每日限制與未來付費擴大）。

新增 5 筆機會（台灣均 Unknown、未申請）：[Akamai Cloud Rise](https://www.akamai.com/cloud/start-ups/rise)（首年 US$500–120,000 credits、三年計畫、成立未滿 7 年、新客、需公司網域與信用卡、審核 1–2 週；live 403，以 2026-10-09 官方頁快照核對）、[GREENAIBOX](https://www.greenaibox.com/solutions/startups)（pre-seed／seed 最高 US$25,000、Series A 最高 US$100,000、12 個月效期、成立未滿 5 年且募資 <US$25M）、[Fin／Intercom Startup Pack](https://fin.ai/startup-pack)（Fin AI Agent 首年免費、US$6,500 Fin credits、未滿 50 人、核准後 60 天內兌換）、[MiniMax Code 簽到](https://code.minimax.io/docs/code/account/usage)（每日 400 點、第 4／7 天各 1,000 點、整週 4,000 點、30 天有效；換算率未公布）、[Runable for Startups](https://runable.com/programs/for-startups)（US$5,000 credits、當週入帳、人工審核；與免費日額度 1,500／日、15,000／月上限分開）。排除：cto.new、Qoder Qoduck、xAI Startups（皆無公布數字）、Supermicro JumpStart（無額度）、Nexconn（非 AI 模型額度），以及已收錄的 Inception／Fish Audio／HeyGen／Brave／Deepgram／AssemblyAI／Tavily／Runway／PyAI／Murf／E2B／Runpod／Modal／Together／Baseten／NVIDIA Inception。

品質改善（1 項）：已截止紀錄的卡片標籤（見上段維護註記；全庫 76 筆已截止／已關閉／重複合併，其中 73 筆帶分類標籤）。瀏覽器檢查（localhost、934 筆、13:05）：資料更新 2026/11/09 13:02、全庫 934、本輪更新 25、免費專區 587（DataCamp 轉 expired 後退出）、台灣條件適用 98、S 級 86；Amazon Q 卡片標籤為「已停止新訂閱・原分類：免費機會、容易開始」且不再進免費專區；JetBrains AI Free 標題為「每30天3點，重置與否兩份文件矛盾」、狀態「官方條款有差異」；Baseten 顯示「申請條款待核」與 US$0 設定費；DataCamp 顯示「優惠已到期・原分類：免費機會」、D 級，且不在免費專區；載入更多由 24 增至 48；390px 寬 scrollWidth=390 無水平溢出；console 無錯誤。驗證：`python3 tests/validate.py`（934 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過。

工具經驗：`tools/prioritize.py` 會改寫 `data/offers.json`，任何「先讀進記憶體、再寫回」的流程都必須在外部工具之後重讀檔案，否則會蓋回優先度（本輪改為先寫資料、最後才跑 prioritize 並重驗）。官方頁「找不到某段文字」不等於文字不存在：`read` 的 HTML→markdown 轉換會漏掉表格與分頁內容（JetBrains licensing 頁的 AI credits 表就是這樣漏掉，差點把 3 credits 判成已移除），關鍵數字要用瀏覽器渲染再確認。SPA 站的靜態 200 也可能只是外殼：Baseten `/startup-program` 靜態抓取回 200，瀏覽器渲染後卻是 404，而申請頁 `/talk-to-us/startup-program` 才是有效入口。同一工作樹可能有兩個維護流程同時執行：本輪 12:31 觀察到另一個流程覆寫 JetBrains 兩筆紀錄與 README，接手時先比對內容與來源、再統一成一份可驗證的版本，不要直接覆蓋。全庫來源網址 2,492 個，整批連結檢查會超過單次 eval 時限，下輪要用可續跑的批次。DataCamp 這類活動頁在結束後仍會掛報名表單，`status` 只能依條款與公告判定。

下輪輪替起點（本輪結束時最久未核、仍可行動）：`grok-watch`、`base44-startup-partner-bootstrapped-separated`、`runway-referral-two-paid-months`、`codex-oss-six-months`（2026-10-30），接著 `nebius-research-grants-gpu-token-tavily`、`recraft-free-daily-credits`、`zai-free-flash-api-models`、`framer-student-basic-agent-credits`（10-31），再到 `cerebras-trial`、`elicit-basic-free-research-monthly-pool`、`github-codespaces-personal-free-quota`（11-01／11-02，A 級）。

下輪優先（前五項）：① `datacamp-free-access-week-november-2026` 追是否推出新一期或改版（campaign 頁、DataCamp blog），並確認已下載的 statement of accomplishment 是否仍可存取；② `amazon-q-developer-free-signup-conflict` 追 AWS 是否更新定價頁日落提示、Kiro 是否承接既有免費用戶，以及 Kiro 付費方案帳單國家清單未列台灣是否影響台灣使用者（aws.amazon.com/q/developer/pricing、kiro.dev/pricing）；③ `baseten-startups-inference-training` 追錄取門檻何時回到公開頁或確認行銷頁永久下架（/talk-to-us/startup-program、sitemap）；④ `jetbrains-student-pack-ai` 追 JetBrains 是否統一 AI Free「每 30 天 vs one-time」說法，並取得 swot 的 163 個 .edu.tw 網域清單；⑤ 33 筆缺 `status` 的舊紀錄（22 筆機會）逐筆重讀後回填，先做 `google-cloud-startups`、`mem-free-plus-agent-boundary`、`weaviate-startup-undisclosed-discount`、`photoroom-sandbox-production-separated`，並把 `prioritize.py` 缺值文案改成「狀態未記錄」。

2026-11-09 10:05–10:36 本輪（接續 73ba1a1 之後，獨立 commit）：起始 926 筆；`next_review_at` 已到期 0 筆（09:21 剛結算），3 日內到期 20 筆中 18 筆是當日 03:20／08:20 才核過的 daily 項，故不重複刷新；佇列改為最久未核輪替 8 筆（2026-10-30 寫入、monthly 未到期但為全庫最舊，且多為 A／S 級）＋官方衝突與證據缺口 6 筆＋Bright Data Free 1 筆。局部複核 15 筆、新增機會 3 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 911 筆；結果 929 筆。3 個 scout 平行研究（輪替／衝突／新機會），主 agent 重讀所有會改變結論的官方頁後才寫入；DataCamp 免費週在 10:14 重讀活動頁，仍是原截止時刻（台北 11/9 12:59）、無延長公告，因 08:20 才完整複核過，本輪不刷新其 verified_at。

衝突收斂 4 筆。`hackclub-ai-teen-free-api-budget-conflict`：服務 Rules 寫 US$3/日（00:00 UTC 重置、402、需寄信才能提高），readme 站內 /services 同樣寫 $3 daily limit 並解釋日限由來，只有首頁散文寫 $4 → 以 $3 為有效規則、$4 視為未同步舊述（不宣稱官方公告變更）。`openrouter-startup-referral-three-five-conflict`：公開頁 up to US$3,000（2026-06-17 存檔為無 up to 的 $3K）是標準推薦額度，條款 §3 的 US$5,000 是明示依 referral source／verification／capacity 的裁量上限，兩者不同層級，$5,000 的適用條件仍無官方文字。`chroma-cloud-new-user-five-credit-terms-gap`：US$5 綁 Starter，Team 另為 $100 credits 且明示不 rollover；§11 的 30 日屬「免費／試用／beta 存取期間」，與 credit 效期分屬不同客體（推論，條款未指名 Starter），領額是否須綁卡仍未核。`tripo-api-free-credits-index-mismatch`：API 四份官方文件皆為 pay-before-you-go、無新戶免費 credits，Help Center 明示 API credits 須另購且 Studio 月配額不能呼叫 API；索引的 300/2 週與 2,000 在任何官方頁都對不上，最接近者為 Studio（web app）Free 200 credits/月，維持觀察名單並改 status=unverified。

Perplexity 兩筆改以官方 Help Center 的 Mintlify 鏡像取得正文（canonical `www.perplexity.ai` 與 `/pricing` 仍 403），並更正前版推論：`10352998` 於 2026-07-16 更新後仍寫 five Pro Searches/day，而 3/day 表格在 2026-06-10 存檔已存在，無法用更新日期排序，兩說屬同期並存；Education Pro 的 US$10／月只出現在方案總覽 11187416（教育專文僅寫 at a discount），正文 unlimited 與同頁表格 Weekly limits 仍未同步。`speaknotes-sixty-live-not-sandbox-unlimited` 條款改版為 2026-11-05（取消至期末、未用不退、內容不用於訓練），預付包增為 1,000/$10、5,000/$40、25,000/$150，扣點表新增 YouTube 摘要 1/分鐘，免費額度不變。`speechmatics-starting-hundred-not-recurring` 不再寫成條款矛盾：ToS §5.1 的月免費時數以 Portal 公布為準，Portal 已具體化為一次性 US$100。`brightdata-ai-mcp-monthly-fivek-shared` 補 status=conditional，並記錄官方受限司法管轄清單（註冊、登入、公司、帳單）未列台灣，Proxy 另有一次性 US$2（7 天）與加付款方式 US$5（30 天），不在月池。其餘 6 筆輪替（Soniox、AgentMail Free、Supermemory、Azure for Students、AI Horde、Pollinations Classic）逐頁重讀後額度與條款未變，僅補 per-source 查閱時間與 verification_scope。

新增 3 筆機會：[Mux](https://www.mux.com/pricing)（每月 10 萬 delivery 分鐘＋10 萬 Robots units 免費、免卡、PAYG 另有 US$20 月 credit；Robots 1,000 units=US$0.01，故免費 AI units 僅值 US$1，條款允許在 AI Addendum 條件下訓練模型）、[Honeycomb Free](https://www.honeycomb.io/pricing)（每月 20M events／100M metrics 點，含 Canvas AI Copilot、MCP、Agent Timeline，官方稱 free forever；需卡與超量行為未取得）、[Mixpanel for Startups](https://mixpanel.com/startups)（首年 1B events 全功能免費，官方稱價值 US$145,000；成立 <5 年、募資 ≤US$8M、90 天內須開始送資料）。三者台灣資格官方均未表列，維持 Unknown。排除 Amplitude（與 Mixpanel 同構、擇一）、Intercom Fin Startup Pack（聚合既有 16 筆計畫）、Salesforce Launchpad（無金額期限）、Notion Education（AI 僅試用）。

品質改善（1 項）：服務地區選「Taiwan」漏掉 33 筆 `taiwan=Yes`（詳見上方維護註記），`regionMatches()` 改為在 Taiwan 桶接受 `taiwan=Yes`，實測 83→116 筆，並以資料驅動斷言鎖住「taiwan=Yes 必入、taiwan=No 不得入、不得漏進 US」。瀏覽器檢查：929 筆載入、本輪更新 18 筆（15+3）、台灣條件適用 98、免費專區 584、再顯示 24 筆、排序 S→D／最近核實可用、Amazon ARA 截止列顯示「2026/11/12 15:59（台北時間）」、桌面與 390px 寬皆無水平溢出、console 無錯誤。

下輪優先：① `datacamp-free-access-week-november-2026` 以[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認 11/9 12:59 後是否結束並改 expired，同時查是否推出新一期；② `perplexity-education`／`perplexity-watch` 的 3/day vs five/day 與 unlimited vs weekly limits 改查 11 語系鏡像或官方部落格；③ `honeycomb-free-canvas-ai-copilot` 查 ToS 與註冊流程補「需卡／超量行為」（docs 免費層頁 404）；④ `amazon-ara-multilingual-contextual-ai-fall-2026` 截止後確認是否延期或下一輪徵案；⑤ `tripo-api-free-credits-index-mismatch` 若仍無官方新訊號，改 on_new_signal 避免每月重查。

2026-11-09 09:05–09:21 本輪（接續 b2164ae 之後，獨立 commit）：起始 923 筆；局部複核 14 筆、新增機會 3 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 909 筆；結果 926 筆。開始時 `next_review_at` 已到期 0 筆（08:26 剛結算），3 日內到期 21 筆但其中 18 筆是當日 03:20／08:20 才核過的 daily 項，故不重複刷新；佇列改為：最久未核輪替 6 筆（2026-10-29／10-30 寫入、monthly 未到期但為全庫最舊）+ 官方衝突與證據缺口 7 筆 + Databricks 合計上限 1 筆。分工：3 個 scout（輪替、衝突、新機會），主 agent 自行重讀所有列明主張的官方頁後才寫入。

實質變動 1 筆。`letta-free-deepseek-end-unverified`：官方定價頁（docs.letta.com/pricing）已改寫，Free 卡逐字列「Up to 3 stateful agents」「Bring your own API keys and external coding plans」「Purchase credits for Letta-hosted models」，FAQ 明寫「The Free plan has no included model usage」，舊紀錄主張的「rotating free models／DeepSeek 免費使用」已不在頁面；Pro 亦改為 US$20/月含 US$20 credits、20 agents（舊紀錄寫 API Plan unlimited agents）。狀態由 `conditional` 改 `expired`、`verification_scope` 寫明「官方未公告終止日，故記已到期而非特定截止日」，並改為 `on_new_signal`，不再每月重查一個只有靜態頁的線索。

比例並列不任選 1 筆。`openlayer-basic-trial-twentyk-inference-logs`：定價頁寫 Basic「Trial, ready to start for everyone」與 20,000 requests/月（「Each trace you send counts as one request」），條款 §1.2 卻寫「any Evaluation Services trial period will expire 60 days from the trial start date」並限內部評估、不得生產使用。兩份都是官方頁，範圍不同（配額 vs 期限與用途），因此並列並在 summary／access_risk 說明「期滿後處理未公布」，不描述為永久每月 20,000；`usage_type` 由「推論日誌」改為 requests。同時補上 Openlayer 明示不以 Customer Data 訓練（與 Zep 相反），避免兩筆被讀成同一風險。

欄位補強但結論不變 12 筆。`zep-free-monthly-tenk-data-training`（補 5 個自訂 entity & edge types、Agent Skills 免費至 2027-01-04、at-will 終止；定價頁 Flex 列的「Free trial credits 10,000/mo」屬付費方案試用，與 Free 方案同名不同義，已寫明不衝突）；`helium-for-cause-nonprofit-50k-watch`（12 個月合作含續約與季度檢視、5–7 工作日回覆、額滿即關閉；官方只寫「25+ countries」無清單，故 regions 維持空陣列）；`cloudrift-ai-grant-gpu-credits-watch`（每兩週審核、每月第 2／4 個週二通知、18 歲、申請內容 IP 不轉讓）；`giskard-...-closed-beta-watch`（頁面 Last Published 2026-10-29 仍上線、名額與期限未公布）；`taiwan-sme-ai-talent-training-2026`（見下）；`confluent-startups-cloud-credits-watch`（三項權益不變、全文無資格條件、Apply now 只導向頁內錨點）；`xiaomi-mimo-signup-credit-current-issuance-watch`（贈額仍無金額與期限、頁尾 Update Time 2026-05-28）；`civo-new-user-250-credit-watch`（四種效期說法並存未解）；`landingai-ade-explore-credits-watch`（1,000 credits、US$0.01/credit、90 天）；`zenrows-free-monthly-five-k-shared-credits`（5,000/月、5 併發、免卡、不結轉、404/410 仍扣點）；`gmi-a16z-first25-two-k-spend-five-k-credit`（首月 US$2,000 解鎖 US$5,000、90 日、限前 25 家 a16z 投資組合）；`neon-databricks-startup-combined-cap`（僅以 Databricks 官方頁確認「合計最高 US$200K」與申請／投資人轉介路徑，Neon 兩級金額沿用 11-02 複核並在 `verification_scope` 寫明本輪未重讀 neon.com/startups，避免把局部複核寫成全面驗證）。

台灣面 1 筆變動。`taiwan-sme-ai-talent-training-2026`：找到需註冊帳號的企業申請平台 `cisa.tw/smelearning`（原紀錄只有一筆來源），確認主辦為經濟部中小及新創企業署、正式名稱與內容（200+ 門免費 AI 主題課程、10GB 雲端空間、輔導經費可彈性用於內外訓）。`taiwan` 由 Unknown 改 Yes（計畫屬台灣、對象為台灣中小企業），分類補 FREE、views 補 free；但收件截止日、名額與個別中小企業認定仍未公布，狀態維持 `needs_verification`——「台灣計畫」不等於「現在可以報名」。

新增 3 筆機會：[Amazon Polly 免費層](https://aws.amazon.com/polly/pricing/)（Standard 每月 500 萬字元、Neural 100 萬／Long-Form 50 萬／Generative 10 萬字元限前 12 個月，逾額 US$4／US$16 每百萬字元；`taiwan: Yes` 依 Free Tier FAQ「available to all new customers」與排除清單只含中國 ZHY／BJS、GovCloud，但 Polly 是否在新 Free plan 白名單未核，已列 unknowns）；[Token Harbor Free](https://tokenharbor.ai/pricing)（US$0、免卡、免費路由 DeepSeek V4.1 Flash／MiMo V2.6 Flash／TH-Rudder，額度按 list price 價值計、每人 7×24 小時滾動重置、金額未公布；免費帳戶 60 請求/分、1,800/小時、單請求 4MB；開啟免費路由即同意員工可讀對話、上游可訓練——已寫進 access_risk，`taiwan: Unknown` 因排除清單未列台灣但未正面確認）；[Clean APIs Free](https://cleanapis.com/pricing)（0.5M tokens／月、免卡、33 款模型；同頁 60 vs 80 請求/分不一致，狀態記 `terms_conflict`；條款自承 API gateway、不託管模型、模型名稱可能與上游不同，營運主體未揭露）。

去重與排除：Mango Inference（已在庫 `mango-inference-community`）、Databricks for Startups（已有 `neon-databricks-startup-combined-cap` 涵蓋合計上限，故只更新原 ID 不新增）。排除 BytePlus ModelArk（官方免費頁為 JS 空殼）、Vidu Free（頁面只寫 receive trial credits 無數字）、OpusClip Free（Free 欄只列功能）、fal H3 Max（model 頁 404）、YepAPI／AgentRouter（404 或空殼 console）、Experiential Labs（需綁卡且月額僅等值 US$1）、Nexconn（即時通訊 SDK，非 AI 生成額度）；Oracle Academy 因與既有 Oracle Cloud Free Tier 重疊且官網 403 未收。

品質改善見上段「截止與期限」列。驗證：`python3 tests/validate.py`（926 筆）、`node --check app.js`、`node tests/filters.cjs`（免費 581、quota 126、台灣條件適用 98/108、S 級 86）全通過；`git diff --check` 無空白錯誤。

工具經驗：這輪三個 scout 都在時限內交出可用的逐字 quote，但三份報告的 `accessed_at` 一律不可用（無法讀時鐘），全部由主 agent 重讀後以 `TZ=Asia/Taipei date -Iseconds` 蓋章；凡是 scout 宣稱「已終止」的案例，回到官方頁後都只支持「頁面仍在／未公布條件」，故沒有任何一筆因 scout 判斷而改 `expired`——唯一改狀態的 Letta 是主 agent 自己讀到定價頁改寫。`read` 對 docs.letta.com、openlayer.com、zenrows.com 會走 content negotiation 直接取 markdown，對 aws.amazon.com、tokenharbor.ai、cleanapis.com 則回原生 HTML；Civo 的 FAQ 一頁內同時存在「21 天內綁卡」與「發放次月底失效」兩種窗口，這是四說並存的來源，不能只引其中一句。Giskard 封測頁在 content negotiation 下只回頁首與 CTA，交付物描述要另讀原始頁才拿得到。

本輪自己踩到一個資料覆寫陷阱：`tools/prioritize.py` 直接改寫 `data/offers.json`，而主 agent 先把整份 JSON 讀進記憶體、逐筆改完才寫回；中間若跑過 prioritize，再用舊的記憶體副本寫檔就會把算好的 `priority_score`／`priority_tier` 蓋回舊值（本輪就是這樣讓 3 筆新紀錄的優先度變成 null，被 `tests/validate.py` 的「opportunity 必須有優先度」斷言攔下）。正確順序是：外部工具改檔後重新 `json.load`，或把自己的寫入排在任何外部工具之前，最後才跑 prioritize 並重跑驗證。

下輪優先（前五項）：① `datacamp-free-access-week-november-2026` 台北 12:59 後改 `expired` 並移除免費存取敘述（campaign 頁、status.datacamp.com）；② `letta-free-deepseek-end-unverified` 追官方是否補上舊免費模型的終止公告與 Free 方案資料訓練條款（docs.letta.com、letta.com/terms-of-service）；③ `openlayer-basic-trial-twentyk-inference-logs` 確認 60 天試用期滿後的處理與是否需綁卡（app.openlayer.com 註冊流程、support）；④ `civo-new-user-250-credit-watch` 追官方是否統一四種效期說法，並確認台灣發卡能否通過 Stripe 驗證（civo.com/legal/terms、docs/faq）；⑤ `token-harbor-free-rolling-7day-allowance`、`cleanapis-free-500k-tokens-month` 兩筆新閘道需在 11/16 前確認：Token Harbor 免費額度是否公布金額、Clean APIs 限流 60／80 何者為準與營運主體（tokenharbor.ai/docs、cleanapis.com 條款與 status）。

2026-11-09 08:05–08:26 本輪（接續 f91b19c 之後，獨立 commit）：起始 918 筆；局部複核 20 筆、新增機會 5 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 898 筆；結果 923 筆。開始時 `next_review_at` 已到期 0 筆（07:14 剛結算），7 日內到期 81 筆，故佇列＝當日與一週內截止 8 筆（DataCamp 台北 12:59、Amazon ARA 11/12 15:59、StepFun 11/17、Rime 11/19、HeyGen 11/30、Tencent 免費窗 11/15、新竹市補助 11/30、Antigravity 11/18 模型移除）＋官方衝突與證據缺口 10 筆（Perplexity Education／免費 Pro Search、Google Vids、Canva Education、Voyage、Sloyd、LangWatch、Respan、Kimi Free、HAL-X、Perplexity 定價頁 403）＋台灣期限與條款 2 筆（臺北青年 AI 補助 11/10、Google AI 憑證條款 11/6 與行銷頁 2027-01-01）。08:0x 才核過的 daily 項（fal、DigitalOcean、Runable、Felo 等）不重複刷新。

時限類 8 筆全部以官方頁重讀，新增 `expires_at`／`deadline_at` 精確值：DataCamp 免費週至美東 11/8 23:59（＝台北 11/9 12:59，實讀當下仍開放、免購買、Teams 排除、Classic 限定）；Amazon ARA 投稿至美西 11/11 23:59（＝台北 11/12 15:59，平均不超過 US$50,000 的 unrestricted gift、不得列行政間接費、void 地區未列台灣）；StepFun 免費至 2026-11-17 11:59:59（UTC+8）、12:00 起新價；Rime STT 免費至 11/19、11/20 起 Flex US$0.002／分；HeyGen Turbo Free 至 11/30；Tencent 11/4–15 免費窗；Antigravity 個人 US$0、Asia 清單逐字含 Taiwan、Claude 4.6／GPT-OSS-120b 註腳 11/18 移除。新竹市補助兩個期限再確認：115/10/31 是**購買日**上限（已過，今日新訂閱不符），115/11/30 是**送件**上限，剩餘經費 NT$340,843（5.9%）與 11/8 同值、無額滿公告。

衝突類 10 筆：用 Wayback 為兩組官方矛盾定年。Perplexity Education 的「unlimited Pro Searches」在 2026-06-01 快照尚不存在、表格列當時已在，故正文為較新措辭、表格列為未同步舊述；Voyage 定價表已換成 voyage-code-4／rerank-3，正文仍寫 code-3／multilingual-2／rerank-2.x，Older models 段逐字「we do not offer free tokens for them」；Sloyd Guest 商用權以授權矩陣＋官方 Answers 為現行（personal-use only），ToS §6 通用句未分方案；Canva Education 的 AI 用量頁改寫為「Free 的 10 倍＋公平使用」，舊的 200／20 次全頁消失，但「Premium and Ultra AI tools are available with」清單仍漏列 Education。未解決並保留兩側原文：Google Vids 60 秒／月 vs 部落格 3×15 秒、LangWatch「€0 free forever」vs 14 天試用、Respan 免費吞吐 vs ToS 自動化／商業禁令、Perplexity 免費 3/day vs five per day、Sloyd 付費商用 3D 列印。Kimi Free 首次以 Chromium 渲染取得 Free $0 欄上限（Agent 1、排程 2、Projects 2、500MB、Swarm 2）；HAL-X 免金鑰 60 決策／分鐘確認，但 hal-x.ai/terms 與 /pricing 皆 404。

台灣面 2 筆：臺北青年 AI 補助 11/10 前書面送達不變、公告首頁 12 筆（共 34 筆）無用罄或停收公告；Google AI 憑證的 3 個月 AI Pro 仍是「台灣頁 2027-01-01 vs Google One 條款 2026-11-06（已過）」兩份官方文件衝突，未實測兌換。

新增 5 筆機會：[華為雲碼道 CodeArts 體驗版](https://www.huaweicloud.com/intl/zh-cn/product/codearts/pricing.html)（US$0、500 萬 tokens／月、50 席位、5,000 檔索引、500MB 知識空間，開通在新加坡 ap-southeast-1；台灣資格未核）、[Nutrient Data Extraction API](https://www.nutrient.io/api/pricing/data-extraction-api/)（每月 5,000 credits、免卡，但免費方案預設允許保留輸入輸出做模型訓練）、[Voicegain](https://www.voicegain.ai/developers)（註冊 US$50、免卡，約 69 小時音檔，效期未公布）、[CAMB.AI Free](https://www.camb.ai/pricing)（一次性 5,000 credits，免費層配音 0 分鐘、浮水印）、[Postman Free](https://www.postman.com/pricing/)（方案卡 100 AI credits 與比較表 50／month 兩說，Context Graph 每月 1,000 次查詢；記 `terms_conflict`）。五筆 Taiwan 皆 Unknown，未註冊或付款。

品質改善：概況卡「台灣條件適用」過去只算 `priority_tier === 'S'`（85），同名快捷鍵卻回 `taiwan=Yes` 且未截止的 96 筆（多出 5 筆政策、6 筆觀察線索），同一頁兩個數字。改由 `overviewMetrics()` 以 `presetMatches('taiwan')` 計算（96），並在說明列拆出「含 S 級機會 85 筆」；`tests/filters.cjs` 新增規格值斷言（概況數必須等於 preset 數、說明列必須出現 S 級拆分），實測桌機無 console error、無水平溢出。

工具經驗：Perplexity 的 `www.perplexity.ai/pricing` 本輪仍 403（Cloudflare），Help Center 的 `llms-full.txt` 404、`llms.txt` 403，只能逐篇 `.md` 讀取（`perplexity-help-center.mintlify.app/.../article.md` 可用）。Canva help 對 curl 403，Chromium 可讀。Tencent 的 WorkBuddy／CodeBuddy 產品站仍是 JS 殼，只有新聞稿能證明免費窗，執行面列入證據缺口。代理回報的 `next_review_at` 不能直接採用：DataCamp 失效於 12:59、代理排 13:05，Tencent `expires_at` 只給日期（當日 00:00），兩者都會被 `tests/validate.py` 的「複核須排在可行動截止前」擋下，已改為 12:55 與 11/14 20:00。

下輪優先（前五項）：① `datacamp-free-access-week-november-2026` 台北 12:59 後改 `expired` 並移除免費存取敘述（campaign 頁、status.datacamp.com）；② `google-ai-professional-certificate-tw-pro-3mo` 追條款是否更新為 2027-01-01，或行銷頁改回 11/6（one.google.com 條款、grow.google 台灣頁）；③ `google-vids-omni-free-sixty-seconds-monthly` 以瀏覽器重讀支援表與部落格，確認 60 秒／月 vs 3×15 秒是否已收斂（support.google.com/docs/answer/15609411、blog.google Omni 1.2）；④ `canva-education-k12-teachers-ai` 追「Premium and Ultra AI tools are available with」清單是否補列 Education（canva.com/help/ai-access）；⑤ `kimi-free-web-app`、`hal-x-thx-keyless-free-decision-api` 需登入或實測（Kimi Free 聊天額度、HAL-X 台灣 IP 可達性與 429 行為），`hal-x.ai/terms` 404 也要再確認是否已有正式條款。

2026-11-09 07:05–07:14 本輪（接續 d6c4a85 之後，獨立 commit）：起始 915 筆；局部複核 12 筆、新增機會 3 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 903 筆；結果 918 筆。開始時 `next_review_at` 已到期 0 筆（06:14 剛結算），佇列因此為：來源衝突與證據缺口 9 筆（亞灣 AI 實證、Perplexity 新創、Ollama Cloud、Anam Free、Friendli、日本橋 AI Lab、Fireworks Build Credits、SciSpace Campus Leads、Krutrim Sandbox）＋時限與排程 3 筆（Rime STT 11/19、StepFun Audio 3 preview 11/17、Amazon ARA 11/11 太平洋時間）；23:xx 前才核過的 daily 項（DataCamp、Google 憑證、臺北補助、neo4j）不重複刷新。分工：3 個 scout subagent（時限／輪替＋衝突／新機會），只回 patch 不碰 JSON；主 agent 逐頁重讀要寫入的官方來源並自行蓋 `accessed_at`，subagent 回報的近似時間全部重寫。

實質變動 8 筆。`asia-new-bay-ai-poc-watch`：官方站台正文是 CMS／JS 外殼，改讀 2026-04-20 的 Wayback 快照，逐字確認「即日起至 4月24日 熱烈徵件」與資格（中小企業認定＋107-04-25 後成立＋非陸資／非外國營利事業在臺分公司），因此改記 `applications_closed`（培育至 11/30）、`taiwan: Yes`、`deadline_at 2026-04-24`、US$10,000 雲端積分為「符合條件」而非每案保證、入選須進駐 1 年且不得轉讓，2027 梯次仍無可讀公告。`perplexity-startups-sonar-enterprise-partial`：官方表單 metadata 寫「6 months of free Perplexity Enterprise Pro (up to 50 seats) and $5,000 in Sonar API credits」，官方帳號另列 <US$20M 募資、未滿 5 年、須為 Startup Partner；主頁 `/startups` 已 301 至 `/hub`，改記 6 個月（第三方流傳的 3 個月不採用）並保留「是否仍受理」缺口。`ollama-cloud-usage-credit-pricing`：定價頁 FAQ 明寫「Every plan, including Pay as you go, can buy usage credits」，PAYG 是 US$0 訂閱、按 token 計費、內含額度只屬 Pro／Max／Team；原本「免費 starter 額度」的疑問是誤讀，改記無免費額度（既有帳戶舊額度仍列 unknowns）。`anam-free-monthly-thirty-min-trial-terms-mapping`：定價頁（2026-10-22 更新）Free 為常態 US$0、免卡、30 分鐘/月、不容許超額；條款 §2.1 的 Free Trial Period 明寫須「agreed under the Order Form」，故 §2.3 自動轉付費不及於常態 Free（標為條文推論）。`friendli-signup-grant-amount-unresolved`：官方 Credits 文件顯示 US$10 是「One-time purchase ($10 minimum)」，贈額只能靠兌換促銷碼；社群所稱的 US$10 起始贈額實為首次預付門檻。`nihonbashi-ai-adoption-first-month`：顧問頁現列每社月額 ¥100,000 起、每月一次線上會議、日本全國線上，首月免費字樣已消失但無終止公告；官網只有網站利用規約（2026-08-31），查無服務契約與退款條款。`fireworks-startup-build-credits-current-unconfirmed`：2025-10-01 公告的 `/startups` 連結現導向 `/solutions/for-startups`，該頁沒有 Build Credits 也沒有申請表，只剩付費與預付 credits FAQ。`scispace-campus-leads-access-stipend-watch`：原計畫頁現 301 至 University Connect（限教職員／研究者、每校最多 50 席、一個月試用），與原學生大使＋stipend 是不同方案，保留原 ID 並改記導向，不把新方案塞進舊紀錄。

欄位補強但結論不變 4 筆：`rime-stt-nov19-free-window`（免費至 11/19、11/20 起 Flex US$0.002/分，免卡與條款 §7.4「須保留付款方式」的矛盾保留）、`stepfun-stepaudio3-music-gen-preview-nov8`（以兩個模型頁確認免費只涵蓋 music-preview 與 gen-preview，其餘 StepAudio 3 SKU 皆付費）、`krutrim-sandbox-oct22-past-banner`（計費文件只列 PAYG 與 Enterprise、sandbox ₹1.56–₹21.81/小時且閒置仍計費，全庫查無贈額頁）、`amazon-ara-multilingual-contextual-ai-fall-2026`（補 `deadline_at`：11/11 23:59 太平洋＝台北 11/12 15:59）。另核但無變更、故未刷新時間：`confluent-startups-cloud-credits-watch`、`muse-pricing-community-lead`、`xiaomi-mimo-signup-credit-current-issuance-watch`、`google-ai-professional-certificate-tw-pro-3mo`（條款仍寫 2026-11-06、台灣頁仍寫 2027-01-01，衝突未解）、`taipei-industry-incentive-ai-rd-batch2-2026`、`neo4j-startup-aura-twentyk-application-unavailable`、`datacamp-free-access-week-november-2026`（07:14 仍可存取，12:59 台北截止）。

新增 3 筆機會：[Microsoft Foundry Copilot harness](https://devblogs.microsoft.com/foundry/microsoft-copilot-harness-in-foundry/)（2026-10-28 公開預覽；harness 執行環境 12/01 前免費，之後 US$0.0994/vCPU-hour＋US$0.0118/GiB-hour，模型與工具從第一天照價；支援區 22 區不含台灣，台灣讀者須部署日本東／韓國中部／東南亞）、[Kaiva Bridge Free](https://kaiv.ai/bridge/pricing)（10 個託管 MCP server、每月 200,000 次工具呼叫、3 名成員、免卡無到期；達額後只回升級提示；條款 worldwide 故記台灣 Yes）、[Click Managed Agents](https://useclick.ai/pricing)（每月 1 小時沙箱＋1 小時瀏覽器＋100 次搜尋、BYOK，條款與地區未核故台灣 Unknown）。

品質改善：見上段「台灣條件適用」捷徑（106→96）。驗證：`python3 tests/validate.py`、`node --check app.js`、`node tests/filters.cjs` 全通過；瀏覽器實測桌機（1280）與手機（390）皆無 console error 與水平溢出，捷徑 96／下拉 106、全庫 918、本輪更新 15、免費 572，「再顯示」24→48 正常。

工具經驗：CMS／JS 外殼的政府網站可用 Wayback 快照讀到當年條款，但必須把「快照日期」與「現況」分開寫；`/startups` 這類路徑 200 不代表方案還在，要看它導向哪裡；把定價頁的金額條目（US$10 minimum purchase）讀成註冊贈額是這輪最主要的誤讀來源，任何「贈額」都必須找到「free credit / grant」字樣才算。平行 subagent 仍無法讀時鐘，回報的 07:10 全部由主 agent 以實際 `date -Iseconds` 重蓋。

下輪優先（前五項）：① `datacamp-free-access-week-november-2026` 台北 12:59 後改 `expired` 並移除免費存取敘述，確認有無延長（來源 campaign 頁、status.datacamp.com）；② `rime-stt-nov19-free-window` 追 11/19 截止的精確時區，以及免費期結束後 Free 方案 US$50/月額度是否仍限 STT（rime.ai/pricing FAQ、terms §7.4）；③ `stepfun-stepaudio3-music-gen-preview-nov8` 11/16 前確認免費期是否有總量／速率上限與 preview 退役日（platform.stepfun.ai docs 與 llms.txt）；④ `microsoft-foundry-copilot-harness-free-runtime` 11/23 前確認 12/01 生效時刻、預覽是否需白名單、台灣帳戶計費（devblogs、learn 的 limits-quotas-regions）；⑤ `asia-new-bay-ai-poc-watch` 找 2027 梯次公告（官方站是 JS 外殼，改查 stipc.org、SBIR／中小企業處公告或政府電子採購網）。

2026-11-09 06:05–06:14 本輪（接續 0ca7312 之後，獨立 commit）：起始 911 筆；局部複核 19 筆、新增機會 4 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 892 筆；結果 915 筆。開始時 `next_review_at` 已到期 0 筆（上一批次 05:16 剛結算），佇列因此為：證據缺口與期限衝突 8 筆（D-ID 行動試用、Respan 商用條款、LangWatch、Kimi、Kling、Medux、新竹市補助、ndp one）＋最久未核輪替 11 筆（2026-10-29／10-30 批次的 YC AI Stack、fal grant、Past.dev、ChatGPT Pro、Google Cloud 研究與教學 credits、GitHub 學生包、PartyRock、Cline、SerpApi、Koyeb）。05:1x 才核過的 daily 項（DataCamp、AOCAI、臺北青年補助、Grammarly、Qoder、ZCode、fal 折扣）不重複刷新。分工：3 個 scout subagent（缺口複核／最久未核輪替／新機會去重），只回報證據與 patch，主 agent 逐頁重讀要寫入的官方頁面後才改 JSON。

實質變動 4 筆。`ndp-one-oct31-free-full-security-diagnosis`：首頁與 `/terms` 已恢復可讀（先前記為 404），PR TIMES 2026-10-23 公告逐字寫活動只到 10/31 且無延期，改記 `expired`、月查；首頁現行的「無料ソースコードセキュリティー診断サービスPoC版」註明僅 PC 尺寸、條款限事業用途，不能當原活動延長。`koyeb-startup-up-to-thirtyk-compute`：2026-02-17 官方公告寫新用戶只能訂閱 Pro 以上且需有效付款方式，故 `recurring_cost_usd` 記 29（Pro US$29/月起、含 US$10 運算額度），並在 summary／access_risk 標明加入 Mistral AI 尚待交割；申請表仍只回外殼，額度與效期未核。`chatgpt-pro200-transition`：官方頁已無「10/29 過渡終點」敘述，移除該說法並補「Pro 200 已重新開放新訂閱」。`langwatch-...-terms-conflict`：修正前輪引用的條款號，衝突優先條款是 §2.9（§2.11 為 14 歲年齡條款），定價頁與 §3.2 的 14 天試用仍互斥。

逐句補強但結論不變 4 筆：`respan-...`（§7 逐字「may not be used in connection with any commercial endeavors except…」、§3(6) 禁自動化，與 API／SDK 實務落差保留）；`kimi-free-web-app`（定價頁 11/9 起靜態只剩外殼，Help Center 現行方案表只列 Go/Plus/Pro/Max/Ultra、無 Free 列，Free 上限改標為「沿用 11-08 瀏覽器渲染、本輪無法重現」）；`hsinchu-city-...`（購買期限 115/10/31 已過、受理至 11/30、剩餘 5.9% 逐字不變，今日新購買者已不符資格）；`medux-free-trial-3000-credits`（「per month」與無週期措辭仍並存，方案表連續第三輪載入失敗）。其餘 11 筆僅重讀原頁確認金額、期限與資格不變（含 GitHub 學生包 3K Actions／180 Codespaces 小時、SerpApi 250/月、GCP 研究 US$1k/US$5k、教學 US$100/50）。

新增 4 筆機會：[FlutterFlow Education](https://www.flutterflow.io/pricing)（大專學生與教師可申請一年免費，未寫涵蓋哪一層、AI 額度無數字；Free 方案 2 專案、1 編輯者、無 AI agents）、[Softr Free](https://www.softr.io/pricing)（每月 5 AI credits，Apps／資料庫／工作流不限數量，限 3 builders、5 app users、5K 紀錄、500 workflow actions/月）、[Hyper3D Rodin Free](https://hyper3d.ai/pricing)（生成先免費預覽、確認後才扣點，legacy 模型可匯出，10 個私人資產，未公布預覽次數上限）、[Rows Free](https://rows.com/pricing)（每月 5 AI Tasks；頁首已標示加入 Superhuman）。

品質改善：「機會專區」七個選項的一致性（見上段），實測 developer 567→528、regional 57→42、value 55→52（915 筆下）。另在 `tests/validate.py` 補「本批次回報的每筆紀錄都必須有合法 status」斷言——本輪新增紀錄第一版確實漏了 `status`，正是這條斷言先擋下 `rows-free-five-ai-tasks`；歷史 37 筆缺 status 的紀錄未動，因為它們的摘要本身就只能給出「待釐清」。

工具經驗：Kimi 會員定價頁、Kling 方案頁、PartyRock FAQ／service-terms 在本輪靜態讀取都只回外殼，改以 Help Center／點數政策／AWS 部落格交叉，未取得的部分不寫成已重核。`read` 的 content-negotiation 對 past.dev、SerpApi 回傳 markdown 正文，省掉一次渲染。Scout 回報的候選中有一筆 id 寫成 `rows-free-five-ai-credits`，實際應為 `rows-free-five-ai-tasks`，主 agent 仍須自行核對 ID 與標題。

下輪優先（前五項）：① `datacamp-free-access-week-november-2026` 台北 12:59 後改 `expired` 並移除免費存取敘述（來源 campaign 頁、status.datacamp.com）；② `google-ai-professional-certificate-tw-pro-3mo` 追 11/6 後兌換是否仍成功、Google One 條款是否更新為 2027-01-01（來源 one.google.com 條款、grow.google 台灣頁）；③ `kimi-free-web-app`、`kling-ai-free-generation-watchlist` 需以瀏覽器渲染重讀定價／方案頁，確認 Free 上限與 Basic 點數欄；④ `fal-flux3-max-five-daily-sandbox` 在 11/23 00:00 UTC 前確認折扣結束日（landing 11/21、模型頁與 llms.txt 11/22、FAQ 12/31）；⑤ `respan-free-hundred-k-logs-terms-conflict`、`langwatch-...` 兩筆條款與定價互斥，除非官方新增 FAQ 說明，否則維持每週一次並只在有新版條款時更新。

2026-11-09 05:00–05:16 本輪（接續 ac654a5 之後，獨立 commit）：起始 906 筆；局部複核 19 筆、新增機會 5 筆、政策 0、觀察線索 0、整筆追查失敗 0；未完成複核 887 筆；結果 911 筆。開始時 `next_review_at` 已到期 0 筆（上一批次 04:20 剛結算），佇列因此為：當日到期與台灣期限 4 筆（DataCamp 台北 12:59、AOCAI 23:59、臺北青年補助 11/10 送達、Grammarly 學生折扣）＋官方矛盾與證據缺口 3 筆（Google AI 憑證的 2027-01-01 vs 2026-11-06、ZCode 貼文 300M/日、Qoder 免費機制）＋最久未核輪替 12 筆（2026-10-29／10-30 批次）；04:1x 才核過的 daily 項（mango、fal、stepfun、ant-ling 等）不重複刷新。分工：3 個 scout subagent（期限與高風險／最久未核輪替／新機會去重），只回 patch 不碰 JSON；主 agent 逐頁重讀要寫入的官方來源（Bruin、Weaviate、MongoDB、Kernel、past.dev、fal、Steel、Recall、Warp、Novita、Anara、Tana、DataCamp、AOCAI、臺北青年局、ZCode 文件、Grammarly、Grow Google、Google One 條款、Qoder，以及 5 個新機會官網），`accessed_at` 一律用自己的讀取時間。

實質變動 4 筆。`zcode-daily-300m-glm53-flash-claim-watch`：官方文件（zcode.z.ai/en/docs/welcome）寫新手優惠只有「5-day free trial」，GLM-5.3 3M/日＋GLM-5-turbo 2M/日，並明寫「not an ongoing daily allowance」，與 2026-10-26 貼文的每日 300M 直接衝突；兩說並列、`limited_confirmed` 改 false，並補上 Z.ai 服務條款排除地區僅 Iran／North Korea／Cuba／Crimea／Donetsk／Zaporizhzhia（未列台灣）。`qoder-free-mechanisms`：新增 Efficient 層免費促銷（2026-09-03 14:00 SGT 起 0.3×→0.0×、不扣點，付費個人與 Teams／Enterprise 適用，Free 在 Pro 試用期且有 Credits 亦適用，結束日未定），與 Qoduck、每日 100 點並列為三種現行機制。`kernel-startup-two-tiers`：`/startups` 的 Scale 資金名單含 lerer hippeau，官方 blog（2026-10-20）只列 yc／a16z speedrun／accel，兩說保留；補「$750 in value」與「每家限一份 grant」。`past-memory-once-starting-credits`：定價頁 2026-11-08 改版新增 Flex US$99/月（400,000 credits/月、30 天結轉、可自動加值）與 Enterprise（自 5,000,000/月），PAYG 主張不變。

欄位補強但結論不變 4 筆：`mongodb-startup-atlas-voyage`（額度可申請延長、promo code 只折抵未來費用、Developer Support 前 30 天免費）、`anara-free-daily-shared-research-usage`（原始 HTML 仍含「No credit card required」，Help Center 逐字補齊共享池與百分比呈現）、`tana-outliner-free-monthly-five-hundred-shared`（同頁 5 vs 12 張圖、3 vs 4 工作區兩處矛盾保留）、`grammarly-student-annual-half-first-period`（SheerID 靜態頁只有 JS 外殼，台灣可選性沿用同日 01:35–01:55 瀏覽器實測，未重現）。其餘 11 筆僅更新核實時間與來源、金額期限資格逐句對上舊紀錄：bruin、weaviate、fal、steel、recall、warp、novita、datacamp、aocai、臺北青年補助、google-cert。台灣期限三筆（DataCamp 12:59、AOCAI 23:59、臺北青年補助 11/10 送達）均無提前結束、額滿或停收公告。

新增 5 筆機會：[Orkas Free](https://orkas.ai/pricing/)（US$0、500 一次性終身 credits、須桌面 App 登入領取、免卡；Model input 60～120 credits/1M tokens）、[Velork Hobby](https://velork.com/pricing)（2,000 起始 credits＋每月 10 張圖／1 小時雲端電腦／30 GB-hours，自帶 key 不扣點；是否每月重發未寫）、[HaveTML 前 500 名](https://havetml.com/pricing)（Pro 12 個月 $0、原價 US$6/月、免卡且無試用轉訂閱，名額滿即止）、[Hugging Face Classrooms](https://huggingface.co/classrooms)（教師建立教室組織，datasets／models／Spaces 免費託管，未列儲存與 GPU 上限）、[Vocal Separator](https://vocalseparator.com/pricing)（免帳號每日 2 次分軌、00:00 UTC 重置、每檔 ≤10 分鐘／100 MB；官方 2/日 與第三方 5/日 矛盾）。5 筆官方頁均未列地區清單或台灣，一律 Unknown。

品質改善：「高免費額度」與「Beta 存取」專區只讀人工 `views`（quota 63 vs HIGH-QUOTA 127；beta 15 vs BETA-ACCESS 50），且已截止紀錄仍會出現。改由 `categories` 判定並把可行動專區的排除規則擴及兩者，實測 quota 63→122、beta 15→46；`tests/filters.cjs` 以規格值斷言（含反向案例：HIGH BUT LIMITED 單獨不得入、人工標記不得單獨生效），`tests/validate.py` 擋 views 與 categories 相反。細節見上段。另以瀏覽器實測發現 12 筆 opportunity 沒有 `summary`，卡片因此顯示「研究摘要待補充」而不是已核實的額度與費用——其中包含上一輪新增的 OpenAI API 資料共享（S 級）、Viktor Free 與 Maritaca S5-free，以及本輪 5 筆新紀錄；已就各筆既有已核欄位補寫摘要（未新增外部主張），並在 `tests/validate.py` 加「opportunity 必須有非空 summary」斷言，以移除 viktor 的摘要驗證會失敗。

工具經驗：**本輪自己寫出未來時間戳**——patch 依估計寫入 05:22／05:23，實際時鐘是 05:16，被 `tests/validate.py` 的「verified_at 不得晚於批次完成」攔下，改回 05:15 才通過；寫入前一律先跑 `TZ=Asia/Taipei date -Iseconds`。Scout 環境沒有 bash（只能用 timeapi.io 對錶），回報時間屬近似值，主 agent 仍須自行重讀。SheerID 與 z.ai 訂閱頁是前端渲染，靜態抓取只有外殼；Anara 的「No credit card required」只在原始 HTML，content-negotiation 的 markdown 摘要看不到，判定前要抓原始 HTML。Warp 的 `?product=factories` 頁在 SSR HTML 內以「20% above API rates」字串出現，純渲染器預設只顯示 Terminal 方案。

下輪優先（前五項）：① `datacamp-free-access-week-november-2026` 今日台北 12:59 後改 `expired` 並移除免費存取敘述，確認有無延長（來源 campaign 頁、status.datacamp.com）；② `google-ai-professional-certificate-tw-pro-3mo` 追 11/6 後兌換是否仍成功、Google One 條款是否終於更新為 2027-01-01（來源 one.google.com 條款、grow.google 台灣頁）；③ `zcode-daily-300m-glm53-flash-claim-watch` 查 Z.ai 是否有公告解釋 300M 與 5 天試用的落差，並確認免費帳號能否領取（來源 zcode.z.ai/docs、x.com/zcode_ai、z.ai 訂閱頁需渲染）；④ `fal-flux3-max-five-daily-sandbox` 在 11/21–11/23 00:00 UTC 前確認折扣結束日（landing 11/21、模型頁與 llms.txt 11/22、/flux-video FAQ 12/31 三方矛盾）與 sandbox 7 次是否含影片；⑤ `ant-ling-ling-3-2-flash-free-two-weeks` 在 11/19 前後確認 2 週免費是否結束、每日 50 萬 token vs 每月 ¥10 券何者生效（來源 price、faq、billing-upgrade）。

2026-11-09 04:05–04:20 本輪（接續 1a1bcb0 之後，獨立 commit）：起始 902 筆；局部複核 20 筆、新增機會 3 筆、觀察線索 1 筆、政策 0、整筆追查失敗 0；未完成複核 882 筆；結果 906 筆。開始時 `next_review_at` 已到期 0 筆（上一批次 03:20 剛結算），佇列因此為：最久未核實且仍可行動的 12 筆（2026-10-29／10-30 批次）＋上一輪明列的五類衝突與證據缺口 7 筆＋StepFun 的排程缺陷 1 筆（免費截止 11/17、複核日卻排在 11/18）；03:0x 才核過的 daily 項不重複刷新。分工：3 個 scout subagent（最久未核輪替／衝突缺口／新機會去重），只回 patch 不碰 JSON；主 agent 逐頁重讀要寫入的官方來源、`accessed_at` 一律用自己的讀取時間，並自行以 Chromium 渲染 MiniMax 兩個頁面（scout 只拿得到 CSR 空殼）。

實質變動 8 筆。`olostep-trial-five-hundred-successful-web-requests`：官方 FAQ 明寫免費層「500 successful scrapes per month at no cost」、免卡、含 JS 渲染與住宅 IP，另稱免費層 10 requests per minute；但定價頁只寫「free plan with 500 requests」未標週期，同一 FAQ 又稱 Starter 100 concurrent 而定價表是 20，三處矛盾全部保留；原紀錄「未公告重置或效期，不能列為每月 500 次」因此改寫。`sensenova-token-plan-free-public-beta`：官方 GitHub org（OpenSenseNova，token-plan 頁 CTA 直接連出）FAQ 寫「the free quota is 1,500 calls / 5 hours (sliding window)」，用盡回 `FREE_QUOTA_EXHAUSTED`，quota UNKNOWN→HIGH BUT LIMITED；INSTALL.md 另證國際站 `token.sensenova.ai` 與中國站 `token.sensenova.cn` 分離且三個值不可混用。`ant-ling-ling-3-2-flash-free-two-weeks`：免費層矛盾出現第三個資料點（price 頁 FAQ「the quota resets the next day」），四頁全部自標 2026-11-05 更新、無法用日期排序，quota UNKNOWN→HIGH BUT LIMITED、矛盾保留。`perplexity-watch`：Help Center 全文索引 `llms-full.txt` 今日 404（02:14 尚可讀 1.94 MB），改讀 per-article Markdown 後發現 11187416 的自由方案正文已被改寫成沒有數字的「Very limited amount of Pro Searches」，同篇比較表仍寫 3/day、10352998 仍寫 five per day，三處皆無日期。`perplexity-education`：同一路徑讀到 US$10／SheerID 與「unlimited Pro Searches」原文，配合比較表 Education Pro 欄「Weekly limits」與 Pro／Pro Search 兩文的「up to your plan's limit」，改記為「無每日硬上限、受每週 soft limit」並把 verification 由 Unverified 升為 Official（unlimited 原文保留）。`minimax-design-h3-new-user-watch`：以真實 Chromium 渲染 `www.minimax.io/audio` 與 `design.minimax.io/media-plan/subscribe`，新戶橫幅「3 Free H3 Trials + 2,000 Credits for New Users」仍在、會員 FAQ「Free credits for new users: Valid for three days」可讀，上一輪的追查失敗解除，並補記 Starter US$8.4／Plus US$60.8／Pro US$172 年繳價與 credits；每日改週查。`fastino-glideis1-ten-credit-payment-verification`：除文件全文索引外，官方 changelog（最新 2026-08-10）與官方 blog（Published Nov 6）對 GLIDEIS1／promo code／redeem 亦 0 命中，X 貼文（2026-10-22 16:36:57 GMT）仍是唯一痕跡且從未公布截止日；每日改週查。`mango-inference-community`：pricing 站寫「30% off for new users until Nov 11」，把折扣客群限定為新用戶（platform 頁寫 all models），年份仍未標。

欄位補強但結論不變 5 筆：`mastra-starter-monthly-hundred-k-events-twentyfour-cpu`（Starter 平台費 US$0 但常駐伺服器 US$100/project、Postgres 5 小時後 US$0.50/hr、memory 逾 10 萬 US$10/1M、retrieval 逾 250MB US$20/GB、15 天保留、不含 BYOK，補進 `cost_note`）、`braintrust-startup-pro-six-twelve`（官方「Benefits vary depending on funding sources, amount raised, and startup stage」：達 US$100K 門檻不等於核准）、`dust-free-lifetime-not-programmatic`（Free 現為 Business 自助方案內的 0€ 席位；價格頁的 Business 程式化 US$0.01/credit 與文件「PAYG 僅 Enterprise」的適用範圍未釐清，列入 unknowns）、`jenni-free-daily-ten-autocomplete-lifetime-workflows`（定價頁自標 2026-11-04 發布；Reviews 定價頁 3 scans 未標週期、文件寫 3/month）、`composio-startups`（FAQ 答案不再由伺服器輸出，融資上限與期滿自動續訂僅沿用 10/25 證據，不再當成本輪已核）。其餘 6 筆輪替案例（Nango、FalkorDB、Bruin、Runloop、Recall、Inworld）逐頁重讀後數字與條款不變，只更新核實時間與下次複核。

新增 3 筆機會：[OpenAI API 資料共享回饋](https://help.openai.com/en/articles/10306912-sharing-feedback-evaluation-and-fine-tuning-data-and-api-inputs-and-outputs-with-openai)（符合資格的 Launch/Grow 組織每日第一組 100 萬、第二組 1,000 萬免費 tokens，Build 為 25 萬／250 萬；按模型群組各自計算、00:00 UTC 重置；超量那一筆整筆計費；微調、evals、tool use 不計入；需組織擁有者開啟且帳戶餘額為正，ZDR 與 Enterprise 不可開啟；支援國家清單逐字列 Taiwan，但資格由 OpenAI 依組織判定）、[Viktor Free](https://viktor.com/pricing)（Slack／Teams 代理，US$0/月、免卡、新工作區一次性最高 US$100 starter credits 且不過期，Free 層無加值無 rollover、rate limit 為付費入門層 0.5 倍；條款明文限 B2B、不供消費者；台灣國別條款未列）、[Maritaca S5-free](https://github.com/maritaca-ai/maritalk-api/blob/main/documentation/docs/pt/precos.md)（2026-11-03 上線的 S5 限時變體：不計 token 費、僅文字、不含 Batch／Flex／內建工具，速率固定 60 RPM／輸入輸出各 256k TPM，官方說可隨時結束；付費 S5 為 R$0.50／R$2.50 每百萬）。觀察線索 1 筆：[ZCode 每日 300M GLM-5.3-Flash](https://x.com/zcode_ai/status/2114762939421139426)（官方貼文 2026-10-26 16:55:49 GMT，11:00 UTC 起領、15:00–01:00 UTC 使用；貼文未寫免費帳號是否適用、未寫結束日，同組織 9/3–10/7 的另一個活動限付費方案且已結束）。

品質改善：**「免費方案」捷徑重複疊加篩選條件**。`applyPreset('free')` 除了 `view:'free'` 還塞了 `cost:'0'`，而 `viewMatches('free')` 本身已經處理費用規則；多出來的 `cost:'0'` 等於額外要求「設定費必須已知為 0」，把 108 筆真正免費但設定費欄位未填的紀錄（Cloudflare Workers Free、BeatAPI 零餘額免費模型、Orkes Playground、OVHcloud 首專案 US$200 等）擋在入口外，也與 README 寫的規則不一致。修法：把 preset 條件抽成 `presetFilters()`，免費只留 `{view:'free'}`；`tests/filters.cjs` 新增規格值斷言（preset 不得帶 cost、`cloudflare-workers-free-daily-requests` 必須入選、Lindy US$29.99 試用仍須排除），並以 `git show HEAD:app.js` 換回舊檔確認新測試會失敗。實測免費專區 452→560 筆，其餘 preset 不變（台灣條件 104、開發者 564、無限／暫時不限量 6、本輪更新 24）。

工具經驗：**同一個 agent 也會誤判時鐘**——本輪把「04:40」寫進 patch，實際 `date` 是 04:19，被 `tests/validate.py` 的未來時間戳斷言擋下；批次時間一律在寫入前重跑 `TZ=Asia/Taipei date -Iseconds`。**CSR 空殼要用真瀏覽器**：`read` 與 curl 對 minimax.io 只拿到 `<template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING">`，Chromium 渲染後 innerText 才有橫幅與 FAQ；但也因此要記錄「渲染後」而非「HTTP 200」。**官方文件會整批換發佈形式**：Perplexity 的 `llms-full.txt` 一天內由 200 變 404，per-article `.md` 反成唯一可讀路徑，舊路徑不要當固定入口。**同一天更新的多份官方文件可能互相矛盾**（Ant Ling 四頁同日、兩種免費層制度），衝突要以「原文＋URL＋各自更新日」入庫。**JSON 重寫要沿用原縮排**：首次寫入用 `indent=1` 讓 `data/offers.json` 全檔重排（diff 15 萬行），改回 `indent=2` 後 diff 降到 797 行。

下輪優先（前五項）：① `fal-flux3-max-five-daily-sandbox` 在 11/23 00:00 UTC 後確認 12/31 孤證是否消失、sandbox 每日 7 次是否含影片；② `ant-ling-ling-3-2-flash-free-two-weeks` 在 11/19 前後確認 2 週免費是否結束、每日 50 萬 vs 每月 ¥10 券何者生效；③ `stepfun-stepaudio3-music-gen-preview-nov8` 在 11/16 確認免費 preview 是否如期於 11/17 11:59 結束或展延（本輪已把複核日前移）；④ `zcode-daily-300m-glm53-flash-claim-watch` 查 Z.ai 服務條款地區條文與免費帳號能否領取；⑤ `openai-api-data-sharing-daily-complimentary-tokens` 確認 Launch/Grow 與 Build 的判定門檻（是否依累計消費），並查是否有台灣組織的公開回報。

2026-11-09 03:05–03:20 本輪（接續 7a67202 之後，獨立 commit）：起始 901 筆；局部複核 14 筆、新增 1 筆機會（Google Vids 每月免費 AI 影片額度）、政策 0、觀察線索 0、整筆追查失敗 1（`minimax-design-h3-new-user-watch` 官方頁只回 JS 外殼）；未完成複核 887 筆；結果 902 筆。開始時 `next_review_at` 已到期 0 筆，但 03:10–07:15 有 10 筆每日追蹤到期，佇列為：該 10 筆＋11/10 前期限 3 筆（DataCamp、AOCAI、臺北青年補助）＋fal／vast 條款衝突各 1；當日凌晨已核且無新訊號者不重複刷新。分工：3 個 scout subagent（期限／衝突／新機會），只回 patch 不碰 JSON；主 agent 逐頁重讀要寫入的官方來源，`accessed_at` 一律用自己的讀取時間。

實質變動 3 筆。`x-api-xai-spend-credit-rewards`：官方 free-credits 文件（10/13 更新）為首次合格卡完成首購後一次性 US$20、首次自動儲值成功等額配對上限 US$50、兩者合計 US$70、贈點 3 個月到期；xAI 回饋是單一帳單週期累積購買的 0／10／15／20% 級距（US$1,000 例回 US$200），不是固定 US$50／150／350。原摘要的 US$250、US$1,000 與固定級距無現行官方依據，已整段改寫並追加政策歷史。`fal-flux3-max-five-daily-sandbox`：模型頁的 `llms.txt`（機器產生計費中繼資料）與模型頁逐字一致，11/22 促銷、11/23 00:00 UTC 恢復原價；landing（15:05 更新）11/21 早一天、`/flux-video` FAQ（11/3 更新）12/31 仍為未解釋孤證，三方矛盾保留。`fastino-glideis1-ten-credit-payment-verification`：官方文件全文索引（359,254 bytes）對 `GLIDEIS1`／`promo code`／`redeem` 皆 0 命中，兌換與效期仍未知，狀態改 `needs_verification`。

無欄位變更、僅確認或補證據 11 筆：`datacamp-free-access-week-november-2026`（仍在期間內，台北今日 12:59 截止；免購買、Teams 排除不變）、`aocai-working-free-ai-courses-2026`（報名至今日 23:59、0 元、系統上限 300 與預計 100 人並存）、`taipei-youth-ai-subscription-subsidy-2026`（11/10 前送達、4,000／8,000 元、無停收公告）、`articul8-bivia-early-adopter-billion-tokens`（前 10,000 名、10 億 tokens、無截止日）、`felo-…-campaign`（僅確認 200 credits/day 與免卡文案；Free /Forever 等維持 11/8 證據）、`runable-…`（1,500／日、15,000／月、不結轉）、`deepgram-flux-tts-bonus`（9/15–12/31 PT、每專案上限 US$500）、`digitalocean-secret-ai-startup-100-2026`（首 50 家、2027-01-17 11:59 PM UTC、90 天）、`mango-inference-community`（US$10 與「through Nov 11」未標年份；全頁無 1T 方案）、`fujisoft-workforce-ai-security-poc`（10/19 起、先着 10 社、無截止日）、`vast-startup-spend-match`（兩份文本仍並存，現行頁明寫不做免費贈額）。

新增 1 筆機會：[Google Vids](https://blog.google/products-and-platforms/products/workspace/omni-1-2-flash-google-vids/)（2026-11-05 Omni 1.2 Flash；支援表列個人 Google 帳戶每月 60 秒 AI video clips＋50 credits，每月 1 日 12:00 AM PT 重置、不結轉；部落格稱每月最多 3 支 15 秒，45 與 60 秒並存；生成說明頁另稱需 Workspace 訂閱，與個人額度表衝突。台灣未列排除，未登入實測）。狀態 `conflicting_official_usage_claims`，兩說都保留、不平均。

品質改善：**免費方案專區只讀人工 `views` 標記**。schema 不管制 views，造成兩個方向誤導——3 筆已知每月費用的試用（Lindy US$29.99、Lemonfox US$5、GoodMem US$15）列在免費方案；40 筆設定費與每月費用皆為 0 的紀錄（含 Gemini API、Claude Free、Firecrawl、台灣人工智慧學校）因漏標而完全不見。修法：`viewMatches('free')` 改由成本欄位判定（兩項皆 0 一律列入、已知每月費用 >0 排除、每月費用未知者保留人工標記）；`tests/filters.cjs` 新增三組規格值斷言。實測免費專區 413→451 筆，`lindy` 已退出、`gemini-watch` 已納入。驗證：`python3 tests/validate.py`（902 筆）、`node --check app.js`、`node tests/filters.cjs`。

工具經驗：Google 支援頁的「個人帳戶」額度表與生成說明頁會互相矛盾（60 秒/月 vs 需 Workspace 訂閱），同一產品線的兩份官方文件不可互相取代；X API 的免費點數與 xAI 回饋分屬兩份文件，舊摘要可能混用不同時期金額，必須以文件內「updated」日期為準。`docs.fastino.ai/llms-full.txt` 是 359 KB 全站文件，適合用檢索證明「官方沒有這個促銷碼」，但不等於促銷不存在。

下輪優先（前五項）：① `minimax-design-h3-new-user-watch` 用真實瀏覽器渲染 `platform.minimax.io/media-plan/subscribe` 與 `www.minimax.io/audio`，確認新戶 2,000 credits／3 次 H3 與適用條款；② `fal-flux3-max-five-daily-sandbox` 在 11/23 00:00 UTC 後確認 12/31 孤證是否消失、sandbox 7 次是否含影片；③ `perplexity-watch`／`perplexity-education` 再試 `www.perplexity.ai/pricing` 與 3/日 vs 5/日、unlimited vs weekly 兩處矛盾；④ `fastino-glideis1-ten-credit-payment-verification` 向官方確認 GLIDEIS1 是否仍可兌、截止與效期；⑤ `mango-inference-community` 於 11/12 後確認「Nov 11」是否為 2026-11-11 及 US$10 效期。

2026-11-09 02:05–02:19 本輪（接續 3c75fa7 之後，獨立 commit）：起始 897 筆；局部複核 19 筆、新增 3 筆機會（Google Cloud TTS 每月免費字元、Azure Speech Free F0、Routeway `:free` 模型）＋1 筆政策（中小微企業轉型升級條例草案的 AI 投資抵減）、觀察線索 0、整筆追查失敗 0；未完成複核 878 筆；結果 901 筆。開始時 `next_review_at` 已到期 0 筆（上一批次 01:05–01:46 剛結算），佇列因此為：當日與 11/10 期限 6 筆、來源衝突與證據缺口 8 筆（前一輪明列的下輪優先項）、其餘當日到期 5 筆；01:5x 才核過且無新訊號者不重複刷新。分工：3 個 scout subagent（期限／衝突／新機會），皆只回 patch 不碰 JSON；主 agent 逐筆以自己的讀取時間寫入 `accessed_at`，並自行重讀每一個要寫入的關鍵來源（Anthropic 公告與規則頁、Perplexity 全文索引、fal 模型頁、Claude Security、Synthesia、Kiro、Granola、Routeway、Google TTS、Azure Speech、行政院草案 PDF、GitHub Pack）。

實質變動 8 筆。`anthropic-ai-for-science-program-watch`：三份官方文件依更新日期排序後可判定——2026-08-27 公告（頁面 10-19 更新）寫每專案最高 US$50,000、「Any researcher is eligible to apply」；2026-10-20 更新的規則頁完全不載金額與期限、只說由 Anthropic 裁量；說明中心停在 2026-03-16 版仍寫 US$20,000／6 個月。故 US$50,000 是現行公告上限而非保證核額，`quota_classification` UNKNOWN→HIGH BUT LIMITED、status 補 `application_based`。`ant-ling-ling-3-2-flash-free-two-weeks`：新發現官方免費層兩說——FAQ（Last updated 2026-11-05）寫每日 50 萬 token，同日 Billing Service Upgrade Guide 寫該每日額度停發、改每月 1 日 ¥10 券；Changelog 確認上線日 2026-11-05，故 2 週免費約至 11/19（官方無時鐘）。`camber-student-compute-agent-monthly`：原引用的 `www.camber.io/students` 實測已變成 Camber Partners 創投頁（183 Madison），產品站遷到 cambercloud.com 且 `/students` 404，學生方案唯一現行依據是 GitHub Student Developer Pack 條目。`sensenova-token-plan-free-public-beta`：官方隱私政策載營運主體為香港 Tetras.AI HongKong Co., Limited、個資存馬來西亞並可能轉至中國大陸關聯方（地區／居住條款的唯一官方線索）。`perplexity-watch`：以 Help Center 全文索引逐句定位，確認「每月固定點數」已被「一次性 4,000 credits＋每週 Computer 用量（週重置、不結轉）」取代，3/日 vs 5/日 兩說仍在且兩文皆無更新日期。`claude-security-enterprise-two-month-credit`：補明每月最高 US$25,000、連續兩個月、2026-12-31（UTC）結束且不因兩月未滿延長、11/1 後加入領不滿兩月。`synthesia-basic-monthly-ten-min-five-hundred-no-download`：Syren 首發 1,000 credits 於 2026-11-09 23:59（官方寫 BST）到期，到期後改扣方案 credits；下載列在 Starter 加值項。`coderabbit-startup-annual-half-six-months`：官方定價頁公告方案更名（Pro→Essentials、Pro Plus→Team，Team 年繳 US$48／user／月）。

無欄位變更、僅確認或補證據 11 筆：`datacamp-free-access-week-november-2026`（仍在期間內，台北 11/9 12:59 截止；另由官方支援文確認完成課程可下載 statement of accomplishment PDF、未以付費為條件）、`aocai-working-free-ai-courses-2026`（報名頁 11/9 23:59 前仍開、0 元、300 上限）、`taipei-youth-ai-subscription-subsidy-2026`（11/10 以送達日為準、無停收公告）、`fal-flux3-max-five-daily-sandbox`（11/21 vs 11/22 vs 12/31 三方矛盾仍在，`/flux-video` 自標 updated 2026-11-03）、`vultr-match-ai-compute`／`vultr-new-customer-credit-codes-watch`（`/match/`、`/coupons/`、`/promo/try300/` 皆 403，改以 docs.vultr.com 計費 FAQ 確認「促銷須綁卡或 PayPal、每人一個 promo、贈額會到期」）、`claude-oss-six-months-ultra`（仍掛 Apply now、無額滿公告，但官方不公布剩餘名額）、`kiro-first-paid-subscription-bonus`（贈額與付費國家清單不變，Taiwan 仍未列）、`granola-students`（美英加限制成立，taiwan=No）、`volcengine-ark-1111-token-giveaway-watch`（規則未變：11/30 23:59 結束、限中國大陸用戶、全文無 2500 萬數字）。

新增 3 筆機會：[Google Cloud TTS](https://cloud.google.com/text-to-speech/pricing)（每月 WaveNet／Standard 各 400 萬字元、Studio／Chirp 3 HD／Neural2 各 100 萬；Gemini-TTS 全部標 Not available；須先啟用計費、超量自動扣款；Taiwan／TWD 為官方列名）、[Azure Speech Free F0](https://azure.microsoft.com/en-us/pricing/details/speech/)（每月 50 萬字元神經 TTS＋5 音訊小時即時轉錄＋5 小時翻譯＋1 端點模型；限額不可調、批次不支援；舊 500 萬字元 Standard 免費已 Deprecated；區域含 Taiwan North）、[Routeway `:free`](https://docs.routeway.ai/getting-started/faq)（$0.00、每日 200 請求 00:00 UTC 重置、免卡、無 SLA；FAQ 20 RPM 與 rate-limits 5 RPM 互相矛盾）。政策 1 筆：[中小微企業轉型升級條例草案](https://www.ey.gov.tw/File/F590BBE88FC4E147?A=C)（行政院 2026-10-08 函送立法院；第 18 條公司／有限合夥之 AI 產品或服務等支出 25 萬–5 億元可抵 5% 當年度營所稅或 3% 分三年、30% 稅額上限、須專案核准且同年度一次；第 13 條納入政府 AI 算力與資料的公平使用；尚未生效）。

品質改善：**批次寫入未來時間戳**。上一批次把 `completed_at` 寫成 02:40、13 筆 `verified_at` 寫在 02:08–02:34，而該批次實際 commit 是 01:46，於是發布後的網站顯示尚未發生的「資料更新 2026-11-09 02:40」與「核實 02:34」（本輪以 `curl` 取公開站 `data/offers.json` 確認線上版本就是這組值）。修法：把可證明的上限（該批次 commit 時間 01:46:11）回填到 8 個不可能的未來值（含 2 筆 `verified_at` 與 3 筆 `discovered_at`；`expires_at`／`deadline_at` 屬未來設計值不動），並在 `tests/validate.py` 新增兩條斷言——(1) `updated_at`／批次起訖／`verified_at`／`discovered_at`／`last_review_attempt_at` 與各來源 `accessed_at` 不得超過檢查時刻 5 分鐘以上（檢查在 push 前執行，正是看得到時鐘領先的時間點）；(2) 任何 `verified_at` 不得晚於批次完成時間。驗證：對舊資料執行新斷言會以 `updated_at is in the future (2026-11-09T02:40:00+08:00); use the real clock` 失敗，修正後 `python3 tests/validate.py` 通過 901 筆。**教訓**：subagent 回報的時間須以本機 `date -Iseconds` 對錶；本輪三個 scout 沒有 shell，改用 `timeapi.io`／伺服器 logId 對時並註明方法，主 agent 仍只寫自己讀到的時間。

工具經驗：`read` 對 DataCamp、火山引擎規則頁、docs.vultr.com 會走 content-negotiation 直接拿到 markdown，但同一頁用 `curl` 可能 403，兩種路徑要分別記錄。**來源網址會腐壞**：`www.camber.io/students` 內容整站換成另一家公司，只比對「頁面內容有沒有變」而不重看網址語意就會漏掉。同一供應商同一天更新的兩份文件可能互相矛盾（Ant Ling FAQ 500k/日 vs 計費指南改月券），衝突要以「兩句原文＋兩個 URL＋各自更新日」入庫，不可任選其一。行政院草案附件是 PDF，`read` 可直接轉文字取得條文，比新聞稿更適合當第 18 條金額門檻的證據。

下輪優先（前五項）：① `perplexity-watch`／`perplexity-education` 再試 `www.perplexity.ai/pricing` 是否解除 403，並追 3/日 vs 5/日、unlimited vs weekly 兩處矛盾（來源：Help Center 全文索引、定價頁）；② `fal-flux3-max-five-daily-sandbox` 在 11/21 前確認折扣實際截止日與 sandbox 每日 7 次是否含 FLUX 3 Max（來源：`/flux-3-max`、模型頁、`/flux-video` FAQ）；③ `ant-ling-ling-3-2-flash-free-two-weeks` 在 11/19 前確認免費期是否結束、每日 50 萬 vs 月券何者生效、台灣支付寶可行性（來源：price／faq／billing-upgrade）；④ `sensenova-token-plan-free-public-beta` 取得額度、重置週期與公測結束日（文件站純 JS，可試 platform.sensenova.ai 的 API 文件與回應標頭）；⑤ `claude-oss-six-months-ultra` 確認 10,000 名額是否已滿與 Ultra 標價（來源：claude-for-oss 頁、條款 §1、claude.com/pricing）。

2026-11-09 01:05–02:40 本輪（接續 74edee5 之後，獨立 commit）：起始 894 筆；局部複核 20 筆、新增 3 筆機會（政策 0、觀察線索 0、追查失敗 0）、未完成複核 874 筆；結果 897 筆。開始時 `next_review_at` 已到期者 0 筆（前一輪當日已刷新 24 筆到今天），因此佇列為：當日到期的台灣期限與來源衝突案例（14 筆）＋最久未核但有新訊號者（6 筆）；當日已核且無新訊號者不重複刷新。研究分工：3 個 subagent（到期與台灣期限、衝突與證據缺口、新機會去重），主 agent 逐筆重讀關鍵官方來源、以自己讀取的時間寫入 `accessed_at`（subagent 回報的 10:xx 時間戳未沿用）。本輪新增流程約束：subagent 不得編輯共享 JSON，只回 patch 由主 agent 整合。

實質變動 9 筆。`volcengine-ark-1111-token-giveaway-watch`：11.11 頁「2500 萬 Tokens」經其連出的活動規則與方舟免費額度文件確認，是既有「每模型 50 萬、按模型分別計算」新戶免費推理額度的加總（頁面自寫「单个模型可免费领取50万Tokens，累计超过2500万」），非額外贈額；規則 2.1 明列「地区限制：中国大陆用户」、需實名認證、活動至 2026-11-30，規則全文未提 token。狀態改 `restricted`、台灣改 **No**。`qoder-free-mechanisms`：Qwen3.8-Flash 免扣於 11/7 00:00 結束後，官方新增 Qoduck 隱藏模型每日免費額度（0.5×→0.0×、Free 與零點數帳戶亦適用、Teams/Enterprise 排除、僅 Qoder International），每日手領 100 點不變。`fal-flux3-max-five-daily-sandbox`：/flux-video-free 回 308 導向付費頁、/flux-3-max-free 404，每日免費影片文案已不存在；對照組 /grok-imagine-free 仍有每日 5 支，故非 fal 全面取消；折扣結束日三處不一致（11/21、11/22、12/31），狀態改 `terms_conflict`。`grammarly-student-annual-half-first-period`：以瀏覽器實測 SheerID 表單，國別可選 Taiwan 且「National Taiwan」回傳臺大、臺師大、海大、臺科大等校，補上先前「台灣資格本次未重驗」的缺口。`camber-student-compute-agent-monthly`：GitHub Student Developer Pack 條目現行文字為「Free Camber Student plan for as long as you're enrolled」，含每月 40 compute hours／50GB／50 agent messages，舊記錄的每月 5 GPU 小時已不在現行文字；型別由 watchlist 改 opportunity、狀態改 `conditional`。`autoclaw-halloween-40m-expiry-conflict-watch` 轉 `expired`（11/8 23:59 已過，頁面自 11/3 未再編輯）；`kiro-first-paid-subscription-bonus` 改記現行首升 Pro 方案（當月免月費＋500 trial credits，需卡，付費國家仍未列台灣）；`aliyun-model-studio-new-user-quota` 補記 2026-10-29 一次移除大批模型新戶額度的官方清單；`vultr-match-ai-compute` 以瀏覽器重讀，確認預存 US$10–100 逐元等額、50/50 扣抵、12 個月到期、重複帳戶不合格。

新增 3 筆機會：[Claude for Open Source](https://claude.com/contact-sales/claude-for-oss)（6 個月免費 Claude Ultra，上限 10,000 名核准者、滾動審核、90 天內啟用；條款 §2.3 要求居於 Claude.ai 支援地區，Supported Regions Policy 明列 Taiwan，故記 S 級條件式台灣適用）、[SenseNova Token Plan](https://www.sensenova.ai/token-plan)（商湯公開測試期 US$0、6.8 Flash Lite 與 U1 Fast、最多 20 把 API key；額度與地區條款未公布，留 Unknown）、[Ant Ling Ling-3.2-flash](https://developer.ant-ling.com/en/docs/models/price/)（上線後前 2 週免費、1M context，之後每月 ¥10 券與新戶 ¥20 券；首次呼叫須綁個人支付寶，台灣可行性未實測）。

品質改善：**服務地區篩選只做字串完全比對**。`regions` 是自由文字（26 種寫法：TW／Taiwan／Taipei, Taiwan／GLOBAL／Worldwide／United States…），舊版 `matches()` 用 `(o.regions||[]).includes(f.region)`，結果選「Taiwan」只回 74 筆，漏掉 6 筆 `taiwan=Yes` 但存成 `TW` 的紀錄（cht-google-ai-plus、taiwan-mobile、taipei-industry-incentive、taiwan-nsp-youth、taiwan-industry-talent、ntpc-uko-microsoft、ncu-nstc 等），且 71 筆有地區值的紀錄在任何選項下都查不到。已改為 `regionMatches()` 分桶（Global／US／Taiwan／Other，Other 收其他具名地區但排除 Unknown 與空值），前端實測 Taiwan 74→82、US 7→13、Global 82→112、Other 19→48，未被任何選項涵蓋者由 71 降至 3（皆為 Unknown）。`tests/filters.cjs` 新增規格值斷言（TW 必須入 Taiwan、United States 入 US、GLOBAL／Worldwide 入 Global、Japan 入 Other、Unknown 不得入 Other、空陣列不匹配），並對全庫斷言「宣稱台灣地區的紀錄必須出現在 Taiwan 選項」；已用 `git stash` 驗證同一組測試在舊程式碼會失敗。

工具經驗：`www.vultr.com` 對 curl／reader 全站 403（Cloudflare managed challenge），需真實 Chromium；`fal.ai` 的 `/flux-video-free` 是 308 而非 404，只查 404 會誤判；SheerID 表單是 React 自訂 combobox 而非 `<select>`，`#sid-country` 需先 click 再 type 才會出現選項。`tab.run` 的函式在瀏覽器頁面外執行，取 DOM 要用 `tab.evaluate`。`agent://<id>` 的輸出會被截斷，長清單要讀 `agent://<id>:raw:N-M`。

下輪優先（前五項）：`perplexity-watch`／`perplexity-education` 追官方是否清理 3/日 vs 5/日與 unlimited vs 週限兩處矛盾，並再試 `www.perplexity.ai/pricing` 是否解除 403（來源：Help Center 全文索引、定價頁）；`claude-oss-six-months-ultra` 確認 10,000 名額是否已滿、是否仍收件（來源：claude-for-oss 頁與條款 §1）；`sensenova-token-plan-free-public-beta` 取得額度與地區條款（來源：platform.sensenova.ai 文件站需 JS 渲染，可試 sitemap 或 API 文件）；`ant-ling-ling-3-2-flash-free-two-weeks` 確認 2 週免費的精確結束時點與台灣支付寶可行性（來源：pricing 頁、billing-upgrade FAQ）；`fal-flux3-max-five-daily-sandbox` 在 11/21–11/23 三個候選結束日附近確認折扣實際截止與 sandbox 每日 7 次是否含 FLUX 3 Max（來源：/flux-3-max、模型頁、/flux-video FAQ）。
2026-11-08 19:05–19:37 本輪（接續 7460378 之後，獨立 commit）：起始 889 筆；局部複核 16 筆、新增 4 筆機會＋1 筆觀察線索（政策 0、追查失敗 0）、未完成複核 873 筆；結果 894 筆。開始時 `next_review_at` 已到期者 **0 筆**（前一輪當日已刷新），因此佇列改以「最久未核實且仍可行動」輪替（2026-10-29／10-30 批次，7 筆）＋ 當日 08:40 前核過但仍有來源衝突者（7 筆）＋ 兩筆 Taiwan Yes 的舊紀錄，當日已核過且無新訊號者不重複刷新。研究分工：3 個 subagent（最久未核輪替、衝突與證據缺口、新機會去重），主 agent 逐筆重讀關鍵官方來源、以自己讀取的時間寫入 `accessed_at`，並自行查核每個新候選。

實質變動 3 筆。`kimi-free-web-app`：官方會員定價頁首次公布 Free 方案的非對話類上限（Agent 同時任務 1、Projects 2、專案儲存 500MB、排程與 Widget 各 2、Swarm 同時子任務 2，Kimi Code 僅付費），對話訊息數／token 與重置週期仍未公布，狀態改 `taiwan_availability_unverified`、標題改寫。`amp-hobby-free-grant-transition-watch`：舊紀錄「官方已停止新收件並縮減日額」的後半句沒有依據——2026-02-10 公告只說 Amp Free 停止新收件、既有用戶仍每日 US$10，且現行 Hobby 是 $0 自備模型（BYOK）「No Amp token fees or limits」，屬平台不收 token 費而非推論免費；狀態改 `conditional`、標題與摘要重寫。`requesty-startup-thousand-six-month-gateway-waiver` 補「官方稱 48 小時內完成審核並加到組織」。衝突未解但補證據 5 筆：`nscale-signup-five-current-docs-conflict`（現行 quickstart 只寫「Early users may be eligible for free credits」並要求先加值 US$5）、`luma-dream-machine-free-generation-watchlist`（Payments FAQ 另列 Lite／Unlimited 兩檔，主定價頁都沒有，屬第二層命名矛盾）、`medux-free-trial-3000-credits`（頁尾第三處文案證實矛盾是「per month」對「new users start with」）、`deepseek-new-user-grant`（價格文件只證實優先扣贈送餘額，儲值頁 403）、`zai-startups-api-credits-watch`（up to 1B tokens 仍為上限宣稱，無核配級距）。純複核無變動 8 筆：`kaggle-free-notebook-compute`、`modal-starter`、`julius-free-daily-twentyfive-welcome-seventyfive`、`paperpal-free-five-ai-daily-two-hundred-corrections`、`sourcery-oss-free-rolling-diff-budget`、`genially-education-free-500-ai-credits-year`、`wispr-flow-student-three-month-pro-annual-half`、`magicschool-free-educator-generation-limited`（數字與資格敘述全部吻合，僅更新來源查閱時間與核實範圍）。

新增 4 筆機會：[Freebuff Free](https://freebuff.com/plans)（$0、免卡、每日 30 小時額度於當地午夜重置不累積、每個 1 小時 session 訊息不限；Free 只有 DeepSeek V4.1 Flash Slow／10-17 兩款，其餘需 Starter US$8／月起；首頁稱以廣告支撐；地區條款未列）、[IndicStack Free Trial](https://indicstack.ai/pricing)（新戶 ₹2,000、15 天、6 款 Unlimited models、20 RPM／1 併發／1 key；付費 ₹2,499／月起未含 18% GST；購買額度不失效）、[XCrawl](https://www.xcrawl.ai/)（新帳號 1,000 free credits、免卡；文件示例 scrape 1 credit、JSON 抽取 5 credits；無 pricing／terms 頁，效期未知）、[Entire Agent 試用](https://docs.entire.com/billing)（每計費帳戶一次性 US$100、90 天、需驗證卡片不扣款，但官方明示新帳號試用 **temporarily paused**，狀態 `paused`）。觀察線索 1 筆：[火山方舟 11.11](https://www.volcengine.com/activity/ai618)（頁面同時寫「2500 萬 Tokens 免費領取」與「單模型 50 萬 Tokens」，未說明是否為加總，也未列期限、名額與實名條件）。

品質改善：複核週期標籤與排程長期不一致（前一輪結算 35 筆 `daily` 的 `next_review_at` 距 `verified_at` 4–30 天，其中 13 筆 30 天，其餘另有 6 筆 `weekly` 排到 21 天後）。這讓卡片顯示「下次複核：每日；12/08」而佇列實際一個月才輪到，讀者與維護者都會誤判追蹤強度。本輪把 41 筆的 cadence 改成實際排程（4–10 天→weekly、11–20 天→biweekly、≥25 天→monthly），未改 `next_review_at`、不影響當日佇列；並在 `tests/validate.py` 加斷言 `daily ≤3／weekly ≤10／biweekly ≤20` 天，以注入 `octoparse-ai-free-new-user-five-credit` 30 天排程確認會以「daily cadence but next review 30 days out」失敗。另把 `kaggle-free-notebook-compute` 的 6 筆來源（同網址 2 筆）合併為 5 筆，避免本批次驗證失敗。

工具經驗：`www.kimi.com/membership/pricing` 與 `startup.z.ai` 純 curl 只有 JS 外殼，需 Chromium 渲染；`kaggle.com/docs/*` 直取回空殼，但 `*.md` 路徑（如 `https://www.kaggle.com/docs/efficient-gpu-usage.md`）回純文字；`docs.entire.com/billing` 自動改走 `.md`；`julius.ai/docs/*.md` 與 `docs.nscale.com/*.md` 皆可直接讀。`xd://` 的 Python `tab.run(...)` 傳字串只回傳字串本身，頁內求值要用 `tab.evaluate(...)`。資料檔重寫務必維持原本 2 空格縮排，否則整檔 diff（本輪曾誤用 indent=1 產生 154k 行變更，已改回）。

下輪優先（前五項）：`perplexity-watch`／`perplexity-education` 再試 `www.perplexity.ai/pricing` 是否解除 403，並追 3/日 vs 5/日與 unlimited vs 週限兩處矛盾（來源：Help Center 索引、定價頁）；`entire-agents-trial-credit-paused` 追試用何時恢復發放（來源：docs.entire.com/billing 的 Free Trial 提示）；`freebuff-free-coding-agent-daily-hours` 找官方條款與地區名單（第三方稱僅 25 國完整模式，官方頁未載）；`volcengine-ark-1111-token-giveaway-watch` 讀活動規則頁確認 2,500 萬是否為每模型 50 萬的加總，以及台灣帳號能否完成實名（來源：docs.volcengine.com 活動規則、ark 免費額度文件）；`kimi-free-web-app` 追對話訊息額度是否公布並確認 Free 是否含 Kimi Code（來源：kimi.com/membership/pricing、kimi.ai/ai-models/kimi-k2-5）。

2026-11-08 18:05–18:19 本輪（接續 5e7f338 之後，獨立 commit）：起始 884 筆；局部複核 12 筆、新增 5 筆機會（政策 0、觀察線索 0、追查失敗 0）、未完成複核 872 筆；結果 889 筆。開始時 `next_review_at` 已到期者為 **0 筆**（前一輪當日已刷新 236 筆），故佇列改以「最久未核實且仍可行動」輪替（2026-10-25–10-30 批次）＋ 48 小時內到期項 ＋ 新機會為主；當日已於 01:30–17:23 複核過的紀錄不重複刷新。研究分工：3 個 subagent（臨期／付款風險、最久未核與來源衝突、新機會去重），主 agent 逐筆重讀關鍵來源後才寫入，時間戳一律用自己的讀取時間。

實質變動 8 筆。`perplexity-watch`／`perplexity-education` 長期 403 的官方正文，本輪改由官方 Help Center 的 Mintlify 文件主機全文索引 `https://perplexity-help-center.mintlify.app/llms-full.txt`（1.94 MB，內含 canonical `www.perplexity.ai/help-center` 連結）取得：Pro 為 **US$20/月或200/年**、付費 Pro 無固定月點數改為每週 Computer 用量（不結轉）、另有一次性約 4,000 credits（約30天到期）、auto-refill 預設關閉；但免費 Pro Search 上限官方兩說（比較表 3/日 vs 帳戶管理文 five per day），Education Pro 亦兩說（介紹文 unlimited Pro Searches vs 比較表 Weekly limits），兩筆狀態分別改 `conflicting_official_usage_claims`，Education Pro 並補上 **US$10/月（SheerID 驗證）**。`canva-education-k12-teachers-ai`：AI 用量頁改版，舊紀錄「約200次Premium／20次Ultra」已不在頁面，現為「Education 為 Canva Free 的 10 倍」且**每位成員各自額度、不共用不合池**；同頁 Premium/Ultra 可用方案清單仍未列 Education，衝突保留，狀態改 `conflicting_official_usage_claims`。`lindy-free-fifty-dollar-seven-day-trial`：現行最低付費為 **Team US$29.99/月含3,000 credits**（4,000／5,000 credits 為 39.99／49.99），舊紀錄「49.99 起」更正，狀態改 `active`；ToS 2026-11-03 版明列 workspace trial 席位可能轉付費。`temporal-startup-six-k-one-year-active-funded` 與 `elevenlabs-impact-nonprofit-pro` 的台灣資格由 Unknown 改條件式 **Yes**：前者 ToS 禁制地區含中國、香港而未列台灣，後者 Impact 條款 §1(c) 僅排除美國全面制裁地區；同時補記額度耗盡當月開票、促銷額度有到期日、單一組織一帳戶。`synthesia-basic-monthly-ten-min-five-hundred-no-download`：到期句寫「2026-11-09 23:59 BST」，但該日英國已轉 GMT，台北換算為 **11/10 06:59–07:59**，舊紀錄只寫 06:59 屬未標註的換算假設。`autoclaw-halloween-40m-expiry-conflict-watch`：頁面自 11/3 未再編輯，「expire on November 1」與上週 M10W4 的到期句**逐字相同**且連往上週活動頁，判為殘留文案，本檔條款一致為 11/8 23:59，頁面「up to 80M」今日已不可達，狀態改 `conditional`（官方未發布更正，仍未知能否登入領取）。

無狀態變更、僅補細節 4 筆：`google-skills-student-200-credits-taiwan`（申請處理最多兩週、額度用盡可再申請、無申請截止日）、`prowritingaid-education-k12-global`（官方「available globally. However, specific regional rules may apply.」、三學年授權、兩個工作日審核）、`notion-business-trial-standard-select-credits`（Business 現行 US$20/成員/月、期滿續訂與取消步驟）、`krisp-seven-day-no-card-meeting-ai-trial`（7 天免卡、Core US$16/月）。

新增 5 筆機會：[Nous Portal Free](https://portal.nousresearch.com/manage-subscription)（US$0／月、每月 US$0 credits、限用 FREE 模型並為 Standard rate limits；模型頁列 LongCat-2.5:Free、Reflection Beam 1.0、Crouton Alpha、StepFun Step 3.7 Flash、Upstage Solar Mini 4；條款 13 歲以上、Free Trial 免卡但保留驗證權；台灣 Unknown）；[Kiroween 2026](https://kiroween.devpost.com/rules)（AWS／Devpost 黑客松，參賽者可經表單申請一次性 **4,000 Kiro credits**，申請至 12/1 12:00 PT、兌換至 12/4、點數 12/31 23:59 PT 失效，以官方 add-on US$0.04/credit 約值 US$160；排除國家名單未列台灣，故條件式 Taiwan Yes）；[Oumi Free](https://oumi.ai/pricing)（公司信箱 US$50／個人信箱 US$25 credits、3 個月、一次性）；[Simular box](https://box.simular.ai/)（每帳號一台免費雲端 Linux 桌面，box 本體免費、模型呼叫吃帳戶每日 credits，MCP 端點 2026-11-04 變更；每日點數未公布）；[騰訊 Hy4 免費窗](https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/)（官方新聞稿明寫 11/4–15 WorkBuddy 與 CodeBuddy 免費、TokenHub Hy4 5 折至 12/31；額度與台灣註冊未公布）。子代理另建議新增 AutoClaw M11W2，查證後**已在資料庫**（`autoclaw-weekly-perk-november-nine-hundred-million-tokens`），未重複收錄。

品質改善：修正「設定時間」篩選的邊界錯誤。`app.js` 以嚴格小於比對，選「15 分鐘」會排除**正好需 15 分鐘**的 109 筆（全庫 205 筆落在 5／15／30／60 邊界上），修正為含等於並把標籤改為「設定時間 ≤」；`tests/filters.cjs` 原本斷言 `!f(free,{effort:'15'})` 正是把錯誤行為釘住，已改為含等於並補上「16 分鐘不得入 15 分鐘」的反向斷言。瀏覽器實測筆數（當下 884 筆）由 0／29／227／329 變為 **9／138／300／343**（5／15／30／60 分鐘），且 `work-codex-free`（15 分鐘）可由「15 分鐘」篩選查到；發布後線上以 889 筆量測為 9／141／303／347。另記錄兩項工具經驗：`grow.google` 與部分官網需 `curl --compressed` 才不會拿到 gzip 二進位；`qoder.com/pricing`、`canva.com/help` 純 curl 為 JS 外殼或 403，須用 Chromium 渲染。

下輪優先（前五項）：`perplexity-watch`／`perplexity-education` 追官方是否清理 3/日 vs 5/日、unlimited vs 週限兩處矛盾，並再試 `www.perplexity.ai/pricing` 是否解除 403（來源：Help Center 索引與定價頁）；`kiroween-2026-hackathon-4000-credits` 在 12/1 申請截止前確認 Credit Request Form 是否另有地區欄位、Kiro 帳號從台灣註冊是否受阻（來源：devpost rules、kiro.dev）；`tencent-hy4-workbuddy-codebuddy-free-window-nov4-15` 11/15 後確認免費窗是否結束、是否出現額度或條款頁（來源：tencent.com 新聞稿、TokenHub 文件）；`taipei-youth-ai-subscription-subsidy-2026` 11/10 當日掃最新公告是否臨時停收（來源：青年局服務頁與公告列表）；`synthesia-basic-monthly-ten-min-five-hundred-no-download` 11/10 07:59 後確認 launch credits 段落是否改寫、定價表「valid for 1 month」是否同步（來源：help.synthesia.io Syren credits、synthesia.io/pricing）。待處理資料債（本輪結算值）：35 筆 `review_cadence: daily` 的 `next_review_at` 距 `verified_at` 超過 3 天或未排程（標籤與排程不一致）；26 筆零成本且仍有效的機會紀錄未標 `free` view（含 `claude-watch`、`gemini-watch`），使「免費方案」專區漏掉它們；369 筆累積 1,148 筆同網址來源，需分批依「最新 scope／evidence＋較早紀錄：」規則壓縮。

2026-11-08 17:05–17:23 本輪（接續 bf78918 之後，獨立 commit）：起始 880 筆；局部複核 18 筆、新增 4 筆機會（政策 0、觀察線索 0、追查失敗 0）、未完成複核 862 筆；結果 884 筆。研究分工：3 個 subagent 分別處理時效／到期、衝突與最久未核輪替、新機會去重；主 agent 自行重讀關鍵來源（Cloudflare、Rime、AOCAI、Google 台灣公告、Browserless ToS、Canva AI 說明頁）並以自己讀取的時間寫入 `accessed_at`，未採用未核對的回報時間。

實質變動 4 筆：`cloudflare-ai-search-monthly-included-november-billing` 計費起日由紀錄所載 11/01 更正為官方 HTML 與 markdown 兩版一致的 **2026-12-01**（額度與超額費率不變，未找到變更公告，故不判定延期或先前誤讀）；`browserless-free-monthly-thousand-terms-conflict` 現行 Terms §11(a)-(k) **無** spider/crawl/scrape 字樣，原「條款禁止抓取」衝突不成立，狀態由 `terms_conflict` 改 `conditional`，只保留 §11(k) 規避其他網站安全功能與產品頁 Bypass bot detectors 的較窄張力；`canva-nonprofit-ai-free` AI 月額改以「Canva Free 的 10 倍」表述（每人獨立不共用），原約 200／20 次的絕對數字已不在官方頁；`rime-stt-nov19-free-window` FAQ 已明寫「through November 19, 2026」，截止年份疑問解決，時區與並發數值仍未公布。澄清 3 筆：`aocai-youth-ai-training-2026`（26 班、11/16 台北班未標截止、240 小時、招生 30 人、錄取免繳課程費）、`aihubmix-one-dollar-daily-free-model-pool`（目錄更新至 11/07、71 款）、`assemblyai-trial`（官方換算 185 小時預錄／333 小時串流、TTS 未列於免費額度）。其餘 8 筆無實質變動僅更新核實範圍與來源時間：`codeai-hour-of-ai-2026`、`antigravity-free`（第三方模型 11/18 移除倒數）、`google-students-tw-plus`（台灣公告 12/31 vs 學生頁「美國大學生」文案衝突仍在）、`beatapi-free-models-zero-balance`、`chutes-paygo-confidential-inference`、`google-colab-free-compute`、`moea-a-plus-early-startup-grant`（受理 2026-07-16 起隨到隨審至 2027-12-31、須三家目標客戶）、`apify-free-monthly-five-hard-stop`、`huggingface-zerogpu-free-daily`、`vercel-gateway-free`、`siliconflow-one-dollar-trial`（條款 2.1「for in Singapore」與 3.4(p) 禁商業用途疑義未解）。

新增 4 筆機會：[JetBrains Junie Lite](https://junie.jetbrains.com/docs/junie-lite.html)（免費基準模型層、非試用不到期、任何 JetBrains 帳號首次請求自動開通且免綁卡；官方不公布額度，稱正常用量近乎無上限但非無上限，容量見頂即停止且無降級；[服務地區清單](https://www.jetbrains.com/legal/docs/terms/jetbrains-ai/service-territory/)含 Taiwan，故 Taiwan Yes）；[IteraCompute 免費 Qwen3.8-27B](https://iteracompute.com/free/)（每月3,000萬 tokens、160K TPM、128K context、免卡；限時至 2026-11-24 00:00 PT＝台北11/24 16:00，每月1日 00:00 UTC 重置，超額 429 不自動轉付費；頁面未列地區，Taiwan Unknown）；[KRAFTON Raon-1 mini Preview](https://raon-mini.krafton.ai/en)（限時免費 API、申請制、每人限額與結束日未公布、未來收費另公告，權重 Apache 2.0；Taiwan Unknown）；[Tencent EdgeOne Makers 免費版](https://edgeone.ai/document/211893332490612736)（內建模型50萬 tokens／月、40專案、建置500次／月、Edge Functions 300萬次／月；文件稱商業化後可能調整、目前從寬；未列地區與綁卡要求，Taiwan Unknown）。

品質改善：修正「用量類型」篩選與「無限／暫時不限量」專區的資料來源（詳見維護段），並在 `tests/validate.py` 新增 `views` 與 `quota_classification` 一致性斷言；兩者可採取行動的專區現在一致排除已截止紀錄，`tests/filters.cjs` 另加「已截止不得進無限專區、但仍可從全庫搜尋」與「index.html 每個額度選項都對應資料」的斷言。本輪只合併本批次 18 筆內部的重複來源（如 antigravity 31→5、rime 18→2）；全庫仍有 385 筆累積 1,226 筆同網址重複來源，是下一輪可分批處理的資料衛生工作，處理方式沿用「最新 scope／evidence＋較早紀錄：」規則，不動其他欄位。

下輪優先（前五項）：`iteracompute-free-qwen-3-8-27b-monthly-30m` 11/24 後確認免費層是否延續或改價（來源：iteracompute.com/free 與 free-tier-terms）；`antigravity-free` 11/18 後確認三個第三方模型是否如期移除、免費欄是否改列（來源：antigravity.google/docs/models）；`rime-stt-nov19-free-window` 11/20 後確認 Free 方案 STT 是否開始計費與並發數值（來源：rime.ai/pricing、rime.ai/terms）；`browserless-free-monthly-thousand-terms-conflict` 補找 ToS 版本日期或歷史快照以判斷 §11 是否曾改寫；`google-students-tw-plus` 以瀏覽器實測 SheerID 台灣學校是否可完成驗證，並盯 12/31 前是否出現兌換異常。Perplexity 兩筆維持 403 記錄，不刷新 `verified_at`。

2026-11-08 16:04–16:26 本輪（接續 22b95a9 之後的第二段，獨立 commit）：起始 875 筆；局部複核 12 筆、新增 5 筆機會（政策 0、觀察線索 0）、未完成複核 863 筆；結果 880 筆。複核 `cht-google-ai-plus-first-year-free-2026`（首年後原價 165／330／650 元、主約 12 個月與寬頻 7–12 個月 264 元，官方新聞稿＋方案頁雙讀）、`sarvam-campus-tour-credits`（53 張校卡 completed 18／tentative 35／active 0，18 個報名鈕全 disabled，改判 `applications_closed`）、`articul8-bivia-early-adopter-billion-tokens`（條款「No trial converts to paid access」與 18 歲門檻）、`felo-standard-free-new-user-daily-two-hundred-campaign`、`deepgram-flux-tts-bonus`、`minimax-design-h3-new-user-watch`、`mango-inference-community`（$10 額度＋首 30 天 7 折、11/11 截止）、`cursor-students-policy`（2026-06-25 起停止新申請）、`beam-cloud-developer-paid-not-thirty-free`、`nlp-cloud-trial-card-and-hard-cap`、`upstage-mini4-discount-ended`（改判 `expired`）、`openai-student-collective-2026`（改判 `applications_closed`）。新增：`taiwan-nsp-youth-ai-training-subsidy-2026`（產業新尖兵，15–29 歲本國籍待業青年最高 10 萬元訓練補助、每月 8,000 元學習獎勵金、116 年起內含 8,000 元 AI 工具訂閱補助）、`taiwan-industry-talent-investment-ai-courses-2026`（產業人才投資方案，在職勞工 80%／特定對象 100%、3 年 10 萬元上限）、`ntpc-uko-microsoft-ai-cert-free-2026`（新北 UKO 微軟 AI 證照免費培訓）、`apple-siri-ai-developer-preview-2026`（Siri AI 開發者預覽，免費、繁中「將擴充」）、`ncu-nstc-robotics-talent-training-2026`（國科會智慧機器人高階人才培訓，碩士以上不限國籍、120 小時免費）。同時把 12 筆已截止卻仍掛 `daily` 的紀錄降為 `monthly_or_new_signal`，並在 `tests/validate.py` 加入「已截止紀錄不得維持 daily」的斷言，避免死案每輪重複排隊。未登入、未報名、未付款；Perplexity 兩筆仍因官方頁 403 無法複核。

下輪優先（本段視角，前五項）：`taiwan-nsp-youth-ai-training-subsidy-2026` 核「每月 8,000 元學習獎勵金」是否只在新聞稿、計畫條文有無，並確認 12 月梯次是否仍收件（來源：青年職訓網、台灣就業通）；`ntpc-uko-microsoft-ai-cert-free-2026` 確認 Pearson VUE 首次考試費由誰負擔、AB-730 第 2 梯（11/14）是否仍開放（來源：新北青年局課程頁）；`ncu-nstc-robotics-talent-training-2026` 補找中央大學官方招生頁與面試日程（來源：NCU 產學營運中心、國科會）；`mango-inference-community` 在 11/11 後確認 30% 折扣是否結束、$10 額度是否需卡（來源：platform 頁與 docs）；`sarvam-campus-tour-credits` 追 35 所 tentative 校園是否有任一開放報名，若全年度結束則改 `expired` 並退出複核。Perplexity 兩筆維持記錄 403 嘗試，不刷新 `verified_at`。

2026-11-08 16:03–16:20 本輪（兩段研究合併成同一批次）：起始 869 筆；局部複核 26 筆、新增 6 筆（5 機會、1 觀察線索）、追查失敗 2 筆、未完成複核 843 筆。第二段（本 agent）複核 `krater-student-fifteen-twenty-discount-conflict-watch`、`vast-startup-spend-match`、`medux-free-trial-3000-credits`、`cognee-free-memory-token-grant-conflict-watch`、`memobase-free-credit-operation-conflict`、`langwatch-developer-free-fiftyk-terms-conflict`、`google-ai-professional-certificate-tw-pro-3mo`，新增：

[新竹市AI領航青年數位工具補助](https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323)：設籍新竹市16–40歲，直接向AI官網購買訂閱可事後核銷，一般50%／上限NT$3,000、特定對象與語言認證90%／上限NT$6,000；**購買期限115/4/2–10/31已過**，只有10月底前已買者可於11/30前送件，11/8頁面顯示剩餘經費NT$340,843（5.9%）、審核約12週；Poe／GoingBus等聚合平台與API、點數、Token、預付儲值一律不補。Taiwan Yes（限設籍新竹市）。

[經濟部中小及新創企業署116年度深科技跨域研發補助](https://www.sme.gov.tw/article-tw-2275-15216)：每案上限NT$900萬且不超過全案總經費50%，須2家以上國內登記中小企業組聯盟、擇一主軸（代理式AI／永續AI／物理AI），補助款≦自籌款≦實收資本額，受理至2026-12-07 17:30、採線上申請與實體審查。Taiwan Yes（限國內登記營利事業，個人不適用）。

[Krater 學生折扣](https://krater.ai/students)：同一頁六處寫15%、僅一處區塊標題殘留「20% off for 1 year」，改以15%為現行口徑（狀態 terms_conflict→conditional），並更正Max點數級距為10,000–100,000。[Medux](https://medux.io/pricing)：FAQ改寫為「New users start with 3,000 free trial credits」、`one-time`字樣已不在頁面，與首段「per month」仍衝突，方案表連續兩輪載入失敗。[Cognee](https://www.cognee.ai/pricing)：定價頁1M與帳務文件10M tokens兩份官方文件今日皆在線且互斥，維持並列。[Memobase](https://memobase.ai/)：首頁500 credits／月、store=10／search=1 credit、每月1日重置，與條款50 operations單位不同，改標官方來源。[LangWatch](https://langwatch.ai/pricing)：定價頁€0 free forever／50k events vs 條款14天試用並存，狀態改conflicting_official_usage_claims。

[Google AI 專業證書三個月AI Pro](https://grow.google/intl/zh-TW_tw/ai-professional/)：台灣頁註腳仍寫2027-01-01，其直接連結的Google One條款（2025-07-31版、含`g1_landing_page=0`變體逐字相同）仍寫「redeemed by November 6, 2026」，該期限今日已過；兩說並列，不逕判可兌換或終止，勿為試用先付US$49/月課程費。

[AutoClaw 萬聖節](https://autoclaw.z.ai/blog/news/M11W1/)到期文字衝突已可判讀：寫「expire on November 1」那句自稱本週獎勵並連向[上週公告M10W4](https://autoclaw.z.ai/blog/news/M10W4/)（10/26–11/1），屬沿用上週文案；本活動確為10/31 00:00–11/8 23:59（UTC+8）、每帳戶4,000 credits一次。

[Perplexity Education](https://www.perplexity.ai/education)：`/education`、`/students`、help-center、`/pricing` 四個官方URL於16:2x全數403，無任何官方正文可支持「官方說法有差異」，狀態由 `conflicting_official_usage_claims` 降為 `unverified`、複核改每週；讀取失敗不證明停辦。

下輪優先（第二段視角，前五項）：`autoclaw-halloween-40m-expiry-conflict-watch` 11/9確認活動下線與到期文字是否更正；`hsinchu-city-ai-youth-digital-tool-subsidy-2026` 追剩餘5.9%經費與是否提前停止收件；`google-ai-professional-certificate-tw-pro-3mo` 以瀏覽器實測兌換是否仍受理，並看條款是否更新為2027版；`moea-sme-deep-tech-cross-domain-rd-grant-116` 下載申請須知PDF補核撥款與核銷規定；`medux-free-trial-3000-credits` 等方案表後端修復後一次解決單價、重置與綁卡三個未知。

2026-11-08 16:03–16:17 本輪：起始869筆；局部複核 `taipei-youth-ai-subscription-subsidy-2026`、`aocai-working-free-ai-courses-2026`、`autoclaw-halloween-40m-expiry-conflict-watch`、`autoclaw-weekly-perk-november-nine-hundred-million-tokens`、`synthesia-basic-monthly-ten-min-five-hundred-no-download`、`fal-flux3-max-five-daily-sandbox`、`stepfun-stepaudio3-music-gen-preview-nov8`、`airtop-free-monthly-thousand-signup-bonus-conflict`、`aws-nonprofit-techsoup-budget-tiers`、`relevance-free-availability-conflict`、`gamma-free-credits-taiwan-unverified`、`fathom-free-meeting-summary-taiwan-unverified`、`seldon-pilot-up-to-three-k-ninety-days-terms-gap`、`voyage-free-tokens-batch-excluded`、`voiceflow-free-once-credit-amount-watch`、`lovable-student`、`lovable-student-discount`、`github-copilot-free`、`copilot-free`；新增機會 `google-gemini-for-education-fundamentals-free`、`make-ngo-program-twelve-month-pro-40k-ops`、`wistron-compute-donation-third-cohort-2027h1`，觀察線索 `amd-itri-mi300x-open-compute-2026-watch`；既有未完成850筆，`perplexity-watch` 與 `perplexity-education` 官方頁與文字代理全數403，僅記追查失敗。未登入、未申請、未付款。

[fal FLUX 3 Max](https://fal.ai/flux-3-max)：11/8 00:00 UTC起由75%折扣改為50%（720p $0.085/秒），11/23 00:00 UTC恢復$0.17；模型頁寫促銷至11/22、landing寫11/21、[舊免費頁](https://fal.ai/flux-video) FAQ仍寫12/31，三方不一致；原「每日3／4／5部免費影片」文案已不在任何官方頁，改記為付費折扣、移出免費篩選。

[AWS非營利](https://www.techsouptaiwan.org/node/7472)：台灣科技濃湯三個商品頁正文明列「提供給臺灣合格的非營利組織和公共圖書館」，年度預算分三級給US$1,000／2,000／5,000等值點數（行政費NT$3,155／6,309／15,773），每會計年度一筆、教育機構不適用、須綁卡AWS帳戶；台灣由 Unknown 改判 Yes（限非營利與公共圖書館），並由觀察線索改列機會紀錄（S 級）。

[青年局AI工具補助](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)：服務頁（9/22更新）與[公告列表](https://youth.gov.taipei/announcement/latest-announcement)第一頁（最新11/5）仍未見用罄或停收公告，11/10為書面送達最後日；8–10月已訂閱者才可核銷。[AOCAI 11/11台北班](https://ievents.iii.org.tw/EventS.aspx?t=0&id=3535)報名至11/09 23:59、0元、上限300人。

[Wistron×Garage+第三屆](https://garageplus.asia/wistronpower)：每案5,000–33,000 H100 GPU小時、使用期2027/02/25–08/23（最長25週），申請至2026/12/13 23:59，新創須具台灣連結之一、學研限台灣大專院校。[Make NGO](https://www.make.com/en/ngo-program)：合格非營利12個月Pro、每月40,000 operations，學校不適用，未列國別清單故台灣維持Unknown。[Gemini for Education](https://edu.google.com/intl/ALL_tw/ai/gemini-for-education/)：機構註冊免費Fundamentals即可用、須管理員開啟，個人不能自辦。

[Synthesia](https://help.synthesia.io/en/articles/17697950-how-do-syren-credits-work)：Basic新用戶同享1,000 Syren launch credits，2026-11-09 23:59 BST（台北11/10 06:59）到期，到期改扣標準credits且不通知；定價表「valid for 1 month」與固定到期日衝突未解。[AutoClaw](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節活動今日23:59結束、到期文字11/1與11/8仍並存；下週[100M活動](https://autoclaw.z.ai/blog/news/M11W2/)11/9 00:00才開始。[Airtop](https://portal.airtop.ai/shutdown)11/13停服、新註冊與升級已關閉，定價頁Free屬殘留。

品質改善：新增 `duplicate_merged` 狀態與 `duplicate_of` 欄位（前端標示、退出免費篩選、評分列D），並以標題完全相同的斷言攔到既有重複；本輪併入4筆重複收錄（`copilot-free`→`github-copilot-free`、`lovable-student-discount`→`lovable-student`、`google-ai-educator-series-free`→`google-ai-educator-series-taiwan`、`together-startup-accelerator`→`together-startup-accelerator-tiers`），同時合併5筆紀錄內同網址的重複來源。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 11/10當天早上查[公告列表](https://youth.gov.taipei/announcement/latest-announcement)是否停收；`synthesia-basic-monthly-ten-min-five-hundred-no-download` 11/10 06:59後確認Syren到期與比較表是否改寫；`fal-flux3-max-five-daily-sandbox` 查11/21–11/23折扣結束日三方矛盾是否收斂；`autoclaw-halloween-40m-expiry-conflict-watch` 11/9查活動是否已下線、到期文字是否更正；`aws-nonprofit-techsoup-budget-tiers` 補查「臺灣合格非營利」的法律形式清單與NT$行政費稅務說明。

2026-11-08 12:10–13:20 本輪：起始864筆；局部複核 `datacamp-free-access-week-november-2026`、`gmi-a16z-first25-two-k-spend-five-k-credit`、`fal-flux3-max-five-daily-sandbox`、`synthesia-basic-monthly-ten-min-five-hundred-no-download`、`airtop-free-monthly-thousand-signup-bonus-conflict`、`kiro-startup-pro-plus-2026`、`retool-nonprofit-monthly-coupon`、`amazon-ara-multilingual-contextual-ai-fall-2026`、`neo4j-startup-aura-twentyk-application-unavailable`、`manus-startups-redirect-current-unverified`、`google-ai-professional-certificate-tw-pro-3mo`、`grammarly-student-annual-half-first-period`、`taiwan-hrd-free-ai-introduction-2026`、`vast-startup-spend-match`、`snowflake-ai-trial-2026`、`mem0-hobby-memory-api`、`speechify-api-free-monthly-500k`；新增機會 `cht-google-ai-plus-first-year-free-2026`、`taiwan-mobile-free-ai-life-course-2026q4`、`heygen-voice-turbo-free-api-until-2026-11-30`，政策 `taipei-industry-incentive-ai-rd-batch2-2026`，觀察線索 `medux-free-trial-3000-credits`。`perplexity-watch`、`perplexity-education` 八個官方 URL 全數 403，記為追查失敗、未刷新核實時間。未登入、申請、付款或兌換。

[中華電信×Google AI Plus](https://www.cht.com.tw/zh-tw/home/cht/messages/2026/1104-1520)：11/4官方附表列精采5G 799/999搭AI Plus(400GB)首年0元、1399搭AI Plus(2TB)首年0元，購機／贈點／單門號為首月0／89／299元擇一，指定寬頻前6個月0元、第7–12個月264元；單租年約2TB NT$264（原330）、5TB NT$529（原650）。台北11/4至2027-01-31申辦開通送5GB流量，2026-11-30前完成再加Hami Point 100點。須綁5G或寬頻資費，非可獨立領取；綁約年限、首年後AI月費與方案結束日未公告。Taiwan Yes（條件式）。

[台灣大哥大AI智慧生活課程](https://www.taiwanmobile.com/content/event/consumer-ai/index.html)：第四季免費實體課，11/21台北文創與高雄三多、12/19台中文心向上與高雄三多，每場1小時；線上表單報名、頁面明列完全免費且未要求台灣大哥大用戶身分，名額有限額滿為止。頁面場次標籤（第一場／第二場）重複錯置，只有日期與門市可信；活動條款docx未解析。Taiwan Yes。

[HeyGen Voice Turbo Free](https://developers.heygen.com/docs/voices/heygen-voice-speech)：`heygen-voice-1-turbo-free` 免費至2026-11-30且不需credit餘額，限public voice或Voice 1 instant clone、每次1–5,000字元、每member 30 req/min、全體共用容量可能回429；免費請求不會自動轉付費模式。zh-TW等區域語言標籤會回400，須送`zh`。商用授權與台灣資格未列。

[臺北市產業發展獎勵補助](https://www.industry-incentive.taipei/news_detail/497)：115年度第2梯次主題式研發補助（AI創新應用）受理2026-11-02至11-30，每案NT$200萬（計畫總經費須≥NT$400萬）、預計15案，執行期2026-12-01至2027-11-30；限台北市登記滿1年之公司、商業或外國公司在台登記地，單純採購或導入現成AI服務不予補助。截止時刻未載明。

[Medux](https://medux.io/pricing)：定價頁寫「3,000 trial credits per month」，同頁FAQ寫新用戶3,000一次性點數，兩說並存；方案表顯示「Pricing data is unavailable from the backend」未載入，故點數換算、重置與是否需綁卡均未知。Workshop／API／MCP共用同一餘額；條款以PRC法律管轄、爭議送上海楊浦區人民法院。列為觀察線索。

[fal FLUX 3 Max](https://fal.ai/flux-3-max)：原記錄的「每日3／4／5部免費影片」文案在flux-3-max、模型頁與舊免費頁均未再出現；fal.ai/flux-video-free以308轉址至/flux-video，該頁改寫「Generations are pay-per-use」，flux-3-max以720p每秒US$0.0425計費（表列原價0.17、標示優惠至11/7，另頁FAQ寫12/31，衝突仍在）。現存免費字樣只有沙盒「7 free generations today. No account needed.」，未載模型範圍；無法判定取消或僅文案下架，狀態降為needs_verification，不逕判終止。

[Google AI 專業證書三個月AI Pro](https://grow.google/intl/zh-TW_tw/ai-professional/)：台灣頁仍寫課程US$49/月與「優惠將於2027年1月1日到期」，但其連結的Google One條款（含`g1_landing_page=0`變體）今日兩版本均為2026-11-06、Last updated 2025/7/31，先前記錄的2027-01-02版本已不存在。今日正好落在兩期限之間：條款已過、台灣頁未到，兌換是否仍成功未經實測，兩說並存不擇一；勿僅為試用先付課程費。Coursera明示領取financial aid者不適用。

[Airtop](https://portal.airtop.ai/shutdown)：停服頁確認2026-11-13結束服務、不再接受新註冊或升級；本次定價頁已無「新專案」預告橫幅，但仍完整列Free US$0／月、1,000 credits／月、10,000迎新並附可點註冊連結。公告優先，定價頁不得作為可領證明。

[Neo4j 新創](https://neo4j.com/startup-program/apply/)：申請頁「This form is temporarily unavailable」經原始HTML確認位於 `class="form--unavailable-message"` 且 `style="display: none"` 的備援區塊，旁邊是Marketo表單殼；不可再用文字版判定表單關閉，也不能據此宣稱可送件。計畫本身仍列最高US$20,000 Aura credits、Series B或更早、5個工作日內決定。

[Manus 新創](https://manus.im/startups)：頁面確認公開申請暫停、僅VC推薦（六個月Team、最多20席、官方標示US$4,800），狀態改為paused；橫幅「VC Referral Only」與資格段「Preferred but not required」並存，以橫幅較保守。

[Snowflake 試用](https://www.snowflake.com/en/snowflake-trial/)：US$400與Cortex Code US$40免費推論皆為30天；註冊只需email，但AI功能預設停用、須加信用卡才啟用且加卡不等於升級。註冊頁注入 `window.trial.isoCode="TW"`、國別表含Taiwan（+886），台灣在可選國別內；試用頁與文件對external network access等限制仍是10 credits/day vs 完全不可用兩說。

[Kiro 新創](https://kiro.dev/startups/)：官方FAQ已列明確排除國別清單（Argentina、Belarus、Brazil、China/GCR、Cuba、France、Germany、Iran、Italy、Mexico、North Korea、Poland、Russia、Spain、Syria、Crimea、DNR、LNR、UAE），台灣未列其中，先前「GCR未定義」疑慮降低但仍須個案核准；方案正文與FAQ對AWS Activate的排除標準衝突未解。

[Synthesia](https://www.synthesia.io/pricing)：Basic免費配額改列「1 Syren video - limited promo」，比較表仍寫「valid for 1 month／1,000 credits」，與說明頁固定到期2026-11-09 23:59 BST（台北11/10 06:59）衝突並存。Basic仍為US$0／月、500 credits、10分鐘影片、不可下載。

[Vast 新創](https://vast.ai/startup)：現行頁「No upfront giveaways. No free trials.」與2026-02-06舊文「$2,500 in free GPU credits」同站並存，衝突未解；退款衝突（2018條款全部不退 vs 計費文件信用卡未用可退）亦仍存在。

[Mem0](https://mem0.ai/pricing)：Free現行為前30天10,000 adds／1,000 retrievals（模型費Mem0負擔），BYOK後50,000／10,000；10/26前註冊者過渡至2026-11-25，屆時未接金鑰則新增報錯、檢索限1,000/月。Free條款仍授予內容永久、不可撤回、可訓練模型的授權。

[Datacamp 免費週](https://www.datacamp.com/campaign/free-access-week-november-2026)：官方條款確認美東11/2 09:00至11/8 23:59，即台北11/9 12:59共同截止；免購買、Teams帳號不適用、排除AI Tutor／Google合作／Microsoft Fabric／DataLab Premium。

其餘本輪複核無實質變動：[GMI×a16z](https://www.gmicloud.ai/a16z) 補上「200+模型」與工作日24小時入帳、仍無截止日；[Retool非營利](https://docs.retool.com/support/discount-programs) 每月US$1,625券與AI點數750/1,500 vs 1,000/3,000衝突未解；[Amazon ARA](https://www.amazon.science/research-awards/call-for-proposals/multilingual-and-contextual-ai-evaluation-call-for-proposals-fall-2026) 投稿至台北11/12 15:59；[Speechify API](https://speechify.ai/pricing) Free 500K字元、Simba 3.5 於11/21後降至250K；[Grammarly學生五折](https://support.grammarly.com/hc/en-us/articles/39623389691021-Grammarly-promo-offers-on-SheerID) 折扣與續訂條款確認，但SheerID台灣國別清單因JS動態載入本次無法重驗，台灣資格降回「條件式且本次未重驗」；[台灣HRD AI概論](https://elearn.hrd.gov.tw/info/10042743) 再確認頁面無費用欄位、數位發展部2024免費說法僅指另一專區，本課2026費用維持未知。

品質改善：本輪開始時407筆記錄的 `sources` 內有同網址重複條目（全庫3,828筆來源僅2,488個不同URL），前端逐筆列出同一網址的多份證據，同一頁面會出現兩種措辭而無從判斷新舊。`app.js` 新增 `groupSources`：同網址只渲染一列，取查閱時間最新者為主，其餘收進「較早的 N 筆同網址紀錄」可展開區塊並保留原文（不刪資料），styles 補 `.source-earlier`。`tests/validate.py` 對本輪批次新增兩項斷言——不得有重複來源URL、每筆至少一個本次查閱時間——並以注入重複來源與移除查閱時間兩種方式確認會失敗；`tests/filters.cjs` 增測同網址合併、新舊排序與舊證據仍可取得。本輪複核的 17 筆已就地合併（例：`fal` 16→8、`airtop` 33→6、`neo4j` 16→4、`manus` 6→2），其餘 398 筆由前端合併顯示，全庫最多由 38 列降為 8 列（`laya-free-oct2026`）。瀏覽器載入 869 筆、無 console error、390px 視窗無水平溢出。

下輪優先：`fal-flux3-max-five-daily-sandbox` 台北11/10 04:00原訂截止後一日以瀏覽器登入／未登入兩態確認沙盒7次是否含FLUX 3 Max，再決定維持needs_verification或改not available；`google-ai-professional-certificate-tw-pro-3mo` 以瀏覽器實測Coursera→one.google.com兌換是否仍受理（條款11/6 vs 台灣頁2027-01-01）；`cht-google-ai-plus-first-year-free-2026` 讀[googleone.cht.com.tw活動頁](https://www.cht.com.tw/home/campaign/googleone/index.html)補綁約年限與首年後AI月費；`github-copilot-free` 與 `copilot-free` 為同一Copilot Free方案的重複紀錄（來源與摘要幾乎相同），需決定合併方式並保留policy-history指向；`autoclaw-halloween-40m-expiry-conflict-watch` 與 `autoclaw-weekly-perk-november-nine-hundred-million-tokens` 於台北11/8 23:59截止與11/9開跑後確認活動頁狀態。

2026-11-08 11:05–11:25 本輪：起始863筆；局部複核 `autoclaw-halloween-40m-expiry-conflict-watch`、`autoclaw-weekly-perk-november-nine-hundred-million-tokens`、`aocai-working-free-ai-courses-2026`、`taipei-youth-ai-subscription-subsidy-2026`、`valyu-signup-ten-twenty-twelve-months`、`replit-startup-partner-credits-pro`、`kakaocloud-rocket-launcher-startups`、`grok-retention-community`、`braintrust-starter-monthly-model`、`typhoon-free-research-api-rate-limited`、`fish-audio-s21-pro-free-development-api`、`fish-audio-student-voice-credits`、`whimsical-education-year-pro-once-ten-ai`、`imagi-free-teacher-lovable-twentyfive-thirty-days`、`elevenlabs-impact-professors-pro`、`elevenreader-student-free-year`、`luma-dream-machine-free-generation-watchlist`、`composio-hobby` 共18筆；新增機會 `make-startup-partner-six-month-bootstrap-three-month-credits` 共1筆，政策及線索各0筆；既有未完成845筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[AutoClaw 萬聖節4,000點](https://autoclaw.z.ai/blog/news/M11W1/)：活動公告仍列至今日（11/8）23:59 UTC+8截止，但同頁另段仍將本週獎勵誤寫為11/1到期，正文矛盾仍在；免費服務依[服務協議](https://autoclaw.z.ai/privacy/md2html/?favicon=autoglm&md=autoclaw_agreement)明確限非商業個人研學；台灣實際可領未核。

[AutoClaw 週福利](https://autoclaw.z.ai/blog/news/M11W2/)：台北11/9 00:00至11/15 23:59每帳戶領1億Tokens（10,000點）公告在線，排定明日開跑；11/8尚未達開始時間；未承諾免卡，第三方API另計；台灣註冊與領取待核。

[經濟部服務業在職AI課程](https://serv.gcis.nat.gov.tw/AOCAI/)：台北11/11班受理報名至2026-11-09 23:59截止，[報名表](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)實測可正常操作、應付NT$0；目前參訓方式僅列「線上參與」，正文招生100人與系統上限300人口徑差異仍存；Taiwan標記為Yes。

[臺北青年AI訂閱補助](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)：最後送達期限倒數中（最遲11/10前書面送達青年局）；合格完整月支出限8/1–10/31；本輪查閱[青年局公告](https://youth.gov.taipei/announcement/latest-announcement)未見本案經費用罄停收公告，先付後審；Taiwan標記為Yes。

[Valyu 免費額度](https://docs.valyu.ai/pricing)：新帳戶一次US$10、公司信箱US$20免卡額度（12個月有效）在線；定價稱無overage且餘額不足回402硬停，但[平台協議](https://platform.valyu.ai/about/platform-service-agreement)§9仍保留自動扣款及停權條款，兩者張力未解；台灣可用度未核。

[Replit 新創](https://replit.com/startups)：最高US$25,000額度在線；卡片標示6個月有效與FAQ核准後12個月矛盾仍存；本輪查得[Pro協議](https://replit.com/pro-agreement)，確認超額使用費可能自動扣款，一般企業條款30日前不續約通知不直接套用所有startup Pro；台灣公司資格待核。

[KakaoCloud 新創](https://www.kakaocloud.com/business/support/rocket-launcher)：分級列Launch₩5M/1年、Boost₩20M/2年、Grow₩35M/2年，但FAQ通則仍稱發行後1年有效，衝突未解；登記付款方式為必要條件，額滿或到期自動扣服務費；官方下載包確認限成立十年內新加入企業；境外法人適用性未明。

[SuperGrok 留存優惠](https://docs.x.ai/grok/faq.md)：官方FAQ、定價與消費者條款均未公布「取消即送三個月免費」之公開留存方案；[套裝條款](https://x.ai/legal/bundled-subscription-terms)§8確認促銷結束後標準價自動續訂，台灣消費者有5日取消權；社群留存說法維持個別帳戶待核。

[Braintrust Starter](https://www.braintrust.dev/pricing)：免卡註冊每月US$10模型額度在線，不結轉；[文件](https://docs.braintrust.dev/admin/ai-providers.md#requirements)確認內建模型限工作信箱或已有付款方式，直接Gateway呼叫需Pro以上；未開on-demand耗盡暫停，加卡開通超額月結。

[Typhoon 免費研究展示 API](https://docs.opentyphoon.ai/en/)：5 RPS／200 RPM研究展示在線；重大補核：[登入頁服務條款](https://opentyphoon.ai/tac)由SCB DataX提供，輸入授權用於模型訓練、嚴禁輸入個人敏感個資，並嚴格禁止將輸出用於訓練AI模型或未經同意之競爭評測；非商用研究展示。

[Fish Audio S2.1 Pro Free](https://docs.fish.audio/developer-guide/models-pricing/models-overview.md)：指定s2.1-pro-free文字轉語音API維持US$0/百萬UTF-8 bytes開發測試在線；Starter級別支援5個併發請求（非5 RPS），無TTFA或DPA保障；與付費s2-pro（US$15/M）分開。

[Fish Audio 學生方案](https://fish.audio/students/)：認可大專院校學生以.edu信箱驗證在線，核准點數限教育非商業專案；公開頁未列點數總量與效期；台灣.edu.tw接受度未測。

[Whimsical 教育](https://whimsical.com/learn/billing/pricing)：教師與學生一年免費Pro在線；每帳戶10點AI額度為一次性不按月重置；[Typeform申請表](https://whimsicalpowers.typeform.com/education)實測僅接受學校信箱，不接受替代證明，審核可達15工作天。

[imagi 教師免費](https://imagilabs.com/pricing)：經驗證教師25 Lovable點數（有效30天）在線，不保證每月補發；定價頁（固定期滿聯絡續約）與[教育條款](https://imagilabs.com/terms-of-service-imagi-edu)（自動續訂需提前30天通知）衝突仍存；台灣教師資格未測。

[ElevenLabs 教授計畫](https://elevenlabs.io/impact-professors)：高等教育機構教授申請12個月Pro access code在線，期滿可重新申請；學生須由教授申請課程Creator代碼；台灣機構個案審核未核。

[ElevenReader 學生一年](https://elevenreader.io/students)：合格大專學生以學校信箱驗證享一年免費在線；期滿按當時標準年費自動續訂，須事先於帳戶取消；台灣學校網域未測。

[Luma Dream Machine 免費生成](https://lumalabs.ai/pricing)：FAQ仍提Free方案可生成Photon與Ray 3.14 draft影片（720p且帶浮水印、限個人用途），但現行主定價僅列Plus/Pro/Ultra，未公開免費月額；維持未核實觀察線索。

[Composio Hobby](https://composio.dev/pricing)：免卡每月100K工具呼叫、50K事件與2,000 RPM硬上限在線；重要更新：2026-11-03起註冊者managed apps適用逐app點數計費規則；Sandbox 1M模型tokens限代執行呼叫；台灣個案資格未核。

新增 [Make 新創](https://f.make.com/startup-program)：官方新創計畫開放申請，合作夥伴旗下新創最高享6個月及480,000點，自籌或投資人未入網者享3個月及240,000點，Country明列Taiwan；點數可用於AI代理與自動化；自備模型金鑰tokens自付；行銷頁與申請表條件差異及促銷期滿轉付費規則仍存，台灣資格標記為Unknown。

品質改善：`app.js` 與 `tests/filters.cjs` 修復依設定費用排序時，多筆紀錄為未知設定費（`setup_cost_usd: null`）時 comparator 運算 `Infinity - Infinity` 回傳 `NaN` 違反嚴格弱排序規範之缺陷，確保 null 比較回傳 0 且數值排序確定性；增補單元測試實證通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`aws-nonprofit-techsoup-budget-tiers` 台北11/9重新追查[TechSoup台灣](https://www.techsoup-taiwan.org.tw/)商品目錄與AWS抵用額級距。

2026-11-08 10:15–10:50 本輪：起始861筆；局部複核 `cognee-free-memory-token-grant-conflict-watch`、`krater-student-fifteen-twenty-discount-conflict-watch`、`stackone-starter-monthly-thousand-credit-terms-conflict`、`windsurf-student-discount-current-entry-watch`、`replit-student-core-half-price-edu-verification-watch`、`pydantic-ai-gateway-team-growth-once-ten-credit`、`redis-startups-current-entry-redirect-watch`、`taiwan-sme-ai-innovation-guidance`、`zed-delta-shared-fourteen-day-trial`、`upstage-aws-institution-2027`、`google-aicore-developer-preview`、`vercel-startups-flex-commit-2026`、`physical-intelligence-pi-api-beta`、`google-express-new-user-ninety-days`、`openai-researcher-access-thousand-year`、`parallel-monthly-five-card-allowance`、`linkup-professional-monthly-twenty-refill` 共17筆；新增機會 `lumenfall-signup-one-dollar-no-card-media-api`、`zenml-pro-starter-fourteen-day-no-card-business-trial` 共2筆，政策及線索各0筆；既有未完成844筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[Cognee Cloud Free](https://www.cognee.ai/pricing)：首個工作區免卡在線，但額度衝突仍未解：定價頁標示 1M tokens，帳務文件標示 10M tokens，不保證每月重置；超出免費餘額需儲值，額外工作區 US$5/月；台灣可用度未核。

[Krater 學生折扣](https://krater.ai/students)：官方學生頁仍同時刊登 15% 與 20% 折扣，官方衝突未解；一般 Pro 為 US$20/月（1,500點），無免費試用；學生頁宣稱免學籍驗證，但結帳套用折扣與台灣付款未核。

[StackOne Starter](https://www.stackone.com/pricing/)：Starter 免費免卡在線；定價表列每席每月 1,000 credits（失敗呼叫不計費），但正式服務契約列每 Starter 帳戶每月 1,000 Action Calls（失敗呼叫亦計費）且超額每次 US$0.003，計量與超額衝突仍存；台灣帳戶未測。

[Windsurf 學生方案](https://windsurf.com/student-terms-and-conditions)：2025-01-15 舊版學生條款在線，要求認可高等教育學籍與付款資料；現行品牌與定價頁已重導至 Devin，未列出學生優惠價與申請入口；維持未核實觀察線索。

[Replit 學生 Core](https://replit.com/edu/students)：官方學生頁 hero 仍刊登 50% off Core with .edu email；但本輪學生 pricing 區塊未載出，未能重現先前 US$10 標價；一般 Core 為 US$20/月，台灣 .edu.tw 與學生 checkout 待核。

[Pydantic AI Gateway](https://pydantic.dev/articles/ai-gateway-starter-credit)：官方公告新升級 Team/Growth 組織贈一次 US$10 模型額度在線；最低門檻需付費 Team（US$49/月），非 Personal 免費戶贈額，亦非每月補充；台灣付款與資格未核。

[Redis for Startups](https://redis.io/startups/)：2026-04 官方案例仍提及新創計畫提供 generous credit allocation，但現行 /startups/ 仍重導至首頁，未取得公開申請表、額度數字與資格；台灣資格未知。

[中小微企業 AI 創新應用輔導](https://www.sme.gov.tw/article-tw-2877-13891)：重大更新：經查 115 年度正式申請須知，一般輔導申請已於 115 年 4 月 30 日 17:00 截止，既有獲推薦案輔導執行至 11 月 13 日；總覽頁在線不代表受理收件，狀態更正為 applications_closed，停止定期複核。

[Zed Pro 試用](https://zed.dev/pricing)：14 天免卡試用在線，包含 US$5 額度（僅限 GPT-6 Luna）且與 Delta 共池；用盡或期滿自動回退 Free，非每月補充；台灣可用度未核。

[Upstage 機構計畫](https://www.upstage.ai/events/ai-initiative-2026-en)：大專院校、附設醫院及 NPO/NGO 免費申請 Solar Pro 4 與 Document Parse 在線，核准後可用至 2027/3/31；舊教育手冊仍標 2026/3/31 之矛盾未解；台灣機構適用性未知。

[Google AICore 預覽](https://developers.google.com/ml-kit/genai/aicore-dev-preview)：開發者加入測試群組於支援 Android 裝置本機測試 Gemini Nano 在線，免伺服器呼叫費；僅限本機開發評估，禁止商用生產環境；台灣可用度未核。

[Vercel 新創 Flex Commit](https://vercel.com/startups/credits)：合格新創最高 US$30,000 一年 Flex Commit 在線，含 v0 與 AI Gateway；Gateway 受總額及每月 50% 子限額約束，需有效付款方式，超額按標準價計費；台灣資格未核。

[Physical Intelligence Pi API](https://www.pi.website/blog/api-beta)：機器人模型 Pi API 候補名單在線；僅少數企業 early access，公開定價與免費額度未公布；維持觀察線索。

[Google Cloud Express](https://cloud.google.com/resources/cloud-express-faqs)：全新 Google Cloud 用戶以個人 @gmail.com 享最高 90 天免卡試用在線；受個別模型配額限制，非 US$300 試用；啟用 billing 即轉依量付費；商業用途與個資處理限制仍存。

[OpenAI 研究者計畫](https://help.openai.com/en/articles/10139500-researcher-access-program-faq)：最高 US$1,000 API 額度（核發後 1 年有效）在線，每季審查；移除先前舊紀錄之 US$5 卡片保留額肯定敘述；Taiwan 在 API 支援清單，需機構與研究提案審核；Taiwan 標記為 Yes。

[Parallel](https://parallel.ai/pricing)：綁卡合格組織每月發放 US$5 在線，月末失效，一卡限一組織；超額自動按用量扣款，非免卡；台灣帳單接受性未核。

[Linkup](https://docs.linkup.so/pages/documentation/platform/pricing)：工作信箱註冊贈 US$20 在線，合格帳戶每月補回 US$20（非加發）；文件美元與條款歐元標示矛盾未解，免卡與月補資格未核。

新增 [Lumenfall](https://lumenfall.ai/pricing)：官方提供免卡一次 US$1 影像／影片 API 歡迎額度，無平台月費，預付餘額不足回傳 402；免費功能提交之內容授權平台用於訓練與分享；免費額度通常 90 天有效但個別期限未定；台灣可用度未核。

新增 [ZenML Pro Starter](https://www.zenml.io/pricing)：官方為商務／專業用途提供 14 天免卡完整試用，包含 1 個 AI agent、1 個 ML project 及不限席次；期滿繼續使用月費 US$39，BYOK 模型與雲端基礎設施費用由使用者自負；限 18 歲以上商務用戶，台灣資格未核。

品質改善：`tests/validate.py` 增補資料狀態（`status`）白名單斷言（校驗涵蓋 `STATUS_LABELS` 既有 34 項列舉值及 null），修復 `taiwan-sme-ai-innovation-guidance` 等案過期後若寫入非正規狀態字串穿透至前端導致回退無警示「狀態待釐清」且脫離過期過濾器之架構盲區；`tests/filters.cjs` 增補全數合法狀態非 fallback 中文標籤之單元測試斷言，以實證覆蓋通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`aws-nonprofit-techsoup-budget-tiers` 台北11/9重新追查[TechSoup台灣](https://www.techsoup-taiwan.org.tw/)商品目錄與AWS抵用額級距。

2026-11-08 09:05–09:20 本輪：起始860筆；局部複核 `reflection-beam-beta-reset-conflict`、`nscale-signup-five-current-docs-conflict`、`memobase-free-credit-operation-conflict`、`arcade-free-monthly-two-k-tools-auto-upgrade-risk`、`together-150-unresolved`、`sloyd-guest-daily-plus-separated-pools`、`yotta-rudra-terms-amount-pending`、`inngest-free-monthly-fifty-k-executions`、`trigger-dev-free-monthly-five-compute`、`google-workspace-nonprofit-free-ai`、`google-ai-educator-series-taiwan`、`databricks-free-edition-noncommercial`、`microsoft-365-personal-taiwan-student-half-price`、`taiwan-commerce-single-store-ai-half-hundred-k`、`taiwan-moeai-manufacturing-tool-reimbursement-hundred-k` 共15筆；核心來源整筆追查失敗1筆：`aws-nonprofit-techsoup-budget-tiers`（TechSoup台灣商品與AWS資格頁回傳Incapsula驗證防護，未能核實台灣實際抵用金額與資格，依規則不刷新verified_at，記錄追查失敗時間與原因）；新增機會 `glama-free-mcp-inspector` 共1筆，政策及線索各0筆；既有未完成845筆。未登入、申請或付款。

[Reflection Beam Beta](https://reflection.ai/legal/beta-pricing-information)：免費公開beta在線，耗盡後回傳429拒絕請求不自動轉付費；重置衝突未解：法律頁稱按帳戶於美西午夜（Pacific）重置且不結轉，開發文件稱按組織跨專案及API keys共池於00:00 UTC重置；公開頁未列固定日額；商用條款（2026-10-05）允許開發商用應用，但免費／折扣服務內容授權用於訓練及改善模型；台灣可用性未核。

[Nscale Serverless](https://www.nscale.com/blog/introducing-nscale-serverless-inference-scalable-ai-without-infrastructure-hassles)：US$5新戶贈額仍無法確認有效；2025-04-02舊公告稱每位新戶可領US$5且之後才需加卡，現行overview卻要求先儲值至少US$5且quickstart僅稱早期用戶可能符合促銷；現行服務為預付制，Stripe購買額度，可自設低餘額自動加值；維持未核實。

[Memobase Free](https://memobase.ai/)：免費方案與vault流程在線，但額度衝突仍未解：首頁標示每月500 credits（store 10點、search 1點、forget免費），服務條款仍列每月50 operations；兩者指向每月1日重置但未標時區；免費方案明示US$0但未明文免綁卡，耗盡處置未公布；台灣帳戶與付款未知。

[Arcade Free](https://www.arcade.dev/pricing)：免信用卡、零平台費每月2,000次代理工具呼叫在線，非模型tokens；2026-11-07更新部署文件確認免卡Free tier；但條款仍載明超額將通知後自動升級下一級Team（US$25/月＋每呼叫US$0.01），免卡帳戶超額是否硬停或要求補款未定；第三方工具授權另計。

[Together US$150 贈額](https://www.together.ai/get-credits)：重大更新：原活動頁已明確標示 Promotion expired，註記僅限活動期間領取且已無領取表單；移出可領取機會，狀態變更為 expired，台灣標記為 No；一般付費平台需保留有效卡，預付餘額歸零暫停API，首次購買詳細文檔US$15與客服US$5衝突未解。

[Sloyd Free](https://www.sloyd.ai/pricing)：Guest免卡每日1次AI 3D生成在線，匯出限社群模型；Plus（US$15/月或年付US$150，50月點）與Pro（US$50/月，350月點）月點不結轉；重要核實：官方Answers（2026-10-21）明確區分Guest自產模型僅個人用途、免費社群模型依CC BY 4.0可署名商用，但通用條款§6仍泛稱可商用，且付費商用列印Answers稱免版稅而條款稱須另洽，授權衝突未解。

[Yotta Rudra 新創](https://yotta.com/rudra/apply-now.html)：重大更正：Rudra新創計畫嵌入之官方[Zoho申請表](https://survey.zohopublic.in/zs/3oCUv2)正式標示「Registrations Paused：Due to the high volume of applications received, we have temporarily paused new applications」，因申請量大全面暫停新收件；方案表仍列跨階段累積最高US$100K，Ignite分期合計US$20K與總額US$25K矛盾仍存；狀態更新為paused。

[Inngest Free](https://www.inngest.com/pricing)：免卡Free方案每月50,000次執行、500,000 events及10,000 scores在線；function run與每個step各計1次（5步工作流共6次）；額滿暫停無超額扣款；現行文件未再載明10/20修正日期，保留實際run+step計量規則；台灣個案資格未核。

[Trigger.dev Free](https://trigger.dev/pricing)：免卡每月US$5工作流程運算額度在線；[計費文件](https://trigger.dev/docs/billing-limits)確認超額硬停（不自動計費），提供手動啟用用量上限；最多5並行，工作階段上限20分鐘；需已驗證帳戶；台灣帳戶未測。

[Google Workspace 非營利](https://support.google.com/nonprofits/answer/16345471?hl=en)：合資格非營利組織免費Workspace在線，內含Gemini及NotebookLM標準功能；須經Goodstack／TechSoup驗證；[支援名單](https://support.google.com/nonprofits/answer/3215869?hl=zh-Hant&co=GENIE.CountryCode%3DTW)確認台灣在支援區域且台灣非營利組織可申請；Taiwan標記為Yes。

[Google AI 教師系列](https://edu.google.com/intl/ALL_tw/learning-center/google-ai-educator-series/)：繁體中文台灣官方頁在線，提供免費自學AI教育系列研習課程與測驗徽章；涵蓋Gemini於教案設計與教學應用；全體教師與大眾登入Google帳戶即可研讀；Taiwan標記為Yes。

[Databricks Free Edition](https://docs.databricks.com/aws/en/getting-started/free-edition)：非商用Free Edition在線；[官方FAQ](https://docs.databricks.com/aws/en/getting-started/free-edition-limitations)明確載明僅限個人學習與測試，嚴格禁止production環境與任何商業用途；無SLA，算力按各雲端供應商用量另計；台灣可用度未核。

[Microsoft 365 台灣大專生](https://www.microsoft.com/zh-tw/microsoft-365/college-student-pricing)：台灣大專院校在學學生個人版五折（NT$1,095/年或NT$109/月）在線，內含Microsoft 365 Copilot應用；[條款](https://support.microsoft.com/en-us/microsoft-365-copilot/ai-credits-and-limits-for-microsoft-365-subscriptions)確認Copilot點數每月重置，需年驗學籍且為自動續訂付費訂閱；台灣本地學校核驗適用。

[台灣服務業單店AI導入補助](https://www.smebiz.org.tw/project-tenacity_shop.php)：商業發展署單店AI導入補助在線，補助上限五成／新臺幣10萬元；官方公告受理至2027-10-20或經費用罄止（資訊服務業者登錄截止不影響單店店家申請）；須先用滿3個月且營業額衰退或特定門檻；Taiwan標記為Yes。

[經濟部製造業AI工具補助](https://eii.nat.gov.tw/moeai-plus/notice)：經濟部AI輔導團製造業AI工具費補助（最高新臺幣10萬元）在線；製造業廠商經輔導團提供具體診斷建議後即可採購AI工具，無須等待全案診斷總結報告；全額補助核銷制；Taiwan標記為Yes。

[AWS 非營利抵用額](https://aws.amazon.com/government-education/nonprofits/nonprofit-credit-program/)：全球最高US$5,000額度在線；本輪首度查核到台灣科技濃湯目錄已列Amazon Web Services Credits for Smaller Nonprofits且行政費標示NT$3,155；但商品明細、AWS資格頁及FAQ遭Incapsula安全驗證攔截，未取得台灣本地完整抵用額度與預算級距，依規則維持未核實追蹤，保留既有verified_at，記錄本輪追查失敗。

新增 [Glama MCP Inspector](https://glama.ai/mcp/inspector)：官方提供免費線上遠端 Model Context Protocol（MCP）測試工具，免安裝、免登入即可檢視伺服器之tools、resources、prompts與JSON-RPC流量，並測試Streamable HTTP／SSE端點；AI對話需登入且消耗tokens，MCP代管另按機器時數與流量計費；不提供免費代管或免費推論額度；台灣可用性未知。

品質改善：`tests/validate.py` 增補複核週期（`review_cadence`）合法列舉斷言（限定 `daily`、`monthly`、`weekly`、`biweekly`、`on_new_signal`、`monthly_or_new_signal`、`event` 或 `null`），修復 schema 未限制週期字串導致未來潛在拼寫錯誤穿透至前端回退未格式化英文之架構盲區；`tests/filters.cjs` 增補 `weekly`（每週）與 `on_new_signal`（有新線索時）卡片詳情中文格式化斷言；以單元測試實證覆蓋通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`yotta-rudra-terms-amount-pending` 台北11/20前查[Zoho表單](https://survey.zohopublic.in/zs/3oCUv2)與[官網](https://yotta.com/rudra/apply-now.html)確認新創申請何時重啟。

2026-11-08 08:10–08:40 本輪：起始859筆；局部複核 `gmi-a16z-first25-two-k-spend-five-k-credit`、`langwatch-developer-free-fiftyk-terms-conflict`、`respan-free-hundred-k-logs-terms-conflict`、`anthropic-external-researcher-access-safety`、`github-copilot-student`、`udio-free-music-credits`、`raycast-student-pro-discount`、`roboflow-core-free-tier`、`twai-aiga-startup-investment`、`kling-ai-free-generation-watchlist`、`duck-ai-free-chat`、`adobe-express-nonprofit-annual-250-generative`、`hetzner-inference-experimental-free`、`chatgpt-dots`、`crawl4ai-cloud-monthly-thousand-no-card`、`miro-education-monthly-team-hundred-ai` 共16筆；新增機會 `taiwan-ai-academy-citizen-ai-literacy` 共1筆，政策及線索各0筆；既有未完成843筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[GMI × a16z](https://www.gmicloud.ai/a16z)：頁面仍列前25家a16z投資公司、首月消費US$2,000解鎖US$5,000推論額度（有效90日）及dedicated endpoints八折；剩餘名額與起算日未列；[Console條款](https://www.gmicloud.ai/en/legal/console-terms-of-service)§6.4(b)確認退款時扣除免費額度價值，Exhibit A嚴禁未經許可轉售或向第三方提供GPU；台灣可用度未核。

[LangWatch Developer](https://langwatch.ai/pricing)：Developer €0 forever宣稱在線（每月50k events、2 users、14天可讀、49天儲存、Instant Evals $1預算）；但[服務條款](https://langwatch.ai/legal/terms-conditions)§3.2載明14日試用後停用，且§14.1(6)禁止自動化工具或腳本存取，定價宣稱與條款衝突仍未解決；台灣個案資格未核。

[Respan Free](https://www.respan.ai/pricing)：重大更正：Free方案免信用卡提供100,000 logs、1,000 scores及10 prompts（更正先前5 prompts紀錄）；[2026-10-27新版條款](https://www.respan.ai/legal/terms-of-use)明訂購買之Gateway額度12個月有效；官方10/23比較文稱logs按月計算，但scores重置邊界未標且定價主表未寫；條款§2/§3自動化及商業限制衝突仍未解；台灣可用性未知。

[Anthropic 外部研究者](https://support.claude.com/en/articles/9125743-what-is-the-external-researcher-access-program)：高優先AI安全與對齊研究核准者US$1,000 API額度在線，每月第一個週一審查；[申請表](https://forms.gle/pZYC8f6qYqSKvRWn9)實測完整加載，確認需機構信箱、研究計畫及US-tax身分等；通用促銷額度預設一年有效，個別grant效期以通知為準；Taiwan列於API支援地區。

[GitHub Copilot Student](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-students)：GitHub Education學生免費Copilot在線，包含不限次程式碼補全；每月資格重評；官方確認學生方案含AI Credits但具體月額未公開（非付費Pro之1,500點）；排除部分付費專屬模型；台灣大專校院學生可依學校證明申請。

[Udio 免費生成](https://www.udio.com/pricing)：免卡每日10 credits及額外每月100 credits在線；2025-10-29 UMG合作後全平台音訊/視訊/stems下載功能持續停用；[條款](https://www.udio.com/terms-of-service)§5.2明訂免費生成嚴禁商用、廣告或變現；FAQ稱使用者擁有輸出與現行ToS禁止下載之公開矛盾仍存。

[Raycast 學生方案](https://www.raycast.com/faq)：學生Pro五折（標價US$10/月或US$96/年）在線，每月500 AI credits；[Typeform申請表](https://raycastapp.typeform.com/to/hSoIknLJ)實測開放收件中；[計費手冊](https://manual.raycast.com/billing)確認折扣碼單次使用，訂閱自動續費，排除Pro+/Max方案；台灣未列入服務排除地區，但學校核驗與本地付款未核。

[Roboflow Core Free](https://roboflow.com/pricing)：免卡每月10共享credits在線；RF-DETR Nano每千張0.125點（全額推論約8萬張）；重大釐清：免費與預付額度用盡後多項核心功能直接停止（非自動扣款），付費Flex超額計費為分開機制；新工作區訓練授權可手動關閉；台灣可用度未核。

[台智雲 AIGA](https://www.twcloud.ai/aiga-program/)：優先在臺註冊8年內AI新創之投資與算力回購計畫在線；申請連結目前需Google帳戶登入，未確認當期收件時程；六個月加速、算力回購額度綁定，投資/股權/算力額度未公開，不列免費補助。

[Kling AI](https://app.klingai.com/global/membership/membership-plan)：重大更正：會員頁渲染確認Basic $0/月之包含月額與日額欄位均為橫線（無包含贈額）；[點數規則](https://kling.ai/docs/point-policy)釐清登入贈額僅限特定促銷且限訂閱者，$1=66點為購買比例非每日贈送；免費生成不授權商用且帶浮水印；宣傳Kling 4.0/3.0不代表Basic可用；維持觀察線索。

[Duck.ai](https://duckduckgo.com/duckduckgo-help-pages/duckai/chat-models)：重大更新：免費可用模型清單更新為Claude Haiku 5.5（取代4.5 Haiku）、Mistral Small 4、GPT-6 Luna、GPT-5.4 mini、gpt-oss-120b及Gemma 4 31B；免帳號、匿名、每日限額在線；釐清預設不儲存之例外（主動反饋、加密同步與安全/法律保留）；台灣網路實用未核。

[Adobe Express 非營利](https://www.adobe.com/tw/nonprofits.html)：一年免費最多50份Express Premium授權與每月250生成點在線，免卡不結轉；各員工須經GoodStack核驗；實際申請流程導向GoodStack驗證平台；台灣非營利組織適用性與審核通過率未核。

[Hetzner Inference](https://docs.hetzner.com/general/company-and-policy/experiments/inference/)：實驗性免費API在線，提供Qwen3.6/3.8等開源模型；每金鑰速率限制為60秒10請求、400萬輸入及10萬輸出tokens，超限回429；不保證SLA；需已驗證之Hetzner帳戶；台灣新戶開戶審核與綁卡條件未核。

[ChatGPT Dots](https://learn.chatgpt.com/docs/dots)：重大更新：模型清單新增支援GPT-6.1 Terra；納入Edu與Healthcare workspace（排除UAE居住地）；Enterprise管理員預覽開放至11/18，11/18起預設開啟並正式啟用付費計費，委派深度工作另收費；Pro/Business對話不計ChatGPT額度，深度Work/Codex依各自額度；Taiwan在支援清單。

[Crawl4AI Cloud](https://crawl4ai.com/)：Free方案免卡每月1,000 credits、訪客20 credits在線；[API端點](https://api.crawl4ai.com/v1/prices)確認每10秒5次請求（10 RPM）、並行2、最多3把API keys；scrape每次0.5點、search每次1點；免費點數不結轉、用盡回402；伺服器區域限美歐新，台灣可用度未核。

[Miro Education](https://miro.com/education-whiteboard/)：學生10人團隊（2年有效）與教師100人團隊在線，各團隊每月共用100 Miro AI credits（每曆月1日重置）；新增限制：每成員最多5次Flow runs及有限Sidekicks；需認可學校證明且無既有付費團隊；審核最長10工作日；個人申請主文與條款矛盾仍存。

新增 [台灣人工智慧學校公民AI素養課程](https://aiforeveryone.aiacademy.tw/courses)：台灣人工智慧學校提供免費10小時線上AI素養課程，採Google Classroom自主學習，觀看影片並完成測驗可獲完課證書；另可[免費索取](https://docs.google.com/forms/d/e/1FAIpQLSfZgF2QsIj8wRZRKPaDuj8Cn2u_mVTasMvhJoFmNbtslTQ8yg/viewform)使用者與開發者AI素養教材；官方[報名表](https://docs.google.com/forms/d/e/1FAIpQLScENPBi2ndKVNuebORoIIg8NCEvvBcbjAVfI5F_UXkgqDmtnQ/viewform)明列台灣各地區選項，免信用卡；非API或算力額度，教材轉售與商業改作未核；Taiwan標記為Yes。

品質改善：`app.js` 與 `tests/filters.cjs` 修復卡片展開詳情中，若案例之 `review_cadence` 為 null 時，預設標籤因回退至泛用未核實函數而向讀者展示誤導性「未核實；[日期]」或「未核實；未安排特定複核日期」的介面缺陷；精確區分已有排定日期者顯示為「定期輪替；[日期]」，未排定者顯示為「未指定週期；未安排特定複核日期」；以單元測試實證覆蓋通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`chatgpt-dots` 台北11/18 Enterprise預覽截止前查[Docs](https://learn.chatgpt.com/docs/dots)確認Workspace預設開啟與正式收費上線現況。

2026-11-08 07:05–07:25 本輪：起始857筆；局部複核 `datacamp-free-access-week-november-2026`、`autoclaw-halloween-40m-expiry-conflict-watch`、`autoclaw-weekly-perk-november-nine-hundred-million-tokens`、`aocai-working-free-ai-courses-2026`、`taipei-youth-ai-subscription-subsidy-2026`、`fujisoft-workforce-ai-security-poc`、`deepgram-startup-project-credit`、`anyscale-startup-twenty-k-byoc`、`agenta-hobby-daily-seventy-five-ten-days`、`google-gemini-academy-taiwan-educators-workshop-watch`、`zed-student-hard-ten-monthly`、`confident-ai-free-five-weekly-runs-gbmonth`、`nchc-teaching-free-compute` 共13筆；新增機會 `ragie-developer-free-thousand-pages-retrievals`、`neo4j-auradb-free-tier-200k-nodes` 共2筆，政策及線索各0筆；既有未完成844筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[DataCamp 免費週](https://www.datacamp.com/campaign/free-access-week-november-2026)：免費週活動開放至美東11/8 23:59（台北11/9 12:59）；免信用卡無限存取750+門課程、專案與證照；排除AI tutor、Microsoft Fabric及Google合作課程；期滿未付費自動回退，不產生自動扣款。

[AutoClaw 萬聖節](https://autoclaw.z.ai/blog/news/M11W1/)：活動刊載至今日23:59截止，但同頁11/1與11/8到期矛盾未解；11/4生效之[服務條款](https://autoclaw.z.ai/privacy/md2html/?favicon=autoglm&md=autoclaw_agreement)§VI.2重要限制：免費及未另行協議之使用與生成內容明確限於「非商業之個人科研、學習」用途；§XI列明制裁排除地區（台灣未在排除名單，亦未列肯定支援）。

[AutoClaw 週福利](https://autoclaw.z.ai/blog/news/M11W2/)：11/9 00:00至11/15 23:59（UTC+8）每帳戶登入贈送1億Tokens（價值10,000點）排定開跑；重核釐清官方公告未載明免卡或無帳單國籍限制，移除先前未獲官方支持之免卡保證；超額不自動續約。

[經濟部服務業在職AI課程](https://serv.gcis.nat.gov.tw/AOCAI/)：台北11/11班受理至2026-11-09 23:59截止，[報名表](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)應繳金額確認為NT$0；內文100人與表格上限300人名額口徑差異仍存；出席率須達80%並完成前後測驗。

[臺北青年AI訂閱補助](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)：最後送達期限倒數：須於2026-11-10前書面送達青年局；修正先前摘要中字符損毀，重核確認一般青年最高補助NT$4,000、低／中低收入戶NT$8,000；所查青年局官網未見經費用罄停收公告。

[富士Soft Workforce AI Security](https://www.fsi.co.jp/company/news/20261019.html)：30日企業AI治理免費PoC（先到前10家）公告在線；[原始HTML申請表](https://sem-inq.fsi.co.jp/public/application/add/7999)確認仍保留「無料PoCを申し込む」選項；剩餘名額與台灣企業個案資格未公開，正式本番導入費用未公布。

[Deepgram 新創](https://deepgram.com/startup-program)：直接申請起始核給US$1,000額度、最高可至US$100,000（非一律保證US$10,000），有效12個月；超額或餘額不足自動觸發PAYG信用卡加值（每次最低US$10），專屬條款已重導至[startup-program-terms-of-service](https://deepgram.com/startup-program/terms-of-service)。

[Anyscale 新創](https://www.anyscale.com/startup)：最高US$20,000平台額度在線，支援BYOC雲端整合；經由官方投資夥伴或直接申請，額度有效期限依個別核定合約為準；台灣企業資格未列明。

[Agenta Hobby](https://agenta.ai/pricing)：新組織贈500點及每月最多10日、每日75點在線；[計費文件](https://agenta.ai/docs/administration/billing/plans-and-credits)釐清Hobby僅適用雲端開發測試，開源Self-hosted版本不受限；超額請求遭拒，不自動扣款。

[台灣 Gemini 學院教育研習](https://growonairtw.withgoogle.com/events/gemini-academy-tw)：重要更正：瀏覽器完整載入確認首頁與FAQ刊登之活動為2025-08-12及2025-10-18兩堂歷史直播研習，修正舊紀錄將靜態頁面錯誤模板誤判為private失敗之結論；當前或新梯次報名現況維持未核實觀察線索。

[Zed 學生方案](https://zed.dev/education)：重要補正：缺失之status補齊為conditional；官方教育方案適用全球認可大專院校（含國際學生），Taiwan標記為Yes但限合格學校本人核驗；每月US$10硬上限、一年免費在線；需有效大專院校信箱或swot證明，不強制GitHub Student Pack或字面.edu後綴。

[Confident AI DeepEval](https://www.confident-ai.com/pricing)：免卡Free方案在線，提供每週5次測試執行、1 GB-month資料追蹤與1席；[條款](https://www.confident-ai.com/terms)確認超額拒絕請求，不產生未經同意之自動收費。

[國網中心教學免費算力](https://iservice.nchc.org.tw/nchc_service/nchc_service_qa.php?target=57)：國內大專教師申請教學免費算力機制在線；因HFS一般學術磁碟儲存費為每日每GB NT$0.035且教學grant是否全額涵蓋未公布，每月費用謹慎補正為null，避免宣稱全額免費；台灣教師專用。

新增 [Ragie Developer](https://www.ragie.ai/pricing)：官方提供Developer免費方案，包含最多1,000次檢索、1,000頁文件處理、10 GB影音串流及10小時影音處理，首個Embedded Connector免費；[條款](https://www.ragie.ai/terms-of-service)禁止自動化與商業盈利用途，免卡與台灣資格未核。

新增 [Neo4j AuraDB Free](https://neo4j.com/pricing/)：官方提供免信用卡AuraDB Free永久圖資料庫方案，限單一instance與單一database，上限20萬節點、40萬關係與1 GB儲存；內含按需備份與最多2GB Graph Analytics；連續72小時無活動自動暫停，暫停超過30天自動刪除；[IP文件](https://neo4j.com/docs/aura/security/ip-addresses/)顯示Free支援多個GCP區域，不支持僅限us-central1；台灣帳戶個案資格未核。

品質改善：`app.js` 與 `tests/filters.cjs` 補齊已截止/過期（`CLOSED_STATUSES`）且未安排下次複核日期之案件，卡片詳情「下次複核」從誤導性預設文字「每月輪替；未核實」修正為精確語意「已停止定期複核；有新線索時追蹤」；對於未安排特定日期的有效方案亦精確標明「未安排特定複核日期」；消除對已終止案例產生反覆失效查核之使用者誤解，以單元測試實證覆蓋通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`datacamp-free-access-week-november-2026` 台北11/9 12:59（美東11/8 23:59）截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況。

2026-11-08 06:05–06:25 本輪：起始855筆；局部複核 `granola-students`、`manus-startups-redirect-current-unverified`、`neo4j-startup-aura-twentyk-application-unavailable`、`mango-inference-community`、`digitalocean-secret-ai-startup-100-2026`、`snowflake-ai-trial-2026`、`minimax-design-h3-new-user-watch`、`x-api-xai-spend-credit-rewards`、`daytona-trial-200-compute`、`crusoe-serverless-intro-five`、`lightning-starter-five-plus-card`、`descript-education-nonprofit-hobbyist-discount`、`hedra-free-credit-unverified`、`posthog-ai-observability-free-monthly-hundred-k-events`、`taiwan-moe-moocs-eighteen-free-ai-courses` 共15筆；新增機會 `hanzo-startup-tier-one-vc-up-to-hundred-fifty-k`、`perch-starter-free-monthly-twenty-k-hosted-cli` 共2筆，政策及線索各0筆；既有未完成840筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[教育部磨課師](https://moocs.moe.edu.tw/moocs/#/course/theme/20)：重大修復：平臺憑證異常已排除，平台正常加載；比對確認首波推薦18門AI課程於「未來人才AI能力圖像」主題專區全數開放報名與修讀（選課與開課期間均載為無限期）；涵蓋機器學習、深度學習、AIoT、醫學AI與生成式AI；全體民眾登入後可免費報名，修畢可獲修課證明；由觀察線索升格為S級條件式機會。

[PostHog AI Observability](https://posthog.com/ai-observability/pricing)：重大釐清：免卡Free方案超出每月10萬events限額時直接停止接收（硬停），保證不產生意外費用；若綁卡啟用用量計費可自設帳單上限，超出上限之事件直接丟棄且不計費；每月10萬額度與evaluations功能共用。

[Daytona](https://www.daytona.io/pricing)：US$200免卡運算額度在線，按秒計費；[計費文檔](https://www.daytona.io/docs/en/billing.md)明確載明Free credit balance不可用於GPU沙箱；歷史v2分鐘計費文件已404失效；停止或暫停之沙箱持續收取磁碟儲存費。

[Crusoe Serverless](https://docs.crusoecloud.com/serverless-inference/rate-limits)：US$5推論額度（免卡500k TPM / 30 RPM，綁卡2M TPM / 600 RPM）在線；開戶指南強制非預付卡矛盾仍存；免卡不等於免金鑰，呼叫仍需Intelligence API key；通用條款更新至[v1.11](https://legal.crusoe.ai/)（2026-11-05生效）。

[Lightning AI](https://lightning.ai/pricing)：註冊5點+綁卡25點（12個月有效）在線；行銷GPU估計時數下調為約50小時；定價表Free 50GB持久儲存與[計費文檔](https://lightning.ai/docs/platform/overview/faq/billing)總容量200GB僅前10GB免費之衝突仍存。

[Descript 教育/非營利](https://help.descript.com/billing-payments-plans/nfp-edu)：EDU/NFP Hobbyist折扣在線（月繳每席US$12、年繳每席US$8）；每Editor每月600媒體分鐘與400 AI點數，Drive共用且不結轉；每Drive最多3名Editor；申請前須加付款方式。

[Hedra AI](https://www.hedra.com/pricing)：公開定價維持API預付與Studio付費方案，未明文列出影片生成免費額度；[v3計費文檔](https://www.hedra.com/docs/pages/developer/v3/billing.md)確認API錢包為預付美元且與Studio點數分池；維持觀察線索。

[Granola 學生](https://www.granola.ai/students)：美英加在學學生一年Business在線，免信用卡；[Tally申請表](https://tally.so/r/D4KbQ5)實測開放收件中（isClosed=false），必填指定三國學生信箱及學生證上傳，支援推薦5位同校好友；台灣本地大學不符資格。

[Manus 新創](https://manus.im/startups)：公開申請持續暫停，現僅限合作VC推薦六個月Team方案（最多20席，官方宣稱價值US$4,800）；成立未滿五年且融資50萬至5,000萬美元；正文合作方非必要與橫幅衝突未解。

[Neo4j 新創](https://neo4j.com/startup-program/apply/)：最高US$20,000 AuraDB額度；靜態Markdown顯示不可用，但瀏覽器實測Marketo申請表完整加載、Country含Taiwan且Submit按鈕可用；限Pre-seed至Series B。

[Mango Inference](https://www.mangoboost.io/platform/mango-inference)：新戶註冊贈US$10與全模型七折（至Nov 11止，未標年份）在線；[條款](https://inference.mangoboost.io/terms-of-service)排除中港等國，台灣未列入排除名單；社群US$100 matching未獲官方證實。

[DigitalOcean × Secret](https://www.digitalocean.com/legal/promotional-offer-100-in-digitalocean-credits-for-50-ai-startups-on-secret)：限Secret付費會員前50家AI新創贈送US$100 DO額度，有效至2027-01-17；[Secret頁面](https://www.joinsecret.com/digital-ocean)首頁標題宣稱$5,000/年及元數據2028-12-31與官方條款衝突仍存。

[Snowflake AI Trial](https://docs.snowflake.com/en/user-guide/admin-trial-account)：30日US$400試用在線；初始信箱不需卡，啟用AI必須加卡；[CoCo模式](https://signup.snowflake.com/cortex-code)提供前30日$40推論+$360平台額度，兩入口Country均列Taiwan。

[MiniMax Design](https://www.minimax.io/audio)：新戶註冊贈2,000點（發放起3天有效）與3次H3影片生成試用在線；會員頁所連付費條款仍呈現開放平台協議之衝突未解。

[X API 回饋](https://docs.x.com/x-api/getting-started/free-credits.md)：首次存卡購點等額回饋最高US$250在線；xAI回饋需單一週期購買X API額度達US$200/500/1000分別解鎖US$50/150/350 xAI額度，非免費額度。

新增 [Hanzo 新創](https://www.hanzo.ai/startups)：官方新創計畫提供頂級VC（tier-1 VC）投資團隊申請最高US$150,000平台額度，週審制；表單涵蓋推論、代理、RAG、部署等用途；[條款](https://www.hanzo.ai/terms)確認超額按量計費，額度有效期與台灣企業核准未公開。

新增 [Perch Starter](https://www.perchai.app/docs/plans/starter)：官方提供免信用卡個人免費方案，每曆月贈送20,000 PT（最高US$20託管用量），UTC月初重置；適用Web、桌面與CLI，無直接API；[條款](https://www.perchai.app/terms)確認超額不會未經同意扣款；Starter Data Program預設開啟可手動關閉；Qwen 3.8 Max限時開放至美東11/20中午。

品質改善：`app.js` 與 `tests/filters.cjs` 增補複核週期（`review_cadence`）之繁體中文對照字典（`biweekly: '雙週輪替'`、`monthly_or_new_signal: '每月或有新線索時'`、`event: '特定活動事件追蹤'`），修復卡片詳情展開時「下次複核」向讀者直接曝露未格式化之英文或蛇形命名代碼的排版缺陷；以單元測試實證覆蓋通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`datacamp-free-access-week-november-2026` 台北11/9 12:59（美東11/8 23:59）截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況。

2026-11-08 05:05–05:25 本輪：起始852筆；局部複核 `autoclaw-halloween-40m-expiry-conflict-watch`、`stepfun-stepaudio3-music-gen-preview-nov8`、`tencent-tokenhub-free-trial`、`river-inference-25-credit`、`claude-scientists`、`coreweave-aria-limited-free`、`hume-startup-forty-million-twelve-months`、`sambacloud-rundown-first100-anniversary-credit-watch`、`codebuddy-monthly-activity-welcome-separated`、`firecrawl-startups-annual-double-credits`、`heygen-free-three-monthly-noncommercial-videos`、`notta-education-half-price-pro-business`、`rime-starter-fifty-model-pool`、`google-gemini-notebook-standard-free` 共14筆；核心來源整筆追查失敗2筆：`perplexity-watch`、`perplexity-education`（官方說明中心頁面回傳403阻擋，依規則不刷新verified_at，記錄追查失敗時間與原因）；新增機會 `inkeep-cloud-thirty-day-content-sandbox-demo`、`biel-business-fourteen-day-no-card-trial`、`biel-noncommercial-open-source-fivehundred-pages-twok-interactions` 共3筆，政策及線索各0筆；既有未完成838筆。未登入、申請或付款。

[StepFun Audio 3](https://platform.stepfun.ai/docs/en/guides/pricing/details.md)：重要更正：官方定價公告更新，music-preview與gen-preview限時免費預覽正式展延至台北時間2026-11-17 11:59:59，正式版付費上線順延至11/17 12:00:00，消弭原訂11/8截止預期；未公布固定免費總額，台灣身分認證與未儲值權限待核。

[AutoClaw 萬聖節](https://autoclaw.z.ai/blog/news/M11W1/)：活動刊載至今日23:59截止，但同頁11/1與11/8效期矛盾未解；11/9 00:00開跑每帳戶1億Tokens週福利[公告](https://autoclaw.z.ai/blog/news/M11W2/)已就緒。

[Tencent TokenHub](https://www.tencentcloud.com/act/pro/tokenhub)：新戶試用仍刊登每模型1M tokens，但官方文檔1年與促銷頁90天衝突仍存；每模型需US$10帳戶凍結且註冊需US$1預授權驗證；未啟用後付費用罄即停。

[River AI Inference](https://console.river.ai/)：US$25僅屬10/11歷史公告，現行公開註冊與條款無贈額保證，維持活動現況待核；[條款](https://console.river.ai/terms)§4.1保留內容最多2天與[文件](https://docs.river.ai/guides/inference-limits.md)不保留請求之衝突仍存。

[Claude 科學研究](https://support.claude.com/en/articles/16634237-claude-team-plan-for-scientists)：Standard免費／Premium US$15/席/月在線，12個月、1–25席且須PI核驗；免費席位亦須提供付款方式；[條款](https://www.anthropic.com/legal/team-plan-for-scientists-terms)確認台灣在支援區域，但台灣機構審核與台灣卡未測。

[CoreWeave ARIA](https://coreweave.com/forge-pricing/inference-agents)：限時免費承諾在線，未公布固定免費上限與截止日；僅限W&B雲端team project且需Smart features；台灣帳戶與個案合約未核。

[Hume 新創](https://www.hume.ai/startup-program)：核准贈40M voice credits有效12個月及期滿回Free再次從動態條款確認，但6個月收件期起算日未公布；台灣資格與對外商用授權未知。

[SambaCloud × Rundown](https://sambanova.ai/build-with-relentless-intelligence-rundown)：US$100／首100名舊活動頁與表單在線，但2026年名額剩餘與授額現況未獲官方證實；需付款方式，普通方案先購點要求是否豁免未知。

[CodeBuddy](https://www.codebuddy.ai/docs/zh/ide/Account/Subscription)：確認Free 100月點、首次登入250點迎新包（14天有效）與客戶端對話30日點為不同分池；日點通常次日入帳可疊加月額；狀態補正為active；Pro試用FAQ之US$96/月筆誤與定價表US$96/年衝突仍存。

[Firecrawl 新創](https://www.firecrawl.dev/startups)：年繳月額翻倍一年在線（Standard每月10萬變20萬點），須預付年費非免付費；先前募資額度邊界文字差異已消除；台灣核准與贈點結轉未核。

[HeyGen Free](https://www.heygen.com/pricing)：免卡每月最多3部一分鐘影片在線；[定價頁](https://www.heygen.com/pricing)確認帶浮水印；[條款](https://www.heygen.com/terms)嚴禁商用、廣告、客戶工作或變現；18歲以上且限一帳戶；台灣可用性未知。

[Notta 教育](https://support.notta.ai/hc/en-us/articles/17418832708251-How-to-apply-for-Notta-educational-discount)：11/2更新確認教育Pro年繳US$48.99、Business每席US$99.99/年或US$13.99/月；月額重置改以最初購買日計算；[定價頁](https://www.notta.ai/en/pricing)確認已內含每月1,000點Notta Brain點數（更正先前僅記載另購Brain之紀錄）；台灣學校與卡片未測。

[Rime Free](https://www.rime.ai/pricing)：每月US$50跨模型共用池在線，免卡不結轉；[10/29新條款](https://www.rime.ai/terms)§3.2明確禁止Free方案輸入Caller通話音訊與第三人個資，與首頁real calls行銷宣傳產生公開條款衝突；狀態由null更正為conditional。

[Gemini Notebook](https://support.google.com/gemininotebook/answer/16164461?hl=zh-Hant)：標準版免費及[支援名單](https://support.google.com/gemininotebook/answer/16164461?hl=zh-Hant)列有台灣在線；100本筆記本、每本50個來源；運算資源採5小時動態重置與週上限，FAQ保留每日50對話舊口徑。

[Perplexity](https://www.perplexity.ai/)：說明中心點數頁與定價頁受403及Cloudflare驗證阻擋，本次維持未成功核實記錄；保留既有verified_at，記錄本輪追查失敗。

新增 [Inkeep Cloud](https://docs.inkeep.com/cloud/faq)：官方提供通話後30天內容AI沙箱demo，免帳戶、免信用卡測試UI元件與chat service；不含完整平台dashboard、analytics或Slack assistant，pilot另議；台灣可用度未知。

新增 [Biel.ai Business 試用](https://biel.ai/pricing)：官方提供14天免信用卡Business功能試用，含API、MCP及進階模型；未明定試用配額，[條款](https://biel.ai/terms)§8確認標準試用期滿不自動建立付費訂閱；台灣支援未知。

新增 [Biel.ai 開源方案](https://biel.ai/open-source)：官方為非商業、OSI授權開源專案提供審核式免費帳戶，包含最多500索引頁與每月2,000次互動，須保留品牌標示；非一般新戶試用；台灣審核與卡片要求未核。

品質改善：`style.css` 補齊 `.status-conditional` 與 `.status-conditional::before` 樣式規則，修復前端儀表板超過 520 筆條件式方案（包含 `conditional`、`application_based` 與 `legacy_closed_new_path_conditional`）因缺少專屬 CSS 規則而回退無色預設文字之視覺盲區；`tests/filters.cjs` 增補 conditional 狀態類別與 CSS 樣式包含性單元測試斷言，以實證覆蓋通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`datacamp-free-access-week-november-2026` 台北11/9 12:59截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況。

2026-11-08 04:05–04:30 本輪：起始850筆，按實際時區有25筆到期；局部複核 `bazaarlink-taiwan-free-model-gateway`、`vast-startup-spend-match`、`sarvam-campus-tour-credits`、`claude-security-enterprise-two-month-credit`、`speechify-api-free-monthly-500k`、`amazon-ara-multilingual-contextual-ai-fall-2026`、`kiro-startup-pro-plus-2026`、`deepgram-flux-tts-bonus`、`granola-startups`、`openai-nonprofit-standard-discount`、`linear-startup-business-2026`、`meshy-free-monthly-hundred-download-conflict`、`replicate-try-free`、`fireflies-free-auto-join-storage-credit-conflicts`、`laminar-free-gb-hard-cap-signals-conflict`、`adobe-express-k12-free-standard-250` 共16筆；新增機會 `netlify-free-monthly-three-hundred-shared-ai-gateway`、`vespa-cloud-once-three-hundred-no-card-trial` 共2筆，政策及線索各0筆；既有未完成834筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[BazaarLink](https://bazaarlink.ai/free)免費模型層（Qwen3.7 Flash、Glyph Cluster、Beam Free等）免卡在線，無餘額每日60 units（10 RPM），有餘額每日120 units（20 RPM）；僅在API key啟用paid fallback且有足夠餘額時才會轉付費；全帳戶限2並行；[條款](https://bazaarlink.ai/terms)確認中華民國法律適用與苗栗登記。

[Vast 新創](https://vast.ai/startup)維持審核式付費消費等額匹配，非無消費免費額度；[計費文件](https://docs.vast.ai/guides/reference/billing.md)釐清實例停止（stopped）持續計儲存費，但離線（offline）不收GPU或儲存費；2018舊條款全部不退與現行文件信用卡可退衝突仍存。

[Sarvam 校園巡迴](https://www.sarvam.ai/sarvam-campus)53校卡片DOM即時狀態顯示18校已完成、35校暫定，所有已完成校園報名按鈕均已停用，目前無開放報名場次；[Kanpur活動頁](https://hack2skill.com/event/sarvamcampusiitkanpur)已結束且報名關閉，但場地卡仍標示OPEN之矛盾未解；限指定印度在校生，非台灣一般學生福利。

[Claude Security](https://support.claude.com/en/articles/14661296-use-claude-security)公測launch offer提供Enterprise組織連續兩月最高US$25,000額度至2026-12-31 UTC截止；官方說明中心釐清project owner可遷移既有專案（僅GitHub Enterprise專案不可遷移），遷移後方享促銷額度；底座Enterprise年約至少20席（每席US$20/月起）。

[Speechify API](https://speechify.ai/pricing)維持免卡Free方案，每月單一共用美元餘額等值Simba約500K字元；Simba 3.5限時500K優惠至2026-11-21止（其後降至250K）；[限流文件](https://docs.speechify.ai/build/guides/concepts/api-limits.md)確認帳戶共用3並行、1 RPS（burst 10），每次spoken chars上限2,000/20,000，含markup原始輸入上限20,000/32,000。

[Amazon Research Awards](https://www.amazon.science/research-awards/call-for-proposals/multilingual-and-contextual-ai-evaluation-call-for-proposals-fall-2026)秋季多語與情境AI評估徵案開放至2026-11-11 23:59 Pacific（台北11-12 15:59）；獲選PI平均可獲各不超過US$50,000之無限制資金與AWS促銷額度；限認可大專院校全職教師或NGO研究者，每人每輪限提一案；AWS兌換需有效信用卡。

[Kiro 新創](https://kiro.dev/startups/)至2026-12-31開放滾動申請，合格新創最高享一年Pro+額度（2/10/30席）；須透過AWS IAM Identity Center登入；方案正文排除具有active AWS Activate Credits新創，而FAQ排除joined AWS Activate之衝突仍存；額度耗盡按當時標準Pro+每月自動扣AWS卡；排除China/GCR地區。

[Deepgram Flux TTS](https://deepgram.com/promotions/2026-09/flux-tts-promo-terms-and-conditions)回饋活動至2026-12-31 Pacific止，每US$1已付費消耗回饋US$1 bonus，每合格專案最高US$500；限PAYG與Growth方案且須有效卡，免費與促銷消耗不計回饋；Auto-reload可停且非參加條件；Flux TTS費率為每千輸入字元US$0.045。

[Granola 新創](https://granola.ai/startups)官方FAQ新增明確要求：須由官方500+核准投資人名單中的投資人出資，且明確排除bootstrapped／自籌資金新創；合格新創享一年免費Business（少於30人團隊），期滿按標準Business價格（US$14／人／月）計費；台灣企業個案資格未核。

[OpenAI 非營利](https://help.openai.com/en/articles/9359041-openai-for-nonprofits)Goodstack核驗通過之機構享ChatGPT Business Standard年繳US$8／月、月繳US$10；API無折扣；既有訂戶當期按比例折抵；ChatGPT支援Taiwan，但台灣法人是否通過Goodstack核驗仍未知。

[Linear 新創](https://linear.app/startups)合作夥伴支持、未付費且少於50人新創享最多六個月Business免費；[計費文件](https://linear.app/docs/billing-and-plans)釐清優惠期後系統按標準價格自動續訂，除非管理員提前變更方案或取消；AI credits仍屬選購。

[Meshy Free](https://www.meshy.ai/pricing)定價頁與[最新說明文件](https://help.meshy.ai/en/articles/15696428-what-is-included-on-the-free-plan)口徑已一致，重大矛盾解決：確認Free免卡每月包含100點及10次無貼圖Meshy 6 Lite模型下載，每月1日重置且不結轉；帶貼圖或高級模型下載仍須付費；CC BY 4.0商用須署名。

[Replicate Try for Free](https://replicate.com/collections/try-for-free)指定模型集合註冊後可免卡有限次試跑，未公布固定次數或金額上限；用盡須加帳單並購買額度；[定價頁](https://replicate.com/pricing)依模型按硬體時間或輸入輸出差別計價；商用須逐模型核授權。

[Fireflies Free](https://guide.fireflies.ai/articles/4027724828-learn-about-the-fireflies-free-plan)Auto-join不限原始逐字稿在線（每席400分鐘儲存），但20 AI點每月或一次、摘要扣點與[計費條款](https://guide.fireflies.ai/articles/9606045468-fireflies-billing-terms)不扣點矛盾仍存；純Free用盡不自動扣款，需卡Business試用未取消會自動轉付費。

[Laminar Free](https://laminar.sh/pricing)每帳期提供1GB追蹤資料、7日存取與1席，超額拒收（HTTP 403）不自動計費；定價No Signals與[用量文件](https://laminar.sh/docs/platform/usage-limits.md)所有新workspace贈US$5 Signals之衝突仍未解；不可保證免費Signals。

[Adobe Express K–12](https://www.adobe.com/education/express/)官方指南確認台灣學校列入合格地區，在學與教職員免費享Express Premium；[FAQ](https://helpx.adobe.com/creative-cloud/apps/generative-ai/generative-credits-faq.html)確認每月250生成點數、Standard功能權限且不結轉；排除Firefly Video Model；須校方部署與管理員開通。

新增 [Netlify Free](https://www.netlify.com/pricing/)：官方提供credit-based Free方案，每月免信用卡贈送300點共用額度，涵蓋AI Gateway與Agent Runners（每US$1模型消耗扣180點）、Functions及正式部署（每次15點）；[AI Gateway文件](https://docs.netlify.com/build/ai-gateway/overview.md)確認免自備API key，專案正式部署後啟用，速率限制每分鐘90點；額度用罄專案暫停；台灣帳戶註冊未測。

新增 [Vespa Cloud](https://vespa.ai/free-trial/)：官方提供免信用卡一次性US$300 AI搜尋、RAG與推薦試用額度；[配額文件](https://docs.vespa.ai/en/cloud/quota.html.md)確認Trial租戶最大資源配置上限US$2／小時，用罄叢集自動拆除不產生意外收費；[租戶文檔](https://docs.vespa.ai/en/learn/tenant-apps-instances.html.md)確認試用tenant完成後自動到期，保留資料須升級付費；台灣企業與帳單適用性待核。

品質改善：`schema.json` 補齊 `status` 屬性定義（支援非空字串及 null，強制 `minLength: 1`），修復先前 JSON Schema 允許空字串或任意非字串狀態穿透之架構漏洞；`tests/validate.py` 增補批次完成時間不得早於開始時間之時間序斷言（`completed_at >= started_at`）及既有紀錄 `status` 非空校驗；以合成反例實證攔截通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止倒數後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`datacamp-free-access-week-november-2026` 台北11/9 12:59截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況。

2026-11-08 03:05–03:30 本輪：起始848筆，按實際時區有39筆到期；局部複核 `aocai-working-free-ai-courses-2026`、`google-ai-professional-certificate-tw-pro-3mo`、`grammarly-student-annual-half-first-period`、`taiwan-hrd-free-ai-introduction-2026`、`fastino-glideis1-ten-credit-payment-verification`、`articul8-bivia-early-adopter-billion-tokens`、`runable-free-daily-fifteen-hundred-monthly-cap`、`felo-standard-free-new-user-daily-two-hundred-campaign`、`retool-nonprofit-monthly-coupon`、`synthesia-basic-monthly-ten-min-five-hundred-no-download`、`fireworks-glimmer-sft`、`mem0-hobby-memory-api`、`coderabbit-startup-annual-half-six-months`、`vultr-match-ai-compute`、`zhipu-bigmodel-flash-free-api`、`resend-free-transactional-agent-email` 共16筆；新增機會 `tabstack-mozilla-ten-thousand-trial-credits`、`websearchapi-monthly-two-thousand-search-credits` 共2筆，政策及線索各0筆；既有未完成832筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[經濟部服務業在職AI課程](https://serv.gcis.nat.gov.tw/AOCAI/)公開報名表仍開放，台北11/11班受理至2026-11-09 23:59截止；遴選通過免學費，[報名表](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)明確載明應繳金額NT$0；內文預計100人與表單限制300人之名額口徑差異仍存；出席率須達80%並通過測驗。

[Google AI 專業證書](https://grow.google/intl/zh-TW_tw/ai-professional/)課程與行銷公開在線，[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)2026-11-06截止日與台灣頁2027-01-01矛盾仍存；[Coursera說明](https://www.coursera.org/google-certificates/google-ai)釐清課程學員透過Launch App與合作夥伴Saritasa發放唯一兌換碼於one.google.com兌換3個月AI Pro（含2TB），未建立公開通用兌換碼。

[Grammarly 學生方案](https://support.grammarly.com/hc/en-us/articles/39623389691021-Grammarly-promo-offers-on-SheerID)[SheerID表單](https://services.sheerid.com/verify/645b6593ace429765b46f1d5/)即時實測確認支援Taiwan及臺灣大學、臺灣師大、臺灣海大、臺灣科大等校；年約Pro首期第一席五折（上限省US$72），付款接受信用卡或PayPal；每月2,000次AI提示詞非無限制。

[e等公務園+](https://elearn.hrd.gov.tw/info/10042743)全年報名開放至2026-12-31，線上課程登入即可研讀；因本課程未列明特定免費公文文號，費用維持null謹慎呈現；台灣民眾認證時數須身分證號。

[Fastino GLiDE](https://agent.fastino.ai/terms)官方推文確認US$10推廣碼活動，[定價文件](https://docs.fastino.ai/pricing)釐清推論呼叫必須完成付款方式驗證（驗證不扣款）；現時兌碼有效性與額度效期未核。

[Articul8 Bivia](https://www.articul8.ai/bivia)早期使用者活動在線，前1萬名使用者贈送10億（1 Billion）免費tokens（修正先前10B口徑筆誤）；初期註冊表單不需填卡，完整開通流程免卡待核。

[Runable Free](https://runable.com/pricing)維持每日1,500點、每月上限15,000點且次月不結轉；用盡暫停呼叫，免信用卡要求仍待登入後實測。

[Felo Standard](https://felo.ai/en/pricing)首頁確認新用戶限時每日200點活動仍列示，免費方案標明No credit card required；現行FAQ未重述耗盡自動回退普通搜尋之確定性保證。

[Retool 非營利](https://docs.retool.com/support/discount-programs)申請入口維持每月US$1,625訂閱券（涵蓋25席Business Standard），需先建Free組織再申請；[定價頁](https://retool.com/pricing)（1,000/3,000點）與[AI說明文件](https://docs.retool.com/support/billing-usage/ai-credits)（750/1,500點）額度衝突仍存；非營利說明未提及強制綁卡，額外購買AI點數包需綁卡。

[Synthesia Basic](https://www.synthesia.io/pricing)維持US$0/月含10分鐘Studio影片／配音、3次問卷及500共享點數，不可下載；首頁標示No credit card required；Syren新戶1,000點排定至2026-11-09 23:59 BST截止，定價頁一個月期限衝突仍存。

[Fireworks Muse Glimmer](https://fireworks.ai/pricing)定價與[Cookbook](https://docs.fireworks.ai/fine-tuning/training-api/cookbook/muse-glimmer.md)確認LoRA SFT限期免費開放至台北2026-12-01 16:00（美西11/30午夜）前啟動；無公開固定免費token上限，僅適用LoRA SFT，微調後模型部署需隨選GPU計費。

[Mem0 Free](https://docs.mem0.ai/platform/pricing)定價首頁與文件口徑已統一：Free提供自帶金鑰（BYOK）與30天免費平台模型呼叫，官方入門教程證實免綁卡即可建立工作區；商業授權排除條款已釐清。

[CodeRabbit 新創](https://www.coderabbit.ai/startup-program)維持Team年約半年五折優惠，核准後發放折價碼；知識庫隨時取消與[條款](https://www.coderabbit.ai/legal/terms-of-service)§5.1提前45天書面通知差異仍存；未提供台灣審核例外。

[Vultr Match](https://www.vultr.com/coupons/)優惠彙整頁確認新戶US$10–$100預存等額回饋活動仍列示；Match專屬說明頁回傳403阻擋，Cloud GPU是否屬合格產品仍維持待核。

[智譜 BigModel](https://docs.bigmodel.cn/cn/guide/start/pricing)免費API模型在線，[用戶協議](https://docs.bigmodel.cn/cn/agreement/user-agreement)§VII.2重大釐清：明訂免費功能僅限「非商業用途的個人科研、學習」，解決長期以來免費Flash模型商用授權疑慮。

[Resend Free](https://resend.com/pricing)維持每月3,000封郵件（每日100封上限）免信用卡，官方定價確認額外新增每月5點AI點數及10,000次自動化執行（automation runs）；超限不自動扣款。

新增 [Mozilla Tabstack](https://tabstack.ai/pricing)：Mozilla營運之網頁研究與瀏覽器代理API，新戶免信用卡贈送一次性10,000 credits，[條款](https://tabstack.ai/legal/terms)確認合規帳戶存續期間不過期；Markdown擷取10點、JSON 50點、Generate/Automate每action 100點；試用限速10 RPM；台灣帳戶註冊與付款未測。

新增 [WebSearchAPI.ai](https://websearchapi.ai/pricing)：官方提供多來源搜尋與擷取API，Free方案免信用卡每月贈送2,000 search credits；基本搜尋1點、含內容擷取2點、生成答案另加1點；[端點文件](https://websearchapi.ai/docs/search-api)確認支援Bearer key呼叫；免費額滿處理與台灣可用度待核。

品質改善：`app.js` 與 `tests/filters.cjs` 增補 `amount_and_eligibility_unverified`（額度與資格待核）、`current_approval_unverified`（審核現況待核）、`grant_delivery_unverified`（資助發放待核）、`legacy_closed_new_path_conditional`（舊途徑關閉・新途徑需條件）、`quota_and_taiwan_eligibility_unverified`（額度與台灣資格待核）、`taiwan_not_listed_supported_region`（台灣未列於支援地區）及 `watchlist`（觀察線索待追蹤）之繁體中文狀態標籤與樣式斷言，並將過渡型條件方案正確歸入 conditional 樣式，徹底消除前端儀表板於特定待核狀態下回退泛用「狀態待釐清」之盲區；以單元測試實證覆蓋通過。

下輪優先：`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止後查[報名頁](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)確認台北11/11班報名截止現況與錄取通知；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止倒數後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`datacamp-free-access-week-november-2026` 台北11/9 12:59截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況。

2026-11-08 02:05–02:25 本輪：起始846筆，按實際時區有20筆到期；局部複核 `firepass-closed-policy`、`kimi-api-free-voucher-cn-locked`、`gitlab-education-ai-credit-exclusion`、`murf-startup-incubator-three-month`、`pipedream-connect-development-only`、`stackai-free-monthly-five-hundred-runs`、`aiven-postgresql-free`、`autodesk-flow-studio-education`、`retool-education-monthly-discount`、`satfaq-ai-trial-index`、`genspark-free-and-standard-pools`、`opencode-accountless-free-models`、`plaud-preview-one-time-work-credits`、`videogen-model1-selected-project-credit-program`、`ugreen-ai-nas-hackathon-2026`、`octoparse-ai-free-new-user-five-credit` 共16筆；新增機會 `hal-x-thx-keyless-free-decision-api`、`maximo-platform-new-account-five-credit` 共2筆，政策及線索各0筆；既有未完成830筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[UGREEN AI NAS Hackathon](https://ugreenhackathon.devpost.com/rules)正式規則本輪由瀏覽器成功完整讀取，清除舊有403追查阻擋：規則§3確認Taiwan為合格居住地，限成年個人或最多三人隊伍；11/15 23:45 PT截止；初賽無須影片；最多30個入圍專案各獲11/22至11/28指定一天免費遠端獨占NAS測試環境（00:00–23:59 PT），無須購買或付款；[活動宣傳頁](https://ai.ugreen.com/pages/ugreen-hackathon)日期與影片要求衝突依正式規則為準。

[GitLab 教育方案](https://about.gitlab.com/solutions/education/join/)確認提供認證大專/非營利教學機構一年免費Ultimate授權、無限席位與每月50,000 compute minutes；[社群方案文件](https://docs.gitlab.com/subscriptions/community_programs/)確認不自動配發included credits；但[官方手冊](https://handbook.gitlab.com/handbook/marketing/developer-relations/programs/education-program/)福利明列包含AI Chat與IDE Code Suggestions；[額度文件](https://docs.gitlab.com/subscriptions/gitlab_credits/)確認30天評估點數須向Sales申請，且開啟用量計費後於剩餘期與自服續約中不能opt out。

[Retool 教育方案](https://docs.retool.com/support/discount-programs)確認在校學生與個人教師可申請月繳Team/Business訂閱100%折扣，排除年約與Enterprise；[額度文件](https://docs.retool.com/support/billing-usage/ai-credits)（Team 750/Business 1,500點/月）與[定價頁](https://retool.com/pricing)（1,000/3,000點/月）衝突仍存；Agents按小時計費不耗AI點數（公開表列最多20免費小時）；失格後僅承諾通知退出時程。

[さっとFAQ](https://www.satfaq.jp/news/20260918_2/)既有Basic以上付費客戶2,000點AI機器人試用排定至2026-12-31截止，由租戶契約者啟用；活動期間不可加購點數，用盡停用AI；期滿未正式簽署AI方案者刪除機器人與贈點，非自動扣款；[正式AI方案](https://www.satfaq.jp/news/20260918_1/)月費80,000日圓。

[Genspark](https://www.genspark.ai/helpcenter/membership-plans)Free每日100點受未公開終身額度限制，達限後停止每日補點；付費Standard 7日池耗盡自動轉扣點數（非免費層）；9/18前舊訂戶聊天/圖像原無限權益列至2026-12-31截止；[點數指南](https://www.genspark.ai/helpcenter/credits-guide)與會員頁在9/18資格邊界（before vs on or before）之衝突仍未解。

[OpenCode](https://opencode.ai/)免帳號免費模型（GLM-5.3-Flash Free、DeepSeek V4.1 Flash Free等）在線；[模型文件](https://opencode.ai/docs/console/models/)確認免費聊天模型僅限OpenCode客戶端、無固定每日上限、多款標註限時；[條款](https://opencode.ai/legal/terms-of-service)限自身內部使用，免費版若轉收費前會先通知。

[Plaud Preview](https://support.plaud.ai/hc/en-us/articles/63632158871705-Trial-credits-how-many-you-get-when-they-expire-and-renewals-for-v4-0-x-or-later)更新一次性贈額（Starter 600、Pro 2,400、Unlimited 6,000點）排定至2026-12-31截止；贈額自發放起三個月有效且非每月補充；[說明](https://support.plaud.ai/hc/en-us/articles/62338969091353-Top-up-Plaud-Credits-and-what-happens-when-they-run-out)確認贈點耗盡不自動觸發付款，加購須手動確認。

[VideoGen Model 1](https://videogen.io/model-1)早期存取與選案補助仍開放申請，US$100萬為總池非每人可領；學生與創作者可提案，預定年底前分配完畢；補助額度享Pro同等商用權；未公布單案金額與耗盡收費機制。

[Octoparse AI Free](https://www.octoparse.ai/)Windows桌面核心流程永久免費，首頁與[定價頁](https://www.octoparse.ai/pricing)確認新用戶獲一次性US$5 AI平台點數，其後轉為PAYG；[取消FAQ](https://www.octoparse.ai/helpcenter/en/articles/9755747-how-to-cancel-your-current-free-trial-subscription)（提前1天）與[條款](https://www.octoparse.ai/terms-and-conditions)（月訂7天、年訂30天）在付費續訂取消期限之衝突仍存。

[Fireworks Fire Pass](https://docs.fireworks.ai/firepass)官方文件確認維持停止公開新訂閱，既有與促銷持有人可管理；fpk_金鑰僅適用指定編程routes，限個人非生產用途；其他模型按token收費。

[Kimi API](https://www.kimi.com/help/kimi-api/api-free-trial)新戶15元代金券在線，限中國大陸手機號註冊與實名，發放起3個月內有效；自動抵扣API消耗，不可用於Kimi K3；餘額為零API回傳403。

[Murf 新創](https://murf.ai/startup-program)正文維持US$1,500額度／三個月，公司未滿10年且少於100人；[API FAQ](https://murf.ai/api/docs/resources/faq)5,000萬字元與metadata US$5,000之口徑差異仍存；超額按每千字US$0.03計費。

[Pipedream Connect](https://pipedream.com/pricing)免卡US$0開發環境在線，最多支援10個external user IDs，限本人測試；[定價文件](https://pipedream.com/docs/pricing)確認Workflows與String於2027-03-31退役不影響Connect。

[StackAI Free](https://www.stackai.com/pricing)維持每月US$0含500 runs、2個專案與1席；[條款](https://www.stackai.com/terms-of-service)§8.H超額收費條款未列免費硬停保證；外接模型業者帳單獨立。

[Aiven PostgreSQL Free](https://aiven.io/docs/products/postgresql/concepts/pg-free-tier)官方文件確認免信用卡無固定期限，提供單節點1CPU、1GB RAM、1GB磁碟與20連線；建立初期無使用或長期閒置可關閉並可手動重啟。

[Autodesk Flow Studio Education](https://blogs.autodesk.com/media-and-entertainment/2026/09/28/autodesk-flow-studio-pricing-and-subscription-guide/)官方定價指南確認合格18歲以上大學生與教師享每月2,100點且不結轉，一年可續期；教育商用限制需另看完整授權。

新增 [HAL-X THX-02](https://api.hal-x.ai/docs/thx-02/)：官方提供免金鑰（Keyless）免費決策推論API，THX-02限制每客戶IP每分鐘最多60個決策（每個問題算一個決策），超額回傳429及Retry-After而非自動扣款；支援文字分類、代理路由、是非與最多4張圖片決策；免建立帳號或綁卡，台灣可用度與商用授權待核。

新增 [Maximo AI Platform](https://maximoai.co/platform)：官方首頁標示Limited Time Offer，驗證電子郵件即贈US$5免費API試用額度；提供OpenAI相容API（Atlas與Pandora模型）；[資料政策](https://maximoai.co/platform/data-policy)承諾API資料不用於模型訓練，暫存日誌保留30天供計費與除錯；台灣帳戶領取與免卡待核。

品質改善：`app.js` 與 `tests/filters.cjs` 增補 `taiwan_availability_unverified`（台灣可用度待核）、`unverified_taiwan_eligibility`（台灣資格待核）、`application_based_unverified`（申請資格待核）、`application_based_unverified_terms`（申請條款待核）、`account_specific_unverified`（個別帳戶資格待核）及 `grant_terms_unverified`（資助條款待核）之中文狀態標籤與斷言，修復過去前端儀表板在面對細緻資格待核狀態時一律回退為泛用「狀態待釐清」的資訊模糊缺陷；以單元測試實證覆蓋通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止倒數後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`datacamp-free-access-week-november-2026` 台北11/9 12:59截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況；`lawson-restricted-japan` 台北11/10 10:00查[活動頁](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)50點限定之Google AI Pro 3個月免費碼抽選入口。

2026-11-08 01:13–01:30 本輪：起始844筆，按實際時區有3筆到期；局部複核 `qoder-free-mechanisms`、`qoder-lite`、`autoclaw-halloween-40m-expiry-conflict-watch`、`taipei-youth-ai-subscription-subsidy-2026`、`airtop-free-monthly-thousand-signup-bonus-conflict`、`genshi-growth-japan-trial`、`aliyun-yungongkaiwu-model-studio-teachers`、`llamaparse-free-tenk`、`llamaparse-startups-two-k`、`e2b-startups-20k-publicity`、`langsmith-startups-build-scale`、`brave-search-api-free-monthly`、`turso-starter-free-vector`、`stepfun-stepaudio3-music-gen-preview-nov8` 共14筆；新增機會 `aion-labs-free-daily-api-allowance`、`scaleway-generative-apis-free-million-tokens-audio` 共2筆，政策及線索各0筆；既有未完成830筆，核心來源整筆追查失敗2筆（`perplexity-watch`、`perplexity-education` 官方說明中心文章回傳403阻擋，維持舊時間戳）。未登入、申請或付款。

[StepFun Audio 3](https://platform.stepfun.ai/docs/en/guides/pricing/details.md)官方定價公告發布重大更新：StepAudio 3限時免費預覽展延至2026-11-17 11:59:59 UTC+8；正式版按量收費順延至11/17 12:00:00 UTC+8生效（Music無音訊$2.40/小時、有音訊$4.80/小時；Gen每百萬計費字元$14；Realtime每小時$7.50）；個人帳戶需完成身分認證。

[Qoder](https://docs.qoder.com/events/flashoffer)官方確認Flash免扣活動已於2026-11-07 00:00 SGT（11/6 16:00 UTC）結束，其後轉為計費（離峰0.04×、平時0.1×，離峰限Pro Trial及付費方案）；[每日100點](https://docs.qoder.com/events/100credits)桌面手領獨立贈額仍刊載，每包30天；[Lite方案](https://qoder.com/pricing)確認每月US$10含1,000基礎點數，首購另贈1,000、續訂另贈500點。

[AutoClaw 萬聖節點數](https://autoclaw.z.ai/blog/news/M11W1/)官方4,000點（40M tokens）活動排定至台北11/8 23:59截止，同頁正文11/8與注意事項11/1到期衝突未解；[新週福利公告](https://autoclaw.z.ai/blog/news/M11W2/)預告11/9–15每帳戶1億Tokens（10,000點）週福利，統一11/15 23:59到期。

[臺北青年AI訂閱補助](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)重核青年局首頁與最新公告，未見經費用罄停收公告；最後送達期限倒數：須於2026-11-10前書面送達青年局；限18–35歲、設籍臺北6個月以上、認可大專學籍或當年度畢業生，並完成指定AI課程；限8/1–10/31完整月訂閱，一般最高NT$4,000、弱勢NT$8,000。

[Airtop](https://portal.airtop.ai/shutdown)官方公告確認2026-11-13停服，新註冊與升級已關閉，既有帳戶可管理訂閱、降級或取消；[定價首頁](https://airtop.ai/pricing)頂部預告新專案但下方殘留Free 1,000點與10,000迎新點標價表，矛盾仍存。

[GENSHI Voice](https://voice.genshi.ai/terms/)10/25條款確認Growth試用需綁卡，免費至申請次月月底（非僅30天）；期滿未取消自動JPY4,800/月；每月560點（1日重置不結轉），超額拒絕請求。

[阿里雲雲工開物教師](https://help.aliyun.com/zh/model-studio/introduction-to-yungongkaiwu)百煉子活動確認在職高校/科研教師審核後享百煉五折至2027-03-31，原價上限40萬元、最高折讓20萬元（非免費額度）；每日限100位，限教研用途，排除國際站。

[LlamaParse Free](https://developers.llamaindex.ai/llamaparse/general/pricing/)官方定價確認Agentic Plus費率下調為25 credits/page（原45 credits）；Fast 1、Cost-effective 3、Agentic 10、Layout另加3；Free維持每月10,000 credits、各5並行，用盡回傳402；[定價頁](https://www.llamaindex.ai/pricing)新增入門Pay-as-you-go方案（最低預付US$10）；[新創方案](https://www.llamaindex.ai/startups)維持US$2,000額度一年，募資需達US$250K。

[E2B 新創](https://e2b.dev/startups/terms)條款確認US$20,000沙箱額度與Pro層級（100並發/24小時），限成立<3年且募資<US$5M；核准後7日內須公開分享正面評價並至少展示一處E2B徽章，額度自領取起1年有效。

[LangSmith 新創](https://www.langchain.com/startups)確認Build為席位折扣（募資$25K–$10M），Scale為US$10,000額度（最高$50M且合作VC，1年/YC 2年）；Gateway模型用量另以Gateway Credits計費。

[Brave Search API](https://api-dashboard.search.brave.com/documentation/resources/help-feedback)官方FAQ釐清：所有新開通API方案均為預付制（Prepaid Only），既有後付保留；各方案維持每月US$5額度（Search約1,000次）；餘額為零暫停呼叫；卡片預授權$0或$1立即退回；禁止用於模型訓練或永久儲存。

[Turso Starter Free](https://docs.turso.tech/help/usage-and-billing)官方計費與超額文件釐清：Free方案只要超出任一單項配額（5GB儲存、5億次讀取、1,000萬次寫入、3GB同步），即全面阻擋該組織之資料庫操作，不產生自動扣款；付費方案超額可繼續運作按量計費。

新增 [Aion Labs](https://www.aionlabs.ai/pricing/)：官方提供US$0免信用卡Free Tier，可用API與瀏覽器聊天；[速率限制文檔](https://api.aionlabs.ai/docs/rate-limits/)確認免費層上限15 RPM、20,000 TPM及20,000 tokens/day；提供OpenAI相容API及Aion 256K context故事／角色扮演模型；[條款](https://www.aionlabs.ai/terms/2026-10-17/)限滿18歲與單一帳號，免費使用屬courtesy可隨時變更，承諾不以客戶輸入或輸出訓練模型；每日贈送金額及台灣付款未測。

新增 [Scaleway Generative APIs](https://www.scaleway.com/en/pricing/model-as-a-service/)：官方Serverless免費層提供首100萬tokens及60分鐘音訊轉錄，超額按量收費，Dedicated Deployment依GPU時間收費不在此限；[FAQ](https://www.scaleway.com/en/docs/generative-apis/faq.md)確認免費額度優先抵扣最昂貴tokens，但目前無法設定超過預算即自動阻擋之硬性billing threshold；[帳戶文檔](https://www.scaleway.com/en/docs/account/quickstart.md)訂購資源需有效信用卡（€1暫時驗證授權2日內退還，不接受虛擬預付卡）；台灣帳單國與免卡例外未核。

品質改善：`schema.json` 與 `tests/validate.py` 增補 `title`（非空字串）及 `sources` 陣列內部 `scope` 與 `evidence` 之字串類型與非空限制（強制 `type: "string", minLength: 1`），修復先前單獨執行 `jsonschema.validate` 時空標題或空證明責任欄位可被穿透的架構缺陷；以合成案例實證攔截通過。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止倒數後查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)確認萬聖節獎勵關閉與下線現況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口與實際入帳條款；`taipei-youth-ai-subscription-subsidy-2026` 台北11/9–10查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)最後送達日收件倒數與經費狀況；`datacamp-free-access-week-november-2026` 台北11/9 12:59截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況；`lawson-restricted-japan` 台北11/10 10:00查[活動頁](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)50點限定之Google AI Pro 3個月免費碼抽選入口。

2026-11-07 19:05–19:25 本輪：起始842筆，按實際時區有2筆到期（`perplexity-watch`、`perplexity-education`）；局部複核 `claude-teachers-us`、`azure-nonprofit-annual-two-k`、`aliyun-yungongkaiwu-model-studio-students`、`coralbricks-signup-five-trial-credit`、`murf-api-signup-ten-credit`、`eden-ai-signup-ten-professional-credit-watch`、`circleback-student-half-nonprofit-thirty-percent`、`krea-free-daily-hundred-compute`、`auphonic-free-two-hour-jingle`、`speechmatics-startup-selected-cohort`、`inference-net-open-source-grants-watch` 共11筆；新增機會 `chutes-paygo-confidential-inference`、`stepfun-stepaudio3-music-gen-preview-nov8` 共2筆，政策及線索各0筆；既有未完成831筆，核心來源整筆追查失敗2筆（`perplexity-watch`、`perplexity-education` 官方說明中心文章回傳403阻擋，維持舊時間戳）。未登入、申請或付款。

[Claude for Teachers](https://www.anthropic.com/news/claude-for-teachers)官方公告與[教師方案頁](https://claude.com/solutions/teachers)確認美國K–12學校/學區教育者2027-06-30前申請享一年免費Teams底層，學區為Enterprise組織；[說明](https://support.claude.com/en/articles/15926041-claude-for-teachers-your-data-and-our-terms)確認個人與學區享相同滾動5小時及每週限制；僅在台灣學校任職不符美國任職門檻，維持No。

[Azure非營利方案](https://www.microsoft.com/en-us/nonprofits/azure)官方產品頁與[FAQ](https://www.microsoft.com/en-us/nonprofits/faq)確認每年提供等值US$2,000 Azure額度，需信用卡，額度耗盡轉Pay-As-You-Go；[國別資格PDF](https://www.microsoft.com/content/dam/microsoft/msc/documents/presentations/nonprofits/pdfs/Microsoft-Nonprofit-Eligibility-Requirements.pdf)明列Taiwan社會團體或公立捐助基金會；[TechSoup說明](https://support.techsoup.org/hc/en-us/articles/12912276234523-Azure-for-Nonprofits)確認Azure不在TechSoup catalog，應向Microsoft非營利入口申請；台灣微軟舊頁US$3,500矛盾仍存。

[阿里雲雲工開物](https://university.aliyun.com/)與[百煉活動文件](https://help.aliyun.com/zh/model-studio/introduction-to-yungongkaiwu)確認中國高校在學學生（明列含台灣高校）實名認證後每12個月可領一張CNY300無門檻抵扣金（領取起一年有效）；百煉子活動至2027-03-31；推理費排除Wan、HappyHorse、Omni；每日限量且超額付費；維持Yes。

[CoralBricks](https://www.coralbricks.ai/docs/getting-started)官方入門文件確認新戶US$5試用點數橫幅在線；[API文件](https://www.coralbricks.ai/docs.md)確認OpenAI相容API按預付扣款，非正餘額回429；[條款](https://www.coralbricks.ai/content/terms.md)明定每人/每戶限一次且禁止多帳號濫領；免卡及台灣實領未核。

[Murf API](https://murf.ai/pricing?product=api)官方API定價展開FAQ確認新戶No credit card required一次US$10跨API試用，用盡升級PAYG，每次TTS請求上限3,000字元；[條款](https://murf.ai/legal/terms-of-service)§10.7將試用限於self-evaluation；[API FAQ](https://murf.ai/api/docs/resources/faq)舊TTS 100,000字元無期限矛盾仍存。

[Eden AI](https://www.edenai.co/post/how-to-generate-an-image-with-ai)10/13官方教學稱註冊送US$10點數；[定價頁](https://www.edenai.co/pricing)未重述該贈額，購點收5.5%平台費；[條款](https://www.edenai.co/terms)§2.1限專業用途，非一般個人福利；[購點文件](https://www.edenai.co/docs/v3/general/buying-credits)列可選auto-refill與402不足額。

[Circleback](https://circleback.ai/pricing)官方定價確認學生50%（學校信箱自動或學籍證明）與非營利30%折扣；本筆為訂閱折扣非API點數；定價另提供永久免費層含API/MCP存取與30天紀錄；[條款](https://circleback.ai/terms)定期續約扣款與取消條件須注意。

[Krea Free](https://www.krea.ai/pricing)官方定價直接明列Free每日100 compute units、US$0/月且No credit card required；[訂閱文件](https://www.krea.ai/docs/user-guide/help-and-support/manage-subscriptions)內50 vs 100單位矛盾仍存；[部落格](https://www.krea.ai/blog/what-is-deepai-free-ai-image-generator-explained-and-alternatives-in-2026)與[條款](https://www.krea.ai/terms)在免費商用授權及生成素材私密性之衝突仍未解，不保證免費商用與保密。

[Auphonic Free](https://auphonic.com/pricing)官方定價確認每月2小時處理音訊、免卡；[首頁FAQ](https://auphonic.com/)確認Free輸出附帶Auphonic jingle標記；單筆最低扣3分鐘，同輸入重跑不重扣；[隱私政策](https://auphonic.com/privacy)確認商業用戶可聯絡官方設定模型訓練opt-out。

[Speechmatics新創](https://www.speechmatics.com/startup-program)官方維持rolling申請，最高US$50,000 credits、每期最多20家，募資<US$10M且非付費Enterprise；概要列即時/批次STT與FAQ列TTS/on-prem範圍矛盾仍存；效期未公布。

[Inference.net Grants](https://inference.net/grants)官方Grants頁確認開源AI專案開發者與研究者最高US$10,000免費算力（compute resources），rolling審查無固定截止；更新狀態為 `conditional`，額度分類修正為 `HIGH BUT LIMITED`；移除非關聯之歷史模型上架描述。

新增 [Chutes](https://chutes.ai/pricing)：官方提供低價TEE按量推論，Qwen3.8-27B-TEE輸入US$0.039/M、快取輸入US$0.0039/M、輸出US$1.25/M；Gemma4-31B-turbo-TEE輸入US$0.12/M、輸出US$0.37/M；官方FAQ明示目前無免費層或試用，需儲值PAYGO；[條款](https://chutes.ai/terms)承諾不以客戶內容訓練模型；台灣付款未測。

新增 [StepFun Audio 3](https://platform.stepfun.ai/docs/en/guides/models/stepaudio-3-music.md)：官方國際站模型文件將stepaudio-3-music-preview與stepaudio-3-gen-preview列為Free (limited time)；[定價公告](https://platform.stepfun.ai/docs/en/guides/pricing/details.md)確認限時免費至2026-11-08 23:59:59 UTC+8，11/9零時起正式版按量計費；個人帳戶需完成身分認證；[條款](https://platform.stepfun.ai/docs/en/agreement/userservice.md)Early Access可用於訓練；台灣帳戶核准與未儲值權限未核。

品質改善：`schema.json` 與 `tests/validate.py` 增補 `eligibility` 欄位完整性校驗（強制所有6項資格條件 `service_availability`, `account_eligibility`, `billing_country`, `identity_residency`, `terms_restrictions`, `taiwan_note` 必須為非空字串），防止資格描述出現空白或缺失；`tests/filters.cjs` 補齊 `sunset_announced`、`applications_closed` 與 `expired` 狀態之 `closed` tone 樣式斷言；以空字串及純空白合成案例實證攔截通過。

下輪優先：`stepfun-stepaudio3-music-gen-preview-nov8` 台北11/8 23:59:59截止前查[模型文件](https://platform.stepfun.ai/docs/en/guides/models/stepaudio-3-music.md)與[定價頁](https://platform.stepfun.ai/docs/en/guides/pricing/details.md)確認限時免費預覽退役與11/9付費上線現況；`datacamp-free-access-week-november-2026` 台北11/9 12:59截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止前查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節獎勵關閉情況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口；`taipei-youth-ai-subscription-subsidy-2026` 台北11/8查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與11/10最後送達倒數。

2026-11-07 18:05–18:25 本輪：起始840筆，按實際時區有2筆到期（`perplexity-watch`、`perplexity-education`）；局部複核 `claude-artifacts-expired-lead`、`datacamp-free-access-week-november-2026`、`tidb-starter-free-mysql-postgres-preview`、`autoclaw-halloween-40m-expiry-conflict-watch`、`aryn-docparse-three-month-tenk-monthly`、`vapi-free-us-number-not-free-calls`、`maxim-developer-free-monthly-tenk-logs`、`hyperbrowser-free-starting-fivek-shared`、`baseten-new-workspace-trial`、`nebius-token-factory-signup-one-dollar`、`scrapfly-signup-thousand-shared-credits`、`cartesia-free-monthly-twentyk`、`qodo-fourteen-day-unlimited-trial`、`ai21-trial-duration-conflict` 共14筆；新增機會 `vercel-sandbox-hobby-free-five-cpu-hours`、`aihubmix-one-dollar-daily-free-model-pool` 共2筆，政策及線索各0筆；既有未完成826筆，核心來源整筆追查失敗2筆（`perplexity-watch`、`perplexity-education` 官方說明中心文章回傳403阻擋，維持舊時間戳）。未登入、申請或付款。

[Claude Artifacts](https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them)官方說明確認Artifacts功能已全面內建於Free/Pro/Max/Ultra/Team/Enterprise，用量計入自身方案配額；原促銷說明頁[404](https://support.claude.com/en/articles/17274727-artifact-usage-promotion)未獲原50%用量折抵促銷重啟證據，維持 `expired_unverified`。

[DataCamp 免費學習週](https://www.datacamp.com/campaign/free-access-week-november-2026)官方活動頁明列2026-11-02 09:00 ET至2026-11-08 23:59 ET（台北11/2 22:00至11/9 12:59）；涵蓋Classic完整課程庫、projects及評量認證；排除AI Tutor、Microsoft Fabric與Google合作內容；個人免信用卡註冊。

[TiDB Starter](https://docs.pingcap.com/tidbcloud/select-cluster-tier/?plan=starter)官方文件確認MySQL模式前5個符合資格instances享5 GiB row、5 GiB columnar與每月5,000萬RU；PostgreSQL公開預覽前10個instances享50 GiB row與每月5億RU；[支出上限指南](https://docs.pingcap.com/tidbcloud/manage-serverless-spend-limit/)確認Scalable上限最低US$0.01；免卡起步，超額節流與拒絕新連線。

[AutoClaw 萬聖節點數](https://autoclaw.z.ai/blog/news/M11W1/)正文列10/31 00:00至11/8 23:59 UTC+8領取4,000點（40M tokens）且11/8到期，同頁注意事項11/1到期衝突未解；11/4–5之100M閃促已結束；[新週福利公告](https://autoclaw.z.ai/blog/news/M11W2/)預告11/9–15每帳號10,000點（100M tokens）週福利，統一11/15 23:59到期。

[Aryn DocParse](https://www.aryn.ai/pricing)官方專屬定價確認免卡試用3個月，每月10,000頁、最多1,000份儲存文件與30天索引留存；PAYG每1,000頁US$2；[服務條款](https://aryn-public.s3.amazonaws.com/aps_website_docs/Aryn+-+Terms+of+Service.pdf)規定免費層Customer Data可用於模型訓練（付費層才可opt out）。

[Vapi 免費號碼](https://docs.vapi.ai/free-telephony)免卡首支免費US門號可建立，贈額US$5；[定價頁](https://vapi.ai/pricing)列hosting每分鐘US$0.05，模型與電信費用另計；免費號碼僅受話不能外撥，非免費通話。

[Maxim Developer](https://www.getmaxim.ai/evals/pricing)Developer方案永久免費，每月最多10,000 logs、3席、1 workspace與3天留存，超額硬停不計費；[條款](https://www.getmaxim.ai/terms-of-service)明定未經書面同意不以客戶資料訓練模型。

[Hyperbrowser](https://www.hyperbrowser.ai/pricing)Free方案起始5,000共享點數，涵蓋四項產品，用盡硬停；[條款](https://www.hyperbrowser.ai/terms)§9自動化裝置廣泛限制與API用途之邊界仍待釐清。

[Baseten 新工作區試用](https://docs.baseten.co/organization/billing)新工作區贈額依註冊路徑而定，無獨立永久免費層；無付款方式額度耗盡停用模型；[條款](https://www.baseten.co/terms-and-conditions/)明訂不以Customer Content、Models或推理日誌訓練模型。

[Nebius Token Factory](https://docs.tokenfactory.nebius.com/other-capabilities/billing-new)現行billing文件已刪除原先Upon first sign-up $1 valid for 30 days段落，新戶贈額現況未證；仍維持強制綁卡與後付自動扣款。

[Scrapfly](https://scrapfly.io/pricing)官方定價確認一次性1,000共用API點數免卡無時間限制，用盡硬停；[Extraction文件](https://scrapfly.io/docs/extraction-api/getting-started)prompt extraction每次5點，template extraction 1 vs 5點官方文件衝突仍存。

[Cartesia Free](https://www.cartesia.ai/pricing)每月20,000語音credits（TTS/STT共用）及US$1 agents額度；官方FAQ明示Voice Agent預付US$1用完通話繼續按費率計費，不能概括為全產品無扣款風險；[條款](https://www.cartesia.ai/legal/terms)允許訓練（可申請opt-out）。

[Qodo](https://www.qodo.ai/pricing/)14天免卡不限試用在線；付費Pro Team已改為US$30含2,000點（US$0.015/點，原2,500點/$0.012）；[General條款](https://www.qodo.ai/terms/)§4.4授權以客戶資料訓練，與定價FAQ不訓練承諾存在衝突。

[AI21](https://www.ai21.com/pricing/)新戶US$10免卡在線，定價頁7天與[用量文件](https://docs.ai21.com/docs/usage-cost)三個月衝突仍存；用盡需提供帳單資料轉月結。

新增 [Vercel Sandbox Hobby](https://vercel.com/docs/security/secure-compute/sandbox/pricing-and-limits)：官方安全運算文件確認Hobby免費提供每月5 Active CPU小時、420 GB-hours記憶體、5,000次建立與20 GB傳輸；超額暫停建立不額外扣費；[條款](https://vercel.com/legal/terms)限個人非商用，外部模型費用自理；台灣帳戶資格未明示。

新增 [AIHubMix](https://aihubmix.com/free)：官方免費目錄列71款模型，新戶免卡10次試用；一次儲值至少US$1解鎖每日共用100次/100萬token；付費模型按量計費，[條款](https://aihubmix.com/terms)商用另有規範；台灣付款未測。

品質改善：`schema.json` 與 `tests/validate.py` 增補 `unknowns` 陣列完整性校驗（強制必須為字串陣列且元素非空），攔截前輪新紀錄中 `unknowns` 誤植為純字串的資料缺陷，並補正既有案例；`tests/filters.cjs` 補齊 `closed` 與 `closed_to_new_subscriptions` 於免費專區篩選排除及 closed 樣式之斷言；以合成案例實證攔截通過。

下輪優先：`datacamp-free-access-week-november-2026` 台北11/9 12:59截止後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)確認免費週結束與付費回退現況；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止前查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節獎勵關閉情況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口；`taipei-youth-ai-subscription-subsidy-2026` 台北11/8查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與11/10最後送達倒數；`lawson-restricted-japan` 台北11/10 10:00查[活動頁](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)50點限定之Google AI Pro 3個月免費碼抽選入口。

2026-11-07 17:05–17:25 本輪：起始838筆，按實際時區有17筆到期；局部複核 `tabnine-basic-free-retired`、`astamuse-agent-trial-oct31-index-only`、`kakao-plus-young-adult-promo-unverified`、`deepinfra-two-minute-papers-twenty-credit`、`workbuddy-step5-oct25-unverified`、`lawson-restricted-japan`、`deepinfra-deepstart-qualified`、`claude-duet-preview`、`meta-hackathon-oct2026`、`robinhood-luna-token-promotion-december`、`hostkey-grant-stale-2020-deliverable`、`lovable-sweden-2026`、`fal-flux3-max-five-daily-sandbox` 共13筆；新增機會 `serpkite-free-search-api-credits`、`zro-moonmath-free-flash-models` 共2筆，政策及線索各0筆；既有未完成825筆，核心來源整筆追查失敗2筆（`perplexity-watch`、`perplexity-education` 官方說明中心文章回傳403阻擋，維持舊時間戳）。未登入、申請或付款。

[Tabnine Basic](https://www.tabnine.com/blog/scaling-enterprise-ai-why-were-sunsetting-tabnine-basic/)官方退役公告永久301重導向至Tricentis AI方案頁，確認退役與整合現狀，維持 `closed`。

[astamuse AI代理試用](https://www.astamuse.co.jp/news/2026/26261008-report/)原索引所稱10/31截止期限已過，官方2026年度新聞彙整無試用公告或延期發布，原公告網址仍404，狀態更正為 `expired`。

[Kakao青年 ChatGPT Plus](https://help.openai.com/en/articles/12677933-chatgpt-for-kakao-overview-and-kakao-tools)OpenAI支援文件確認Kakao促銷排定至2025-12-31截止（時鐘已過）且限韓國門號註冊；青年活動專屬頁回傳404，狀態更正為 `expired`。

[DeepInfra × Two Minute Papers](https://deepinfra.com/papers)專屬推廣頁回傳HTTP 404；/login?deal=2mpapers重導向至一般登入頁且不含贈額承諾，狀態改為 `expired_unverified`，優先級轉為D。

[WorkBuddy Step 5](https://www.workbuddy.ai/docs/workbuddy/Changelog)官方更新日誌至最新5.9.4版均為一般功能改進，無Step 5 Preview或10/25專屬截止活動；[定價頁](https://www.workbuddy.ai/docs/workbuddy/pricing)維持一般個人Free方案，線索已釐清未獲官方支持，更正為 `resolved_rumor_disproven`。

[Lawson AI Pro](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)官方活動頁確認購買與集點応募均已於10月截止，Google Play禮碼領取亦於11/2截止；50點限定之Google AI Pro 3個月免費碼將於2026-11-10 10:00至11-16 23:59 JST開放合格者抽選。

[DeepInfra DeepStart](https://deepinfra.com/deepstart)專頁維持在線並開放申請，限兩年內成立且募資US$250K–$10M新創，提供約500億tokens（DeepSeek V4 Flash價格換算），核准後效期一年。

[Claude Duet](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)官方說明中心昨日更新確認Duet處於研究預覽階段，限美國Pro/Max/Ultra用戶經候選名單加入，不另收費；背景晨報等工作共用方案限額；預覽期贈送1–3次limit resets，效期至2026-12-15。台灣維持No。

[Meta全球AI黑客松](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)Cerebral Valley頁面標示「Registration: Closed (the event has ended)」，作品提交已於11/4 21:00 EST截止，11/4–8為評審期，11/9閉幕式公布得獎名單；狀態更正為 `closed`，優先級轉為D。

[Robinhood Luna](https://robinhood.com/us/en/support/articles/using-gpt-luna/)官方促銷條款確認自2026-09-29至2026-12-31 23:59 ET代付GPT-6 Luna聊天與automations之token成本，需合格Robinhood Agents帳戶（限美國居民/SSN），交易與監管手續費不免。台灣維持No。

[HOSTKEY GPU補助](https://landing.hostkey.com/grant_for_scientific_projects_formhtml)官方申請表仍載明因硬體短缺暫停收件（The free compute program is temporarily suspended due to a shortage of hardware on the market），維持 `applications_closed`。

[Lovable瑞典學籍](https://back-to-school.lovable.app/terms)官方條款確認瑞典大專在學學生至2026-12-31前享Pro免費；2027-01-01起自動轉為50%學生折扣付費方案，有綁卡者自動扣款，未綁卡者不扣款。台灣維持Unknown。

[fal FLUX 3 Max](https://fal.ai/flux-3-max)官方活動頁確認週末免費視窗自美西11/6 09:00至11/9 12:00（台北11/10 04:00），免登入每日3部、登入每日4部、綁卡每日5部（720p 15秒含音訊），24小時滾動重置；期滿按每秒US$0.0425計費。

新增 [SerpKite Free](https://serpkite.com/pricing)：官方提供搜尋與AI代理API，驗證信箱贈1,000點，綁定Google或GitHub加贈1,500點（共2,500點），次月起每月固定贈送1,000點；免信用卡，限速5 req/s，含所有搜尋端點與MCP伺服器；[條款](https://serpkite.com/legal/terms)限滿18歲與單一帳號，台灣帳戶可用但在地發票未測。

新增 [Zro by MoonMath](https://zro.moonmath.ai/pricing)：官方提供開源推論平台Free方案（US$0/月），每日重置GLM-5.3 Flash與DeepSeek V4.1 Flash免費推論用量；OpenAI相容API，零請求保留（zero retention），不使用客戶資料訓練模型；[條款](https://zro.moonmath.ai/terms)嚴禁多帳號套取額度，台灣直連延遲與發票未測。

品質改善：`app.js` 的 `CLOSED_STATUSES`、`tools/prioritize.py` 的 `DEAD` 與 `tests/validate.py` 的 `dead` 統一納入 `resolved_rumor_disproven`（線索已釐清・未獲支持），確保已證偽之傳聞線索嚴格排除於免費專區篩選並正確標記為關閉狀態；於 `tests/filters.cjs` 補齊排除斷言與閉幕樣式驗證，實證攔截通過。

下輪優先：`lawson-restricted-japan` 台北11/10 10:00查[活動頁](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)50點限定之Google AI Pro 3個月免費碼抽選入口；`fal-flux3-max-five-daily-sandbox` 台北11/10 04:00週末免費截止後查[活動頁](https://fal.ai/flux-3-max)回退計費現況；`meta-hackathon-oct2026` 台北11/9查[主辦頁](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)閉幕名單與頁面封存動態；`taipei-youth-ai-subscription-subsidy-2026` 台北11/8查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與11/10最後送達倒數；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止前查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節獎勵關閉情況。

2026-11-07 16:05–16:20 本輪：起始836筆，按實際時區有20筆到期；避開前輪剛核及近期反覆失敗案例。局部複核 `deepgram-speak-attendee`、`kilo-auto-free-hosted-models`、`shift-asia-prototype-twenty-companies`、`ndp-one-oct31-free-full-security-diagnosis`、`adobe-firefly-twelve-month-model-promotion`、`rime-stt-nov19-free-window`、`google-ai-professional-certificate-tw-pro-3mo`、`couchbase-activate-starter-kit-current-availability-watch`、`krutrim-sandbox-oct22-past-banner`、`lets-go2-ai-ocr-launch-six-hundred-pages`、`realads-once-fifty-no-watermark`、`satfaq-free-trial-hybrid-ai-two-thousand-points` 共12筆；新增機會 `elfa-api-free-once-thousand-credits`、`parallel-mcp-keyless-free-search-fetch-decisions` 共2筆，政策及線索各0筆；既有未完成824筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[Deepgram Speak](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳截止時間為美西11/6 23:59 PT（台北11/7 15:59），現已過期；現場badge scan與同企業信箱建帳均已截止，狀態更正為 `applications_closed`。合格專案預定11/13前發放一次性US$500額度，無到期日但專案刪除或帳戶關閉即喪失；公開頁不證實際入帳。

[Kilo Gateway](https://kilo.ai/landing/free-models)維持3款零成本模型（Nemotron 3.5 Super VL、Dots3-Note Preview、Nemotron 3 Ultra），免信用卡；匿名使用者限速200次/小時/IP。11/2新條款生效；NVIDIA端點限試用評估禁止生產使用。

[SHIFT ASIA](https://shiftasia.com/ja/ai-driven-development-free-trial/)與[公告](https://shiftasia.com/ja/news/ai駆動開発テスト無料トライアルキャンペーン/)仍宣傳20社限定受付中，實測諮詢表單仍在線；合意範圍原型0元，剩餘名額與台灣法人核准未核。

[ndp one](https://prtimes.jp/main/html/rd/p/000000038.000139644.html)原10/31免費診斷活動期限已過，未見官方延期；[首頁](https://ndp-one.com/)仍宣傳免費PoC版且註冊表在線，但不證免費完整診斷延長，維持活動現況待核。

[Adobe Firefly](https://helpx.adobe.com/tw/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)實證解析台灣促銷頁DOM模型表格勾選標記：Firefly Pro不含GPT Image 2.5 Sunburst/Flare與Flux 1.1 Pro；低中組態限Pro Plus與Premium，全組態限Premium。[台灣方案頁](https://www.adobe.com/tw/products/firefly/plans.html)列月繳含稅Pro NT$704、Plus NT$1,680、Premium NT$6,825，自動續費；非免費訂閱。

[Rime STT](https://www.rime.ai/pricing)現行FAQ明示STT於所有方案免費至2026-11-19，11/20起Flex每分鐘US$0.002、Scale US$0.0016（時區未列）。Free每月US$50共用不滾存，用盡須升Flex加卡；[條款](https://www.rime.ai/terms)禁止Caller audio與第三方個資。

[Google AI 專業證書](https://one.google.com/offer/terms-and-conditions/google-career-certificates)條款（含直連g1_landing_page=0）均明列2026-11-06截止，時鐘日期已過；[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)仍列2027-01-01。實際兌換入口是否關閉未實測，警示使用者勿單純為此試用而預付US$49課程費。

[Couchbase Capella](https://info.couchbase.com/aws-activate.html)[Starter Kit頁](https://info.couchbase.com/aws-activate.html)與[條款PDF](https://info.couchbase.com/rs/302-GJY-034/images/Couchbase%20Capella%20AWS%20Activate%20%26%20Google%20Cloud%20Startup%20Promotion%20Terms%20and%20Conditions.pdf?version=0)確認AWS Activate與Google Cloud Startup新創資格與商業評估條款；未送件，台灣審核未核。

[Krutrim Sandbox](https://docs.cloud.olakrutrim.com/basics/core-infrastructure/sandbox.md)明確記載按量計費（₹1.56/小時起），無現行₹5,000贈額承諾；首頁免卡不等於免費算力，維持歷史橫幅待核。

[Go2 AI-OCR](https://www.lets-co.com/static/ai/ocr/campaign/index.html)公告OCR預定2026-12-10正式上線（原記載12月中旬）；2026-10-13至2026-12-28簽署新約免首年600頁（等值¥33,000）；仍需年約底座¥264,000含稅，限日本國內。

[RealAds](https://ai.realads.kr/faq)新用戶一次50點免卡宣稱，與[服務條款](https://ai.realads.kr/terms)商用限制及浮水印要求之條款矛盾仍存。

[さっとFAQ](https://www.satfaq.jp/)首頁確認公開試用期30天且初期費用免費（0元）。[11/2公告](https://www.satfaq.jp/news/20261102/)2,000點僅至個別試用截止；未另簽AI方案則試用結束刪除機器人與贈點，非自動扣款。

新增 [Elfa API Free](https://elfa.ai/pricing)：官方提供一次性1,000 credits免費API金鑰，限速60 RPM，可用於AI市場情報摘要與代理資料端點；用盡回傳429需自行升級；[條款](https://elfa.ai/terms)限滿18歲，台灣個案與免卡未核。

新增 [Parallel MCP](https://parallel.ai/blog/decisions-api)：官方提供免帳戶、免金鑰之公開MCP連線，免費提供web_search、web_fetch與新Decisions網頁決策工具（低速限速）；登入OAuth或帶Key則切換至帳戶計費（Decisions API一般US$1/1,000 calls）；[條款](https://parallel.ai/customer-terms)禁止輸出用於模型訓練，個資需簽DPA。

品質改善：`tests/validate.py` 新增 `policy-history.json` 結構與來源驗證（強制每一歷史紀錄之 `change_type` 為非空字串、`sources` 為列表，且所有來源網址必須以 `https://` 開頭），並將既有 offers 來源檢查統一對齊為嚴格 HTTPS；`tests/filters.cjs` 補齊 `applications_closed` 狀態於免費視圖之排除斷言；以空 change_type 與 http 協議之合成案例實證攔截通過。

下輪優先：`deepgram-speak-attendee` 台北11/14查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)11/13發放承諾日後額度發放與頁面封存動態；`taipei-youth-ai-subscription-subsidy-2026` 台北11/8查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與11/10最後送達倒數；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止前查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節獎勵關閉情況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口；`google-ai-professional-certificate-tw-pro-3mo` 每日查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾及實際兌換狀況。

2026-11-07 15:05–15:20 本輪：起始834筆，按實際時區有30筆到期；避開前輪剛核及近期反覆失敗案例。局部複核 `snowflake-ai-trial-2026`、`coreweave-aria-limited-free`、`x-api-xai-spend-credit-rewards`、`claude-scientists`、`anthropic-guest-investigators`、`minimax-design-h3-new-user-watch`、`digitalocean-secret-ai-startup-100-2026`、`hume-startup-forty-million-twelve-months`、`mango-inference-community`、`gmi-a16z-first25-two-k-spend-five-k-credit`、`fujisoft-workforce-ai-security-poc`、`sambacloud-rundown-first100-anniversary-credit-watch` 共12筆；新增機會 `goodmem-cloud-fourteen-day-no-card-trial` 1筆、政策0筆、觀察線索 `airweave-developer-free-ten-connections-fifty-queries` 1筆；既有未完成822筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[Anthropic生命科學徵案](https://www.anthropic.com/news/open-call-guest-investigators-life-sciences)官方[申請表](https://docs.google.com/forms/d/e/1FAIpQLSd2MC_Wwcqr7niezK5697AsC8oKm3MDbCIU7KrIFcfvZFLJGg/viewform)已確認重導向至 [closedform](https://docs.google.com/forms/d/e/1FAIpQLSd2MC_Wwcqr7niezK5697AsC8oKm3MDbCIU7KrIFcfvZFLJGg/closedform?hl=en) 並載明「is no longer accepting responses」，本輪收件確認已截止；介紹頁仍留有Apply按鈕屬殘留連結，狀態更正為 `applications_closed`。入選為8–12週免費合作且不發放對外API額度。

[Snowflake試用](https://www.snowflake.com/en/snowflake-trial/)Data Cloud US$400/30日與[CoCo試用](https://signup.snowflake.com/cortex-code)（US$40推論＋US$360平台）在線；兩註冊頁均可選Taiwan。AI啟用需加卡但不自動升級；CoCo明定有AI與compute用量限制，達限存取可能暫停（非無上限計費），之後US$20/月；功能限制與文檔差異仍存。

[DigitalOcean × Secret](https://www.digitalocean.com/legal/promotional-offer-100-in-digitalocean-credits-for-50-ai-startups-on-secret)首50家US$100額度有效至2027-01-17；Secret年繳US$149或終身US$399。本輪新發現[Secret優惠頁](https://www.joinsecret.com/digital-ocean)承諾未兌領其他優惠且無法取得本優惠時全額退會員費，與[一般條款](https://www.joinsecret.com/terms)§2資格拒絕不退款存在條款衝突。

[Hume新創計畫](https://www.hume.ai/startup-program)瀏覽器成功動態擷取條款：核准贈40,000,000語音點數有效12個月，期滿或耗盡預設自動回退至標準Free方案，非強制自動續訂付費服務；6個月滾動收件期起算日未公布，現時受理未證；[服務條款](https://www.hume.ai/terms-of-use)限內部開發並規範模型訓練資料。

[CoreWeave ARIA定價](https://coreweave.com/forge-pricing/inference-agents)仍列限期免費，[治理文檔](https://docs.coreweave.com/products/aria/governance.md)確認Smart features管理控制限Enterprise與Pro；[Claude科學研究方案](https://claude.com/programs/team-plan-for-scientists)維持Standard US$0與Premium US$15，需有效付款方式，API月額另計且支援Taiwan；[X API贈點文檔](https://docs.x.com/x-api/getting-started/free-credits.md)首購贈US$20、首次自動儲值配對上限US$50且最低US$5，贈額3個月有效；[MiniMax Design](https://design.minimax.io/media-plan/subscribe)確認新戶免費點3天到期；[Mango Inference條款](https://inference.mangoboost.io/terms-of-service)§11.1明定促銷點最長6個月、付費點12個月（日本6個月）；[GMI × a16z](https://www.gmicloud.ai/a16z)消費$2K解鎖$5K，條款禁轉售/穿透；[富士Soft PoC](https://sem-inq.fsi.co.jp/public/application/add/7999)10社30日表單在線；[SambaCloud週年贈額](https://sambanova.ai/build-with-relentless-intelligence-rundown)確認為2025年9月宣傳資產，現行方案需加卡且購點。

新增 [GoodMem Cloud](https://goodmem.ai/cloud)：官方提供全功能託管AI記憶平台免卡試用14天，提供完整API/SDK與實例；[定價](https://goodmem.ai/pricing)列自願升級起價US$15/月，按運算與儲存用量計費；[條款](https://cloud.goodmem.ai/terms)限商務專業用途，期滿未升級實例與資料可能刪除，承諾不以客戶內容訓練或微調模型；台灣帳戶開通未測。

新增觀察線索 [Airweave Developer](https://airweave.ai/)：官方提供免信用卡Developer免費託管方案，含10個連線、每月50次檢索與5萬entities同步；[隱私政策](https://airweave.ai/privacy-policy)明示SaaS全球可存取；[條款](https://airweave.ai/terms-conditions)保留草稿編輯備註，先列watchlist。

品質改善：`tests/validate.py` 新增來源（sources）完整性校驗（強制每個來源之 `scope` 與 `evidence` 均須為非空字串，防止證明責任鏈遺失），以空範圍與純空白合成案例實證攔截通過；並修正 `tools/prioritize.py` 評分重算時 `now` 變數在條件分支中的作用域問題。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳截止後條款更新與發放動態；`taipei-youth-ai-subscription-subsidy-2026` 台北11/8查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與11/10最後送達倒數；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止前查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節獎勵關閉情況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口；`google-ai-professional-certificate-tw-pro-3mo` 每日查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾。

2026-11-07 14:05–14:17 本輪：起始832筆，按實際時區有40筆到期；避開前輪剛核及近期反覆失敗案例。局部複核 `taipei-youth-ai-subscription-subsidy-2026`、`deepgram-speak-attendee`、`deepgram-flux-tts-bonus`、`granola-students`、`amazon-ara-multilingual-contextual-ai-fall-2026`、`neo4j-startup-aura-twentyk-application-unavailable`、`tencent-tokenhub-free-trial`、`kiro-startup-pro-plus-2026`、`river-inference-25-credit`、`manus-startups-redirect-current-unverified` 共10筆；新增機會 `agentset-free-thousand-pages-tenk-monthly-retrievals`、`featherless-chat-twentyfive-unlimited-human-interactive` 共2筆，政策及線索各0筆；既有未完成822筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[臺北青年AI訂閱補助](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)重核青年局首頁、[最新公告](https://youth.gov.taipei/announcement/latest-announcement)及[FAQ](https://youth.gov.taipei/api/v1/file.download?file_id=09f25b49-851e-4271-a040-0b68f10f6034)，未見經費用罄或提前終止公告；須同時符合18–35歲、設籍臺北6個月以上、認可大專院校在學或當年度畢業生，並完成指定AI課程；限8/1–10/31間起訖之完整月訂閱，且最遲須於11/10前書面送達青年局；補助最高NT$4,000（弱勢NT$8,000）；預算餘額與即時受理未核。

[Deepgram Speak](https://deepgram.com/speak-attendee-credit-promotion-terms)促銷條款明定建帳截止為美西時間11/6 23:59 PT，即台北時間11/7 15:59（非16:00 UTC）；10/29舊金山現場掃描資格已截止，合格赴會者須於15:59前以同企業信箱建帳；一次性US$500點數於11/13前發放至合格專案且不逾期；免購買或預存；遠端不符現場資格，台灣個案及法律未核。

[Deepgram Flux TTS](https://deepgram.com/promotions/2026-09/flux-tts-promo-terms-and-conditions)活動至美西12/31 23:59（台北2027/1/1 15:59），限付費Flux TTS用量1:1配對bonus，每專案上限US$500，排除Enterprise及免費贈額；[定價頁](https://deepgram.com/pricing)列Flux TTS每千字US$0.045；[一般條款](https://deepgram.com/terms)§5.3確認PAYG方案預設依餘額門檻自動續訂，非強制促銷條件，可於Billing停用；Growth年約須於期滿前一天解約。

[Granola學生](https://www.granola.ai/students)官方列美英加認可大學在學學生12個月免費Business（標準US$14/人/月）；[Tally申請表](https://tally.so/r/D4KbQ5)於瀏覽器實測正常載入且isClosed=false，必填學生信箱、學校、畢業日及學生證；台灣本地大學學籍不符合條件，在美英加留學者可申請；名額與續費未核。

[Amazon Research Awards](https://www.amazon.science/research-awards/call-for-proposals/multilingual-and-contextual-ai-evaluation-call-for-proposals-fall-2026)徵案受理至美西11/11 23:59 PT（台北11/12 15:59），預計2027年2月通知；入選PI平均獲不超過US$50,000資金與AWS額度（非保證或固定上限）；[AWS額度條款](https://aws.amazon.com/awscredits/)要求有效信用卡，超額與稅費自負，效期依個別碼為準；未登入，台灣機構個案核准未核。

[Neo4j新創](https://neo4j.com/startup-program/)[申請表](https://neo4j.com/startup-program/apply/)於Chromium瀏覽器成功載入，Marketo表單完整、Submit按鈕啟用，Country選單明列Taiwan；修正靜態Markdown提示「表單暫不可用」的誤導。最高US$20,000 AuraDB額度，限Pre-seed至Series B、具多客戶產品與公司網站/LinkedIn；[條款](https://neo4j.com/legal-terms/startup-program-aura/)明列免收計畫參與費；未送件，台灣個案核准與付款未核。

[Tencent TokenHub](https://intl.cloud.tencent.com/document/product/1300/80423)[文檔](https://intl.cloud.tencent.com/document/product/1300/80423)所稱1年與[活動頁](https://www.tencentcloud.com/act/pro/tokenhub)所稱90天效期衝突仍存；每模型100萬Tokens與跨模型共享池說法並列；[說明](https://www.tencentcloud.com/document/product/378/17985?lang=en)確認開通每模型需凍結帳戶US$10，註冊綁卡需US$1預授權驗證；未開啟後付費用盡即停；活動至12/31；台灣個案與付款未測。

[Kiro新創](https://kiro.dev/startups/)2026-12-31前滾動審查最高1年Pro+（2/10/30席），核准立即發放且1年到期；[條款](https://kiro.dev/startups/terms/)中已加入Activate與具活躍額度矛盾仍在；排除名單列China/GCR未界定台灣；[現行定價](https://kiro.dev/pricing/)Enterprise轉為席位credit pooling，與新創Pro+之實際對應未明；未登入送件。

[River Inference](https://console.river.ai/)[首頁](https://console.river.ai/)於Chromium瀏覽器正常開啟註冊入口，但頁面未列現行贈額宣傳；10/11創辦人公告新戶US$25仍屬歷史公告，現時發放未確認；[定價JSON](https://console.river.ai/api/public/pricing)確認各模型按量費率（DeepSeek V4.1 Flash輸入US$0.12/M等）；[商業條款](https://console.river.ai/terms)列年約自動續訂與解約提前60日通知；資料保存說法矛盾仍在。

[Manus新創](https://manus.im/startups)官方維持公開申請暫停、僅由合作VC推薦受理；合格新創估值提供6個月最多20席Team方案；展開FAQ明確載明既有用戶不符合此特定計畫，但可向startups@manus.ai另詢未定福利；台灣個案與期滿條款未核。

新增 [Agentset Free](https://agentset.ai/pricing)：官方託管RAG方案提供永久免費（Forever Free）1,000頁與每月10,000次檢索配額，支援語意搜尋與來源引用；[FAQ](https://agentset.ai/pricing)定義每1,000個解析字元為一頁；[Quickstart](https://docs.agentset.ai/get-started/quickstart.md)範例串接外部OpenAI金鑰，外部生成模型費用另計；[條款](https://agentset.ai/terms)未列國家限制，台灣帳戶與免卡未實測。

新增 [Featherless Chat](https://featherless.ai/pricing)：官方提供每月US$25不限Tokens、不限月請求數聊天方案，可調用40,000+開源模型；[限制說明](https://featherless.ai/docs/concurrency-limits)限制32K Context與4個並行容量單位（70B以上模型需4單位）；明確禁止用於Coding Agents、Production API、背景自動化或轉售，僅限本人互動對話；Stripe結帳，月度自動續約，台灣發卡行與稅費未核。

品質改善：`tests/validate.py` 新增 `attempted_failed_ids` 完整性校驗（強制查核失敗案例必須更新 `last_review_attempt_at >= run['started_at']`、填寫非空 `last_review_attempt_reason`，且嚴格禁止誤刷 `verified_at`），防止追查失敗案例假冒成功複核或遺失失敗診斷；以過期時間、空理由與誤更 verified_at 之合成案例實證攔截通過；並修正 `tools/prioritize.py` 評分重算時保留 `latest_research_at` 時間戳記之一致性問題。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳截止後官方條款現況與發放前動態；`taipei-youth-ai-subscription-subsidy-2026` 台北11/8查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與11/10最後送達倒數；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止前查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節獎勵關閉情況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口；`google-ai-professional-certificate-tw-pro-3mo` 每日查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾。

2026-11-07 13:05–13:17 本輪：起始830筆，按實際時區有46筆到期；避開前輪剛核及近期反覆失敗案例。局部複核 `antigravity-free`、`beatapi-free-models-zero-balance`、`articul8-bivia-early-adopter-billion-tokens`、`autoclaw-halloween-40m-expiry-conflict-watch`、`cyleague-cyber-navi-trial`、`daytona-startup-amount-conflict`、`airtop-free-monthly-thousand-signup-bonus-conflict`、`did-mobile-fourteen-day-twelve-credit-trial-scope-watch`、`sambanova-access-policy` 共9筆；新增機會 `e2b-hobby-free-hundred-dollar-credits` 1筆，政策0筆，觀察線索 `autoclaw-weekly-perk-november-nine-hundred-million-tokens` 1筆；既有未完成821筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[Antigravity模型表](https://antigravity.google/docs/models)確認Claude Sonnet 4.6、Claude Opus 4.6與GPT-OSS 120b正式除役註記標為2026-11-18，Gemini 3.8 Flash維持免費；個人方案US$0/月代理每週限額維持；[FAQ](https://antigravity.google/docs/faq/)列Taiwan及18歲個人Google帳戶。

[BeatAPI免費模型文檔](https://docs.beatapi.io/free-models)確認三款免費文字模型（-free後綴）零餘額與未儲值可調用；決策（JEV）模型已於2026-11-05除役；未儲值帳戶限速1次/分鐘成功請求，儲值後至多10次/分鐘；hy4-free推理token計入輸出上限。

[Articul8 Bivia](https://www.articul8.ai/bivia)確認前1萬名早鳥贈10億tokens、免訂閱活動仍刊載且註冊帶code=bivia，標價輸入US$0.042/M、輸出US$0；剩餘名額與台灣法人資格未核。

[AutoClaw萬聖節公告](https://autoclaw.z.ai/blog/news/M11W1/)4,000點活動持續至11/8 23:59 UTC+8，同文正文11/8與注意事項11/1效期衝突未解；11/4–5加碼100M已結束；官方另於11/6公告11/9–15每帳戶1億Tokens週福利。

[CyLeague](https://www.cyleague.jp/service/cyber-navi/)法人試用延長至30天且上限40件キャンペーン至11/30截止仍列示；FAQ明確載明輸入資料不用於模型訓練或微調；正式Starter年費60萬日圓未稅。申請表403與台灣法人審核未解。

[Daytona新創專頁](https://www.daytona.io/startups)仍宣稱最高US$100K額度，與[定價頁](https://www.daytona.io/pricing)所列最高US$50K之額度矛盾仍存；台灣個案與正式條款未重核。

[Airtop停服公告](https://portal.airtop.ai/shutdown)確認11/13停服且關閉新註冊與升級持續有效；[定價頁](https://airtop.ai/pricing)頂部預告新專案但下方殘留Free 1,000點與10,000迎新標價，保留來源矛盾。

[D-ID訂閱總覽](https://help.d-id.com/hc/en-us/articles/31234293852433-Understanding-subscriptions-key-information-you-should-know)仍列示「Free Trial – 14 days of unlimited use」，與[手機試用說明](https://help.d-id.com/hc/en-us/articles/31288639829009-How-do-I-start-a-trial-on-the-D-ID-mobile-app)需選方案綁卡及扣點之衝突仍存。

[SambaNova rate-limits文件](https://docs.sambanova.ai/docs/en/models/rate-limits.md)明確定義未綁卡Free Tier之各模型20 RPM/20 RPD/200K TPD限額，與[Plans頁面](https://cloud.sambanova.ai/plans)首請求需綁卡購點之要求並存；Preview限評估實驗。

新增 [E2B Hobby](https://e2b.dev/pricing)：官方提供一次性US$100使用額度，免綁信用卡，支援最多20個並發沙箱，單一session上限1小時，提供10 GiB免費磁碟；預設2 vCPU及4 GiB RAM每秒約US$0.000046，US$100約可運行600小時；額度用盡沙箱停止無扣款風險；台灣支援GitHub/Google登入。

新增觀察線索 [AutoClaw週福利](https://autoclaw.z.ai/blog/news/M11W2/)：官方11/6公告11/9 00:00至11/15 23:59 UTC+8登入可領取1億Tokens（等值10,000點），統一於11/15 23:59到期；排定期間登入即可領取。

品質改善：`tests/validate.py` 新增 S-Tier 雙向一致性校驗（強制所有被標為 S-Tier 的紀錄均必須符合 `taiwan == 'Yes'` 且 `status not in dead`），避免非台灣適用或過期案例誤入 S 級篩選；並新增全部來源 URL 必須具備 `http://` 或 `https://` 協議之格式校驗；以偽造無效案例實證攔截通過。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限已過現況；`taipei-youth-ai-subscription-subsidy-2026` 台北11/7 14:07後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與預算剩餘；`autoclaw-halloween-40m-expiry-conflict-watch` 台北11/8 23:59截止前查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)萬聖節獎勵關閉情況；`autoclaw-weekly-perk-november-nine-hundred-million-tokens` 台北11/9 00:00開跑後查[活動頁](https://autoclaw.z.ai/blog/news/M11W2/)1億Tokens領取入口；`google-ai-professional-certificate-tw-pro-3mo` 每日查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾。

2026-11-07 12:05–12:18 本輪：起始827筆，按實際時區有54筆到期；避開前輪剛核案例。局部複核 `synthesia-basic-monthly-ten-min-five-hundred-no-download`、`aocai-working-free-ai-courses-2026`、`fireworks-glimmer-sft`、`speechify-api-free-monthly-500k`、`bazaarlink-taiwan-free-model-gateway`、`retool-nonprofit-monthly-coupon`、`sarvam-campus-tour-credits`、`claude-security-enterprise-two-month-credit`、`project-hatcher-sparklabs-taiwan-2026` 共9筆；新增機會 `runway-builders-startup-up-to-five-hundred-k-api-credits`、`sail-startups-up-to-ten-k-shared-inference-sailboxes` 共2筆，政策0筆，觀察線索 `gmi-scale-cohort-three-spring-2027-credits-watch` 1筆；既有未完成818筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[Synthesia Basic](https://www.synthesia.io/pricing)確認每月含10分鐘影片或配音、3次問卷回覆，另有500共享credits；[首頁](https://www.synthesia.io/)宣傳免費開始免信用卡；影片有浮水印且無法下載；credits每月重置不結轉。[Syren促銷說明](https://help.synthesia.io/en/articles/17697950-how-do-syren-credits-work)列新戶1,000專用點至2026/11/9 23:59 BST到期，定價頁仍稱有效一個月，衝突待核；超額自下次加值扣除。

[經濟部在職AI課程](https://serv.gcis.nat.gov.tw/AOCAI/)五大服務業課程免費學習；[台北11/11班](https://ievents.iii.org.tw/EventS.aspx?t=0&id=3535)公開頁仍提供[報名入口](https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3535)，公告受理至11/9 23:59，遴選通過免學費，實體可到者優先；午餐自理，預計100人與表單300人上限之差異仍存，不保證席次。

[Fireworks定價](https://fireworks.ai/pricing)確認Muse Glimmer 30B LoRA SFT免費至11/30且免卡；[Cookbook](https://docs.fireworks.ai/fine-tuning/training-api/cookbook/muse-glimmer.md)明列工作須於2026-12-01T00:00:00-08:00（台北12/1 16:00）前啟動；訓練內evaluation sampling按token另計（預設80次取樣），部署按GPU小時計費，排除RL/DPO及全參數。

[SpeechifyAI API定價](https://speechify.ai/pricing/llms-full.txt)Free方案免卡、每月單一共用美元餘額（約50萬字元），含商用；Simba 3.5促銷至11/21期間為500K、之後250K，精確截止時刻未公布；Free用盡暫停且不能加值。[API限制](https://docs.speechify.ai/build/guides/concepts/api-limits.md)列每帳戶共用3並發、1 RPS及burst 10。

[BazaarLink免費目錄](https://bazaarlink.ai/free)目前列5款模型；/free仍載無餘額10 RPM/60加權單位每日、有餘額20 RPM/120單位每日跨模型共池，與[文件](https://bazaarlink.ai/docs.md)逐模型計費之衝突仍存；[搜尋](https://bazaarlink.ai/solutions/web-search)每次收費US$0.008–0.016；[條款](https://bazaarlink.ai/terms)最新生效日2026-11-01，受台灣法律管轄。

[Retool非營利計畫](https://docs.retool.com/support/discount-programs)提供每月US$1,625訂閱券（涵蓋Team或Business最多25席月繳Standard），排除Enterprise與年約；[文件](https://docs.retool.com/support/billing-usage/ai-credits)列Team 750/Business 1,500點與[定價頁](https://retool.com/pricing)1,000/3,000點差異仍未解。

[Sarvam校園巡迴](https://www.sarvam.ai/sarvam-campus)原始HTML確認11/3 Pune場次狀態標為completed且按鈕disabled；其餘35場仍列tentative，目前尚無確認開放報名之校園；額度數字及期限未公開。

[Claude Security公測說明](https://support.claude.com/en/articles/14661296-use-claude-security)列Enterprise組織連續兩月各最高US$25,000專用額度，2026/12/31 UTC截止；[條款](https://www.anthropic.com/legal/promotion-credit-terms)僅抵Security用量，底座[Enterprise](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)年約自助最低20席、業務輔助最低50席（US$20/席/月年繳）。

[Project Hatcher加速器](https://project-hatcher.sparklabstaiwan.com/)確認2026期6/15–7/26截止、11月下旬Showcase；資格明列Taiwan-based或具實質台灣連結均可，非僅限台灣立案公司；申請表目前HTTP 401未開放。

新增 [Runway Builders](https://runway.com/product/builders)：官方受理Seed至Series C新創申請最高500,000 API credits及Tier 5存取；[條款](https://runway.com/terms-of-use)要求顯示Powered by Runway並受一般訓練與帳戶限制；台灣法人資格及額度效期未公開。

新增 [Sail for Startups](https://www.sailresearch.com/startups)：自籌及已募資新創可申請最高US$10,000免費額度，由模型推論與Sailboxes共用；[條款](https://sailresearch.com/terms)限內部商業用途；台灣帳單資格及超額計費未核。

新增觀察線索 [GMI SCALE第三期](https://gmicloud.ai/scale)：官方列2027春季AI新創計畫，錄取提供US$500 MaaS額度及最高US$4,500 1:1儲值匹配；正式額度條款待開課前確認。

品質改善：`tests/validate.py` 新增批次核實時間視窗（`verified_at >= run['started_at']`）與時間順序檢查（`next_review_at >= verified_at`），嚴格防範未更新查核時間的舊案例被誤列入reviewed_ids或下次複核時間早於本次核實；以過期時間實證攔截通過。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 台北11/7 14:07後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與預算；`google-ai-professional-certificate-tw-pro-3mo` 每日查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾；`fal-flux3-max-five-daily-sandbox` 每日及11/10 04:00後查[活動頁](https://fal.ai/flux-3-max)週末免費期滿現況；`aocai-working-free-ai-courses-2026` 台北11/9 23:59截止前查[活動頁](https://ievents.iii.org.tw/EventS.aspx?t=0&id=3535)報名與錄取狀態。

2026-11-07 11:05–11:10 本輪：起始826筆，按實際時區有56筆到期；避開前輪剛核及反覆403/404失敗案例。局部複核 `coreweave-forge-free-pricing-transition`、`vast-startup-spend-match`、`felo-standard-free-new-user-daily-two-hundred-campaign`、`freshservice-agent-studio-promotion-extension` 共4筆；新增機會 `augment-code-trial-thirty-thousand-credits` 1筆，政策及線索各0筆，既有未完成822筆，核心來源整筆追查失敗0筆。未登入、申請或付款。

[CoreWeave Forge定價](https://coreweave.com/forge-pricing)列學術研究方案申請制獲200GB免費儲存與限時推論額度；[推論限制文件](https://docs.coreweave.com/products/inference/serverless/usage-limits.md)明定依請求IP地理限制、非支援地區回傳403，並發超額回傳429，Free預設消費上限US$100/月，付費需預付。台灣個案及實際付款未核。

[Vast新創專頁](https://vast.ai/startup)按核實compute消費等額匹配至個案上限，無預先贈額；[帳單文件](https://docs.vast.ai/guides/reference/billing.md)明列頻寬依每byte在所有狀態持續收費（$/TB），停止實例仍計磁碟費。信用卡未用餘額可申請退款，已消費點數絕不退款，與[2018版條款](https://console.vast.ai/terms/)全額不退之衝突仍存。

[Felo定價](https://felo.ai/zh-Hant/pricing)新用戶限時每日贈送200點數，當日有效、次日過期不累計；1點數=US$0.001，耗盡回退免費普通搜尋，進階功能暫停，日常搜尋永久免費。Pro每月15,000點數加每日200點數，點數用盡每天仍可300次Pro搜尋；活動截止未公告。

[Freshservice支援文件](https://support.freshservice.com/support/solutions/articles/50000012644-free-ai-agent-studio-access-for-growth-pro-and-enterprise)與[FAQ](https://support.freshservice.com/support/solutions/articles/50000013885-ai-agent-studio-faqs)確認Freddy AI Agent Studio促銷免費至2026/12/31，限Growth、Pro及Enterprise客戶，排除MSP模式；期滿定價待公布，需依附底座付費訂閱。

新增 [Augment Code](https://www.augmentcode.com/pricing)：[官方部落格](https://www.augmentcode.com/blog/our-new-credit-based-plans-are-now-live)列新戶綁卡提供30,000點數試用池，按週期重置不滾存；標準方案為團隊每月固定US$20（含最多50席與US$20額度）。[社群條款](https://www.augmentcode.com/legal/community-terms-of-service)§1.8授權以用戶程式碼與輸出訓練模型，§1.6(g)禁止多帳號延長試用；自動續約且原則不退款。台灣信用卡及扣款個案未核。

品質改善：`tests/validate.py` 新增 `policy-history.json` 參照完整性（referential integrity）檢查，強制所有歷史紀錄之 `record_id` 均須存在於 `offers.json`；以既有 1,961 筆歷史紀錄實證通過。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 台北11/7 14:07後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告與預算；`google-ai-professional-certificate-tw-pro-3mo` 每日查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾；`fal-flux3-max-five-daily-sandbox` 每日及11/10 04:00後查[活動頁](https://fal.ai/flux-3-max)週末免費期滿現況；`augment-code-trial-thirty-thousand-credits` 月查或有新訊號時查[定價](https://www.augmentcode.com/pricing)與[社群條款](https://www.augmentcode.com/legal/community-terms-of-service)試用期滿扣款及台灣卡驗證。

2026-11-07 10:05–10:10 本輪：起始826筆，按實際時區有56筆到期；避開前輪剛核案例。局部複核 `taiwan-hrd-free-ai-introduction-2026`、`grammarly-student-annual-half-first-period` 共2筆；新增各類0，既有未完成824，核心來源整筆失敗0。未登入、申請或付款。

[e等公務園課程](https://elearn.hrd.gov.tw/info/10042743)公開頁列2026全年、任何人及認證條件，但未列費用；原免費證據是數發部[2024年另一專區公告](https://moda.gov.tw/press/press-releases/13258)，不能證明本課2026免費。費用由零改未知並移出免費專區，不代表已確認收費。[Grammarly稅務說明](https://support.grammarly.com/hc/en-us/articles/33154429182861-Is-tax-included-in-the-subscription-cost)稱稅可能另列或包含，修正「稅另計」；[退款政策](https://support.grammarly.com/hc/en-us/articles/360049189071-Can-I-get-a-refund)稱僅法律要求時退款，台灣法律及實際結帳未核。台灣學生表單列部分學校，不保證個案核准。

研究員另查 `vast-startup-spend-match`（頻寬可能計費、退款文件差異仍存）及 `coreweave-forge-free-pricing-transition`（推論依請求IP限制、台灣未列；學術方案須非營利研究及學術電郵），未整合、不計R。[Lunary](https://lunary.ai/pricing)教育及非營利折扣需聯絡、金額未公布，新workspace須先付款；Patronus舊優惠頁轉址，現行額度未核，均不新增。不要以舊公告或搜尋摘要推定現行優惠。

下輪優先：`deepgram-speak-attendee` 11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 排定時間後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收及預算；`google-ai-professional-certificate-tw-pro-3mo` 查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與台灣頁截止矛盾；`coreweave-forge-free-pricing-transition` 查[方案](https://coreweave.com/forge-pricing)學術資格及[推論限制](https://docs.coreweave.com/products/inference/serverless/usage-limits.md)；`vast-startup-spend-match` 查[帳單](https://docs.vast.ai/guides/reference/billing.md)與[條款](https://console.vast.ai/terms/)退款差異及頻寬費用。

2026-11-07 09:05–09:08 本輪：起始825筆，按含時區期限09:05有57筆到期；避開前輪剛核及尚未到期項目。局部複核 `vultr-match-ai-compute`、`coderabbit-startup-annual-half-six-months`、`fastino-glideis1-ten-credit-payment-verification` 共3筆；新增機會 `fibery-education-nonprofit-half-price` 1筆，政策及線索各0，未完成822，整筆來源追查失敗0。未登入、申請、兌換或付款。

[Fibery定價](https://fibery.com/pricing)列教育及非營利組織五折；[教育](https://the.fibery.io/@public/forms/XGkWgfEf)及[非營利](https://the.fibery.io/@public/forms/13DHmF57)表單稱全球及免文件，但須申請，台灣實際核准與折後結帳未知。這是付費訂閱，AI點數按方案及席位限量；[條款](https://fibery.com/terms)列自動續約、稅另計及額外用量須啟用。

[CodeRabbit條款](https://www.coderabbit.ai/legal/terms-of-service)補明客戶因故終止的預付未用費退款例外，與[取消說明](https://kb.coderabbit.ai/articles/6164059373-can-i-cancel-my-annual-subscription)的續約通知差異仍未解；[Fastino條款](https://agent.fastino.ai/terms)重大變更異議退款例外已補，優惠碼現時可否兌換未知。[Vultr Match](https://www.vultr.com/match/)核心頁由研究員成功讀取、優惠限制頁仍403；GPU及台灣付款未核。這些是局部核實，不表示其餘條件或法律已核。資料修正使退款例外可見；未修改前端。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)；`taipei-youth-ai-subscription-subsidy-2026` 排定時間後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告；`google-ai-professional-certificate-tw-pro-3mo` 查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與台灣頁截止矛盾；`vultr-match-ai-compute` 查[優惠限制](https://www.vultr.com/coupons/)及GPU；`coderabbit-startup-annual-half-six-months` 向官方確認[取消](https://kb.coderabbit.ai/articles/6164059373-can-i-cancel-my-annual-subscription)與[條款](https://www.coderabbit.ai/legal/terms-of-service)通知期限。

2026-11-07 08:05–08:10 本輪：起始825筆，08:05依時區比較59筆到期；避開上輪剛核與近期整筆失敗案例。局部複核 `codeai-hour-of-ai-2026`、`mem0-hobby-memory-api`、`runable-free-daily-fifteen-hundred-monthly-cap` 共3筆，新增各類0、既有未完成822、整筆來源追查失敗0；未登入、申請或付款。

[Hour of AI FAQ](https://hourofai.org/en-US/faq)稱活動全年提供，[指南](https://hourofai.org/en-US/how-to)列整體報名可選，12/11不是統一截止；個別活動之帳戶、費用和台灣可用性仍須另查。[Mem0](https://docs.mem0.ai/platform/pricing.md)前30天模型費由其負擔，BYOK模型另付，[免費條款](https://mem0.ai/terms)授權包含輸入輸出供模型訓練及改善，刪除對既有授權影響未核。[Runable FAQ](https://runable.com/faq)每日1,500、每月最多使用15,000每日免費點；先扣月額及加購點，再扣每日點，付費訂閱續約及選用自動補點可能扣款。三者台灣個案均未核。

品質改善：資料驗證新增批次ID存在、去重、集合互斥、未複核數及時間一致性檢查；以不存在的批次ID實證攔截。研究員另查 `taipei-youth-ai-subscription-subsidy-2026`、`fastino-glideis1-ten-credit-payment-verification`、`vultr-match-ai-compute`、`coderabbit-startup-annual-half-six-months`，未整合、不計R。Vultr活動需預存、GPU是否適用未明；青年補助尚未到本輪排定時點，餘額及是否停收仍未知。

新線索：[Fibery教育／非營利五折](https://fibery.com/pricing)，申請表稱全球、任何方案及免文件，但續訂折扣與台灣實單未核；[Sana舊免費額度說明](https://support.sana.ai/en/articles/157324-sana-agents-free-team-civic-and-enterprise-tiers)與[現行定價](https://sanalabs.com/products/sana/pricing)呈現不一致，新戶能否建立免費workspace未核，均不新增。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 到期查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否停收；`google-ai-professional-certificate-tw-pro-3mo` 到期核[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與台灣頁截止矛盾；`vultr-match-ai-compute` 查[活動](https://www.vultr.com/match/)GPU適用與預存；`coderabbit-startup-annual-half-six-months` 查[條款](https://www.coderabbit.ai/legal/terms-of-service)與取消知識庫通知期限衝突。

2026-11-07 07:05–07:11 本輪：起始824筆；07:05按含時區期限計60筆到期、另14筆僅日期皆尚未到期。避開剛核及近期反覆失敗案例，局部複核 `ugreen-ai-nas-hackathon-2026`、`plaud-preview-one-time-work-credits`、`videogen-model1-selected-project-credit-program` 共3筆；新增機會 `octoparse-ai-free-new-user-five-credit` 1筆、政策及線索各0，既有未完成821、整筆來源追查失敗0。未登入、申請或付款。

[Octoparse AI](https://www.octoparse.ai/)僅Windows，Free基本流程免費，新戶一次US$5 AI點數，[定價](https://www.octoparse.ai/pricing)列後續按用量付費，非每月額度或AI無限免費；台灣、免卡及耗盡後行為未知。[取消說明](https://www.octoparse.ai/helpcenter/en/articles/9755747-how-to-cancel-your-current-free-trial-subscription)稱Free無循環費、付費試用會續訂且提前1天取消；[一般條款](https://www.octoparse.ai/terms-and-conditions)列月訂提前7天、年訂30天，矛盾未解。

[UGREEN正式規則](https://ugreenhackathon.devpost.com/rules)瀏覽器可讀，初賽不需影片、台灣列合格居住地，入圍設備限指定一天；[宣傳頁](https://ai.ugreen.com/pages/ugreen-hackathon)流程卻列影片，其FAQ與規則一致，日期亦有不同，保留衝突。[Plaud](https://support.plaud.ai/hc/en-us/articles/63632158871705-Trial-credits-how-many-you-get-when-they-expire-and-renewals-for-v4-0-x-or-later)同帳戶點數跨裝置共用，耗盡不自動購點；[VideoGen](https://videogen.io/model-1)US$100萬為選案總池、並非每人額度，台灣個案均未核。

品質改善：詳情的「最近來源追查」現在同列失敗原因，與成功核實時間分開；原日期及原因保留歷史，不因後來成功複核而改寫。研究員另讀 `fastino-glideis1-ten-credit-payment-verification`、`codeai-hour-of-ai-2026` 與 Google課程條款，未整合、不計R；[Fibery教育及非營利五折](https://fibery.com/pricing)台灣審核及續訂折扣未核，待查再考慮新增。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否經費用罄停收；`google-ai-professional-certificate-tw-pro-3mo` 到期查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)及台灣頁截止矛盾；`fastino-glideis1-ten-credit-payment-verification` 查[付款條款](https://agent.fastino.ai/terms)與優惠能否兌換；`octoparse-ai-free-new-user-five-credit` 到期查[取消說明](https://www.octoparse.ai/helpcenter/en/articles/9755747-how-to-cancel-your-current-free-trial-subscription)及[條款](https://www.octoparse.ai/terms-and-conditions)衝突、台灣資格與點數效期。

2026-11-07 06:05–06:11 本輪：起始823筆，06:05按時間比較59筆到期（含6筆已截止）；避開剛核的Genspark與OpenCode。局部複核 `upstage-once-ten-credit` 1筆；新增機會 `tessl-free-monthly-thousand-shared-credits` 1筆、政策及線索各0，既有未完成822。`perplexity-watch`、`perplexity-education`、`tabnine-basic-free-retired`、`astamuse-agent-trial-oct31-index-only`、`deepinfra-two-minute-papers-twenty-credit` 核心來源追查失敗，計5筆、不刷新核實時間；前兩項403，Tabnine轉址，後兩項原活動頁404，均不據此判定終止。未登入、申請或付款。

[Tessl Free](https://tessl.io/pricing)每月1,000點、免卡，review、eval及代理共用且每月到期；[條款](https://tessl.io/policies/terms)禁止藉多帳號取得額外免費額度，免費公開workspace內容可用於訓練、設定可退出，台灣個案及第三方費用未核。[Upstage FAQ](https://console.upstage.ai/docs/resources/faq)動態展開後稱組織擁有者可設定用完額度即停；執行最多延遲一秒、可能仍有少量超額，不是絕對硬停。頁面文字抽取只顯示折疊問題時，需展開答案再記錄。

研究員另核 `antigravity-free` 模型表11/18移除日期、`ugreen-ai-nas-hackathon-2026` 正式規則、`fastino-glideis1-ten-credit-payment-verification` 付款條款，未整合、不計R；UGREEN宣傳頁與正式規則仍衝突。Inferless定價頁10小時及US$30兩種說法關係不明、註冊入口DNS失敗，與Baseten關係未釐清，未新增；Parea未取得優惠證據。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)有無經費用罄停收；`google-ai-professional-certificate-tw-pro-3mo` 查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)及台灣頁截止矛盾；`ugreen-ai-nas-hackathon-2026` 查[正式規則](https://ugreenhackathon.devpost.com/rules)及更新公告釐清日期和影片衝突；`antigravity-free` 11/18–19核[模型表](https://antigravity.google/docs/models)移除情況。

2026-11-07 05:05–05:10 本輪：起始822筆，開始時按實際時區59筆到期、14筆僅日期另計；避開上輪剛核及近期反覆失敗案例。局部複核 `genspark-free-and-standard-pools`、`opencode-accountless-free-models` 共2筆；新增機會 `mindee-fourteen-day-two-hundred-credit-trial` 1筆、政策及線索各0，未完成820、整筆來源追查失敗0。未登入、申請、付款或處理文件。

[Mindee試用](https://docs.mindee.com/account-management/plans)14天200點、每文件最多10頁，[首頁](https://www.mindee.com/)稱免卡；預設擷取每頁1點但模型及選項可能不同。期滿想繼續才選訂閱，付費超額及稅另計；一般商業條款列自動續約及至少30日不續通知，台灣個案未核。[Genspark條款](https://www.genspark.ai/terms)泛稱付費無限聊天，與[方案](https://www.genspark.ai/helpcenter/membership-plans)及[點數](https://www.genspark.ai/helpcenter/credits-guide)的模型與用量限制並列，勿推定新戶無限。[OpenCode模型文件](https://opencode.ai/docs/console/models/)警告Nemotron 3.5 Lightning Free僅試用且勿提交個資或機密，使用會記錄供安全及改善產品；模型資料規則不同。

研究員另查 `mem0-hobby-memory-api`、`upstage-once-ten-credit`、`antigravity-free`，未整合、不計本輪複核；Upstage預算控制及Mem0免費資料授權值得下輪核對。Scite學術折扣金額、台灣資格與適用方案仍未公開，既有線索不新增。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`google-ai-professional-certificate-tw-pro-3mo` 查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與台灣頁截止矛盾；`upstage-once-ten-credit` 查[預算FAQ](https://console.upstage.ai/docs/resources/faq#how-can-i-set-a-budget-limit)及超額；`mem0-hobby-memory-api` 查[定價FAQ](https://docs.mem0.ai/platform/pricing)與[服務條款](https://mem0.ai/terms)資料授權及BYOK。

2026-11-07 04:05–04:11 本輪：起始822筆，按實際時區60筆到期、另14筆僅日期；避開上輪剛核與近期來源失敗案例。局部複核 `qoder-lite`、`datacamp-free-access-week-november-2026` 共2筆；新增各類0、未完成820、整筆來源追查失敗0。未登入、申請或付款。

[Qoder動態價目](https://qoder.com/pricing)與[活動文件](https://docs.qoder.com/events/newbogo)目前均列Lite每月US$10未含稅、基本1,000點、首購另1,000及續訂另500；修正舊價目衝突仍待重查的說法，歷史保留。實際訂單、活動截止及台灣付款未知；自動續訂需注意提前取消。[DataCamp活動](https://www.datacamp.com/campaign/free-access-week-november-2026)至台北11/9 12:59，限個人指定學習內容，排除AI Tutor，台灣個案未核。

研究員另查Antigravity、Genspark與臺北青年補助，未整合、不計本輪複核；Genspark一般[條款](https://www.genspark.ai/terms)概述付費方案「unlimited AI chat」，與較具體方案額度說明需一併判讀。新線索：[RemNote教育優惠](https://help.remnote.com/en/articles/6813476-how-do-i-get-the-education-discount)列Pro教育折扣，但台灣與Pro+AI折扣適用仍需釐清；[GitKraken學生優惠](https://www.gitkraken.com/github-student-developer-pack-bundle)列六個月，AI額度單位與[FAQ](https://help.gitkraken.com/general/gitkraken-ai-faq/)不同，付款及台灣個案未核，均暫不新增。

下輪優先：`deepgram-speak-attendee` 台北11/7 16:00後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 到期查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)停收公告；`google-ai-professional-certificate-tw-pro-3mo` 查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與台灣頁截止矛盾；`genspark-free-and-standard-pools` 查[方案](https://www.genspark.ai/helpcenter/membership-plans)與[條款](https://www.genspark.ai/terms)額度口徑；`antigravity-free` 查[模型表](https://antigravity.google/docs/models)11/18移除時程。

2026-11-07 03:05–03:09 本輪：起始822筆，依實際時區60筆複核到期、14筆僅日期另計；避開上輪剛核及近期反覆失敗項目。局部複核 `retool-education-monthly-discount` 與 `satfaq-ai-trial-index` 共2筆；新增機會、政策及線索各0，未完成820，整筆來源追查失敗0。未登入、申請或付款。

[Retool折扣](https://docs.retool.com/support/discount-programs)限在學學生與個人教師申請月繳Team／Business，台灣教育信箱及付款未核。[點數文件](https://docs.retool.com/support/billing-usage/ai-credits)列每月750／1,500點，[定價頁](https://retool.com/pricing)列1,000／3,000點，衝突未解；Agent另計，一般Cloud表列每月最多20小時免費，但教育帳戶是否適用未核。補充此上限避免誤解為完全沒有免費時數。

[さっとFAQ既有客戶活動](https://www.satfaq.jp/news/20260918_2/)限Basic以上、租戶契約者啟用，2,000點至12/31，不可加購；期滿不簽AI方案會刪除機器人與贈點，底座另有費用；台灣締約未知。研究員另查Genspark及Felo，未整合、不計複核，Felo動態頁正文及新戶活動條件未完整核實。

新線索：[Wiro Fellow](https://wiro.ai/fellow)學生通過審核獲US$50點數，貢獻晉級每級另US$50、最高US$250；但其指定[申請入口](https://wiro.ai/student-fellow)本輪404，不能據此判定活動結束，台灣資格及點數效期未核。與既有 `wiro-student-200-credit` 資格及利益不同；先追查入口，不新增紀錄。

下輪優先：`deepgram-speak-attendee` 台北11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`google-ai-professional-certificate-tw-pro-3mo` 到期查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)與[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾；`felo-standard-free-new-user-daily-two-hundred-campaign` 查[定價](https://felo.ai/zh-Hant/pricing)活動身分及點數池；`retool-education-monthly-discount` 查[點數文件](https://docs.retool.com/support/billing-usage/ai-credits)與[定價](https://retool.com/pricing)差異。

2026-11-07 02:05–02:09 本輪：起始822筆，其中57筆含時區期限已到期；另14筆僅日期的期限均在未來。避開前輪剛核及近期失敗案例，局部複核 `google-flow-fifty-daily-credit-subscription-conflict-watch`、`google-ai-professional-certificate-tw-pro-3mo` 共2筆；新增各類0筆、既有未完成820筆、核心來源整筆追查失敗0筆。未登入、生成、申請或付款。

[Google Flow入門](https://support.google.com/flow/answer/16353333?hl=en)與[額度](https://support.google.com/flow/answer/16526234?hl=en)現均列無訂閱每日50點，原訂閱資格矛盾解除；[支援地區](https://support.google.com/flow/answer/16353544?hl=en)列台灣，須18歲及年齡驗證，尖峰可能無法生成影片。原線索保留ID改列機會，個別帳戶及是否需付款驗證未核。

[Google台灣課程頁](https://grow.google/intl/zh-TW_tw/ai-professional/)稱US$49/月、附三個月AI Pro試用，2027/1/1前兌換；頁面連結的[Google One條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)現列2026/11/6截止，時區及實際兌換未知，不應在釐清前為試用先付款。條款要求合格付款方式、期滿自動續費；未推定系統已關閉。

研究員另查Retool、Runable、DataCamp與台灣公務人力發展學院案例，未整合、不計複核。[Akiflow學術折扣](https://akiflow.com/pricing)列合格大學生及研究者Pro年繳減價40%、含Aki，但台灣學術信箱、實際折後價及續費未知；[Scite學術折扣](https://scite.ai/partners/students)須推薦機構採購，折扣幅度未公布，暫不新增。

下輪優先：`google-ai-professional-certificate-tw-pro-3mo` 每日查[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)及[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)截止矛盾；`deepgram-speak-attendee` 台北11/7 15:59後查[建帳期限](https://deepgram.com/speak-attendee-credit-promotion-terms)；`taipei-youth-ai-subscription-subsidy-2026` 到期查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`datacamp-free-access-week-november-2026` 查[活動條款](https://www.datacamp.com/campaign/free-access-week-november-2026)及11/9 12:59台北時間截止；`retool-education-monthly-discount` 查[AI點數文件](https://docs.retool.com/support/billing-usage/ai-credits)與[定價](https://retool.com/pricing)矛盾。

2026-11-07 01:05–01:09 本輪：起始821筆、54筆到期（含截止及證據缺口）；優先處理剛跨時間邊界的 `fal-flux3-max-five-daily-sandbox` 與 `qoder-free-mechanisms`，局部複核2筆；新增機會 `beautiful-ai-student-pro-first-year` 1筆、政策及線索各0，既有未完成819，整筆追查失敗0。未登入、生成、申請或付款。

[fal週末活動](https://fal.ai/flux-3-max)公告時段已開始，修正卡片仍稱尚未開始的誤導；未登入3部、登入4部、驗證付款5部，額度不相加，API及超額另計。台灣及實際生成未核。[Qoder Flash](https://docs.qoder.com/events/flashoffer)免扣已結束，但[每日100點](https://docs.qoder.com/events/100credits)獨立活動仍列示；贈點FAQ仍稱Flash截止待公告，與Flash專頁及[離峰條件](https://docs.qoder.com/events/offpeakrate)不一致。非試用免費帳戶不適用離峰折扣。

[Beautiful.ai學生方案](https://www.beautiful.ai/education)提供新學生啟用起12個月免費Pro；[說明中心](https://support.beautiful.ai/hc/en-us/articles/46055219859597-Educational-Accounts)允許無 .edu 信箱者提交大學身分文件供審核。台灣學校、綁卡、期滿扣款及學生AI限制未核；一般[訂閱條款](https://www.beautiful.ai/terms-of-service)列自動續約，不推定學生訂單相同。

另查 [n8n非營利折扣](https://support.n8n.io/article/non-profit-pricing)：合格組織Cloud方案七折，單次折扣碼是否持續適用續約及台灣文件未核，暫不新增。研究員另查Fastino、DeepInfra及臺北青年補助，未整合、不計複核；DeepInfra近期重複404不代表活動終止。避免重查尚未到期或近期失敗案例。

下輪優先：`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 到期查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`fal-flux3-max-five-daily-sandbox` 每日及11/10 04:00後查[活動](https://fal.ai/flux-3-max)；`fastino-glideis1-ten-credit-payment-verification` 查[官方計價](https://docs.fastino.ai/pricing.md)及活動兌換；`beautiful-ai-student-pro-first-year` 查[學生說明](https://support.beautiful.ai/hc/en-us/articles/46055219859597-Educational-Accounts)台灣文件及續費。

2026-11-06 19:05–19:11 本輪：起始820筆，依實際時區計52筆到期（含已截止及證據缺口）；避開上輪剛核與近期反覆失敗案例。局部複核 `qoder-free-mechanisms` 1筆；新增 `asana-nonprofit-starter-advanced-fifty-percent` 機會1筆、政策及線索各0，既有未完成819、整筆來源追查失敗0。未登入、申請或付款。

[Qoder Flash](https://docs.qoder.com/events/flashoffer)免費額度至台北11/7 00:00；之後扣點，離峰[折扣頁](https://docs.qoder.com/events/offpeakrate)排除非試用的免費帳戶，不能推定一律適用。另有[每日100點](https://docs.qoder.com/events/100credits)需桌面手領、每包30天，活動截止待公告。修正原紀錄未列Flash截止的決策風險。

[Asana非營利](https://asana.com/industry/nonprofit)合格組織可申請Starter或Advanced五折，非免費；[一般定價表](https://asana.com/pricing)分別列每帳單帳戶每月50K／75K AI Studio點數，非營利訂單實際適用未核。FAQ沿用Premium／Business舊名稱；台灣資格、折後價格及AI加購折扣未知。[訂閱條款](https://asana.com/terms/subscriber-terms)除訂單另定，按當時費率自動續約、不續須提前30日通知。

研究員另查SatFAQ既有客戶、Plaud、VideoGen、Hour of AI、Antigravity，未整合、不計本輪複核；SatFAQ既有客戶與上輪免費試用案資格和期間不同，不合併。ONE WARE [非商業訓練額度](https://one-ware.com/open-source-program/)為裁量發放，但數量及效期未公布；[一般條款](https://one-ware.com/docs/legal/terms)限企業客戶，學術個人及台灣適用仍待確認，保留線索不新增。

下輪優先：`qoder-free-mechanisms` 11/7 00:00後查[Flash](https://docs.qoder.com/events/flashoffer)及[離峰資格](https://docs.qoder.com/events/offpeakrate)；`fal-flux3-max-five-daily-sandbox` 11/7 01:00後查[活動](https://fal.ai/flux-3-max)；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`asana-nonprofit-starter-advanced-fifty-percent` 月查或有新訊號時查[資格](https://asana.com/industry/nonprofit)及台灣文件、費用。

2026-11-06 18:05–18:11 本輪：起始819筆，依實際時區計50筆到期（含已截止及證據缺口）；避開上輪剛核及當日反覆失敗案例。局部複核 `supership-creative-ai-corporate-month` 1筆，新增 `satfaq-free-trial-hybrid-ai-two-thousand-points` 機會1筆、政策及線索各0，既有未完成818、整筆來源追查失敗0。未登入、申請或付款。

[さっとFAQ試用活動](https://www.satfaq.jp/news/20261102/)針對免費試用客戶提供2,000點，活動至2027/3/31，點數僅用至各自試用結束；不同於[既有Basic以上客戶活動](https://www.satfaq.jp/news/20260918_2/)的資格及12/31期限。點數供AI對話、分析與儲存共用且不可加購；正式AI方案每月未稅¥80,000、用量另計。台灣資格、付款驗證、試用是否自動轉付費未知；[一般條款](https://www.satfaq.jp/contract/terms/history/rev20261002/)解約翌月底生效是否適用試用未核。

[Supership公告](https://supership.jp/news/2026/09/16/14682)申請期至10/30，官方新聞索引未見延期；既有試用未於免費期內解約仍會轉有償，公告當時Standard每月未稅¥45,000。服務頁本輪404，不能據此推斷結束或解決舊有額度矛盾。既有截止案由每日改月查，減少佇列重複；未重設核實範圍外欄位。

研究員另查GMI、CodeRabbit、CoreWeave及VideoGen，未整合、不計複核；CodeRabbit原紀錄未標為已截止，不能採納研究員誤認。ONE WARE學術訓練額度、Asana非營利折扣具潛力，但台灣審核、額度或費用及條款適用仍有缺口，暫不新增；GitHub學生包已有紀錄。按既有評分函數計算新案例，另發現10筆既有紀錄的衍生欄位與現行函數不完全一致，未批次重寫其他紀錄，待查差異。

下輪優先：`fal-flux3-max-five-daily-sandbox` 11/7 01:00後查[活動頁](https://fal.ai/flux-3-max)；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`satfaq-free-trial-hybrid-ai-two-thousand-points` 查[試用頁](https://www.satfaq.jp/contract/trial/step1/)及[條款](https://www.satfaq.jp/contract/terms/history/rev20261002/)台灣資格、試用費用及續費；`supership-creative-ai-corporate-month` 月查或有新訊號時查[公告](https://supership.jp/news/2026/09/16/14682)是否延期並釐清服務頁矛盾。


2026-11-06 17:05–17:10 本輪：起始819筆，按實際時區比較50筆到期；局部複核 `lovable-sweden-2026`、`rime-stt-nov19-free-window`、`realads-once-fifty-no-watermark` 共3筆，新增機會、政策及線索各0，未完成816。`perplexity-watch`、`perplexity-education`、`tabnine-basic-free-retired`、`ugreen-ai-nas-hackathon-2026`、`vultr-match-ai-compute` 核心來源403或轉址，追查失敗5筆，不刷新verified_at。前3筆當日已追查失敗，本輪重試未產生新證據；下次分派前應排除近期失敗且無新訊號案例。未登入、申請或付款。

[Rime定價](https://www.rime.ai/pricing)現頁寫STT免費至Nov 19但未明示年份或時區；修正欄位把2026當作本次已證事實的矛盾，歷史線索仍保留。Free每月US$50共用、頁面稱免卡；付款及資料使用條款衝突、台灣資格仍未知。[Lovable條款](https://back-to-school.lovable.app/terms)限制瑞典合格學籍與校郵，已有付款方式且未取消者2027/1/1起以五折續費，與FAQ描述有差異。[RealAds FAQ](https://ai.realads.kr/faq)稱免費商用且無浮水印，但[條款](https://ai.realads.kr/terms)相反；定價頁與條款對免費影片亦矛盾，勿假設商用權。台灣個案與法律均未核。

新機會搜尋發現 [Google Skills學生200點](https://support.google.com/google-cloud-higher-ed/answer/10322652?hl=en)與 [Cerebras試用](https://www.cerebras.ai/pricing)已有相同紀錄，未重複新增。UGREEN主辦頁日期與影片要求衝突、正式規則403；Vultr促銷頁403，稅務頁可讀不代表促銷仍有效。

下輪優先：`fal-flux3-max-five-daily-sandbox` 11/7 01:00後查[活動頁](https://fal.ai/flux-3-max)；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`ugreen-ai-nas-hackathon-2026` 有新訊號時查[規則](https://ugreenhackathon.devpost.com/rules)及[主辦頁](https://ai.ugreen.com/pages/ugreen-hackathon)矛盾；`rime-stt-nov19-free-window` 查[定價](https://www.rime.ai/pricing)及官方公告釐清年份、時區及付款要求。

2026-11-06 16:05–16:10 本輪：起始818筆，按實際時區比較51筆到期，含已結束及來源缺口；避開前輪剛核案例。局部複核 `fal-flux3-max-five-daily-sandbox`、`adobe-firefly-twelve-month-model-promotion` 共2筆，新增機會 `requesty-education-nonprofit-enterprise-fee-waiver` 1筆、政策及線索各0，未完成816；`deepinfra-two-minute-papers-twenty-credit` 活動頁404、參數登入入口未列優惠，整筆追查失敗1筆，未刷新核實時間或期限。未登入、申請、生成或付款。

[fal活動頁](https://fal.ai/flux-3-max)公告台北11/7 01:00至11/10 04:00週末免費，未登入3部、登入4部、驗證付款5部，首部後24小時補回且不相加；API及超額收費。舊免費頁轉址，不能判定舊池確切終止日；付費折扣期限及keyframes適用說法仍矛盾。[Adobe台灣表](https://helpx.adobe.com/tw/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)已列GPT Image 2.5 Sunburst/Flare，方案及解析度有差別；免點數非免訂閱費，台灣個案未知。

[Requesty教育非營利](https://www.requesty.ai/education)提供合格機構申請免平台費及Enterprise附加費，模型供應商用量仍付費，非免費模型點數；台灣審核及付款未核。[條款](https://www.requesty.ai/terms.txt)對部分服務要求預付不可退點數，上游可能使用部分免費模型資料訓練。另查 Whollify 定價與FAQ對Free AI點數有矛盾，暫不收錄；UGREEN主辦頁日期與影片要求衝突仍在，正式規則403；Vultr及CoreWeave研究未整合、不計複核。

下輪優先：`fal-flux3-max-five-daily-sandbox` 11/7 01:00後查[活動頁](https://fal.ai/flux-3-max)與11/10期滿；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`ugreen-ai-nas-hackathon-2026` 查[規則](https://ugreenhackathon.devpost.com/rules)及[主辦頁](https://ai.ugreen.com/pages/ugreen-hackathon)矛盾；`deepinfra-two-minute-papers-twenty-credit` 有新訊號再查[活動頁](https://deepinfra.com/papers)及[計費](https://deepinfra.com/pricing)，避免重複讀失敗來源。

2026-11-06 15:05–15:11 本輪：起始817筆，15:05按實際時區比較50筆到期，含已結束及來源缺口；避開前輪剛核與近期反覆讀取失敗項目。局部複核 `kilo-auto-free-hosted-models` 1筆；新增機會 `asana-student-starter-free-twelve-months` 1筆、政策及線索各0，既有未完成816，整筆核心來源追查失敗0。未登入、提交申請或付款。

[Asana學生](https://asana.com/industry/students)限18歲以上合格高教學生經Goodstack驗證，Starter折扣12個月、最多50席，結帳須信用卡、期滿按當時價格收費；一般[定價表](https://asana.com/pricing)列Starter每帳單帳戶每月50K AI Studio點數，學生方案實際適用及台灣學校文件未核。[訂閱條款](https://asana.com/terms/subscriber-terms)除訂單另有約定外自動續期，至少30日前通知不續約。Asana非營利50%折扣另有價值，但台灣審核及舊方案名稱衝突未解，暫不新增。

[Kilo目錄](https://kilo.ai/landing/free-models)列三款免費模型、免信用卡，修正舊紀錄將帳單地址要求誤寫為已確認免除；[Gateway文件](https://kilo.ai/docs/gateway/models-and-providers)列匿名每IP每小時200次，Auto Free可能路由至記錄並使用輸入輸出的供應商，勿送個資或機密。台灣資格、登入者額度及實際帳單地址要求未核。這是證據範圍與資料風險改善，未改前端。

研究員另查 `ugreen-ai-nas-hackathon-2026`，主辦頁可讀但正式規則403，日期及影片要求衝突仍存；`tencent-tokenhub-free-trial`、`firepass-closed-policy` 等尚未到期或其他已結束案例未整合、不計複核。來源失敗不等於活動終止；避免無新訊號時反覆重讀失敗來源。

下輪優先：`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`ugreen-ai-nas-hackathon-2026` 查[規則](https://ugreenhackathon.devpost.com/rules)及[主辦頁](https://ai.ugreen.com/pages/ugreen-hackathon)日期與影片矛盾；`relevance-free-availability-conflict` 到期時查[定價](https://relevanceai.com/pricing)與[文件](https://relevanceai.com/docs/get-started/pricing)方案及額度差異；`asana-student-starter-free-twelve-months` 到期或新訊號時查[學生頁](https://asana.com/industry/students)及Goodstack台灣學籍、取消及學生AI額度。

2026-11-06 14:05–14:11 本輪：起始817筆，按實際時區比較52筆到期，包含已結束及證據缺口；避開前輪剛核及近期反覆讀取失敗的案例。局部複核 `taipei-youth-ai-subscription-subsidy-2026`、`deepgram-flux-tts-bonus`、`granola-students` 共3筆；新增機會、政策及線索各0，既有未完成814，整筆核心來源追查失敗0。未登入、提交申請或付款。

[臺北青年補助](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)須個別最後條件達成次日起一個月內且最遲11/10書面送達，不是人人都可等到11/10；剩餘預算與即時收件未核。[Granola學生頁](https://www.granola.ai/students)限美英加認可大學在學，[申請表](https://tally.so/r/D4KbQ5)必填指定三國學生信箱及學生證；修正舊資料將信箱列為未核的缺口，台灣本地學籍不符但台灣籍海外學生仍須個別確認。[Deepgram](https://deepgram.com/promotions/2026-09/flux-tts-promo-terms-and-conditions)須先有合格付費Flux TTS消耗才有等額bonus，每專案最多US$500；[定價](https://deepgram.com/pricing)PAYG及Growth每千輸入字元US$0.045，Growth年預付US$4,000起。台灣帳戶、付款及實際發放未核。

新線索：[Asana非營利](https://asana.com/industry/nonprofit)列合格機構Starter／Advanced五折並接受國際同等資格；[定價](https://asana.com/pricing)列Starter每帳戶每月50K AI Studio點數，但台灣機構審核及實際付款未核，方案舊名稱亦在FAQ殘留，暫不新增。研究員另查UGREEN、Kilo、VideoGen，未整合不計複核；UGREEN正式規則403、主辦頁可讀且日期／影片要求仍有矛盾，不能因403判終止。

下輪優先：`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)是否提前停收；`ugreen-ai-nas-hackathon-2026` 查[正式規則](https://ugreenhackathon.devpost.com/rules)及[主辦頁](https://ai.ugreen.com/pages/ugreen-hackathon)矛盾；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)與[FAQ](https://www.tencentcloud.com/act/pro/tokenhub)效期差異；`kilo-auto-free-hosted-models` 查[免費目錄](https://kilo.ai/landing/free-models)與[條款](https://kilo.ai/terms)地區及上游用途。Asana另核台灣文件、實際訂價與續約。

2026-11-06 13:05–13:10 本輪：起始816筆，按實際時區比較51筆到期，含已結束及來源缺口；避開前輪剛核或反覆失敗案例。研究人員查閱部分尚未到期或已結束案例，未整合、不計複核；成功複核既有0筆，新增機會1筆、政策及線索各0筆，未完成816筆，整筆來源追查失敗0筆。未登入、申請或付款。

新增 [BlockRun 免費模型](https://blockrun.ai/free)：官方列9個模型、免帳號、key及錢包；共享容量忙碌時可能回退其他模型，應讀取回應的model欄位。免費上游可能使用提示改善服務，勿傳敏感資料；台灣資格、固定限額及實測可用性未知。[條款](https://blockrun.ai/terms)要求遵守上游規則，付費服務另計。另一線索 [ONE WARE](https://one-ware.com/open-source-program/) 提供非商業開源、學術與研究專案裁量訓練額度；數量、效期及台灣資格未核，未收錄。

Krea 定價文字版將 Free 欄位叉號旁的「所有影片模型」也擷取出來；實際 DOM 顯示叉號，不可當成免費包含。研究人員另查尚未到期的 Azure、AI21、Baseten 與已結束 Vercel 舊活動，未改時間、未計複核。此輪無其他值得採納的網站程式改善。

下輪優先：`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`deepinfra-two-minute-papers-twenty-credit` 查[官方定價](https://deepinfra.com/pricing)及原活動現況；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)與[FAQ](https://www.tencentcloud.com/act/pro/tokenhub)效期差異；`fastino-glideis1-ten-credit-payment-verification` 有新訊號時查[定價](https://docs.fastino.ai/pricing)與[條款](https://agent.fastino.ai/terms)；`blockrun-free-open-model-gateway` 到期或新訊號時查[免費入口](https://blockrun.ai/free)的模型、回退及台灣資格。

2026-11-06 12:05–12:10 本輪：起始816筆，12:05按實際時區比較51筆到期（不含無期限4筆，含已截止及來源缺口）。優先處理台灣補助截止與老舊來源，避開11:09剛核案例。局部複核 `moda-service-robot-virtual-scene-subsidy-2026` 1筆；新增機會、政策及線索各0，既有未完成815；`perplexity-education`、`perplexity-watch`、`astamuse-agent-trial-oct31-index-only`、`tabnine-basic-free-retired`、`claude-artifacts-expired-lead` 核心來源不可讀或轉址，追查失敗5筆，僅記當日、不刷新核實時間或期限。未登入、申請或付款。

[數位產業署公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)原收件期於11/6中午已過，延期或新一輪未核；卡片改為新申請已截止、D級及月查或新訊號追查。原補助上限計畫費50%、NT$2,000萬，其餘自籌，台灣登記亦須審查；不推斷已提交案件結果或計畫提前結束。此為本輪使用者決策品質修正，非網站程式變更。[Modal舊公告](https://modal.com/blog/modal-integration-brings-scalable-compute-to-claude-science)仍列7/15申請截止及9/1–12/1執行期；未整合、不計複核。

新線索：[Nosana Grants](https://nosana.com/grants/)列US$5,000–50,000，依里程碑以USDC、NOS及GPU點數組合發放、全年受理；台灣資格、比例、費用、點數效期及申請表可存取性未核，不新增。[OpenMined](https://openmined.org/research/grants/)首梯已選出，後續待資源及審核；台灣領款及申請未核，不新增。

下輪優先：`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)與[FAQ](https://www.tencentcloud.com/act/pro/tokenhub)效期差異；`retool-nonprofit-monthly-coupon` 到期或新訊號時查[點數](https://docs.retool.com/support/billing-usage/ai-credits)與[定價](https://retool.com/pricing)矛盾；`astamuse-agent-trial-oct31-index-only` 有新訊號再向[官方](https://www.astamuse.co.jp/contact/)確認受理與費用；`moda-service-robot-virtual-scene-subsidy-2026` 有新訊號或月查時確認[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期。Nosana線索先確認台灣及實際條款。

2026-11-06 11:05–11:09 本輪：起始816筆，11:05有48筆到期（含已截止及來源缺口）；避開前輪剛核案例。局部複核 `retool-nonprofit-monthly-coupon`、`ndp-one-oct31-free-full-security-diagnosis` 共2筆，新增機會、政策及線索各0，既有未完成814；`perplexity-education` 官方正文403及 `kakao-plus-young-adult-promo-unverified` 活動與橋接頁找不到，追查失敗2筆，未刷新核實時間或期限。未登入、申請或付款。

[Retool](https://docs.retool.com/support/discount-programs)每月US$1,625非營利訂閱券須審核，移除誤套教育資格失效後退出規則；折扣期限與台灣個案未知。[點數文件](https://docs.retool.com/support/billing-usage/ai-credits)及[定價](https://retool.com/pricing)在數量、重置週期及自架適用性仍有差異。[ndp one](https://ndp-one.com/)首頁及[條款](https://ndp-one.com/terms)恢復可讀；首頁稱免費原始碼PoC，條款排除客戶提交原始碼診斷於基本服務、須另約。10/31免費完整診斷延期未證，轉付費須同意。

新線索：[HUD比較文](https://www.hud.ai/guides/best-agent-eval-frameworks)稱雲端US$10及學術US$100免費額度，但[快速入門](https://docs.hud.ai/platform/quickstart.md)稱新團隊無額度；[計費](https://docs.hud.ai/platform/billing.md)稱已啟動環境仍持續計費。台灣、領取與費用條件未核，不收錄為可領優惠。AISquared非營利既有線索要求美國501(c)(3)，不重複新增。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`retool-nonprofit-monthly-coupon` 查[點數文件](https://docs.retool.com/support/billing-usage/ai-credits)與[定價](https://retool.com/pricing)衝突；`ndp-one-oct31-free-full-security-diagnosis` 查[首頁](https://ndp-one.com/)及[條款](https://ndp-one.com/terms)的診斷範圍和費用；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)及[FAQ](https://www.tencentcloud.com/act/pro/tokenhub)效期與共池差異。HUD另向官方確認學術額度、台灣及免卡條件；失敗來源有新訊號再追查。

2026-11-06 10:05–10:10 本輪：起始815筆，10:06有49筆到期（含已截止及來源缺口）；避開前輪剛核與近期反覆讀取失敗項目。局部複核 `articul8-bivia-early-adopter-billion-tokens`、`beatapi-free-models-zero-balance` 共2筆，新增 `xtensio-free-one-time-ai-credits` 機會1筆，政策及線索各0，既有未完成813；`fastino-glideis1-ten-credit-payment-verification` 推廣貼文429、條款正文未取得，追查失敗1筆，不刷新核實時間及期限。Retool衝突仍存在，研究員查閱未整合不計複核；未登入、申請或付款。

[BeatAPI](https://docs.beatapi.io/free-models)免費JEV決策模型於11/5退役，現列三個免費文字ID，付費同名ID另計；修正舊摘要。[Bivia](https://www.articul8.ai/bivia)公開價每百萬輸入tokens US$0.042、輸出US$0，前1萬名免費額度餘額及台灣資格未知。[Xtensio](https://xtensio.com/pricing/) Free免卡，200 AI點數一次性不補充，10份成果且匯出帶浮水印；台灣註冊未核。[學生折扣](https://help.xtensio.com/account-settings/subscriptions/student-discount/)首年五折需索碼，台灣與實付未核，未另收錄。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`fastino-glideis1-ten-credit-payment-verification` 有新訊號時查[定價](https://docs.fastino.ai/pricing)、[帳務條款](https://agent.fastino.ai/terms)價差及兌換；`retool-nonprofit-monthly-coupon` 查[點數文件](https://docs.retool.com/support/billing-usage/ai-credits)與[定價](https://retool.com/pricing)差異；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)及[FAQ](https://www.tencentcloud.com/act/pro/tokenhub)效期與共池衝突。來源失敗不判終止、不刷新核實時間。

2026-11-06 09:05–09:10 本輪：起始814筆，09:05有49筆到期（含已截止及證據缺口）；避開前輪剛核案例。局部複核 `anthropic-guest-investigators`、`manus-startups-redirect-current-unverified` 共2筆；新增機會 `pitch-free-lifetime-ai-credits` 1筆，政策及線索各0，未完成812；`perplexity-watch`（403）、`astamuse-agent-trial-oct31-index-only`（404）、`tabnine-basic-free-retired`（原公告轉址）整筆核心來源追查失敗3筆，不刷新核實時間或期限。未登入、申請或付款；下輪避免無新訊號時重複追查這三筆。

[Pitch Free](https://pitch.com/pricing)新免費帳戶一次100 AI點數，[說明](https://help.pitch.com/en/articles/12755590-guide-to-ai-credits)稱不重置；台灣註冊及是否需付款驗證未知。[Anthropic公告](https://www.anthropic.com/news/open-call-guest-investigators-life-sciences)10/22稱申請約14天，截至11/6已超過公告日期14天，但截止及現時受理未知；不把仍有入口當成收件證據。[Manus](https://manus.im/startups)既有用戶可另詢福利，現頁不足以支持原摘要「不符合此特定計畫」，已修正；推薦限定與下方合作方非必要仍矛盾，期滿自動付費及台灣個案未知。

另查 [Beautiful.ai學生](https://www.beautiful.ai/education)限新學生驗證.edu後免費Pro一年，台灣學校、付款與期滿續費未知；教育說明頁本機讀取403，暫不新增。[Fastino定價](https://docs.fastino.ai/pricing.md)列GLiDE輸入每百萬US$0.04，兌換及付款驗證仍未核；研究員發現帳務頁結構化資料另列US$0.15，適用範圍及結帳價待查，未整合、不計複核。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`fastino-glideis1-ten-credit-payment-verification` 查[定價](https://docs.fastino.ai/pricing.md)、[帳務頁](https://agent.fastino.ai/terms)價差及兌換；`manus-startups-redirect-current-unverified` 查[計畫頁](https://manus.im/startups)推薦矛盾與實際訂單續費；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)與[FAQ](https://www.tencentcloud.com/act/pro/tokenhub)效期及共池衝突。來源失敗不判終止、不刷新核實時間或延後正常期限。

2026-11-06 08:05–08:09 本輪：起始814筆，08:05有44筆到期（含已截止與證據缺口）；避開前輪剛核案例。局部複核 `hume-startup-forty-million-twelve-months` 1筆，新增機會、政策及線索各0；既有未完成813，整筆核心來源追查失敗0。另查 Fastino、Manus、Lovable，未整合、不計複核；未登入、申請或付款。

[Hume一般條款](https://www.hume.ai/terms-of-use)列訂閱自動續費、續期前取消、內部用途及第三方服務限制，並授權客戶資料用於訓練改善；個別Order衝突時優先。本輪未重取舊動態新創條款，40M額度、期滿回Free及台灣資格不能視為現行保證，亦不因未讀到而推定計畫結束。

新候選：[Pitch Free](https://pitch.com/pricing)新免費帳戶一次100 AI credits、不重置（[點數說明](https://help.pitch.com/en/articles/12755590-guide-to-ai-credits)）；[Beautiful.ai學生](https://www.beautiful.ai/education)要求經驗證.edu郵件，新學生啟用後免費Pro一年。兩者台灣資格及付款條件未核，後者續費亦未知，暫不新增。Future AGI非營利已收錄。修正免費專區將疑似過期案例視為可選的篩選問題，仍可從全部紀錄查看。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`fastino-glideis1-ten-credit-payment-verification` 查[官方定價](https://docs.fastino.ai/pricing.md)與付款條款及促銷兌換；`manus-startups-redirect-current-unverified` 查[計畫頁](https://manus.im/startups)推薦入口矛盾和續費；`hume-startup-forty-million-twelve-months` 查[新創計畫](https://www.hume.ai/startup-program)動態條款、收件及台灣資格。來源失敗不推定結束，也不刷新核實時間。

2026-11-06 07:05–07:08 本輪：起始814筆，07:05依時間比較45筆到期（含已截止及來源缺口）；避開前兩輪剛核案例。局部複核 `kiro-startup-pro-plus-2026`、`river-inference-25-credit` 共2筆，新增機會、政策、線索各0，未完成812，整筆核心來源追查失敗0。研究員另查 Fastino、Manus、Hume、satFAQ，未整合且不計複核；未登入、申請或付款。

[Kiro方案](https://kiro.dev/startups/)正文排除有有效Activate點數者，FAQ卻排除已加入Activate者；[條款](https://kiro.dev/startups/terms/)排除China/GCR但未定義範圍，台灣個案未知。修正一筆將Activate衝突誤歸條款頁的來源說明。[River條款](https://console.river.ai/terms) 9.1列一年合約自動續期，不續須至少提前60天書面通知；9.2另允許隨時停用並關帳。修正先前誤稱逐月延續，並非宣稱本日才變更；US$25現時是否發放、台灣與付款未核。

新候選：[Beautiful.ai學生](https://www.beautiful.ai/education)列新學生驗證.edu後免費Pro一年，台灣學籍、付款與續費未明，先不新增；[Pitch免費版](https://pitch.com/pricing)列一次100 AI credits、不重置，台灣與付款條件待查。[Gamma免費版](https://gamma.app/pricing)已收錄，避免重複。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`hume-startup-forty-million-twelve-months` 查[計畫條款](https://www.hume.ai/startup-program)收件起算、台灣與商用；`manus-startups-redirect-current-unverified` 查[計畫頁](https://manus.im/startups)推薦入口矛盾和續費；`fastino-glideis1-ten-credit-payment-verification` 查[促銷](https://x.com/fastinoAI/status/2113308639566164012)現時可否兌換與[付款條款](https://agent.fastino.ai/terms)。來源失敗不推定結束，也不刷新核實時間。

2026-11-06 06:05–06:10 本輪：起始814筆，06:05有43筆到期（包含已截止及來源缺口），避開上兩輪剛核案例；局部複核 `tencent-tokenhub-free-trial` 的註冊費用與 `speechify-api-free-monthly-500k` 的定價，共2筆；新增機會、政策、線索各0，未完成812，整筆核心來源追查失敗0。另查 Kiro、River，未整合、不計複核。未登入、申請或付款。

[Tencent註冊文件](https://www.tencentcloud.com/document/product/378/17985?lang=en)列綁卡時US$1預授權，成功後取消、通常1–5工作日退回；與TokenHub每模型US$10凍結不同。試用文件一年與促銷頁90天的衝突仍未解，台灣個案付款及優惠資格未知。[Speechify定價](https://speechify.ai/pricing)列Free免卡、共用美元餘額，3.5至11/21約50萬字元、之後25萬；用盡暫停，不可加值。台灣註冊未核。

新候選 [Runway個人教育折扣](https://help.runwayml.com/hc/en-us/articles/48154114602259-Student-and-Educator-Discounts)稱25%且排除中國，[教育FAQ](https://help.runwayml.com/hc/en-us/articles/43109077483667-Runway-Education-FAQ)仍稱個人20%；比例及台灣個案未明，暫不新增。[Airtable教育折扣](https://support.airtable.com/articles/4920135568-applying-for-non-profit-education-and-student-airtable-plans)排除AI；Google Cloud新創已收錄。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)及[FAQ](https://www.tencentcloud.com/act/pro/tokenhub)一年／90天與共池衝突；`kiro-startup-pro-plus-2026` 查[條款](https://kiro.dev/startups/terms/)及[方案](https://kiro.dev/startups/)之GCR與Activate資格；`river-inference-25-credit` 查[官方定價](https://river.ai/pricing)與新戶額度是否仍提供。來源不可讀不視為結束，也不刷新核實時間。

2026-11-06 05:05–05:08 本輪：起始814筆，05:05按實際時間44筆到期（含已截止及來源缺口）；避開前兩輪剛核案例。局部複核 `bazaarlink-taiwan-free-model-gateway`、`snowflake-ai-trial-2026` 共2筆；新增機會、政策及線索各0，既有未完成812，整筆核心來源追查失敗0。未登入、申請或付款。

[BazaarLink免費入口](https://bazaarlink.ai/free)稱跨模型共池，啟用加權時長輸入耗更多，否則每請求計一次；[現行文件](https://bazaarlink.ai/docs.md)不再明確重述舊逐模型獨立計，實際扣抵未核。[搜尋頁](https://bazaarlink.ai/solutions/web-search)列每次US$0.008或US$0.016，免費模型亦收費，與文件social段落免費搜尋敘述適用關係未解。修正原卡片將加權概括為必然的問題。台灣服務定位不保證個案或上游模型資格。[Snowflake試用頁](https://www.snowflake.com/en/snowflake-trial/)稱三種功能加付款前每日限10 credits，[文件](https://docs.snowflake.com/en/user-guide/admin-trial-account)則稱試用不可用，保留衝突；AI需加卡，加卡不自動升級。

另研究Kiro、Tencent TokenHub、Anthropic Guest Investigators、Granola及UGREEN，未整合不計複核。[Scite學生頁](https://scite.ai/partners/students)提供推薦機構購買授權的學生／學術折扣線索，比例、適用方案、台灣資格及實付未核，暫不新增；[Superhuman](https://help.superhuman.com/hc/en-us/articles/46210187758477-Discounts-for-students-teachers-nonprofits-and-startups)稱教育及非營利折扣新申請與兌換自2026-06-30暫停，未以舊Coda頁視為現行開放。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`tencent-tokenhub-free-trial` 查[文件](https://intl.cloud.tencent.com/document/product/1300/80423)及[促銷FAQ](https://www.tencentcloud.com/act/pro/tokenhub)一年／90天及共池矛盾；`kiro-startup-pro-plus-2026` 查[條款](https://kiro.dev/startups/terms/)與[方案](https://kiro.dev/startups/)的GCR及AWS Activate資格；`anthropic-guest-investigators` 查[公告](https://www.anthropic.com/news/open-call-guest-investigators-life-sciences)與[條款](https://www.anthropic.com/legal/guest-investigator-program-terms)是否公布明確截止，表單存在不保證收件。查閱但未整合仍屬未完成；失敗不刷新核實時間或延後正常期限。

2026-11-06 04:05–04:09 本輪：起始814筆，04:05按實際時間有45筆到期，含已截止及證據缺口；避開前兩輪剛核和近期反覆讀取失敗的案例。局部複核 `neo4j-startup-aura-twentyk-application-unavailable`、`did-mobile-fourteen-day-twelve-credit-trial-scope-watch` 2筆；新增機會、政策及線索各0筆，既有未完成812筆，整筆核心來源追查失敗0筆。未登入、申請或付款。

[Neo4j申請表](https://neo4j.com/startup-program/apply/)仍暫不可用，不證計畫結束；[新創條款](https://neo4j.com/legal-terms/startup-program-aura/)要求接受[Aura自助條款](https://neo4j.com/legal-terms/aura-selfserve-terms/)，後者列超量須三日內升級，否則通知後自動升級並收費，訂閱按月自動續訂；個案實際條件及台灣資格未知。[D-ID手機試用](https://help.d-id.com/hc/en-us/articles/31288639829009-How-do-I-start-a-trial-on-the-D-ID-mobile-app)須選方案及信用卡，14天前取消不收費；[取消說明](https://help.d-id.com/hc/en-us/articles/31289962881809-How-do-I-cancel-my-mobile-app-subscription)要求手機訂閱透過App Store或Google Play取消，12點與另一頁不限使用的關係仍未解。

另查 Fastino、Manus、Hume、Supership、Tencent TokenHub 等，未整合不計複核；Supership服務價格頁404不代表停服。新候選 Splunk免費版已收錄；Patronus、Klavis未找到足夠現行免費額度證據，未新增，專案封存亦不證託管服務停業。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`tencent-tokenhub-free-trial` 查[資源文件](https://intl.cloud.tencent.com/document/product/1300/80423)與[促銷FAQ](https://www.tencentcloud.com/act/pro/tokenhub)效期及共池矛盾；`manus-startups-redirect-current-unverified` 查[計畫頁](https://manus.im/startups)推薦入口矛盾及Team實際訂單續期；`hume-startup-forty-million-twelve-months` 查[計畫條款](https://www.hume.ai/startup-program#Terms)收件起算及台灣資格。來源失敗不刷新核實時間或延後正常期限。

2026-11-06 03:05–03:09 本輪：起始813筆，03:05依時間比較46筆到期，含已結束及證據缺口，避開前輪剛核案例。局部複核 `mango-inference-community` 1筆；新增 `capacities-student-annual-pro-forty-percent` 機會1筆，政策及線索各0；既有未完成812，整筆追查失敗0。另研究 Fastino、River、Kiro、Neo4j、Hume及Anthropic，未整合、不計入複核；未登入、申請或付款。

[Capacities學生折扣](https://docs.capacities.io/more/discount)是付費Pro年約首年減價40%，需學籍證明且至少餘三個月；未取消以原價續訂。[訂閱文件](https://docs.capacities.io/reference/subscriptions)稱Pro月AI預算供輕量使用，Plus與充值另計，台灣學籍、付款及實付未知。[Mango官方](https://www.mangoboost.io/platform/mango-inference)列US$10及至11/11的七折（未標年份）；[帳單文件](https://inference.mangoboost.io/docs/operations/billing-and-payments/)列標準預付、[餘額文件](https://inference.mangoboost.io/docs/operations/credits-and-balance/)列零餘額拒絕請求，不等於其他週期性費用必然停止。修正舊登入頁來源未讀到優惠卻聲稱核實的矛盾，其他條件保留舊證據。

未納入候選：AFFiNE未找到官方學生折扣；[Amplenote](https://www.amplenote.com/help/using_default_ai_plugin)的AI使用自備API key，不等於贈送模型額度。[Neo4j申請表](https://neo4j.com/startup-program/apply/)仍暫不可用，不能推定計畫結束；[Aura條款](https://neo4j.com/legal-terms/aura-selfserve-terms/)列超量升級及續訂風險，待整合複核。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`neo4j-startup-aura-twentyk-application-unavailable` 查[申請表](https://neo4j.com/startup-program/apply/)及[付款條款](https://neo4j.com/legal-terms/aura-selfserve-terms/)；`kiro-startup-pro-plus-2026` 查[條款](https://kiro.dev/startups/terms/)的GCR與Activate差異；`mango-inference-community` 查[優惠](https://www.mangoboost.io/platform/mango-inference)11/11折扣年份及台灣付款。整筆來源失敗不刷新核實時間；研究者查閱但未整合的案例仍算未完成。

2026-11-06 02:05–02:10 本輪：起始813筆，02:06依實際時間比較49筆到期，含已截止、來源缺口；避開前輪剛核5筆。局部複核 `daytona-startup-amount-conflict`、`hostkey-grant-stale-2020-deliverable`、`airtop-free-monthly-thousand-signup-bonus-conflict`、`grammarly-student-annual-half-first-period`、`cyleague-cyber-navi-trial` 共5筆；新增機會、政策及觀察線索各0，既有未完成808，其中 `deepinfra-two-minute-papers-twenty-credit` 活動頁404且替代入口未證現行優惠，追查失敗1筆，保留其核實時間及期限。未登入、申請或付款。

[Grammarly取消說明](https://support.grammarly.com/hc/en-us/articles/115000090172-How-do-I-cancel-my-subscription)補足原紀錄缺漏：取消停止自動續訂，付費功能至當期結束；台灣學校出現在表單不保證個案核准。[Airtop條款](https://www.airtop.ai/tos)補充帳戶終止可能毀損內容且不保證復原，非停服退款承諾。[CyLeague](https://www.cyleague.jp/service/cyber-navi/)正式年約直接購買須信用卡、發票須經銷商，台灣資格未核。[Daytona新創](https://www.daytona.io/startups)表單有Taiwan選項，但不保證核准；宣傳最高100K與[價目](https://www.daytona.io/pricing)及舊正式條款50K仍矛盾。[HOSTKEY申請頁](https://landing.hostkey.com/grant_for_scientific_projects_formhtml)仍因硬體短缺暫停，介紹頁卻稱收件。

新候選 [Bardeen定價](https://www.bardeen.ai/pricing)列免費100點，但重置週期、是否須訂閱或綁卡未明；[條款](https://www.bardeen.ai/terms-of-service)限制免費用途並可能追溯收費，暫不新增。下一輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限；`daytona-startup-amount-conflict` 向官方查實際額度與[條款](https://daytonaio.notion.site/Daytona-Startup-Grid-Terms-and-Conditions-20929a8a0d0180a3bfbbea74398babf0)矛盾；`deepinfra-two-minute-papers-twenty-credit` 有新訊號再查[活動頁](https://deepinfra.com/papers)及付款豁免；`airtop-free-monthly-thousand-signup-bonus-conflict` 查[停服公告](https://portal.airtop.ai/shutdown)及匯出、退款安排。來源失敗不刷新核實時間。

2026-11-06 01:05–01:08 本輪：起始813筆，01:05依時間比較53筆到期（含已截止與來源缺口）；避開前輪剛核與近期反覆失敗的Perplexity。局部複核 `lets-go2-ai-ocr-launch-six-hundred-pages`、`taiwan-hrd-free-ai-introduction-2026`、`fujisoft-workforce-ai-security-poc`、`vast-startup-spend-match`、`deepgram-speak-attendee` 共5筆；新增機會、政策及觀察線索各0，既有未完成808，整筆追查失敗0。未登入、申請或付款。另研究 `daytona-startup-amount-conflict`、`grammarly-student-annual-half-first-period`，未整合、不計入複核。

[Go2價格](https://www.lets-co.com/consideration/letsgenkakanrigo2_cloud/)補充可選客戶端設定每據點含稅¥77,000起，不含於底座價格；非必要付費或免費獨立服務。[公務園登入](https://elearn.hrd.gov.tw/mooc/co_login_dialog.php)列Apple ID於2026/3/31停止，一般民眾改用我的e政府。[Vast帳單](https://docs.vast.ai/guides/reference/billing.md)區分已用與未用點數及信用卡、加密貨幣退款，正文、FAQ與2018條款適用差異仍未解。[Deepgram條款](https://deepgram.com/speak-attendee-credit-promotion-terms)仍要求10/29現場報到，同企業信箱帳戶須台北11/7 15:59前已有或建立；不能新補現場資格。富士Soft先到10家、剩餘名額及台灣資格未知。

新候選：[Featherless黑客松補助](https://featherless.ai/hackathon-grant)額度、Premium方案對應、免卡與續費未知；[GenApe價格](https://genape.ai/zh-TW/pricing)列首週200點，但[首頁](https://genape.ai/zh-TW)FAQ列145點，實領及免卡未核；兩者暫不新增，非已證無效。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepgram-speak-attendee` 11/7 15:59後查[活動條款](https://deepgram.com/speak-attendee-credit-promotion-terms)建帳期限與發放；`daytona-startup-amount-conflict` 查[專頁](https://www.daytona.io/startups)與[價目](https://www.daytona.io/pricing)金額矛盾；`perplexity-education` 待[教育正文](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)可讀查額度；`deepinfra-two-minute-papers-twenty-credit` 查[活動頁](https://deepinfra.com/papers)及付款豁免。失敗來源記錄追查，不刷新核實時間；無新訊號避免同日重試。

2026-11-05 19:05–19:12 本輪：起始813筆，19:05按實際時間比較52筆到期（含已截止與來源缺口）；避開前一輪剛核項目。局部複核 `robinhood-luna-token-promotion-december` 1筆；新增機會、政策及觀察線索各0；既有未完成812筆，其中 `perplexity-watch`、`perplexity-education` 官方正文403，追查失敗2筆，維持原核實時間及期限。研究員另查 `airtop-free-monthly-thousand-signup-bonus-conflict`、`deepgram-speak-attendee`、`cyleague-cyber-navi-trial`，未整合、不計複核；CyLeague申請頁403不證地區封鎖。未登入、申請或付款。

[Robinhood促銷條款](https://robinhood.com/us/en/support/articles/using-gpt-luna/)列其他模型按標準費率計費，恢復token收費前於App通知；期滿仍運行自動化會收token。卡片補充上述費用資訊，保留促銷及Loops協議的適用範圍矛盾。僅台灣居住地不滿足既有美國門檻；合格美國帳戶在台使用及法律未核。

新候選 [BytePlus V-START](https://www.byteplus.com/en/contact-us/vstart)列最高US$100,000雲端券、語音模型及LLM額度；不同宣傳數字能否疊加、效期、付款及台灣新創資格仍未知，暫不新增。Linear教育方案亦有AI coding另購點數及台灣學校資格未核問題。Perplexity Education在[SheerID台灣目錄](https://shop.sheerid.com/countries/taiwan/)有列，不等於官方方案及個案資格已核；避免用索引解決額度衝突。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`perplexity-education` 待[教育正文](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)可讀後查額度衝突；`perplexity-watch` 查[點數正文](https://www.perplexity.ai/help-center/en/articles/13838041-how-credits-work-on-perplexity)及有效期限；`deepinfra-two-minute-papers-twenty-credit` 查[活動頁](https://deepinfra.com/papers)及付款豁免；`deepgram-speak-attendee` 查[條款](https://deepgram.com/speak-attendee-credit-promotion-terms)與11/7台北建帳期限。來源失敗須記錄、不刷新核實時間或延長期限；已失敗來源無新訊號時避免同日重試。

2026-11-05 18:05–18:13 本輪：起始812筆，18:06依實際時間比較54筆到期，含已截止及來源缺口；避開上輪剛核案例。局部複核 `fireworks-glimmer-sft`、`krutrim-sandbox-oct22-past-banner`、`couchbase-activate-starter-kit-current-availability-watch` 共3筆；新增 `typeform-education-nonprofit-subscription-discount` 1項機會，政策及觀察線索各0；既有未完成809筆，其中 `astamuse-agent-trial-oct31-index-only`、`kakao-plus-young-adult-promo-unverified`、`ndp-one-oct31-free-full-security-diagnosis` 核心來源追查失敗3筆，保留核實時間及期限。另查 `fujisoft-workforce-ai-security-poc`，未整合、不計複核。未登入、申請、付款或啟動服務。

[Typeform折扣](https://help.typeform.com/hc/en-us/articles/360039728951-Non-profit-NGO-and-student-discounts-at-Typeform)為付費訂閱，須申請優惠碼；[定價頁](https://www.typeform.com/pricing)同一Basic月價兩處不同，實付與台灣資格未知。[AI條款](https://www.typeform.com/legal/typeform-ai)有互動限額，[服務條款](https://www.typeform.com/legal/service-terms-and-conditions)另將非企業MCP限每曆年200次，且付費訂閱自動續訂。

[Fireworks](https://docs.fireworks.ai/fine-tuning/training-api/cookbook/muse-glimmer.md)免費僅指定SFT；Serverless範例預設80次評估取樣按token另計。這是本輪費用可讀性改善。[Krutrim](https://docs.cloud.olakrutrim.com/basics/core-infrastructure/sandbox.md)閒置Sandbox仍計費、不能暫停且到期刪檔；[儲值](https://docs.cloud.olakrutrim.com/basics/cloud-billing/adding-credits.md)文件要求維持餘額並列GST，台灣個案未知。[Couchbase條款](https://info.couchbase.com/rs/302-GJY-034/images/Couchbase%20Capella%20AWS%20Activate%20%26%20Google%20Cloud%20Startup%20Promotion%20Terms%20and%20Conditions.pdf?version=0)排除政府及政府關聯組織，[計費文件](https://docs.couchbase.com/cloud/billing/billing.html)列關機仍有儲存等費用；促銷點數能否用於Model Service未知。ndp首頁和條款本輪404，已移除「現行首頁仍稱免費」的過時表述，但不推定服務關閉。

新線索 [Fillout優惠](https://www.fillout.com/help/pricing-discounts.md)未公布折扣金額，申請頁404；[Form Agent](https://www.fillout.com/help/form-agent.md)使用另計的Zite點數，非Fillout付費方案所附。先不新增，待查可用申請入口與台灣資格。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`ndp-one-oct31-free-full-security-diagnosis` 查[首頁](https://ndp-one.com/)及條款恢復；`typeform-education-nonprofit-subscription-discount` 查[定價](https://www.typeform.com/pricing)差異及台灣優惠資格；`deepinfra-two-minute-papers-twenty-credit` 查[活動頁](https://deepinfra.com/papers)與付款豁免；`perplexity-education` 查[教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文與衝突額度。來源不可讀不當作終止，亦不刷新核實時間。

2026-11-05 17:05–17:11 本輪：起始812筆，依既有日期粗篩57筆到期，含已截止及來源缺口。局部複核 `google-flow-fifty-daily-credit-subscription-conflict-watch`、`amazon-ara-multilingual-contextual-ai-fall-2026`、`claude-security-enterprise-two-month-credit` 共3筆；新增機會、政策及觀察線索各0，未完成809筆，其中 `perplexity-education`、`perplexity-watch`、`deepinfra-two-minute-papers-twenty-credit` 核心來源追查失敗3筆，未刷新其核實時間或延期。未登入、申請或付款。

[Flow額度](https://support.google.com/flow/answer/16526234?hl=en)列無訂閱每日50點，[入門頁](https://support.google.com/flow/answer/16353333?hl=en)仍要求訂閱；失敗生成點數一小時內退回，台灣支援地區不證無訂閱資格。[Amazon徵案](https://www.amazon.science/research-awards/call-for-proposals/multilingual-and-contextual-ai-evaluation-call-for-proposals-fall-2026)台北11/12 15:59截止，資金與AWS額度各平均不超過US$50,000、非保證；[AWS條款](https://aws.amazon.com/awscredits/)要求有效信用卡，超額、排除服務及交易稅另計。[Claude Security](https://support.claude.com/en/articles/14661296-use-claude-security)需付費Enterprise；[一般公開價格](https://claude.com/solutions/enterprise)每席每月US$20、年繳至少20席，Security頁premium席位要求與現行席位制如何對應仍待核。台灣個案均未核。

[DeepInfra定價](https://deepinfra.com/pricing)同頁宣稱無upfront costs，Billing卻要求加卡或預付；歷史活動是否豁免未知，404不證終止。Perplexity官方正文403或安全驗證；Education無限用量僅為相互矛盾的搜尋摘要，移除無限分類與入口但保留歷史線索。上述為本輪資料可讀性改善，未改前端。

新候選 [Koachly教育與非營利](https://koachly.ai/nonprofit)和 [Otter／TechSoup](https://help.otter.ai/hc/en-us/articles/15871360236951-Otter-x-TechSoup-Nonprofit-discount)具條件式折扣；前者席次與年繳條款有來源差異，後者台灣供應、另收費與實際價格未核，暫不新增。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`deepinfra-two-minute-papers-twenty-credit` 查[活動](https://deepinfra.com/papers)恢復及付款豁免；`perplexity-education` 查[官方教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文；`claude-security-enterprise-two-month-credit` 查[Security](https://support.claude.com/en/articles/14661296-use-claude-security)與[Enterprise席位](https://support.claude.com/en/articles/9797531-what-is-the-enterprise-plan)對應；`google-flow-fifty-daily-credit-subscription-conflict-watch` 查[額度](https://support.google.com/flow/answer/16526234?hl=en)與[入門資格](https://support.google.com/flow/answer/16353333?hl=en)衝突。

2026-11-05 16:05–16:11 本輪：起始812筆；以既有日期字串截至16:05粗篩57筆到期，含已截止與來源缺口，非均可申請。局部複核 `nchc-university-ai-compute-discount-2026`、`shift-asia-prototype-twenty-companies` 2筆；未完成810筆，新增機會、政策及觀察線索各0筆，整筆追查失敗0。未登入、申請或付款。

[國網申請書](https://www.nchc.org.tw/UploadImage/ActiveItem/639209109834443951.pdf)仍列10/31前校級申請、H200每GPU小時NT$30及開通起一年；[舊說明](https://www.nchc.org.tw/UploadImage/ActiveItem/639209109536061962.pdf)列2026/7–2027/6，適用關係仍未解。既有收件期已過、無新申請途徑證據，改為有新訊號時追查，不推論已獲核額度失效。[SHIFT ASIA公告](https://shiftasia.com/ja/news/ai駆動開発テスト無料トライアルキャンペーン/)列20家名額結束即止，[活動頁](https://shiftasia.com/ja/ai-driven-development-free-trial/)列合意範圍免費、約1–2週；入口在線不保證剩餘名額或台灣企業獲核，修正原先不適用的帳戶存取風險敘述。

研究員另查富士軟體、Fireworks、Daytona、Vast與Grammarly，未整合、不計複核。Daytona新創頁最高US$100,000而定價頁列最高US$50,000；Vast現行頁先消費後匹配、舊公告不同，退款文件亦有衝突。Grammarly現行[優惠說明](https://support.grammarly.com/hc/en-us/articles/39623389691021-Grammarly-promo-offers-on-SheerID)列首個訂閱期第一席最多五折、期後標準價續訂；本輪未重核先前表單的年約、台灣學校選項或實際結帳價。

候選Linear教育及非營利與BytePlus V-START未納入：[Linear](https://linear.app/docs/billing-and-plans)台灣學校電郵及非營利審核未明，AI coding另購點數；[BytePlus](https://www.byteplus.com/en/activity/vstart)不同宣傳額度是否累加、效期、付款與台灣資格仍未解。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`daytona-startup-amount-conflict` 查[新創頁](https://www.daytona.io/startups)與[定價](https://www.daytona.io/pricing)上限差異；`vast-startup-spend-match` 查[新創方案](https://vast.ai/startup)與[帳單](https://docs.vast.ai/guides/reference/billing)退款；`grammarly-student-annual-half-first-period` 查[學生驗證表](https://services.sheerid.com/verify/645b6593ace429765b46f1d5/)及實際適用年期與價格；`google-flow-fifty-daily-credit-subscription-conflict-watch` 查[額度](https://support.google.com/flow/answer/16526234?hl=en)及[資格](https://support.google.com/flow/answer/16353333?hl=en)衝突。

2026-11-05 15:05–15:09 本輪：起始812筆、15:05到期51筆；局部複核 `synthesia-basic-monthly-ten-min-five-hundred-no-download`、`google-ai-professional-certificate-tw-pro-3mo` 共2筆，未完成810筆；新增機會、政策及觀察線索各0，整筆追查失敗0。未登入、申請或付款。

[Syren專頁](https://help.synthesia.io/en/articles/17697950-how-do-syren-credits-work)列促銷點2026/11/9 23:59 BST到期，與[價格表](https://www.synthesia.io/pricing)一個月的適用關係及BST標示待確認；用盡或到期後無通知轉扣一般點，負餘額由下次儲值扣除、非另行收費。Basic本身未宣告結束。[Coursera課程FAQ](https://www.coursera.org/google-certificates/google-ai)明示獲助學金學員不享三個月AI Pro試用；Google One需合格付款方式，期滿自動扣款，課程並非免費。台灣個案未核，兩頁兌換截止差一天的矛盾仍未解。

研究員另查Fireworks、富士軟體、Daytona及Vast，未整合、不計複核。Daytona新創宣傳最高10萬美元，定價及舊條款列最高5萬，不能保證取得；Vast現行為先消費後匹配，退款文件與舊條款衝突。Linear教育及非營利[折扣](https://linear.app/docs/billing-and-plans)含條件式Business AI功能、coding另購點數，`.edu.tw`與台灣個案未核；[BytePlus V-START](https://www.byteplus.com/en/activity/vstart)列AI模型額度、申請表可選台灣，但不同頁額度關係、付款與效期未明；均未新增。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`daytona-startup-amount-conflict` 查[方案](https://www.daytona.io/startups)及[條款](https://daytonaio.notion.site/Daytona-Startup-Grid-Terms-and-Conditions-20929a8a0d0180a3bfbbea74398babf0)金額差異；`vast-startup-spend-match` 查[帳單](https://docs.vast.ai/guides/reference/billing)與[條款](https://console.vast.ai/terms/)退款衝突；`synthesia-basic-monthly-ten-min-five-hundred-no-download` 查[Syren說明](https://help.synthesia.io/en/articles/17697950-how-do-syren-credits-work)時區及到期；`google-ai-professional-certificate-tw-pro-3mo` 查[台灣頁](https://grow.google/intl/zh-TW_tw/ai-professional/)與[條款](https://one.google.com/offer/terms-and-conditions/google-career-certificates)截止日。

2026-11-05 14:05–14:09 本輪：起始812筆、14:05到期51筆；局部複核 `aocai-working-free-ai-courses-2026` 1筆，未完成811筆，新增機會、政策及觀察線索各0，整筆追查失敗0。未登入、申請或付款。

[台北11/11課程公告](https://ievents.iii.org.tw/EventS.aspx?t=0&id=3535)報名至11/9 23:59，資格審查通過免學費、午餐自理，預計100人且實體可到者優先；表單列上限300人，實際席次未核。補充錄取優先順序，避免線上申請者誤判；其他班次沿用先前證據。未見實質政策變更，歷史不追加。

研究員另讀Krutrim、Google AI Professional、Qoder與Bolt，未整合、不計複核：Krutrim首頁未顯示舊促銷，不足證終止；Google課程台灣頁與Google One條款分列2027/1/1及1/2兌換期限，課程收費與試用後自動扣款仍應留意；Qoder及Bolt既定活動已過，無新申請證據，不為刷新時間重複複核。新線索[BytePlus V-START](https://www.byteplus.com/en/contact-us/vstart)列最高US$100,000雲端券及其他AI額度，但額度關係、效期、費用與台灣新創資格未明，未新增。Z.ai新創方案已收錄，未重複。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`aocai-working-free-ai-courses-2026` 查[台北班](https://ievents.iii.org.tw/EventS.aspx?t=0&id=3535)席次、截止及100／300差異；`daytona-startup-amount-conflict` 查[方案](https://www.daytona.io/startups)與[條款](https://daytonaio.notion.site/Daytona-Startup-Grid-Terms-and-Conditions-20929a8a0d0180a3bfbbea74398babf0)金額差異；`nchc-university-ai-compute-discount-2026` 查[公告](https://www.nchc.org.tw/Active/ActiveView?id=1795&menutype=0&mid=47&sitemenuid=3)新梯次；`google-flow-fifty-daily-credit-subscription-conflict-watch` 查[額度](https://support.google.com/flow/answer/16526234?hl=en)及[入門資格](https://support.google.com/flow/answer/16353333?hl=en)衝突。BytePlus線索另查[計畫](https://www.byteplus.com/en/contact-us/vstart)條款及台灣新創適用性。

2026-11-05 13:05–13:10 本輪：起始812筆、13:05到期50筆；局部複核 `sarvam-campus-tour-credits` 1筆，未完成811筆，新增機會、政策及觀察線索各0，整筆追查失敗0。未登入、申請或付款。

[Sarvam巡迴總頁](https://www.sarvam.ai/sarvam-campus)仍在已過的11/3 Pune場次顯示Register；修正卡片避免誤認仍可報名，其他11月及12月場次仍暫定，點數金額、效期與新場次條款未知。台灣學生須符合指定印度校園學籍及現場條件，個案未核。此為資料可讀性改善；無可證實的新政策變動，未追加歷史。

研究員另讀國網中心、Google Flow、Airtop、富士軟體及SHIFT ASIA，未整合、不計複核。Google Flow [額度頁](https://support.google.com/flow/answer/16526234?hl=en)列無訂閱每日50點，[入門頁](https://support.google.com/flow/answer/16353333?hl=en)仍要求訂閱，台灣支援地區不等於無訂閱資格。Linear [教育與非營利](https://linear.app/docs/billing-and-plans)一年學生免費或合格機構75% off，但[coding sessions及Loops需另購點數](https://linear.app/docs/ai-credits)，台灣資格未知，暫不新增；Microsoft非營利Copilot候選的台灣帳單及個案資格待核。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`daytona-startup-amount-conflict` 查[方案](https://www.daytona.io/startups)及[條款](https://daytonaio.notion.site/Daytona-Startup-Grid-Terms-and-Conditions-20929a8a0d0180a3bfbbea74398babf0)金額；`sarvam-campus-tour-credits` 到期查[巡迴](https://www.sarvam.ai/sarvam-campus)新場次；`nchc-university-ai-compute-discount-2026` 查[公告](https://www.nchc.org.tw/Active/ActiveView?id=1795&menutype=0&mid=47&sitemenuid=3)是否有新梯次；`google-flow-fifty-daily-credit-subscription-conflict-watch` 查[額度](https://support.google.com/flow/answer/16526234?hl=en)與[資格](https://support.google.com/flow/answer/16353333?hl=en)衝突。

2026-11-05 12:05–12:10 本輪：起始811筆、12:05到期52筆；局部複核 `autoclaw-halloween-40m-expiry-conflict-watch` 與 `moda-service-robot-virtual-scene-subsidy-2026` 共2筆，未完成809筆；新增 `monday-nonprofit-pro-ten-seats-ai-discount` 1項機會、政策及觀察線索各0，整筆追查失敗0。未登入、申請或付款。

[AutoClaw活動](https://autoclaw.z.ai/blog/news/M11W1/)的本週點數效期仍同頁寫11/1及11/8；11/4–11/5 07:00加碼領取期已過，已領點數自領取起24小時有效。數位產業署[申請須知](https://www-api.moda.gov.tw/File/Get/adi/zh-tw/YE73r6nkt4OOQM8)補明場景模型須能在NVIDIA Omniverse／Isaac Sim匯入與模擬；補助須自籌至少一半、11/6中午截止，不等於免費額度。

[monday非營利方案](https://support.monday.com/hc/en-us/articles/115005321269-monday-com-for-nonprofits)合格組織Pro十席免費、另購AI點數減33%；[Goodstack](https://goodstack.org/nonprofit-definitions)列台灣社會團體及財團法人類別，但個案需審核。一般新Work Platform Pro[購點規則](https://support.monday.com/hc/en-us/articles/35277848309394-The-pricing-model-for-monday-AI-portfolio)列每月最低3,000點，是否適用非營利方案、台灣實付與稅費未知。

研究員另讀國網中心、Google課程、富士軟體、Sarvam及Daytona，未整合、不計複核；Daytona申請表含台灣但不足以證明核准，10萬美元宣傳與5萬美元條款仍衝突。Linear教育與非營利[文件](https://linear.app/docs/billing-and-plans)仍列條件式優惠，台灣.edu.tw與AI額度未核，未新增。

下輪優先：`moda-service-robot-virtual-scene-subsidy-2026` 11/6中午後查[公告](https://moda.gov.tw/ADI/news/bulletin-board/21168)是否延期；`autoclaw-halloween-40m-expiry-conflict-watch` 查[活動](https://autoclaw.z.ai/blog/news/M11W1/)效期衝突；`daytona-startup-amount-conflict` 查[方案頁](https://www.daytona.io/startups)與[條款](https://daytonaio.notion.site/Daytona-Startup-Grid-Terms-and-Conditions-20929a8a0d0180a3bfbbea74398babf0)金額差異；`sarvam-campus-tour-credits` 查[巡迴](https://www.sarvam.ai/sarvam-campus)後續報名；`monday-nonprofit-pro-ten-seats-ai-discount` 查[計價](https://support.monday.com/hc/en-us/articles/35277848309394-The-pricing-model-for-monday-AI-portfolio)是否適用非營利Pro及續費。

2026-11-05 11:05–11:08 本輪：起始811筆、11:05到期53筆；局部複核 `claude-scientists`、`sambanova-access-policy`、`freshservice-agent-studio-promotion-extension`、`datacamp-free-access-week-november-2026` 共4筆，未完成807筆；新增機會、政策與觀察線索各0，整筆追查失敗0。未登入、申請或付款。

[Claude說明](https://support.claude.com/en/articles/16634237-claude-team-plan-for-scientists)將原標準Team首次套折扣的年約未用預付款轉帳戶點數；[促銷條款§4](https://www.anthropic.com/legal/team-plan-for-scientists-terms)對已在research labs優惠方案者的既付金額則不退款、不給點數或按比例退費，已修正原紀錄未區分對象的敘述。FAQ與條款對90日無活動後果仍不同。SambaNova [Plans](https://cloud.sambanova.ai/plans)要求首次請求前綁卡購點，但[限額文件](https://docs.sambanova.ai/docs/en/models/rate-limits.md)仍列未綁卡Free Tier，不代表免費推論。Freshservice促銷僅適用合格付費方案且排除MSP；DataCamp指定個人課程統一於11/8 23:59 ET截止，台灣個案未核。

新線索：[monday.com非營利](https://support.monday.com/hc/en-us/articles/115005321269-monday-com-for-nonprofits)合格組織10席Pro免費、另購AI點數減33%；台灣機構審核與最低購點待核，未新增。[Linear教育與非營利](https://linear.app/docs/billing-and-plans)合格大學員工及非營利折扣為75% off，即付25%（二五折）；此前本文件「75折」誤述，予以更正。學生一年免費適用學生主導活動，`.edu.tw`與AI額度仍待核。

研究員另讀AutoClaw、國網中心但未整合、不計複核：[AutoClaw](https://autoclaw.z.ai/blog/news/M11W1/)本週點數效期11/1與11/8矛盾未解，11/4–11/5 07:00加碼領取期已過、已領點數有各自24小時效期；國網中心校級方案原截止已過，不代表已核准用量終止。下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)效期；`nchc-university-ai-compute-discount-2026` 查[申請書](https://www.nchc.org.tw/UploadImage/ActiveItem/639209109834443951.pdf)及新梯次；`datacamp-free-access-week-november-2026` 11/9 13:00後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)；`sambanova-access-policy` 查[限額](https://docs.sambanova.ai/docs/en/models/rate-limits.md)與付款矛盾；`claude-scientists` 查[條款](https://www.anthropic.com/legal/team-plan-for-scientists-terms)與FAQ的90日差異。

2026-11-05 10:05–10:10 本輪：起始810筆、10:05到期52筆；局部複核 `meta-hackathon-oct2026` 1筆、未完成809筆，新增 `notion-nonprofit-business-discount` 1筆機會，政策及觀察線索各0，整筆追查失敗0。研究員另查國網中心、AutoClaw、Claude及SambaNova，未整合、不計複核。未登入、申請或付款。

[Meta共同主辦頁](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)顯示報名關閉、作品11/4 21:00 ET截止已過；歷史條款所載額度申領期限亦已過，但本輪waiver只顯示Loading，未重核額度條款或延期，不推定已入帳額度失效。修正卡片時間表述；台灣API及billing仍未知。[Notion非營利](https://www.notion.com/nonprofits)可申請Business五折，須審核、不是免費；[AI額度](https://www.notion.com/help/manage-your-ai-credits)一般每人每月Standard 1,500及Select 500，但依購買安排可變，台灣個案、付款、稅及續費未知。

其他線索：[Linear教育及非營利](https://linear.app/docs/billing-and-plans)有學生一年免費、合格大學員工及非營利75% off（原誤寫75折，11:08更正為付25%）；`.edu.tw`與台灣個案未核，coding sessions及Loops另需[預付AI點數](https://linear.app/docs/ai-credits)，未新增。研究員回報AutoClaw官方頁的11/1及11/8效期文字仍矛盾；Claude科學方案90日不活動處置與SambaNova免費層付款要求仍有來源差異，均未整合。

下輪優先：`autoclaw-halloween-40m-expiry-conflict-watch` 查[活動頁](https://autoclaw.z.ai/blog/news/M11W1/)效期衝突；`sambanova-access-policy` 查[方案](https://cloud.sambanova.ai/plans)與[限額](https://docs.sambanova.ai/docs/en/models/rate-limits.md)矛盾；`claude-scientists` 查[條款](https://www.anthropic.com/legal/team-plan-for-scientists-terms)與[FAQ](https://claude.com/programs/team-plan-for-scientists)90日處置差異；`nchc-university-ai-compute-discount-2026` 查[國網中心](https://www.nchc.org.tw/Active/ActiveView?id=1795&menutype=0&mid=47&sitemenuid=3)是否新梯次及期間差異；`meta-hackathon-oct2026` 有新訊號時查[waiver](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)及額度條款是否延期。

2026-11-05 09:05–09:10 本輪：起始808筆、09:05到期47筆；成功複核既有案例0筆、未完成808筆，新增機會2筆、政策及觀察線索各0筆；其中 `tabnine-basic-free-retired` 原公告與定價頁轉址，整筆追查失敗1筆，不刷新核實時間。研究員亦查部分尚未到期案例，未刷新時間、不計複核。未登入、申請或付款。

[Retool教育及非營利](https://docs.retool.com/support/discount-programs)分別提供合格學生教師月繳Team或Business全額折扣，以及合格非營利每月US$1,625訂閱券，均須申請，不適用年約或Enterprise；非API現金。[AI點數文件](https://docs.retool.com/support/billing-usage/ai-credits)列Team／Business每月750／1,500，與[定價頁](https://retool.com/pricing)的1,000／3,000不同；實際額度、台灣資格、付款及稅費待核，Agents另行計費。此為資料可讀性改善，不改程式。

其他線索：國網中心[RAP試用文件](https://rap-docs.genai.nchc.org.tw/docs/billing_intro/billing/%E5%84%AA%E6%83%A0%E6%96%B9%E6%A1%88%E8%AA%AA%E6%98%8E/)列NT$20,000額度，但申請期限、資格及與2026賦能方案關係未知；不可當成2025舊試營運展延。Sonix教育及非營利折扣的不同官方頁數字不一致，台灣與實際結帳未核，未收錄。

下輪優先：`meta-hackathon-oct2026` 台北10:00後查[主辦頁](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)與[條款](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)；`retool-education-monthly-discount` 與 `retool-nonprofit-monthly-coupon` 查[點數文件](https://docs.retool.com/support/billing-usage/ai-credits)及[定價](https://retool.com/pricing)差異與台灣資格；`nchc-university-ai-compute-discount-2026` 查[國網中心](https://www.nchc.org.tw/Active/ActiveView?id=1795&menutype=0&mid=47&sitemenuid=3)新梯次；`perplexity-education` 有新訊號時查[教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)能否讀取。

2026-11-05 08:05–08:09 本輪：起始808筆、08:05到期45筆；局部複核 `minimax-design-h3-new-user-watch`、`realads-once-fifty-no-watermark`、`felo-standard-free-new-user-daily-two-hundred-campaign`、`digitalocean-secret-ai-startup-100-2026`、`coreweave-aria-limited-free`、`x-api-xai-spend-credit-rewards` 共6筆，新增0，未完成802；其中 `kakao-plus-young-adult-promo-unverified`、`deepinfra-two-minute-papers-twenty-credit` 原活動頁不可讀、替代入口未證優惠，記錄追查失敗、不刷新核實時間或延期。未登入、申請或付款。

[ARIA文件](https://docs.coreweave.com/products/aria.md)明列僅多租戶雲端團隊專案且需管理員啟用Smart features，免費方案能否啟用仍未知；補足影響使用者決策的前提。[X定價](https://docs.x.com/x-api/getting-started/pricing.md)補明回饋依帳期累積總額回算並僅補差額，自動儲值仍可能中斷。[DigitalOcean通用條款](https://www.digitalocean.com/legal/promotional-credit-discount-terms)排除Marketplace、Support、預付款及稅；Secret會員另有費用。RealAds免費商用和浮水印仍有官方衝突；MiniMax新戶點數3天效期不能套用H3試用。Felo條款另限制修改服務回應標誌。台灣個案均未核；無可證實之實質政策變動，不追加歷史。

新線索：[Retool教育與非營利方案](https://docs.retool.com/support/discount-programs)分別為合格學生教師月繳Team/Business全額折扣及合格非營利每月US$1,625訂閱券，非API現金額度；[AI點數文件](https://docs.retool.com/support/billing-usage/ai-credits)與[定價頁](https://retool.com/pricing)數量不同，台灣資格、付款及實際帳單待核，暫不新增。[Otter非營利](https://help.otter.ai/hc/en-us/articles/15871360236951-Otter-x-TechSoup-Nonprofit-discount)經TechSoup，折扣與台灣資格未核；TechSoup頁受阻。Vapi新創申請暫停，不視為可申領新機會。

下輪優先：`meta-hackathon-oct2026` 11/5 10:00台北時間後查[活動](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)及[條款](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)；`coreweave-aria-limited-free` 查[治理文件](https://docs.coreweave.com/products/aria/governance.md)確認免費帳戶Smart features資格；`realads-once-fifty-no-watermark` 查[條款](https://ai.realads.kr/terms)與[FAQ](https://ai.realads.kr/)商用及浮水印矛盾；`deepinfra-two-minute-papers-twenty-credit` 有新訊號查[活動頁](https://deepinfra.com/papers)；`kakao-plus-young-adult-promo-unverified` 有新訊號查[青年活動](https://b.kakao.com/views/komi/promotions/young_adults)，找不到頁面不等於終止。

2026-11-05 07:05–07:09 本輪：起始808筆、07:05到期40筆；避開上一輪剛核案例。局部複核 `upstage-once-ten-credit` 1筆，新增機會、政策及觀察線索各0，未完成807；其中 `astamuse-agent-trial-oct31-index-only` 原公告404、`tabnine-basic-free-retired` 原公告轉址，兩者替代官方入口亦未提供活動正文，記錄失敗、不刷新核實時間或延後期限。未登入、申請或付款。

[Upstage指南](https://console.upstage.ai/docs/getting-started)列註冊US$10額度、按量付費按月扣已登記付款方式；[定價](https://www.upstage.ai/pricing/api)明列不含10% VAT，已補入摘要。Pro 4基礎與期間價格差異、台灣資格、需卡及實際帳單未核；未據此認定適用稅額。本輪無實質政策變動，不追加歷史。

研究員另查DataCamp、國網中心及Airtop，未整合、不計複核。新候選[Cloudflare非營利計畫](https://blog.cloudflare.com/expanding-startups-for-nonprofits/)首期已截止、後續受理未核；[Together研究額度](https://www.together.ai/research-credits-program-request)已收錄 `together-research-invite-grants`，均未新增。

下輪優先：`meta-hackathon-oct2026` 11/5 10:00台北時間後查[活動](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)及[條款](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)；`datacamp-free-access-week-november-2026` 11/9 13:00後查[活動頁](https://www.datacamp.com/campaign/free-access-week-november-2026)是否結束；`nchc-university-ai-compute-discount-2026` 查[國網中心](https://www.nchc.org.tw/Active/ActiveView?id=1795&menutype=0&mid=47&sitemenuid=3)費率與新梯次；`astamuse-agent-trial-oct31-index-only` 有新訊號查[官方新聞](https://www.astamuse.co.jp/information/)；`perplexity-education` 有新訊號查[教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)403是否解除。

2026-11-05 06:05–06:08 本輪：起始808筆、06:05到期36筆；避開剛核OpenCode、Mem0及新收Miro。局部複核 `runable-free-daily-fifteen-hundred-monthly-cap`、`claude-duet-preview`、`taipei-youth-ai-subscription-subsidy-2026`、`rime-stt-nov19-free-window`；新增機會、政策及觀察線索各0，未完成804，其中 `perplexity-education` 官網及替代入口受阻，僅記失敗、不刷新核實時間或延後期限。未登入、申請或付款。

[Runable FAQ](https://runable.com/faq)補明先扣方案月點、再扣加購點、最後扣每日免費點；不意味免費點優先。Claude Duet預覽本身不另收費，但須美國帳戶、付費方案及候補邀請，背景工作共用限額。[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)補助須符合台北戶籍等條件，經費餘額未知。[Rime](https://www.rime.ai/pricing)免卡與[條款](https://www.rime.ai/terms)一般付款要求、real calls與免費方案禁止caller audio仍有差異；現行價格頁Nov 19未列年份，2026年份沿用歷史證據。本輪無實質政策變動，未追加歷史。

研究員查[Notion非營利](https://www.notion.com/nonprofits) Business五折及[Linear教育／非營利](https://linear.app/docs/billing-and-plans)優惠，台灣證明、AI額度及實際結帳仍待核；未新增。下輪優先：`meta-hackathon-oct2026` 11/5 10:00台北時間後查[活動](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)及[額度條款](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)；`taipei-youth-ai-subscription-subsidy-2026` 到期或新訊號時查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)餘額與送達期限；`rime-stt-nov19-free-window` 到期查[定價](https://www.rime.ai/pricing)與[條款](https://www.rime.ai/terms)矛盾；`perplexity-education` 有新訊號時查[教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)403；`astamuse-agent-trial-oct31-index-only` 查[官方](https://www.astamuse.co.jp/contact/)原公告與受理情形。

2026-11-05 05:05–05:09 本輪：起始808筆，05:06到期33筆（按實際時間比較，無時區者暫依台北時間）；避開前輪剛核Mem0及新收Miro。局部複核到期的 `opencode-accountless-free-models` 1筆；新增機會、政策及觀察線索各0，既有未完成807，整筆追查失敗0。未登入、申請或付款。

[OpenCode首頁](https://opencode.ai/)仍稱內建免費模型免帳號；[Console文件](https://opencode.ai/v2/docs/console/models/)列GLM-5.3-Flash Free等免費，但免費聊天模型限OpenCode，Console一般流程另提付款資料與儲值，不能推論免帳號方案必須或無須綁卡。補明本輪來源與查核範圍；台灣、實際帳戶及付款未核，沒有實質政策變動需寫入歷史。

研究員另查青年補助、Meta、Rime與Claude Duet，未整合、不計複核；Meta作品截止11/5 10:00台北時間前勿誤標結束。新候選[Notion非營利Business五折](https://www.notion.com/nonprofits)須審核；[一般Business AI額度](https://www.notion.com/help/manage-your-ai-credits)標準每人每月1,500 Standard及500 Select，但依購買安排可變，台灣文件與折後實際權益未核，暫不新增。Microsoft Elevate及Linear教育／非營利亦為候選，實際費用、台灣資格及AI點數關係待核；Airtable教育非營利折扣不含AI，不納入。

下輪優先：`meta-hackathon-oct2026` 在11/5 10:00台北時間後查[主辦頁](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)及[額度條款](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及個別送達期限；`rime-stt-nov19-free-window` 查[定價](https://www.rime.ai/pricing)與[條款](https://www.rime.ai/terms)免卡和資料矛盾；`claude-duet-preview` 查[官方說明](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)美國候補與付費門檻；`perplexity-education` 查[教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)403是否解除。

2026-11-05 04:05–04:09 本輪：起始808筆、04:05到期34筆；避開上輪剛核Picsart與新增Miro。局部複核 `mem0-hobby-memory-api` 1筆，新增機會、政策及觀察線索各0，既有未完成807，整筆追查失敗0。未登入、申請或付款。

[Mem0 FAQ](https://docs.mem0.ai/platform/pricing.md)仍列30天後自帶金鑰可用每月50,000新增、10,000檢索的Mem0免費池；本輪補明官方對推薦模型每1,000次新增約US$3.55–5.34的第三方費用估算，非報價，避免誤認整體免費。台灣、免卡及實際帳單未核，免費資料授權沿用舊證據。

研究員另查青年補助、Meta黑客松、Rime及Claude Duet，未整合、不計複核。Meta waiver未讀到正文，不據此推翻舊額度證據；作品截止11/4 21:00 ET即11/5 10:00台北時間，勿誤判已過。新候選Microsoft Elevate非營利培訓之費用與台灣資格不明；IBM SkillsBuild與NVIDIA Teaching Kits已有紀錄，均未新增。

下輪優先：`meta-hackathon-oct2026` 於11/5 10:00台北時間後查[主辦頁](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)及[額度條款](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算與個別期限；`perplexity-education` 查[教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)403是否解除；`rime-stt-nov19-free-window` 查[定價](https://www.rime.ai/pricing)及[條款](https://www.rime.ai/terms)付款和資料矛盾；`claude-duet-preview` 查[官方說明](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)地區與候補。

2026-11-05 03:05–03:09 本輪：起始807筆、03:05到期33筆，避開上輪剛核 Lawson 與 DeepStart；局部複核 `picsart-wan3-promotion-fair-use`，新增機會 `miro-startup-subscription-credit`，政策及觀察線索各0；既有未完成806，其中 `perplexity-education` 官方正文與兩個替代入口403，僅記追查失敗，不刷新核實時間或延後期限。未登入、申請或付款。

[Picsart條款](https://picsart.com/wan-3-0-unlimited-promotion-terms/)仍列10/31 23:59 Pacific截止，期後恢復扣點、訂閱正常續費；已結束活動由每日改月查，避免反覆佔用佇列。[Miro新創](https://help.miro.com/hc/en-us/articles/360014912819-Miro-Startup-Program)經審核可獲US$500或US$1,000訂閱抵用而非API額度；[AI點數](https://help.miro.com/hc/en-us/articles/19756209116178-Miro-AI-credits)依方案按席計算、團隊共池月重置，超額訂閱費由卡扣款，台灣個案、稅費及續費未知。申請含名稱標誌及案例分享條件。

研究員另查台北青年補助、DataCamp、Rime、Claude Duet及Krutrim，未整合、不計複核；線索 [Linear教育與非營利](https://linear.app/docs/billing-and-plans) 的AI coding sessions及Loops須[預付點數](https://linear.app/docs/ai-credits)，台灣.edu.tw與非營利證明未知，未新增。[OpenMined](https://openmined.org/research/grants/)首梯已選出，後續僅於資金及容量許可時處理，未新增。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)剩餘預算及個別送達期限；`perplexity-education` 查[教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)能否讀取；`rime-stt-nov19-free-window` 查[定價](https://www.rime.ai/pricing)與[條款](https://www.rime.ai/terms)免費資料及付款矛盾；`claude-duet-preview` 查[官方說明](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)地區及候補；`krutrim-sandbox-oct22-past-banner` 查[官方](https://www.olakrutrim.com/)舊促銷新訊號，缺頁不判終止。

2026-11-05 02:05–02:09 本輪：起始807筆、02:05到期30筆，避開上一輪剛核及新增；局部複核 `lawson-restricted-japan` 與 `deepinfra-deepstart-qualified`，新增機會、政策、觀察線索均0，既有未完成805，整筆追查失敗0。未登入、申請或付款。

[Lawson](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)新購及集點応募已截止，僅日本既有合格者可於11/10–16另抽AI碼；官方未列時區，Google續費未知。[DeepStart](https://deepinfra.com/deepstart)約500億tokens按指定模型價格換算，僅限符合募資與成立年限並經核准的新創，效期一年；台灣、美元授額、付款及超額未知。研究員另查青年補助、Claude Duet、Krutrim與OpenAI／Claude非營利方案；未整合、不計複核，後兩者已收錄，不重複新增。本輪無足夠依據做額外程式改版；未發現需追加的實質政策變動。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 到期後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及個別送達期限；`perplexity-education` 查[官方教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文可讀性；`claude-duet-preview` 查[官方說明](https://support.claude.com/en/articles/17631495-get-started-with-claude-duet)候補、地區及付費門檻；`krutrim-sandbox-oct22-past-banner` 查[官方](https://www.olakrutrim.com/)舊活動與新訊號，缺頁不能判終止；`lawson-restricted-japan` 到期時查[活動](https://mldata.lawson.co.jp/lab/campaign/googlemileage2609/)既有合格者抽選。

2026-11-05 01:05–01:08 本輪：起始806筆、01:06到期30筆，避開上輪剛核案例；局部複核 `taiwan-industrial-ai-tool-points-exhausted-2026`、`genspark-free-and-standard-pools`，新增機會 `scribe-education-nonprofit-pro-twentyfive-percent`，政策及觀察線索各0；既有未完成804，整筆追查失敗0。未登入、申請或付款。

工業館[計畫頁](https://keid.nat.gov.tw/cloud/Web/project_description_AI.aspx)明示點數用罄且不再遞補，改月查；既有訂單仍受各階段兩工作天及11/10上限拘束。Genspark付費週池用盡會自動扣點，9/18舊會員邊界兩份文件仍有差異。Scribe教育／非營利Pro申請75折、非免費；台灣.edu.tw與非營利資格、折扣續期及獨立Autocapture模組未知，條款有自動續訂、稅費與內容授權風險。研究員另查青年補助及DeepStart，未整合、不計複核；青年局附掛掃描PDF文字無法辨讀，不推定停收。Reclaim非營利折扣與既有訂戶適用文件有差異，AI權益未核，不新增。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 到期後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算與個別期限；`perplexity-education` 查[官方教育頁](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)可讀性；`deepinfra-deepstart-qualified` 查[官方頁](https://deepinfra.com/deepstart)台灣資格與適用模型；`genspark-free-and-standard-pools` 到期時查[方案](https://www.genspark.ai/helpcenter/membership-plans)及[點數說明](https://www.genspark.ai/helpcenter/credits-guide)9/18差異；`scribe-education-nonprofit-pro-twentyfive-percent` 有新訊號或到期時查[折扣](https://support.scribehow.com/hc/en-us/articles/8814004248221-Does-Scribe-offer-a-discount-to-nonprofits-students-or-educational-institutions)台灣資格及續約。

2026-11-04 19:05–19:09 本輪：起始806筆、19:06到期32筆；避開上輪剛核與新增案例。局部複核 `coderabbit-startup-annual-half-six-months`、`gmi-a16z-first25-two-k-spend-five-k-credit`，新增機會、政策及觀察線索各0；既有未完成804，其中 `perplexity-education` 官方正文及兩個替代入口403，僅記錄追查失敗，不刷新核實時間或延後到期。未登入、申請或付款。

CodeRabbit補充條款按所選或配置席位較大者及用量計費、另有適用稅費；定價FAQ稱只對建立PR的開發者收費，適用關係待釐清。取消知識庫的隨時取消與條款45日前書面通知仍有差異，改每日追蹤；並非新條款生效。GMI仍限a16z前25家、首月實際消費US$2,000解鎖US$5,000，剩餘名額及90日起算未核。台灣個案均未知。此為費用證據可讀性改善，非程式改版。

研究候選：[Scribe](https://support.scribehow.com/hc/en-us/articles/8814004248221-Does-Scribe-offer-a-discount-to-nonprofits-students-or-educational-institutions) 教育及非營利Pro折扣25%，但AI Autocapture是否包含於折扣、台灣.edu.tw及付款條件未核；[Linear](https://linear.app/docs/billing-and-plans) 教育及非營利資格有別既有新創優惠，但AI點數另計，未新增。青年局原文可讀，研究員另查；未整合、不計本輪複核。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及個別一個月與11/10送達期限；`perplexity-education` 查[官方正文](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)可讀性；`coderabbit-startup-annual-half-six-months` 到期時向[官方](https://www.coderabbit.ai/contact-us/support)釐清45日及席位計費；`gmi-a16z-first25-two-k-spend-five-k-credit` 到期時查[活動](https://www.gmicloud.ai/a16z)名額與起算；`taiwan-industrial-ai-tool-points-exhausted-2026` 查[停收公告](https://keid.nat.gov.tw/cloud/Web/news_in.aspx?ListGuid=d6ad9b40-a6bb-1a57-adbc-90dba8297221)，已截止但仍每日排入佇列，適合依證據改低頻。

2026-11-04 18:05–18:10 本輪：起始805筆、18:06到期33筆；避開上輪剛核與新增案例。局部複核 `adobe-firefly-twelve-month-model-promotion`；新增機會 `textcortex-nonprofit-fifteen-percent`，政策及觀察線索各0，既有未完成804，整筆追查失敗0。未登入、申請或付款。

Firefly英文與台灣官方表版本不同：英文列GPT Image 2.5 Sunburst/Flare，台灣表未列且另列ChatGPT Image 1；不推定台灣帳戶實際模型。TextCortex非營利組織可申請15%結帳折扣，付費Premium標價未含VAT，Extra Usage選開另計；台灣資格、折扣期限及實際結帳未知。

研究員另查CodeRabbit、GMI、Genspark、DeepStart，未整合、不計複核。Saner.AI學生折扣線索待核年繳實價、幣別與學生證；TextCortex教育頁的75%、US$29.99及免費Premium說法矛盾，均未新增。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及11/10送達；`coderabbit-startup-annual-half-six-months` 核[取消說明](https://kb.coderabbit.ai/articles/6164059373-can-i-cancel-my-annual-subscription)與[條款](https://www.coderabbit.ai/legal/terms-of-service)45日通知及席位計費；`gmi-a16z-first25-two-k-spend-five-k-credit` 查[活動](https://www.gmicloud.ai/a16z)剩餘名額與90日起算；`perplexity-education` 查[官方教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文；`adobe-firefly-twelve-month-model-promotion` 查[英文](https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)與[台灣](https://helpx.adobe.com/tw/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)模型表及台灣實際權益。

2026-11-04 17:05–17:09 本輪：起始804筆、17:06到期35筆；避開上輪剛核及新增4筆。局部複核 `upstage-file-search-beta-free`、`photoroom-sandbox-production-separated`；新增機會 `readwise-academic-half-price-ghostreader`，政策與觀察線索各0，既有未完成802，整筆追查失敗0。未登入、申請或付款。

資料品質：Upstage補明每使用者50個向量庫、每庫500檔及每批50檔，不再誤稱沒有固定上限；搜尋次數及速率仍未知。Photoroom修正自助App方案與Enterprise跨App/API承諾錢包例外，兩API沙盒是否共池仍未解。Readwise學術五折須官網訂閱及身分證明，Full含Ghostreader但並非永久免費；Feed自動摘要或更高階模型自備API key另付費，台灣與結帳未知。

研究員另核DeepStart、GMI、Adobe、CodeRabbit及Genspark，結果未整合、不計本輪複核；Adobe英台模型表版本不一致，台灣帳戶實際模型未知。RemNote教育折扣排除AI，Reflect須自備API key且教育折扣未證，均不新增。

下輪優先：`adobe-firefly-twelve-month-model-promotion` 比對[英文表](https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)與[台灣表](https://helpx.adobe.com/tw/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)模型差異；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及11/10送達期限；`gmi-a16z-first25-two-k-spend-five-k-credit` 查[活動頁](https://www.gmicloud.ai/a16z)名額與90日起算；`coderabbit-startup-annual-half-six-months` 查[條款](https://www.coderabbit.ai/legal/terms-of-service)45日通知與[取消說明](https://kb.coderabbit.ai/articles/6164059373-can-i-cancel-my-annual-subscription)差異；`perplexity-education` 查[官方教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文。

2026-11-04 16:05–16:12 本輪：起始803筆，16:05台北時間到期33筆；避開上輪剛核或新增8筆。局部複核 `innopad-taipei-startup-ai-workshop-20261104-watch`、`coreweave-forge-free-pricing-transition`、`speechify-api-free-monthly-500k`；新增機會 `pokee-developer-early-access-2000-credits`，政策及觀察線索各0；既有未完成800，整筆追查失敗0。研究員另核DeepStart、DigitalOcean、GMI及Adobe，結果未整合、不計複核；未登入、申請或付款。

InnoPad公告場次已過，修正狀態並改月查；實際是否舉辦及後續場次未知。Forge另列申請制學術研究200GB儲存，推論與Sandbox另計，台灣資格未核。Speechify Free免卡且模型共用月餘額，Simba 3.5於11/21後降至250K字元，時區未知。Pokee Standard開發者經審核一次2,000點；台灣資格、效期及費用未知，不標免費。Higgsfield創作者方案每月方案及額外點數未公布金額，先追查費用與台灣資格，不新增薄弱紀錄。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算與11/10送達期限；`deepinfra-deepstart-qualified` 查[DeepStart](https://deepinfra.com/deepstart)資格及額度有效期；`adobe-firefly-twelve-month-model-promotion` 比較[英文](https://helpx.adobe.com/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)與[台灣頁](https://helpx.adobe.com/tw/firefly/web/get-started/learn-the-basics/current-firefly-promotions.html)模型表及價格；`perplexity-education` 查[官方教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文；`gmi-a16z-first25-two-k-spend-five-k-credit` 查[活動](https://www.gmicloud.ai/a16z)剩餘名額與90天起算。

2026-11-04 15:05–15:13 本輪：起始801筆、到期39筆；局部複核 `antigravity-free`、`qoder-free-mechanisms`、`qoder-lite`、`did-mobile-fourteen-day-twelve-credit-trial-scope-watch`、`tencent-tokenhub-free-trial`、`vultr-match-ai-compute`；新增機會 `articul8-bivia-early-adopter-billion-tokens`、`beatapi-free-models-zero-balance`，政策與觀察線索各0。既有未完成795筆，整筆追查失敗0；未登入、申請或付款。Qoder Lite動態定價本輪未能重核，不再聲稱本輪兩頁一致；Vultr Match主頁在主研究環境可讀，確認50/50扣抵與12個月效期。

Antigravity官方模型表現列Claude Sonnet/Opus 4.6及GPT-OSS 120B於11/18移除，修正先前11/2日期；實際帳戶及時區未知。Qoder免費Flash有限次，桌面每日手領100點另計；Lite月費US$10，首購及續訂贈點受活動及訂單條件限制。D-ID手機12點與一般試用不限用量說法、Tencent一年與90天有效期仍衝突，後者每模型須凍結US$10。新收Bivia前一萬名10億tokens、BeatAPI零餘額指定免費模型；均未核台灣個案或是否需卡，Bivia剩餘名額未知，BeatAPI首次儲值前每分鐘僅一次成功請求。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 到期後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算與11/10送達期限；`perplexity-education` 查[官方教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文是否可讀；`deepinfra-two-minute-papers-twenty-credit` 查[活動頁](https://deepinfra.com/papers)是否恢復；`articul8-bivia-early-adopter-billion-tokens` 查[活動頁](https://www.articul8.ai/bivia)剩餘名額、效期及台灣資格；`tencent-tokenhub-free-trial` 查[產品文件](https://intl.cloud.tencent.com/document/product/1300/80423)與[促銷頁](https://www.tencentcloud.com/act/pro/tokenhub)的一年／90天矛盾。新案例與剛核案例如無新訊號，按各自期限輪替，避免當輪重查。

2026-11-04 14:05–14:10 本輪：起始800筆、到期40筆；局部複核 `workbuddy-step5-oct25-unverified` 一般Free條款，Step 5活動仍未核；新增機會 `future-agi-nonprofit-cloud-credits` 1筆，政策及觀察線索各0筆。未完成799筆，其中 `perplexity-education` 403、`tabnine-basic-free-retired` 公告轉址、`deepinfra-two-minute-papers-twenty-credit` 活動頁404，均未刷新verified_at或延後期限。未登入、申請或付款。

Future AGI非營利雲端方案每月250美元抵用或高用量帳單75%折扣，須審核且年度重驗；同頁另稱Boost價值250美元及額外50美元用量，與現行按量定價的關係待釐清。台灣文件、付款與超額未知。DeepInfra歷史US$20活動入口本輪404，不判斷終止；修正仍可申領及必要預付的斷言，移出免費快捷入口。一般定價稱無upfront costs，不等於已證免卡。WorkBuddy一般Free每月100點，新戶250點14天，客戶端有效日活可得30點，非Step 5專屬優惠。

下輪優先：`deepinfra-two-minute-papers-twenty-credit` 查[活動頁](https://deepinfra.com/papers)及官方是否恢復受理；`perplexity-education` 查[官方教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文；`future-agi-nonprofit-cloud-credits` 查[非營利條款](https://futureagi.com/non-profit/)與[定價](https://futureagi.com/pricing/)抵用矛盾及台灣資格，有新訊號提前追查；`vultr-match-ai-compute` 查[活動細則](https://www.vultr.com/match/)GPU適用及台灣資格；`taipei-youth-ai-subscription-subsidy-2026` 到期後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)剩餘預算及11/10送達期限。

2026-11-04 13:05–13:10 本輪：起始799筆、到期42筆；局部複核 `codeai-hour-of-ai-2026` 與 `sambacloud-rundown-first100-anniversary-credit-watch`，新增觀察線索 `emergent-free-ten-credits-publishing-watch`，機會及政策各0筆；既有未完成797筆，其中 `astamuse-agent-trial-oct31-index-only` 原公告404、官方列表未列，`perplexity-watch` 官方點數與價格頁403，兩筆追查失敗且未刷新verified_at。避開前輪剛核項，未登入、申請或付款。

Hour of AI 官方仍列免費活動與11/16新活動，台灣個案未核。SambaCloud舊活動表單可見，但不能證明後端受理或剩餘名額；普通方案及用量可能收費，勿為未確定額度先綁卡購點。Emergent價格頁列免費每月10點，文件稱首日10點及每月補點；免費正式發布一般受限，純前端可能有例外，資格未核。服務條款限免費方案個人非商業，內容訓練可退出未來使用；台灣與免卡未知。Manus Campus條款與現行入口、台灣院校及點數未釐清，暫不新增。

下輪優先：`perplexity-education` 查[官方教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文是否可讀；`perplexity-watch` 查[官方點數說明](https://www.perplexity.ai/help-center/en/articles/13838041-how-credits-work-on-perplexity)目前額度；`taipei-youth-ai-subscription-subsidy-2026` 到期後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及11/10送達期限；`astamuse-agent-trial-oct31-index-only` 向[官方](https://www.astamuse.co.jp/contact/)確認原公告及現行受理；`emergent-free-ten-credits-publishing-watch` 有新訊號或到期時查[免費方案文件](https://help.emergent.sh/plans-the-free-tier)及純前端發布資格。

2026-11-04 11:07–11:16 本輪：起始799筆、到期45筆；局部複核 `kilo-auto-free-hosted-models`、`bazaarlink-taiwan-free-model-gateway`、`deepgram-flux-tts-bonus`，新增機會、政策及觀察線索各0筆；796筆未完成，整筆追查失敗0。Kilo補列11/2新版條款的適用過渡、客戶資料授權及NVIDIA試用端點與生成內容的production限制，不認定這些條文為新設。BazaarLink查閱時免費目錄5款，官方列全站20 RPM及每帳戶並行2請求；免費入口共池與文件逐模型計算仍衝突，搜尋頁計費與文件social段落所稱免費搜尋亦衝突，未實測扣抵。Deepgram仍須先付費消耗，補明多個具獨立目的的合格專案可參與。台灣個案、付款、法律及後端實況未核；未登入、申請或付款。

新線索：Scribe全球教育及非營利Pro訂閱折扣25%，但AI功能範圍與台灣`.edu.tw`資格未核；Linear教育／非營利資格優惠與既有新創方案不同，但AI點數另計且台灣資格未核；Bardeen免費100點週期與免訂閱條件不明。均暫不新增，避免把一般軟體折扣或不明額度誤作已核AI福利。

下輪優先：`bazaarlink-taiwan-free-model-gateway` 查[免費入口](https://bazaarlink.ai/free)與[文件](https://bazaarlink.ai/docs.md)共池和搜尋矛盾；`perplexity-education` 查[教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)正文可讀性；`astamuse-agent-trial-oct31-index-only` 查[官方來源](https://astamuse.co.jp/)及原活動是否有新訊號；`sambacloud-rundown-first100-anniversary-credit-watch` 查[官方公告](https://sambanova.ai/)有無活動期限與申請資格；`taipei-youth-ai-subscription-subsidy-2026` 到期時查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)剩餘預算及11/10送達期限。

2026-11-04 10:06–10:09 本輪：起始799筆、到期47筆；局部複核 `plaud-preview-one-time-work-credits`、`videogen-model1-selected-project-credit-program`，新增機會、政策、觀察線索各0筆；797筆未完成，整筆追查失敗0。Plaud官方FAQ明列新帳戶亦獲Starter一次贈額，修正原僅列既有帳戶的資格；VideoGen一般網站條款要求至少13歲，未成年人須監護人許可、直接監督並同意條款，計畫專屬契約仍未核。兩者台灣個案、費用細節仍未知；未登入、申請或付款。

研究線索：[OpenMined](https://openmined.org/research/grants/) 12週研究補助每人最高US$5,000推論額度及US$2,000津貼，首梯已截止，後續提案待資源與審核；台灣領款、稅及契約未核。本輪未新增紀錄，後續先確認台灣資格及補助可用性。另據研究代理查閱，Kilo條款11/2更新、BazaarLink免費目錄與併發限制有變；尚未由主研究者整合，不計入本輪複核。

下輪優先：`kilo-auto-free-hosted-models` 查[新版條款](https://kilo.ai/terms)及資料授權；`bazaarlink-taiwan-free-model-gateway` 查[免費目錄](https://bazaarlink.ai/free)及[文件](https://bazaarlink.ai/docs.md)的共池衝突；`deepgram-flux-tts-bonus` 查[促銷條款](https://deepgram.com/promotions/2026-09/flux-tts-promo-terms-and-conditions)及先付費限制；`perplexity-education` 查[教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)能否讀取；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及送達期限。

2026-11-04 09:05–09:10 本輪：起始798筆，到期52筆（排除上輪剛核及新增）；局部複核 `granola-students`、`ugreen-ai-nas-hackathon-2026`、`taiwan-hrd-free-ai-introduction-2026`、`river-inference-25-credit`、`kiro-startup-pro-plus-2026`；新增機會 `lambda-research-grant-up-to-five-k-on-demand`，政策及觀察線索各0，未完成793，其中 `perplexity-education`、`perplexity-watch` 官方頁403且瀏覽器安全驗證，未刷新verified_at。未登入、申請或付款。

Lambda研究者經審核最高US$5,000雲端實例額度；一般服務須信用卡及US$10預授權，台灣購買可用不等於補助資格，超額、儲存與稅費須確認。UGREEN正式規則重新可讀：台灣合格居民可參賽，初賽11/15 23:45 PT截止，僅入圍者獲指定一天免費設備；修正風險欄與已核截止日及資格矛盾，保留宣傳日期衝突。River初始費用及免卡未證，設定費由0改未知；現有25美元是否發放及資料保存衝突未解。Kiro Activate資格文字仍衝突，GCR是否涵蓋台灣未明，用盡後自動計費。e等公務園Google／FB紀錄不可轉移，須顯示身分證字號的證明須以我的e政府帳號重上。

下輪優先：`perplexity-education`、`perplexity-watch` 查[官方說明中心](https://www.perplexity.ai/help-center/)安全驗證後正文；`taipei-youth-ai-subscription-subsidy-2026` 於到期後查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算與11/10送達；`fal-flux3-max-five-daily-sandbox` 於到期後核[免費頁](https://fal.ai/flux-video-free)與模型價格期限衝突；`lambda-research-grant-up-to-five-k-on-demand` 有新訊號或月查時查[研究頁](https://lambda.ai/research)補助台灣資格、效期與付款條件。

2026-11-04 08:05–08:11 本輪：起始796筆、到期61筆；避開前輪6筆。局部複核 `snowflake-ai-trial-2026`、`appwrite-education-six-month-two-projects-noncommercial`、`anthropic-guest-investigators`、`satfaq-ai-trial-index`、`fal-flux3-max-five-daily-sandbox`、`meta-hackathon-oct2026`、`lovable-sweden-2026`、`supership-creative-ai-corporate-month`、`hume-startup-forty-million-twelve-months`；新增機會 `mindstudio-eyarc-education-platform-credits`、`posthog-startups-fifty-k-twelve-month-ai-observability`，政策與觀察線索各0；既有未完成787，整筆追查失敗0。Meta額度條款PDF本輪403，其他官方頁可讀，僅局部複核；未登入、申請或付款。

MindStudio/EYARC免費平台點數數量及台灣學校資格未知。PostHog新創額度可抵AI observability，但不能抵列名AI工具，且須先加入按量付費方案。fal免費Sandbox須綁卡，付費折扣官方頁11/7與12/31衝突。Supership試用結束自動轉付費；Lovable瑞典學籍優惠有卡者2027/1/1起自動續費。Anthropic研究合作不提供外部模型或算力。Hume收件實況與台灣核准未核。無項目因此改判台灣個案合格。

佇列改善：Appwrite教育方案官方確認持續接受合格學生，改月查；每人六個月到期未選方案仍停用組織。Sentry新創額度能否抵Seer未明，暫不列為已核AI額度；Miro新創可供後續研究，避免把方案美元抵用額誤當API額度。

下輪優先：`meta-hackathon-oct2026` 在11/5 10:00台北前核[作品期限與額度](https://cerebralvalley.ai/e/meta-ai-developer-hackathon/waiver)，PDF 403未解；`fal-flux3-max-five-daily-sandbox` 查[模型價格](https://fal.ai/models/blackforestlabs/flux-3-max/text-to-video/llms.txt)及[免費頁](https://fal.ai/flux-video-free)11/7與12/31衝突；`anthropic-guest-investigators` 查[徵案](https://www.anthropic.com/news/open-call-guest-investigators-life-sciences)精確截止；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及11/10送達；`mindstudio-eyarc-education-platform-credits` 查[EYARC](https://www.ey.com/en_us/about-us/ey-foundation-and-university-relations/academic-resource-center)台灣學校與點數條件，有新訊號再提前查。

2026-11-04 07:05–07:13 本輪：起始796筆，07:06台北時間到期67筆；避開前輪9筆。局部複核 `google-ai-professional-certificate-tw-pro-3mo`、`robinhood-luna-token-promotion-december`、`claude-security-enterprise-two-month-credit`、`amazon-ara-multilingual-contextual-ai-fall-2026`、`vast-startup-spend-match`、`daytona-startup-amount-conflict`；新增機會、政策及觀察線索各0筆，既有未完成790筆。`perplexity-education`、`perplexity-watch` 官方頁403，僅記錄追查失敗，不刷新verified_at。未登入、申請或付款。AWS非營利、Google研究、AMD開發者與Hatcher候選均已有同一方案紀錄，故不重複新增。

Google台灣課程每月US$49，附AI Pro三個月試用；須合格付款方式，期滿自動續費；課程頁與Google One條款兌換截止日不同，採較早日期。Robinhood Luna限指定token，並非交易或其他模型免費；需符合美國身分與帳戶條件。Claude Security需Enterprise premium seats與消費計費；Amazon研究獎金與額度不是保證金額。Vast現行先消費匹配與舊公告贈額不同，Daytona新創頁與定價頁額度上限仍衝突；後者本次條款正文未取得。

佇列改善：`ai-compass-platform-waiver`、`biztel-ai-promo-index` 依既有官方截止證據由每日改月查，不更動狀態或verified_at；既有申請者權益另依契約，若有新訊號提前追查。

下輪優先：`perplexity-education` 與 `perplexity-watch` 查[官方說明](https://www.perplexity.ai/help-center/)能否取得正文；`meta-hackathon-oct2026` 查[主辦頁](https://cerebralvalley.ai/e/meta-ai-developer-hackathon)作品與既有額度期限；`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算與11/10送達期限；`nchc-university-ai-compute-discount-2026` 查[申請書](https://www.nchc.org.tw/UploadImage/ActiveItem/639209109834443951.pdf)與舊說明期間差異。依到期時間及新訊號選擇，勿重複刷新無變化項。

2026-11-04 06:05–06:09 本輪：起始795筆、台北時間到期73筆，避開前輪剛核案例。局部複核 `fireworks-glimmer-sft`、`deepgram-speak-attendee`、`cyleague-cyber-navi-trial`、`airtop-free-monthly-thousand-signup-bonus-conflict`、`manus-startups-redirect-current-unverified`、`neo4j-startup-aura-twentyk-application-unavailable`、`grammarly-student-annual-half-first-period`、`hostkey-grant-stale-2020-deliverable`；新增 `wiro-startups-tiered-api-credits`，其餘787筆既有紀錄未完成本輪複核。CyLeague申請表403、Grammarly學生原文轉登入，但其他官方來源支持所列局部主張；不將個別來源失敗當作整筆複核失敗。未登入、申請或付款。

Wiro新創額度依人工審核200至5,000美元，申請免卡，台灣個案、贈額效期及自動存取條款與API宣傳界線待確認。CyLeague僅試用免費，正式Starter為每年60萬日圓未稅年繳；修正經常費用欄位，避免誤認正式服務免費。Fireworks訓練內評估與部署另計費；Deepgram須現場報到且使用同一企業信箱，既有帳戶亦可。Airtop新註冊關閉，11/13停服；Manus及HOSTKEY官方頁面仍有矛盾，Neo4j表單仍暫不可用，不能據此斷言計畫終止。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及11/10送達期限；`innopad-taipei-startup-ai-workshop-20261104-watch` 查[公告](https://innopad.taipei/news/01a16711-9c28-7305-adaf-3a49dd28660c)活動後狀態；`nchc-university-ai-compute-discount-2026` 查[申請書](https://www.nchc.org.tw/UploadImage/ActiveItem/639209109834443951.pdf)與舊說明期間差異；`perplexity-education` 查[教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)能否取得正文；`wiro-startups-tiered-api-credits` 查[官方條款](https://wiro.ai/agreement/terms-of-service)自動存取與API範圍，並確認台灣資格及額度效期，若無新訊號依月度輪替。

2026-11-04 05:05–05:10 本輪：起始794筆，按台灣時間實際到期78筆；避開前輪剛核案例。局部複核 `taipei-youth-ai-subscription-subsidy-2026`、`innopad-taipei-startup-ai-workshop-20261104-watch`、`nchc-university-ai-compute-discount-2026`、`taiwan-adi-ai-compute-115`、`synthesia-basic-monthly-ten-min-five-hundred-no-download`、`runable-free-daily-fifteen-hundred-monthly-cap`；新增 `superhuman-docs-startup-six-month-partner-ai`。未完成複核788筆，其中 `astamuse-agent-trial-oct31-index-only` 原頁404、`perplexity-education` 和 `perplexity-watch` 官方頁403，皆未刷新核實時間。未登入、申請或付款。

Synthesia詳細表重證每人1,000 Syren專用點一個月；Basic有浮水印且不能下載，台灣及活動截止未知。ADI新資料聲明記載備份寬限後銷毀及稽核日誌保存，與舊須知適用關係未明；已截止收件改月查。新增Superhuman新創方案限合格團隊，合作夥伴申請才含官方所稱無限AI，台灣及期滿扣款未知。AISquared學生方案要求美國大學及.edu，非營利方案要求501(c)(3)，台灣一般資格不成立；Airtable教育／非營利折扣排除AI，未納入。Superhuman學生與非營利新申請已暫停，不能沿用舊頁判作開放。

品質改善：修正astamuse重複JSON鍵導致較新追查時間被覆蓋；`tests/validate.py`拒絕重複鍵。索引到期項須以Asia/Taipei解析含時區與無時區時間，不能以UTC日期切片。

下輪優先：`taipei-youth-ai-subscription-subsidy-2026` 查[青年局](https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796)預算及11/10送達期限；`innopad-taipei-startup-ai-workshop-20261104-watch` 查[公告](https://innopad.taipei/news/01a16711-9c28-7305-adaf-3a49dd28660c)活動後狀態及樓層；`nchc-university-ai-compute-discount-2026` 查[申請書](https://www.nchc.org.tw/UploadImage/ActiveItem/639209109834443951.pdf)與舊說明期間差異；`perplexity-education` 查[教育說明](https://www.perplexity.ai/help-center/en/articles/12590157-what-is-education-pro)能否取得正文；`synthesia-basic-monthly-ten-min-five-hundred-no-download` 查[定價表](https://www.synthesia.io/pricing)限時活動及個案資格。

2026-11-04 04:05–04:08 本輪：起始 793 筆，到期 74 筆；避開前輪剛核的經濟部課程、Go2 OCR 與 Cool English。複核 `picsart-wan3-promotion-fair-use`、`chatgpt-back-to-school-us`、`deepseek-search-fetch-window`、`weaviate-engram-free`；其中後三筆未到期，本輪不應排入例行輪替，下輪須先以期限過濾。新增機會 `wiro-student-200-credit`，政策及線索各 0。既有未完成複核 789；`perplexity-education`（403）、`claude-artifacts-expired-lead`（404）、`tabnine-basic-free-retired`（原公告轉址）追查失敗，未刷新核實時間。未登入、申請或付款。

Wiro 全球高教在學學生可申請一次200美元點數，入帳後12個月有效，學校信箱、人工審查；免卡免訂閱，不得轉售或用於客戶工作。台灣個案未測。Picsart 已截止且 Ultra 兩個官方頁價格不一致；美國學生優惠已截止，須美國合格院校學籍，四個免費月後自動續費。DeepSeek 工具免費期結束，每千次成功請求0.75美元；Engram 停止新建專案，既有專案至12/31。均非全面核查。

佇列品質：已截止的 `suitup-oct2026`、`qoder-ultimate-offpeak-oct2026` 依既有截止證據由每日改月查；未刷新 verified_at，其他已截止項須逐案判斷是否仍有使用者風險。

前輪交接（歷史）：`perplexity-education`、`astamuse-agent-trial-oct31-index-only`、`picsart-wan3-promotion-fair-use`、`claude-artifacts-expired-lead`、`tabnine-basic-free-retired`；AISquared 非營利及學生方案當時尚待確認。最新優先清單與研究結果見上方本輪紀錄。

每輪先索引到期清單及前次 reviewed/new IDs；成功讀取才更新 verified_at 和具體來源查閱時間，失敗記錄嘗試而不延後一個月。僅有新條件、來源矛盾或新基準才追加政策歷史；核對完成後重算評分並執行下列測試、瀏覽器及 Pages 公開版本確認。

本專案為無後端靜態網站，可由 GitHub Pages 的 main 根目錄發布。
驗證：python tests/validate.py；node --check app.js；node tests/filters.cjs。
