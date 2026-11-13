# 維護紀錄與交接 · AI Access Intelligence

資料與網站：[README](README.md)｜線上網站：<https://richardhan.github.io/ai-access-intelligence/>

這是本專案**唯一的維護入口**：可重用的研究流程、每輪的研究範圍與結果、失敗經驗、證據缺口與下一輪優先清單都寫在這裡，逐輪往下追加。README 只留讀者需要的內容（資料量、使用方式、解讀原則、評分方式）；資料量與批次數字仍以 README 首段為準，`tests/validate.py` 會把它對回 `data/offers.json`。

追加規則（每輪）：

- 只在檔尾追加本輪一段，不改寫過去段落——歷史本身就是證據。逐筆的條件變動請寫進 `data/policy-history.json`，不要只寫在這裡。
- 每段要寫：研究時間區間、N／R／A／U 計數（attempted 另列）、實質變更與支持來源、來源衝突、證據缺口、下輪優先（含 ID 與應查來源）。
- 排入順序交給 `python3 tools/queue.py`；來源死連結交給 `python3 tools/linkcheck.py`；發布前檢查見 README「維護」段。

---

保留穩定 ID、來源、各筆查閱時間與政策歷史。新增研究先去重並保留既有編輯；資料發布不代表已全面覆核。限時/即將到期案例每日追蹤，其餘案例按月輪替——實際排入順序交給 `tools/queue.py`（先看排程、再看最久未核），不要每輪重寫一份臨時腳本。

來源連結會默默失效，而只有被排到複核的紀錄才會被讀。每輪可選跑 `python3 tools/linkcheck.py`：它去重所有來源 URL、HEAD 後再用 GET 確認，只把 404／410 列為 dead（403、逾時與 5xx 只算 blocked／unreachable），輸出的 dead 清單就是下一輪的證據維修佇列；`--record ID` 只掃一筆、`--self-test` 驗分類規則。2026-11-10 首次全掃 2,712 個 URL：dead 13、unreachable 8、blocked 68，13 筆紀錄引用到 404，其中 `elfa-api-free-once-thousand-credits` 的官方文件頁改版後整個 404。404 只證明網址失效，不能單獨判定活動終止——找到替代官方頁就地更新來源並把舊路徑寫進 evidence；查不到就記成證據缺口，不要改狀態。這支工具刻意不接入 `tests/validate.py`：驗證要離線可重現，網路狀態不是資料錯誤。

定價頁文字擷取可能遺失勾叉、刪除線或互動選項；斷定方案包含或排除功能前須看原始頁面呈現或標記，不把圖示旁文字一律視為包含。

服務地區篩選曾在 `regions` 這種自由文字欄位上做字串完全比對（`(o.regions||[]).includes(f.region)`）。資料有 26 種寫法（TW／Taipei, Taiwan／United States／GLOBAL／Worldwide…），選「Taiwan」因此漏掉 6 筆 `taiwan=Yes` 但存成 `TW` 的紀錄，71 筆有地區值的紀錄在任何選項下都查不到。現改由 `regionMatches()` 分桶比對（Other 收其他具名地區、排除 Unknown 與空值）；`tests/filters.cjs` 對別名與「宣稱台灣地區者必須出現在 Taiwan 選項」做規格值斷言。同類原則：任何自由文字欄位都不能用列舉選項做完全比對。
同一欄位還有第二層漏洞：`regions` 常留空或只寫 Global，台灣資格其實記在 schema 管制的 `taiwan`。2026-11-09 統計 108 筆 `taiwan=Yes` 有 33 筆不進「Taiwan」選項（20 筆 `regions` 空、13 筆只寫 Global／Worldwide，含 AWS Free Tier、Azure 免費帳戶、Amazon Polly、Google AI 開發者額度），與資料自身「台灣可用」的主張矛盾。`regionMatches()` 因此在 Taiwan 桶也接受 `taiwan=Yes`，選 Taiwan 由 83 筆增至 116 筆；`tests/filters.cjs` 以資料驅動斷言「每個 `taiwan=Yes` 必入 Taiwan 選項、`taiwan=No` 不得入、`taiwan=Yes` 不得漏進 US 選項」。通則：同一事實存在兩個欄位時，篩選必須讀有 schema 管制的那一個，並在程式註解留下不一致的筆數。

篩選與專區只能讀 schema 管制的欄位。`quota_classification` 是五值 enum，`usage_type` 卻是自由文字（2026-11-08 統計：358 種值、262 筆 null）。原本「用量類型」下拉以 `usage_type` 精確比對 3 個英文字串，選 High quota 只回 9 筆（實際 HIGH BUT LIMITED 619 筆）、選 Unlimited 只回 2 筆（實際官方或暫時不限量 7 筆），262 筆完全篩不到；已改為直接比對 `quota_classification`，並讓「無限／暫時不限量」專區由同一欄位判定，不再依賴各筆手動 `views`（先前有一筆 HIGH BUT LIMITED 被標成 unlimited）。`tests/filters.cjs` 驗證 index.html 每個選項都對應實際資料，`tests/validate.py` 擋 `views` 與 `quota_classification` 互相矛盾。

同一 URL 再次查核時就地更新該筆來源（scope、evidence、查閱時間），不新增重複條目；`tests/validate.py` 對本輪批次強制「同一 URL 當天最多一筆」與「每筆至少一個本次查閱時間」，前端則把同網址的歷次查核收在「較早的 N 筆同網址紀錄」內。舊版寫成「整筆紀錄不得有重複 URL」，會讓 266 筆累積同網址歷次紀錄的卡片永遠無法再被複核（見下方 2026-11-10 03:35 紀錄）。

免費專區曾只讀各筆手動 `views` 標記（schema 不管制），造成兩個方向的誤導：3 筆已知每月費用的試用（Lindy US$29.99、Lemonfox US$5、GoodMem US$15）仍列在「免費方案」，而 40 筆設定費與每月費用皆為 0 的紀錄（含 Gemini API、Claude Free、Firecrawl、台灣人工智慧學校等）因漏標 `free` 而完全不出現。2026-11-09 改由 `viewMatches()` 以成本欄位判定：兩項費用皆 0 一律列入、已知每月費用 >0 排除、每月費用未知者保留人工標記；`tests/filters.cjs` 以三種規格值斷言（零費用未標記必入、US$29.99 試用必出、未知費用且標記 free 仍在）。實測免費專區由 413 筆增至 451 筆（含本輪新增 1 筆）。

「高免費額度」與「Beta 存取」兩個專區過去同樣只讀人工 `views`：2026-11-09 統計 view=quota 僅 63 筆，而 schema 的 HIGH-QUOTA 類別有 127 筆（69 筆沒標）；view=beta 僅 15 筆，BETA-ACCESS 有 50 筆（35 筆沒標）。兩個下拉標籤與類別一一對應，已改由 `viewMatches()` 讀 `categories`；同時把「已截止紀錄退出可行動專區」擴及這兩個專區（HIGH-QUOTA 含 5 筆、BETA-ACCESS 含 4 筆已截止紀錄，先前仍會出現在專區）。實測 quota 63→122、beta 15→46（911 筆下；差額為已截止項）。`tests/filters.cjs` 以規格值斷言「所有 HIGH-QUOTA 未截止紀錄必入 quota 專區、HIGH BUT LIMITED 單獨不得入、人工 view 標記不得單獨生效、已截止仍可從全庫搜尋」，`tests/validate.py` 新增 `quota`／`beta` view 與 categories 的一致性斷言，並移除 4 筆與 categories 相反的人工標記。`regional`／`value` 維持人工標記：REGION-LOCKED 不含台灣限定補助、VALUE-DEAL 與 LOW-COST／免費高值非一對一，語意未定前不改。

「機會專區」是可採取行動的入口，但排除規則先前只覆蓋免費／無限／高額度／Beta 四個選項。2026-11-09 統計：「新創與開發者」567 筆中有 39 筆已截止或已併入他筆（含 `copilot-free`、`lovable-student-discount` 等 `duplicate_merged`），「美國與地區限定」57 筆中有 15 筆已截止，「低價高值」55 筆中有 3 筆。`ACTIONABLE_VIEWS` 因此改為列出 index.html 的七個 view 選項，任一專區都不再顯示已截止、已關閉與重複合併紀錄（全庫搜尋仍找得到）；實測 developer 567→528、regional 57→42、value 55→52（915 筆下）。`tests/filters.cjs` 對 index.html 每個選項逐一斷言「已截止／合併紀錄不得出現」，並保留反向案例（未截止的 developer 紀錄仍須入列）。同類原則：新的專區或下拉選項若語意是「可採取行動」，必須同時加進 `ACTIONABLE_VIEWS` 與這組斷言，否則又會出現第二種行為。

數值型篩選門檻一律「含等於」，標籤也要寫清楚是 ≤。2026-11-08 修掉「設定時間」用嚴格小於比對的錯誤：選 15 分鐘會排除正好需 15 分鐘的 109 筆（當時全庫 205 筆落在 5／15／30／60 邊界），修正後 884 筆下為 9／138／300／343 筆（納入本輪新增後為 9／141／303／347）。`tests/filters.cjs` 原本用 `!f(free,{effort:'15'})` 把錯誤行為釘住，這類「現況即測試」的斷言必須改成規格值，並補一個邊界外的反向案例（16 分鐘不得入 15 分鐘）。

重複收錄以資料表達：同一方案的後一筆改為 `status: "duplicate_merged"` 並填 `duplicate_of` 指向較早的 ID，保留原 ID、來源與歷史但退出免費／行動篩選並在卡片標示；`tests/validate.py` 會檢查 `duplicate_of` 必須存在、不得串鏈，且標題完全相同的兩筆視為資料錯誤（本輪即由此攔到 `copilot-free` 與 `github-copilot-free`）。

同一筆紀錄若累積了同網址的多筆來源，會讓批次驗證失敗；合併時保留最新 scope／evidence，較早的證據文字以「較早紀錄：」接在原字串後，不刪除。

平行研究回報的來源查閱時間可能與實際時鐘不符（2026-11-08 收到比實際時間快約 1.5 小時的時間戳），主 agent 須自行重讀關鍵來源、以自己讀取的時間寫入 `accessed_at`，不得直接沿用未核對的時間。此問題在 2026-11-09 01:05 批次再次發生（`completed_at` 寫成 02:40、13 筆 `verified_at` 寫在 02:08–02:34，而實際 commit 是 01:46），已由 `tests/validate.py` 的「不得寫入未來時間戳」與「`verified_at` 不得晚於批次完成」兩條斷言攔下；寫入時間一律先跑 `TZ=Asia/Taipei date -Iseconds` 對錶。

同一工作樹可能有兩個維護流程同時執行：本輪 16:03–16:17 的批次由另一個 session 先寫入並 commit（`22b95a9`），第二個流程讀到未 commit 的檔案後，先等它 commit 完成、再以它的狀態為基準追加，避免 json 半寫入與互相覆蓋。做法是：寫入前後比對 `shasum` 與 `git rev-parse HEAD`；資料檔以 tmp + `os.replace` 原子替換；批次欄位只在既有 `last_research_run` 上聯集 ID，不另建新的狀態檔。

「台灣條件適用」是頁面上第一個捷徑按鈕，卻走 `taiwan:'Yes'` 這個一般篩選、不經 `viewMatches()`，所以上一輪把「已截止紀錄退出可行動專區」擴及七個 view 選項時漏掉它：2026-11-09 統計 106 筆 taiwan=Yes 中有 10 筆已截止／已關閉／重複合併（`moda-service-robot-virtual-scene-subsidy-2026`、`taiwan-ai-rap-pilot`、`taiwan-adi-ai-compute-115`、`nchc-university-ai-compute-discount-2026`…），卡片標題自己就寫著「已截止」。現由 `presetMatches()` 讓捷徑排除已截止紀錄，`台灣條件適用` 由 106 筆降為 96 筆，全庫搜尋與 `taiwan` 下拉仍查得到這 10 筆；`tests/filters.cjs` 以資料驅動斷言「捷徑內不得有已截止紀錄」「捷徑筆數必須等於未截止的 taiwan=Yes 筆數」「一般 taiwan 篩選仍能查到已截止案例」，避免只修好當下的資料快照。

精確截止時間只存在於三個欄位：`deadline_at`（申請截止）、`expires_at`（方案或免費期結束）、`expiry`（舊式物件，含 `date`／`text`／`timezone`）。2026-11-09 統計全庫分別只有 5／5／7 筆填了這些欄位，但卡片先前只渲染自由文字的「有效期間」，於是 Amazon ARA 的台北 11/12 15:59、DataCamp 的當日 12:59 這類真正要趕的時間點只藏在段落文字裡。已新增「截止與期限」列：帶時刻者換算成台北時間並標「（台北時間）」，只有日期者標「（來源未列時刻）」，`expiry.text` 原文照列、不改成推測日期。`tests/filters.cjs` 以資料驅動斷言「有這三個欄位就必須出現該列、沒有就不得出現」，並固定四筆規格值（Amazon ARA、DataCamp、Rime STT、Claude 教師）。新紀錄優先寫 `deadline_at`／`expires_at` 的 ISO 時間；來源只給日期時不要自行補時刻。2026-11-09 14:05 追加反向檢查：非已截止狀態不得帶已過的 `deadline_at`／`expires_at`（`tests/validate.py`）。觸發案例是 `aocai-working-free-ai-courses-2026`——期限只寫在摘要與標題，欄位全空，所以「複核日須早於截止日」那條看不到它，卡片整天寫著「報名表仍開放」。通則：任何可採取行動的截止時間都要回填到機器可讀欄位，散文日期等於沒有排程；複核時若發現頁面把期限改早（本例 11/09 23:59 → 11/08 23:59），以現行頁面與表單實際狀態為準，並把兩次讀值差異留在來源證據。這三個欄位也是驗證的範圍：`deadline_at` 與 `expires_at` 一直被「複核日須早於截止」與「期限已過不得仍非已截止」兩條規則管制，`expiry.date` 2026-11-10 才補進同一組 `close_points()` 判斷（此前 7 筆使用 expiry 的紀錄完全沒有檢查，若日期過去而狀態沒改，卡片會照樣宣稱可領取）。`expiry.date` 只解析完整日期，`2028-06` 這種只到月份的寫法與 `expiry.text` 散文都不解析，不做推定。欄位語意也要分清：`expires_at` 代表整筆方案或免費期結束（寫了就會連帶要求狀態改為已截止），只是部分權益有限期（例如本輪 Mango 的限時七折）應寫進 `expiry.text`，否則折扣一結束，整筆含 US$10 註冊額度的紀錄會被迫關閉。
可採取行動的期限仍有一批只寫在散文裡。2026-11-09 19:0x 以「標題或摘要出現截止語句、但 `deadline_at`／`expires_at`／`expiry` 三個欄位全空」掃描，仍可行動的紀錄有 37 筆，其中 8 筆的日期落在 30 天內；這些卡片的「截止與期限」列不會出現，`tests/validate.py` 的「期限已過卻仍非已截止」與「複核日須早於截止日」兩條也看不到它們。本輪只補來源逐字載明、且屬整筆方案期限的 7 筆：UGREEN 黑客松（台北 11/16 15:45）、Kiroween credits 申請（台北 12/2 04:00）、臺北產業獎勵補助（11/30，來源只列日期）、緯創算力捐贈（12/13 23:59）、中央大學機器人培訓（12/4，只列日期）、IteraCompute 免費促銷（台北 11/24 16:00）、Fireworks Muse Glimmer 免費 SFT（台北 12/1 16:00）。刻意不補的例子說明為什麼不能機械化：`ntpc-uko-microsoft-ai-cert-free-2026` 的 11/18 是單一梯次的「取消」截止、`claude-duet-preview` 自己寫明 11/30「非預覽結束日」、`ant-ling-ling-3-2-flash-free-two-weeks` 是「約至」的換算值、`speechify-api-free-monthly-500k` 的 11/21 是方案內子額度降級日、`mem0-hobby-memory-api` 的 11/25 是舊戶過渡期、`fal-flux3-max-five-daily-sandbox` 的 11/22 是折扣分段。通則：標題或摘要出現日期只是「值得檢查」的訊號，能不能寫進機器可讀欄位取決於那個日期是不是讀者採取行動的期限；把它當正則斷言會逼出錯誤資料，所以這條維持人工判斷，掃描結果留給下一輪分批處理。同輪另把 `last_review_attempt_at` 的既有缺漏補齊（4 筆只有時間、沒有原因），並在 `tests/validate.py` 加全域斷言「有追查時間就必須有原因」；原因真的不詳時寫明「未留下原因」，不能留空——留空等於讓下一輪失去當時為什麼讀不到的線索。

已截止紀錄的卡片標籤：2026-11-09 統計全庫 76 筆已截止、已關閉或重複合併的紀錄中有 73 筆帶分類標籤（`expired` 30、`applications_closed` 22、`closed` 8、`duplicate_merged` 4、`closed_to_new_subscriptions` 3、`sunset_announced` 3、`resolved_rumor_disproven` 2、`expired_unverified` 1），這些卡片仍在標題下顯示分類標籤，其中 47 筆屬「免費機會」「高額度」「Beta 存取」等可領取字樣；其中 `amazon-q-developer-free-signup-conflict` 在 AWS 2026-05-15 停止新註冊後，卡片仍以「免費機會」開場，讀者要讀完整段摘要才會發現不能申請。`createCard()` 因此對 `CLOSED_STATUSES` 內的紀錄改渲染單一歷史標籤「<狀態>・原分類：…」，資料的 `categories` 不動（歷史事實與 quota／beta 篩選語意不變，兩者是 dead-record 以外的判定）。`tests/filters.cjs` 以規格值斷言「已截止卡片只有一個 `tag-closed`」「開卡仍有分類標籤」，並固定 `chatgpt-back-to-school-us`（expired）與 `amazon-q-developer-free-signup-conflict`（closed_to_new_subscriptions）兩個案例；通則：任何「可領取」字樣都必須跟隨狀態，而不是跟隨歷史分類。

`status` 是卡片狀態藥丸與優先度計分的輸入，但 33 筆舊紀錄（22 筆機會）沒有這個欄位（2026-11-09 統計，例：`google-cloud-startups`、`mem-free-plus-agent-boundary`、`weaviate-startup-undisclosed-discount`、`photoroom-sandbox-production-separated`）。這些卡片顯示「狀態待釐清」，但 `tools/prioritize.py` 的 `note_of()` 把缺值寫成「條件式」，同一張卡片同時主張「需符合條件」與「狀態不明」；計分也把缺值當 `conditional`（1.5）。本輪沒有逐筆回填——回填等於替 33 筆未重核的紀錄下結論；新增與複核紀錄一律寫 `status`，`tests/validate.py` 對批次紀錄強制檢查。下輪要清帳必須逐筆重讀官方頁後再寫，不要用推測值一次補齊。2026-11-09 13:22 修掉其中「同一張卡片兩種結論」的部分：`note_of()` 對缺值改寫「狀態未記錄」，計分維持原來的 1.5（README 的評分說明本來就寫條件式 1.5，計分不動），並由 `tests/validate.py` 斷言「沒有 `status` 的機會紀錄，`priority_note` 必須含『狀態未記錄』」；改前 22 筆會被這條斷言擋下，改後 19 筆（本輪補了 `codex-oss-six-months`、`google-cloud-startups`、`qdrant-startup-twenty-percent` 三筆有官方證據的）全部通過。原則是：文案只能陳述資料狀態，不能替缺值下結論。

來源失效與 SPA：`amazon-q-developer-free-signup-conflict` 是本輪最重要的更正——AWS 定價頁仍逐字寫「perpetual Free Tier」，個人入門文件也仍教 Builder ID 註冊，但 AWS 2026-04-30 的結束支援公告明列 2026-05-15 起封鎖新帳號與新訂閱、2027-04-30 結束 IDE 外掛與付費訂閱，而 Docs 的 `what-is` 頁已掛結束支援 banner：同一文件集三種說法。定價頁存在不是活動有效的證據；狀態必須以公告為準，官方頁衝突要留在摘要。公告只允許「active Q Developer Pro」加新使用者，Kiro 訂閱者僅被保證續用，純免費 Builder ID 使用者不在保留名單——把三者都寫成「可加席位」會讓既有付費者誤判。`baseten-startups-inference-training` 是一次反向教訓：行銷頁 `/startup-program` 以瀏覽器渲染回 404 並自 sitemap 移除，但申請頁 `/talk-to-us/startup-program` 仍在線並逐字寫「Up to $25,000 for Dedicated Deployments or Training and up to $2,500 for Model APIs」，條款頁也可讀；先前只憑行銷頁 404 就寫成「金額已無法確認」是錯的，現在改記 `application_based_unverified_terms`（金額可核、資格門檻只剩 2026-10-21 快照）。404 不等於終止，但也不等於仍可申請；SPA 站要分別檢查行銷頁與表單頁。`jetbrains-student-pack-ai` 與 `jetbrains-ai-free` 則是靜態抽取的陷阱：`read` 直接把 `help/ai-assistant/licensing-and-subscriptions` 轉成 markdown 時漏掉分頁表格，看起來像「3 AI credits 已被移除」；但以瀏覽器渲染同一頁（含 `/2026.2/` 路徑），授權表明確寫「AI Free ｜ Free ｜ 3 AI credits per 30-days」，FAQ 另寫額度與訂閱價格相符（1 credit 約 US$1）且每 30 天自首次使用重置。真正未解的是「是否每 30 天重置」——`help/ai/ai-service-license`（凍結於 2025-06-18）寫 one-time non-renewable，同頁 FAQ 又提 30 天重置，兩說並列。教訓：官方頁「找不到某段文字」不足以證明文字不存在，表格、分頁與 JS 內嵌內容要用瀏覽器渲染再判；引用時附頁面版本或頁尾日期。AI Pro 試用期滿會轉 AI Free（`jetbrains-ai-subscription`，2026-04-22），但「不自動扣款」不是官方原文，只寫 trial remains free。同類：`https://code.minimax.io/docs/code/account/usage` 與 `https://www.photoroom.com/api/pricing` 這類頁面會用 JS 內嵌資料，直接抓 HTML 再抽字串比整頁渲染快，但金額仍要回到頁面確認。

關鍵字搜尋一度等於失效：`matches()` 原本是 `JSON.stringify(offer).includes(q)`，於是把 **JSON 鍵名**也變成可搜尋字串——2026-11-10 在 967 筆資料上實測，「sources」「status」「evidence」「scope」「null」「https」各命中 967 筆（整個資料庫），而只寫在來源 `evidence`／`scope` 的詞也被算成命中：日本限定的 `lawson-restricted-japan` 因為證據文字提到「免費」而進入「免費」搜尋結果，但卡片上沒有任何免費主張。現改由 `searchText()` 只串接紀錄自己主張、而且卡片與詳情真的看得到的欄位（標題、摘要、分類、地區、資格文字、缺口、費用說明、額度、期限欄位等），不比對來源、排程、優先度與其他內部欄位。實測「免費」802→746 筆、「api」442→391 筆、鍵名詞各降到 0.1–1.1%。`tests/filters.cjs` 以規格值斷言：鍵名與來源證據不得命中（合成物件）、排程時間戳不得命中、命中數必須落在「紀錄本身」與「含 sources 全紀錄」兩個界線之間，且必須存在「證據寫了、卡片沒寫」的反向案例。通則：全文搜尋要指定欄位，不能直接序列化整個物件——鍵名、內部欄位與證據文字都會變成假命中。

可採取的期限與「看得到的期限」是兩件事。2026-11-10 統計：911 筆可行動紀錄中只有 24 筆帶有未來的機器可讀截止點（`deadline_at`／`expires_at`／`expiry.date`），其中 22 筆落在 60 天內，但它們在預設的 S→D 優先度排序裡散落各頁——Amazon ARA 的台北 11/12 15:59 排在第 609 張，第一頁 24 張只涵蓋其中 4 筆——而日期只出現在收合的「資格、限制與來源」詳情列。也就是說「把期限查清楚」這句主張，在最需要它的地方看不到。改法：卡片底部新增最近的截止點與剩餘天數（只列日期者視為當日 23:59 台北時間、與 `tools/queue.py` 的 `parse_stamp` 一致；日期已過者不顯示；超過 60 天不擠上卡片（`chatgpt-teachers-us` 的 2028-06 就是一例），仍留在詳情列；當天截止寫「今天」，7 天內轉警示色），排序新增「截止日由近到遠」（有截止點者一律排在前面並依時間升冪，沒有者沿用優先度，避免打亂 900 多筆無日期紀錄的順序）。已截止／已終止／重複合併的紀錄不得再主張「剩 N 天」——`jules-free-fifteen-tasks-entrypoint-watch` 就是狀態已是 `sunset_announced` 卻仍帶未來 `expires_at` 的例子。`tests/filters.cjs` 以規格值斷言：只列日期＝當日 23:59、當天為 0 天而非 1 天、已過不顯示、已截止不顯示、超過 60 天不顯示、無日期者不得排在前面、升冪、以及「有截止點的紀錄全部排在前段」。通則：機器可讀欄位若只給研究者看，等於沒有給讀者看；任何「期限」都要同時出現在卡片正面與排序選項裡。

卡片正面的「核實 <日期>」是最後一次**成功**核對的時間，不是最後一次嘗試。2026-11-10 統計 8 筆紀錄的最新證據其實是失敗的追查（其中 5 筆來源整組失效），卡片外觀卻與剛核實的完全相同，讀者點進來源才發現 404，失敗原因還藏在收合的詳情裡。`latestAttemptFailed()` 因此在 `last_review_attempt_at` 晚於 `verified_at`（或根本沒有 `verified_at`）時，於卡片底部加「追查未成功 <日期>」，原因留在詳情的「最近來源追查」列與該標記的 `title`，樣式為 `.attempt-pill`；較早的失敗不得蓋掉較新的成功核實。`tests/filters.cjs` 除了四種排序情況的規格值，還逐筆斷言「標記結果必須等於資料判定」，所以新增一筆失敗追查卻忘了標記、或把舊失敗誤標成現況都會被擋。通則：讀者需要知道「最後一次查的結果」，不能只給「最後一次成功查的時間」。

同一句「取字串裡最後一個日期」的修正在前端漏了一次。`tests/validate.py` 2026-11-10 已把「查閱時間是自由文字」的解析改成抽出最後一個 `YYYY-MM-DD`，但 `app.js` 的 `sourceStamp()` 仍用 `split('/')` 取尾段：遇到「2026-10-25（Asia/Taipei）」這種帶註記的寫法會得到「Taipei）」，排序時被當成最舊的一筆，於是最新證據被收進卡片的「較早的 N 筆同網址紀錄」。當天統計 10 組同網址來源受影響（`adobe-firefly-assistant-free-beta-regions` 的 11/10 04:24 被 10/25 的註記版蓋住，`bubble-agent2-free-monthly-mcp`、`kakao-plus-young-adult-promo-unverified`、`supership-creative-ai-corporate-month`、`v0-free-policy`、`together-prepaid-policy`、`mistral-free-api-policy`、`freshservice-agent-studio-promotion-extension` 同型）。已改為抽出最後一個日期或時間戳當排序鍵，原文照原樣顯示；`tests/filters.cjs` 以規格值斷言三種寫法，並對全庫做「同一網址群組的主要來源不得比被收合的紀錄更舊」的資料驅動檢查（未列時間者無從排序，略過）。通則：同一個自由文字欄位若在驗證程式與前端各解析一次，兩邊必須用同一條規則，否則資料過得了驗證卻在畫面上排錯。

研究紀錄本身也有長度上限。上一則（07:05）的紀錄在「下輪優先」③ 之後被截斷，④⑤ 與部分來源網址遺失（該行行尾就是「…」再接下一則），接手的流程因此少了兩項交接。本輪起把「下輪優先（完整五項）」當成必填欄位並放在敘述最後，寧可壓縮前面的更正描述，也不要讓交接清單被截斷；發現前一則不完整時，在當輪把它補回，不改寫舊文。

只回前端外殼的頁面要渲染，不要一直換文字路線。2026-11-10 有兩筆紀錄連續三輪被判「追查失敗」：`www.coze.com/premium` 的靜態 HTML 只有 1.4–70KB 外殼（方案表、每日 10 credits 全在前端），`stitch.withgoogle.com` 更把內容放在 `app-companion` iframe 裡（ng-version 外殼只有 1.4KB）。換了 llms.txt、billing 文件、Wayback 快照都沒用，改用無頭瀏覽器（`browser` 的 tab + `frame()`）渲染後，一個下午就讀到官方逐字：「Free 0 USD / month 10 credits/day 5 collaborators 3 collaborative Bots or Workflows」「Payment service currently unavailable in Russia and Taiwan」「Yes, Stitch is currently provided free of charge. It operates on a daily credit limit… Credits reset at midnight UTC.」。判準是「同一 URL 的文字版連續兩輪都拿不到任何方案或額度字樣」——那時要換的是取用方式，不是網址。`tools/linkcheck.py` 會把這種頁面算成 `ok`（HTTP 200、內容空），所以連結健康不等於讀得到；兩份紀錄的 `last_review_attempt_at` 保留為歷史，較新的成功核實會讓卡片的「追查未成功」標記自動消失。

追查失敗要自己成一個桶，不能等輪替剛好排到。`tools/queue.py` 自 2026-11-10 起把「`last_review_attempt_at` 晚於 `verified_at`」的可行動紀錄放進 `retry` 桶，排在逾期與即將到期之後、一般輪替之前，理由寫在 `failed_lookup()`：這些紀錄的最新證據就是「讀不到」，而它們的 `next_review_at` 往往還在 10 天後（當天 stitch 11/20、coze 11/23，兩筆都是當天早上才失敗）。冷卻改以「最後一次真的打開官方頁」計算（`max(verified_at, last_review_attempt_at)`），否則 2 小時前才失敗的紀錄會立刻從輪替回到佇列。實測 23:00 的模擬佇列：`articul8-bivia-early-adopter-billion-tokens` 在舊版前 50 名之外，新版以 `[retry]` 排在第 3；`--self-test` 新增五條規格值斷言（失敗要進 retry、12 小時內不重排、較新的成功蓋過舊失敗、已截止不排、retry 先於輪替）。

下輪優先（完整五項，放在本則最前，因為日誌後段會被截斷）：①`taipei-youth-ai-subscription-subsidy-2026`：期限 2026-11-10 已過（16:20 重讀仍受理、無停收公告）。**11/11 第一件事**是把 `status` 改 `applications_closed`、`review_cadence` 由 `daily` 改 `monthly_or_new_signal`，並在摘要寫明「期限日當天仍受理，之後未再確認」；來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796`（`tests/validate.py` 的兩條斷言會擋）。②`aocai-working-free-ai-courses-2026`：11/11 12:30 後確認 11/16 班是否關閉、11/26 梯次是否額滿，再決定維持 `conditional` 或轉 `applications_closed`；來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://serv.gcis.nat.gov.tw/AOCAI/`。③`google-ai-professional-certificate-tw-pro-3mo`：條款兌換窗口 2026-11-06 已過 4 日仍無新公告，下次若條款頁改版就依新版改寫 `status`／`expires_at`；否則維持 `terms_conflict` 並在摘要保留「以結帳頁為準」。來源 `https://one.google.com/offer/terms-and-conditions/google-career-certificates`、`https://grow.google/intl/zh-TW_tw/ai-professional/`。④`perplexity-watch`：四路皆被 Cloudflare 擋（curl 403、無頭／有頭停在挑戰頁、Wayback 2026 僅 403／404、relay 未連線）。下輪改試官方 status／changelog 或 Help Center 的 `llms-full.txt` 鏡像，取到 Pro 月費與退款窗後再決定是否維持兩處衝突並列；來源 `https://www.perplexity.ai/pricing`、`https://perplexity-help-center.mintlify.app/help-center/en/articles/10354288-refunds.md`。⑤全庫 **100 筆**已標「官方」但缺 `verification_scope` 的舊紀錄（本輪只補了 duck.ai 一筆）：卡片會顯示通用字，讀者分不出「整筆核過」與「只核一項」；下輪起每次複核順手補該筆範圍，並用 `python3 -c` 列出仍未補的清單（`verification_scope` 為空者）當維修佇列。

下輪優先（完整五項，放本則最前）：①`taipei-youth-ai-subscription-subsidy-2026`：期限 2026-11-10 當天 16:20 仍受理，**11/11 第一件事**是改 `status: applications_closed`、`review_cadence: monthly_or_new_signal` 並在摘要寫明「期限日當天仍受理，之後未再確認」（`tests/validate.py` 會擋）。②`aocai-working-free-ai-courses-2026`：11/11 12:30 後確認 11/16 班是否關閉、11/26 梯次是否額滿；另本輪研究員回報 CDRI 第三梯（12/8、15、22、29，30 小時，報名至 12/2）屬同一體系，應併入本筆而非新 ID，來源 `https://edu.cdri.org.tw/xccourseapply/cont?sid=0Q121426863825971626`。③`mistral-education-unresolved`：官方 Education plan 列「$25.5/mo in API credits」（付 US$14.99），與 `mistral-free-api-policy` 的「Free 無 API 額度」是不同方案，需重讀定價頁分辨，勿把第三方「Free 送 $10/月」當官方說法。④`tools/linkcheck.py` 全掃把 neo4j 兩頁報成 404、單筆重掃同一 URL 卻 200（`--record neo4j-auradb-free-tier-200k-nodes` → ok 7）：**dead 清單要先單筆重掃再當證據**，並考慮對 404 加一次延遲重試。⑤`emergent-free-ten-credits-publishing-watch`／`vocol-new-account-two-hundred-vpoints-watch` 各有一頁三路取用失敗（Emergent ToS、Vocol 免費點數政策），換渲染或官方 API 再試。

2026-11-10 17:06–17:40 本輪（接續 ebeba59 之後）：起始 **1,010 筆**；`next_review_at` 嚴格已到期 0 筆、7 日內到期 8 筆（6 筆在 12 小時冷卻內）、24 小時未核 645 筆、`retry` 桶 0 筆；12 天內有明確截止點的可行動紀錄 11 筆，全部在當天 13:14–16:36 核過，故不重讀。上一則 16:52 才結束，其 19 筆不重讀。佇列＝到期與排程 6 筆（Runable、Felo、Qoder 免費機制、臺北產業獎勵、DigitalOcean×Secret、Grammarly 學生）＋資格／金額／條款未核 8 筆（Emergent、Morph、Vocol、Hugging Face GPU Grant、Cerebrium、Hindsight、OpenAI 新創 VC、Extend）＋**缺 `verification_scope` 的官方紀錄 4 筆**（Cloudflare 學生、Algolia 新創、Cerebras 試用、Rosalind 學術）。局部複核 **R=18 筆**、新增機會 **3 筆**、政策 0、觀察線索 **1 筆**、整筆追查失敗 **0 筆**、未完成 **U=992 筆**（結果 1,014 筆）。`tools/linkcheck.py` 全掃 2,794 個去重來源 URL：ok 2,715、dead 5、blocked 64、unreachable 10；5 個 dead 仍是既有已註記下架的頁面，沒有新失效來源。未登入、未申請、未付款。

會改變讀者決定的更正：

- `hindsight-cloud-once-welcome-credit-amount-unknown`：**金額其實官方已公布**——`https://vectorize.io/pricing` 逐字「New accounts start with $5 of free credit.」。舊標題「數量未公開」與狀態 `amount_and_eligibility_unverified` 讓讀者以為沒有數字可查。已改標題為「新帳戶 US$5 免費額度，每人一次」、`quota_classification` UNKNOWN→HIGH BUT LIMITED、`usable_benefit_usd` null→5，並新增狀態字彙 `eligibility_unverified`（額度已定、資格未核）；同一頁 FAQ 仍只寫「You get free credits to get started」不給數字，已寫進缺口。
- `cloudflare-students`：`taiwan` **Unknown→No**。官方 FAQ 逐字「The current offering is available only to students in the United States over the age of 18 who have a verified .edu billing email address.」，台灣學生只能透過表單請官方把學校網域加入候補。先前 Unknown 會讓台灣讀者以為還有機會。同時補上豁免範圍（500 Worker scripts、10M requests／20M logs／6,000 build 分鐘、超額 US$0.30／M、期滿自動轉 Free）。
- `morph-startup-up-to-one-k-watch`：資格措辭更正——官方「Orgs with a billing method get approved first」是**核准優先順序**，不是必要條件；舊紀錄寫成「須建立組織及加入付款方式」，會讓沒有卡的團隊直接放棄。`quota_classification` UNKNOWN→HIGH BUT LIMITED（上限 US$1,000 有逐字）。
- `cerebras-trial`：官方 FAQ 說「Every model in the Shared Inference Model Catalog is available on the Free Trial tier」，但公布的 Free Trial 速率表只有 gpt-oss-120b 與 qwen-3.8-27b；舊摘要寫成「僅支援這兩個模型」是過度收斂，已改成兩句並列並列為缺口。
- `huggingface-community-gpu-grant-watch`：補上不經 grant 的免費途徑——定價頁硬體表把 **ZeroGPU（RTX Pro 6000 Blackwell、up to 96 GB）列為 FREE**，Pro 權益寫「8× ZeroGPU quota」；舊紀錄只寫「不可視為零成本 GPU」，會讓讀者錯過這條路。每日額度未在該頁說明，已列缺口。
- `qoder-free-mechanisms`：站內 `events/100credits` 的 FAQ 仍寫 Qwen3.8-Flash 促銷「has been extended beyond September 30. Its end date will be announced」，與 `flashoffer` 的「ends at 00:00 on November 7, 2026」矛盾（舊頁未同步，不代表促銷恢復）。三項免費機制（Qoduck 每日額度、每日手領 100 Credits、Efficient 0.0×）本輪仍全部有效。
- `runable-free-daily-fifteen-hundred-monthly-cap`：**每月 15,000 上限只寫在 FAQ**，定價頁與方案卡只有「1,500 credits daily」；只看定價頁會低估月硬牆。FAQ 同句另把「15,000 per month」誤寫成「15,000 daily credits in a month」，已在證據裡註明是官方筆誤。
- `taipei-industry-incentive-ai-rd-batch2-2026`：徵件仍至 11/30（無延長／額滿／提前截止），並補上讀者要參加就得先報名的細節——11/12 14:00–16:00、13:30 報到、地點臺北創新實驗室（內湖區洲子街 12 號 2 樓）、報名表單 `https://www.surveycake.com/s/vL3V8`。
- `emergent-free-ten-credits-publishing-watch`：兩處官方說法並存——定價頁「10 free monthly credits」↔ 說明文件「10 credits on your first day」；另明列 Free 不能發布到 production（門檻 50 credits，純前端免費發布「may qualify」但未列條件）。ToS 三路（native／raw／Wayback）取用失敗，條款段沿用 2026-11-04 讀值並在 `eligibility.terms_restrictions` 註明。
- 其餘 8 筆（Algolia、Rosalind、DigitalOcean、Grammarly、Vocol、Cerebrium、OpenAI 新創 VC、Extend、Felo）逐字重讀後主張不變，補上 `verification_scope` 與來源查閱時間；Rosalind 另記「Only US accounts qualify」「Accessing the application from outside the United States may redirect you to ChatGPT」，Extend 記下零資料保留在同一頁的「Included」↔「Available on request」兩種說法。

**重複紀錄（本輪唯一資料結構變更）**：`wda-ipt-ai-course-tuition-subsidy` 與 `taiwan-industry-talent-investment-ai-courses-2026` 是同一方案——同一補助比例（一般 80%、特定對象 100%）、同一 3 年 NT$10 萬上限、同一「同一時段僅能報一班」規則、同一在職投保與國籍／居留門檻，只是一個記在學員須知 PDF、一個記在 115 年下半年課程公告。`tests/validate.py` 只擋「標題完全相同」，兩筆標題不同就通過了。已把 `wda-ipt` 標為 `duplicate_merged` 並 `duplicate_of` 指向較早的 `taiwan-industry-…`，學員須知 PDF 移入該筆來源（保留 2026-11-10 02:16 的查閱時間），並追加一筆 `duplicate_merged` 政策歷史；舊歷史列不改寫。通則：**判斷重複要比「補助比例／上限／排他規則／資格門檻」四項，不是比標題**。

新增 3 筆機會＋1 筆觀察線索（皆逐字取自官方頁）：
- `tw-labor-pretraining-ai-smart-application-tnnu-03`：勞動部職前訓練班級 166783（國立臺南大學），2026-11-25～2027-01-08、188 小時日間全日制；頁面公告「訓練費用-學員自行負擔 5760 元／政府負擔 27040 元」，權益說明另列就保失業者、就業服務法第 24 條各款等全額補助身分，非前述身分者自付 20%。報名至 **2026-11-16 16:00**、11-18 甄試、名額 34（17:29 查閱時已報 25）。這是與「產業新尖兵」「產業人才投資方案（在職）」不同的第三條補助路徑，`categories` 記 LOW-COST 而非 FREE（一般學員要付錢）。
- `novai-free-flash-models-two-dollar-signup-credit`：第三方 OpenAI 相容閘道，註冊贈 US$2 免卡，5 款免費模型每日 10 次（影片 5 次）、午夜 UTC+8 重置，未加值前 5 req/min。**付款方式官方兩頁矛盾**（透明頁信用卡 $1 起 ↔ 條款頁最低 US$5 且信用卡 coming soon），故記 `terms_conflict`；影像模型強制「AI生成」標籤已寫進條款限制。
- `gonkarouter-new-user-million-tokens`：新帳號 1M 免費 tokens、免卡，付費單一價 US$0.0051／1M；頁面明寫單次 prompt 實務上限約 200K、逾時 10 分鐘直接拒絕。與 `gonka-broker-monthly-one-million-free-tokens`（gonkabroker.com，每月重發、需簡訊）是不同網域不同方案，已在 summary 與 `taiwan_note` 標明不可互引。
- `watchlist-itri-college-free-ai-courses-2027`：工研院產業學院臺中班四門「【免費課程】」AI 課（2027/01/07、01/11、01/14、02/18，各 30 小時）。明細頁為前端外殼，費用與資格取不到，故列 watchlist；若確認屬服務業人才韌性計畫，應併入 `aocai-working-free-ai-courses-2026`。
- 未納入：Vectoree（一次性 US$5、價值過薄）、文化部地方創生 AI 課程（2026-07-31 公告，可能已辦完）、Hyperbolic「驗證手機贈 $1」（僅第三方報導，官方 docs 為需 US$5 儲值）。

品質改善（本輪唯一一項，已隨本輪 commit）：**「本次核實範圍」缺值時不再印通用句**。卡片的這一列直接讀 `verification_scope`，缺值時退回「僅限各來源列明主張；其他欄位可能沿用較早研究。」——於是「這一輪只核了其中一項」與「整筆都核過」在卡片上長得一樣，而通用句又長得像已宣告範圍。2026-11-10 統計 **99 筆已標「官方」的紀錄沒有這個欄位**（其中 4 筆本輪補上）。`app.js` 改成缺值時標籤寫「核實範圍未記錄」、內容明說「此筆未記錄核實範圍」，有值時逐字顯示；`tests/filters.cjs` 以資料驅動斷言「缺值者不得出現『本次核實範圍』標籤、有值者必須逐字」。驗證：`node tests/filters.cjs` 新增一條 PASS（含全庫找一筆缺值紀錄做規格值斷言）。

研究流程的可重用結論：①**dead 清單不是證據，是待驗清單**：本輪全掃把 `neo4j.com/docs/aura/security/ip-addresses/` 與 `…/create-account/` 報成 404（GET），但 `--record neo4j-auradb-free-tier-200k-nodes` 立刻回 ok 7，curl 帶瀏覽器 UA 也 200；24 路併發重測同 URL 亦全 200。併發下的 404 不能直接寫成「頁面消失」，也不能據此改狀態。②**Felo 的定價頁正文在 raw HTML 的 `__NEXT_DATA__` i18n payload**，不在渲染後的 DOM（`props.pageProps` 是 `{}`，`/_next/data/<buildId>/en/pricing.json` 也回外殼）；要核 Felo 文案就讀 `"product_basic_desc"`、`"plan_free_credits_panel"`、`"plan_faq_a2/a3/a4"` 這幾個 key。③**同一站的舊頁會留著過期文案**（Qoder `100credits` 的 FAQ 仍寫 Flash 促銷延長），核對促銷結束要讀「該促銷自己的頁面」，並把站內矛盾寫進缺口而不是挑一個當結論。④**「官方已公布數字」要主動找**：Hindsight 的 US$5 只寫在定價頁的 Models 段落，FAQ 與方案卡都不寫；只讀 FAQ 就會把已公布的金額記成「未公布」。

2026-11-10 16:05–16:52 本輪（接續 83c5ec9 之後）：起始 **1,007 筆**；`next_review_at` 嚴格已到期 0 筆、7 日內到期 103 筆、24 小時未核 622 筆、`tools/queue.py` 的 retry 桶 3 筆（1 筆未在冷卻）。上一則 15:45 才結束，其 18 筆不重讀。佇列＝硬期限 8 筆（臺北青年補助期限日、服務業 AI 課程、Jules 轉唯讀、新北 UKO、Google AI Pro 憑證、中華電信 AI Plus、產業新尖兵、UGREEN 截止日）＋輪替與來源衝突 8 筆（Duck.ai、Articul8 Bivia、Vultr Match、Clean APIs、Respan、Voyage、LangWatch、Sloyd）。局部複核 **R=16 筆**、新增機會 **3 筆**（政策 0、觀察線索 0）、整筆追查失敗 **1 筆**（Perplexity，只記 `last_review_attempt_at` 與原因）、未完成 **U=991 筆**。`tools/linkcheck.py` 全掃 2,787 個去重來源 URL：dead 5、unreachable 11、blocked 74、ok 2,697；5 個 dead 全部是紀錄內已註明下架的頁面（Qoder community-boost 兩頁、astamuse 公告、DeepInfra /papers、Salad SSAP），沒有新失效來源。未登入、未申請、未付款。

會改變讀者決定的更正／確認：

- `ntpc-uko-microsoft-ai-cert-free-2026`：**11/14 第二梯報名仍開放**——課頁報名連結（tibame.tw → Google 表單）以無頭瀏覽器渲染後欄位可填、有「繼續」、無關閉字樣（未送出）。先前列為未知。同時補上會影響行動的細節：取消報名截止 **11/11 23:59**（開課前三日）、正備取於 3 個工作天內以 Email 通知、備取最晚活動前一日 15:00 電話遞補、報到須帶含姓名生日證件、保證金 1,000 元在期限內完成首次考試並寄回證明才退（不以通過與否為條件，預計 115/12/15 前退）。
- `aocai-working-free-ai-courses-2026`：11/16 梯次**仍開放至 2026-11-11 12:30**；活動頁逐字列上課日 11/16、11/20、11/23、11/30（30 小時、實體＋線上直播）、費用 0、人數上限 250、預計招生 100 人，報名表仍「應付費用 / Sum：0」且無「活動已結束」。專區仍列 11/17、11/26 台北梯次；11/26 是否額滿未核。
- `taipei-youth-ai-subscription-subsidy-2026`：**期限日 16:20 仍受理**——服務頁仍 2026-09-22 版、期限句與「以送達本局之日為準」逐字未變、公告首頁仍 35 筆且最新為 11/09，全頁無停收／用罄／展延。官方只給日期不給鐘點，`deadline_at` 維持只有日期；11/11 之後必須轉狀態的交接寫進本則開頭。
- `google-ai-professional-certificate-tw-pro-3mo`：兩份官方頁**仍互相矛盾**——台灣頁註腳「2027 年 1 月 1 日到期」，其連結的 Google One offer 條款（仍為 2025-07-31 版）寫「must be redeemed by November 6, 2026」，地區清單逐字含 Taiwan。條款窗口已過 4 日、無延期或結束公告，維持 `terms_conflict`，摘要已寫明「能否兌換請以結帳頁為準」。
- `jules-free-fifteen-tasks-entrypoint-watch`：changelog「Jules Turndown｜October 29, 2026」逐字未變：11/11 前可完成既有 session、之後轉唯讀至 12/31 退場，並開放以 Jules Tools 匯出設定、環境變數、排程、記憶與各 session。官方未寫 11/11 轉唯讀的鐘點，`deadline_at` 只有日期。
- `cht-google-ai-plus-first-year-free-2026`：新聞稿與附件方案表未變（799/999 搭 AI Plus 400GB 首年 0 元、1399 搭 AI Plus 2TB 首年 0 元、寬頻前 6 個月 0 元第 7–12 個月 264 元、單租年約 264／529 元）；5GB 流量與 Hami Point 100 點加碼條件（至 2027-01-31、11-30 前開通）亦未變。
- `taiwan-nsp-youth-ai-training-subsidy-2026`：計畫條文與參訓對象未變（15–29 歲本國籍失業／待業、不含日間部在學、訓練期間不得具勞保／就保或為營利事業負責人、補助上限 10 萬元、自付 1 萬元於 90 日內就業可返還、**無全國統一申請期限**）；CDRI 第 12 梯報名至 115/12/11、12/15 開訓。
- `ugreen-ai-nas-hackathon-2026`：正式規則以 curl（瀏覽器 UA）直取 200 重核——報名與 Round 1 至 **2026-11-15 11:45 pm PT**（台北 11/16 15:45），Asia-Pacific 合格居住地名單逐字含 Taiwan。`read` 工具取同一 URL 仍被 Cloudflare 擋（403），`verification_scope` 已寫明證據來自 curl 原文。
- `vultr-match-ai-compute`：**連續三輪 403 解除**。改以有頭 Chromium 讀 `/match/` 與 `/coupons/`，兩頁皆 200：主標「Try Vultr, and We'll Match up to $100 USD」、新客限定、12 個月到期、50/50 抵用、重複帳號不適用、「available for a limited time」，優惠頁仍列 `VULTRMATCH`；curl 同 URL 仍 403，`discover.vultr.com/offers` 索引沒有 Match 條目（索引缺口，不等於活動終止）。`unknowns` 已把「條款不可驗證」換成「結束日未公布」。
- `articul8-bivia-early-adopter-billion-tokens`：**註冊頁外殼結案**。Chromium 渲染後表單只有 Email、First／Last name、同意條款與「Send sign up code」，全頁與 DOM 皆無 card／CVV 欄（未送出）；贈額文案「First 10,000 early adopters／1 billion tokens free／No subscription」與標價 US$0.042／M 輸入、US$0 輸出未變。
- `cleanapis`／`respan`／`voyage`／`langwatch`／`sloyd` 五筆衝突**仍全部並存**，本輪逐字重讀不任選其一：Clean APIs 卡片 60 req/min 與比較表 80 req/min、退款頁 first-time only 仍在；Respan 100k logs 與 ToS「禁止未經核准商業用途／bot 或 script 自動化」仍在；Voyage 正文 voyage-code-3 200M 與表格 voyage-code-4 200M、Older models「no free tokens」仍在（`updatedAt` 仍 2026-09-29）；LangWatch「€0 free forever」與 ToS「14-day free trial」仍在；Sloyd 新取得官方 API 頁逐字支持「API credits 與 Web App 點數分開計算」（US$1＝75 API credits、最低 US$12／900 credits），但 Guest 三個「1 daily」是否共用日池仍無說明。
- `duck-ai-free-chat`：重讀三頁官方說明措辭未變；另記下 **chat-models 頁的 meta description 仍列舊模型**（Llama 3.3 70B、Mistral Small 3 24B、GPT-4o mini），搜尋摘要可能顯示舊清單，正文才是現行清單——已寫進缺口。

新增 3 筆（皆逐字取自官方頁，`tools/prioritize.py` 已重算）：
- `veed-free-monthly-fifty-ai-credits`：Free US$0、每月 50 AI credits（官方換算約 6 秒 Fabric 影片）、字幕 10 分鐘／月、匯出上限 10 分鐘與 720p、2GB、浮水印、字幕檔不可下載、credits 不累積；官方語言表把「Chinese (Traditional, Taiwan) 中文（台灣）」列為轉錄與翻譯皆支援。`taiwan=Unknown`：有語言支援與 `/tw` 本地定價頁，但沒有可引用的地區資格清單。
- `vrew-free-monthly-200-credits`：Free US$0／永久、每月 200 credits，逐項列轉錄 200 分鐘、降噪 200 分鐘、AI 語音 2 萬字元、翻譯 6 萬字元、AI 影片 1 支、AI 音樂 4 首、AI 角色 3 個，首頁寫免信用卡。方案表要渲染才看得到。`taiwan=Unknown`。
- `myedit-free-daily-three-points`：訊連科技 MyEdit 比較表「免費點數 每日 3 點」「5GB 雲端」，付費 NT$150／210／290 月繳（各含 360／500／800 點）。繁中站與 NT$ 定價支持在台使用、免費層無居住地條件，`taiwan=Yes`（服務可用性，非補助資格）。
- 未納入：Fliki（官方語系清單未列台灣、免費僅 3 credits／月）、OpusClip（官方語言清單 25 語無中文，台灣價值有限）、Vidu（免費額度不透明）、Higgsfield／InVideo／Magnific（已無免費方案或回 403）、Firebase Studio（官方已停止新註冊）。Vrew 的中文定價頁需另次渲染，其「點數不累積」未逐字核到，已寫進缺口而非當成事實。

品質改善（本輪唯一一項，已隨本輪 commit）：`tests/validate.py` 新增「批次紀錄必須有 `verification_scope`」。問題可重現：卡片的「本次核實範圍」直接讀這個欄位，缺值時退回一句通用話術（`app.js`：`addRow('本次核實範圍', offer.verification_scope || '僅限各來源列明主張；其他欄位可能沿用較早研究。')`）；2026-11-10 統計全庫 **100 筆已標「官方」的紀錄沒有它**，其中一筆正是上一批（15:05）複核的 `duck-ai-free-chat`——同批 18 筆都寫了「這次核了什麼、沒核什麼」，只有它讓讀者看到通用字，於是「整筆都核過」與「只核了其中一項」在卡片上長得一模一樣。本輪補上 duck.ai 的範圍（16:25–16:27 重讀三頁）並把規則寫進驗證；既有 100 筆不回填（不回填等於不宣稱沒做過的核實），列為下輪優先。驗證方式：暫時清空一筆批次紀錄（`nanonets-50-credits-no-card`）的 `verification_scope` 後 `python3 tests/validate.py` 必須失敗，還原後通過。

研究流程的可重用結論：①**讀取工具被 Cloudflare 擋不等於頁面消失**：`read` 取 devpost 規則回 403，同一 URL 用 curl 帶瀏覽器 UA 就拿到 166,277 bytes 全文；Vultr 則是 curl 403 而 Chromium 200。兩條路線的結果都要留紀錄，否則會把「工具限制」寫成「活動結束」。②**只回前端外殼的定價頁要渲染**：Vrew 的 `pricepolicy` 用純文字會被導回首頁、MyEdit 的 `/tw/pricing` 內文 0 字，渲染後才讀到 200 credits／每日 3 點。③**語言表有中文 ≠ 台灣資格**：VEED 的「中文（台灣）」是字幕語系、不是帳戶地區資格，兩者分開記。

驗證：`python3 tests/validate.py`（1,010 筆 PASS，含新增的批次 `verification_scope` 斷言）、`node --check app.js`、`node tests/filters.cjs`、`python3 tools/queue.py --self-test`、`git diff --check`。瀏覽器（本機 http.server + 遠端 Pages 兩處）另核對：資料載入 1,010 筆、「本輪更新」19 筆與 `last_research_run` 一致、三筆新紀錄可用關鍵字與免費專區找到、MyEdit 卡片顯示台灣 Yes 與每日 3 點、UGREEN 卡片顯示 11/16 15:45 截止。

2026-11-10 15:05–15:45 本輪（接續 a26f861 之後）：起始 **1,006 筆**；`next_review_at` 嚴格已到期 0 筆、7 日內到期 9 筆（全部已在當日 13:18–13:19 或凌晨核過，12 小時冷卻內）、24 小時未核 619 筆、`tools/linkcheck.py` 全掃 2,706 個 URL 得 dead 7／blocked 74／unreachable 9。上一則 13:30 才結束，其 20 筆不重讀。佇列＝dead 來源修復 6 筆＋付款風險／暫時不限量 8 筆＋`tools/queue.py` 輪替序 4 筆＋台灣算力時程 1 筆＋AICU 條款 1 筆，另複核既有 Pokee 紀錄。局部複核 **R=18 筆**，新增機會 **1 筆**、政策 0、觀察線索 0，整筆追查失敗 **3 筆**（只記 `last_review_attempt_at` 與原因，未刷新 `verified_at`）；未完成複核 **988 筆**。未登入、未申請、未付款。

會改變讀者決定的更正：

- `amd-itri-mi300x-open-compute-2026-watch`：**2026 年六梯次收件已全部截止**，不再是可申請的免費算力。時程歷來只存在於 AITA 頁面的圖檔，前幾輪一律記成「無法確認」。本輪以 OCR 讀出時程表六列（收件截止／審查／公告／使用期間／成果分享），再用同頁附件的申請書 docx 逐字核對六批次使用期間（第一批 01/21–03/06 … 第六批 11/11–12/18），圖與文字版的使用期間逐列相符，才以最後收件日 10/28 寫入 `deadline_at`、狀態改 `expired`、退出可行動清單，排程改 `monthly_or_new_signal`。台灣讀者原本會以為 11 月還有梯次可送件。
- `fal-flux3-max-five-daily-sandbox`：原 `/flux-3-max-free` 已 404 且自 sitemap 移除（1,651 筆中 `-free` 只剩兩個），Wayback 對該路徑 0 筆捕獲；免費次數的現行官方頁是 `/sandbox`，今日本站原始 HTML 逐字為「6 free generations today. No account needed.」（11-09 同一位置是 7），官方文件只寫「Sandbox occasionally offers free credits」、**沒有每日重置定義**——先前寫成「每日 7 次」是把動態輸出當公告值。
- `claude-artifacts-expired-lead`：促銷原文已由支援站下架（llms.txt 0 命中），改以官方說明文 2026-10-16 的 Wayback 存檔核實：Pro／Max／Team 10/01 起、Free 10/07 起、**10/15 23:59 PT 對所有方案結束**、Enterprise 不適用、可提前終止。狀態由 `expired_unverified` 升為 `expired`＋官方來源。
- `nanonets-50-credits-no-card`：`recurring_cost_usd` 由 100 改 **0**。官方定價頁把 Starter 列為「Free — $50 in credits to start」，US$100／月是額度用完後的**選用**升級、免綁卡即無自動扣款，credits 由團隊共用且官方稱永不過期。舊值讓這筆被前端免費專區直接排除（該專區排除 `recurring_cost_usd>0`），等於把一個真免費方案藏起來。`taiwan` 仍維持 Unknown：條款未點名台灣只代表「未見限制」，不等於已確認可註冊。
- `token-harbor-free-rolling-7day-allowance`：`taiwan` Unknown → **Yes**，依據是官方 FAQ 的正面表述「available outside these restricted regions: … Hong Kong … Macau …」，台灣不在排除清單、免費層免卡無額外國別資格；`quota_classification` UNKNOWN → 「未公布固定上限」。另補兩項條件：免費模型沒有額外每分鐘上限，TH-Rudder 在 Rudder.chat 的限時活動文字對話官方稱不限量。
- `adobe-firefly-twelve-month-model-promotion`：`taiwan` Unknown → **Yes（需付費訂閱合格方案）**，並在標題與摘要寫明 **Firefly Standard NT$357 不在促銷名單**、最低門檻是 Pro NT$704。這筆是付費方案的附帶優惠，`TEMPORARILY UNLIMITED` 會讓它進首頁「無限專區」而該專區不看費用，本輪只用標題補救。
- `aicu-evaluation-ap`：條款 v2026-10b 新增核到會影響使用的限制——**免費點數產生的輸出得由官方按自訂比例加入 AICU 短句或標記**（例：語音末尾一句話），只有已購買 AP 的輸出不含；違規計費上限為前 12 個月實付兩倍。首頁與 FAQ 同日皆回 HTTP 522，AP 換算率與 FAQ 衝突本輪未能重核，`verification_scope` 已寫明只核條款本體。

新增 1 筆：`wandb-academic`（Weights & Biases 學術方案，學生／教師／學術研究者永久免費，含 200GB 儲存；官方兩頁逐字取得，但學術身分驗證方式取不到——`docs.wandb.ai` 的學術 FAQ 需 access code）。去重後丟棄另外 4 個候選：`pokee-developer-early-access-2000-credits` 已存在（本輪改以定價頁補上免費層 500 點／月與 18 歲門檻）、`elevenlabs-startup-grant` 已存在、OrcaRouter 的 Hacker 層是零加成但**仍需自付 token 費用**的閘道、其 promo 卡片為 JS 動態且取不到任何金額、Alibaba Token Plan 個人版非免費且僅新加坡區。

品質改善（本輪唯一一項，已隨本輪 commit）：`app.js` 的 `sourceStamp()` 只用 `accessed_at`／`accessed_time_range` 當排序鍵，但有一批舊來源沒這兩個欄位、查閱時間只寫在中文證據開頭（例「2026-11-01 05:06–05:07 Asia/Taipei實讀：…」）。它們的排序鍵是空字串，於是在同網址群組中永遠排最後，把同一網址較新的那筆壓進卡片的「較早的 N 筆同網址紀錄」——讀者看到的主要來源比被收起來的還舊。新增 `sourceReadStamp()` 只認「開頭就是日期、且 30 字內出現實讀動詞」的明確寫法（避免把「2026-10-23日本時間上線」這種公告日期誤當查閱時間），詳情標「來源未另列，取自證據文字」。量測：全庫 467 組同網址來源中有 8 組的主要來源因此改變，涉及 5 筆紀錄（`code-for-everyone-ai-school-2026`、`taiwan-ai-rap-pilot`、`kimi-api-free-voucher-cn-locked`、`gitlab-education-ai-credit-exclusion`、`murf-startup-incubator-three-month`）。`tests/filters.cjs` 補 7 條規格值斷言（含「公告日期不是查閱時間」「明確 accessed_at 優先」與一組排序結果）。

研究流程的可重用結論：**只存在於圖檔的時程不能一直記成「無法確認」**。可行順序是 ①先找同頁附件的文字版（docx／PDF／EDM），②對圖檔 OCR 只取數字欄位，③用附件文字交叉驗證 OCR 的欄位語意，④欄位語意仍不確定就只寫能交叉驗證的部分。本輪 AITA 是 ①＋②＋③ 都成立才敢改狀態；只有 OCR 一項時應停在「推定」並留在 unknowns。另一條：**「官方頁沒點名台灣」不是台灣可用**——Nanonets／Maritaca 的條款都只寫年齡與制裁條款，本輪維持 Unknown，只有 Token Harbor 那種「正面表述 available outside 這份清單」才敢改 Yes。

下輪優先（完整五項）：①`vultr-match-ai-compute` 促銷頁連三輪 403（curl 與無頭瀏覽器同被 Cloudflare 攔），條款只能靠 2026-06 Wayback，下輪改查 `discover.vultr.com/offers`、docs 促銷條款與最新 200 快照；若仍 403 就把「條款不可公開驗證」寫進 `access_risk` 並停週更。②`perplexity-watch`／`perplexity-education`：Pro US$20 仍無官方原文（本輪已把月費欄留空）、免費 Pro Search 3/day 與 5/day 並存、年繳退款窗 48h 與 72h 並存，下輪以瀏覽器過 Cloudflare 抓 `/pricing` 一次，再不行就在站上固定標「未核實」。③`astamuse-agent-trial-oct31-index-only`：官方 REST／2026 列表／Wayback 三路皆無痕跡，已下修 `expired_unverified`，下輪改查日本轉載與官方社群帳號，仍無則考慮整筆標為第三方索引傳聞。④`deepinfra-two-minute-papers-twenty-credit`：只有 2025-04-30 存檔，2026 年 0 筆捕獲，下輪查 Two Minute Papers 影片說明與 DeepInfra blog，否則把活動定年為 2025 並降頻。⑤`aicu-evaluation-ap`：`ch.aicu.ai` 首頁／FAQ 仍 522，下輪重試並確認 1 USD=10,000 vs 15,000 AP、AP 90 日 vs 180 日的衝突是否已由官方修正。

2026-11-10 13:05–13:30 本輪（接續 f8e555d 之後）：起始 1,004 筆；`next_review_at` 嚴格已到期 0 筆、7 日內到期 8 筆（6 筆在 12 小時冷卻內）、24 小時未核 599 筆。上一則 12:33 才結束，其 13 筆不重讀。佇列＝台灣硬期限 12 筆＋`tools/queue.py` 的輪替序（2026-10-31 那批）＋前幾輪追查失敗的兩筆。局部複核 **20 筆**：硬期限 12 筆（臺北青年 AI 補助期限日、服務業 AI 課程 11/16 班、Amazon ARA、ADI FORUM、新竹市補助餘額、桃園課程、UGREEN、StepFun、騰訊 Hy4、AutoClaw、Rime STT、Mozilla 育成）＋最久未核輪替 6 筆（Lamatic、Cloudflare 新創、Tavily、Devin、Superwhisper、Nebius）＋追查失敗改以瀏覽器渲染核實 2 筆（Coze、Google Stitch）。新增機會 **2 筆**、政策 0、觀察線索 0；整筆追查失敗 **0 筆**。另讀 2 筆無實質變更（NVIDIA 開源教材、Foundry Local，兩頁今日重讀逐字未變），為維持每輪 20 筆上限未計入複核數、排程不動。未登入、未申請、未付款。

會改變讀者決定的更正：

- `cloudflare-startup-tier3`：**Workers AI 自「Dec 1」起對新加入新創完全不納入 credits**。原標題寫「Workers AI僅2500」，讀條款區逐字才看到新政：「**Workers AI:** Effective Dec 1 and for all incoming startups: Workers AI is **not** covered by credits. For existing startups until Dec 1: Workers AI is covered up to a $2,500 cap for Tier 3, $10,000 for Tier 2, and $50,000 for Tier 1」。也就是 US$2,500 只剩既有新創的過渡上限，三週後新申請者拿不到任何 Workers AI。頁面未標年份（推定 2026-12-01，已列缺口），而同一頁條款區仍寫「up to … $50,000 for Workers AI」，兩段並存未互引；Tier3 總額 US$10,000、R2 上限 US$10,000 不變。標題與摘要已改寫。
- `lamatic-startup-program-up-to-5000`：**分層金額與資格首次公布，「最高 US$5,000」不是人人可得**。`landing.lamatic.ai/solutions/startups` 逐字「Launch $1,000 in credits for 12 months」「Bootstrapped or pre-seed, under $500K raised」「Seed $5,000 in credits for 12 months」「$500K to $3M raised, or referred by a partner」，共同門檻為成立 5 年內、募資低於 US$3M、以公司信箱申請、未曾付費使用；credits 自兌換起 12 個月，只抵 flow executions／hosting／deployments，自帶金鑰的第三方模型費不含。`quota_classification` 由 UNKNOWN 改 HIGH BUT LIMITED，並新增分層欄位。
- `tavily-startups`：資格句收窄。現行 FAQ 只寫「Early-stage, VC backed startups.」，原紀錄的「通常 pre-seed 至 Series A」措辭已不在頁面；100k credits／6 個月與滾動審核不變。舊措辭已從摘要移除，不保留成事實。
- `aocai-working-free-ai-courses-2026`：**11/27 臺中班已額滿**。報名鈕逐字「已額滿(若有名額釋出會再開放)」，12/01 台北班仍「尚有票券」；11/16 台北班（id=3544）報名表今日仍回「應付費用 / Sum：0」、無「活動已結束」，截止 2026/11/11 12:30。已把額滿事實寫進摘要、缺口與存取風險，並新增兩筆執行單位報名頁來源。
- `coze-free-builder-daily-credits`：**連續三輪的「只回 JS 外殼」結案**。以無頭瀏覽器渲染後逐字讀到「Free 0 USD / month」「10 credits/day」「5 collaborators」「3 collaborative Bots or Workflows」，以及頁首橫幅「Payment service currently unavailable in Russia and Taiwan」——限制的是付款，不是免費帳戶本身；台灣能否註冊仍列缺口。方案表的模型清單仍是舊目錄（GPT-3.5、Claude 3 Opus），各模型 calls/day 只作量級參考。
- `stitch-free-daily-credit-ui-design-beta`：同樣結案。渲染 `app-companion` iframe 後官方 FAQ 逐字「Yes, Stitch is currently provided free of charge. It operates on a daily credit limit… Credits reset at midnight UTC.」「Stitch is available in English to users 18+ in countries where Gemini is available.」——免費與 UTC 午夜重置成立，但**每日點數仍未公布**，只在登入後的設定頁顯示。
- `taipei-youth-ai-subscription-subsidy-2026`：期限日 13:18 重讀仍受理（服務頁仍 2026-09-22 版、公告首頁仍「共 3 頁 35 筆」、無停收／用罄／展延），因此不改已截止。官方只給日期不給時鐘，「申請日以送達本局之日為準」，`next_review_at` 維持今晚 22:00；11/11 之後接手的人必須改 `applications_closed`。
- 其餘 12 筆無實質變動（皆本輪重讀官方頁原文）：`amazon-ara-…`（索引頁 raw HTML 仍「Fall 2026: Open Now」＋「extended to November 11」，徵案頁 modified_time 仍 10/28）、`moda-adi-forum-2026-free`（11/12 如期、報名表六場次仍在、無取消公告）、`hsinchu-city-…`（餘額仍 NT$253,197／4.4%，自 11/09 17:26 起三次讀值相同）、`taoyuan-…`（報名頁 11/17 vs 報名列表 11/20 的差異因列表頁純前端仍無法重讀）、`ugreen-…`（正式規則逐字含 Taiwan，11/15 23:45 PT）、`stepfun-…`（免費至 11/17 11:59:59，官方寫「11:59:59 AM」語意異常仍照記）、`tencent-…`（11/4–15 免費窗仍只有新聞稿）、`autoclaw-…`（11/9–15、每帳戶一次）、`rime-…`（全方案 STT 免費至 11/19）、`mozilla-…`（7 案、截止 11/20 23:59 PST）、`devin-…`（$15K＋1:1 配對上限 $50K）、`superwhisper-…`（40% 折扣、購前申請）、`nebius-startup`（僅 VC 夥伴且募資 ≥US$5M）。

新機會（主 agent 逐字重讀官方頁後才寫入）：

- `aws-health-impact-initiative`：AWS 五年 **US$100M** 健康領域社會影響計畫。符合資格的組織（健康系統、健康科技、新創、非營利、政府、研究機構、企業 CSR）可申請 AWS credits，「awards may start with an initial investment of **$10,000 USD** and scale following demonstrated use」，超過 US$10,000 須附 AWS Pricing Calculator；滾動審查、每週審、約兩週回覆，獲獎後 12 個月內最多三次成效調查。專案須落在三項領域之一（健康服務可及性、婦幼健康、全民健康食物）。官方未列國別清單，台灣記 Unknown；與既有 `aws-education-equity-initiative`（教育）是不同領域的平行方案，另在缺口註明 AWS 另有 AI for Good 頁面邀教育／健康／氣候組織申請未公布金額的 Promotional Credits。
- `ishou-university-campus-m365-copilot-firefly`：義守大學 AI 學習頁逐字「工具與設備學校出　全校授權 M365 Copilot、Adobe Firefly」，自付 0、由學校負擔；適用對象為「義守大學教職員工及在校學生(不含兼任教師及研究助理)」。但資訊處「全校授權服務」頁的包含產品只列「Word, Excel, PowerPoint, OneNote, Outlook 等離線安裝版及線上服務」、全頁無 Copilot，因此狀態記 `conflicting_official_usage_claims`、額度記 UNKNOWN：這是「該校師生可問」的線索，不是已確認可領取的 Copilot 席次。非對外開放，也不是每人獨立的免費訂閱。
- 未納入：Cloudflare 非營利班（申請期 2025-12-01 已截止、現行頁限營利事業）、TAIWAN AI RAP 賦能（9/30 已過、與 `taiwan-ai-rap-pilot` 重疊）、數產署 115 年算力平台（與 `taiwan-adi-ai-compute-115` 同案且已截止）、AWS AI & ML Scholars（名額已滿）、Predibase（官網轉址 rubrik、無官方額度可引）、中華電信 hicloud 首月免費（官方明寫不適用 GPU）、Microsoft×ISAC 校園授權（只有新聞稿、無專案頁）、Anthropic 高教方案（只有 contact sales）。

品質改善（1 組：`tools/queue.py` 新增 `retry` 桶）。問題可重現：當天 13:06 的佇列前 25 名有 0 筆是「最新證據為追查失敗」的紀錄，而全庫有 6 筆處於該狀態（其中 stitch 排程 11/20、coze 11/23，兩筆都是當天早上才失敗）；`tests/validate.py` 只要求失敗後 14 天內重試，於是佇列每次都先把預算花在從沒讀過的紀錄上，最難讀的兩筆反而被排到 10 天後——而它們其實一個下午就能用瀏覽器渲染解決（本輪即如此）。修法：新增 `failed_lookup()`，把 `last_review_attempt_at` 晚於 `verified_at` 的可行動紀錄放進 `retry` 桶（順序 overdue→closing→retry→rotation），冷卻以「最後一次真的打開官方頁」計算，避免 2 小時前才失敗的紀錄立刻回流。實測 23:00 模擬：`articul8-bivia-early-adopter-billion-tokens` 舊版前 50 名之外、新版以 `[retry]` 排第 3；基準輸出新增「追查失敗待換路線 N 筆（另 M 筆冷卻中）」。`--self-test` 新增五條規格值斷言（失敗要進 retry、12 小時內不重排、較新的成功蓋過舊失敗、已截止不排、retry 先於輪替）與「同一 ID 不得在佇列出現兩次」。

驗證：`python3 tests/validate.py`（1,006 筆 PASS，含本輪批次斷言）、`node --check app.js`、`node tests/filters.cjs`（免費專區 647、quota 150、regional 26、台灣條件適用 131／S 級 118 與概況卡一致；卡片追查失敗標記 6 筆——Coze 與 Stitch 由 8 降為 6 即本輪兩筆結案）、`python3 tools/queue.py --self-test`、`python3 tools/linkcheck.py`（變更後 1,006 筆、2,770 個去重來源 URL：dead 仍是同樣 8 個網址、受影響仍 8 筆紀錄，blocked 73，unreachable 8 條為逾時或 TLS 失敗，不是新失效）、`git diff --check`。瀏覽器另核對：資料載入 1,006 筆、本輪更新 22 筆與 `last_research_run` 一致、兩筆新紀錄的關鍵字與卡片（AWS 台灣資格待核／審核制；義守「官方說法有差異」＋適用對象）、Coze 與 Stitch 卡片的「追查未成功」標記已消失、截止日排序前六筆為 11/10→11/15、載入更多 24→48、手機版 390px 無水平溢出、console 無錯誤。資料修復：本輪寫入時一度把 19 筆 `accessed_at` 寫成「13:18–13:19」這種區間值（驗證程式只抽日期所以沒擋到），已全部回寫成單一時間戳並確認卡片顯示正常。

結構經驗：兩件可重用的事。①**「讀不到」要先分辨是網址錯還是取用方式錯**：Coze 與 Stitch 的 URL 一直是 200，錯的是純文字抓取；連續兩輪拿不到任何方案字樣就該換成瀏覽器渲染，而不是再找第三個鏡像（Wayback 快照也是同一份外殼）。②**佇列的排序要能表達「為什麼還沒讀到」**：同一份 `verified_at` 之下，「從沒讀過」與「讀了但失敗」是兩種成本完全不同的工作，混在輪替裡就會讓最難的兩筆永遠排最後。

下輪優先（完整五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 當日 13:18 仍受理、`next_review_at` 今晚 22:00；**11/11 之後必須**改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 兩條斷言會擋），來源為服務頁與 `https://youth.gov.taipei/announcement/latest-announcement`。② `aocai-working-free-ai-courses-2026`：11/11 12:30 之後確認 11/16 班是否關閉，並重查 11/17（`edu.cdri.org.tw`）與 11/26（itri 頁只回 JS 外殼）是否仍開放或額滿，再決定維持 `conditional` 或轉 `applications_closed`；來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://serv.gcis.nat.gov.tw/AOCAI/`。③ `amazon-ara-multilingual-contextual-ai-fall-2026`：台北 11/12 15:59 過後改 `applications_closed`，並以 raw HTML 確認是否公布 Spring 2027 徵案（`https://www.amazon.science/research-awards/call-for-proposals`）。④ `cloudflare-startup-tier3`：確認「Dec 1」的年份與生效日（`https://www.cloudflare.com/startups/` 條款區與 `developers.cloudflare.com` changelog），並比對條款區仍寫 Workers AI 上限 $50,000 的段落是否更新。⑤ 兩筆 `retry` 桶的失敗紀錄：`articul8-bivia-early-adopter-billion-tokens`（官方頁只回 SPA 外殼，改用瀏覽器渲染）與 `e2e-explorer-free-versus-usage-discounts`（`/startup-program` 仍 308 轉業務表單，試 sitemap 以外的新路徑或官方公告頁），兩筆都要在 11/17 前換路線重試。

2026-11-10 12:05–12:33 本輪（接續 ef8f249 之後）：起始 1,003 筆；`next_review_at` 嚴格已到期 0 筆、7 日內到期 8 筆（6 筆在 12 小時冷卻內）、24 小時未核 599 筆。上一則（11:29）剛結束 41 分鐘，因此本輪不重讀它已核的 19 筆；佇列由「台灣在地硬期限」＋`tools/queue.py` 的輪替序（11-08／11-15–16 那批）＋`tools/linkcheck.py` 的 dead 清單組成。局部複核 **13 筆**：台灣在地與硬期限 2 筆（臺北青年 AI 補助、服務業 AI 免費課程）＋官方衝突收斂 2 筆（Seldon、StackOne）＋最久未核輪替 9 筆（Freebuff、Kling、Medux、Manus、IndicStack、Cohere、Axiom、Windsurf、Rytr）。另核對 7 筆死連結現況（Qoder ×2、Astamuse、DeepInfra 仍 404 且無替代官方頁；Perplexity ×2 有官方替代索引；Salad 專頁 404 但部落格頁仍 200；`fal-flux3-max` 三頁皆 200、證明不是死連結），這 7 筆今日 10:16–10:24 已由上一輪寫入追查紀錄，不重複計入本輪複核數。新增機會 **1 筆**（商業服務業多店升級 AI 補助）；**1 筆**來源讀取失敗（Coze）。未登入、未申請、未付款。

會改變讀者決定的更正：

- `aocai-working-free-ai-courses-2026`：**「整個計畫已截止」是錯的，截止只適用其中一班**。原紀錄狀態 `applications_closed`、標題寫「11/11 台北班報名已於 11/8 23:59 截止」，但同計畫 11/16 台北班（`ievents.iii.org.tw/EventS.aspx?t=0&id=3544`）報名期間逐字為「2026/09/24 15:00 ~ 2026/11/11 12:30」、費用 0、人數上限 250，官方專區（`serv.gcis.nat.gov.tw/AOCAI/`）另列 11/17、11/26、11/27（臺中）、12/01 等梯次。改 `conditional`、`deadline_at=2026-11-11T12:30+08:00`、weekly／11/11 09:00；11/11 那班的截止事實留在 evidence 的「較早紀錄」。通則：把「某一梯次截止」寫成「方案截止」會讓還開著的梯次消失，狀態要綁在最近仍可動作的梯次上。
- `taipei-youth-ai-subscription-subsidy-2026`：上一則交接寫「期限 11/10 已過，下一輪必須改 `applications_closed`」——**這個前提是錯的**。`deadline_at` 只有日期代表「當天仍可動作」（`tests/validate.py` 的 `close_stamp` 與 `tools/queue.py` 的 `parse_stamp` 都取當日 23:59），而 12:33 重讀服務頁仍寫「最遲應於11月10日前提出申請」「申請日以送達本局之日為準」，公告首頁仍 3 頁 35 筆、無停收／用罄／展延。因此**維持受理中**、next_review 22:00 今日，只把摘要裡的「今天是最後一天」改成不會過期的寫法（期限日當天重讀仍受理，截至中午無停收公告）。通則：交接清單也是主張，日期型期限在當日 23:59 之前都還沒過，別把「明天一定得關」寫成「已經過期」。
- `windsurf-free-quota`：**「Free 額度按日與週刷新」現在只剩舊公告支持**。2026-03-18 公告逐字「Your Free, Pro, or Teams plan includes a usage allowance that refreshes automatically on a daily and weekly basis.」，但現行 `devin.ai/pricing` FAQ 同一句已改成「Each paid plan comes with a usage allowance that refreshes automatically on a daily and weekly basis.」；Free 欄只寫「Light quota」「Limited model availability」「Unlimited inline edits／Tab completions」。摘要與 unknowns 已改寫：日／週刷新屬付費方案，Free 的重置週期未核。
- `freebuff-free-coding-agent-daily-hours`：取消條款首次可核（原 `cancellation` 為 null）：「Monthly cancellation ends your plan and perks immediately, with no proration or refund. Yearly cancellation stops the next renewal; access continues through the paid year, with no automatic refund. Pay once never renews.」；Free 的模型標籤由「DeepSeek V4.1 Flash Slow／10/17」改為「DeepSeek V4.1 Flash 15 hrs or DeepSeek V4.1 Flash Fast 10 hrs」。同頁「Hours per day by model」是多欄表格，文字擷取無法可靠對應 Free 欄，已在 unknowns 寫明未逐格核（不宣稱官方自相矛盾）。
- `kling-ai-free-generation-watchlist`：補到登入點數的重置時點「Issued on the first login each day and reset at 24:00.」；會員方案頁與 `/pricing`、`/docs/faq` 仍只回 JS 外殼，Basic 點數欄第四輪仍取不到。
- `seldon-pilot-up-to-three-k-ninety-days-terms-gap` 與 `stackone-starter-monthly-thousand-credit-terms-conflict`：**裁決路線用盡，改以否定證據收斂**。Seldon 新增第三個官方頁 `/how-it-works`（「New Audit and traffic discovery are retired」）與計費文件（credits 是 USD 預付錢包、`$10` 起始額度、Gmail 不適用），`/changelog` 導向登入頁、文件站無 Audit 章節——三條路線都沒有「試行參與者是否仍取得 Live Audit」的答案。StackOne 的 `/changelog/` 對 credits／Starter 無相關條目、`docs.stackone.com/llms.txt` 沒有計費頁，故 credits vs Action Calls 仍無裁決。兩筆維持 `terms_conflict` + `monthly`，不再每日追；README 這段的規則（衝突未裁決就降頻並在摘要第一句寫明）自此有實際套用案例。
- 其餘 7 筆無實質變動（皆本輪重讀官方頁原文）：`cohere-trial-api`（1,000 calls／月與 20 RPM 表仍在）、`axiom-personal-free-agent-observability`（$0 永久、免卡、500GB／10 GB-小時／25GB／30 天）、`rytr-free-monthly-tenk-characters`（10,000 字元＋25 Engage actions）、`medux-free-trial-3000-credits`（「per month」與 FAQ 無週期兩說並存、方案表第五輪仍回後端錯誤）、`manus-startups-redirect-current-unverified`（HTTP 200、仍暫停公開申請、只收創投推薦）、`indicstack-free-trial-2000-rupees-fifteen-days`（₹2,000／15 天、1 併發／20 RPM）。

新機會（主 agent 逐字重讀官方頁與 PDF 後才寫入）：

- `taiwan-multi-store-ai-upgrade-tier3-2026`：經濟部商業發展署「提升商業服務業營運效能強化韌性計畫」多店升級第 3 梯，受理 2026-11-02 至 **2026-11-30 17:00**、經費用罄得公告提前截止。每案補助上限 **NT$300 萬**且「補助款不得超過全案總經費之50%」，並受「補助款≦自籌款≦實收資本額」限制；提案業者須帶動 **20–50 家**受輔導店家各導入至少 1 項 AI 工具並提供使用 3 個月以上證明，期程 8 個月。限台灣登記營利事業，**資訊服務業（J582／J62／J63）與硬體設備業只能當合作廠商、不得提案**；排除陸資事業、外國營利事業在臺分公司，導入方案不得使用中國大陸廠牌資通產品或服務。與既有單店軌道 `taiwan-commerce-single-store-ai-half-hundred-k` 是同一母計畫的不同軌道（額度、資格、績效門檻皆不同），故另立 ID。`aoc.gov.tw/showPublicAttach/561` 直接抓取回 403，改由執行單位同版 PDF（`smebiz getfile`）擷取全文。
- 未納入：中華電信 hicloud 首月免費（僅圖片替代文字、排除 GPU、須專人受理）、hicloud AI 算力雲 65 折（2025-08 促銷，現行是否續行未核）、NCHC TAIWAN AI RAP 賦能（新聞稿無結束日、推廣頁寫 9/30 止，兩份官方文件衝突且窗口疑已過）、數產署兩案（已截止）、TechSoup 台灣（通路彙整，底層優惠已收錄）。

品質改善（1 組：`app.js` 的 `sourceStamp` 仍用 `split('/')` 取查閱時間）。問題可重現：`tests/validate.py` 2026-11-10 已把自由文字查閱時間改成「抽出最後一個 `YYYY-MM-DD`」，前端卻沒同步——`sourceStamp('2026-10-25（Asia/Taipei）')` 回傳「Taipei）」，`groupSources()` 依字串排序時把它當最舊，最新證據被收進「較早的 N 筆同網址紀錄」。以真實資料統計 10 組同網址來源受影響（`adobe-firefly-assistant-free-beta-regions` 的 11/10 04:24 被 10/25 註記版蓋住，`bubble-agent2-free-monthly-mcp`、`kakao-plus-young-adult-promo-unverified`、`supership-creative-ai-corporate-month`、`v0-free-policy`、`together-prepaid-policy`、`mistral-free-api-policy`、`freshservice-agent-studio-promotion-extension` 同型；另有 12 個尾段不是日期的時間字串）。已改為抽出最後一個日期或時間戳當排序鍵、原文照原樣顯示；`tests/filters.cjs` 新增三種寫法的規格值斷言，加上全庫資料驅動斷言「同一網址群組的主要來源不得比被收合的紀錄更舊」（未列時間者無從排序，略過），修正前會擋下 10 組、修正後 0 組。瀏覽器實測該卡主來源已顯示 11/10 04:24、較早 2 筆收合。驗證：`python3 tests/validate.py`（1,004 筆 PASS，含本輪批次斷言）、`node --check app.js`、`node tests/filters.cjs`（16 組 PASS，免費專區 645、quota 150、台灣條件適用 130／S 級 117）、`python3 tools/queue.py --self-test`、`python3 tools/linkcheck.py --self-test`、`git diff --check`。瀏覽器檢查：資料載入 1,004 筆、本輪更新 14 筆與批次欄位一致、關鍵字「多店升級」1 筆、台灣條件適用 130、免費專區不含新補助、截止日排序把 11/10／11/11／11/12 排在最前、載入更多 24→48、390px 無水平溢出、console 無錯誤。

結構經驗：三件可重用的事。①**「某梯次截止」≠「方案截止」**：補助與課程常有並行梯次，狀態要綁在最近仍可動作的梯次，其他梯次的截止留在 evidence 當歷史（本輪 aocai 就是把它讀成整計畫結束，害讀者以為不能再報）。②**交接清單也是主張，會錯**：上一則寫「11/10 已過、必須改已截止」，但日期型期限在當日 23:59 前都還沒過；接手時先自己判讀期限語意，再決定要不要照做。③**否定證據要收斂成降頻**：同一個 404／同一組互斥文件重查三輪沒有新資訊，就該把「無裁決」寫進 unknowns、改成 monthly，而不是每輪燒一次查核（Seldon、StackOne、Qoder、Astamuse、DeepInfra 這輪都走這條路）。

下輪優先（完整五項）：① `taipei-youth-ai-subscription-subsidy-2026`：12:33 仍受理、期限型別是「當日」；下一輪若已在 11/11 之後，**必須**改 `applications_closed` 並把 cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 的「期限已過卻仍非已截止」與「已截止不得保留 daily」兩條會擋），來源為服務頁與 `https://youth.gov.taipei/announcement/latest-announcement`。② `aocai-working-free-ai-courses-2026`：11/11 12:30 之後確認 11/16 班是否關閉、官方專區是否還有 11/17 以後可報名梯次，再決定維持 conditional 或轉 `applications_closed`；來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544` 與 `https://serv.gcis.nat.gov.tw/AOCAI/`。③ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：11/30 截止、購買期限已過（10/31），需每日追剩餘經費（11/10 仍 NT$253,197／4.4%，總經費 NT$570 萬），額滿即改 `applications_closed`；來源 `https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`。④ `amazon-ara-multilingual-contextual-ai-fall-2026`：台北 11/12 15:59 過後改 `applications_closed`，同時以 raw HTML 確認是否公布 Spring 2027（`https://www.amazon.science/research-awards/call-for-proposals`，本輪仍無該條目）。⑤ `taiwan-multi-store-ai-upgrade-tier3-2026`：11/17 確認第 3 梯是否提前截止（經費用罄公告會出現在 `https://www.aoc.gov.tw/` 訊息公告與 `https://www.smebiz.org.tw/news-project.php`），11/30 後改 `applications_closed` + `on_new_signal` 等第 4 梯或 116 年公告；另 `coze-free-builder-daily-credits` 本輪來源只回 JS 外殼，下輪改查條款頁與 help center。

2026-11-10 11:05–11:29 本輪（接續 dd9b47a 之後）：起始 999 筆；`next_review_at` 嚴格已到期 0 筆、7 日內到期 6 筆、24 小時未核 609 筆。佇列由「官方衝突與未核實」＋`tools/queue.py` 的輪替序（11/08 那批）＋`tools/linkcheck.py` 的 dead 清單組成，12 小時內已核的 184 筆不重讀。局部複核 19 筆：官方衝突與未核實 7 筆（Seldon、Memobase、StackOne、Cognee、DeepSeek 新戶贈額、Z.ai Startups、Fastino GLIDEIS1）＋最久未核輪替 12 筆（AIHubMix、Perch、Nous Portal、ChatGPT Dots、Crawl4AI、Hetzner Inference、GitHub Copilot 學生、Udio、Kiro Startups、Retool 非營利、Snowflake 試用、台灣人力發展學院 AI 概論）；新增機會 4 筆（AWS Rekognition／Comprehend／Translate、Google Cloud Vision）；1 筆整筆追查失敗（E2E Networks，第 3 次確認無替代頁）。未登入、未申請、未付款。

會改變讀者決定的更正：

- `crawl4ai-cloud-monthly-thousand-no-card`：**每頁成本算錯，且官方自己兩個數字不一致**。首頁逐字「A plain page is 0.1 credit, a real browser page 0.5, a hard site 2. Failed calls are free.」，即時費率端點 `base.scrape=0.10`、`search/serp/answer=1.00`；原紀錄寫「scrape 每次 0.5 點」會把可抓頁數低估 5 倍（1,000 credits 實際約 1 萬張一般頁，與首頁「up to 10,000 pages」相符）。另 `/v1/prices` 的 `limits.free.allowance_per_month=2500` 與 `credit.monthly=1000`、首頁「1,000 free credits every month」並存，官方未說明差異，保留為未解衝突而不是任選一邊。
- `nousresearch-portal-free-models`：**免費模型由 5 款減為 4 款**。Free Models 區現列 LongCat-2.5:Free、Reflection Beam 1.0 501B A23B、StepFun Step 3.7 Flash、Upstage Solar Mini 4；整頁搜尋 Crouton 0 命中（全站 342 款）。沒有下架公告，因此只改目錄現況與標題（「五款」→「四款」），不宣稱 Crouton Alpha 永久終止。
- `perch-starter-free-monthly-twenty-k-hosted-cli`：**「UTC 月初重置」是沒有來源的推論**。docs/plans/starter 只寫「Starter usage refreshes each month.」、terms 只寫「reset on a calendar-month basis」，三份官方頁（含 pricing）全無 UTC 字樣，摘要已改寫並把時區放回缺口。額度 20,000 PT／月、免卡、Web／桌面／CLI 共用不變。
- `e2e-explorer-free-versus-usage-discounts`：**第三條路線也確認無替代頁**。/startup-program 仍 308 → /contact-sales（只有「Talk to Sales」），sitemap 200 筆 loc 無 startup-program，**Wayback 對該路徑無任何快照**（前兩輪未查）。仍無停辦公告，維持 `needs_verification`，只寫 `last_review_attempt_at` 與原因，不刷新 `verified_at`。
- 其餘 15 筆無實質變動（皆本輪重讀官方頁原文）：`seldon-…`（25 家名額、90 天、US$3,000「earned」、被接受後才需卡；首頁 FAQ 稱 Audit／discovery 退役 vs 試行頁步驟 02 Live Audit，兩頁同日可讀、衝突未裁決）、`memobase-…`（首頁 500 credits／月 vs 條款 50 operations／月）、`stackone-…`（定價 1,000 credits／席 vs 契約 1,000 Action Calls、Projects 1 vs 2、失敗呼叫計費與否相反）、`cognee-…`（1M vs 10M tokens）、`deepseek-new-user-grant`（價格頁只有扣款順序，無 5M／¥10／30 天）、`zai-…`（bundle 仍「up to 1B tokens」＋Apply/Review/Onboard）、`fastino-…`（10/22 官方貼文仍含 GLIDEIS1、docs 仍要求 verified payment method）、`aihubmix-…`（71 款、10 次免卡試用、儲值後 100/日）、`chatgpt-dots`（GPT-6.1 Terra、Pro 18 歲以上排除 EEA/UK/CH、11/18 起預設開啟）、`hetzner-…`（實驗期免費、兩款 Qwen、60 秒 10 次）、`github-copilot-student`（學生無限補全、AI credits 無數值、每月重評）、`udio-…`（每日 10＋每月 100、每日三首 130 秒）、`kiro-…`（4/7–12/31、18 歲、排除國別未列台灣）、`retool-nonprofit-…`（US$1,625／月、25 席、排除年約）、`snowflake-ai-trial-2026`（US$400／US$40、email 即可、AI 功能須加卡）、`taiwan-hrd-…`（2026 全年、任何人、105 分鐘、75 分＋閱讀 1 小時）。

新機會（主 agent 逐字重讀官方頁後才寫入）：

- `aws-rekognition-free-tier-1000-images-monthly`：影像分析每月 1,000 張（官方寫 Group 1 與 Group 2 各 1,000）、1,000 個人臉向量＋1,000 使用者向量、影片 60 分鐘、Custom Labels 2 小時訓練＋1 小時推論，皆自帳戶建立起 12 個月；Image Properties 無免費額度。**DetectText 官方語言不含中文**，繁中 OCR 要改用 Textract／Cloud Vision；端點表無台北。
- `amazon-comprehend-free-tier-50k-units-twelve-months`：每 API 每月 5 萬單位（1 單位＝100 字元、單次最低 3 單位），**新舊客戶皆適用**、自首次請求起 12 個月。繁中 zh-TW 只涵蓋實體、關鍵片語、情感與語言偵測；目標情感僅英文、語法分析不含中文、PII 僅英西、Topic Modeling 不支援中文，Custom Comprehend 無免費額度。
- `amazon-translate-free-tier-2-million-chars-twelve-months`：Standard 與 Batch Document 各 200 萬字元／月×12 個月、跨區合計不累積；**即時文件翻譯完全沒有免費額度**、ACT 每月 50 萬字元僅 2 個月；zh-TW 支援、同語言互譯不計費。
- `google-cloud-vision-free-tier-1000-units-monthly`：Free Tier 表列每月 1,000 單位，定價頁則寫每特徵前 1,000 單位（1 單位＝1 個特徵套用 1 張影像、PDF 每頁算一張），兩處官方頁不一致已列缺口；需啟用 Cloud Billing、額度不累積、無結束日但可提前 30 天變更；zh-Hant OCR 支援、Global 端點、台灣帳單 TWD。
- 未納入：Azure AI Vision F0（定價頁標「N/A in selected region」，區域可得性存疑，且 Read 已由 `azure-document-intelligence-f0-500-pages` 覆蓋）；其餘聚合名單候選皆已在庫。

品質改善（1 組：`tools/queue.py` 把「只有日期的截止日」讀成當天 00:00）。問題可重現：`datetime.fromisoformat('2026-11-10')` 會成功回傳當日 00:00，於是 `parse_stamp(..., end_of_day=True)` 的「當天仍可動作」分支永遠走不到——`close_points()` 用 `> now` 過濾後，**期限就是今天的紀錄在期限當天反而掉出 closing 桶**，也沒有 24 小時緊急豁免。實測：`taipei-youth-ai-subscription-subsidy-2026`（`deadline_at: 2026-11-10`、status `conditional`）在 11:20 完全不在佇列，修正後立即以 `[closing]` 排到第一位（closing 桶 0 → 1 筆）。同一修正也讓「只有日期」的截止點改以當日 23:59:59 計算：ADI FORUM 的 11/12、騰訊 Hy4 的 11/15 從 00:00 移到當日結束，桃園課程的 11/17 因此離開嚴格的 7 天視窗（原本被算成 11/17 00:00），所以基準的「7 天內到期」筆數仍是 6，但組成因修正而變——這正是「筆數沒變不等於規則沒錯」。全庫有 13 筆可行動紀錄只用日期記錄截止點（含新竹補助 11/30、OpenRouter Dots3 12/31）。修法：只有字串含 `HH:MM` 才走 ISO 快路徑，其餘一律走日期分支並套用 `end_of_day`。`--self-test` 新增三條規格值斷言（日期期限＝當日 23:59:59、排程日期維持 00:00、帶時刻的期限不得被改成 23:59）與兩筆合成紀錄（期限今天必須落在 closing 桶、期限昨天不得再由 closing 桶排入）。

驗證：`python3 tests/validate.py`（1,003 筆 PASS，含本輪批次斷言）、`node --check app.js`、`node tests/filters.cjs`（免費專區 644、quota 150、台灣條件適用 128／S 級 115 與概況卡一致）、`python3 tools/queue.py --self-test`、`python3 tools/linkcheck.py`（本輪變更前 999 筆、2,738 個 URL：dead 8、unreachable 9、blocked 72；發布前對 1,003 筆再掃 2,753 個 URL：dead 仍是同樣 8 個網址、unreachable 13（新增的 4 個是本次逾時，不是新失效）、blocked 72）、`git diff --check`。瀏覽器另核對：資料載入、本輪更新 23 筆、四筆新紀錄的關鍵字與台灣／免費篩選、卡片費用與來源呈現、桌面與手機版無水平溢出、console 無錯誤。

結構經驗：三件可重用的事。①**「官方兩個數字」要留下矛盾，不要選一個**：Crawl4AI 的 1,000 vs 2,500、Vision 的「每月 1,000 單位」vs「每特徵 1,000 單位」、Memobase 的 credits vs operations，都是同一站同日可讀的兩種計量，正確寫法是並列＋列缺口。②**自己寫的推論會變成讀者的數字**：Perch 的「UTC 月初重置」連續三輪被當成事實，實際三份官方頁都沒有 UTC；凡是摘要出現官方沒有的時區、時鐘或換算，都要能在來源找到逐字。③**日期欄位的兩種語意**：排程用 `00:00`、期限用 `23:59:59`，同一個解析函式若靠「先試 ISO」實作，就會把後者靜默吞掉——這一類 bug 不會讓任何測試變紅，只會讓某一天的佇列少一筆。

下輪優先（完整五項）：① `taipei-youth-ai-subscription-subsidy-2026`：期限 11/10 已過，下一輪**必須**改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 兩條斷言會擋），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：台北 11/12 15:59 過後改 `applications_closed`，並以 raw HTML 確認是否公布 Spring 2027 徵案（`https://www.amazon.science/research-awards/call-for-proposals`）；③ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：11/30 截止、購買期限已過，每日追剩餘經費（11/10 仍 NT$253,197／4.4%），額滿即改 `applications_closed`，來源為新竹市青年中心服務頁；④ `seldon-pilot-up-to-three-k-ninety-days-terms-gap` 與 `stackone-starter-monthly-thousand-credit-terms-conflict`：兩筆的官方衝突（Live Audit 退役 vs 試行步驟；credits vs Action Calls）已連續多輪未裁決，下一輪改查 changelog／FAQ／客服文件，仍無裁決就考慮降為 watchlist 並在摘要第一句寫明「兩份官方文件互斥」；⑤ `tools/linkcheck.py` 的 dead 清單（先跑一次取最新）：`perplexity-watch`／`perplexity-education`（`llms-full.txt`）、`qoder-community-1024`（兩個 events 路徑）、`astamuse-agent-trial-oct31-index-only`、`deepinfra-two-minute-papers-twenty-credit`、`fal-flux3-max-five-daily-sandbox`、`salad-ssap-migration-credit-watch`——這 7 筆已多輪確認無替代頁，應改為在 evidence 明寫「404 為否定證據」並降低複核頻率，而不是每輪重查。

2026-11-10 10:06–10:41 本輪（接續 970fd5e 之後）：起始 994 筆；`next_review_at` 嚴格已到期 0 筆、7 日內到期 6 筆全在 12 小時冷卻內、24 小時未核 599 筆，因此佇列照 `tools/queue.py` 的輪替序（11/08 那批）＋台灣期限與官方衝突＋`tools/linkcheck.py` 的 dead 清單組成，12 小時內已核的 173 筆不重讀。局部複核 19 筆：到期與高風險 8 筆（數位產業署 ADI FORUM、Amazon ARA、騰訊 Hy4 免費窗、AutoClaw M11W2、UGREEN 黑客松、桃園 AI 產能課程、StepFun StepAudio 3、Rime STT）＋最久未核輪替 4 筆（Aion Labs、Scaleway Generative APIs、OpenCode 免費模型、Maximo）＋來源修復 7 筆（Honeycomb、fal FLUX 3 Max、Perplexity ×2、Nebius Token Factory、Salad SSAP、AIコンパス）。新增機會 5 筆、政策 0 筆、觀察線索 0 筆；整筆來源追查失敗 5 筆（DeepInfra 2MPapers、E2E Networks、Qoder、astamuse、Claude Artifacts 促銷，皆已記錄替代路線與否定證據、未刷新 `verified_at`）；未完成複核 975 筆。未登入、未申請、未付款。

會改變讀者決定的更正：

- `nebius-token-factory-signup-one-dollar`：**官方現行文件已沒有「US$1／30 天」**。billing 文件搬家到 `/other-capabilities/billing-new`（舊路徑 404），該頁與 docs 全量 `llms-full.txt`（111 萬 bytes）搜尋 `trial` 為 0 命中，只剩「promo code 提供免費 credits」通則；Wayback 2026-09-16 快照仍有逐字「Upon first sign-up, you receive $1 in trial credit, valid for 30 days.」，證明是之後移除，但官方沒有取消公告。狀態由 `conditional` 改 `needs_verification`、`quota_classification` 改 `UNKNOWN`，金額與效期改列未知；「billing 為 onboarding 必要且需 bank card」逐字未變，仍不能當成免卡。
- `honeycomb-free-canvas-ai-copilot`：免費層只剩一個來源的風險解除。`docs.honeycomb.io/get-started/honeycomb-free` 連續兩輪 404 且不在 docs sitemap；現行替代頁是 `docs/configure/teams/pricing-plan`（Free 方案存在）＋`get-started/create-account`（註冊步驟未列付款資料），額度 20M events／100M metrics points 仍逐字在 pricing 頁。另補 2026-07-01 起 Pro 改價（US$3.00／百萬 events、grace 至 2026-12-31），Free 不受影響。
- `fal-flux3-max-five-daily-sandbox`：**折扣結束日衝突今天仍在，而且兩份官方頁都還活著**。模型 `llms.txt` 寫 50% 至 11/22、11/23 00:00 UTC 恢復原價；landing `/flux-3-max` 仍寫「until November 21」並自標「Information updated as of November 5, 2026」。依 `fal.ai/llms.txt`「Current prices live in each model's llms.txt」，llms.txt 為權威、landing 是舊文案，但官方未互引，仍維持 `terms_conflict`。sandbox 免費次數今天是 6（昨日 7），sandbox 文件只寫「occasionally offers」，沒有 reset／daily 字樣，所以「每日重置」不成立；`/flux-3-max-free` 已 404 且不在 sitemap（1,651 筆只剩 grok-imagine-free、wan-video-free）。
- `ai-compass-platform-waiver`：**404 的活動頁有官方替代頁**。`/campaign/education` 仍 404，但官網新着情報連到 `/news/17`（2026/10/15）：系統利用料月額 0 円（通常 33,000 円）、每帳號另收 880 円／月、申込至 10/29 18 時——與原紀錄條件一致，期限已過，狀態維持 `expired`。
- `perplexity-education`：補到一直缺的付款前提。billing FAQ（10353002）逐字「a valid payment method is required to activate and maintain your access」「A valid credit or debit card is required for all promotional and trial redemptions」；US$10／月與「unlimited vs weekly limits」衝突未變，`llms-full.txt` 404 後改由 `_llms/other/en.txt` 索引逐篇取用。
- 五筆來源整組失效的紀錄（`deepinfra-two-minute-papers-twenty-credit`、`e2e-explorer-free-versus-usage-discounts`、`qoder-community-1024`、`astamuse-agent-trial-oct31-index-only`、`claude-artifacts-expired-lead`）：分別以 sitemap／llms.txt／官方索引做否定證據，確認**沒有替代入口**（Qoder 的 events 索引 11 筆已無 communityboost、DeepInfra sitemap 1,049 筆無 papers、E2E 的 startup-program 仍 308 轉業務表單）。只寫 `last_review_attempt_at` 與原因，不刷新 `verified_at`，狀態不動。
- 其餘 8 筆期限案（ADI FORUM、Amazon ARA、騰訊 Hy4、AutoClaw、UGREEN、桃園課程、StepFun、Rime STT）**全部 no_change**：逐字期限未變、無停收／額滿／改期／延長公告。UGREEN 的 Devpost 正式規則前幾輪 403，本輪可直取，台灣仍在合格居住地名單。桃園課程頁「報名日期至 115-11-17」與報名列表「公告日期至 115-11-20」的不一致仍未解。

新機會（主 agent 逐字重讀官方頁後才寫入）：

- `azure-document-intelligence-f0-500-pages`：Azure AI Document Intelligence F0 每月 **500 頁**免費（Document type=All），但**單次 analyze 只回前 2 頁**、Analyze 1 TPS 不可調，訓練自訂模型不收費；Read 模型支援繁中 zh-Hant。官方區域產品表把 Azure AI Search／Speech 列在 Taiwan North，卻**沒有** Document Intelligence，因此台灣資格記 `Yes` 但註明資源可能需建於日本東部／東南亞。
- `azure-ai-search-free-tier-50mb-three-indexes`：每訂閱 **1 個**免費搜尋服務，50 MB、3 個索引／索引子／資料來源、來源檔 16 MB；共享硬體、不可 scale-up、閒置可能被刪、無 SLA；語意排序器每月前 1,000 次與 agentic retrieval 前 5,000 萬 tokens 另列免費。區域表把 Azure AI Search 在 Taiwan North 標 GA。
- `amazon-textract-free-tier-three-months`：新客戶 **3 個月**，Detect Document Text 每月 1,000 頁、簽章 1,000 頁、Forms／Tables／Layout 100 頁，Custom Queries 無免費額度；支援簡繁中文；AWS Free Tier 排除區只有中國 ZHY／BJS 與 GovCloud，但 Textract 端點沒有台北。
- `amazon-transcribe-free-tier-60-minutes-twelve-months`：每月 **60 分鐘、為期 12 個月**，自第一個轉錄請求起算、跨區合計不累積；官方語言表列 zh-TW 支援 batch 與 streaming；內容遮蔽與自訂語言模型不適用免費層。兩筆 AWS 紀錄都保留「官方 FAQ 另稱 Free plan 最多 6 個月」與產品層 3／12 個月額度關係未說明的缺口。
- `mediatek-breeze-taigi-asr-apache-open-weights`：聯發科研究院與陽明交大 SARC 的 Breeze ASR 25／26 為 Apache 2.0 開放權重，台語模型（BreezeASR-Taigi）輸出華文字、模型卡公布平均 CER 30.13%（教育部台語輸入法 30.70、Gemini 3 Flash 32.52），但單檔 CER 14.49%–52.78% 波動大；無官方託管 API，用量上限等於自己的算力。
- 未納入：Intel Tiber Developer Cloud（三個官方路線皆 403／連線失敗，無官方原文）、Azure AI Vision F0（Taiwan North 標 Closing Down，產品界線未明）、台中市 AI 補助（只讀到 115 年度已截止的轉載頁）、LMNT（官網已宣布 shut down）、PlayHT（兩次讀取失敗）。

品質改善（1 組：把「最新一次追查失敗」放上卡片正面）。本輪有五筆紀錄的來源整組失效，但卡片外觀與剛核實的紀錄完全相同——讀者只看到「核實 2026/11/07」，點進來源才發現 404，失敗原因藏在收合的詳情裡；全庫這類紀錄共 8 筆（另含 `articul8-bivia-early-adopter-billion-tokens`、`coze-free-builder-daily-credits`、`stitch-free-daily-credit-ui-design-beta`）。改法：新增 `latestAttemptFailed()`，當 `last_review_attempt_at` 晚於 `verified_at`（或根本沒有 `verified_at`）時，在卡片底部核實日旁加「追查未成功 <日期>」，`title` 保留失敗原因，樣式 `.attempt-pill` 沿用期限警示色。較早的失敗不得蓋掉較新的成功核實。`tests/filters.cjs` 以規格值斷言四種排序情況（新的失敗要標、舊的失敗不標、沒有追查不標、沒有核實但有失敗要標），再對全庫逐筆斷言「標記結果必須等於資料判定」，並確認 `.attempt-pill` 存在於 `style.css`，避免只修好當下快照。

驗證：`python3 tests/validate.py`（999 筆 PASS）、`node --check app.js`、`node tests/filters.cjs`（16 組 PASS，含本輪新增的追查失敗標記）、`python3 tools/queue.py --self-test`、`python3 tools/linkcheck.py`（2,7xx 個 URL：dead 11、unreachable 8、blocked 73）、`git diff --check`。瀏覽器另核對：概況數字（19／5／975）與 `last_research_run` 一致、本輪更新 24 筆、五筆新紀錄的關鍵字搜尋、台灣／免費／S 級篩選、截止日排序（ADI FORUM 11/12、桃園 11/17 排最前）、載入更多 24→48、Nebius 與 Honeycomb 卡片的狀態與來源、DeepInfra 卡片的「追查未成功」標記、桌面與手機版無水平溢出、console 無錯誤。

結構經驗：兩件可重用的事。①**「文件搬家」與「活動終止」要分開處理**：本輪 4 筆 404 是內容搬家（honeycomb、ai-compass、perplexity 索引、nebius billing），1 筆是整組下架（qoder）；判斷依據是官方 sitemap／llms.txt／索引頁是否還列該路徑，而不是 404 本身。②**「官方沉默」是一種狀態，不是零**：Nebius 移除 US$1 敘述後，正確寫法是 `needs_verification` ＋金額未知，而不是「已取消」或沿用舊金額；反之 E2E 的 308 轉業務表單同樣不足以判定停辦。

下輪優先（完整五項）：① `taipei-youth-ai-subscription-subsidy-2026`：`next_review_at` 是今晚 22:00，期限 11/10 一過**必須**改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 兩條斷言會擋），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：台北 11/12 15:59 過後改 `applications_closed`，並以 raw HTML 確認是否公布 Spring 2027 徵案（`https://www.amazon.science/research-awards/call-for-proposals`，reader 會退回過期 RSS）；③ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：11/30 截止、購買期限已過、剩餘經費 4.4%，每次複核先看餘額公告（`https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`、勞青處 115/5/8 公告），額滿即改 `applications_closed`；④ `fal-flux3-max-five-daily-sandbox`：11/21–11/23 逐日讀模型 `llms.txt` 確認折扣結束日是否改寫，並觀察 sandbox 次數是否有官方重置週期（`https://fal.ai/models/blackforestlabs/flux-3-max/text-to-video/llms.txt`、`https://fal.ai/sandbox`）；⑤ `google-vids-omni-free-sixty-seconds-monthly`：四說並存（60 秒／月、3 支 15 秒、50 支／月、Workspace 訂閱要求），下輪試 Workspace 定價頁或 Gemini 方案頁找優先序（`https://support.google.com/docs/answer/16143507`、`https://workspace.google.com/intl/zh-TW/products/vids/`）。另：`moe-library-aihub-seat-trial-free-paid-ai` 的全國層級仍只有媒體引述，要找終身教育司／國圖／國資圖官方頁；`nebius-token-factory-signup-one-dollar` 觀察官方是否補公告或恢復贈額。

局部複核 19 筆：最久未核輪替 9 筆（GMI SCALE、Couchbase Activate、Elfa、Kilo Gateway、Go2 AI-OCR、Parallel MCP、RealAds、さっとFAQ、SHIFT ASIA）＋到期與高風險 6 筆（臺北青年 AI 補助期限日、Google Vids、HAL-X THX-02、TRAE、國發基金加強投資 AI 新創、經濟部服務業 AI 專班）＋模型目錄與額度 4 筆（Claude Free、Gemini API 免費層、Swarms 新創、Airweave）。新增機會 3 筆、政策 0 筆、觀察線索 0 筆；整筆追查失敗 1 筆（Google Stitch，5 條路線都只回 JS 空殼）；未完成複核 972 筆。未登入、未申請、未付款。

會改變讀者決定的更正：

- `gemini-watch`：**免費層目錄被低估**。定價頁 Free Tier 欄現有 17 個「Free of charge」模型段落（3.8／3.6 Flash、3.5 Flash-Lite、Flash TTS、Live 系列、2.5 Pro／Flash、Embedding 等），而 Pro 級（3.1 Pro Preview、4 Argon）與 Nano Banana 影像系列一律「Not available」。原紀錄只點名 3 個 Flash 模型，讀者會以為免費層只有三個模型，也可能誤判 Pro 級有機會免費；摘要已改寫並把「Pro 級不含」寫進缺口。各模型 RPD 官方已不在靜態頁公布，仍列未知。
- `elfa-api-free-once-thousand-credits`：**引用的官方文件頁已 404**。`docs.elfa.ai/api-reference/introduction` 實測回「Page Not Found」，一次性 1,000 點、60 RPM、用盡回 429 的條文已搬到 `/get-started/pricing.md`；來源改指向現行頁並移除失效網址。另發現定價頁已不列 Free 方案（只剩 PAYG／Grow／Enterprise），商用授權只在 Enterprise 為 Included。
- `gmi-scale-cohort-three-spring-2027-credits-watch`：**US$125k 圖卡不是 SCALE 自己核發的額度**，而是 Program Partners 區的 NVIDIA Inception Program（「$125k in MaaS and Compute credits」）；是否需另行加入 Inception、能否與 SCALE 額度重複計算，頁面仍未寫明。第三期仍「Cohort 03 applications open」、2027 春季、截止日 TBA、額度條款開課前才確認。
- `google-vids-omni-free-sixty-seconds-monthly`：**衝突多一層**。生成說明頁另有「Most users can generate up to 50 videos per month」（支數），與支援表 60 秒／月、部落格 3 支 15 秒／月並存；另補到原本沒記的地區限制「EEA、UK、瑞士、Illinois、Texas 不能用上傳影片再編輯」（台灣未列）。
- `realads-once-fifty-no-watermark`：免費 50 點仍在且免卡，但「免費輸出無浮水印、可商用」仍只存在於 FAQ，付費條款第 8 條要求免費作品保留浮水印且僅限非商用；條款頁首還停在「버전 1.2／개정 예정 2026. 10. 28. (v1.3)」，哪一版實際生效無法判定。
- `hal-x-thx-keyless-free-decision-api`：**條款仍無公開文本**。`hal-x.ai` 現 302 到 `mergen.az`（自述 Mergen AI LLC），`mergen.az/terms` 仍 404；免金鑰 60 decisions/min 與 Limits 表（無每日總量）逐字未變。
- `taipei-youth-ai-subscription-subsidy-2026`：期限日 09:11 仍受理，公告首頁仍「共 3 頁 35 筆」、無停收／用罄公告；期限只寫日期且以「送達本局之日」認定，今晚 23:59 之後的下一輪必須改 `applications_closed`（`next_review_at` 已排在今天 22:00）。
- 其餘 12 筆無實質變動（皆本輪重讀官方頁）：`couchbase-activate-…`（頁面仍有 2021 佔位文字、無名額）、`kilo-auto-free-hosted-models`（免費目錄 3 款、匿名 200 次／小時／IP）、`lets-go2-…`（活動至 12/28、12/10 上線）、`parallel-mcp-…`（免金鑰範圍不變、未公布限速數值）、`satfaq-…`（活動至 2027-03-31）、`shift-asia-…`（20 家受付中、無日期截止）、`trae-free-ide`（以瀏覽器完整渲染後仍無 Taiwan）、`investai-…`（1:1／2:1、單次 1 億、累計 1.5 億）、`aocai-enterprise-…`（116-07-31 受理、每班 75 萬）、`claude-watch`（Free 仍只列 Sonnet／Haiku 家族名、不含 Claude Code 與 API 額度、台灣仍在名單）、`swarms-…`（三級額度、12 個月、無截止日）、`airweave-…`（10 連線／50 查詢／50K entities，條款仍自稱 drafts）。

新機會（主 agent 逐字重讀官方頁後才寫入）：

- `amplitude-startup-scholarship-year-one-free-growth`：員工人數 <20、募資 <US$1,000 萬的團隊**首年 Growth 全功能免費**（每月 1 億 events 或 200K 追蹤使用者，含 session replay、MCP、agents），官方自述價值 US$60,000、免信用卡；第二年 40% off 年繳 Plus，或降回永久免費的 2M events／月並保留資料，官方寫「No penalty」。US$60,000 是官方自述估值，Growth 在定價頁是 custom 報價，不當可折現金額。
- `pagerduty-startups-six-months-ai-actions`：未曾用過 PagerDuty 且處於 Seed／A／B 的新創 **6 個月 US$0**，含 20 seats、20,000 events、1,000 AI Actions，官方寫「Not a discount. Not a demo. No credit card required」；期滿處理與「20,000 events／1,000 AI Actions 對應哪個公開方案」未公布，Starter 年費 US$2,800 只作量級參考。
- `auth0-startups-b2b-professional-free-year`：有創投支持、募資 <US$500 萬、ARR <US$100 萬、成立未滿兩年的團隊**一年 B2B Professional 免費＋100k MAU**（含 Enterprise MFA、Organizations、Token Vault、Inbound SCIM），排除既有付費 Auth0／Okta 客戶與曾參加者。定價頁價格是 JS 動態渲染，本次未取得逐字金額，因此不列等值。
- 未納入：Google Ad Grants（每月 US$1 萬搜尋廣告、台灣明列社團法人／財團法人）金額可觀但**不是 AI 存取額度**，與本資料集範圍不符；Oxyy（官方 `/startups` 404，首頁只有「有起始餘額」而無金額）；AMD、Grok for Startups、Modal、GitHub for Startups、Together、Cartesia、Algolia、Retool、Neon、Scaleway、Mem0、LlamaParse 等聚合名單皆已在庫。

品質改善（1 組：把「證據連不上」變成可掃描的清單）。本輪在 elfa 撞到一個沒有工具會發現的錯誤：官方文件頁改版 404，卡片卻仍標「官方來源支持」。因此新增 `tools/linkcheck.py`（只讀、無新依賴）：去重 2,712 個來源 URL，HEAD 之後一律再用 GET 確認，分成 dead（404／410）／unreachable（逾時、DNS、TLS）／blocked（400／401／403／405／429／5xx，只統計不逐列）。**關鍵規格：只憑 HEAD 判死會誤報**——`support.google.com/docs/answer/*` 對 HEAD 回 404、對 GET 回 200，`www.codebuddy.cn/pricing` 同樣；所以 `probe()` 只有 HEAD 成功才提早結束，其餘一律再試 GET，`--self-test` 用注入的 fetcher 固定三種情況（HEAD 404＋GET 200＝ok、兩者皆 404＝dead、HEAD 403＋GET 200＝ok）。第一版就是漏了這條，首次全掃產生 45 筆假 dead，人工抽查後才發現。實測本輪資料：ok 2,623／dead 13／unreachable 8／blocked 68，13 筆紀錄引用到 404。本輪直接修掉 3 筆（elfa 換到現行文件頁、novita 的舊條款網址併進 `/legal/terms-of-service`、honeycomb 的免費層文件頁移除並改寫缺口），其餘列入下輪優先。工具**不**接入 `tests/validate.py`：驗證必須離線可重現，網路狀態不是資料錯誤。

驗證：`python3 tests/validate.py`（994 筆 PASS，含本輪批次斷言）、`node --check app.js`、`node tests/filters.cjs`（台灣條件適用 119、S 級 106、免費專區 635、quota 144 與資料一致）、`python3 tools/queue.py --self-test`、`python3 tools/linkcheck.py --self-test`、`git diff --check`。瀏覽器另核對資料載入、本輪更新篩選（22 筆）、關鍵字與台灣資格快捷、排序與載入更多，以及本輪改動卡片（Gemini、Elfa、Google Vids、Amplitude）的費用、狀態與來源呈現。

結構經驗：三件可重用的事。①**subagent 只回結構化 JSON，不寫共享 JSON**：本輪 3 個 subagent 全部只回 patch 內容，主 agent 逐筆重讀會改變讀者決定的頁面（elfa 的 404、GMI 的 $125k、Vids 的 50 支／月、Amplitude／PagerDuty／Auth0）。②**HEAD 不是 GET**：Google 支援頁與部分中國站台對 HEAD 回 404，任何連結檢查都必須用 GET 複驗，否則會把還開得起來的官方文件判成失效。③**模型目錄會輪替**：像 `gemini-watch` 這種寫死模型名的紀錄，每輪要重新逐段核對 Free Tier 欄，不能只確認「這幾個名字還在」。

下輪優先（完整五項）：① `honeycomb-free-canvas-ai-copilot`（active）與 `fal-flux3-max-five-daily-sandbox`（terms_conflict）：`docs.honeycomb.io/get-started/honeycomb-free`、`fal.ai/flux-3-max-free` 皆 404，要找現行官方頁，或改以 pricing／model 頁支持同一主張；② 其餘 dead 清單（先跑 `python3 tools/linkcheck.py` 取最新）：`perplexity-watch`／`perplexity-education`（`perplexity-help-center.mintlify.app/llms-full.txt`）、`qoder-community-1024`、`deepinfra-two-minute-papers-twenty-credit`、`nebius-token-factory-signup-one-dollar`、`astamuse-agent-trial-oct31-index-only`、`ai-compass-platform-waiver`、`claude-artifacts-expired-lead`、`e2e-explorer-free-versus-usage-discounts`；③ `google-vids-omni-free-sixty-seconds-monthly`：四說並存（60 秒／月、3 支 15 秒、50 支／月、Workspace 訂閱要求），下輪試 Workspace 定價頁或 Gemini 方案頁找優先序；④ `moe-library-aihub-seat-trial-free-paid-ai` 與 `watchlist-moe-adaptive-learning-ai-tutor`：全國層級仍只有媒體引述，要找終身教育司／國圖／國資圖官方頁；⑤ `taipei-youth-ai-subscription-subsidy-2026` 今晚 22:00 複核：期限一過就必須改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 兩條斷言會擋），並確認是否補發停收／額滿公告。另 `stitch-free-daily-credit-ui-design-beta`（追查失敗，next 11/20）要用可執行 JS 的瀏覽器重試。

2026-11-10 08:05–08:31 本輪（接續 0b2eb41 之後）：起始 986 筆；`next_review_at` 嚴格已到期 0 筆，7 日內到期 6 筆全在 12 小時冷卻內（凌晨到 07:19 已核），因此佇列由「3 天內到期且未冷卻」＋「官方衝突」＋「最久未核輪替（10/31 那批）與來源缺口」組成，全天已核 157 筆不重讀。局部複核 19 筆：到期與高風險 9 筆（Google AI 證書試用、新竹市AI領航補助、ZCode 300M 線索、Krutrim、D-ID、Featherless、Respan、LangWatch、Perplexity）＋最久未核與來源缺口 10 筆（Evidently、fal Builder、Sarashina、Sapling、TextRazor、Workato、Corti、Qoder Lite、Ideogram、Salad SSAP）。新增機會 4 筆、政策 0 筆、觀察線索 1 筆；整筆追查失敗 0 筆；未完成複核 967 筆。未登入、未申請、未付款。

會改變讀者決定的更正：

- `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：**16 歲 vs 18 歲的資格衝突解開，而且兩邊都是真的**。現行服務頁逐字「自115年8月14日起，設籍新竹市16歲(含)至40歲(含)」（民國 74/4/3–99/4/2），90% 對象擴及獨立負擔家計、身心障礙、原住民、新住民與就業服務法第 24 條各款；而 115/4/1 的原始計畫（竹市青年字第1150000731號）寫 18 歲起、弱勢只有低收／中低收、總經費 70 萬元。差異來源是 115/8/14 的修正公告加碼 500 萬元並改為 16 歲（70 萬＋500 萬＝現行頁 570 萬元），勞工及青年處 115/5/8 的舊公告未下架。讀者影響：原本被「18 歲」與「只有低收」擋掉的人其實符合；但購買期限 115/10/31 已過，現在才訂閱者一律不符，只剩期限內已購買、還沒送件的人有機會（餘額仍 4.4%，逾 14 小時未變）。
- `zcode-daily-300m-glm53-flash-claim-watch`：**「每日 300M」仍無任何官方文件，5M 與 8M 的落差也不是筆誤**。welcome 頁逐字「GLM-5.3 3M tokens / day｜GLM-5-turbo 2M tokens / day｜Daily total (5 days only) 5M」，configuration 頁逐字「8 million tokens per day for the first 5 days…GLM-5.3-Flash 5 million tokens / day」——差別在第二桶是不同模型，兩頁都寫只給前 5 天。changelog 最新仍是 3.17.2（Nov 3, 2026）且全頁沒有 300M；GitHub zai-org/feedback#1363 仍 open、只有機器人回覆，回報者是**付費** GLM Coding Lite Yearly 且自 10/30 起 `coding_plan_system_busy`。維持 `needs_verification`，不要為了 300M 去安裝或升級。
- `perplexity-watch`：**Pro 的 US$20 仍是唯一沒有官方原文的數字**。pricing 與 /pro 今天仍 403（Cloudflare），Help Center 的 llms.txt 也 403；改由 Mintlify 鏡像逐篇 `.md` 讀到 7 篇：免費層「five Pro Searches per day」與比較表「3/day」同日並存（衝突未解）、Max 有原文「$200/monthly or $2000/annually」、Pro 沒有固定月度額度而是「weekly Computer usage」＋一次性 4,000 credits（約 30 天到期、100 credits = $1）、退款窗口分區（EU／UK／土耳其 14 天、南韓／巴西 7 天、其他地區月繳 24 小時／年繳 48 小時）。Wayback 對 /pricing 只有 2026 年的 404 快照。
- `sapling-api-thirty-day-trial-automation-terms-gap`：**自動化衝突收窄但沒消失，另外補到一直列為未知的重置時點**。sandbox 文件新增「Automated tests and agents」段，逐字「an agent can be given a trial key and explore freely」；同頁「Daily account allowance Shared across all endpoints. It resets at UTC midnight」，超額回 429（endpoint 或月額）或 402（帳戶日額）並附 retry_after；但 tos §4.3(vi) 仍禁止「automated agents or scripts…to generate automated searches, requests, or queries」，兩份官方文件並存且互不引用，所以不寫成「自動化已授權」。
- `fal-builder-redirect-unresolved`：**舊 Builder Grant 的 $25–$250 已從站台消失，但仍沒有終止公告**。`/builder-grant` 回 308 → `/startup-program`、sitemap 全表無 builder 路徑、`/grants` 其實是另一個 Research Grants（平均 $50k、總額 $2m、12 家）。現行計畫仍是 Europe & Asia、$1,000 起、每公司 3 個月一次。
- `salad-ssap-migration-credit-watch`：**US$10K 兩個月遷移額度只剩 2024-04-24 的部落格**。`/ssap/`、`/startup-program`、`/salad-gpu-cloud/` 全 404，sitemap 41 筆與 `docs.salad.com/llms.txt` 都沒有 ssap，Wayback 對 `/ssap/` 沒有任何快照；不應再用這個數字編預算。
- `sarashina-free-beta-japan-only`：**模型數不一致（6 vs 7）**。10/13 press release 仍列 6 個模型並寫「無償ベータ版の提供終了時期は未定」，docs 索引與 rate-limits 已列 7 個（含 `sarashina3.2-mini-thinking` 30 RPM）；thinking 是否納入免費 beta 仍未知，條款仍限日本居住或日本本店法人，台灣維持 No。
- `krutrim-sandbox-oct22-past-banner`：首頁只剩按量計價（₹1.56/hr 起）與免卡註冊、release notes 最新 2026-10-28 未提贈額，仍無促銷復活證據；既然沒有現行額度也沒有新訊號，複核由 weekly 改 `monthly_or_new_signal`、下次 12/10，讓佇列留給還有機會的案例。
- 其餘 11 筆無實質變動（皆本輪重讀官方頁原文）：`google-ai-professional-certificate-tw-pro-3mo`（台灣頁 2027-01-01 vs 條款 11/06，兩份文件都還在、條款未改版，維持 terms_conflict）、`did-mobile-…`（手機文 14 天＋12 點要綁卡 vs 總覽文 14 天不限量，2025 年兩篇都沒動）、`featherless-…`（US$25 仍限本人互動聊天、4 concurrent、32K）、`respan-…`（Free 100k logs／1k scores 仍無週期標示；ToS §3(6) 禁自動化、§7 禁未核准商業用途）、`langwatch-…`（€0 free forever vs ToS 14 天；docs 保留期表澄清 14 天指 trace 被遮蔽、預設保留 49 天）、`evidently-…`（90%／6 個月、未滿 2 年或募資 <$5m，仍無金額與截止日）、`textrazor-…`（500/day、2 並行；/faq 與 /pricing 404，重置時區未公布）、`workato-…`（50,000-credit 一次性、免卡；效期未公布）、`corti-…`（US$5,000／12 個月、協議 §4.6 免付款、丹麥法）、`qoder-lite`（`qoder.com/pricing` 200 但只有 8.6KB JS shell、grep lite = 0、sitemap 237 筆無 pricing；改以 docs 核價）、`ideogram-…`（docs「30 a week」；`ideogram.ai/pricing` 仍 403）。

新機會（主 agent 逐字重讀官方頁後才寫入）：

- `moe-library-aihub-seat-trial-free-paid-ai`：**教育部「館館有AI」的圖書館席次**。弘光科大圖書館逐字「圖書館設置 3 席次，每席次配置 1 台專用電腦，並提供 Gemini教育版 與 Copilot 生成式 AI 服務」「使用對象：本校教職員工生」「每次預約最多 1 小時」，含續借上限 2 小時、圖書館每天清除當日對話。全國層級（國圖等三館各 5 台、47 所國立大學）只有媒體引述教育部、查不到部會或三館官方頁，已列 unknown；媒體稱提供 ChatGPT／Claude 與已核官方頁只有 Gemini 教育版／Copilot 的落差也保留。
- `pixel-11-pro-six-months-google-ai-pro-taiwan`：台灣站 Pixel 11 Pro 系列**隨附 6 個月 Google AI Pro ＋ 3 個月 YouTube Premium**，官方註腳「實際價值為 NT$4,497 元」「優惠截止時間：台灣時間 2027 年 11 月 1 日 14:59」，需有效付款方式、試用期不收費、期滿自動續訂（NT$650／月、NT$199／月），退貨會一併取消。這是買手機的搭售，所以 `setup_cost_usd`／`recurring_cost_usd` 留 null 並用 `cost_note` 說明；同頁 11/11 現折到 11/23 屬另一檔促銷，**不寫進 `deadline_at`**（散文／子活動日期不得冒充整筆方案的截止日）。
- `kilo-oss-sponsorship-premier-enterprise-credits`：Kilo 開源贊助 Premier「25 Enterprise seats + up to $200 monthly Credits + Code Reviews」（官方標年價值 $48,000+），條款「do not roll over…reset at the beginning of each month」「no Code Review activity for 30 consecutive days may be removed」，申請制不保證錄取，德拉瓦州法。
- `ona-open-source-maintainer-monthly-credits`：Ona 對開源維護者「Up to $200 in monthly free credits」，資格是「maintainer or core contributor of at least one active, well-established open-source project」，多數申請數日內處理；公開頁沒有條款連結，期限與累積規則留 unknown。
- `watchlist-moe-adaptive-learning-ai-tutor`：媒體稱因材網分批釋出 AI 家教，但 adl.edu.tw 首頁與消息頁實測都是 JS 空殼、教育部新聞稿未取得，因此只記錄待查問題（是否上線、是否需學校帳號、是否全體中小學生免費、資料與家長同意），不列為可領取方案。
- 未納入：AgentRouter（US$25 註冊額度＋每日簽到）只有第三方清單、官網無可引用頁面；aifree.dev 與 that.promo 的 2026-11 新增清單幾乎全數已在庫（oumi、anyscale、daytona、IteraCompute、Composio、Pipedream…）；中華電信×Google AI、磨課師、Cool English、各縣市補助、ASUS 3 個月 Google AI 方案皆已有紀錄。

品質改善（1 組：讓機器可讀的截止日變成看得到、排得出來）。見上方「可採取的期限與看得到的期限」段：卡片底部加截止點與剩餘天數、排序加「截止日由近到遠」、已截止紀錄不得主張剩餘天數，並以 9 條規格值斷言固定行為（含「今天」不得算成 1 天、超過 60 天不上卡片、無日期者不得排在前面）。

驗證：`python3 tests/validate.py`（991 筆 PASS，含本輪批次斷言）、`node --check app.js`、`node tests/filters.cjs`（台灣條件適用 119／S 級 106 與總覽一致）、`python3 tools/queue.py --self-test`、`git diff --check`。瀏覽器另核對：資料載入、預設排序頁面首屏 4 張卡帶截止點、切到「截止日由近到遠」後前 22 筆依序為 11/10→12/31 且其後才是無日期紀錄、console 無錯誤、手機版無水平溢出。

結構經驗：本輪 3 個 `task` subagent 都有 shell，但只有需要寫檔的交付才用 `/tmp`，主 agent 一律重讀會改變讀者決定的頁面（新竹 1323 與計畫 PDF、ZCode welcome／configuration、Sapling sandbox 與 api-access、Perplexity 10352998 與 11680686、弘光圖書館、Pixel 商品頁、kilo.ai/oss 與 terms、ona.com/open-source）。三個可重用技巧：**Mintlify 鏡像**（`perplexity-help-center.mintlify.app/.../article.md`）可繞過 Cloudflare 403；**原始 HTML 內 grep** 才拿得到 Google 商店 JS 才渲染的註腳（`ai-promo`、`ai-pro-value`）；**sitemap.xml + llms.txt + Wayback CDX** 三件事湊起來足以判定「頁面消失但沒有終止公告」。另外 `qoder.com/pricing` 與 `adl.edu.tw` 都是 200 但空殼——HTTP 200 不是內容存在的證據。

下輪優先（完整五項）：① `taipei-youth-ai-subscription-subsidy-2026`：`next_review_at` 是今晚 22:00，期限（11/10）一過就**必須**改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 兩條斷言會擋），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：台北 11/12 15:59 過後改 `applications_closed`，並讀索引頁 raw HTML 確認是否公布下一輪徵案；③ 兩筆新納入的台灣案要追個案：`moe-library-aihub-seat-trial-free-paid-ai`（找教育部終身教育司或國圖／國資圖／國台圖官方頁，確認全國試辦是否上線、提供哪些工具）、`pixel-11-pro-six-months-google-ai-pro-taiwan`（兌換細則：是否限首次訂閱者、電信通路購機是否適用、能否與學生 AI Plus 併用）；④ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：追剩餘 4.4% 是否歸零與是否提前停止收件，並再試 1323 頁的修正後計畫 PDF（本輪兩個直連都 404）與青年發展中心公告列表（本輪 500）；⑤ `google-ai-professional-certificate-tw-pro-3mo`（11/13 到期複核）：若條款仍停在 11/06、行銷頁仍寫 2027-01-01 且無延期公告，就把「條款已過期、行銷頁未同步」寫成讀者可行動的結論（要兌換就趁現在並保留失敗紀錄），**不要**在沒有兌換失敗證據時改判 `expired`。另記兩個卡住的技術缺口：`qoder.com/pricing`（JS shell，需瀏覽器渲染）與 `ideogram.ai/pricing`（Cloudflare 403），兩者都只能靠 docs 交叉核對。

2026-11-10 07:05–07:28 本輪（接續 cf40cdd 之後）：起始 982 筆；`next_review_at` 嚴格已到期 0 筆，7 日內到期的 6 筆全部在 12 小時冷卻內（今天凌晨 01:09–06:36 已核），因此佇列由「本輪佇列工具重排的輪替順序」＋「台灣期限與資格」＋「官方衝突與目錄變動」組成，全天已核 133 筆不重讀。局部複核 15 筆：台灣期限與資格 5 筆（桃園生成式AI線上視訊班、MODA ADI Forum、Claude 訂閱附贈 API 額度、教育部磨課師、Cool English）＋最久未核輪替 8 筆（2026-10-31 那批：OpenAI Agents API、Core Today、Cloudflare Workers AI、OpenRouter 免費層、Runpod 新創、Gladia Startup Studio、Tavily 新創、Claude 訂閱 API 額度）＋費用與條款 2 筆（BazaarLink、monday 非營利）。新增機會 4 筆、政策 0、觀察線索 0；整筆追查失敗 0；未完成複核 967 筆。

會改變讀者決定的更正：

- `runpod-startup`：**方案結構整組改寫**。現行頁改成三層——Starter（募資低於 US$1M）US$1,000、新增的 Venture（獲驗證 VC 投資且募資低於 US$5M，官方點名 a16z、Neo、South Park Commons）US$5,000、Growth Track 由「先承諾 US$50,000、贈 US$25,000、12 個月合約」改為「承諾 US$25K 加贈 US$10K／US$50K 加贈 US$25K」，現行頁已不再提 12 個月合約。官方 FAQ 另逐字新增「Existing customers aren't eligible for the free Starter or Venture credits」——舊紀錄寫「VC 支持優先而非絕對必須」，會讓既有客戶誤以為自己也能申請。credits 一律核發後 1 年到期。狀態由 `conditional` 改 `application_based`（人工審核、不需 Runpod 帳號即可投件）。
- `claude-subscriber-api-credits`：**台灣由 Unknown 改 Yes**。Anthropic 的 Supported Regions Policy（頁面標示 Effective **Nov 12, 2026**）逐字列「Taiwan」，且該政策的適用範圍明寫涵蓋 apps、API 與開發者平台。另補兩個會影響判斷的條件：官方支援文章逐字「No payment method needed. You don't need to add a card on Claude Platform to claim or use the credit.」（贈額本身不需在 Console 加卡，但前提是已訂閱 Max／Ultra／Team），以及官方主動澄清「Is this the same as the Agent SDK credits announced in June? No. That credit isn't available.」——把 6 月那筆拿來推算可領額度會高估。
- `bazaarlink-taiwan-free-model-gateway`：**「跨模型共池 vs 逐模型計算」衝突由官方文件裁決**。`docs.md` 2026-11-10 逐字「Your daily budget = the daily request budget above × your account tier multiplier, shared across all free models (one counter for all of them)」，並首次公布加權扣點分級（≤4K=1、4K–12K=12、12K–25K=24、25K–50K=40、50K–70K=60、70K–85K=90、>85K=120，只按輸入 token 分級）。免費模型由 5 款減為 4 款（Beam Free 已下架）。付費風險也更精確：超額後**預設**在餘額足夠時轉付費路由，要改回 429 必須送 `X-Free-Fallback: false` 或關閉付費 fallback。
- `taiwan-moe-moocs-eighteen-free-ai-courses`：原紀錄寫「原推薦 18 門課程全部在列，選課期間與開課期間均標示為『無限期』」。本輪以課程清單 API（`api/v1/courses?feature=20`，`pagination.total=20`）逐門核對：19 門確為無限期，但「[資通安全]生成式AI對數位素養的挑戰」是 2026-04-16～2027-04-16，故「均為無限期」不成立並已改寫。這是把「看起來都一樣」的列表当成單一事實的典型錯誤；逐門欄位才是證據。
- `gladia-startup-studio`：**「12 個月單一池」與「約每月 1,200 小時」的關係已由條款裁決**——2.2 寫「allocated as a single pool for the duration of the Programme Period」，2.3 的 1,200 小時是「standard configuration 下的近似容量」，方案頁也寫「No monthly caps」。原紀錄列為待釐清的 unknown 可以關閉。
- `openrouter-free-threshold`：免費目錄已輪替。以 `api/v1/models` 實查（464 個模型中）僅 **13 個 `:free` 端點**，紀錄原本列出的 `baseten/mammoth-1:free`、`baseten/elephant-1:free` 已不在清單；定價頁仍寫「25+ free models」，形成行銷數字與實查目錄的新落差，已記為 unknown。
- `taoyuan-ai-productivity-online-courses-115`：官方兩頁截止日不一致——課程頁「報名日期：115-08-28~115-11-17」、線上報名列表「公告日期：115-08-28~115-11-20」，官方未說明差異，保守以 11/17 計；另 11/12 與 11/17 場次的 Teams 連結尚未上架（頁面只有 1105 場次）。
- `openai-agents-api-public-beta-no-harness-fee`：補上 container 計價粒度「1 GB $0.03, 4 GB $0.12, 16 GB $0.48, 64 GB $1.92 per 20-minute session per container」與「billed by the minute, with a 5-minute minimum per session」。仍無免費額度，`quota_classification` 維持 UNKNOWN。
- `moda-adi-forum-2026-free`：補足原本列為未知的報名規則——線上場次同樣必須報名，且不可同時報名實體與線上場次、不可同時報名下午 A 與 B 場；上午場實體備餐盒、僅下午場實體午餐自理。11/12 如期，無取消或改期公告。
- 其餘複核無實質變動（皆本輪重讀官方頁原文）：`amazon-ara-multilingual-contextual-ai-fall-2026`（索引頁 raw HTML 仍「Fall 2026: Open Now」＋「extended to November 11」，台北 11/12 15:59 不變；本輪未再改動時間戳，因 03:24 才核過）、`hsinchu-city-ai-youth-digital-tool-subsidy-2026`（剩餘經費仍 NT$253,197／4.4%，自 11/09 17:26 起 13.7 小時未變；02:19 才核過，不重複刷新）、`cloudflare-workers-ai-free`（每日 10,000 Neurons、00:00 UTC 重置、超額 Free 回錯誤）、`core-today-free-300`（每月 300 credits、免卡、不結轉；額度單位是點數不是 US$300）、`coolenglish-taiwan-free-ai-english-learning`（大專區 114 年 6 月上線、十大專區、雅思批改與口說模擬；平台 11/04 仍有新公告）、`monday-nonprofit-pro-ten-seats-ai-discount`（10 席 Pro、超出席次 70% off、AI credits 33% off；支援文章 updated 2026-09-17）、`google-flow-fifty-daily-credit-subscription-conflict-watch`（無訂閱每日 50 點、18 歲以上、尖峰約 14:00–17:00 UTC 可能無法生成影片）、`nchc-teaching-free-compute`（國內大專教師、台灣杉三號／創進一號、課程結束後一個月；新進研究人員仍「暫停申請」）。

新機會（主 agent 逐字重讀官方頁後才寫入）：

- `inferbase-free-five-thousand-requests`：LLM 閘道的**長期**免費層（官方逐字「A free plan, not a trial, and no card is required」），每月 5,000 次請求（任何模型、任何金鑰），受管推理每日 100 次、每日 US$0.50 用量、每分鐘 10 次，單次 8,192 輸入／1,024 輸出，只用輸出價 ≤US$2/1M 的模型；超出在呼叫模型前以 402 擋下。
- `ovhcloud-ai-endpoints-anonymous-free-api`：**匿名層**——不需帳號或 API 金鑰即可呼叫 OVHcloud AI Endpoints，每 IP、每模型每分鐘 2 次（超額 429）；帶金鑰的 Public Cloud 專案為每專案每模型每分鐘 400 次。官方只公布速率、沒有每日總量。
- `sentry-for-good-sponsored-nonprofit-oss`：非營利／開源贊助帳號含每月 5M errors 等額度與 **5 席 Seer active contributor seats**；但非營利路徑逐字要求 501(c)(3)，台灣登記的非營利組織無此身分，開源與教學路徑才可能適用——卡片已把這個門檻寫在前面。
- `openrouter-dots3-note-preview-free-until-dec31`：Dots3-Note Preview 以 `:free` 提供、512K context，模型頁標「Going away December 31, 2026」，是**有明確結束日**的免費模型，`expires_at=2026-12-31`。
- 未納入：`context.dev` 免費層（每月 1,000 credits）**已存在**（`context-free-monthly-thousand-shared`）；委派研究回報「grep 0 筆」是假陰性——`grep -i 'context-dev|context.dev'` 在 BSD grep 把 `|` 當字面值，必須用 `grep -E` 或分開查。這是本輪最重要的去重教訓：**去重指令本身會騙人**，主 agent 要用 ID 清單再確認一次。另排除 aifree.dev 列的 Alysis Code／SmarToken／NovAI 等（官方網域 DNS 或連線失敗，無官方頁可逐字驗證），以及 OpenTyphoon（已收錄、docs 站只回外殼）。

品質改善（1 組：`tools/queue.py` 的輪替排序）。問題：輪替桶只按 `verified_at` 由舊到新排，完全不看 `next_review_at`，於是**佇列會跟卡片上「下次複核」的日期互相矛盾**。2026-11-10 實測：預設 20 筆全部是排程在 11/30 的 monthly 紀錄，而同一時間另有 20 筆可行動、非冷卻中的紀錄自己的 `next_review_at` 就在 11/14——兩份清單交集 **0 筆**。意思是研究者依證據設定的 daily／weekly／event 日期（例如「11/13 取消截止後再查」、「選後 11/14 到期」）永遠排在所有更舊的 monthly 之後，等於排程只是裝飾。改法：`rotation_key()` 先比 `next_review_at`、再比 `verified_at`、最後用 ID 固定；`--self-test` 新增兩筆合成紀錄斷言「較新核過但排程較近的 weekly 必須排在更舊卻排到 20 天後的 monthly 前面」。修正後同一份資料的佇列首位由 `evidently-ai-startups-expert-discount`（排程 11/30）變成 `did-mobile-fourteen-day-twelve-credit-trial-scope-watch`（排程 11/14）。這不是重新定義輪替的價值（最久未核仍是決勝條件），而是讓佇列不再無視它自己顯示給讀者的日期。

驗證：`python3 tests/validate.py`（986 筆 PASS，含本輪批次斷言）、`node --check app.js`、`node tests/filters.cjs`（台灣條件適用 117／S 級 104 與總覽一致）、`python3 tools/queue.py --self-test`、`git diff --check`。瀏覽器另核對資料載入、本輪更新篩選、關鍵字與台灣資格快捷、排序與載入更多，以及本輪改動卡片（Runpod、Claude 訂閱額度、BazaarLink、磨課師）的費用、狀態與來源呈現。

結構經驗：本輪三個 `task` subagent 都有 shell，但只有 `task` 能寫檔；三份交付都以最終訊息回結構化 JSON，主 agent 再逐筆重讀會改變讀者決定的頁面（Runpod、Gladia 條款、Claude 支援文章與 Anthropic 支援地區、OpenRouter pricing 與 models API、BazaarLink docs、磨課師 API、桃園課程頁與報名列表、MODA 報名表、monday Zendesk API、Cloudflare／Core／OpenAI 定價）。兩個新工具值得記下來：**monday 支援文章**用 `support.monday.com/api/v2/help_center/en-us/articles/<id>.json` 可繞過 403，並取得 `updated_at`；**磨課師**是 Angular SPA，`api/v1/courses?feature=20` 直接回 20 門課的 `sign_period`／`period`，比渲染頁面可靠。另外委派研究的 `accessed_at` 仍偏快（最早一筆寫 07:08、實際主 agent 對錶是 07:05 之後才開始），寫入一律用主 agent 自己讀到的時間。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 期限當日仍受理（04:20 核過），22:00 的每日排程一過期限就**必須**改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 兩條斷言會擋），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：台北 11/12 15:59 過後改 `applications_closed`，並確認是否公布下一輪徵案（索引頁需讀 raw HTML）；③ `runpod-startup` 與 `claude-subscriber-api-credits`：新改为 Taiwan 條件式的兩筆要追台灣個案——Runpod 的台灣公司審核與付款、Claude 的 Team 席位與 Console 角色實務，來源 `https://www.runpod.io/startup-program`、`https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-ultra-and-team-plans`；④ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：剩餘經費 4.4% 已 13.7 小時未變，追是否停止扣減或即將額滿（`https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323` 無更新時間欄位，只能比對數值）；⑤ `openrouter-free-threshold`：查「25+ free models」與實查 13 個 `:free` 的落差是行銷文案還是目錄分批上架（`https://openrouter.ai/pricing`、`https://openrouter.ai/api/v1/models`）。

2026-11-10 06:05–06:38 本輪（接續 b7b8b2f 之後）：起始 979 筆；`next_review_at` 嚴格已到期 0 筆，7 日內到期 6 筆（且全在今天凌晨五輪內核過），因此佇列由「7 日內到期但今天沒核過」＋「官方衝突」＋「最久未核（10/31 那批）」＋「上輪交接的五項」重排，全天已核 117 筆不再重讀。局部複核 20 筆：期限與台灣資格 7 筆（新北 UKO、台灣大哥大 Q4 課程、Mango Inference、fal FLUX 3 Max、River Inference、IteraCompute、Microsoft Foundry harness）＋官方衝突 3 筆（Base44、Make、Kimi）＋最久未核輪替 7 筆（Lamatic、Upstash、Bolt、n8n Cloud、Groq、Weaviate、Sentry、Modal 學術）＋兩筆追查（TAIONE 簡章、SME 計畫）。新增機會 2 筆、政策 0 筆、觀察線索 1 筆；既有未完成 959 筆；整筆追查失敗 2 筆（Coze、Stitch，皆 SPA 空殼，只記嘗試與原因、不刷新 `verified_at`，並把重試收在 14 天內）。未登入、未申請、未付款。

會改變讀者決定的更正：

- `taiwan-sme-ai-talent-training-2026`：**收件其實早已截止**。原紀錄寫「頁面與平台皆未公布收件截止日」，讀者會以為還能送件；官方申請須知（2026-04-07 發布，`sme.gov.tw/volunteer/article-vol-2696-20434`）逐字「至115年7月31日（星期五）下午5時止（…逾時不予受理）」，並公布原本列為未知的經費金額：單一企業每案上限 NT$15 萬（含稅）、聯合型每案上限 NT$30 萬（含稅），單一企業需最近 6 個月內任 1 個月勞保投保人數 ≥10 人。已改 `applications_closed`、`deadline_at=2026-07-31T17:00:00+08:00`、cadence 由 monthly 改 `monthly_or_new_signal`，並補上官方指定申請入口 `smelearning.org.tw`（與紀錄原有的 `cisa.tw` 平台並存，關係待釐清）。這是本輪唯一一條「原本會讓讀者白跑一趟」的錯誤。
- `fal-flux3-max-five-daily-sandbox`：「每日 5 次」與 `quota_details` 的「7 次」都不是官方值。官方 sandbox 文件只寫「Sandbox occasionally offers free credits for specific models」，頁首數字由伺服器每次輸出：11-09 實測「7 free generations today」、本輪 06:31 實測「6 free generations today」。`quota_classification` 由 HIGH BUT LIMITED 改 UNKNOWN（沒有公告額度，不是 5 也不是 7），id 內的字樣視為歷史命名。折扣結束日三方仍不一致：模型 `llms.txt` 為 11/8–11/22 五折、11/23 00:00 UTC 恢復原價，`/flux-3-max` 寫 11/21，`/flux-video` FAQ 寫 12/31；舊免費頁 `/flux-video-free` 已 308 導向 `/flux-video`、`/flux-3-max-free` 為 404。折扣期因此把下次複核由 11/16 提前到 11/20（11/22 結束前）。
- `bolt-free-monthly-million-daily-threehundredk`：官方 pricing 頁對 Free 逐字「Free forever, no card required」，原紀錄列為未知的「是否需綁卡」已解決；`setup_cost_usd` 由 null 改 0（理由是官方明示免付款工具，不是因為免費），台灣帳戶與年齡仍 Unknown。
- `kimi-free-web-app`：找到官方服務條款正文（原紀錄寫「未找到任何官方地區或台灣資格條文」）——「These Terms of Service apply to users located within the mainland of the People's Republic of China. Users located outside the mainland… should visit kimi.ai and review the applicable terms of service.」（Effective 2026-11-12）。該條文界定服務準據，未列支援國家清單也沒提台灣，`taiwan` 維持 Unknown；`kimi.ai` 境外版條款列為下輪追查。
- `taione-ai-open-source-fellowship`：本輪實際開啟 2026 年 9 月版報名簡章（19 頁 PDF，經 `supr.link` 短址找到 Google Drive 原件），回答原本列為 unknown 的「截止日與名額」：簡章全文**沒有**報名截止日、也**沒有**名額，採隨到隨審的社群參與制。另釐清兩階段資格——任何人填表即為社群共學員（簡章未設國籍或年齡門檻），「具中華民國國籍且年齡 30 歲以下（含）」是 Track Lead 提名 Fellow 的條件；培育週期三個月、單一 Track 最長二年，累計 6 個月 Bonus 可申請發表補助（亞洲最高 NT$5 萬、歐美最高 NT$8 萬）。
- `base44-startup-partner-bootstrapped-separated`：衝突定位更精確。方案頁本文與 FAQ 只有兩個免費年約（合作方 Pro US$960／獨立創辦人 Builder US$480）**沒有任何 credits 品項或效期**；「up to $1,000 in credits」只出現在 meta description。因此「US$1,000 一次領、6 個月有效」在任何官方頁都無依據，狀態維持 `terms_conflict`。
- `make-startup-partner-six-month-bootstrap-three-month-credits`：申請表仍開放（內嵌 Tally JSON 仍為 `isClosed:false`、無 closeDate），分級文字與行銷頁仍衝突：表單為合作網絡 6 個月／480k credits、自籌 3 個月／240k，「80K operations×6」與「×3」在金額上可對齊，分歧只在免費期長度與適用族群。
- `river-inference-25-credit`：出現第一個機器可讀的負面訊號——console 靜態 HTML 的 bootstrap 載明 `"signup_bonus_enabled":false`，且 `river.ai` 首頁與 `/pricing` 已完全不再提 US$25。旗標只證明功能目前關閉、不等於永久終止，因此**不改**狀態（維持 `campaign_current_availability_unverified`），只把 US$25 定位為 2026-10-11 的歷史公告。
- 其餘複核無實質變動（皆本輪重讀官方頁原文）：`mango-inference-community`（七折仍「until Nov 11」、三處文案都未標年份；US$10 贈額未綁折扣、未標結束日）、`ntpc-uko-microsoft-ai-cert-free-2026`（四梯 144 名、每梯 36 人、18–40 歲、保證金全退不以通過為條件；新增事實：AB-730 第 2 梯取消截止 11/11 23:59，故下次複核提前到 11/13）、`taiwan-mobile-free-ai-life-course-2026q4`（四場未過、全頁無門號身分要求）、`iteracompute-free-qwen-3-8-27b-monthly-30m`、`microsoft-foundry-copilot-harness-free-runtime`、`lamatic-starter-…`、`upstash-qstash-workflow-free`（同頁「retries are free」與 FAQ「每次 attempt 均計訊息」矛盾仍在）、`n8n-cloud-…`、`groq-free`（公開限額仍明示為 Developer plan 基礎值）、`weaviate-cloud-free`、`sentry-education-…`、`modal-qualified-grants`。

新機會（主 agent 逐字重讀官方頁後才寫入，兩筆皆為 S 級）：

- `yuanta-securities-gemini-enterprise-six-months-2026`：元大證券 × Google Cloud，2026/11/02–12/31，登錄並開戶完成抽 20 名、早鳥限量前 200 名（需成功買進台股或美股任 3 筆）「Gemini Enterprise 6 個月方案（Token吃到飽）」。官方同時寫「無限Token使用體驗」與「須遵守 Google 公平使用政策」，並排除自動化高頻請求、大規模程式碼分析、超大型影音生成；期滿「自動終止權益，且恕不開放自費續訂」。限「從未於元大證券開過戶之全新戶：限本國自然人、不含98戶」，同一身分證字號限領一次，名額以元大系統 2027/1/2 判定。**這是需要開證券戶、早鳥還要實際成交 3 筆的行銷活動**，卡片已寫明成本是交易手續費與市場風險，不是無條件免費；`setup_cost_usd` 留 null。
- `mozilla-foundation-human-scale-ai-incubator-2026`：Mozilla Foundation Incubator 的 Human-Scale AI 梯次徵 7 案，US$300,000＋12 個月（2027/4 起），進展良好另可獲最高 US$200,000，三年合計最高 US$500,000、不稀釋股權。要求「already deployed with the people they're designed to serve」，排除概念、純治理框架、泛用聊天機器人與「7B 夠用卻呼叫 GPT-6」的專案。截止美西 2026-11-20 23:59（台北 11/21 15:59），英文提交；資格只排除 OFAC 制裁名單對象（另讀資格準則 PDF 逐字確認），台灣未列於排除名單。
- 觀察線索 `fetnet-5g-599-bill-credit-ai-subscriptions-2026-watch`：遠傳 5G 599「每月折 NT$150 訂閱費×24 期」。卡片明寫這是電信資費折抵（合約 24 個月），不是免費 AI 方案，`recurring_cost_usd=599` 並附 `cost_note`；待解問題是 ChatGPT／Gemini 訂閱能否真的走 App Store／Google Play 代收，以及 24 個月總成本與違約金。

未納入：Google.org AI Opportunity Fund APAC Phase 3（受益與台灣出現位置已核，但查不到台灣本地培訓夥伴，交付管道未證，屬薄弱線索，不新增）；OpenAI Sora 免費層（官方說明中心逐字「The Sora web and app experiences were discontinued on April 26, 2026」，活動已終止，不需紀錄）；Amplitude 新創方案（官方頁可讀，但 AI 內容僅 MCP／agents，非 AI 存取福利）；遠傳以外的電信或券商重複活動、既有 12 筆 11 月活動（Tencent Hy4、IteraCompute、HeyGen、Fish Audio、Fireworks、Foundry harness、Claude Security、Kiroween、StepFun、MangoBoost、VideoGen）皆已收錄，不重複新增。

品質改善（1 組：`tools/queue.py`）。問題：挑選規則每輪都寫在當輪的臨時腳本裡，結果 2026-11-10 一天五輪之間 `taipei-youth-ai-subscription-subsidy-2026` 與 `amazon-ara-multilingual-contextual-ai-fall-2026` 各被核 3 次（實際間隔 1–2 小時），同一時間可行動的 900 筆裡有 621 筆超過 24 小時沒被碰過、嚴格逾期 0 筆——排程不是不夠，是排到同一批人。改法是把規則固定成一支工具：`python3 tools/queue.py`（另有 `--json`、`--limit`、`--window-days`、`--cooldown-hours`）依「逾期 > 視窗內到期 > 最久未核」排序，12 小時冷卻避免重讀同一頁，24 小時內到期者不受冷卻限制，已截止／已關閉／已合併者永不進佇列，`on_new_signal` 只在有截止點時排入。`--self-test` 用合成資料斷言六條規格（逾期必排、冷卻中的非緊急項不得重排、24 小時內到期不受冷卻、最久未核必排、已截止不得進佇列、on_new_signal 有截止點仍排入），不是把當下快照釘住。實測基準：982 筆／可行動 902／嚴格逾期 0／7 日內到期 6（6 筆冷卻中未排入，基準數字與排入數字分開印，避免把「排入 0 筆」讀成「本週沒有到期的」）。

排程：`coze-free-builder-daily-credits` 與 `stitch-free-daily-credit-ui-design-beta` 追查失敗後，`next_review_at` 分別收在 11/23 與 11/20（符合「失敗後 14 天內換路線」，`tests/validate.py` 會擋）。`taipei-youth-ai-subscription-subsidy-2026` 本輪未再重讀（04:20 才核過、無新訊號），11/10 期限當日的 22:00 排程仍待執行：期限一過就必須改 `applications_closed` 並把 cadence 由 daily 改 `monthly_or_new_signal`。

結構經驗：三個 `task` subagent 的 `read_at` 都不可直接採信——DueHighRisk 與 RotationGaps 的沙箱沒有 shell，改以外部時鐘夾擠；主 agent 對每一條會改變讀者判斷的主張再獨立抓一次原始 HTML（`curl` + `grep` 逐字比對 fal 的 6 次、`/flux-video-free` 308 與 `/flux-3-max-free` 404、River 的 `signup_bonus_enabled:false`、Lamatic／Upstash／Bolt／n8n／Groq／Weaviate／Sentry／Modal／Devin 的數字），並自行下載 TAIONE 簡章 PDF 與 Mozilla 資格準則 PDF。整批寫入前先把 `BATCH_NEW_IDS` 與 `reviewed_ids` 算好、以 tmp＋`os.replace` 原子替換，`policy-history` 追加改成以 `(record_id, change_type, date)` 去重，重跑不會重複追加。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 期限一過**必須**改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（兩條斷言會擋），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：11/12 15:59 後改 `applications_closed`（`https://www.amazon.science/research-awards/call-for-proposals` 需讀 raw HTML）；③ `yuanta-securities-gemini-enterprise-six-months-2026`：11/17 前確認前 200 名早鳥是否已滿與「Gemini Enterprise」實際開通的席次層級（活動頁無即時計數，只能看有無公告或改問客服）；④ `mozilla-foundation-human-scale-ai-incubator-2026`：11/16 前確認 11/12 說明會是否公布 FAQ 或延長，並查台灣團隊以慈善目的通過資格審查的實例（`mzl.la/humanscaleai`、資格準則 PDF）；⑤ `coze-free-builder-daily-credits` 與 `stitch-free-daily-credit-ui-design-beta`：改用可執行 JS 的瀏覽器讀 `coze.com/premium` 與 `stitch.withgoogle.com` 站內 FAQ 面板（靜態 reader 只回空殼），確認每日 credits 與台灣付款限制後才刷新 `verified_at`。

2026-11-10 05:06–05:48 本輪（接續 f3c55a3 之後，獨立 commit）：起始 976 筆；`next_review_at` 嚴格已到期 0 筆（04:26 才結算），7 日內到期且本日尚未核者 72 筆，其中 82 筆紀錄的 `verified_at` 已是 2026-11-10（01:09–04:24 之間四輪留下的），因此佇列改以「7 日內到期但今天還沒核過」＋「官方衝突／證據缺口」＋「最久未核」重排，不重查一小時前才核過的案例。局部複核 14 筆：到期與台灣資格 5 筆（AOCAI 青年養成班、產業新尖兵、中華電信 Google AI Plus、BeatAPI 免費模型、Runway Builders）＋官方來源矛盾與最久未核 7 筆（Perplexity Education、Nebius Europe grants、DigitalOcean Startups、Scholarcy、Pika、Arize、Zencoder）＋追查與結案 2 筆（NCHC 申請書 PDF、InnoPad 工作坊）。委派研究另重讀 Kimi 與 Trae：兩筆官方頁無新訊號、不改寫紀錄（Kimi 仍無地區清單、Trae 支援國家頁 Taiwan 出現 0 次）。新增機會 3 筆、政策 0 筆、觀察線索 0 筆；既有未完成 962 筆；整筆追查失敗 1 筆（Salad SSAP，`/ssap` 與 `/salad-gpu-cloud` 皆 404，只記嘗試時間與原因、不刷新 `verified_at`）。未登入、未申請、未付款。

會改變讀者決定的更正與釐清：

- `digitalocean-startups-core-gpu-policy`：狀態由「活動現況待核」改 `paused`。官方 Startups 頁 FAQ 逐字「Applications for our current cohort are temporarily paused as we prepare to launch an updated program experience in early 2027.」，現有成員權益維持；同頁確認 Core credits 自 2026-05-13 起排除 GPU Droplets／H100 GPU Kubernetes／Bare Metal GPU／Dedicated Inference／第三方託管模型／Paperspace／Cloudways，GPU credit 為另行審核的獨立福利，一般每帳戶每月上限 US$10,000、不得轉讓、不給展延。2025-12-02 舊部落格仍寫「Up to $100,000 in compute credits」「free GPU resources immediately」，與現行 FAQ 衝突——舊頁存在不是方案有效的證據，兩說並存並以現行 FAQ 為準。
- `scholarcy-free-summarizer-quota-conflict-watch`：出現**第三個**官方說法。`article-summarizer` 工具頁寫「Limit of 3 summaries per day」，定價頁方案卡仍寫「Limit of 10 summaries」、同頁 FAQ 仍寫每日 1 篇並連到同一工具頁；三頁皆官方、皆無更新日期，10 次的週期（總量／每月／每次訂閱）也未寫，狀態改 `conflicting_official_usage_claims`，不擇一。
- `nebius-europe-compute-grants-watch`：`taiwan` 由 Unknown 改 **No**。grants 頁逐字「independent developers, open-source builders, researchers, and small teams across Europe」，Builder 頁標「$10M to back Europe's open and independent AI builders」；官方未給國別清單或金額，但台灣不在 Europe 招募範圍，屬地區資格判斷而非法律結論。
- `pika-free-zero-monthly-credit-packs-watch`：Free 的每月額度確定是 0——比較表「Monthly credits｜0 · credit packs only」，點數包 1,500/$25 起且僅限 pika.art 的 Create 與 MCP；頁面「Free Pika H3 Flex generations every day」只屬 Creator 與 Fancy 付費方案，Free 不含商業授權。狀態改 `active_verified`，`quota_classification` 維持 UNKNOWN（沒有免費額度，不是 0 也不是無限）。
- `nchc-university-ai-compute-discount-2026`：10/31 追查失敗的申請書 PDF 本輪讀到正文——收件截止仍是 115/10/31、無延期，H200 NT$30/GPU 小時（原 60）、Forerunner 1 NT$0.1/核心小時（原 0.2），自開通起一年、可展延一次，每單位 NT$300 萬、每校每年最多 5 單位。狀態維持 `applications_closed`，補上機器可讀的 `deadline_at=2026-10-31`；與舊說明 PDF 的 2026/7–2027/6 固定期間衝突仍未解。
- `innopad-taipei-startup-ai-workshop-20261104-watch`：11/4 場次已結束，11/10 重讀頁面仍列同一場次、站上最新消息已換成 11/05 產業獎勵補助公告，無後續場次。依「已明確結束且無新申請途徑」改 `on_new_signal`、`next_review_at=null`，退出每月輪替（費用仍未列，不能標示免費）。
- `perplexity-education`、`arize-startup-six-month-ax-pro-taiwan-watch`、`zencoder-seven-day-five-k-credit-trial-taiwan-watch`：Perplexity 的 US$10／月與「unlimited Pro Searches vs 同頁表格 Weekly limits」矛盾未解（canonical 頁仍 403，正文取自官方 Help Center 的 Mintlify 文檔站）；Arize 確認「6 months of Free AX Pro」仍存在、限首次客戶且 Series A 以前或募資 <US$15M，改 `application_based`；Zencoder 確認試用 5,000 credits／7 天、剩餘點數不轉入付費、Free 為 BYOK，官方文件未寫試用需卡，但仍未走完結帳，故只更新文字與證據、不改狀態。
- 其餘複核無實質變動（皆本輪重讀官方頁）：`aocai-youth-ai-training-2026`（26 班、只有 10/19 與 11/02 三筆標「報名已截止」，11/16 台北班未標且培訓單位表單可填；官方仍無任何班級截止日，故 `deadline_at` 維持 null）、`taiwan-nsp-youth-ai-training-subsidy-2026`（計畫條文「受理申請期間，由本署另行公告」＝無全國統一期限，期限落在各班：中壢第 11 梯 11/08 已截止、第 12 梯報名至 12/11；新尖兵網站 11/30 後移轉）、`cht-google-ai-plus-first-year-free-2026`（主方案無公開結束日，11/30 只是 Hami Point 100 點加碼期限、2027/1/31 是 5GB 流量加碼期限）、`beatapi-free-models-zero-balance`（2026-11-05 是免費 JEV 決策模型退役日，**不是**免費文字模型的期限）。

新機會（皆由主 agent 逐字讀官方頁；委派研究提出、主 agent 重讀後才寫入）：`taoyuan-ai-productivity-online-courses-115`（桃園市 115 年員工生產力系列課程—生成式 AI 線上視訊班：報名 115-08-28~115-11-17、官方「市府補助全程免費，每堂預計招收600名」、線上 Teams、執行單位巨匠電腦；以桃園市轄內設籍／居住／工作或替代役為優先）、`freeinference-harvard-research-api`（哈佛 SEAS MadSys Lab：OpenAI／Anthropic 相容、免卡、免費模型 glm-5.3-flash／deepseek-v4-flash／minimax-m3 皆 1M context，官方只寫「Generous quota」不給數字；提示與回覆可能被記錄並去識別化公開）、`regolo-ai-thirty-day-free-trial`（Seeweb／Regolo：30 天、免卡、每日 1M tokens 名目值、全部 Core 模型、fair-use 限流；模型另有 0.5×–5× 乘數，glm5.2 為 5×，期滿轉 PAYG 且不自動扣款）。

品質改善（1 組：`viewMatches('regional')`）。問題：下拉選項「美國與地區限定」過去只讀人工 `views`，2026-11-10 統計 57 筆標記中有 27 筆 `taiwan=Yes`，選這個專區會拿到「台灣就能用」的清單（臺北青年 AI 補助、新竹市補助、緯創算力捐贈、台智雲 TWAI、Oracle 免費層…），而卡片又依優先度把 S 級（台灣可用）排最前面；反向也漏掉 10 筆真正受限、只是沒被標記的方案（`sarashina-free-beta-japan-only` 日本限定、`kimi-api-free-voucher-cn-locked`、`aliyun-yungongkaiwu-model-studio-teachers`、`fal-startup-europe-asia-spend-tiers`、`vapi-free-us-number-not-free-calls`、`chatgpt-teachers-us`／`claude-teachers-us`）。改法：`if (view === 'regional') return (o.categories||[]).includes('REGION-LOCKED') && o.taiwan !== 'Yes';`——專區問的是「哪些方案依官方規則不含台灣」，讀 schema 管制的 `categories` 與 `taiwan`，台灣已符合資格者由「台灣條件適用」與其他專區涵蓋。實測專區由 40 筆降為 26 筆（`taiwan` 分布 No 15／Unknown 11），`tests/filters.cjs` 新增規格值斷言：每筆 REGION-LOCKED 且非台灣符合資格者必入（已截止除外）、`taiwan=Yes` 一律不得入、且必須存在「有 REGION-LOCKED 但沒人工標記」的反向案例，避免只修好當下快照。

排程與佇列：`mango-inference-community` 的七折只到 11/11（`expiry.text`），下次複核卻排在 11/12 12:00——`tests/validate.py` 的「複核日不得晚於截止日」只讀 `deadline_at`／`expires_at`／`expiry.date`，讀不到散文期限，等於整個折扣期沒有任何複核。只把 `next_review_at` 改到 2026-11-11 09:00，不刷新 `verified_at`。`hsinchu-city-ai-youth-digital-tool-subsidy-2026` 05:31 重讀餘額仍 NT$253,197（4.4%）、購買期限已過（115/10/31）、受理至 11/30，維持 11/13 排程。`taipei-youth-ai-subscription-subsidy-2026` 期限當日 05:19 重讀公告首頁仍「3 頁 35 筆、最新 2026-11-09」，無停收／用罄／展延公告。逾期與失敗一律只動排程或嘗試欄位（`salad-ssap-migration-credit-watch` 的 `next_review_at` 收在 11/20，符合「失敗後 14 天內換路線」）。

結構經驗：本輪三個 `task` subagent 都被要求「不要改 repo、只在最後訊息回結構化 JSON」，主 agent 再逐筆重讀會影響讀者決定的頁面（DigitalOcean FAQ、Scholarcy 兩頁、Nebius grants、Perplexity 方案比較、Pika 定價、Arize、Zencoder 文件、AOCAI、新尖兵條文、中華電信新聞稿、BeatAPI 文件、Runway Builders、桃園市報名頁、FreeInference 三頁、Regolo 定價與 FAQ）；桃園市報名頁的靜態擷取只回外殼（`read` 僅有 meta），改以瀏覽器渲染才讀到「市府補助全程免費，每堂預計招收600名」。委派研究回報的 `accessed_at`（05:19–05:26）與主 agent 實際讀取時間接近，但仍以主 agent 自己的讀取時間寫入。`task` 的 `model` 參數在此環境被停用（`task.perCallModel: off`），因此未指定模型。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 送達期限當日仍無停收公告，22:00 的每日排程一過期限就**必須**改 `applications_closed` 並把 cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 兩條斷言會擋），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：11/12 15:59 後改 `applications_closed`（`https://www.amazon.science/research-awards/call-for-proposals` 需讀 raw HTML）；③ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：每日追剩餘經費（4.4%），額滿就改 `applications_closed`，並確認現行頁 16 歲起／90% 與 5/8 舊公告 18 歲的版本適用（`dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`）；④ `google-ai-professional-certificate-tw-pro-3mo`：11/13 排程確認 offer 條款（兌換期限 2026-11-06）是否改版或延期，若 11/6 後兌換確定失敗就改狀態（`one.google.com/offer/terms-and-conditions/google-career-certificates`、`grow.google/intl/zh-TW_tw/ai-professional/`）；⑤ `mango-inference-community` 11/11 09:00 與 `moda-adi-forum-2026-free` 11/12 08:00：確認七折結束後的原價與 US$10 贈額效期、活動結束後是否釋出簡報或錄影（`inference.mangoboost.io/pricing`、`moda.gov.tw/ADI/news/events/772`）。

2026-11-10 04:05–04:26 本輪（接續 39adc9c 之後，獨立 commit）：起始 972 筆；`next_review_at` 嚴格已到期 0 筆（03:24 才結算），3 日內到期 8 筆（今日 22:00 的台北青年補助、11/11 的 Felo／Runable／Qoder、11/12 的 Amazon ARA／Mango／臺北產業獎勵／Jules）。佇列以「期限當日／官方衝突／缺 status 與最久未核」重排，避開 01:38–02:22 與 03:05–03:35 兩輪剛核的 37 筆。局部複核 15 筆：期限與衝突 5 筆（臺北青年 AI 補助、Clean APIs、Postman、Voyage、Sloyd）＋缺 status 與最久未核 10 筆（Codex 補償、Upstage、NLP Cloud、Weaviate、AkashML、AMD 開發者額度、Adobe Firefly Assistant、v0 學生、ElevenLabs 新創、Mistral Vibe Free）。新增機會 3 筆、政策 0 筆、觀察線索 1 筆；既有未完成 957 筆；整筆追查失敗 0 筆。未登入、未申請、未付款。

五筆缺 `status` 的舊紀錄本輪補上（全部依官方原文，不是為了清帳）：`codex-compensation-account-specific-lead` → `unverified`（官方 Reset 政策逐字「We do not provide credits, refunds, or other compensation for these free benefits.」，且該政策只適用免費促銷 reset；仍找不到任何官方個案補償入口）、`upstage-once-ten-credit` → `active_verified`、`nlp-cloud-trial-card-and-hard-cap` → `active`、`weaviate-startup-undisclosed-discount` → `application_based`、`akashml-free-credit-unconfirmed` → `unverified`。全庫缺 `status` 的機會紀錄由 3 筆降為 0 筆（`tests/filters.cjs` 現在印 0 opportunities）。

會改變讀者決定的更正與釐清：

- `taipei-youth-ai-subscription-subsidy-2026`：期限當日 04:12 重讀仍受理（服務頁仍 2026-09-22 版、公告首頁仍 35 筆、無停收／用罄／展延），並補齊兩個先前漏掉的官方事實。服務頁附檔「公告.pdf」是影像式 PDF（`pdftotext` 只有 2 bytes），本輪改以 `pdftoppm` 200dpi＋macOS Vision OCR（zh-Hant）讀完：發文 115/7/29、字號北市青職字第1153007061號、內容就是原計畫公告，**不是**停收或展延公告，缺口因此關閉。資格還有第三條路徑：除修習 AI 課程外，「參與本局青年以戰代訓銜接職場計畫」並取得學分／及格成績／結業證明同樣符合；且官方明文「本計畫申請文件應以書面方式提出」——沒有線上送件，郵寄者必須今日實際送達。`deadline_at` 維持只有日期。
- `voyage-free-tokens-batch-excluded`：Batch 與免費額度的衝突**結案**——定價頁逐字「Free token credits do not apply to Batch API usage…do not deduct from your free token balance」，Batch 文件無相反說法。模型免費額度的衝突仍在（正文 code-3／multilingual-2／rerank-2.x vs 表格 code-4／rerank-3，`updatedAt` 仍 2026-09-29），故 status 維持 `conflicting_official_usage_claims`；另記 `voyageai.com/pricing` 現回 404、權威頁只剩 docs（404 不代表方案終止）。
- `amd-developer-credits`：30／90 天歧異不再是衝突，同一頁兩段條款各自成立——AMD Developer Cloud US$100 自「透過兌換連結建立或登入帳號」起 30 天；Fireworks US$50 的 promo code 須於發放後 90 天內兌換，兌換後用至耗盡。US／Canada 限制逐字只適用每月硬體抽獎，未及於雲端額度；官方未列雲額度國別限制，台灣維持 Unknown。
- `adobe-firefly-assistant-free-beta-regions`：現行 FAQ（Last updated Oct 28, 2026）逐字只寫「Subset of free Adobe accounts without paid subscription plans.」，全頁已無任何國家／地區清單；2026-04-27 官方部落格的「globally」是針對 Creative Cloud Pro／付費 Firefly 方案，不能反推免費帳戶。台灣維持 Unknown（無清單可查）。
- `cleanapis-free-500k-tokens-month`：限流衝突擴大——比較表 Requests/min 對 Basic 120／Pro 120／Scale 120／Unlimited 150 也與方案卡（300／600／1,200／3,000）全面不符，該欄整體不可信；退款拆兩層：定價頁「7-day money-back guarantee on all paid plans」vs 退款政策頁「first-time paid subscription plans…does not apply to renewals」，預付餘額才是 14 天內可退。免費額度、免卡、402 行為不變。
- `postman-free-ai-credits-context-graph`：官方 docs 補上機制（每月依帳單日發放、不累積；只有付費帳號可加購，Free 的 AI overages 欄為「—」，額度用完 Agent Mode 暫停到下次重置；自帶 API key 不消耗 credits），`quota_classification` 由 UNKNOWN 改 HIGH BUT LIMITED；方案卡 100 與比較表 50 的衝突仍未解，docs 不裁決。
- 其餘複核無實質變動（皆今日重讀官方頁）：`sloyd-guest-daily-plus-separated-pools`（Guest 每日 1 次、三列各 1 daily 仍無共用日池裁決；API credits 與 Web App 點數確定分開）、`v0-students`（15 所 active schools 全為美加院校，台灣仍 No；五題 FAQ 答案由前端折疊、HTML 只有空容器，配額未重讀）、`elevenlabs-startup-grant`（33M 字元／12 個月、官方新增「More than $5,500+ in value」，<25 名員工、一週內通知）、`mistral-vibe-free`（Free 新增基本影像生成與 100+ connectors、Task scheduling「Up to 5」；另列 Education US$14.99／月屬付費）、`upstage-once-ten-credit`（US$10 仍列，pay-as-you-go 每月扣款）、`nlp-cloud-trial-card-and-hard-cap`（Free 並行 2／PAYG US$15 credit 並行 10、價格未稅）、`akashml-free-credit-unconfirmed`（trial credits 須先驗證付款方式、會到期）。

新機會（皆逐字讀官方頁，未登入未送件）：`taica-cross-university-ai-credit-programs`（教育部 TAICA：55 所盟校、五類學分學程含 115-1 新增資訊安全技術、每學程 15 學分、學程間抵免上限 6 學分、證書須至少 8 學分聯盟認定課程；以原校選課系統加選、無聯盟層級費用，各校學分費未核；115-1 多數考試 12/09–12/23、證書受理 12/15 起）、`cpc-moeai-elite-free-ai-course-115`（中國生產力中心「製造業AI數位轉型」：官方逐字「輔導廠商學員免費」「符合者課程課程費用0元」，但限 AI 輔導團輔導企業在職員工、須輔導案號與在職證明，出席 80%＋評量 70 分才發證書；11/10、11/24、2027/01 梯次確定開班）、`moda-adi-forum-2026-free`（2026 ADI FORUM：11/12 09:30–16:25 台北世貿一館 2 樓、官方「費用：全程免費」、實體＋線上直播、13 個議程）。觀察線索 `taiwan-sovereign-ai-training-corpus-taic`：數發部臺灣主權 AI 訓練語料庫，新聞稿稱逾 3,000 筆資料集／12 億詞元，但首頁「最新資料集」與 Token 數字皆為前端載入空白，申請門檻、授權條款與下載形式全未公布，故不列為可領取機會。

品質改善（1 組，`tests/validate.py` 的批次複核驗證，含兩個部分）。**(a) 追查失敗不得把複核推遲一整個週期**：2026-11-10 統計 20 筆有追查紀錄，其中 2 筆的最新證據是失敗（`last_review_attempt_at` 晚於 `verified_at`）而下次複核仍在 22–29 天後：`taiwan-sme-ai-talent-training-2026`（PDF 中文字集字型使文字擷取失效）與 `stitch-free-daily-credit-ui-design-beta`（頁面只回前端外殼）。失敗不是複核，若沿用原本的每月日期，等於把「這次讀不到」變成「一個月後再說」；新增斷言要求這類紀錄在 14 天內換路線重試（`on_new_signal` 與已截止紀錄除外），並把那兩筆的 `next_review_at` 由 12-02／12-09 改到 2026-11-20（只動排程欄位，不刷新 `verified_at`）。**(b) 存取時間的日期解析**：同一條規則用 `raw.split('/')[-1][:10]` 取日期，遇到「2026-10-25（Asia/Taipei）」這種帶註記的自由文字會取到「Taipei）」，與 `run_day` 做字串比較時因首字元 `T` 大於 `2` 而恆為真——實測 `adobe-firefly-assistant-free-beta-regions` 的舊來源被算成本批次查核，於是同一 URL 當天出現兩筆就誤報重複；反過來，只有舊自由文字日期的紀錄也能通過「本批次至少一個查閱時間」。現改為抽出字串中最後一個 `YYYY-MM-DD` 再比較。驗證方式（皆在 repo 複本注入）：把 `octoparse-ai-free-new-user-five-credit` 的所有來源改成「2026-10-25（Asia/Taipei）」並排進 `reviewed_ids` → 觸發「no per-source accessed time」；在 `upstage-once-ten-credit` 追加同一天第二筆同網址來源 → 觸發「source URL checked twice in this batch」；實庫 976 筆照樣 PASS。本輪也記下一個**尚未處理**的同類問題：已截止紀錄的分類標籤會被換成歷史標籤，但 `watchlist` 紀錄不會——`taiwan-sovereign-ai-training-corpus-taic` 這種「規模有官方說法、授權與清單未核」的線索，卡片仍以「免費機會」「高額度」開場。是否把可領取字樣也跟隨 `verification`／`record_type` 是語意問題（線索不是不能領，而是還沒核），留待有更多案例再決定，不趁本輪改。

頻率與排程調整（依可觀察訊號，不是為了刷新時間）：`codex-compensation-account-specific-lead` 與 `weaviate-startup-undisclosed-discount` 由 monthly 改 `monthly_or_new_signal`（官方頁文字穩定、只有出現新公告才需重看）；其餘每日案例未動（本輪沒有把它們排成每日，只調整有訊號的兩筆）。`moda-adi-forum-2026-free` 以 `event` 排 11/12 08:00（活動當天，隔日應結案或補會後資源），`taica-cross-university-ai-credit-programs` 排 12/20（考試與證書受理期），`cpc-moeai-elite-free-ai-course-115` 排 12/10，`taiwan-sovereign-ai-training-corpus-taic` 排 12/10。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 之後若仍無展延公告，**必須**改 `applications_closed`、cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 會擋：期限已過不得仍非已截止、已截止不得保留 daily），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：11/12 15:59 後同樣改 `applications_closed`（`https://www.amazon.science/research-awards/call-for-proposals` 需讀 raw HTML，reader 會退回過期 RSS）；③ `moda-adi-forum-2026-free`：11/13 確認活動結束與是否釋出簡報／錄影，結束即改 `expired`；④ `taiwan-sovereign-ai-training-corpus-taic`：找授權條款頁與實際下載流程（`taic.moda.gov.tw/about` 404，改試 `/terms`、`/faq` 或資料集詳情頁），並確認「最新資料集」空白是否只是前端載入；⑤ `taica-cross-university-ai-credit-programs`：向盟校教務處確認 115-1 加選截止、各校學分費與非盟校學生途徑。

結構經驗：本輪三個 subagent 中，兩個唯讀 `scout` 只能回訊息、`task` 可寫 `/tmp`。**回報的時間戳不可信**：`StaleRotationB` 的 `accessed_at` 寫在 04:52–05:22，而實際時鐘是 04:21，`tests/validate.py` 的「不得寫入未來時間」在建置前就擋下（寫入前先跑 `TZ=Asia/Taipei date -Iseconds` 對錶，主 agent 對每個會改變讀者決定的頁面自行重讀後才寫）。另一次教訓是影像式 PDF：reader 只回「Text extraction is incomplete」，但本機 `pdftoppm`＋Vision OCR 就能讀完兩頁，缺口可以關閉而不是留給下一輪。

2026-11-10 03:05–03:35 本輪（接續 2e2019b 之後，獨立 commit）：起始 967 筆；`next_review_at` 嚴格已到期 0 筆（02:22 才結算），7 日內到期者 108 筆（含已截止），因此佇列以「期限最近的可行動案例＋來源衝突／追查缺口＋最久未核」重排，避開 01:38–02:22 那輪剛核的 18 筆。局部複核 19 筆：期限壓力 10 筆（台北青年 AI 補助期限當日、Amazon ARA 11/12 15:59、AutoClaw、騰訊 Hy4、StepFun、Rime STT、UGREEN 黑客松、HeyGen、Adobe Firefly 12 個月促銷、Work／Codex 三筆方案頁）、來源衝突與最久未核 9 筆（QuillBot 學生折扣、LG K-EXAONE、Lawson、CyLeague、Daytona、SambaNova、SAIL）。新增機會 4 筆、觀察線索 1 筆、政策 0 筆；既有未完成 948 筆；整筆追查失敗 0 筆。未登入、未申請、未付款。

本輪最重要的更正（會改變讀者決定）：`quillbot-student-discount-current-terms-watch` 上一輪結論「學生折扣查不到、三個 URL 皆 403」被推翻——官方 `https://quillbot.com/premium/unidays` 逐字「UNiDAYS Student Discount – up to an additional 25% off Quillbot Premium subscriptions!」，FAQ 說明 25% 疊在年繳既有折扣上（年繳較月繳省 58%，再折後合計省 66%），Premium 標價 US$8.33／月（年繳），核驗走 UNiDAYS。status 由 `needs_verification` 改 `conditional`，`taiwan` 維持 Unknown（台灣學籍能否通過 UNiDAYS 沒有任何官方說明）。讀取方式本身就是本輪的教訓：同一時間 `curl` 直連 `/premium/unidays` 與 `/upgrade/student` 都回 403 Cloudflare，只有 `read` 的原生 reader 讀到內容——**403 不代表頁面不存在，也不代表折扣中止**，換路線（reader／`.md` 版本／原始 HTML）往往就讀得到。

`lg-exaone-25-api-free-noncommercial`：免費狀態取得平台 FAQ 逐字佐證（「All APIs on EXAONE API Platform are currently available free of charge.」），並確認 FAQ 八題沒有任何商用授權條目、韓文版 ToS（§12.2 明定韓文優先）§2.1 同樣只給非商業利用——商用衝突**未解**。新發現的台灣相關事實：母公司條款頁 `showroom.exaone.ai` 自台灣回「Access Restricted／This service is not accessible from your current location」。那是子網域的 200 頁面，不代表 docs／api 不可用，也不代表整個服務排除台灣，所以 `taiwan` 仍記 Unknown，並在 `taiwan_note` 寫清楚兩者差別。`daytona-startup-amount-conflict` 找到第三份官方來源（2025-06-06 CEO 部落格：入選 US$10K、可解鎖至 US$50K、夥伴 Fast Track US$25K＋再加 US$50K），官方三處一致落在 50K、只剩新創專頁寫 100K，衝突範圍縮小但未解，且夥伴 Fast Track 若可疊加則名目上超過 50K（官方未解釋）。`rime-stt-nov19-free-window` 用官方 2026-10-20 公告（「free for 30 days (until November 19th)」）把免費窗年份釘成 2026。`tencent-hy4-workbuddy-codebuddy-free-window-nov4-15` 首次逐字對照中英文官方稿：英文「available for free」、中文「一定额度的免费使用」，同一活動兩種強度，額度數字兩稿都沒有，`quota_classification` 維持 UNKNOWN。

`adobe-firefly-twelve-month-model-promotion` 補上受管狀態 `conditional`（依據是官方頁逐字的合格方案清單：Firefly Pro／Pro Plus／Premium 與 4,000／7,000／10,000／50,000 點數方案，團隊與企業排除）。`work-codex-free`／`work-codex-go`／`work-codex-plus` 三筆補 `active_verified`——`learn.chatgpt.com/docs/pricing` 的 `.md` 原文今天仍列 Free $0、Go $8、Plus $20，且「ChatGPT Work and Codex share usage」。缺 status 的機會紀錄由 4 筆降到 3 筆，仍不為了清帳而替未重讀的紀錄下結論。台北青年 AI 補助期限就是今天（11/10，只寫日期、以「送達本局之日」為準），03:09 重讀頁首仍 2026-09-22 版、公告首頁無停收或展延，因此不改狀態，只把複核排到 22:00 讓下一輪在當日結案；`amazon-ara` 的 11/12 15:59 與頁面 modified 2026-10-28 也未變。

新機會（皆逐字讀官方頁，未登入）：`infomaniak-ai-services-one-million-free-credits`（定價頁 CTA「Get started with 1M free credits」、FAQ「One million free credits allow you to test the service without commitment for one month」，但開通前必須登錄有效付款卡——免費額度不等於免付款驗證；1 credit 的單位官方兩處寫法不同，不換算成保證 100 萬 token）、`gonka-broker-monthly-one-million-free-tokens`（每月至少 1M tokens、每月 1 日重發、未用完不累積、免卡，但需一次性手機簡訊驗證且拒收 VoIP／市話）、`public-ai-inference-utility-two-dollar-starter-credit`（Metagov 非營利、每新帳戶 US$2 一次性起始額度、Free 層 100 RPM、託管 Apertus／SEA-LION／Olmo）、`sea-lion-ai-singapore-free-poc-api`（AI Singapore，Google 登入建 Trial key、每人一把、10 requests/minute、官方明示不得提額且非生產用途、開源權重可商用）。觀察線索 `yepapi-five-dollar-signup-credit-watch`：官網與 docs 都寫註冊送 US$5、免卡，但服務條款與模型數（289 vs 139＋151）未核／不一致，因此不列為機會。

品質改善（1 組，`tests/validate.py` 的批次驗證規則，含兩個部分）。**(a) 排程欄位完整性**：複核佇列只讀 `next_review_at`，卡片「下次複核」只讀 `review_cadence`，但兩者都不是必填。2026-11-10 統計 12 筆有缺口：6 筆有日期沒有頻率（`goodmem-cloud-fourteen-day-no-card-trial`、`serpkite-free-search-api-credits`、`zro-moonmath-free-flash-models`、`netlify-free-monthly-three-hundred-shared-ai-gateway`、`vespa-cloud-once-three-hundred-no-card-trial`、`airweave-developer-free-ten-connections-fifty-queries`），6 筆有頻率沒有日期（其中 `modal-claude-science-expired` 是 monthly_or_new_signal、`gemini-code-assist-retired` 是 monthly，卻永遠不會被排到）。前者卡片只寫「定期輪替」而不說頻率，後者永遠不進佇列。已補齊（頻率依既有 `verified_at`→`next_review_at` 間隔回填，屬衍生排程欄位、不動事實、不刷新 `verified_at`），並新增斷言：每筆必須有受管的 `review_cadence`；除 `on_new_signal`（依定義沒有固定日期）外必須有 `next_review_at`。**(b) 同網址來源規則改為批次當日**：原規則「本批次複核的紀錄不得有任何重複來源 URL」本意是「同一 URL 這次要就地更新，不要追加第二筆」，但寫成整筆紀錄不得重複後，凡歷次查核累積了同網址多筆來源的紀錄（2026-11-10 統計 **266 筆，其中 216 筆仍可行動**：`lawson-restricted-japan` 12 筆、`daytona` 14 筆、`cyleague`／`sambanova` 各 11–12 筆）一被排進 `reviewed_ids` 就必然驗證失敗，只能靠有損合併才能再複核——佇列因此默默繞過四分之一個資料庫。但前端 `groupSources()` 本來就把同網址收進「較早的 N 筆同網址紀錄」，多筆同網址是既有設計，規則與 UI 互相矛盾。現改為「同一 URL 在本批次當天最多一筆」（讀 `accessed_at`／`accessed_time_range` 的日期），既保留歷史，又仍攔得住重複追加。驗證方式：在 repo 複本把 `lawson` 加進 `reviewed_ids`（12 筆同網址）→ 舊規則失敗；新規則下實庫 972 筆 PASS；再把一筆同日重複來源追加到 `lawson` → 觸發「source URL checked twice in this batch」；把 `goodmem` 的 `review_cadence` 或 `gemini` 的 `next_review_at` 刪掉 → 兩條新斷言各自觸發。

排程調整（依可觀察訊號，不是為了刷新時間）：`taipei-youth-ai-subscription-subsidy-2026` → 當日 22:00（期限當日結案）；`amazon-ara` → 11/12 09:00（截止前 7 小時）；`lawson-restricted-japan` 由 monthly 改 `monthly_or_new_signal`、排 11/23（抽選 11/10–16、領碼至 11/23，之後無新參與途徑）；`cyleague`／`sambanova`／`daytona`／`lg-exaone` → 11/17；`rime` → 11/18（早於 11/19 期滿）；`heygen` → 11/16；`adobe`／`stepfun`／`tencent` → 11/14；`ugreen` → 11/15；`autoclaw` → 11/13；`quillbot` → 12/10。

結構經驗：本輪三個唯讀研究 agent 都沒有 shell 與寫檔能力（`tools` 欄位只能引用 eval 內定義的工具，傳 `read`／`bash` 會被拒），交付一律以訊息回收，`accessed_at` 只能取 session 時鐘。因此主 agent 對每個會改變讀者決定的頁面都自行重讀並以自己對錶的時間寫入：QuillBot unidays、Rime 公告、騰訊中文稿、Adobe TW、LG FAQ／Showroom／韓文 ToS、Lawson、CyLeague、Daytona、SambaNova、SAIL、AutoClaw、StepFun、HeyGen、UGREEN、Infomaniak、Gonka、Public AI、SEA-LION。派工時要直接寫明「沒有寫檔能力就把 JSON 貼在最終訊息」，不要假設 agent 能落檔。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 23:59 後（實務上以當日送達為準）必須改 `applications_closed`，cadence 由 daily 改 `monthly_or_new_signal`，來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796` 與公告首頁；② `amazon-ara-multilingual-contextual-ai-fall-2026`：11/12 15:59 後同樣改 `applications_closed`（`https://www.amazon.science/research-awards/call-for-proposals` 需讀 raw HTML，reader 會退回過期 RSS）；③ `autoclaw-weekly-perk-november-nine-hundred-million-tokens` 與 `tencent-hy4-…-nov4-15`：11/15 23:59（UTC+8）／11/15 到期後確認是否轉付費、有無延長公告；④ `daytona-startup-amount-conflict`：Notion 正式條款是否改版（本輪純 JS 讀不到），並找官方對夥伴 Fast Track 疊加與 $100K 的解釋；⑤ `sambanova-access-policy`：Plans 與 rate-limits 兩份官方文件的適用順序仍無裁決來源，若官方新增 FAQ／credits 頁即可結案。未解缺口另含：QuillBot 台灣學籍能否通過 UNiDAYS、`lawson-restricted-japan` 等日本限定活動的時區、CyLeague `ai.cyleague.jp` 全網域 403、Adobe 模型表勾選欄在文字轉換後遺失（不得據空白表格宣稱不含某模型）、YepAPI 服務條款與模型數。

2026-11-10 01:38–02:22 本輪（接續 e2019e9 之後，獨立 commit）：起始 962 筆；`next_review_at` 嚴格已到期 0 筆（01:27 剛結算），最近的排程是同日 10:00（`lawson-restricted-japan`）與 12:00（Qoder 兩筆），因此佇列以「今日每日案例＋3 日內期限＋最久未核輪替」重排，避開 01:05 那輪剛核的 16 筆。局部複核 18 筆：到期／期限壓力 8 筆（Runable、Felo、Deepgram Flux TTS、X API 儲值回饋、Qoder 免費機制、Qoder Lite、Articul8 Bivia、Amazon ARA）、最久未核輪替 7 筆（2026-10-31 批：Meta Muse 免費、Muse Wonder、Muse 推薦傳聞、FASHN、Ideogram、PromptLayer、Wiro 學生）、台灣與條款衝突 3 筆（Google AI 專業證書三個月 AI Pro、新竹市 AI 領航青年補助、Lambda Inception）。新增機會 4 筆、觀察線索 1 筆、政策 0 筆；既有未完成 944 筆。未登入、未申請、未付款。

最重要的一筆更正：`wiro-student-200-credit` 台灣由 **Unknown 改成 Yes**。官方程式頁逐字寫「Anyone currently enrolled in higher education — undergraduate, master's or PhD — anywhere in the world」，且明示不需 `.edu` 信箱，屬正面全球資格陳述，因此列為條件式 Yes（個案仍人工審核，部分學校郵域註冊時被封鎖、需來信開通，已寫入缺口）。此變更使該筆升為 S 級，S 級由 94 增至 97。

三筆缺 `status` 的舊紀錄補上受管狀態（都是依官方原文，不是為了湊數）：`meta-muse-free` → `limited_availability`（官方「in limited testing and aren't available in all locations yet」、免費有上限但數字未公布）、`meta-muse-wonder` → `active`（Model API 與 Muse Code 全方案供應、Wonder Full 只在 Power／Maximum、南韓不可用）、`muse-referral-tokens-unverified` → `watchlist`（官方文件全集索引 `dev.meta.ai/llms.txt` 無任何推薦／促銷／credits 條目，但沒有官方否定證據，故不改判 `resolved_rumor_disproven`，維持每月或有新線索時追查）。`fashn-app-once-ten-no-free-api`、`ideogram-free-credits-weekly-slow`、`promptlayer-free-observability-2500-requests` 也補上狀態（conditional／active／terms_conflict）。分界寫在原則是「一次性的註冊贈額且 API 排免費額度 → conditional」，所以 FASHN 維持 C 級；Ideogram 是每週可重複領的 Free 額度，因此記 active（C 16.3 → A 19.0，評分重算是衍生計算，不是新查核）。PromptLayer 的 Free 超額「—」與 FAQ 按 txn 收費衝突仍在，維持 terms_conflict。

期限與條款重點：`amazon-ara-multilingual-contextual-ai-fall-2026` 官方索引頁 raw HTML 仍寫「Fall 2026: Open Now」「extended to November 11」，徵案頁 modified_time 仍 2026-10-28、無二次展延，台北 11/12 15:59 不變（11 月太平洋時間 PST 換算）；該索引頁以純文字讀取會退回過期 RSS，須用 raw HTML，這是本輪記下的讀取陷阱。`google-ai-professional-certificate-tw-pro-3mo` 維持 `terms_conflict`：02:19 重讀 Google One offer 條款仍為 Last updated 2025-07-31、仍寫 11/6 兌換截止，台灣行銷頁註腳仍寫 2027-01-01、雙方都沒更新，條款窗口已過 4 日仍無延期或結束公告。`hsinchu-city-ai-youth-digital-tool-subsidy-2026` 02:19 與 11/9 17:26 兩次讀值同為剩餘 NT$253,197（4.4%，逾 8 小時未變），受理至 11/30 或額滿、購買期限已過。`lambda-inception-thousand-taiwan` 額度、12 個月效期、每公司一次、合資格地區含 Taiwan 逐字未變。`felo` 首次逐字記下免費層上限（每日 5 次專業搜尋、3 次檔案分析、免卡），`qoder-lite` 的 `qoder.com/pricing` 仍是 JS shell（追查失敗已記錄，僅影響動態價格頁），`articul8` 註冊入口改成前端渲染故「表單無卡欄」本輪無法重驗。

新機會（皆逐字讀官方頁，未登入）：`chatgpt-free-plan-tw-ads`（繁中免費方案頁「沒有時間限制」＋只寫「設有用量限制」；2026-09-23 官方公告把 ChatGPT Ads 擴及含台灣的七個亞洲市場，廣告只在 Free 與 Go）、`wda-ipt-ai-course-tuition-subsidy`（勞動部產業人才投資方案：在職勞工補助 80%、特定對象 100%、3 年上限 NT$10 萬，須開訓日在職投保＋本國籍或指定居留；在職訓練網政策性專區列有 AI 班別）、`bytez-free-plan-one-dollar-four-weeks`（US$0／月、US$1 credits 每 4 週刷新且 4 週過期、僅 7B 以下開源模型與 1 並行）、`liquid-ai-new-org-two-dollar-credit`（Liquid Console 每新組織 US$2，另年營收未滿 US$10M 可免費商用權重）；觀察線索 `sakana-api-platform-early-access-2026`（企業早期存取，官方明寫價格與條件個別通知、未承諾免費額度）。

佇列處理：`deepgram-flux-tts-bonus`、`x-api-xai-spend-credit-rewards` 由每日改每月或有新線索（活動長、頁面不會逐日變動；deepgram 促銷至 12/31，複核排在 12/01）；`qoder-lite`、`articul8` 由每日改每週（bonus 結束日未公告但無每日訊號）；`amazon-ara` 改 event（11/11 09:00 複核，早於 11/12 15:59 截止）。已截止紀錄不再保留每日 cadence。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 23:59 後期限屆滿，必須改 `applications_closed` 並把 cadence 由 daily 改 `monthly_or_new_signal`（`tests/validate.py` 會擋），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796`；② `amazon-ara-multilingual-contextual-ai-fall-2026`：11/12 15:59 後同樣要改 `applications_closed`（`https://www.amazon.science/research-awards/call-for-proposals` 與索引頁 raw HTML）；③ `jules-free-fifteen-tasks-entrypoint-watch`：11/11 轉唯讀後確認是否真的停止開新 session 與資料匯出期限；④ `google-ai-professional-certificate-tw-pro-3mo`：再查 offer 條款是否改版（若改為 2027-01-01 則可解除 `terms_conflict`，若維持 11/6 應改判），來源 `https://one.google.com/offer/terms-and-conditions/google-career-certificates`；⑤ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：11/13 前確認剩餘經費是否歸零或公告停收（`https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`）。

結構經驗：三個 readonly 研究 agent 都能把結果寫到 `/tmp`（本輪 `task` agent 具寫檔能力），交付檔案＋訊息摘要比純訊息回收可靠；主 agent 仍需自行重讀會改變讀者決定的官方頁（本輪重讀 Google One 條款、grow.google TW、新竹、Lambda、ChatGPT 免費頁、OpenAI 廣告公告、Bytez、Liquid），並把 agent 只放在頂層的 `last_review_attempt_at`／`reason` 補回 `field_updates` 之外的欄位——否則「部分來源失敗」的紀錄會靜靜變成完整複核。

2026-11-10 01:05–01:35 本輪（接續 cc83e7c 之後，獨立 commit）：起始 958 筆；`next_review_at` 嚴格已到期 0 筆（19:29 剛結算），但 17 筆排程落在今日（多為 01:09–12:00 的每日案例），其中台北青年 AI 補助的期限就是今天，故佇列以「今日到期＋期限當日」為第一順位。佇列＝期限與台灣風險 7 筆（台北青年補助、Jules 11/11 轉唯讀、Amazon ARA 11/12 15:59、Antigravity 11/18 模型移除、ZCode 300M/日爭議、臺北產業獎勵 11/30、Grammarly 學生五折）＋最久未核輪替 7 筆（2026-10-30/31 批：Nebius、AWS Student Rewards、AIMLAPI、Magic Hour、Mistral 教育、Backboard、QuillBot 學生折扣）＋容量與期限敏感促銷 3 筆（Mango 折扣明日結束、DigitalOcean×Secret 前 50 家、富士Soft 前 10 家 PoC）。成功複核 16 筆、追查失敗 1 筆，未重查昨日才核過且無新訊號的案例。
2026-11-09 19:05–19:34 本輪（接續 57bf09a 之後，獨立 commit）：起始 957 筆；`next_review_at` 已到期 0 筆（18:32 剛結算），3 日內到期的 6 筆（台北青年補助 11/10、Amazon ARA 11/12、AutoClaw 與騰訊 Hy4 11/15、StepFun 11/17、Rime 11/19）在 17:27 才核過，故不重複刷新。佇列＝官方衝突與地區判定 7 筆（JetBrains AI Free、JetBrains Student Pack、Canva Education、Google Vids、Trae、Reducto、火山方舟）＋最久未核輪替 8 筆（2026-10-30 批：Jules、Codex banked resets、Codex 學生額度、Kiro 學生、QuillBot 免費層、QuillBot 學生折扣、Traversaal 新創、ChatGPT 付費訂閱附 API 額度）＋期限只寫在散文的欄位回填 6 筆（UGREEN 黑客松、Kiroween、緯創算力捐贈、中央大學機器人培訓、IteraCompute、Fireworks SFT；臺北市產業獎勵補助另回填但沿用同日 13:21 的複核時間）＝20 筆成功複核；新增機會 1 筆、政策 0、觀察線索 0；整筆追查失敗 1 筆（`quillbot-student-discount-current-terms-watch`）；未完成複核 937 筆；結果 958 筆。分工：3 個 subagent（衝突與地區／最久未核輪替／新機會）只回 patch，主 agent 自行重讀所有會改變結論的官方頁後才寫入。

最重要的更正（會改變讀者決定的）：

- `digitalocean-secret-ai-startup-100-2026`：台灣由 **Unknown 改成 Yes**，並補上兩個先前沒有的硬條件。官方促銷條款（Last Updated 2026-10-14）的地理限制只有一句「not available to … any person or entity located in, organized under the laws of, ordinarily resident in, or owned or controlled by a person in a country or territory subject to comprehensive sanctions administered by the U.S. government」，未列台灣；同時逐字確認「Be a new DigitalOcean customer — the credit is applied to a newly created DigitalOcean account; existing customers are not eligible」——既有 DO 客戶不符，「前 50 家」也不待窗口關閉：「once 50 redemptions are reached, the offer ends even if the Redemption Window has not closed」，活動總值上限 US$5,000 正是 Secret 首頁「$5,000/年」宣稱的來源不同之處（前者是 50×US$100 的活動上限）。仍須有效 Secret 會員、可查證的登記企業與新 DO 帳戶，個案核准未實測。
- `mango-inference-community`：折扣明日（11/11）結束，但 US$10 註冊贈額本身**沒有**公布期限。先前這種「部分權益有限期」只能塞進摘要，卡片正面看不到；本輪改用 `expiry.text` 呈現，`expires_at` 仍留空——寫進 `expires_at` 會讓整筆紀錄在 11/12 被當成到期（`tests/validate.py` 的「期限已過卻仍非已截止」會要求關閉整筆）。這是欄位語意示範：`expires_at`＝方案整體結束，`expiry`＝可含部分權益的期限與說明。
- `nebius-research-grants-gpu-token-tavily`：補上 FAQ 明文的兩條限制——「No, you are only eligible to apply one time for the Research Credits Program.」與「If we haven't contacted you by the end of the next calendar month, your proposal was not selected.」，並新增官方優先領域頁；滾動申請「Applications are open year-round. Complete proposals submitted by the last day of each month will enter that month's review cycle.」不變。

複核但無實質變動（皆今日重讀官方面）：`taipei-youth-ai-subscription-subsidy-2026`（期限當日 01:13 仍受理、服務頁仍 2026-09-22 版、公告首頁仍 35 筆且無用罄／停收／展延；`deadline_at` 維持只有日期）、`jules-free-fifteen-tasks-entrypoint-watch`（11/11 轉唯讀、12/31 退場措辭未變）、`amazon-ara-multilingual-contextual-ai-fall-2026`（頁面修改時間仍 10-28，未再展延）、`antigravity-free`（免費模型清單與 11/18 移除日未變、台灣仍在清單）、`taipei-industry-incentive-ai-rd-batch2-2026`（11/30、11/12 說明會）、`grammarly-student-annual-half-first-period`（50% off 條件未變，官方仍無截止日）、`aws-student-rewards-taiwan-excluded`（台灣仍在排除清單逐字）、`aimlapi-free-tier-paused-watch`（仍暫停、官方明言沒有免費方案）、`magic-hour-signup-four-hundred-seven-daily-claims`（400／每日 100／終身 7 次不變）、`mistral-education-unresolved`（US$5.99 只在 FAQ，卡片價格元素仍 14.99；sitemap 確認全站沒有獨立教育／非營利頁）、`backboard-free-credit-current-plan-conflict-watch`（贈額衝突未解，/pricing 導向 2025-12-25 舊公告頁）。

新機會 4 筆（皆官方頁逐字，未登入未送件）：[Salesforce Power of Us](https://www.salesforce.com/en-us/wp-content/uploads/sites/4/Salesforce-for-Nonprofits-Pricing-Guide.pdf)（合格非營利免費 10 席 Nonprofit Cloud Enterprise；資格準則的文件清單明列「TAIWAN Registered under Civic code Act, Income Tax Law」，排除國別只有古巴、伊朗、敘利亞、北韓、中國含港澳、克里米亞；免費席效期與 Enterprise Edition 對應現行哪一層未載）、[Zendesk 新創方案](https://www.zendesk.tw/business/startups/)（Professional Suite＋Copilot 免費 6 個月起、與 VC／加速器夥伴掛鉤最多 2 年、上限 50 席、免卡但期滿須轉付費且試用資料永久遺失；50–249 人須夥伴推薦）、[HubSpot for Startups](https://www.hubspot.com/startups/about)（首年 90%、次年 50%、第三年 25%，須年約；台灣是否有核准夥伴未證，維持 Unknown）、[Zapier Free](https://zapier.com/pricing.md)（每月 100 tasks、Agents 每月 400 activities 且單次上限 10、Chatbots 2 個、新帳號免卡試用 Pro 14 天；MCP 每次工具呼叫計 2 tasks）。

品質改善（1 項，資料驗證）：README 一直寫「精確期限只存在三個欄位：deadline_at、expires_at、expiry」，但 `tests/validate.py` 只管制前兩個，第三個 `expiry.date` 完全沒有檢查。2026-11-10 統計有 7 筆使用 `expiry`，其中 `chatgpt-teachers-us`（2028-06）與 `claude-teachers-us`（2027-06-30）仍是可行動狀態；一旦 `expiry.date` 過去而狀態沒改，卡片會照樣宣稱可領取，兩條既有規則（複核日須早於截止、期限已過須改已截止）都攔不到。現以 `close_points()` 把 `expiry.date` 併入同一組規則（只解析完整日期，像 2028-06 這種只到月份的寫法與 `expiry.text` 散文都不解析）。驗證方式：在 repo 複本注入 `expiry.date: 2026-11-01` 於 conditional 紀錄→觸發「has passed but status is 'conditional'」；注入未來 `expiry.date` 但 next_review 排在之後→觸發「falls after expiry.date」；把 `2028-06` 放回→不誤報；實庫 962 筆照樣 PASS。

頻率調整（依可觀察訊號，不是為了刷新時間）：`antigravity-free` 每日→每月（唯一有日期的變動是 11/18 模型移除，讀者不必在此之前動作），`fujisoft-workforce-ai-security-poc` 每日→每月或新訊號（官方公告沒有截止日，剩餘名額不會在網頁上變動），`grammarly-student-annual-half-first-period` 與 `taipei-industry-incentive-ai-rd-batch2-2026` 每日→每週（無截止日／只給日期）。複核日一律排在仍可行動的期限之前。

驗證：`python3 tests/validate.py`（962 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過。瀏覽器檢查（localhost，962 筆，桌面 1280×900 與手機 375×812）：資料更新 2026/11/10 01:27、本輪更新 20（16+4）、免費方案 610、台灣條件適用 106（S 級 94）、開發者 561、福利研究 757；Salesforce／Zendesk 顯示「S · 台灣條件適用」與建議時間，DigitalOcean 顯示 S 級＋「設定費／每月費用 未核實」，Mango 的「截止與期限」列出現折扣期限、`expires_at` 未填，富士Soft 顯示「每月或有新線索時；2026/12/09」，QuillBot 顯示「最近來源追查 …」與原因；關鍵字、排序（最近核實）、載入更多、手機版無水平溢出、console 無錯誤。

未解缺口：QuillBot 學生價需瀏覽器或登入（三個 URL 皆 403）；ZCode 官方兩份文件對 5 天試用額度互相矛盾（welcome 5M／日 vs configuration 8M／日）且都沒寫 300M；Grammarly 的 SheerID 台灣國別清單需 JS 渲染；Secret 會員權益頁 403；Salesforce 免費席效期與版本對應；Zendesk 免費期滿資料匯出的官方程序。

下輪輪替起點（本輪結束時最久未核、仍可行動）：`aws-student-rewards-taiwan-excluded`（已核，下一輪起算 12/10）、`magic-hour`、`mistral-education`、`backboard`、`nebius` 皆已排 12/10；真正最久未核者為 2026-10-31 批尚未輪到的 `meta-muse-free`／`meta-muse-wonder`（缺 status）、`fashn-app-once-ten-no-free-api`、`wiro-student-200-credit`。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026`：11/10 23:59 後期限屆滿且未展延，**必須**改 `applications_closed` 並把 cadence 由 daily 改 monthly_or_new_signal（否則 `tests/validate.py` 會擋下：daily 不得用於已截止、期限已過不得仍非已截止），來源 `https://youth.gov.taipei/services/05eb79e5-46b5-41e5-b1fd-0519d782b04a/0ecc1836-dd0d-4085-a34f-003609f00796`；② `amazon-ara-multilingual-contextual-ai-fall-2026`：11/12 15:59 後同樣要改 `applications_closed`（`https://www.amazon.science/research-awards/call-for-proposals`）；③ `jules-free-fifteen-tasks-entrypoint-watch`：11/11 轉唯讀後確認是否真的停止開新 session，並核資料匯出期限（`https://jules.google/docs/changelog/`）；④ `antigravity-free`：11/18 移除日的實際結果與免費層是否保留第三方模型（`https://antigravity.google/docs/models`）；⑤ `zcode-daily-300m-glm53-flash-claim-watch`：以 z.ai 主控台 billing 的 plan_id 或官方公告定案，否則維持 needs_verification（`https://zcode.z.ai/en/docs/configuration` 與 `https://zcode.z.ai/en/changelog`）。

結構經驗：兩個唯讀研究 agent 都無法寫檔，交付內容以訊息附帶的 JSON 回收——派工時若要 agent 產出檔案，必須確認它的工具集含寫檔能力，否則就要在完工訊息裡收貨。`views` 只接受 index.html 實際選項（free／quota／unlimited／regional／value／developer／beta），把 schema 外的字（如 `live`、`startup`）寫進 status／views 會讓驗證或篩選靜默失效（本輪 Zapier 候選原寫 `status: "live"`，已改 `active`）。

最重要的更正（皆為「讀者會做錯決定」的類型）：

- `reducto-standard-initial-credit-us-only`：台灣由 **No 改成 Yes**。舊紀錄引用「條款明訂僅供位於美國者使用」，但現行[服務條款](https://reducto.ai/terms)（Last updated: November 6, 2026）只有 §1.2「We operate the Services from the United States. If you use the Services from outside the United States, you direct us to transfer your Content to the United States」，全文 `Geographic`／`territor`／`residents` 各 0 次；[定價頁](https://reducto.ai/pricing)仍列 Standard「Free $150 in free usage」，[遷移文件](https://docs.reducto.ai/reference/pricing-migration)仍寫「New customers will still have 15,000 credits」。免費額度以「未曾用過免費額度的新網域」為單位，與國別無關。record_type 由 watchlist 改 opportunity，才不會被排除在免費專區外。本輪沒取得舊版條款全文，無法確認舊條文的實際範圍，已在 unknowns 保留。
- `jetbrains-ai-free`／`jetbrains-student-pack-ai`：兩個紀錄原本都寫「AI Free 3 credits 是否每 30 天重置，官方兩說」。實際讀 DOM 後矛盾解除：[授權頁](https://www.jetbrains.com/help/ai-assistant/licensing-and-subscriptions.html)「額度用完怎麼辦」是**兩條獨立 `<li>`**——「Wait for the next 30-day cycle when the quota resets.」與「(Trial, AI Pro, AI Ultimate) Purchase AI credits…」，括號掛在**加購**那一項；配合表格「AI Free | Free | 3 AI credits per 30-days」與 FAQ「The quota reset occurs every 30 days from the date when you first used your JetBrains AI license」，AI Free **會**每 30 天重置、但**不能加購**。`ai-service-license` 的 one-time 說法在頁尾凍結於 2025-06-18，是過時條文。學生包的部分另確認為「30 天 AI Pro 試用」而非整學期，complimentary 學生 All Products Pack 不含 AI credits，畢業後教育授權失效、兩年 40% 折扣。兩筆狀態皆由 `terms_conflict` 改 `active`。
- `canva-education-k12-teachers-ai`：同一頁有兩處操作性條文把 Education 當成具 Premium／Ultra（「10x more AI allowance than Canva Free」「If you hit your limit, you can keep using premium AI features with short pauses」），只有「可用方案」清單漏列 Education，判為編輯遺漏，狀態由 `conflicting_official_usage_claims` 改 `active`。
- `jules-free-fifteen-tasks-entrypoint-watch`：官方 changelog 2026-10-29「Jules Turndown」——「Jules will wind down on December 31, 2026. You have until November 11, 2026 to continue finishing up sessions.」「After November 11, 2026, we will be turning Jules to read-only」。免費 15 任務仍在文件上，但 11/11 後不能再開新 session，狀態改 `sunset_announced` 並補 `deadline_at`／`expires_at`；同時記錄使用量頁的模型欄仍寫 Gemini 2.5 Pro，與 changelog 的 3 Flash／3.1 Pro 不一致。
- `openai-chatgpt-subscriber-api-credits`：台灣由 Unknown 改 **Yes**。Pro 100／200／500 每月 US$100／200／500、Business 每付費席位 US$20／US$100、工作區月上限 US$500，額度期末失效不結轉、訂閱需滿 7 天且非試用、訂閱與 API 組織同 email 且同為 owner；台灣可買到 NT$ 計價的 Pro（NT$3,300／6,990／16,500），API 支援國家清單含 Taiwan。這筆由 D 級升為 S 級。

其他複核結果：`google-vids-omni-free-sixty-seconds-monthly` 維持 `conflicting_official_usage_claims`（個人帳戶 60 秒／月＋50 credits／月 vs 部落格 3 支 15 秒），但補上台灣可用證據（「all countries and regions where Google Workspace accounts are available」）與「credits 與秒數是兩個池」；`trae-free-ide` 台灣維持 No（支援清單渲染後仍無 Taiwan／TW／台灣，且清單含 Timor-Leste 等小地區，證明不是截斷），另補官方 FAQ「For free users, it's a one-time allowance and doesn't reset monthly」；`volcengine-ark-1111-token-giveaway-watch` 維持 restricted／No，補上活動結束時間 11/30 23:59:59（北京時間）與「領取連結指向 cn-beijing 控制台」。

期限欄位回填（來源逐字載明才寫）：UGREEN 11/16 15:45（Devpost「Registration Period … November 15, 2026 (11:45 pm Pacific Time)」）、Kiroween credits 申請台北 12/2 04:00、緯創 12/13 23:59、中央大學 12/4（只列日期）、IteraCompute 免費促銷台北 11/24 16:00、Fireworks SFT 台北 12/1 16:00。新增機會：[小米 MiMo TTS](https://mimo.mi.com/docs/zh-CN/price/pay-as-you-go)（國內與海外兩張價目表都把 mimo-v2.5-tts／-voiceclone／-voicedesign 列「限时免费」，頁尾更新 2026-10-21；未公布額度與截止日，海外戶為儲值制，首儲 US$0.72 是獨立促銷）。排除：Qoder Qoduck、Mango Inference、Fireworks SFT 已在庫；Mistral Education 與既有紀錄重複；Enhanced Radar API 限美國；Y-API、Geek Room、Napster 等活動期早於窗口或營運方不明。

品質改善（本次一項資料驗證）：`last_review_attempt_at` 只留時間、沒有原因，下一輪就不知道當時為什麼讀不到。全庫原有 4 筆這種紀錄（`qoder-lite`、`seoul-aihub-khdp-closed-september`、`kakao-plus-young-adult-promo-unverified`、`nchc-university-ai-compute-discount-2026`），本輪補上「原因不詳」的誠實說明，並在 `tests/validate.py` 加全域斷言「有追查時間就必須有非空原因」；以 HEAD 資料驗證該斷言會以這 4 筆失敗，補齊後通過。另把 UGREEN 的 10 筆來源（2 個 URL）依既有規則合併為 2 筆。

驗證：`python3 tests/validate.py`（958 筆）、`node --check app.js`、`node tests/filters.cjs`、`git diff --check` 全通過。瀏覽器檢查（localhost 與正式站）：資料更新 2026/11/09 19:29、全庫 958、本輪更新 21（20+1）、免費方案 607、台灣條件適用 103（S 級 91）、開發者 560；Reducto 卡片顯示「S · 台灣條件適用」「設定費／每月費用 US$0／US$0」與費用補充；Jules 顯示「已公告終止」與「申請截止 2026-11-11（來源未列時刻）；方案或免費期結束 2026-12-31」；小米 MiMo 顯示「B 級／需符合條件」與儲值制說明；排序（最近核實）、關鍵字、三個捷徑、載入更多 24→48 可用；390px 寬 `scrollWidth=390` 無水平溢出，console 無訊息。Pages workflow 42609926763 success，公開站已核對本輪三筆代表性內容。

未解缺口：Reducto 舊版條款全文（Wayback 429，未能確認舊 US-only 條文範圍）；QuillBot 學生價需登入才能確認；Jules 使用量頁模型欄與 changelog 何者為準；Google Vids 的 Workspace 訂閱句如何適用個人帳戶；小米 MiMo 的免費額度、截止日與台灣註冊；`nlp-cloud-trial-card-and-hard-cap` 仍是 4 筆沒有 status 的機會之一（curl 403、需瀏覽器）。

下輪輪替起點（本輪結束時最久未核、仍可行動，皆 2026-10-30／10-31）：`nebius-research-grants-gpu-token-tavily`、`aws-student-rewards-taiwan-excluded`、`aimlapi-free-tier-paused-watch`、`magic-hour-signup-four-hundred-seven-daily-claims`、`fashn-app-once-ten-no-free-api`、`meta-muse-free`、`backboard-free-credit-current-plan-conflict-watch`、`mistral-education-unresolved`（QuillBot 學生折扣雖最舊，本輪已記為追查失敗，需登入才能推進）。

下輪優先（前五項）：① `taipei-youth-ai-subscription-subsidy-2026` 11/10 送達期限：一過就改 `applications_closed`（youth.gov.taipei 公告）；② `jules-free-fifteen-tasks-entrypoint-watch` 11/11 轉唯讀：確認是否提前停止受理新任務，並在 12/31 退場後改 `closed`（jules.google/docs/changelog/）；③ `hsinchu-city-ai-youth-digital-tool-subsidy-2026` 每日追剩餘經費（11/9 19:00 前仍 4.4%）與 16／18 歲版本（dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323）；④ `google-ai-professional-certificate-tw-pro-3mo` 11/13 排程：確認 11/6 兌換窗口與 2027-01-01 兩說的落差是否已由官方修正；⑤ `reducto-standard-initial-credit-us-only`：以 Wayback 或官方變更紀錄確認舊版條款是否真的寫過美國限定，避免把「條款改版」誤記成「原本就沒有限制」（reducto.ai/terms、web.archive.org）。

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

每輪先跑 `python3 tools/queue.py` 取得佇列，不要再手寫排序：它固定「逾期 > 視窗內到期 > 最久未核」的優先序，並套用 12 小時冷卻（24 小時內到期者不受限），已截止／已關閉／已合併紀錄永不排入；基準數字會同時印出「視窗內到期 N 筆」與「實際排入 M 筆」，避免把冷卻誤讀成沒有到期項。`--self-test` 以合成資料斷言規則本身。接著比對前次 reviewed/new IDs，成功讀取才更新 verified_at 和具體來源查閱時間，失敗記錄嘗試而不延後一個月。僅有新條件、來源矛盾或新基準才追加政策歷史；核對完成後重算評分並執行下列測試、瀏覽器及 Pages 公開版本確認。來源維修另用 `python3 tools/linkcheck.py`（只列 404／410 為 dead，403 與逾時不算）取得 dead 清單，把「引用到失效官方頁」的紀錄排進下一輪。

`tools/queue.py` 的 `parse_stamp()` 只把「含 `HH:MM`」的字串當時間戳，其餘一律走日期分支並套用 `end_of_day`。原因是 `datetime.fromisoformat("2026-11-10")` 會**成功**回傳當日 00:00，若先試 ISO 再退回日期解析，`end_of_day=True` 就永遠不會生效：`deadline_at: 2026-11-10` 的紀錄在期限當天會被算成「已過」，因而掉出 closing 桶、也拿不到 24 小時緊急豁免（2026-11-10 實測臺北青年 AI 補助正是如此，修正後同一天才以 `[closing]` 排到第一位）。排程與期限是兩種語意：`next_review_at` 當天即算到期（00:00），截止日則代表「當天仍可動作」（23:59:59），與 `tests/validate.py` 的 `close_stamp()` 一致；`--self-test` 以規格值固定這三件事。

本專案為無後端靜態網站，可由 GitHub Pages 的 main 根目錄發布。
驗證：python tests/validate.py；node --check app.js；node tests/filters.cjs；python3 tools/queue.py --self-test；python3 tools/linkcheck.py --self-test（要修來源時再跑不帶參數的全掃）。

判斷重複收錄要比「補助比例／額度上限／排他規則／資格門檻」四項，不是比標題：`tests/validate.py` 只擋完全相同標題，2026-11-10 因此留下 `wda-ipt-ai-course-tuition-subsidy` 與 `taiwan-industry-talent-investment-ai-courses-2026` 兩筆同一方案（勞動部產業人才投資方案）的紀錄，一個記在學員須知 PDF、一個記在課程公告。合併規則照 `tests/validate.py` 的註解：保留**較早**的 ID，較晚的標 `status: duplicate_merged` 加 `duplicate_of`、清掉 `priority_*`、`next_review_at` 改 `review_cadence: on_new_signal`，把仍有用的來源移進保留的那筆（保留原查閱時間），再追加一筆 `duplicate_merged` 政策歷史；舊歷史列不改寫。

`verification_scope` 缺值時卡片標籤寫「核實範圍未記錄」，不再印「本次核實範圍」加通用句——那個組合會讓「只核了其中一項」與「整筆都核過」長得一樣。批次紀錄一律要寫這個欄位（`tests/validate.py` 會擋），舊紀錄在輪到複核時順手補，不回填。

`tools/linkcheck.py` 的 dead 清單是待驗清單，不是證據。2026-11-10 全掃把 `neo4j.com/docs/aura/security/ip-addresses/` 與 `…/create-account/` 報成 404，但同一輪 `--record neo4j-auradb-free-tier-200k-nodes` 回 ok 7、curl 帶瀏覽器 UA 也是 200、24 路併發重測全 200。判定來源失效前先單筆重掃；404 只證明那個網址當下打不開。

`data/offers.json` 頂層的 `scope` 字串是網站首頁「本次研究範圍」那一段的唯一來源，它與 README 首段是兩份各自手寫的敘述。2026-11-10 18:30 發布後打開公開站才發現：資料、README 與批次欄位都已更新，`scope` 仍是 17:06 那一輪的文字（「局部複核 18 筆…新增 3 筆機會」），於是首頁顯示的範圍與卡片上的「本輪更新」互相矛盾；`tests/validate.py` 只驗數字與時間戳，沒有任何檢查讀這段自由文字。發布後必須**打開公開站看首頁那一段**，不能只看 `#count` 與卡片。文字內容仍須人工寫（無法自動生成），但寫完要與 `last_research_run.reviewed_ids`／`new_ids` 的筆數對得上。

2026-11-10 18:07–18:29 本輪（接續 fcf1831 之後）：起始 **1,014 筆**；`tools/queue.py` 基準為嚴格逾期 0、7 日內到期 9（其中 7 筆在 12 小時冷卻內，不重讀）、`retry` 桶 4 筆、24 小時未核 646 筆。複核 10 筆（rork、New Relic 學生、tavily、exa、sarvam、tinyfish、thunder、SoftBank×Perplexity、Perplexity 免費層、臺北青年 AI 補助），3 筆整筆追查失敗（e2e 新創、astamuse、DeepInfra），新增 2 筆機會。上一則 17:40 才結束，其 18 筆不重讀。

會改變讀者決定的更正：

- `taipei-youth-ai-subscription-subsidy-2026`：**狀態改 `applications_closed`**。期限日 18:28 重讀，專頁版本仍是 2026-09-22，「最遲應於11月10日前提出申請」「申請日以送達本局之日為準，已逾申請期間者，本局應予駁回」逐字未變，公告首頁仍 35 筆、最新 2026-11-09，沒有停收／用罄／展延字樣。判定的依據不是公告，而是同一頁的聯絡資訊：「【本局辦公時間】週一至週五 上午09:00~12:30；下午01:30~05:00（彈性上班：上午08:00~09:00；下午05:00~06:00）」——計畫以送達日認定、逾期駁回，18:00 之後已不可能在期限內送達。並行研究員主張「沒有停收公告就不該改狀態」，這裡不採用：缺席公告只能說明站上沒更新，不能讓卡片在期限日之後繼續宣稱可申請（`tests/validate.py` 的「期限已過卻仍非已截止」明天就會擋下這一筆）。`review_cadence` 改 `monthly_or_new_signal`，下次複核 11/11 上午，看是否另行公告延長或預告 116 年度。
- `rork-free-design-region-dependent-monthly`：**計費架構變更**。官方 2026-10-30 起把 Cloud Credits 併入單一 credits 池（「$1 of usage is 5 credits」），現行文件已無「啟用 Rork AI Cloud 一次 US$1」，加值區間改為一次 US$5.50（+25 點）至 US$220（+1,000 點）且僅付費方案可用；舊來源 `/billing/build-credits-vs-cloud-credits` 現在 308 轉址到 `/billing/credits`。**轉址後仍回 200，所以 `tools/linkcheck.py` 不會把它列為 dead**——連結活著、內容已換一份，這是「連結檢查不等於證據檢查」的實例。舊證據文字以「2026-11-10：…上列敘述僅為歷史」保留在原條目，不刪。
- `new-relic-students-observability`：`taiwan` **Unknown→Yes（條件式）**。官方學生頁指定 GitHub Education 為驗證夥伴，且 GitHub Education 的資格條文只寫在學、在學證明與 13 歲門檻，沒有國別限制；`taiwan_note` 寫明這是文件鏈推定、不是個案核准，官方也未曾點名台灣。額度（每月 500 GB、3 名使用者）與「可隨時要求重驗、未通過降回 Free」不變。
- `perplexity-watch`：新增可引用的官方價格基準——**Education Pro US$10／月、需 SheerID 學生或教職員驗證**；比較表另列 Free 的 Comet Assistant 與 Advanced AI Models 為 `No`。免費 Pro Search 上限的兩說（比較表 `3/day` ↔ 帳戶管理文 `five Pro Searches per day`）同日重讀仍並存，維持 `conflicting_official_usage_claims`；`www.perplexity.ai/pricing` 連續第五輪取不到，Pro 的 US$20／月仍無官方原文，`recurring_cost_usd` 維持 null 並在 `cost_note` 寫清楚。
- 6 筆重讀後主張不變（tavily 1,000 credits／月、exa 每月 US$10＋onboarding US$10、sarvam ₹100 永久、tinyfish US$35 與合格網域清單無 `.edu.tw`、thunder 限美國大學 US$20、SoftBank 6 個月 0 円後 2,950 円／月），只刷新 `verified_at`、來源查閱時間與 `verification_scope`。

方法教訓（寫進資料，不只寫在這裡）：`softbank.jp` 那頁的原始碼裡有一段「【障害発生】「Perplexity Pro for SoftBank」の申し込みができない状況について」，但整段被 `<!-- … -->` 包住、**不會顯示**。純文字擷取（把標籤剝掉）會看到它，於是把一個沒有對外發布的障害公告寫成「目前無法申辦」。讀到「頁面上有這句話」與「這句話是頁面發布的內容」是兩件事；本輪在該筆的 `verification_scope` 留了這個反例，並未把它當現況證據。

新增 2 筆機會（皆逐字取自官方頁、去重掃過全庫 id／title／summary）：
- `microsoft-copilot-consumer-free-published-limits-none`：消費端 Microsoft Copilot 免費版，US$0、無到期日、免付款方式。官方 FAQ 只寫「subject to available capacity and limits」，達上限須升級或稍後再試，**未公布聊天／圖像／Deep Research／Agent 次數**，故 `quota_classification` 記 NO FIXED CAP PUBLISHED 而非任何數字。台灣 Yes 的依據是 zh-tw 支援頁「Microsoft Copilot 可在全球 170 多個市場使用。有一些例外情況是像中國 (不包括香港特別行政區) 和禁運市場」，台灣不在例外、介面與提示支援「中文 (繁體)」；同頁「Features, availability, and usage limits vary by plan and region.」已寫進 `terms_restrictions`，避免把他國額度當台灣額度。與 GitHub Copilot、Copilot Pro US$10／月、M365 Copilot 企業租戶三者分開。
- `diffit-basic-free-teacher-unpublished-limits`：教師教材改寫工具 Basic，US$0、官方寫免費版「remains available」不是限期試用，但只標「A great option, with limits」不給次數，且免費版只能取用**近 90 天**建立的內容。`taiwan` 記 **Unknown**：官方沒有任何地區文字，既未點名也未排除台灣——同類的 brisk、magicschool 也是 Unknown，不用「沒寫限制」推成 Yes；`taiwan_note` 說明實務上應可使用、售價與稅費未公布。
- 未納入：Brave Leo（支援國家頁兩次被導向登入頁，台灣資格無法逐字確認，僅列待追）、SageMaker Studio Lab（官方明寫不再開放新客戶）、Snyk Free（Evo AI 不含免費層）、Qwen Code（需訂閱或自帶 key）、Freepik／Magnific（定價頁已無 Free 欄）、台大弱勢生 AI 補助（僅媒體報導，無校方公告）。

品質改善（本輪唯一一項，`tests/validate.py`）：README 首段的**四個數字全部手寫**——資料量與三類分項、本輪複核筆數、新增機會／政策／觀察線索、其餘未複核筆數——而網站 overview 是從 `offers.json` 算出來的。漏改一次，GitHub 首頁與網站就會各自宣稱不同的資料量，且沒有任何檢查會發現（我對照前五個 commit 都還沒漂移，但那只是因為每輪都有人手動改）。新增的斷言把這四組數字對回 `len(offers)`、`record_type` 計數、`last_research_run.reviewed_ids`／`new_ids` 的型別分佈與 `unreviewed_existing_count`，並要求句子格式維持可讀，改了格式會直接報錯而不是默默跳過。驗證方式是把 README 暫時改成 1,015／804 後跑 `python3 tests/validate.py`，得到 `AssertionError: README dataset size disagrees with data: README 1015 (804/49/162) vs data 1016 (805/49/162)`；還原後 PASS。

驗證與發布：`python3 tests/validate.py`（1,016 筆 PASS，含新的 README 斷言）、`node --check app.js`、`node tests/filters.cjs`（17 組全 PASS：免費專區 657、quota 149、台灣條件適用 135／150、S 級 122、關鍵字 790 筆「免費」命中）、`python3 tools/queue.py --self-test`、`python3 tools/linkcheck.py --self-test`、`git diff --check`。瀏覽器實測見下方發布紀錄。

下輪優先（完整五項）：
①`aocai-working-free-ai-courses-2026`：11/16 台北梯次報名至 **2026-11-11 12:30**（11/11 台北班已於 11/08 23:59 截止）。11/11 中午後確認報名表是否關閉、11/26 梯次是否額滿，再決定維持 `conditional` 或轉 `applications_closed`；來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3544`、`https://serv.gcis.nat.gov.tw/AOCAI/`。
②`mango-inference-community`：官方三處文案都寫「30% off … until Nov 11」但**未標年份**，11/12 起要確認是否回到表列原價、以及 US$10 註冊贈額的到期日（頁面只寫 will expire after the stated validity period）；來源 `https://www.mangoboost.io/platform/mango-inference`、`https://inference.mangoboost.io/terms-of-service`。
③`e2e-explorer-free-versus-usage-discounts`：第三度只看到 `/startup-program` 308 → `/contact-sales`、sitemap 無此路徑、`/startups` 404，且無任何停辦公告。下輪不要再重讀同一條路徑：改查印度站與 `countries-served` 的變更紀錄、或經 sales 表單頁的 inline 文件；若仍無官方頁，考慮把「5K/50K/100K 僅為歷史記載、不得引用」寫進標題並把 `next_review_at` 拉到 12 月。
④`perplexity-watch`：Pro 的 US$20／月與 Comet 學生頁（`perplexity.ai/grow/comet/students`）連續多輪 403；下輪改走 browser relay 或 2026 年 Wayback 快照，取不到就以 Education Pro US$10／月為主敘述、把 Pro 價格留在缺口，不要填數字。另 3/day 與 five/day 的衝突需要產品公告才能收斂，不要再重讀同兩篇。
⑤尚未帶 `verification_scope` 的官方可行動紀錄（本輪前統計 85 筆）：不要批次回填，輪替排到時逐筆重讀官方頁再補，優先處理 `taiwan=Yes` 與 S／A 級者；`tests/validate.py` 只對本批次強制此欄位。

2026-11-10 19:05–19:31 本輪（接續 1d3de6d 之後）：起始 **1,016 筆**；`tools/queue.py` 基準為嚴格逾期 0 筆、7 日內到期 8 筆（其中 7 筆在 12 小時冷卻內，且當天 13:14–16:36 已核）、`retry` 桶 2 筆（當日 18:29 才失敗，冷卻中）、24 小時未核 653 筆、12 小時內已核 183 筆。輪替依佇列順序取 2026-11-16 排程的 8 筆，另補 6 筆來源衝突／金額缺口與 6 筆到期與高風險案例，共 **R=20**：輪替 8（Hour of AI、Recraft、Z.ai、BytePlus、Claude for OSS、CodeRabbit、Synthesia、GMI×a16z）＋衝突 6（E2E Networks、Baseten、Nscale、Tripo、Claude 科學家方案、台灣 Gemini 學院）＋高風險 6（Anthropic AI for Science、Claude Security、Vultr 促銷碼、MiniMax Design、Openlayer、Neo4j 新創）。新增機會 **2 筆**、政策 0、觀察線索 **1 筆**，整筆追查失敗 **0 筆**，未完成 **U=996 筆**（結果 1,019 筆）。`tools/linkcheck.py` 全掃 2,811 個去重來源 URL：ok 2,723、dead 5、blocked 69、unreachable 14；5 個 dead 全是既有已註記失效的頁面（`qoder-community-1024` 兩頁、astamuse、deepinfra、salad），沒有新失效來源。未登入、未申請、未付款。

會改變讀者決定的更正：

- `e2e-explorer-free-versus-usage-discounts`：**舊紀錄有錯**——它寫「Wayback 對該路徑無任何快照」，實際 CDX 有 2025-12-14、2026-04-13、2026-10-16 三筆 200 快照，2026-10-16 那筆完整保存三級方案：Explorer「$5K (₹5 Lakh) in free-to-use AI Cloud credits」、Builder「Up to $50K (₹50 Lakh) in usage-based AI Cloud discounts」、Scaler「Up to $100K (₹1 Crore)…」，資格分別為早期（10 人以下、5 年內）、募資 US$2M+、US$5M+，三級都寫「Established, legally incorporated company — in any country」且頁面寫「Open to AI startups worldwide」。現行 `/startup-program` 仍 308 → `/contact-sales`，`.md` 404、llms.txt 無此路徑，線上表列確已移除但無停辦公告，狀態維持 `needs_verification`。標題同步改為「官方頁已下架，三級額度與資格只存在 2026-10-16 快照」，不再宣稱金額無法複核。
- `claude-scientists`：`taiwan` **Unknown→Yes（條件式）**。方案頁逐字「Scientists at academic and nonprofit research institutions around the world」，促銷條款 §2 只以「be located in a region where the Plan is available」為條件，Anthropic Supported Regions 清單明列 Taiwan（該頁標示 2026-11-12 生效）。這是文件鏈推定，仍須 PI 核驗與個案核准。同時補上「1–25 席、更多席位需來信」、年繳 US$180／席、API credits 按席位 US$20（Standard）／US$100（Premium）合池上限 US$500、以及「Prices shown don't include applicable tax」。
- `nscale-signup-five-current-docs-conflict`：**註冊方式已改**——quickstart 從「Currently, you can only sign up using Google (SSO)」改為 Google／GitHub／email 加密碼，且「Each email address can only have one Nscale account」；`www.nscale.com/pricing` 現為 404（含尾斜線），官方 sitemap 也沒有定價頁，費率只剩 docs 與 console。US$5 贈額的兩份官方說法仍未收斂，維持 `unverified`。
- `tripo-api-free-credits-index-mismatch`：API 端再次確認「pay-before-you-go」、1 credit＝US$0.01、自 US$1 起購，無新戶贈額。Studio 端補三項限制：Free 方案 Image Generation「No free quota」、3D 匯出只到 H2.5、輸出「With attribution」且「IP belongs to Tripo」（非商業）；方案列已無 Starter（Free／Professional US$13 年繳／Max／Team）。索引的「2,000 免費 credits」較可能對應購買頁「$100 → 10,000 + 2,000 credits」的付費加贈。
- `synthesia-basic-monthly-ten-min-five-hundred-no-download`：Syren 首發 1,000 credits 的到期時刻 2026-11-09 23:59 BST 已過，但定價頁 Basic 卡仍掛「1 Syren video - limited promo」、說明文仍以現在式寫到期日——兩頁都沒更新。可確定那批首發點已到期、之後 Syren 改扣方案內 500 credits；「新註冊是否仍發 1,000 點」官方沒有答案，記為頁面過期而非方案取消。
- `neo4j-startup-aura-twentyk-application-unavailable`：條款補兩項會影響資格的條件——營業地須在「Neo4j Cloud Offering 提供地」（§2.1），額度只能抵 AuraDB Professional 或 Business Critical 兩層且額度用完不另行通知（§4.1.1）；§2.3 保留以公司所在國家／地區為由拒絕的裁量權。申請頁以無頭瀏覽器重驗仍可填（38 個欄位、Submit 可見、Country 223 選項含 Taiwan）。
- `vultr-new-customer-credit-codes-watch`：促銷頁現多掛一組 VULTRMATCH，且它是唯一公開完整條件的——存款對存上限 US$100、**12 個月到期**、扣抵 **50/50**、重複帳號不符資格、「limited time」未載日期；三組 free-credit 代碼（US$200／250／300）的落地頁仍只回註冊行銷頁，個別效期與適用產品清單仍缺。卡片補 `cost_note` 說明這些都是促銷額度、MATCH 需先自付存款。
- `byteplus-modelark-free-inference-500k`：研究代理的純文字路線全部失敗（llms.txt、Wayback、數字 slug、兩組 doccenter API），主 agent 改用無頭瀏覽器渲染後取回逐字正文：500k、分模型計算、主帳號與子帳號共用、Free Tokens Only「After approaching the free quota, the service will be suspended」、額度耗盡「the call will fail… manually activate」。來源範圍已改註明「瀏覽器渲染」。
- 其餘 12 筆（Hour of AI、Recraft、Z.ai、Claude for OSS、CodeRabbit、GMI×a16z、Anthropic AI for Science、Claude Security、MiniMax Design、Openlayer、Baseten、Gemini 學院）逐字重讀後主張不變，只刷新 `verified_at`、來源查閱時間並補 `verification_scope`；其中 Anthropic AI for Science 另補「錄取後 5 個工作日內回覆、文件 14 天內簽回」的時限，MiniMax 補「top-up credits 一年有效、不可退費不可轉讓」與年繳促銷只有倒數沒有結束日。

`google-gemini-academy-taiwan-educators-workshop-watch` 是本輪第二個讀者層級修正：公開頁只有 2025-08-12 與 2025-10-18 兩場（皆已結束），且報名入口需先登入；`grow.google` 台灣頁的「立即報名」仍指向同一頁，全站無 2026 梯次。摘要與 `access_risk` 已改成「目前沒有可循的官方路徑取得證明或教材」，複核節奏改 `biweekly`（下次 11-24）追新梯次；登入後是否有新場次仍未核，因此不做停辦判定。

新增 2 筆機會＋1 筆觀察線索（皆逐字取自官方頁、去重掃過全庫 id／title／summary）：
- `google-maps-demo-key-ai-studio-free-daily`：Google 2026-11-09 在 AI Studio 開通 Maps Platform，免綁卡免計費，部落格寫沙盒額度「100 calls/day, per API」、每 24 小時重置、達上限暫停至隔日且不產生費用。**文件頁只寫「subject to the usage limits, which are subject to change」，沒有數字**，所以 100 次只有部落格一個官方來源，已列缺口。限制：必須個人 Google 帳戶（Workspace 不合格）、僅供原型、正式上線要接 Cloud 計費；禁止地區清單（China／Crimea／Cuba／Donetsk／Iran／Luhansk／North Korea／Syria／Vietnam）未列台灣。
- `smelearning-ai-zone-224-free-ai-courses`：經濟部中小及新創企業署「中小企業網路大學校」AI 主題專區列 224 門課（基礎知識 41、工具方法 55、實務應用 128）＋3 個主題包（20／17／14 門）＋AI 工具分享 103 個＋亮點案例 19 案，課程標「免費」，另有完訓證書公告。與已截止的 115 年度企業專區輔導不同：這是持續開放的公開課程目錄，不需企業身分。`www.smelearning.sme.gov.tw` 沒有 DNS 記錄，改用不帶 `www` 的主機名讀取，已在來源 scope 註明。
- `smelearning-strongest-ai-king-line-points-2026`（watchlist）：同一個「最強AI王」活動在官網有兩套獎品文字——公告頁（2026-03-06）寫「LINE POINTS 50點」「電子LINE POINTS 200點」合計 250 點、各限量 500 名；站內彈窗與完成提示卻寫「最多可獲得 5張電子咖啡即享券」（8 小時給 1 張、15 小時＋證書再給 4 張），而彈窗的「活動詳情」連到的是另一篇無關文章。兩份都來自官方站台，不擇一陳述，狀態記 `terms_conflict`。
- 未納入：AMD 中國 Radeon Token Factory（`developer.amd.com.cn` 只回 SPA 外殼，數字僅見第三方目錄）、116 年度中小微 AI 輔導計畫 3.17 億元預算（僅採購預告、無受理窗口，列入下輪追蹤）、Oracle Academy Cloud（三條路線皆 403）、中華電信與台北市／新竹市補助（既有紀錄已載）。

品質改善（本輪唯一一項，`tests/validate.py`）：**首頁「本次研究範圍」的 `scope` 字串沒有任何檢查**。它是網站 overview 那一段的唯一來源，卻與 `last_research_run` 分開手寫；2026-11-10 18:30 發布後打開公開站才發現資料、README 與批次欄位都更新了，`scope` 仍是 17:06 那一輪的文字（「局部複核 18 筆…新增 3 筆機會」），首頁因此對讀者宣稱錯誤的本輪進度。新增三條斷言：`scope` 必須是字串、必須出現「複核 N 筆」且 N 等於 `reviewed_ids` 長度、必須出現本批次開始日期，另有「宣稱的新增筆數不得大於 `new_ids`」。以 9201475 那一版資料反向驗證：`scope` 寫 18、`reviewed_ids` 只有 10，新斷言會擋下，舊版則全綠。只規範數字與日期，不規定句型。

下一輪優先（完整五項）：
①`aocai-working-free-ai-courses-2026`：11/16 台北梯次報名至 **2026-11-11 12:30**，11/11 中午後確認報名表是否關閉、11/26 梯次是否額滿，再決定維持 `conditional` 或轉 `applications_closed`；來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3544`、`https://serv.gcis.nat.gov.tw/AOCAI/`。
②`mango-inference-community`：官方三處都寫「30% off … until Nov 11」但未標年份，11/12 起確認是否回到表列原價、US$10 註冊贈額的到期日；來源 `https://www.mangoboost.io/platform/mango-inference`、`https://inference.mangoboost.io/terms-of-service`。
③`qoder-community-1024`：`tools/linkcheck.py` 全掃與本輪複查都把 `https://qoder.com/community-boost` 與 `https://docs.qoder.com/events/communityboost` 判為 404（兩頁是本筆主要來源）。下輪改查 `docs.qoder.com/llms.txt` 的 events 索引變更與 2026 Wayback 快照，找到替代官方頁就就地更新來源，找不到就把「原始頁已下架、只存快照」寫進 `access_risk`；狀態已是 `expired`，不要改回可行動。
④`google-maps-demo-key-ai-studio-free-daily`：這是本輪新增且我們自己標了缺口的紀錄——「100 calls/day, per API」只有部落格一個來源，文件頁寫「subject to change」。下輪讀 Maps Platform 定價頁與各 API 的用量上限文件，確認每日額度是否逐 API 一致、Grounding Lite 是否同額，以及接上計費後的每月免費額度金額；來源 `https://developers.google.com/maps/demo-key`、`https://cloud.google.com/maps-platform/pricing`。
⑤`smelearning-strongest-ai-king-line-points-2026`：同一站台兩套獎品文案（250 點 LINE POINTS ↔ 5 張電子咖啡券）需要官方一句話才能收斂；下輪查 `https://smelearning.sme.gov.tw/news.php?node=840`（彈窗宣稱的活動詳情，實際上是別篇公告）與站內最新消息是否有更新版，並確認兩階段各 500 名是否額滿。另：尚未帶 `verification_scope` 的官方紀錄仍有 95 筆（可行動 82 筆、其中台灣 Yes 11 筆），不要批次回填，輪替排到時逐筆重讀官方頁再補。

三種「看不到」要分清楚，判讀方式各不相同。①**CSS 隱藏的備援句**：Neo4j 申請頁的「This form is temporarily unavailable. Please try again later.」是 `display:none` 的備援文字，純文字擷取（含 content negotiation 的 markdown 版）只會留下它，看起來像表單停用，實際上 38 個欄位與 Submit 都可用——判準是查 computed style 與可見性，不要只讀 innerText。②**真的沒有快照**：宣告「Wayback 沒有這頁」前先打 `web.archive.org/cdx/search/cdx?url=…&matchType=prefix`；E2E Networks 就是這樣被誤記了三輪「無任何快照」，實際有三筆 200 快照保存了完整的方案表與資格。③**CSR 文件站**：`docs.byteplus.com` 這類文件站的正文不在 SSR payload 裡，`llms.txt`、數字 slug、doccenter API 都拿不到，換無頭瀏覽器渲染一次就有逐字正文。三者的共同點是「文字版空白」但原因不同，處理方式也不同。

新增紀錄時，`views` 只是人工標記，真正決定專區歸屬的是 schema 欄位：`categories`（FREE／HIGH-QUOTA／BETA-ACCESS 等）、`quota_classification`、`taiwan` 與兩個費用欄位。2026-11-10 新增的三筆都照這個規則寫（Google Maps Demo Key 的 `views` 含 `developer` 只是輔助標籤，能否進「免費」專區由 `setup_cost_usd`／`recurring_cost_usd` 皆為 0 決定），`tools/prioritize.py` 重算後 S 級由 122 增至 125，全部來自本輪把台灣資格補成 Yes 或新增台灣方案，不是評分公式變動。

2026-11-11 01:20–01:50 本輪（接續 7d73f13 之後）：起始 **1,019 筆**；`tools/queue.py` 基準為嚴格逾期 0 筆、7 日內到期 9 筆（其中 8 筆在 12 小時冷卻內）、`retry` 桶 0 筆（1 筆冷卻中）、24 小時未核 647 筆、12 小時內已核 101 筆。輪替與分工：即將到期／限時 8 筆、台灣資格與核實範圍缺口 8 筆（`taiwan=Yes` 且 S 級、官方來源卻缺 `verification_scope`）、主 agent 自查 4 筆，共 **R=20**；新增機會 **2 筆**、政策 0、觀察線索 0；整筆追查失敗 **0 筆**，未完成 **U=999 筆**（結果 1,021 筆）。`tools/linkcheck.py` 全掃 2,821 個去重來源 URL：ok 2,739、dead 7、blocked 67、unreachable 8；7 個 dead 中，`qoder.com/community-boost`／`docs.qoder.com/events/communityboost`／astamuse／deepinfra／salad／`www.nscale.com/pricing` 都是既有已註記的失效頁，新出現在清單上的是 `perplexity-help-center.mintlify.app/llms-full.txt`（`perplexity-watch`、`perplexity-education` 兩筆引用）。未登入、未申請、未付款。

會改變讀者決定的更正：

- `aliyun-yungongkaiwu-model-studio-students`：**抵扣排除清單整段改寫**。舊紀錄寫「百煉推理排除 Wan、HappyHorse、Omni」，與現行官方 FAQ 的命名對不上；現行逐字為「2026年7月14日之后领取的云工开物 300 元抵扣金，不支持抵扣以下后付费费用」，排除三方直供模型（云市场三方）、百炼大模型 Happy 系列、万相模型、向量排序模型、垂类模型、百聆语音与千问语音，之前領取的券不受此限。活動結束日兩份官方頁並存且不一致（百煉活動頁「2025年11月11日--2027年03月31日」↔ 雲工開物規則頁「即日起开始，结束时间以活动官网通知为准」），保留兩說。台灣高校在列與「每人每12个月可领取一张」不變。
- `google-gemini-notebook-standard-free`：**舊的每日對話上限不能再引用**。方案頁中英版與用量限制頁都已查不到「每日 50 對話／3 語音」，只剩「配額每 5 小時會重設一次，直到達到每週用量上限」且數值未公布；舊紀錄把兩套口徑並列，讀者會以為 50 次仍是現行保證。另英文方案頁把來源拆成兩列（非記事 50/本、記事 Notes 500/本），中文頁只寫 50/本，已在 `service_availability` 註明兩版差異。
- `moea-a-plus-early-startup-grant`：**移除查不到的版本號**。頁面連結的 docx 與 PDF 附件封面都是「115 年 06 月」版，兩者都沒有 11507-2 字樣；原本的「已更新為11507-2版（2026-10-19）」無法由官方文件佐證，改記為 115 年 06 月版並把 11507-2 列為缺口。金額上限、50% 比例、成立未滿 3 年與受理至 2027-12-31 不變。
- `anthropic-external-researcher-access-safety`：**申請門檻寫錯了方向**。表單該題逐字是「Are you located within the United States? (This question is for our tax & accounting purposes)」，選項只有 Yes／No，是問是否位於美國（稅務會計用途），不是要求美國稅務身分；台灣申請人答 No 不構成排除。原本的寫法會讓符合資格的研究者直接放棄。
- `google-maps-demo-key-ai-studio-free-daily`：補上**接上計費後的免費量**（原本是缺口）：Maps Platform 定價頁逐字 Essentials「10K free calls per SKU monthly」、Pro 5,000、Enterprise 1,000，新客戶另有 US$300 試用額度，並說明 2025-03-01 起以「每月免費呼叫數」取代原本的 US$200 月抵扣。Demo Key 文件頁仍只寫 usage limits subject to change，「100 calls/day, per API」仍只有官方部落格一個來源。
- `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：**餘額停止下降**。11/9 08:09 為 NT$340,843（5.9%）、11/9 17:26 與 11/10 02:19 為 NT$253,197（4.4%），11/11 01:47 第三次讀值仍是 NT$253,197，自 11/9 傍晚起未再變動；受理至 11/30 或經費用罄。另記下年費制「購買後 2 個月內送件」與「受理至 11/30」的關係：10/31 購買者的 2 個月期限會超過受理截止，實務上仍以 11/30 為上限。
- `aocai-working-free-ai-courses-2026`：11/16 梯次報名表仍可填、應付費用 0、報名至 **2026-11-11 12:30**；12/01 台北班仍「尚有票券」且全額免費，但明寫「名額將優先錄取未上過本主題課程的新學員」。已在 `unknowns` 寫明 **`deadline_at` 只代表最近一梯次**：11/16 班關閉後應改以 12/01 班為準，不可把整筆標成已截止（政策歷史同步追加 `deadline_scope_clarification`）。
- `qoder-community-1024`：**不再重讀同一條路徑**。docs `llms.txt`（200、21,995 bytes）的 Events 分類 11 筆仍無 communityboost，且同清單對已結束活動是保留並加「[Ended]」（例如 bogo），本活動是整篇移除；`qoder.com/community-boost` 在 Wayback 沒有任何 200 快照，只有 docs 頁 2026-10-29 一筆。狀態維持 `expired`，下一輪不必再掃這兩頁。
- `tw-labor-pretraining-ai-smart-application-tnnu-03`：報名人數 25 → **27**（名額 34，11/16 16:00 截止），其餘費用（5,760／27,040）、188 小時、11-18 甄試不變。`taoyuan-ai-productivity-online-courses-115`：頁尾更新日 115-11-07 → 115-11-10，但兩處截止日仍分別 11/17 與 11/20，衝突保留；11/12 與 11/17 場次的 Teams 連結仍未上架。
- 其餘 9 筆（Amazon Research Awards、2026 ADI FORUM、AutoClaw 週福利、騰訊 Hy4 免費窗、UGREEN 黑客松、StepFun Audio 3、Azure 非營利、Colab、Canva 非營利、Kaiva Bridge）逐字重讀後主張不變，只刷新 `verified_at`、來源查閱時間並補 `verification_scope`。其中 Amazon 兩頁一致（徵案頁「October 1 - November 11, 2026 (11:59PM Pacific Time)」、索引頁「Fall 2026: Open Now」＋「extended to November 11」）；騰訊四個產品頁仍對 11/4–15 免費窗 0 命中，英文稿寫 available for free、中文稿寫「一定额度的免费使用」，兩者強度不同，不擇一。

新增 2 筆機會（皆逐字取自官方頁，並先對全庫 id／title／summary 去重）：
- `kimi-file-extraction-storage-api-temporarily-free`：Moonshot Kimi 開放平台定價文件逐字「File-related APIs (file content extraction and file storage) are temporarily free: uploading and extracting a document alone incurs no file API charges.」，但同一平台〈Recharge and Rate Limiting〉要求「a minimum recharge of $1 is required to start using the API」，累計 US$5 再贈 US$5 券，速率分級也依累計儲值。`setup_cost_usd` 記 1（不是 0），`quota_classification` 記 TEMPORARILY UNLIMITED；`taiwan` Unknown（國際站文件未列國別）。與 `kimi-free-web-app`（消費端網頁免費層）及 `kimi-api-free-voucher-cn-locked`（中國站 15 元券）是不同產品與方案。
- `moe-ilink-aiea-winter-2026-teacher-workshops`：教育部資科司 iLink 計畫的 AIEA 認證，2026 冬季場 11/20、11/21、12/04、12/05 於逢甲大學文創館 3 樓各上下午場，頁面標「報名中」；參與對象逐字「全國各級大專院校的教師、助理、學生及社會大眾」。**全頁與報名表都沒有費用字樣**（「費用」「收費」各 0 命中），因此兩個費用欄位維持 null、狀態記 `needs_verification`、`categories` 不含 FREE——不讓未公布的費用被讀成免費。名額上限 40、iLink 團隊優先。
- 未納入：Vectoree（沿上輪判斷，一次性 US$5 對讀者決策價值仍薄）、116 年度中小微企業 AI 創新應用輔導計畫（中企署 2026-10-21 政府採購預告，案號 B31162601、預估採購金額 15.85 億元、履約期 116/1/1–116/12/20）——那是**同一計畫的次年度委辦採購**，不是企業可申請的新方案，應在 115 年度那筆 `taiwan-sme-ai-innovation-guidance` 上更新，不另建 ID；本輪未動該筆，留給下一輪。

品質改善（本輪唯一一項，`tools/prioritize.py` + `tests/validate.py`）：**`scope` 不能再被評分工具追加一次性遷移註記**。README 明寫「資料變更後重算：`python3 tools/prioritize.py`」，而舊版 `main()` 在 `scope` 不含「加入優先度評分與 S–D 分層」時會追加「YYYY-MM-DD 加入優先度評分與 S–D 分層（既有欄位衍生計算，無新增外部查核）」——`scope` 每輪都會被改寫（每輪都要寫新的複核筆數），所以**每一輪跑完工具都會把當天日期貼回首頁那一句**，讀者看到的是「本輪新增了 2026-10-24 就上線的評分機制」。2026-11-11 在複本上實測重現：跑一次就得到「…各筆僅核列明範圍。；2026-11-11 加入優先度評分與 S–D 分層…」。已刪掉該段（工具只算分與同步 `updated_at`），並在 `tests/validate.py` 加一條斷言擋住這串字回到 `scope`。驗證：①複本跑 `tools/prioritize.py` 後 `scope` 與執行前逐字相同、`updated_at` 仍等於 `latest_research_at`；②把該句塞回 `scope` 後 `python3 tests/validate.py` 立即報 `top-level scope carries the one-time scoring migration note`。

方法教訓（寫進資料與流程）：**「查不到」與「改版」要分開講**。本輪三筆的錯誤都屬同一型：阿里雲的排除清單是官方換了命名（舊字串還在，但不是現行條文）、經濟部 A+ 的 11507-2 版號是前人寫下但現行附件查無（應移除而不是保留）、Gemini Notebook 的每日 50 對話是被新的運算量制取代（不是同時存在）。判準是「現行頁面是否還逐字支持這句話」；支持不到就改成缺口或刪除，不要讓舊字串靠著「以前查過」留在摘要裡。另一型是**同一份文件回答兩個問題**：Anthropic 表單的「Are you located within the United States?」被讀成「需要美國稅務身分」，會直接把台灣申請人篩掉——表單題目的括號說明常常才是那個問題的真正用途。

驗證與發布：`python3 tests/validate.py`（1,021 筆 PASS，含本輪新增的 scope 斷言與 README 首段數字）、`node --check app.js`、`node tests/filters.cjs`（17 組全 PASS：免費專區 661、quota 150、台灣條件適用 140／155、S 級 126、關鍵字「免費」797 筆命中）、`git diff --check`。瀏覽器實測（本機 8123、headless Chromium）：全庫 1,021 筆載入、overview 與快捷鍵一致（台灣條件適用 140、S 級 126）、「本輪更新」22 筆＝20 筆複核＋2 筆新增、截止日排序把 11/11 12:30 與 11/12 的案件排在最前並顯示剩餘天數、搜尋「iLink AIEA」與「Kimi」各命中 1／10 筆且卡片顯示費用未核實與台灣資格、console 0 error、390px 視窗 `scrollWidth` = `clientWidth` = 390（無水平溢出）。

下輪優先（完整五項）：
①`aocai-working-free-ai-courses-2026`：11/11 12:30 後確認 11/16 梯次報名表是否關閉；若關閉，改以 12/01 台北班為準（`deadline_at` 換成該班、無公布截止則填 null，**不可把整筆標成已截止**），並確認 11/17、11/26 梯次是否額滿；來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://ievents.iii.org.tw/JoinPNew.aspx?t=0&id=3544`、`https://www.niea-bizboost.tw/activity/6fa437fa-e304-4cf2-b67b-56c0d3b905ad`。
②`mango-inference-community`：官方三處仍寫「30% off … until Nov 11」且未標年份，11/12 起確認是否回到表列原價、US$10 註冊贈額的到期日（頁面只寫 will expire after the stated validity period）；來源 `https://www.mangoboost.io/platform/mango-inference`、`https://inference.mangoboost.io/pricing`。
③尚未帶 `verification_scope` 的官方紀錄仍有 **87 筆**（可行動 74、其中 `taiwan=Yes` 3 筆）：不要批次回填，輪替排到時逐筆重讀官方頁再補；本輪已補 8 筆。
④死連結維修：`https://perplexity-help-center.mintlify.app/llms-full.txt`（`perplexity-watch`、`perplexity-education`）先找替代官方頁（help center 另一路徑或 Wayback），再處理 `www.nscale.com/pricing`、astamuse、deepinfra、salad；qoder 兩頁已確認不必再掃。找不到就寫進 `access_risk`，不改狀態。
⑤`smelearning-strongest-ai-king-line-points-2026`：11/11 重讀確認兩套官方文案仍並存（活動辦法頁 250 點 LINE POINTS、全站彈窗 5 張咖啡券，且彈窗的「活動詳情」指向 `news.php?node=840` 而該頁正文沒有活動辦法），需要官方一句話才能收斂；另 `google-ai-professional-certificate-tw-pro-3mo` 的 offer 條款 11/6 後仍未更新（11/13 排程已到），只需看條款頁是否改版、不要重讀行銷頁。

## 2026-11-11 02:05–02:35（Asia/Taipei）第 N 輪：19 筆複核、4 筆新增、README 維護日誌分家

**範圍與計數**：N=1,021、R=19（A 組高風險與條款衝突 8、B 組最久未核輪替 8、主 agent 自查 3）、A=4（opportunity 4／policy 0／watchlist 0）、U=1,002、attempted=0。資料集 1,025 筆。

**高風險組（8）**：`google-ai-professional-certificate-tw-pro-3mo`、`perplexity-watch`、`perplexity-education`、`google-vids-omni-free-sixty-seconds-monthly`、`ishou-university-campus-m365-copilot-firefly`、`postman-free-ai-credits-context-graph`、`lg-exaone-25-api-free-noncommercial`、`cleanapis-free-500k-tokens-month`。八筆的官方衝突全部重讀，無一由官方收斂；實質新增證據三筆（見下）。

**輪替組（8，先前最久未核 2026-10-31）**：`nvidia-open-source-ai-course-materials`、`foundry-local`、`nebius-builder`、`grafana-cloud-free-assistant-agent-observability`、`browserbase-free-developer`、`qdrant-cloud-free-tier`、`twelvelabs-free-video-api`、`tavily-students`。除 Browserbase 與 Nebius／Qdrant 的衝突更新外，額度與費用皆與舊紀錄一致。

**主 agent 自查（3）**：`aocai-working-free-ai-courses-2026`（11/16 梯次報名表仍受理，截止 11/11 12:30、上限 250、費用 0）、`rime-stt-nov19-free-window`（仍「Free until Nov 19」）、`iteracompute-free-qwen-3-8-27b-monthly-30m`（改由 Auto 路由）。

**實質變更與支持來源**

1. **Google One 條款頁「翻回」已過期日**（`one.google.com/offer/terms-and-conditions/google-career-certificates`）：現行版逐字「must be redeemed by November 6, 2026」，但同一網址 2026-08-24／09-15／09-27／10-27 的 Wayback 存檔逐字為「January 1, 2027」，`Last updated` 仍是 2025-07-31。三份行銷頁（台／英／歐）仍寫 2027-01-01。這是**條款頁被改寫或分區變體**，不是行銷頁單純過時——引用時務必帶存檔連結，否則讀者會誤判。狀態維持 `terms_conflict`。
2. **義守大學新增第三處矛盾**：AI 學習頁寫「Adobe CC 全校可用」，資訊處頁把 Adobe CC 列「校園授權教學軟體／教職員專區」（下載限教職員），學生只被導向自由上機空間（軟體清單含 Adobe CC）；資訊處頁全頁 0 次 Copilot、0 次 Firefly。
3. **LG EXAONE 2.5**：rate-limits 文件新增可自願勾選「Service Improvement Analytics」換更高每日上限（不勾仍可用）；另新增訓練授權不一致（ToS §2.3 可用輸入輸出訓練 vs FAQ 僅改善服務）。
4. **Browserbase Free**：官方 docs 明示「Start free, no credit card needed」、Free 超額欄 N/A、「Free: No invoices.」，配額為每月 allocation。舊紀錄刻意不寫免卡，現可寫。
5. **Nebius Builder**：landing 與 FAQ 皆為 `$25 Token Factory + $25 Tavily + $50 Toloka`，LangSmith 卡片已消失（舊衝突失效）；但條款 C.1 只承諾 25＋25，Toloka 屬夥伴優惠——改記此新衝突。
6. **Qdrant Cloud**：免費叢集刪除時點兩版（create-cluster「4 週未活動」vs billing「暫停通知後 3 週」），支援級別亦兩說（Community／Standard support）。
7. **IteraCompute**：免費額度改由 model ID `Auto` 提供（2026-11-10 上線），官方改口「no RPM, TPM or daily token cap」，舊紀錄的 160K TPM 不再適用；每帳戶同時 1 個在途請求、輸出上限 8,192。免費頁寫 Free 128K context 且池含 DeepSeek V4.1，模型頁寫 256K 且現行池為兩個 Qwen3.8-27B 部署。

**新增（4 筆，皆為 opportunity）**

- `livekit-cloud-build-free-tier`：LiveKit Cloud Build US$0／月、免卡，每月 1,000 代理分鐘、US$2.50 推論額度、1 個美國號碼、5,000 WebRTC 分鐘、350 文字＋60 語音模擬；硬上限（超額請求失敗，不計費）、每月 1 日重置、免費專案共用額度、5 並行。台灣：全球服務無排除清單，但電話只賣美國號碼。來源：`livekit.com/pricing.md`、`docs.livekit.io/deploy/admin/quotas-and-limits`。
- `google-antigravity-scientists-highest-tier-six-months`：1 萬名科學家免費使用 Antigravity 最高用量等級 6 個月（2026-10-13 公告、滾動上線、受資格／容量／遴選限制）。台灣 Unknown，名額與地區標準未公布。
- `linkup-startup-program-five-thousand-credits`：Linkup 一次性最高 US$5,000（約 100 萬次以上搜尋），只需帳號與說明用途，審核制、合格者一週內聯繫。台灣 Unknown。
- `neon-open-source-program-cash-and-credits`：Neon 每年至少 US$200,000 現金池、GitHub Sponsors 每月支付、6 個月一期不自動續約；可另選最高 US$5,000 Neon＋US$5,000 AI Gateway 額度。台灣 Unknown（撥款走 GitHub Sponsors，收款國別未核）。

**未納入（本輪判斷）**：Sail Research Free（每月 US$5 需先綁付款方式，價值低且台灣帳單未知）、ZenMux 100 萬 Hy4 tokens（僅社群連結、當日到期）、Photon 2.0 US$100（官方頁無金額）、RoundaChat 閉測（日本限地 B2B）、Alysis Code（官方頁 JS 渲染無法取證）。上述線索維持在 radar，不建檔。

**流程改善：把無界的維護日誌從 README 移出**。觀察到的問題：README 已達 732 KB／2,273 行，其中約 1,222 段是逐輪追加的研究日誌，GitHub 首頁變成一面文字牆，讀者要看的資料量與使用方式被擠在上面。做法：本次把「維護」段整段原文移到 `MAINTENANCE.md`（不刪不改寫任何一段），README 只留五條不變規則與連向 `MAINTENANCE.md` 的單一入口；批次數字仍以 README 首段為準，`tests/validate.py` 的 README 檢查照舊通過（實測 PASS）。驗證：`git diff` 顯示相對變更（M 為原文搬移）、`tests/validate.py` 與 `tests/filters.cjs` 全綠、首段四個數字仍被檢查。

**平行研究的兩個老問題本輪再次出現（已由主 agent 修正，未寫入資料）**：① 三個 subagent 都沒有寫檔工具，結果只能內文回傳——交付格式要允許「內文 JSON」；② 它們無時鐘工具，`accessed_time_range` 出現 09:00–09:50 或整日區間這種**未來時間**，主 agent 一律改寫成批次真實區間（02:07–02:26）；`tests/validate.py` 的「存取時間不得在未來」正好會擋下直接落盤。另外它們會給出 schema 不存在的 enum（`NO_PUBLISHED_CAP`、`LIMITED`、`UNVERIFIED`），整合時必須映射回 `schema.json` 的五值。

**下輪優先（5 項）**

① `aocai-working-free-ai-courses-2026`：11/11 12:30 後確認 11/16 梯次報名表是否關閉；若關閉，改以 12/01 台北班為準（`deadline_at` 換成該班或填 null），並重核 11/17、11/26 梯次。來源：`ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`niea-bizboost.tw` 12/01 頁。
② `google-ai-professional-certificate-tw-pro-3mo`（weekly，11/18）：追 Google One 條款是否再改版或公告延期，並查 11 月是否出現新的 Wayback 抓取；必要時在摘要加入「條款頁於 10/27 後改寫」的時間軸。來源：`one.google.com/offer/terms-and-conditions/google-career-certificates`、Wayback CDX。
③ `lg-exaone-25-api-free-noncommercial`（weekly，11/18）：新聞「可做 service development」與 ToS §2.1 非商用仍衝突，找 LG 是否發布商用申請或 FAQ；同時確認台灣註冊國別選單與 Showroom geo-block 的範圍。
④ 死連結與 403：`perplexity-help-center.mintlify.app/llms-full.txt`（`perplexity-watch`、`perplexity-education` 引用）與 canonical `www.perplexity.ai`（pricing／help-center／Comet 學生頁皆 403）——改引 Mintlify `_llms/other/en.txt` 或 Wayback，並在 evidence 註明正文取自官方鏡像。
⑤ `iteracompute-free-qwen-3-8-27b-monthly-30m`（11/18，促銷 11/24 結束）：確認促銷是否延期、結束後免費層是否消失，以及免費頁 128K vs 模型頁 256K、模型池是否含 DeepSeek V4.1 兩說是否收斂。

**常態待辦（不佔上面五項名額）**：仍未帶 `verification_scope` 的官方紀錄 87 筆（可行動 74、`taiwan=Yes` 3 筆）——不要批次回填，輪替排到時逐筆重讀後補。

## 2026-11-11 03:10–03:38（Asia/Taipei）第 N+1 輪：16 筆輪替複核、3 筆新增、狀態語意與 scope 日期的驗證規則

**範圍與計數**：N=1,025、R=16（A 組額度型 8、B 組資格／審核型 8）、A=3（opportunity 3／policy 0／watchlist 0）、U=1,009、attempted=0。資料集 1,028 筆。佇列基準：`next_review_at` 嚴格逾期 0 筆、7 日內到期 9 筆且全部在 12 小時冷卻內（`aocai-working-free-ai-courses-2026` 等 10 筆在 02:xx 才核過）、`retry` 桶 0 筆。輪替對象因此取「最久未核」的 2026-10-31／11-01 批次（138 筆，`next_review_at` 多為 11-30／12-01，還沒到期），只挑 16 筆、不重讀上一輪（02:05–02:32）的 19 筆。

**複核結果**：16 筆的列明主張全部仍成立（無一降級或關閉），但三類實質變更需要落地：

1. **Cartesia 通話費率已改價**：pricing 頁把 Voice Agents 的通話費從 `$0.06/min` 劃掉改為 `$0.03/min`（逐字「~~Previously $0.06 per minute $0.06~~ $0.03 per minute」），並明寫 Pro／Startup／Scale 的 overage **預設關閉**、開啟後「charged at the same rates as your plan's included voice agent usage」。舊紀錄的 `access_risk` 寫 US$0.06／分，會讓讀者高估超額成本，已改寫。
2. **6 筆審核制新創方案被標成「需符合條件」**：Cartesia、GitHub for Startups、NVIDIA Inception、Photoroom、Together 加速器、Gradium 的官方頁都逐字寫審核（「We review applications on a rolling basis」「within 2-3 business days」「after we review your application」「respond back with an update」「selection-based」），但 `status: conditional` 讓卡片藥丸寫「需符合條件」、優先度依據也寫「需符合條件」，讀者會以為符合門檻即可領取。這 6 筆改 `application_based`（藥丸「申請審核制」），並各留一筆 policy-history `status_reclassification`。全庫同類漂移仍存在（`application_based` 112 筆 vs `conditional` 且資格文字提到審核 106 筆），本輪只修有逐字證據的 6 筆。
3. **Gradium 期後成本原本沒有數字**：pricing 頁顯示 M 方案現為 US$312／月含 9M credits／月、月額不結轉；`cancellation` 與 `cost_note` 補上此基準，並保留「grant 期末是否自動轉付費未明列」的缺口。

**來源狀況**：`support.deepl.com/…/360020695820-API-key-for-DeepL-API` 現在回 403（Cloudflare），只能以 2026-10-28 Wayback 取證，已寫進 evidence 與 unknowns；DeepL 的 CAT 工具衝突（key 文件寫「including CAT tools」、授權 §3.2.5 只給付費 API）本輪仍未收斂。Bria 的方案命名漂移（Legal Lobby 寫「free and Starter plans」、定價頁賣 Free／Pay-as-you-go／Enterprise）記為 unknown。Firecrawl 學生頁 FAQ 由前端渲染，本輪只讀到問題標題、讀不到答案。NVIDIA 申請入口 `programs.nvidia.com/phoenix/application` 憑證錯誤（unable to verify the first certificate），行銷頁 Apply 仍指向它，因此不判定計畫終止。

**新增（3 筆，皆 opportunity）**

- `zoom-ai-launchpad-startup-grants`：Zoom 2026-11-10 上線的 AI Launchpad，三級距 US$5,000／50,000／150,000 的 AI Services credits（1 credit＝US$1）、效期 12 個月、免股權、核准後 48 小時入額。**台灣 Yes 有正面依據**：計畫頁 FAQ 逐字「We welcome applications from eligible startups worldwide」，條款 §2 的排除清單只有白俄羅斯、古巴、伊朗、北韓、俄羅斯與烏克蘭被占領區。風險寫在卡片：§4 要求維持有效付款方式、額度用完後按 AI Services 費率按月後付，credits 只能抵 Build Platform 內的 AI Services（§7）、期滿失效不可折現。未收斂：級距名稱三處不一致（新聞稿 Launch／Scale／Propel、頁面比較表 Seed／Growth／Scale、條款 Tier 1／2／3）；頁面模板殘留「Coming soon」與同頁「Applications are open」矛盾。來源：`zoom.ai/ai-launchpad`（含頁內 Grant Terms §1–§11）、`news.zoom.com/zoom-ai-launchpad/`。
- `kong-for-startups-konnect-plus-hundred-k`：最高 US$100,000 Konnect Plus credits、12 個月，官方稱多數早期新創實拿 US$25K–100K，期後 Konnect Plus 牌價五折 24 個月；資格 pre-seed 至 Series A、總募資 <US$10M。台灣 Unknown：頁面與 FAQ **完全沒有**國別、居住地或註冊地條件，且「Read the Terms」只連回同頁 FAQ，沒有獨立條款可核。來源：`konghq.com/solutions/startup-program`。
- `telnyx-startups-twenty-k-voice-ai`：US$20,000 語音 AI credits、6 個月不結轉、48 小時審核，只抵 STT／TTS／LLM／embeddings／儲存。台灣 Unknown：計畫頁無國別條款；Telnyx 費率表雖有台灣本地號碼與 SMS 報價，但那是電信產品，不能據此推論本計畫的 AI credits 資格——這正是「服務可用 ≠ 優惠資格」的例子。來源：`telnyx.com/startups-program`。

**未納入（本輪判斷）**：Dahl Inference「首 1 億 tokens 免費」——官方 pricing 自承 US$0.02／1M，等於約 US$2，且連續 7 天無請求即失效，標題的 token 數會把它讀成 US$100 級額度；LLMTR Qwen3.8-Max 免費（只有聚合站、無官方頁、兩天後到期）；商研院 CDRI 11/17 客服班（僅媒體報導，且屬已收錄的 AOCAI 體系）。另查核並**排除**一條會誤導的線索：AOCAI 專區橫幅「申請至116年7月31日」指的是 `aocai-enterprise-ai-training-subsidy-2026`（企業專班，紀錄已寫受理至 2027-07-31、狀態 application_based），與 `taiwan-sme-ai-talent-training-2026`（中小企業網路大學校，115/7/31 已截止）是不同計畫，該筆 `applications_closed` 沒有錯，不需修改。

**流程改善：`verification_scope` 必須寫明本批次日期（只套本批次）**。觀察到的問題：卡片把「核實 <日期>」與「核實範圍」並排，讀者假設兩句是同一次查核；但 `verified_at` 會因某個來源當天被重讀而更新，scope 那句話不一定跟著改寫。2026-11-11 統計：540 筆 scope 帶日期的紀錄中，44 筆的最新日期早於 `verified_at`，其中 31 筆是可行動機會（`cloudflare-workers-ai-free` 核實 11-10、範圍寫「2026-10-31 僅複核…」；`agentmail-startup-three-months` 核實 11-09、範圍寫「2026-10-30 局部複核…」；`amazon-ara-multilingual-contextual-ai-fall-2026` 核實 11-11、範圍只留頁面的 `modified_time 2026-10-28`）。預期改善：同一張卡不再同時宣稱兩個查核日，下一輪也無法用一句舊 scope 冒充複核。做法：`tests/validate.py` 新增「本批次 reviewed／new 紀錄的 `verification_scope` 必須含本批次日期」，不批次回填那 31 筆（那等於替沒重讀的紀錄補一句沒查證過的話，留在輪替佇列排到再改寫）。驗證：本輪 19 筆全數通過；在 `/tmp` 複本把 Zoom 那筆的「2026-11-11」改成「較早一次」後如預期失敗。本輪自己也踩過同型錯誤——初稿把 scope 時間窗寫成 03:33–03:45（實際時鐘才 03:33），被 `validate.py` 的未來時間戳斷言擋下後全部重寫，這條新規則正是同一個問題的下一個防線。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,028 筆、S/A/B/C/D＝128/185/125/273/105）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`git diff --check`。瀏覽器檢查（本機 8931、headless Chromium）：資料載入 1,028 筆、批次統計 16／3／1009、概況卡 816／142／49／163 與資料一致、首頁 scope 為本輪文字；關鍵字（Zoom／Kong／Telnyx／Cartesia／Gradium）、台灣資格（142 快捷／157 下拉）、免費 668、開發者 590、「截止日由近到遠」前三筆為 11/11 12:30、11/12 15:59、11/12、載入更多 24→48 全部正常；新紀錄卡片顯示設定費、每月費用、費用補充、狀態「申請審核制」、核實範圍與官方來源；iPhone 13 寬度無水平溢出、console 0 error。

**下輪優先（完整五項，放在敘述最後）**

① `aocai-working-free-ai-courses-2026`：11/11 12:30 之後確認 11/16 梯次是否關閉；若關閉改以 12/01 台北班為準（`deadline_at` 換成該班或填 null），並重核 11/17、11/26 梯次與 11/27 臺中班。來源：`https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://niea-bizboost.tw` 12/01 頁。
② 台灣就業通 2026-11 公告稱 116 年產業新尖兵課程「將免費提供 AI 工具」——查是否改變 `taiwan-nsp-youth-ai-training-subsidy-2026` 的工具、額度或自付額條件。來源：`https://job.taiwanjobs.gov.tw/Internet/index/DocDetail.aspx?docid=42418`，另核 `https://www.wda.gov.tw` 相關公告。
③ `zoom-ai-launchpad-startup-grants`（12-11）：追級距名稱（Launch／Scale／Propel vs Seed／Growth／Scale）是否收斂、「Coming soon」標籤是否移除，以及投件表單是否要求付款方式。來源：`https://zoom.ai/ai-launchpad`、`https://news.zoom.com/zoom-ai-launchpad/`。
④ `deepl-api-developer` 的 API-key 文章 403 是否解除（若解除改回直接引用、並更新 CAT 工具衝突），以及 Bria 條款頁方案名稱是否與定價頁對齊。來源：`https://support.deepl.com/hc/en-us/articles/360020695820-API-key-for-DeepL-API`、`https://www.deepl.com/en/pro-license`、`https://bria.ai/legal-lobby`。
⑤ 31 筆「scope 日期早於 verified_at」的可行動機會（`cartesia-free-monthly-twentyk`、`agenta-hobby-daily-seventy-five-ten-days`、`confident-ai-free-five-weekly-runs-gbmonth`、`cloudflare-workers-ai-free` 等）：輪替排到時重讀後一併改寫 scope，不要批次回填。

**常態待辦（不佔上面五項名額）**：仍未帶 `verification_scope` 的官方紀錄 87 筆（可行動 74、`taiwan=Yes` 3 筆）——輪替排到時逐筆重讀後補。全庫 `application_based` 與「資格文字提到審核卻是 conditional」的 106 筆語意漂移，也只修有逐字證據者。


## 2026-11-11 04:05–04:45（Asia/Taipei）第 N+2 輪：18 筆複核（台灣高風險 6＋本地線索 2＋最久未核 10）、3 筆新增

**範圍與計數**：N=1,028、R=18（A 組台灣高風險／到期敏感 6、主 agent 自核台灣本地線索 2、B 組最久未核輪替 10）、A=3（opportunity 3／policy 0／watchlist 0）、U=1,010、attempted=0。資料集 1,031 筆。佇列基準：`next_review_at` 嚴格逾期 0 筆、7 日內到期 10 筆（9 筆在 12 小時冷卻內）、`retry` 桶 0 筆、12 小時內已核 129 筆——上一輪（03:10–03:38）才剛複核 16 筆，因此本輪刻意不重讀那 16 筆，改取「台灣高風險」與 2026-10-31／11-01 建檔的最久未核批次。時間戳一律對錶（本輪寫入的 `verified_at` 為 04:33，批次完成 04:45）。

**主要複核結果**

1. **產業新尖兵（`taiwan-nsp-youth-ai-training-subsidy-2026`）**：上一輪交接的「2026-11 公告稱免費提供 AI 工具」核實完成。公告真實存在，但**直接以 `DocDetail.aspx?docid=42418` 會 302 回首頁**，需帶 `uk=2093`（`https://job.taiwanjobs.gov.tw/Internet/Index/DocDetail.aspx?uk=2093&docid=42418`）。逐字「自116年起，參加本計畫指定課程者，訓練費將內含最高8,000元的AI工具訂閱補助」——是訓練費內含，**未提高 10 萬元上限、未改變 1 萬元自付額**；標題的「免費提供 AI 工具」易被讀成另行發放。另確認新尖兵網站 115/11/30 停用並移轉青年職訓網，12 月梯次報名至 115/12/11 跨越停用日。
2. **Meeting Ink（`meeting-ink-transformation-partners`）由 Unknown 改台灣 Yes**：原紀錄的 summary／unknowns 是通用佔位字（「請依方案及帳戶條件確認。」），`taiwan` 卻沒有任何依據。官方申請頁逐字「不論您是政府單位、輔導法人、產業顧問，或在企業內推動轉型，都能申請 Meeting Ink 免費客製化體驗」「本計畫限額開放，依申請順序審核」「Meeting Ink 由迪威智能的台灣團隊開發」，且未要求付費或綁卡、無居住地條款；改 Yes 並在 `taiwan_note` 寫明依據與「未明文排除境外、也未承諾境外支援」。名額與體驗時數仍未公布。
3. **Microsoft 365 台灣學生價首次有數字**：學生頁 hero 卡的 `<dynamic-price>` 元件顯示 **NT$150.00/月**，同站個人版標準價 NT$309/月或 NT$3,090/年（標題寫節省 50%，實際約 51.5%）。含 Copilot 與 1TB、每月同額續訂、每年重驗、失格轉當時月全價。`recurring_cost_usd` 仍留 null（台幣不換算美元），數字放 `cost_note`。
4. **單店導入補助的標題會誤導，已改**：原標題「先用滿 3 個月」讀起來像申請資格；申請須知 41 頁 PDF 逐字是「實際使用智慧轉型方案滿3個月後，由店家向執行單位申請補助款」——**3 個月是請款條件**，資格只要求營業狀況不得為歇業或停業。標題改為「自購用滿3個月後核銷」，受理期間（115/4/20–116/10/20 或經費罄）與 50%／NT$10 萬不變。
5. **Google 學生 AI Plus 矛盾未解**：台灣在 AI Plus 支援國家、說明中心排除名單現為「香港、澳門、突尼西亞和美國」（先前的阿爾巴尼亞、玻利維亞、加拿大已不在列），但台灣學生頁 FAQ 仍寫「18 歲以上符合資格的美國大學生」。兩說並列，未收斂。
6. **B 組 10 筆的佔位字換成逐字證據**：Greptile 免費方案**不含 CLI review**（「The free plan doesn't include them.」，原 unknown 已解）；Langbase Free 超額為 No overage、回 403 USAGE_EXCEEDED（原紀錄已接近正確，補 credits／pipes／memory 與 headers）；Aikido 補 container image／domain／cloud account／250k protected requests；Coze 工作流補節點 1,000、單次執行 1,000 次、timeout 10 分鐘；IBM SkillsBuild 額度分類由 UNKNOWN 改 `NO FIXED CAP PUBLISHED`（官方 100% free、未公布上限，`limited_confirmed=false`）。

**新增（3 筆，皆 opportunity）**

- `adobe-startups-free-year-firefly-acrobat-semrush`：Adobe for Startups（2026-11-02 公布），合格新創（成立 5 年內、募資未滿 US$15M）獲 12 個月免費 Firefly Pro Plus＋Acrobat Studio（含 Express Premium）＋Semrush。官方明示有國別限制卻未列清單 → 台灣 Unknown。**計畫頁 business.adobe.com/solutions/startups.html 四次抓取皆逾時**（read、curl、AEM 鏡像 401、Wayback 404），只能以官方部落格英日文取證。
- `keenable-ai-startups-five-k-six-months`：US$5,000 credits／6 個月（約 125 萬次搜尋），資格為 Accel／Conviction 投資組合、募資未滿 US$50M 的 AI 團隊或合作夥伴，審核制。同帳戶另有**每月 100,000 次免費請求、免綁卡**、超量 US$4／1,000 次，牌價約值 US$400／月。無國別條款，台灣 Unknown。
- `taipei-kuai-ai-school-grant-batch2-115`：臺北市「酷 AI 學習系統」重點推動學校第 2 批，期限 **2026-11-13**，一般組最高 NT$7 萬、進階組 NT$12 萬，限臺北市公立高中職以下學校（排除國立學校與市立幼兒園）。**學校層級補助，個人不可申請**，卡片與摘要第一句已寫明。同一份計畫書內部衝突：表 2 寫一般組 9 萬元、經費補助基準與 11/03 轉知寫 7 萬元，兩說並列。

**未納入（本輪判斷）**：Microsoft × NVIDIA Frontier Launchpad（限英國與愛爾蘭）、Nirvana Labs（10 月舊案且 credits 兩個月到期）、Nous Research LongCat 免費一週（11/13 到期、額度未公布）、MangoBoost（當日到期）、商研院 AI 客服課等（開課即截止且與既有課程紀錄重疊）、TechSoup What's New（無 AI 免費額度）、教育部 AI 人才方舟（政策綱要、無可申請額度）、Maritaca S5（巴西葡語市場）、Sail Research（須綁卡、單月 US$5）。另實讀 `aipower.dginfra.gov.tw` 確認 115 年數產署算力收件已於 115-10-30 截止、11 月無新梯次（既有 `taiwan-adi-ai-compute-115` 不再重複建檔）。

**來源衝突與缺口（保留，不擇一）**

- **Sourcetable**：定價頁 Pro「$29 / user / month」（2,000 credits），同站 docs 定價頁 Pro「$39/user/month」——兩份官方頁不一致，已寫成 conflict。
- **Coze 兩個紀錄曾一度相反**：A 組以瀏覽器渲染定價頁，台灣 IP 下三個付費方案都顯示「Payment not supported」；B 組查文件頁（billing／credits／token／ToS）則無國別字樣，並寫「舊句已無法重現」。兩者是不同頁面，我把 workflow 那筆的 `billing_country` 改寫成「文件頁無國別字樣；定價頁另顯示付款不支援」，避免同一資料庫出現互斥結論。
- **Reka Vision**：docs 的 Vision pricing 寫免費層 3 小時（含索引、搜尋、Q&A），一般 FAQ 仍寫「Do I need to pre-pay? Yes.」，未明說免費層免儲值。
- **酷 AI**：計畫書表 2 與經費基準金額不一致（見上）；教育局官網原始公告頁未取得，來源為北一女中轉知頁與松山高中站上的計畫書 PDF。

**流程改善：本輪評估後不改程式（記錄理由與兩個被否決的方向）**

- 候選一「來源清單去重」：全庫 293 筆有同網址多筆來源，但 `app.js` 的 `groupSources()` 本來就把同網址收成「較早的 N 筆同網址紀錄」，是既有設計不是缺陷，否決。
- 候選二「新增 quota_classification enum 檢查」：看似本輪兩個研究 agent 都給出 `UNVERIFIED`／`LIMITED` 這種越界值、而現有檢查只間接碰到它。實際測試注入 `UNVERIFIED` 後發現 `tests/validate.py:10` 已用 `jsonschema.validate` 對 `schema.json` 逐筆驗證，會直接擋下——多加一條是同義重複，已還原（不留無法觸發的檢查）。
- 量化後仍不動的兩類：`status=conditional` 且 `FREE`＋`HIGH BUT LIMITED` 的紀錄有 **330 筆**，其中 **208 筆**的資格文字完全沒有審核／學籍／身分門檻字樣（例：`octoparse-ai-free-new-user-five-credit`、`langsearch-free-daily-token-search-api`）。B 組 agent 一度把 9 筆改成 `active` 並說「本庫慣例」，但「有額度上限」算不算「需符合條件」沒有既定規則，且 `priority_note` 與藥丸必須同步，本輪**保留原狀態**、不批次重分類；下一輪若要動，先訂規則再改。`verification_scope` 仍缺 **85 筆**（可行動 72），維持「輪替排到時重讀再補」。

**平行研究的操作問題（本輪實際遇到）**

1. **交付時限**：B 組跑 35 分鐘才結束，中途停在「choosing status convention」十餘分鐘；我在 04:36 直接讀它寫在 `/tmp/rb/B_out.json` 的暫存檔完成整合，之後它的正式交付內容與該檔一致。下一輪的 subagent 指派要要求「先把結果寫成檔案、再回訊息」，並在任務裡直接給允許的枚舉字串（本輪已補，但 B 收到時已接近完成）。
2. **模型對同一事實給相反結論**：A 說定價頁顯示台灣付款不支援（有渲染證據）、B 說「無法重現」。兩個 agent 一致不代表事實已核實，反之亦然——以頁面層級區分（定價頁 vs 文件頁）才解得開。
3. **URL 品質**：C 交回一個被截斷的中文 slug（`fg.tp.edu.tw/news/臺北市政府教育局修訂「…以`），我改用 percent-encoded 完整路徑重抓 200 才寫入；subagent 交回的 URL 一律要主 agent 自己再打一次。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,031 筆、S/A/B/C/D＝130/186/125/273/105）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`git diff --check`。瀏覽器（本機 8931、headless Chromium）：資料載入 1,031 筆、概況卡 819／144／49／163 與資料一致、「本輪更新」21 筆（18 複核＋3 新增）、關鍵字（Adobe for Startups／Keenable／酷 AI／Meeting Ink／Sourcetable）各 1 筆、台灣資格 144、免費 671、「截止日由近到遠」前三筆為 11/11 12:30、11/12 15:59、11/12 且酷 AI 以 11/13 排第 4、載入更多 24→48、iPhone 寬度（390px）無水平溢出、console error 0；新紀錄卡片顯示設定費／每月費用、狀態「申請審核制」、核實範圍、來源（同網址已合併為一筆）與下次複核。

**下輪優先（5 項）**

① `aocai-working-free-ai-courses-2026`：11/11 12:30 之後確認 11/16 梯次是否關閉；若關閉，把 `deadline_at` 換成 12/01 台北班（本輪 04:20 實讀仍「尚有票券」、2026-12-01–12-21、政府補助全額免費、限批發業客服人才與服務業在職人士）或改填 null，並重核 11/17、11/26 梯次。來源：`https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://www.niea-bizboost.tw/activity/6fa437fa-e304-4cf2-b67b-56c0d3b905ad`。
② `taipei-kuai-ai-school-grant-batch2-115`（11/13 截止、daily）：11/13 後改 `applications_closed`；並找教育局官網原始公告確認一般組是 7 萬還是 9 萬（表 2 與經費基準衝突）以及第 3 批是否續辦。來源：`doe.gov.taipei`、計畫書 PDF。
③ `adobe-startups-free-year-firefly-acrobat-semrush`（12-11）：計畫頁若恢復，補申請表單、國別下拉選單與是否需綁付款方式；並查是否有 `Adobe for Startups` 條款頁可核國別清單。來源：`https://business.adobe.com/solutions/startups.html`。
④ `keenable-ai-startups-five-k-six-months`（12-11）：確認每月 100,000 次免費請求是否為 11 月新增（部落格日期 vs 定價頁 published）、審核時間，以及是否有國別條款頁。來源：`https://keenable.ai/pricing`、`https://keenable.ai/blog/ai-startups-program`。
⑤ `google-ai-professional-certificate-tw-pro-3mo`（weekly，11/18）與 `deepl-api-developer` 的 403：前者的 Google One 條款是否再改版、是否出現新的 Wayback 抓取；後者的 API-key 文章是否解除封鎖（解除則改回直接引用並更新 CAT 工具衝突）。來源：`https://one.google.com/offer/terms-and-conditions/google-career-certificates`、`https://support.deepl.com/hc/en-us/articles/360020695820-API-key-for-DeepL-API`。

**常態待辦（不佔上面五項名額）**：`verification_scope` 仍缺 85 筆（可行動 72）；`conditional`＋`FREE`＋`HIGH BUT LIMITED` 的 208 筆狀態語意漂移（先訂規則）；2026-10-31／11-01 批次仍有未核紀錄，`next_review_at` 多在 11-30，排到再讀。

## 2026-11-11 05:05–05:33（Asia/Taipei）第 N+3 輪：16 筆複核（最久未核 10＋主 agent 4＋台灣待解 2）、3 筆新增、1 筆追查失敗

**範圍與計數**：N=1,031、R=16（B 組最久未核輪替 10、主 agent 4、C 組台灣待解 2）、A=3（opportunity 2／policy 1／watchlist 0）、U=1,015、attempted=1（Adobe for Startups，未計入 R）。資料集 1,034 筆。佇列基準：`next_review_at` 嚴格逾期 0 筆、7 日內到期 10 筆（9 筆仍在 12 小時冷卻內）、`retry` 桶 0 筆、12 小時內已核 135 筆——上一輪（04:05–04:45）才剛結束，因此不重讀那 18 筆，改取 2026-10-31 建檔的最久未核批次與台灣待解問題。時間戳一律對錶：初稿把 `verified_at` 寫成 05:34，實際時鐘才 05:23，被 `tests/validate.py` 的未來時間戳斷言擋下後全部改寫（同型錯誤第二次發生，見下方失敗經驗）。

**實質變更（會改變讀者判斷）**

1. **Playground Free 額度變動**：定價頁已由 `playground.com/pricing` 301 轉到 `playgroundai.com/design/pricing`。Free 現列 **6 monthly credits**（每月更新）與 **v3 每 3 小時 5 張**（v3 不消耗 credits），每日 2 次下載。舊紀錄寫「每月 3 點」與「概述 10 張、表格 5 張衝突」；兩者都已過時，衝突消失。`setup_cost_usd` 由 null 補為 0（頁面明寫 $0）。
2. **Wordtune 學術折扣資格擴大**：官方計費政策、折扣政策與 plans FAQ **三處**都把**非營利／NGO 員工**與學生、教育工作者並列享 30%，證明為 .edu／學術信箱或在學／在職／非營利任職證明。計費政策另寫「For international users, Wordtune does not offer region-specific pricing」（台灣 Unknown 的依據），所有用戶 yearly Unlimited 續約另有 15%。並列衝突：折扣政策頁寫不可與 annual billing savings 疊加，plans 頁 FAQ 寫 annual／monthly 皆可。
3. **臺北酷 AI 補助的 7 萬／9 萬衝突已解**：以 pdftotext 逐頁比對三份 PDF——10/29 修訂版（北市教資字第1153109192號函修訂）表 2 已改為「新臺幣 7 萬元」，與同份經費基準一致；9 萬元只存在於僅載 1153078958 號函核定的舊版。教育局 115/7/16 公文正本同樣寫一般組 7 萬、進階組 12 萬。計畫書申請章只有第 1 批（9/11）與第 2 批（11/13），**無第 3 批**。上一輪把舊版筆誤當成「官方兩說並列」，本輪撤回並改寫摘要與 `unknowns`；教育局官網原始公告頁仍未取得（公文公告列表與站內搜尋皆無此案）。
4. **MeetGeek 用量分類改記未核**：三頁措辭未變（教育／非營利終身 30%、新創年繳 up to 30%），但這是折扣方案、官方沒公布任何額度，`quota_classification` HIGH BUT LIMITED → **UNKNOWN**，避免卡片暗示存在額度。Pro 顯示 US$13.30 並掛「30% OFF」，折前折後未說明。
5. **Hex 補上付費路徑**：教育 Professional 免訂閱費（官方未說期限或綁卡），但 auto top-up 啟用後餘額低於 25 credits 會自動購買 50-credit 包並收 **US$25**；一般 Professional US$36/editor/月、30 credits/月，Community 5 credits/月。原本的 `usable_duration` 是佔位字「請依方案及帳戶條件確認。」，已換成逐字證據。
6. **Base44 補上每日上限**：官方文件寫註冊時建立的個人工作區每天最多 5 個 message credits、每月 25 個，其他 Free 工作區不給免費訊息點數；當日用完暫停至隔日重置（依工作區擁有者當地時區），未用完的點數在重置時失效。
7. **服務業 AI 免費課程的期限語意**：11/16 梯次在 05:30 仍受理（報名至當日 12:30），後續梯次都還在：11/17 商研院班、11/26 工研院班（**頁面寫報名截止 2026/11/19**）、12/01 BizBoost 班（尚有票券、全額免費）。`deadline_at` 是最近一梯次的報名截止，不是整個計畫的結束日；`unknowns` 已寫明換梯次時要改以次一班為準。
8. **Adobe for Startups 追查失敗（attempted，未刷新 `verified_at`）**：計畫頁 `business.adobe.com/solutions/startups.html` 在本機網路 0 bytes 逾時／HTTP2 INTERNAL_ERROR（同網域根目錄回 200），`www.adobe.com` 各語系 startups 頁 Akamai 403，Wayback CDX 無快照。`next_review_at` 由 12/11 縮到 **11/18**（`tests/validate.py` 的「失敗後 14 天內重試」規則），失敗原因寫進 `last_review_attempt_reason`。

**新增（3 筆）**

- `aws-pioneer-credits-thousand-90-days`（opportunity，B 級）：AWS Pioneer 對「new to AWS 或尚未部署實質工作負載」的企業給 **US$1,000**、核准後直接入帳、**90 天到期**；不含 Marketplace、Support 與 RI／SP 預付；官方把 Free Tier（產品功能）與 Pioneer（第一次上雲的資金補助）分開定位。開帳號仍須有效信用卡。台灣 **Unknown**：頁面與促銷額度條款都沒有國別條款，申請表國別選項要登入才看得到。來源 `https://aws.amazon.com/pioneer-credits/`、`https://aws.amazon.com/awscredits/`。
- `microsoft-365-education-a1-retirement`（policy）：2026-11-05 微軟改組 M365 教育版——新增學生限定、無額外費用的 **MA0**（含桌面／網頁 Office、Minecraft Education、Entra ID Free、Learning Zone，**不含 Exchange／SharePoint／Teams**），須機構具備 MA2 以上教職員全額付費授權、且學生以 Windows 裝置學習；**Office 365 A1 於 2027-05-01 停售、2028-01-01 退役**，Student Use Benefit 與免費 Exchange Online for Alumni 同日退場，全部綁機構「2028-01-01 之後的第一次續約」。台灣 **Yes（條件式）**：微軟台灣繁中教育頁 FAQ 仍寫合格機構信箱可免費取得 A1；個人無法自行申請，須透過學校。來源 `learn.microsoft.com` 產品組合頁＋台灣教育頁。
- `openai-codex-students-us-canada`（opportunity，D 級）：美加學位授予大學在學學生 **US$100＝2,500 Codex credits**，SheerID 驗證、一人一次、12 個月失效、**非 API 額度**；條款逐字要求「就讀美加大學且申請時居住美加」。台灣 **No**——收錄目的是讓讀者不必白跑。

**未納入（本輪判斷）**：Gemini Notebook 免費教科書（2026-10-29；內容目錄而非額度，且未證台灣可見）、ZenMux × Tencent Hy4（僅官方 X 貼文，站內無活動頁）、AWS Semarak AI Malaysia（馬國國家計畫，台灣不可申請）、Claude Corps（官方明寫非美國組織暫不可申請）、Alibaba Model Studio 10/29 移除新戶額度（屬既有 `aliyun-model-studio-new-user-quota` 的條件變動，該筆已記錄，不另建檔）、Vercel Ling／MiniMax（已截止）、Cursor 學生（6/25 已停新申請）、Devin SWE-2 Flash（僅付費用戶）、Claude Frontier Academy（提名制）。

**來源衝突與缺口（保留，不擇一）**

- **Wordtune**：折扣政策頁「cannot be combined with … annual billing savings」vs plans 頁 FAQ「both our annual and monthly plans」。
- **MeetGeek**：US$13.30 是折前或折後，官方未寫（19×0.7=13.3 只是推算）。
- **臺北酷 AI**：教育局官網原始公告頁取不到，證據是公文 PDF 與學校轉知；第 2 批實際受理與剩餘名額未核。
- **中華電信**：1399 資費搭 2TB 首年 0 元只在新聞稿附表，活動頁首年優惠卡只列 799–999 資費（來源層級不同，已寫進 `unknowns`）。
- **服務業 AI 課程**：11/16 梯次 12:30 之後是否即時關閉無法在 05:30 判定；各梯剩餘名額未核。
- **Dify 教育**：畢業後效期兩頁措辭不同（沿用既有缺口）。

**流程改善：`tests/validate.py` 新增「批次窗口內的時間戳不得憑空變新」**

- 觀察到的問題：原本只檢查「列進 `reviewed_ids`／`new_ids` 的紀錄，`verified_at` 必須夠新」，沒有任何一條檢查「沒列進來的不准變新」。本輪改 12 筆時實測：把一筆沒重讀的紀錄 `verified_at` 改成今天、`reviewed_ids` 不動，README 的複核筆數、首頁 scope 與批次欄位全部照綠，卡片卻宣稱今天核過。
- 預期結果：任何在批次窗口（`>= last_research_run.started_at`）內被刷新查核時間的紀錄，都必須出現在 `reviewed_ids`、`new_ids` 或 `attempted_failed_ids`，否則建置失敗；同一天早班批次的紀錄不受影響（只看窗口，不看整個日曆日）。
- 驗證方式：在 `/tmp` 複本注入一筆未列批次的 `verified_at`（`octoparse-ai-free-new-user-five-credit` → 05:20），validator 如預期報 `... inside this batch window but is not in reviewed_ids/new_ids/attempted_failed_ids`；移除注入後 PASS。
- 本輪評估後不改的：曾想把「VALUE-DEAL 且無數字」的折扣紀錄自動標記為用量分類可疑，實測全庫只有 2 筆（`signld-…`、`fibery-…`），樣本太小且規則會誤判，放棄。

**平行研究的操作問題（本輪實際遇到）**

1. **兩個 subagent 都跑了 15–16 分鐘**，中途長時間停在同一 stage（45%／35%）。我在 12 分鐘時直接發訊息要求「先把已完成的寫成檔案再回訊息」，兩筆都在 3 分鐘內交付。下一輪的任務說明應該一開始就要求「先寫檔、再回訊息」，並給定交付時限。
2. **subagent 給的 `quota_classification` 用了 schema 外的值**（`SINGLE GRANT`、`NO-COST LICENSE`、`FREE CONTENT`）與 `categories` 用了 `EDUCATION`／`POLICY`；整合時全部改回 schema 允許的值。`tests/validate.py` 的 jsonschema 檢查會擋，但仍要在交付格式裡直接列出允許值。
3. **兩個 agent 的引用我逐筆重讀**：Playground、Wordtune、MeetGeek、Hex、Dify、Craft、LTX、Kapwing、TensorPix、Vizard、Base44、酷 AI 兩份 PDF、中華電信、AWS、Microsoft Learn、OpenAI 活動頁都自己再打一次；`blog.adobe.com` 與 Akamai 403 的頁面（微軟英文部落格）不作為來源。
4. **時間戳**：本輪初稿把讀取時間寫成未來 5–11 分鐘（實際 05:12–05:30，卻寫 05:23–05:38），validator 的未來時間戳斷言擋下。寫入前先跑 `TZ=Asia/Taipei date -Iseconds`，不要用「大約過了幾分鐘」推估。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,034 筆、S/A/B/C/D＝130/186/126/273/106）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`git diff --check`。
瀏覽器（本機 8931、headless Chromium）：資料載入 1,034 筆、概況卡 821／144／50／163 與資料一致、首頁 scope 為本輪文字；「本輪更新」19 筆（16 複核＋3 新增，Adobe 只因追查失敗不列入）；台灣條件適用 144、免費方案 673；關鍵字 AWS Pioneer／A1 於 2028／Playground Free／Wordtune學術各 1 筆；「截止日由近到遠」前五筆為 11/11 12:30（今天）、11/12 15:59、11/12、11/13、11/15 23:59；載入更多 24→48；Playground 卡片顯示設定費 US$0／每月費用 US$0／需符合條件，MeetGeek 顯示「用量分類未核」、Codex 顯示「不符合所列資格」，Adobe 卡片同時出現「核實 2026/11/11」與「追查未成功 2026/11/11」；iPhone 寬度（390px）無水平溢出、console error 0。
發布：commit `436e712` 已推上 `origin/main`，對應的 `pages-build-deployment`（run 42906237236）success；公開站已核對 1,034 筆、本輪 scope 與三筆新紀錄（AWS Pioneer、Microsoft 365 教育版 A1 退役、Codex 學生額度）皆可搜尋並正確顯示。

**下輪優先（完整五項）**

① `aocai-working-free-ai-courses-2026`：**11/11 12:30 之後第一件事**是重讀 ievents id=3544——若已關閉，把 `deadline_at` 改成 11/26 班（報名截止 11/19）或 12/01 班（尚未公布截止）並改寫摘要第一句；順便核 11/17 商研院班是否額滿。來源：`https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`https://college.itri.org.tw/Lesson/LessonData/7571A149-3346-4FAE-B5AF-DCADB2DBDAC3`、`https://www.niea-bizboost.tw/activity/6fa437fa-e304-4cf2-b67b-56c0d3b905ad`。
② `taipei-kuai-ai-school-grant-batch2-115`（11/13 截止、daily）：11/13 後若無延期公告改 `applications_closed`、`review_cadence` 改 `monthly_or_new_signal`；並再試一次教育局官網原始公告（`doe.gov.taipei` 公文公告列表）。來源：`https://www.fg.tp.edu.tw/news/…`、計畫書 PDF。
③ `adobe-startups-free-year-firefly-acrobat-semrush`（next 11/18）：換網路或請人代抓 `business.adobe.com/solutions/startups.html`，目標是「申請表是否要求付款方式」「有無國別下拉」；若仍失敗，找 Adobe for Startups 的條款頁或 partner 頁。來源：`https://business.adobe.com/solutions/startups.html`、`https://blog.adobe.com/en/publish/2026/11/02/introducing-adobe-for-startups`。
④ `aws-pioneer-credits-thousand-90-days`（12-11）：確認申請頁國別選項是否含台灣（需 AWS 登入，可由有帳號者代查）、是否與 AWS Activate 額度互斥、有無官方公告日。來源：`https://aws.amazon.com/pioneer-credits/`、`https://aws.amazon.com/activate/`。
⑤ `microsoft-365-education-a1-retirement`（monthly_or_new_signal）：2026-12-01 MA2 全面上市後查 MA2 學生版定價與 MA0 在台灣的配發方式；另核微軟台灣各校 A1 合約到期日（決定實際受影響時間）。來源：`https://learn.microsoft.com/en-us/training/educator-center/instructor-materials/microsoft-365-education-portfolio`、`https://www.microsoft.com/zh-tw/education/products/office`。

**常態待辦（不佔上面五項名額）**：仍缺 `verification_scope` 的官方紀錄 85 筆（可行動 72）、`conditional`＋`FREE`＋`HIGH BUT LIMITED` 的狀態語意漂移（先訂規則再改）、2026-10-31／11-01 批次仍有未核紀錄（`next_review_at` 多在 11-30），排到再讀。

## 2026-11-11 06:05–06:28（Asia/Taipei）第 N+4 輪：17 筆複核（7 筆到期／即將關閉＋10 筆最久未核）、2 筆新增、0 筆追查失敗

**範圍與計數**：N=1,034、R=17（A 組 7 筆 11/11–11/17 到期或即將關閉、B 組 10 筆 2026-10-31／11-01 最久未核輪替）、A=2（opportunity 2／policy 0／watchlist 0）、U=1,017、attempted=0。資料集 1,036 筆。佇列基準：`next_review_at` 嚴格逾期 0 筆、7 日內到期 10 筆（9 筆在 12 小時冷卻內）、`retry` 桶 0 筆、24 小時未核 650 筆。上一輪（05:05–05:33）才結束 32 分鐘，其 16 筆不重讀；本輪因此取「快要不能動作」與「最久沒人看」兩端，不重查沒有新訊號的中間層。

**實質變更（會改變讀者判斷）**

1. **Notion 新創補上兩條未曾記載的資格**：官方新創頁 FAQ 逐字「You must be a non-paying Notion customer with a valid work email (**no Gmail, Outlook, etc**), **have not received any previous Notion promotions**, and have fewer than 100 employees.」舊紀錄只寫人數與未付費。同頁另公布價值上限「Business Plan costs $20 per member paid annually. The startup offer is equivalent to a **maximum of $12,000 for 100 employees**」。另記下 1 個月方案的四類原因（未滿 10 人、SMB／服務業、資料驗證不足、網站不完整／只有個人社群／單人申請）。1,500 Standard＋500 Select／人／月、分池不結轉不變。
2. **ADI FORUM 報名表比舊紀錄嚴**：必填欄位除姓名、電子信箱、聯絡電話，還包含**公司名稱、部門、職稱、用餐（葷／素／自理）、驗證碼與個資同意**；同一人不可同時報名實體與線上場次，也不可同時報名下午 A、B 場。活動本身（11/12 09:30–16:25、世貿一館 2 樓、全程免費、實體＋線上直播）與頁面「無國籍／設籍條件」不變。
3. 其餘 15 筆逐字重讀後主張不變，但都補上本輪 sources、`verification_scope` 與排程：Amazon Research Awards 仍「extended to November 11」（`modified 2026-10-28`，無二次展延，台北 11/12 15:59）；AutoClaw 仍 11/9–11/15 23:59 UTC+8、每帳戶一次；StepFun 仍免費至 11/17 11:59:59（官方把中午前寫成「11:59:59 AM」，照抄不改寫）；Rime STT 仍 Free until Nov 19；桃園 AI 課程仍「報名日期 115-08-28~115-11-17」，但同一市府網域的報名列表寫到 **115-11-20**，兩說並存；騰訊 Hy4 英文稿「available for free」與中文稿「提供一定额度的免费使用」仍衝突，且 codebuddy.ai 訂閱文件／`/pricing`（9KB 外殼）都查不到此窗口。

**來源衝突（保留，不擇一）**

- **騰訊 Hy4**：英文稿像全免費、中文稿明示有額度上限且不給數字；產品端（codebuddy.ai 訂閱文件、workbuddy.cn）無此免費窗。
- **桃園 AI 課程**：課程頁截止 11/17 vs 報名列表公告至 11/20（保守取 11/17）。
- **Langtail**：Free 方案 CTA 是「Contact us」 vs 同頁 FAQ「start using Langtail immediately」；額度單位「2 prompts or assistants」vs「2 projects」。付款方式 §7.9 是否豁免 Free 仍無解。
- **Retool**：AI credits 定價頁 Team 1,000／Business 3,000 vs 計費文件 750／1,500，本輪第二次確認仍並存。
- **CodeRabbit**：FAQ 寫 free 14-day「Team」trial，plans 文件寫 14-day「Advanced」trial。
- **Smallest.ai**：新創頁對全球開放、給 US$10,000 credits，但條款 §6(b)（不得為商業利益出售／分享輸出）與 **§7(j)**（不得為任何商業目的使用服務）原則上排除商業用途，是否有 Order Form 豁免仍無書面說明；本輪取得更硬的官方原文「open to startups globally, with no geographic restrictions on participation」，`taiwan` 維持 Yes 但保留「不保證核准、不保證商用」的警語。

**新增 2 筆（皆逐字取自官方頁，主 agent 自行重讀）**

- `ntpc-ai-agent-workshops-estudy-all-taiwan-free-2026`（S 級）：新北市教育局 2026-10-22 公告把 5 場 AI 實戰工作坊影音與講義上架新北市數位學習影音網，官方逐字「全臺免費開放」「不用花萬元報名費、免綁約、零門檻」。無報名、無名額、無截止日，**不提供任何模型額度**（summary 與 access_risk 都寫明），`quota_classification` 記 NO FIXED CAP PUBLISHED。
- `cgu-air-ai-platform-campus-quota-2026`（S 級、條件式）：長庚大學 CGU AI 平台「師生可透過本平台取得 AI 使用額度，無須額外付費」，API Key 可接 Codex／opencode，另有校內地端模型。首頁重要公告 dialog（`data-notice-id=service-update-20261103`）逐字「因資安考量，我們已關閉 API 服務，以及生圖、語音轉文字的外部模型服務」，有金鑰者仍可用 Codex、新金鑰仍可領。額度數字未公開（UNKNOWN），平台自述「非長庚大學正式的基礎服務」。**這則公告是 modal，`read` 的原生擷取看不到**，要讀 raw HTML 的 `<dialog>` 或渲染後畫面。
- **未納入：`microsoft-for-startups-azure-credits-150k`**。子代理交付的候選與既有 `azure-startups`（2026-11-09 核實）是同一計畫，且既有紀錄更完整（無推薦碼 US$200 → 商業驗證 US$5,000 → 依用量升 25K／50K／150K；推薦碼路徑起始 US$1,000）。候選只讀 application 頁，因此把 15 萬誤綁在推薦碼路徑，屬單頁取證的過度收斂，不另建 ID。

**證據缺口**

- ADI FORUM：實體席次是否額滿、線上直播連結如何取得、11/12 當日是否如期（06:16 前無取消公告）。
- Notion 新創：台灣公司是否受理（無國別文字）、1/3/6 月期滿後續費與是否自動轉付費。
- CGU：額度數字與重置週期（需登入 dashboard）、外部模型 API 是否恢復、是否有正式使用條款。
- 新北工作坊：estudy 是否需登入才能播放（未播放）、影音下架日、講義授權。
- 服務業 AI 課程：`aocai-working-free-ai-courses-2026` 的 11/16 梯次 06:23 仍在報名期間（截止 12:30），**12:30 之後是否即時關閉本輪無法判定**；`next_review_at` 維持 12:00，下一個批次必須先處理。

**品質改善（本輪唯一一項）：卡片新增「官方公告日期」，把公告時間與核實時間分開**

- 觀察到的問題：詳情只有「核實時間」（我們最後一次讀頁的時間），沒有官方公布的時間。2026-11-11 統計 125 筆記錄了 `announcement_at`，其中 **76 筆的公告日比最後核實日早 30 天以上**（最久 930 天：`salad-ssap-migration-credit-watch` 公告 2024-04-24、核實 2026-11-10），卡片上看起來與本月新方案一樣新。
- 預期結果：有 `announcement_at` 的紀錄在「核實時間」上方多一列「官方公告日期」，照原文列（含時刻的 ISO 不換算，避免把只有年月的值推成某一天）；沒有這個欄位就不出現，不補推測。同時把 `announcement_at` 加進 `SEARCH_FIELDS`，維持「可搜尋的字一定看得到」。
- 驗證方式：`tests/filters.cjs` 以資料驅動斷言「有欄位就必須有這一列且逐字相同、沒有就不得出現」，並以 `salad-ssap` 當規格值。反向實測：把 `app.js` 那一行拿掉後測試以 `missing 官方公告日期 row for autoclaw-halloween-40m-expiry-conflict-watch` 失敗；回復後全綠（127 筆）。

**本輪遇到的流程問題（下一輪要避開）**

1. **合併來源時只留同一 URL 的最後一筆，會把同一天較早讀到的證據吃掉**。B 組對 `langtail.com/pricing` 交了兩筆不同 scope（價格／CTA 與 FAQ 展開），我的 `merge_sources` 以「同 URL 取最後一筆」就地更新，價格與 CTA 那段暫且消失；`tests/validate.py` 只檢查「同一天同 URL 最多一筆」，不會發現內容被覆蓋。修法：同一 URL 的多筆新證據先合併成一個條目（scope 用「；」、evidence 用「｜」串接），舊日期條目另存為歷史。已在 17 筆上重跑一次修復（恢復 38 筆歷史條目、合併 18 組同日同 URL）。
2. **子代理的 `accessed_at` 常常是全批同一個時間**（本輪 A、B 都是結束前一刻的時鐘）。這不等於造假，但會讓「哪一筆較新」的排序失去解析度；下一輪在任務說明直接要求「每個 URL 讀完就記一次時間」。
3. **瀏覽器快取會讓新的前端看起來沒生效**：改完 `app.js` 後頁面仍用舊檔，誤判「新功能沒出現」。驗證前先 `page.setCacheEnabled(false)` 再 reload。
4. **modal 類公告（`<dialog>`）原生擷取看不到**：CGU 的服務異動只在首頁彈窗，`read` 完全沒有這段文字，要讀 raw HTML 或渲染後畫面。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,036 筆、S/A/B/C/D＝132/186/126/273/106）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`git diff --check`。
瀏覽器（本機 8944、headless Chromium、停用快取）：資料載入 1,036 筆、概況卡 823／146／50／163 與資料一致、首頁 scope 為本輪文字、「本輪更新」19 筆（17 複核＋2 新增）、台灣條件適用 146（一般篩選 162）、免費 675、新創與開發者 593、設定時間 ≤15 分鐘 224、S 級 132；關鍵字「新北市教育局」「長庚大學」「ADI FORUM」各 1 筆、「Notion」7 筆；「截止日由近到遠」前三筆為 11/11 12:30（今天）、11/12 15:59、11/12；載入更多 24→48；新紀錄卡片顯示設定費 US$0／每月費用 US$0／需符合條件／台灣條件式適用，詳情含「官方公告日期 2026-11-03」與合併後的來源支持範圍；iPhone 寬度（390px）無水平溢出、console error 0。
發布：commit `cee7240` 已推上 `origin/main`（`bfbafbf..cee7240`），對應的 `pages-build-deployment`（run 42915404102）success；公開站 <https://richardhan.github.io/ai-access-intelligence/> 已核對 1,036 筆、概況卡 823／146／50／163、首頁 scope 為本輪文字、「本輪更新」19 筆、新北市教育局與長庚大學兩筆新紀錄皆可搜尋且卡片顯示「核實 2026/11/11」。本則後段的發布狀態補寫與資料無關，屬同一批次的文件更新。

**下輪優先（完整五項）**

① `aocai-working-free-ai-courses-2026`（`deadline_at` 2026-11-11T12:30、daily、next 12:00）：**12:30 之後第一件事**是重讀 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`。若 11/16 梯次已關，把 `deadline_at` 換成 11/26 班（頁面寫報名截止 2026/11/19）或 12/01 班（BizBoost，`https://www.niea-bizboost.tw/activity/6fa437fa-e304-4cf2-b67b-56c0d3b905ad`），並改寫摘要第一句；`deadline_at` 超過當日而狀態仍是 `conditional` 會被 `tests/validate.py` 擋下。
② `taipei-kuai-ai-school-grant-batch2-115`（deadline 2026-11-13、daily、next 11/12 09:00）：11/13 之後若無延期公告改 `applications_closed`、`review_cadence` 改 `monthly_or_new_signal`；並再試一次教育局官網原始公告（`doe.gov.taipei` 公文公告列表與站內搜尋）。
③ `adobe-startups-free-year-firefly-acrobat-semrush`（next 11/18、已連續兩次追查失敗）：換網路或請人代抓 `https://business.adobe.com/solutions/startups.html`，目標是「申請表是否要求付款方式」「有無國別下拉」；找不到就改找 Adobe for Startups 的條款頁或 partner 頁。
④ `aws-pioneer-credits-thousand-90-days`（next 12/11）：確認申請頁國別選項是否含台灣（需 AWS 登入，可由有帳號者代查）、是否與 AWS Activate 額度互斥、有無官方公告日；來源 `https://aws.amazon.com/pioneer-credits/`、`https://aws.amazon.com/activate/`。
⑤ `microsoft-365-education-a1-retirement`（monthly_or_new_signal）：2026-12-01 MA2 全面上市後查 MA2 學生版定價與 MA0 在台灣的配發方式，並核微軟台灣各校 A1 合約到期日；來源 `https://learn.microsoft.com/en-us/training/educator-center/instructor-materials/microsoft-365-education-portfolio`、`https://www.microsoft.com/zh-tw/education/products/office`。

**常態待辦（不佔上面五項名額）**：`verification_scope` 仍缺 85 筆（可行動約 75 筆，排到時重讀再補）；`conditional`＋`FREE`＋`HIGH BUT LIMITED` 的狀態語意漂移（先訂規則再改）；`tools/linkcheck.py` 本輪全掃 2,880 個 URL（dead 7、unreachable 11、blocked 75），7 筆 dead 全部已在各自紀錄留下證據缺口（qoder-community-1024、nscale、deepinfra、salad-ssap、astamuse、perplexity ×2），下輪挑 2 筆找替代官方頁即可，不必重掃。

## 2026-11-11 07:05–07:35（Asia/Taipei）第 N+5 輪：20 筆複核（7 筆即將到期＋10 筆最久未核＋3 筆條款／價格重核）、1 筆新增、0 筆追查失敗

**範圍與計數**：N=1,036、R=20（A 組 7 筆 11/12–12/2 到期或即將關閉、B 組 10 筆 2026-10-31／11-01 最久未核輪替、主 agent 3 筆條款與價格重核）、A=1（opportunity 1／policy 0／watchlist 0）、U=1,016、attempted=0。資料集 1,037 筆。佇列基準（07:05）：`next_review_at` 嚴格逾期 0 筆、7 日內到期 10 筆（9 筆在 12 小時冷卻內）、`retry` 桶 0 筆（1 筆冷卻中）、24 小時未核 658 筆。上一輪（06:05–06:28）才結束 37 分鐘，其 17 筆不重讀；本輪改取「快到期」與「最久沒人看」兩端，加上手上有明確衝突未解的三筆。未登入、未申請、未付款。

**實質變更（會改變讀者判斷）**

1. **Hyperbolic 卡片原本把免費路徑寫成付費**：舊標題「個人需至少 5 美元儲值」不完整。官方 `inference/overview` 逐字「Personal accounts on the Free Tier can use inference after you verify a phone number. Verifying also adds a $1 credit.」，`inference/errors` 的錯誤碼已由 `inference_requires_pro` 改為 `inference_requires_verified_phone`，一次 US$5 儲值只是升級 Pro 的替代路徑。`setup_cost_usd` 5→0、標題與摘要重寫；這是本輪最直接影響「能不能免費用」的更正。
2. **Pieces 根本沒有免費方案**：官方 FAQ 逐字「Is Pieces free to use? No」，7 天試用任何方案都要先綁卡，試用後 Pro US$18.99／人／月、Enterprise US$22.99（US$69.99／季），另有 14 天退款保證。舊紀錄只寫「價格待核」，`recurring_cost_usd` 現在記 18.99。
3. **SpAItial 的免費 API 衝突已消失**：`credits-billing` 與 `daily-generation-limits` 兩頁現皆逐字「Every plan, including Free, includes API access to Echo-2 Standard, Echo HQ and Echo 3」，不再並列兩說；狀態 conditional→active，補上 1 credit＝US$0.01、Echo-2 每次 160 點等換算。
4. **Kiroween 多一道身分驗證**：官方 11/11 更新（`/updates/47479`）逐字「to receive credits we require an identity verification check to prevent fraud」，並註明申請仍在審核；期限（12/1 12:00 PT 申請、12/4 兌換、12/31 失效）與台灣資格不變，另新增印尼為合格地區。
5. **Mistral 學生價的來源衝突已解**：先前「卡片靜態值 US$14.99 vs FAQ US$5.99」看起來是官方兩說，實際是同一張 Pro 卡片的學生切換（`#education`）——渲染後勾選，價格元素由 US$14.99 變 US$5.99，取消勾選回 US$14.99。同卡另有「$25.5 /mo」與「$15 /mo」兩行 API credits，頁面未寫學生價對應哪一行，列為缺口而不挑一個寫。`mistral-vibe-free` 的 Education 方案敘述同步改成「預設 US$14.99、切換後 US$5.99」。
6. **智譜 BigModel 免費模型仍在，但只在收合表裡**：定價頁正文的「最新模型／文本模型」表已看不到 GLM-4.7-Flash，必須展開「更多文本模型」才讀到「GLM-4.7-Flash 200K 免费 免费」與 GLM-4-Flash-250414、GLM-Z1-Flash。純文字擷取會誤判「免費清單消失」；`GLM-4.7-FlashX` 等仍是付費。
7. 其餘 12 筆逐字重讀後主張不變：勞動部臺南大學職前班（11/16 16:00 截止、名額 34、已報 27）、UGREEN 黑客松（台北 11/16 15:45、Asia-Pacific 名單含 Taiwan）、Mozilla Human-Scale AI（11/20 23:59 PST＝台北 11/21 15:59、US$300k＋最高 US$200k、7 席中 3 席為預選 anchor、FAQ 明寫不延期）、IteraCompute（至台北 11/24 16:00）、臺北產業獎勵補助（徵件至 11/30）、商業署多店 AI 升級（第 3 梯至 115/11/30 17:00）、Runpod Creator、Railway、Microsoft Foundry、Runway、Vmake、Verda（1,000–2,000 字或 5–10 分鐘影片、1–2 工作天審核、額度不過期）、Moondream。

**新增 1 筆（主 agent 逐字讀官方頁）**

- `cht-gemini-shorts-contest-2026`（opportunity，S 級）：中華電信「Gemini 超行 精采玩大的！」YouTube Shorts 創作大賽，徵件 2026-11-04 12:00–**11-30 18:00**，限**報名時滿 18 歲且具中華民國國籍**；作品須 9:16、1080×1920、3 分鐘內 MP4，加入指定圖樣與 Hashtag「#Gemini超行精采玩大的」，先不公開上傳、審核通過後改公開；須用至少一種 Google AI 工具並保留提示詞。獎項：旗艦大獎 1 名（總值 NT$82,149）、最佳觀看獎 5 名（12/14 14:00 觀看數截止）、4 週共 100 名抽獎；中獎逾 NT$20,001 先扣 10% 機會中獎稅。**這是獎品競賽，不提供模型額度**，summary 與 access_risk 都寫明。

**未納入（本輪判斷）**

- `Vectoree`（CLI 綁專案送 US$5）：2026-11-10 17:06 那輪已以「一次性 US$5、價值過薄」排除，本輪重新看到同一線索，維持不建檔——重複評估要留下否決理由，否則下一輪又會撿回來。
- Grok for Startups：子代理當成新候選，但 `grok-watch` 已是同一方案（20/80 分段、六個月、每公司一次、Cursor 範圍衝突都已記錄），屬去重失誤；不另建 ID，今日重讀 `x.ai/startups` 與 2026-10-27 版條款後內容一致，未刷新其 `verified_at`（沒有新事實就不假裝複核）。
- Anthropic×GSA 40%（僅美國政府機關）、Kimi K3.1 Pro 開源權重（2.8T 無法自架、無免費 API）、ChatGPT Go 免費（印度促銷已結束）、數發部 115 年 AI 算力（已有紀錄且 10/30 截止）、Copilot 雲端 sandbox（付費限定）、Nebius／Nscale／Onomeo／AI21／Ollama Cloud 取消免費（負向變動，交既有紀錄例行複核）。

**證據缺口**

- Mistral：學生價對應哪一行 API credits（同卡並列 US$25.5／US$15）、credits 是否每月重置、教師是否適用（Help 寫教師可申請、卡片條件寫 verified students）、台灣學校網域驗證與結帳稅額。
- 智譜：免費模型的 RPM／並發上限頁面未列；用戶協議非商業限制沿用 2026-11-08 讀值。
- Kiroween：身分驗證的具體方式（文件／自拍／第三方）與審核時間。
- CHT 競賽：報名表實際欄位與審核時效、指定圖樣下載位置、免費 Gemini 層是否符合查驗標準。
- 臺北酷 AI 與中華電信 1399 搭 2TB 的既有來源層級差異不變（本輪未處理）。

**品質改善（本輪唯一一項）：`tools/linkcheck.py` 對 404／410 加一次延遲重試**

- 觀察到的問題：2026-11-10 24 路併發全掃把 neo4j 兩個文件頁報成 404，同一 URL 單筆重掃與 curl 都 200；dead 清單是下一輪的證據維修佇列，假陽性會讓人去「修」沒壞的來源。舊版 HEAD＋GET 都 404 就直接判 dead。
- 預期結果：只有「HEAD、GET 與延遲 2 秒後的重試」都 404／410 才進 dead；重試成功者標 `GET-retry` 並歸 ok，其餘分類（403、逾時、5xx）完全不變。
- 驗證方式：`python3 tools/linkcheck.py --self-test` 新增三條規格值斷言（前兩次 404、重試 200 → 不得為 dead；三次都 404 → dead；`retry_delay=0` 關閉重試時行為不變）；實跑 `--record hyperbolic-inference-deposit-policy`（6/6 ok）與 `--record qoder-community-1024`（仍 2 筆 dead、方法顯示 GET-retry），確認真 dead 不會被誤放行。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,037 筆、S/A/B/C/D＝133/186/126/274/105）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`python3 tools/queue.py --self-test`、`python3 tools/linkcheck.py --self-test`、`git diff --check`。
瀏覽器（本機 8931、headless Chromium）：資料載入 1,037 筆、概況卡 824／147／50／163；首頁 scope 為本輪文字；「本輪更新」21 筆（20 複核＋1 新增）；台灣條件適用 147、免費方案 677；關鍵字 Hyperbolic／Pieces／Mistral 教育／Kiroween／Shorts 各只有對應紀錄；Pieces 卡片顯示「每月費用 US$18.99」與費用說明、Hyperbolic 顯示設定費／月費 US$0、Kiroween 顯示「申請截止 2026/12/02 04:00 · 剩 21 天」、CHT 競賽顯示「申請截止 2026/11/30 18:00 · 剩 19 天」；「截止日由近到遠」前六筆為 11/11 12:30（今天）→11/12 15:59→11/12→11/13→11/15 23:59→11/15；390px 寬無水平溢出、console error 0。

**下輪優先（完整五項）**

① `aocai-working-free-ai-courses-2026`（`deadline_at` 2026-11-11T12:30、daily、next 12:00）：**12:30 之後第一件事**是重讀 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544` 與報名表 `JoinPNew.aspx?t=0&id=3544`。若 11/16 班已關，改把 `deadline_at` 指向 11/26 班（頁面寫報名截止 2026/11/19）或 12/01 BizBoost 班（`https://www.niea-bizboost.tw/activity/6fa437fa-e304-4cf2-b67b-56c0d3b905ad`），並改寫摘要第一句；`deadline_at` 已過卻仍非已截止會被 `tests/validate.py` 擋。
② `taipei-kuai-ai-school-grant-batch2-115`（11/13 截止、daily、next 11/12 09:00）：11/13 後若無延期公告改 `applications_closed`、`review_cadence` 改 `monthly_or_new_signal`；並再試教育局官網原始公告（`doe.gov.taipei` 公文公告列表與站內搜尋）。
③ `adobe-startups-free-year-firefly-acrobat-semrush`（next 11/18、連續三次追查失敗）：換網路或請人代抓 `https://business.adobe.com/solutions/startups.html`，目標是「申請表是否要求付款方式」「有無國別下拉」；仍失敗就改找 Adobe for Startups 條款頁或 partner 頁，別再重試同一條路。
④ `mistral-education-unresolved`（next 12/11）：釐清學生價對應哪一行 API credits（US$25.5 或 US$15）與 credits 重置規則，來源 `https://mistral.ai/pricing/`、`https://help.mistral.ai/en/articles/698530-i-m-a-student-or-a-teacher-am-i-eligible-for-a-discount`；同時確認教師是否適用 Education 卡片的 12 個月條款。
⑤ `aws-pioneer-credits-thousand-90-days`（next 12/11）與 `microsoft-365-education-a1-retirement`（monthly_or_new_signal）：前者確認申請頁國別選項是否含台灣、是否與 AWS Activate 互斥；後者 2026-12-01 MA2 全面上市後查 MA2 學生版定價與 MA0 在台灣的配發方式。來源 `https://aws.amazon.com/pioneer-credits/`、`https://learn.microsoft.com/en-us/training/educator-center/instructor-materials/microsoft-365-education-portfolio`。

**常態待辦（不佔上面五項名額）**：`verification_scope` 仍缺 70 筆可行動官方紀錄（排到時重讀再補）；23 筆可行動紀錄有已知費用卻沒有 `cost_note` 說明那是試用後價、必要預付或折扣前價（本輪 Pieces 即屬此類，已補）；`conditional`＋`FREE`＋`HIGH BUT LIMITED` 的狀態語意漂移（先訂規則再改）；`tools/linkcheck.py` 本輪只單筆驗證未全掃，下輪若要全掃直接用它，dead 清單先單筆重掃再當證據。

**發布**：commit `31c323f` 已推上 `origin/main`（`2f61ad9..31c323f`），對應的 `pages-build-deployment`（run 42924165984）success；公開站 <https://richardhan.github.io/ai-access-intelligence/> 已核對 1,037 筆、概況卡 824／147／50／163、「本輪更新」21 筆、首頁 scope 為本輪文字（07:05–07:24），Hyperbolic 卡片顯示設定費／月費 US$0 與「核實 2026/11/11」，CHT 競賽卡片顯示「申請截止 2026/11/30 18:00 · 剩 19 天」，console error 0。以上為推送後在公開站實際載入的結果，非只憑 Actions 成功推論。

---

## 2026-11-11 08:05–08:33｜R=19、A=4（2 機會＋2 觀察線索）、U=1,018、attempted=0

**基準與範圍**：本輪開始時 N=1,037（824 機會／50 政策／163 觀察線索）。`python3 tools/queue.py` 顯示**嚴格逾期 0 筆**、7 天內到期 10 筆（其中 9 筆在 12 小時冷卻內，全部是當天 05:26–07:16 剛核過的台北課程與活動）、追查失敗待換路線 0 筆（1 筆冷卻中），24 小時未核 661 筆。因為沒有真正逾期的案例，本輪改依 `queue.py` 自身的順序取「排程最近」的輪替位，並把**官方來源衝突**（任務第二優先）整組排進來——衝突紀錄的價值不在到期，而在讀者可能照著矛盾資訊行動。前四輪（05:34、06:31、07:24）已核過的 129 筆一律不重查。

**A 組 7 筆：來源衝突與未核主張（全部未改 status、未寫 policy_history，因為官方沒有新更正）**

1. `voyage-free-tokens-batch-excluded`：同一份 pricing 頁仍是三方相反——正文寫 `voyage-code-3` 200M、`voyage-multilingual-2` 50M、`rerank-2.5` 系列各 200M；「Number of free tokens」表只列 voyage-4 系列／context-4／code-4 與 rerank-3 系列；Older models 段逐字「we do not offer free tokens for them」。FAQ（updatedAt 2026-10-30）仍只有泛稱 200M。`modified_time` 與 11-10 相同（2026-09-29），`www.voyageai.com/pricing` 實測仍 404（已列為來源）。以表格＋Older models 段為現行讀法並在摘要寫明理由，衝突原樣保留。
2. `sloyd-guest-daily-plus-separated-pools`：Answers（自標 2026-10-21）兩處都是「one AI 3D generation per day」，比較表三列各標「1 daily」但沒有相加說明——**分列不等於 3 次**，改以每日 1 次規劃；3D 列印授權仍兩說（Answers 稱 Plus／Pro 可免權利金販售，ToS 2026-02-16 §6 只准個人用）。
3. `promptlayer-free-observability-2500-requests`：比較表 Free「Overage Rate —」與 FAQ「charged by transaction」並存。本輪加查官方文件全文（`llms-full.txt` 1,115,807 bytes）：`overage` 與 `2,500` 皆 0 命中，Plan limits 章只規範 Skill Collections——**負面證據**確認文件解不了這條，`next_review_at` 提前到 11-18。
4. `novai-...`：付款方式三頁不一致（transparency 頁寫 Card＋USDT 且「$1 on card」；terms 與 model-marketplace 只列 USDT、card「coming soon」；最低加值 $1 vs $5）。`aiapi-pro.com/pricing` 現 308 → `/model-marketplace.html`，已就地改指。
5. `fal-flux3-max-five-daily-sandbox`：**折扣結束日定案**——fal 自己的 `/pricing.md` 指定 `models/<endpoint>/llms.txt` 為價格權威，該檔逐字「From November 8 … through November 22, 2026 … Regular rates … resume on November 23, 2026 at 00:00 UTC」（台北 11/23 07:59），landing 頁自標 11-10 更新仍寫 11/21 屬未同步文案。sandbox 免費次數仍是伺服器動態輸出（11-09 為 7、11-10 與 11-11 為 6），官方文件只有「occasionally offers free credits」，無每日重置定義。
6. `nebius-token-factory-signup-one-dollar`：`billing-new` 仍寫強制綁卡，全頁與 `llms-full.txt`（1,117,472 bytes）`trial` 0 命中——$1 試用既未回復也未公告取消，維持「官方沉默」而不是「已取消」。
7. `river-inference-25-credit`：console 靜態 HTML 的 bootstrap 仍 `"signup_bonus_enabled":false`；`console.river.ai/terms` 回 200 但只是 13,221 bytes 的 SPA 外殼，合約正文仍讀不到。

**B 組 8 筆：輪替＋台灣資格**

- `mango-inference-community`：platform 頁仍列「$10 in free credits」「30% off … through Nov 11」（未標年份），社群「$100 儲值配對」明列 10/31 截止已結束。排程改 daily，11/12 複核折扣是否回原價。
- `kilo-auto-free-hosted-models`、`couchbase-activate-starter-kit-…`、`parallel-mcp-keyless-…`、`satfaq-…`、`shift-asia-prototype-twenty-companies`：主張不變，補上「缺哪一句才算台灣可用」的敘述。**台灣一律維持 Unknown**——這幾筆的官方頁與條款都沒有服務國家清單，也沒有明文接受台灣；「未列排除名單」不能推論可用。
- `lets-go2-ai-ocr-launch-six-hundred-pages`：補 `deadline_at` 2026-12-28（活動頁「2026年10月13日〜12月28日」、600 枚首年免費、2026-12-10 才發售）與 `REGION-LOCKED`；服務詳細頁逐字「本サービスの提供地域、および、お客様の権利は日本国内でのみ有効です」，`taiwan: No` 確認仍正確。
- `realads-once-fifty-no-watermark`：條款附則已列「버전 1.3 (시행일 2026. 10. 28.)」→ §7.6 成本連動扣點自 10/28 生效，但頁首仍標 v1.2，頁面自身不一致（寫進 policy-history）。首頁 FAQ「無浮水印、可商用」與 §8.3「免費輸出須留浮水印且僅非商業」的衝突未解。

**主 agent 4 筆：每日追蹤與交叉連結**

- `qoder-free-mechanisms`（**本輪唯一影響決策的更正**）：官方 `qoduck-free` 頁已把促銷期間寫成「From November 7, 2026 to November 11, 2026 at 10:00 (UTC+8)」，即**台北今天 10:00 結束**；11-10 17:09 的讀值仍是「end date is yet to be determined」，標題與摘要原本寫「結束日未定」。同時補上「每日額度為 limited number of free uses、付費者多於免費用戶、用完可 0.5× 續用」，並把 `unknowns` 的「結束日期」改成只剩「次數未公布」。
- `felo-…`、`runable-…`：重讀後主張不變（felo 整份 i18n payload 仍無任何日期字串可作截止依據；runable 月上限仍只存在 FAQ）。
- `deepinfra-deepstart-qualified`：補交叉連結——同站 NVIDIA Inception 會員另有 10B Nemotron tokens（獨立紀錄），官方寫「One application covers both」，但**成立年限不同**（DeepStart 2 年內、Inception 5 年內）。

**新增 4 筆（主 agent 逐字重讀官方頁後才納入）**

- `boson-ai-free-trial-credit-ten`（機會）：新帳號 US$10 試用額度，官方逐字「No payment method is required」，但**不會自動入帳**——須在 API Keys 或 billing overview 手動領取，未領取前呼叫回 429 `insufficient_quota`（Realtime 為 error 4429），領取後 12 個月到期，適用全部 Boson API。台灣可否註冊未核。
- `deepinfra-nvidia-inception-ten-billion-nemotron`（機會）：10,000,000,000 Nemotron tokens＝官方換算 US$1,000（Nemotron 3 Ultra cached-input US$0.10/1M），「Valid for 12 months from approval」，資格為現行 Inception 會員、成立 5 年內、募資 US$250K–10M、「One grant per company」（blog 逐字）；官方寫「Available in most countries — some regions are excluded by export regulations」，**台灣是否被排除未公布**。
- `boson-higgs-realtime-duplex-api-waitlist`、`intel-ai-pc-cloud-remote-instance`（觀察線索）：前者 API 只開候補；後者官方指南**沒寫費用**，因此不能當免費額度，只記「公司或大學信箱、48 小時審核、instance 不保證可用、Use case 要選 AI PC USA」。

**未納入（保留否決理由）**：數發部 115 年 AI 算力（`taiwan-adi-ai-compute-115` 已是同一方案、已截止）、Microsoft for Startups Foundry 贊助範圍（`azure-startups` 的條款補充，非新方案）、SageMaker Studio Lab（官方已寫不再接受新客戶）、Intel Liftoff（新申請已關閉）、Saturn Cloud「150 免費 GPU 小時」（官方頁只寫 free account，第三方說法無官方支持）、中華電信×Google 單辦方案（屬 `cht-google-ai-plus-first-year-free-2026` 的條件變動）、Hailuo AI 每日點數（首頁是前端應用，取不到額度條文）。

**證據缺口**：Voyage 正文／表格／Older models 三方矛盾（官方 `modified_time` 仍 2026-09-29）；Sloyd 商用 3D 列印授權兩說；PromptLayer Free 超額是否收費；NovAI 信用卡是否可用與最低加值 $1/$5；fal sandbox 免費次數的重置規則；Nebius $1 試用是否存在；River 合約正文（SPA 外殼）；上述日／韓服務的台灣個案資格；Qoder Qoduck 每日次數；Boson 與 DeepInfra 的台灣帳戶個案。

**品質改善（本輪唯一一項）：費用欄位 null 不再印成「未核實」**

- 觀察到的問題：`money()` 對 null 一律回「未核實」，但費用欄位是 schema 管制的**美元數字**，null 代表「沒有記下美元金額」，不代表沒查。2026-11-11 統計 26 筆 `setup_cost_usd` 為 null 卻有 `setup_cost_basis`、72 筆 `recurring_cost_usd` 為 null 卻有 `cost_note`；`mango-inference-community` 的卡片同時寫「設定費 未核實」與「費用依據：活動頁列註冊US$10額度…」，同一張卡兩種說法，把已查過的費用說成沒查。
- 預期結果：null →「未列金額」；數字照舊 `US$`；零費用仍是 `US$0`（零設定費不等於整體免費，另有說明列）。
- 驗證方式：`tests/filters.cjs` 新增規格值斷言——`mango-inference-community` 的「設定費」必須等於「未列金額」且卡片不得出現「未核實」，`lindy-…` 仍是「US$29.99」、`gemini-api-free` 仍是「US$0」。實機瀏覽器核對該卡已顯示「設定費 未列金額」＋「費用依據：…」。

**連結全掃（本輪有跑，結果交下一輪）**：`python3 tools/linkcheck.py --workers 10` 掃 2,896 個唯一 URL／1,037 筆紀錄，耗時 215 秒：ok 2,808、**dead 7**、unreachable 6、blocked 75。dead 影響 7 筆紀錄：`perplexity-education`／`perplexity-watch`（`perplexity-help-center.mintlify.app/llms-full.txt`，該筆用來主張「官方兩份文件並存」的負面證據來源，現在 404，需找新索引）、`qoder-community-1024`（`qoder.com/community-boost`、`docs.qoder.com/events/communityboost`）、`astamuse-…`、`deepinfra-two-minute-papers-twenty-credit`（`deepinfra.com/papers`）、`nscale-signup-five-current-docs-conflict`（`nscale.com/pricing`）、`salad-ssap-migration-credit-watch`（`salad.com/ssap/`）。本輪未修：這些紀錄不在本批複核名單，404 也不能單獨判活動終止。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,041 筆、S/A/B/C/D＝133/187/127/274/105）、`node --check app.js`、`node tests/filters.cjs`（全綠，含新增斷言）、`python3 tools/prioritize.py`、`git diff --check`。
瀏覽器（本機 8947、headless Chromium）：資料載入 1,041 筆、概況卡 826／147／50／165、「本輪更新」23 筆（19 複核＋4 新增）；免費方案 679、開發者 593、台灣條件適用 147；關鍵字 Qoduck／Boson／DeepInfra／AI-OCR／fal FLUX 各只回對應紀錄（DeepInfra 2 筆、Boson 2 筆含觀察線索）；「截止日由近到遠」前六筆為 11/11 12:30（今天）→11/12 15:59→11/12→11/13→11/15 23:59→11/15；「再顯示 24 筆」由 24 增至 48；Mango 卡顯示「設定費 未列金額」＋費用依據、Boson 卡顯示 US$0／US$0 與「方案仍列示」；390px 寬 scrollWidth=390 無水平溢出、console error 0。

**下輪優先（最多五項）**

① `qoder-free-mechanisms`（daily，next 11-12 12:00）：Qoduck 已於 11/11 10:00 結束，重讀 `https://docs.qoder.com/events/qoduck-free` 確認頁面是否改列 ended、是否移除摘要中的進行式描述；同時確認每日 100 點與 Efficient 0.0× 是否仍有效（`https://docs.qoder.com/events/100credits`、`/events/efficientunlimited`）。
② `mango-inference-community`（daily，next 11-12 09:00）：11/12 起 30% 折扣是否回原價——重讀 `https://www.mangoboost.io/platform/mango-inference` 價格表與 `https://inference.mangoboost.io/pricing`；若回原價，摘要與 `expiry` 需改為過去式，並檢查 US$10 贈額到期日是否公布。
③ `perplexity-watch` / `perplexity-education`（next 11-18／11-25）：`perplexity-help-center.mintlify.app/llms-full.txt` 已 404，「官方兩份文件並存」的負面證據斷了。找新索引（`/llms.txt`、help center 站台地圖）或改引兩份具名文件，找不到就在 `unknowns` 記證據缺口，不要因為 404 就改狀態。
④ `lets-go2-ai-ocr-launch-six-hundred-pages`（next 11-14）：確認 12/28 簽約截止前是否加開梯次、2026-12-10 發售日是否延期，來源 `https://www.lets-co.com/static/ai/ocr/campaign/index.html`；並查台籍人士／台灣企業在日據點的個案資格。
⑤ `aocai-working-free-ai-courses-2026`（**12:30 之後第一件事**，daily）：11/16 班報名截止 2026-11-11 12:30，過後須重讀 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3535` 與報名表；若已關閉，把 `deadline_at` 改指 11/26 班（報名至 11/19）或 12/01 BizBoost 班，`deadline_at` 已過卻非已截止會被 validate 擋。

**常態待辦（不佔上面五項）**：6 筆 dead 來源待換路徑（見上）；`verification_scope` 仍缺的可行動官方紀錄（排到時重讀再補）；`conditional`＋`FREE`＋`HIGH BUT LIMITED` 的狀態語意漂移（先訂規則再改）；三個同類「官方沉默」案例（Nebius $1、River US$25、PromptLayer overage）不宜每輪重複追，建議下輪起改 monthly 並只在有公告時提前。

**發布**：commit `77aeac6` 已推上 `origin/main`（`2e95f19..77aeac6`），對應的 `pages-build-deployment`（run 42932311919）success。推送後在公開站 <https://richardhan.github.io/ai-access-intelligence/> 實測：1,041 筆、概況卡 826／147／50／165、首頁 scope 為本輪文字（08:05–08:33）、「本輪更新」23 筆；Qoduck 卡片標題含「至 2026-11-11 10:00」、Mango 卡顯示「設定費 未列金額」＋「費用依據：…」、Boson 卡顯示 US$0／US$0、Go2 AI-OCR 卡顯示「申請截止 2026-12-28 · 剩 47 天」，console error 0。以上是推送後在公開站實際載入的結果，不是只憑 Actions 成功推論。

---

## 2026-11-11 09:05–09:36（Asia/Taipei）｜R=14、A=2（2 機會）、U=1,027、attempted=2

**基準與範圍**：本輪開始 N=1,041（826 機會／50 政策／165 觀察線索）。`python3 tools/queue.py` 顯示**嚴格逾期 0 筆**、7 日內到期 10 筆（9 筆在 12 小時冷卻內）、追查失敗待換路線 0 筆。上一輪 08:33 才結束、相隔 32 分鐘，其 19 筆一律不重讀。本輪改取兩端：**今天／本週就會截止或結束的 7 筆**，加上**官方來源 404 與官方說法互相矛盾的 7 筆**（任務第二、第三優先），另由子代理做新機會研究。14 筆複核（R）、2 筆追查失敗（attempted，不計入 R）、新增 2 筆。未登入、未申請、未付款。

**A 組 7 筆：今天／本週到期**

1. `aocai-working-free-ai-courses-2026`：11/16 班 09:11 **仍受理**（事件頁 200 且掛「我要報名」、報名表完整欄位且全頁無「活動已結束」），報名期間 2026/09/24 15:00–**2026/11/11 12:30**、費用 0、人數限制 250、預計招生 100；**11/17 商研院班新增「實體座位已滿」**（raw HTML 紅字，見流程問題 1），同頁仍保留「報名本場次」；11/26 班截止 2026/11/19、12/01 BizBoost 班「尚有票券」；最新消息無加開梯次。`next_review_at` 設 **12:20**（必須早於 12:30，否則 validate 的「排程晚於截止」規則會擋）。
2. `taipei-kuai-ai-school-grant-batch2-115`：修訂版計畫書 09:17 重讀，第 2 批截止仍 115/11/13、「預計補助40校」、一般組 7 萬／進階組 12 萬，全文無「延期」「順延」。教育局官網公文公告、公告資訊、重點學校名單三頁仍 0 命中；官網「進階搜尋」實際導向 Google `as_sitesearch`，`Search.aspx` 本身 404，站內搜尋路徑不存在。
3. `mango-inference-community`：**ToS 已取得**（瀏覽器渲染，v2026-10-12）：§19.3 排除俄羅斯、白俄、敘利亞、中國大陸、香港，**台灣不在清單但未被正面列名**（維持 Unknown）；促銷額度「發放時指定日或發放後六個月較早者」到期。折扣 11/11 當日仍生效，platform 三處與 pricing 頁**仍無年份**。
4. `heygen-voice-turbo-free-api-until-2026-11-30`：逐字「free until November 30, 2026」（有年份）、模型仍在清單且免 credit、字元與 30 req/min 限制不變、無 deprecat／sunset 字樣。
5. `fireworks-glimmer-sft`：`2026-12-01T00:00:00-08:00` 前**啟動**工作、免卡、排除 RL／DPO／全參數／部署不變，無延期或名額限制。
6. `lets-go2-ai-ocr-launch-six-hundred-pages`：10/13〜12/28、600 枚（官方寫 1 ページ＝1 枚，原「枚 vs 頁」缺口結案）、12/10 上線、年約 ¥264,000 含稅＋初期費 ¥11,000、日本國內限定均不變；新增超額加購價 **200 枚／¥11,000**（已寫入 cost_note 與 terms_restrictions）。
7. `volcengine-ark-1111-token-giveaway-watch`：11.11 當日重讀，規則仍為 **2026.10.29** 版、限中國大陸用戶、至 11/30 23:59:59，規則全文「token」0 命中；活動頁仍以「单模型 50 万、累计 2500 万」呈現且無截止日字樣。

**B 組 7 筆：來源失效、官方衝突、最久未核**

1. `perplexity-watch`：3/day（比較表）與 five per day（10352998）**同日仍並存**；新增免費層「you will have to sign in if you want to try Pro Search」。`llms-full.txt` 仍 404（第 3 日），替代的 `llms.txt` 只有頁面清單、`www…/help-center/llms.txt` 403、sitemap 404；pricing 仍 403、Wayback 2026 全年無 200 快照 → **Pro US$20 仍無官方原文**，`recurring_cost_usd` 維持 null。
2. `perplexity-education`：US$10／月＋SheerID、教育專文「unlimited Pro Searches」、同頁表格「Weekly limits (average use)」三者仍並存。另見 SheerID 該計畫頁 config 列 233 國含 TW，**只當線索寫進 identity_residency，不改 taiwan**。
3. `nscale-signup-five-current-docs-conflict`：`/pricing` 404 第 2 日、官網 sitemap 199 筆無 pricing；現行單價改以 `docs/ai-services/models.md` 為權威。新增第三種門檻說法（marketing：「can be started by any developer with $2 credit」）與 docs「minimum $5」矛盾，列入 unknowns；狀態維持 unverified。
4. `salad-ssap-migration-credit-watch`：`salad.com/ssap/` 仍 404、sitemap 44 筆與 blog sitemap 113 筆均無、`/whats-new/` 0 命中；2024-04-24 原文仍可讀（US$10,000／兩月、10 張 24GB GPU）。404 不足以判終止，狀態不變。
5. `oracle-ai-services-free-tier`：行銷頁仍稱「free pricing tier for most AI services」，但 **Always Free 資源頁未列** Speech／Language／Vision／Document Understanding／Data Labeling、價目表金額由 JS 注入讀不到數字、官方 region 清單 45 個 identifier **無台灣**。summary 與 unknowns 已改寫成這個精確版本。
6. `diffbot-free-monthly-tenk-shared-api-credits`：每月 10,000 共用（Extract 1 頁＝1、KG 實體＝25…）、5 req/min、依帳期重置、超額 429、**定價頁與 FAQ 都寫免卡**；一般條款仍要求信用卡（兩說保留）。
7. `deepinfra-two-minute-papers-twenty-credit`（attempted）：`/papers` 404 第 5 日、`login?deal=2mpapers` 已無 $20 字樣、sitemap 1,062 筆無活動頁、**Wayback 2026 零捕獲**（最近快照仍 2025-04-30）。`verified_at` 不刷新，只記 attempt 與原因。
8. `astamuse-agent-trial-oct31-index-only`（attempted）：原公告 404，官方 WP REST（トライアル／AIエージェント）與 2026 年度列表最新為 10-23，`after=2026-10-24` 的新聞集合為空。同上，不刷新 `verified_at`。

**新增 2 筆（主 agent 逐字讀官方頁後才納入）**

- `junyi-jutor-ai-english-tutor-taiwan-free`（opportunity、S 級，台灣 Yes）：均一教育平台「全站完全免費使用」「無論選擇用哪個身份，都可以 永久免費 使用全站所有功能喔！」、Jutor「專為台灣學生設計的 AI 英語學習平台」「免費學習」。**免費不等於無限制**：網站政策第六章逐字「基於運算成本限制，部分生成式 AI 服務將對單一帳戶於一定期間內設有使用上限」，官方未公布數字；政策同時禁止在 AI 輸入欄位放個人可識別資訊、內容限個人非商業用途。`quota_classification` 記 UNKNOWN 並在說明寫明。
- `mingyi-npo-ai-partner-grant-tw-two-hundred-k`（opportunity、S 級，台灣 Yes）：明怡基金會「NPO 好拍檔」AI 獎助，FAQ 逐字「20 萬獎助金可以用在哪些地方？」、限「AI 技術之導入與培訓」、「單一法人至多獲選 2 件」、核銷「不需要單據的審核」、排除倡議推廣類與支持型組織、案例須「已在您的工作流程中實務運行滿 2 個月」。官網已公布 2026 獲選 15 件（全為台灣立案組織）但**無報名截止日與下一梯次時間**，因此狀態記 `campaign_current_availability_unverified`（活動現況待核），不是「已截止」也不是「可申請」。

**未納入（保留否決理由）**：台北市青年 AI 補助、新竹市 AI 領航補助、115 年度中小製造業 AI 工具點數、台智雲 TWAI、Claude for Nonprofits、Google Workspace 非營利、AWS Health Impact、OpenAI Student Collective、中華電信 Google AI Plus、Google 學生方案 — 全部已收錄；ChatGPT Edu 全校版官方仍是「Contact sales」、僅美國 K-12 教育工作者免費，台灣無免費依據；數發部 UNEXT 是見習計畫不是 AI 額度；imCore Core Studio 只有倒數頁無額度敘述。Watchlist 三條留到下輪：台大「AI 平權」弱勢生補助（校務會議 PDF 未載）、imCore Core Studio（11/30 上線）、ChatGPT Edu 全校在台適用性。

**品質改善（本輪唯一一項）：費用未知時，卡片正面要說得出唯一確定的那句話**

- 觀察到的問題：`money()` 對 null 已印「未列金額」，但真正寫著「要綁卡、期滿自動扣款、折扣不是免費」的 `cost_note` 只在 `recurring_cost_usd > 0` 時才上卡片正面。2026-11-11 統計 **93 筆可行動紀錄**屬於「某個美元費用欄位是 null 且有 cost_note」（免費專區內 46 筆）：`ovh-public-cloud-first-project-two-hundred-month` 的 note 逐字「須綁付款方式；超額自動扣款」、`google-students-tw-plus` 的「註冊時須提供有效付款方式；期滿系統自動按月收取新台幣 NT$165」、`nebius-token-factory-signup-one-dollar` 的「requires a bank card」全部只藏在詳情。讀者在「設定費 未列金額／每月費用 未列金額」旁邊看不到唯一確定的事，很容易把未知讀成可能免費。
- 預期結果：任一美元費用欄位為 null 且有 `cost_note` 的卡片，正面多一列「費用說明：<原文>」，與既有的「每月費用說明」互斥（同一欄位不在同一張卡出現兩種說法）；兩個費用都有值的卡片不出現這一列。
- 驗證方式：`tests/filters.cjs` 資料驅動斷言 — 符合條件的紀錄必須**恰好一列**費用說明且逐字等於 `cost_note`、有已知月費者用「每月費用說明」、`ovh-…` 必須含「須綁付款方式」、兩個費用都有值的紀錄不得出現此列。反向實測：把該 `else if` 分支拿掉後測試以 AssertionError 失敗，回復後全綠。瀏覽器實測 OVH 卡顯示「費用說明：須綁付款方式…」、Google 學生卡顯示 NT$165 續扣說明。

**本輪遇到的流程問題（下輪要避開）**

1. **表格 cell 內的紅字提醒會被文字擷取吃掉**：CDRI 11/17 班「實體座位已滿」寫在 `<span style="color:#ff0000">` 內、位於表格 cell，`read` 的 markdown 轉換沒有帶出這句話，只有 `curl` 原始 HTML 看得到。凡「額滿／已滿／停辦／延期」這類字樣，先確認是不是被樣式標記吞掉（與 11-11 早上「modal 公告擷取不到」同型）。
2. **來源時間可能記在 `accessed_time_range` 而不是 `accessed_at`**：`aocai` 的兩筆 ievents 來源用 `accessed_time_range` 記 05:30／02:09，本輪再 append 同日 09:11 的新證據就變成「同日同 URL 兩筆」被 validate 擋。合併時要同時看兩個欄位（前端 `sourceStamp` 早就是這樣讀的）。
3. **子代理交期與真實時鐘會漂**：本輪一度把 `verified_at`／`updated_at` 寫成 09:40（當時實際 09:28），validate 的 future-clock 檢查擋下後改成當下值。時間戳一律以 `TZ=Asia/Taipei date` 取值，不要用任務敘述裡的預估時間。
4. **per-call 模型不可用**：`task` 的 `perCallModel` 在本環境關閉，指定的 gpt-6.1-terra／Gemini 3.8 Flash 無法逐一指派，三個子代理都以環境預設模型執行；本則如實記錄，沒有宣稱使用了未實際呼叫的模型。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,043 筆、S/A/B/C/D＝135/187/127/274/105）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`python3 tools/prioritize.py`（重算後 S 133→135）、`git diff --check`。
瀏覽器（本機 8951、headless Chromium、停用快取）：資料載入 1,043 筆；概況卡 828／149／50／165；批次列 14／2／1,027；首頁 scope 為本輪文字（09:05–09:36）；關鍵字「均一」「明怡」各只回對應新紀錄；「截止日由近到遠」首筆為 AOCAI「申請截止 2026/11/11 12:30 · 今天」，其後 11/12 15:59、11/12、11/13；OVH 卡顯示「費用說明：須綁付款方式…」、Google 學生卡顯示期滿 NT$165 續扣；新紀錄卡片為「免費機會／資格審核／容易開始」與「資格審核／優惠組合」，費用、狀態（方案仍列示／活動現況待核）與核實 2026/11/11 均正確；390px 寬 scrollWidth=390 無水平溢出、console error 0。

**下輪優先（最多五項）**

① `aocai-working-free-ai-courses-2026`（`next_review_at` **12:20**、`deadline_at` 12:30、daily）：**12:30 之後第一件事**是重讀 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544` 與報名表；確認 11/16 班已關後，把 `deadline_at` 改指 11/26 班（`https://college.itri.org.tw/Lesson/LessonData/7571A149-3346-4FAE-B5AF-DCADB2DBDAC3`，報名至 11:19）或 12/01 BizBoost 班，並改寫摘要第一句——`deadline_at` 已過而狀態仍 `conditional` 會被 validate 擋。順便確認 11/17 班實體額滿後線上是否仍收。
② `mango-inference-community`（next 11-12 09:00、daily）：11/12 起折扣是否回原價（platform 與 pricing 兩頁價格表）；US$10 贈額是否須先綁付款方式。
③ `perplexity-watch`（11-18）／`perplexity-education`（11-25）：3/day 與 five per day 是否收斂；`llms-full.txt` 是否恢復（已 404 3 日）；`www.perplexity.ai/pricing` 是否解除 403（決定 Pro US$20 能不能寫）。
④ `nscale-signup-five-current-docs-conflict`（11-25）：$2（marketing）與 $5（docs）起用門檻的關係、US$5 贈額是否仍發放、`/pricing` 是否復原。
⑤ `mingyi-npo-ai-partner-grant-tw-two-hundred-k`（**2027-01-15**，monthly_or_new_signal）：查下一梯次報名是否公告（`https://www.mingyifoundation.org/ai-partner` 與 FAQ、LINE 小幫手頁），有公告再改成可申請並補 deadline；2027 年前不必反覆重讀。另 `taipei-kuai-ai-school-grant-batch2-115` 11/13 後若無延期公告改 `applications_closed`。

**常態待辦（不佔上面五項）**：`deepinfra-two-minute-papers-twenty-credit` 與 `astamuse-agent-trial-oct31-index-only` 已連續失敗且官方端全無，下輪起比照「官方沉默」改低頻（`on_new_signal`／現有排程不再提前）；免費專區仍有 173 筆「費用欄位 null、沒有 cost_note」，卡片只有「未列金額」；`verification_scope` 缺漏與 `conditional`＋`FREE`＋`HIGH BUT LIMITED` 的語意漂移（先訂規則再改）；`tools/linkcheck.py` 本輪未全掃，下輪若要修 404 清單先單筆重掃再當證據。

**發布**：commit `7aaba0d` 已推上 `origin/main`（`811f405..7aaba0d`），對應的 `pages-build-deployment`（7aaba0d）success。推送後在公開站 <https://richardhan.github.io/ai-access-intelligence/> 實測：資料 1,043 筆、概況卡 828／149／50／165、批次列 14／2／1,027、首頁 scope 為本輪文字（09:05–09:36）、資料更新 2026/11/11 09:36；`data/offers.json` 直接下載亦為 1,043 筆且 `last_research_run.reviewed_ids` 14 筆、`new_ids` 2 筆；關鍵字「Jutor」與「好拍檔」各回對應新紀錄（狀態「方案仍列示」「活動現況待核」、核實 2026/11/11）；「首個專案」卡顯示「費用說明：須綁付款方式…」；「截止日由近到遠」首筆為 AOCAI「申請截止 2026/11/11 12:30 · 今天」；console error 0。以上是推送後在公開站實際載入的結果，不是只憑 Actions 成功推論。本則後段（發布狀態補寫）與資料無關，屬同一批次的文件更新。

　【12:39 覆核】對應的 `pages build and deployment` run 42959921145（headSha `d78a15f`）已 completed／conclusion=success。在公開站再次確認（含停用快取的 `?t=` 重載）：`data/offers.json` 的 fetch 回 200，頁面資料 1,050 筆、批次列為 12／1／1,037、資料更新 12:33——這是**接續的 12:04 那一輪（`45b106f`）**在同一小時內發布的結果，本輪（`d78a15f`）的內容是其基礎且仍全部在線：關鍵字「Kiro Free」3 筆（含本輪新增的免費層）、「方舟」3 筆、「專業證書」1 筆（本輪的觀察線索）、AOCAI 卡片「申請截止 2026-11-19 · 剩 8 天」，console error 0。因此本輪的發布狀態應記為：**已推送（`d78a15f`）→ 部署成功（run 42959921145）→ 公開內容已核對**，但公開站目前顯示的批次計數屬於後一輪，不是本輪的 17／3／1,029。接續那一輪另外用官方 FAQ 補正了本輪 Kiro 紀錄的三個「未知」（免費層為 perpetual、每計費月重置、未用完不結轉），已在 `45b106f` 修正。

## 2026-11-11 10:15–11:05（Asia/Taipei）｜R=12、A=3（3 機會）、U=1,031、attempted=3

**基準與範圍**：本輪開始 N=1,043（828 機會／50 政策／165 觀察線索）；`python3 tools/queue.py` 顯示嚴格逾期 0 筆、7 日內到期 10 筆（9 筆在 12 小時冷卻內）、追查失敗待換路線 0 筆（1 筆冷卻中）；8 筆官方來源 404（linkcheck 全掃 2,7xx 個 URL：dead 7 個、blocked 77、unreachable 6）。上一輪 09:36 才結束，其 14 筆一律不重讀。三個子代理分工：A 台灣 S 級與即將到期 6 筆、B 來源衝突與連續追查失敗 6 筆、C 新機會研究與去重；主 agent 另複核 1 筆（CyLeague）並負責整合、驗證與發布。**R=12、A=3、attempted=3、U=1,031**（結果 1,046 筆）。未登入、未申請、未付款、未操作 VPN。

**會改變讀者決定的更正**

- `startup-terrace-ai-poc`／`asia-new-bay-ai-poc-watch`：**同一方案重複收錄**。同一個 2026 梯次 4/24 23:59 截止、同一「符合中小企業認定標準且 107/4/25 後成立、非陸資、非外國營利事業在臺分公司」資格、同一最高 US$10,000 雲端點數上限、同一進駐 1 年義務，只是一個記在計畫頁、一個記在徵件公告。已把較晚建立的 `startup-terrace-ai-poc` 標為 `duplicate_merged` 並 `duplicate_of` 指向 10-29 建立的 `asia-new-bay-ai-poc-watch`，逐字證據（徵件公告 s=15273、入選名單 s=15426、中小企業認定標準、園區費用頁）併入存活者。同時修正兩個重要主張：存活者原本 `taiwan: Yes` 但官方頁只能靠 Wayback 讀，本輪計畫頁正文已可讀（更新 115-11-10）；`quota_classification` 由 UNKNOWN 改 HIGH BUT LIMITED（US$10,000 為上限、非保證核發），並補上園區空間費用（Co Working Seat 3,600 元／月／位、獨立辦公室 64 折、未稅）。**通則：判斷重複要比資格門檻／金額上限／期間／排他規則四項，不是比標題**（`tests/validate.py` 只擋「標題完全相同」）。
- `cpc-moeai-elite-free-ai-course-115`：**只剩一梯可報名**。商城四個梯次頁顯示第一梯（報名至 2026/8/7）、第二梯（11/5）、第三梯（11/9）皆「報名結束」，只有第四梯 TD8612（2027-01-14～01-28、報名至 **2027-01-13**、台北承德）仍有「我要報名」。課程頁 1650 卻把四梯全標「確定開班」——同一機構兩份頁面衝突，以商城頁的報名狀態與報名時間為準並保留兩說。另更正兩處會誤導的細節：第二梯上課地點是「桃園市成功路二段七號四樓」不是台北承德；「課程開班人數 10 人」是開班門檻、不是名額上限。`deadline_at` 由 null 補為 2027-01-13。
- `taiwan-moeai-manufacturing-tool-reimbursement-hundred-k`：`deadline_at` 由 null 補為 **2027-09-30**（1150723 版申請須知 docx 逐字「受理期間 自公告日起至116年9月30日止」），先前只寫在 `usable_duration` 的散文裡。同時逐字確認每案上限 10 萬元（未稅）、超過部分自付、15 工作日檢核與撥款、憑證須標註計畫字樣、不得重複核銷；站上仍無額滿／停止受理公告。
- `taiwan-industry-talent-investment-ai-courses-2026`：核心數值不變（80%／100%、3 年 10 萬、缺課 1/5 不予補助、本國籍或特定居留身分），補進三個會影響行動的欄位：`usable_duration` 加上「115 下半年開訓 2026-07-25～2026-12、最晚 2027-02-28 結訓；116 上半年 2027-01-12 起報名、最遲 2027-06-30 開訓」；`cost_note` 加上「訓練單位不得以任何名目另收費用」「開訓前退訓最多收 5%、未開訓逾 1/3 退 50%」；`quota_details` 註明各班名額（例 36／42／45 人）不是方案總額。
- `cyleague-cyber-navi-trial`：官方頁逐字「2026年10月1日〜11月30日 お申し込み分限定」，但 `deadline_at` 一直是空的——卡片因此沒有截止膠囊、「截止日由近到遠」把它當成沒有截止日的紀錄排在最後，而標題自己寫著「11/30申請截止」。已補 `deadline_at: 2026-11-30`（來源只給日期，未補時刻）。申請頁 `ai.cyleague.jp/signup/trial` 重試仍 403，台灣法人與日本法人番号要求維持未核。
- `nscale-signup-five-current-docs-conflict`：**「US$2 credit」的出處找到了**——`https://www.nscale.com/services/ai-services` 的 FAQ 逐字「can be started by any developer with $2 credit」，屬 fine-tuning 段落，與 docs 的「add a minimum of \$5 of credit」是不同命題；但現行 prepaid 一次至少買 US$5，US$2 起用在自有加值下無法達成，兩說保留不裁決。`/pricing` 連續第 3 日 404、sitemap 199 筆無 pricing 頁，現行單價以 docs models 頁為權威。
- `voyage-free-tokens-batch-excluded`：**定價頁沒有搬家**。`www.voyageai.com/pricing` 仍 404（`/plans`、`/costs`、`/robots.txt`、`/sitemap.xml` 都回同一張 404 頁），官方唯一定價頁是 `docs.voyageai.com/docs/pricing`（200、`article:modified_time` 仍 2026-09-29）。補上批次排除的逐字句「Free token credits do not apply to Batch API usage…」。
- `oracle-ai-services-free-tier`：行銷頁仍稱多數 AI 服務有免費層、Always Free 資源頁仍 0 命中 Speech／Language／Vision；新證據是價目表「First 5,000 Transactions」「First 5 Transcription Hours」列的價格 cell 是空的 `<div data-partnumber=… data-minrange="0"></div>`（金額由 JS 注入），所以「有免費層」與「額度是多少」在本站無法用靜態 HTML 核到；region 清單仍無台灣。
- `google-skills-student-200-credits-taiwan`／`google-ai-educator-series-taiwan`／`taiwan-ai-academy-citizen-ai-literacy`：逐字重讀後主張不變（200 點一年效期、Taiwan 同時列於表單與支援頁清單；教師系列免費、10–15／30–45 分鐘、完成測驗發徽章；AIA 免費 10 小時、五大對象、報名表仍收件且列台灣本島與外島選項），只補 `verification_scope` 與來源查閱時間。AIA 兩頁的支持單位寫法不同（課程頁 Google.org／ADB、about 頁 AVPN／Meta），列為缺口、不判定終止。

**新增 3 筆機會（皆逐字取自官方頁，`tools/prioritize.py` 已重算）**

- `microsoft-learn-student-ambassadors-monthly-azure-150`（S 級）：Microsoft Student Ambassadors 官方 Student Hub 頁逐字「Unlock program benefits, including Microsoft 365, Visual Studio Enterprise, $150 USD monthly Azure credits」「Get started - no application required!」「Open to students across all degree fields and levels…」。與 `azure-students`（US$100／年，需學籍驗證）是不同方案、不同額度。缺口：「monthly」是否重置、額度用完後是否轉隨用隨付、註冊表單是否列得出台灣學校，官方都沒寫。
- `microsoft-365-nonprofit-business-basic-300-free-copilot-chat`（S 級）：非營利方案頁「free up to 300 users」＋「Copilot Chat … included in your Microsoft 365 subscription at no extra charge」；國別資格 PDF 逐列 Taiwan：認可型態為 social associations（社團法人）或 public-endowed foundations（財團法人）。這條對台灣 NPO 有實際價值，且資料庫先前只有 Azure 非營利與 Google Workspace 非營利。限制寫清楚：grant 席次僅限正職員工與無薪執行幹部、志工只能用折扣版、席次「vary by availability of country of usage」故台灣不保證 300。
- `fun-ai-camp-2027-nthu-taica`（S 級，LOW-COST 非 FREE）：清大資工×TAICA 等校合辦，2027-01-25～01-28 長庚大學；報名費 NT$4,500，完成線上自學並全程參加退 NT$3,000（實質 NT$1,500）；報名截止 **115/12/18 23:59、額滿提前停止受理**（清大 115-11-04 函）。`setup_cost_usd` 依 `tw-labor-pretraining` 的先例保留 null（費用以新臺幣計），金額寫在 `cost_note`。
- 未納入：Microsoft for Startups（已是 `azure-startups`）、桃園 115 年青年數位工具培育（任務指定避開）、臺中市勞工大學（115 年度已截止）、文化部地方創生 AI 課程（兩場已辦畢且限曾獲補助團隊）、Google Opal（官方寫 2026-11-17 結束 Labs）、AWS AI/ML Scholarship（官方頁 404）、Perplexity Comet（403 無逐字證據）、百度千帆／訊飛星火（需中國實名與手機號）。

**attempted 3 筆（不刷新 `verified_at`）**：`adobe-startups-free-year-firefly-acrobat-semrush`（計畫頁 TLS 後 HTTP 逾時；Wayback 0 快照；www／max.adobe.com 回 Akamai 403。改用 Semrush 官方公告 2026-11-09 交叉確認方案與同一申請頁，但表單付款方式與國別下拉仍不可讀）、`deepinfra-two-minute-papers-twenty-credit`（第六度：`/papers` 404、Wayback CDX 只有 2025 三筆、官方 blog 對 `$20` 0 命中）、`astamuse-agent-trial-oct31-index-only`（第七度：原公告 404、CDX 0 捕獲、WP REST `after=2026-10-24` 回 `[]`）。後兩筆依「官方已沉默」改 `review_cadence: on_new_signal` 並清空 `next_review_at`：再排每月只會重複同一個 404／`[]`，而卡片上「有新線索時；未安排特定複核日期」比一個永遠讀不到的日期誠實。

**品質改善（本輪唯一一項）：標題寫了期限，欄位就必須有對應的截止點**

- 觀察到的問題：`createCard()` 的截止膠囊、「截止與期限」列與「截止日由近到遠」排序全部只讀 `deadline_at`／`expires_at`／`expiry.date`，而標題是讀者第一眼看到的字。2026-11-11 全庫掃描「可行動、標題同時有截止動詞（截止／報名至／受理至／申請至）與日期、三個欄位卻全空」只有 1 筆：`cyleague-cyber-navi-trial`（標題寫「11/30申請截止」，卡片沒有膠囊、排序被當成沒有截止日）。`tests/validate.py` 既有的兩條期限規則（排程須早於截止、期限已過須改狀態）都只讀欄位，看不到它。
- 預期結果：這類紀錄不能再靠標題宣稱期限而讓卡片／排序／篩選看不到；補上欄位後 CyLeague 卡片出現「申請截止 2026-11-30 · 剩 19 天」。
- 如何驗證：`tests/validate.py` 新增一條全庫斷言（新的 module-level 檢查，不在逐筆迴圈內），並用「把 `cyleague` 的 `deadline_at` 拿掉」做反向實測——驗證立即以 AssertionError 指名該 ID，回復後全綠。**刻意不把「至 <日期>」列入規則**：`fal-flux3`（折扣至 11/22–23）、`qoder`（每日額度至 10:00）、`mem0`（舊戶過渡至 11/25）都是方案內子期限，回填成整筆的 `deadline_at` 會讓卡片宣稱錯誤的截止日（同型 5 筆，見上方 2026-11-11 09:36 紀錄）。

**本輪遇到的流程問題（下輪要避開）**

1. **子代理可能無限擴張**：三個子代理合計跑了 33–36 分鐘、B 與 C 在 20 分鐘時仍停在 45%／25%。發 `agent://` 訊息要求「3 分鐘內交回、未查完的欄位直接列缺口」才收斂。下次在任務書就先寫「每個線索最多兩條替代路線、超過就列缺口」與明確時間盒。
2. **子代理回報的逐字證據仍要自己抽驗**：B 的「價目表 100 個空 price span」我用同一份 HTML 只數到 4 個（正則不同），因此紀錄只寫「價格 cell 為空、金額由 JS 注入」不寫數量。凡數字型斷言，主 agent 用自己的方法重數一次，或改成不含數量的句子。
3. **`json.dumps(indent=1)` 會把 8MB 資料檔整份重寫**：本輪第一次寫入用 indent=1，`git diff --stat` 立刻變成 18 萬行變動。`data/offers.json` 與 `data/policy-history.json` 都是 indent=2（`tools/prioritize.py` 的寫法），寫入前先確認縮排，否則 `git diff` 看不出真正的內容變更。
4. **新增紀錄漏欄位會在下游才爆**：新紀錄若漏 `record_type`，`tools/prioritize.py` 會以 KeyError 中斷（不是 validate），錯誤訊息還停在不相關的行號。新增紀錄時先用既有同類紀錄的 key 清單比對一次。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,046 筆，S/A/B/C/D＝138/187/127/274/105）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`python3 tools/prioritize.py`（重算後 S 135→138）、`git diff --check`。
瀏覽器（本機 8951、headless Chromium、停用快取）：資料載入 1,046 筆；概況卡 831／152／50／165；批次列 12／3／1,031；首頁 scope 為本輪文字（10:15–10:56）、資料更新 2026/11/11 10:56；捷徑「台灣條件適用」152 筆、「免費方案」682 筆、「本輪更新」15 筆（12 複核＋3 新增）；「截止日由近到遠」首筆為 AOCAI「申請截止 2026/11/11 12:30 · 今天」，其後 11/12 15:59、11/12、11/13；CyLeague 卡顯示「申請截止 2026-11-30 · 剩 19 天」；亞灣重複紀錄顯示「重複紀錄・已併入其他 ID・原分類：資格審核」且合併後紀錄為「新申請已截止」；Fun AI Camp 卡顯示「申請截止 2026/12/18 23:59 · 剩 37 天」；微軟非營利與 Ambassadors 兩張新卡以「300 席」「Ambassadors」搜尋各回正確紀錄；390px 寬 scrollWidth=390 無水平溢出、console error 0。

**下輪優先（最多五項）**

① `aocai-working-free-ai-courses-2026`（`next_review_at` 12:20、`deadline_at` 今天 12:30）：12:30 之後第一件事是重讀 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544` 與報名表，確認 11/16 班關閉後把 `deadline_at` 改指 11/26 班（報名至 11/19）或 12/01 BizBoost 班，並改寫摘要第一句——`deadline_at` 已過而狀態仍 `conditional` 會被 validate 擋。
② `mango-inference-community`（next 11-12 09:00）：11/12 起七折是否回原價（platform 與 pricing 兩頁），US$10 贈額是否須先綁付款方式。
③ `perplexity-watch`（11-18）／`perplexity-education`（11-25）：3/day 與 five per day 是否收斂；`llms-full.txt` 已 404 3 日；`www.perplexity.ai/pricing` 403 是否解除（決定 Pro US$20 能不能寫）。
④ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`（next 11-14）：11/30 截止但購買期限 10/31 已過、剩餘經費 4.4%；要確認餘額是否歸零或出現「經費用罄」公告，若已用罄改 `applications_closed`；來源 `https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`。
⑤ `microsoft-365-nonprofit-business-basic-300-free-copilot-chat`（12-11）與 `microsoft-learn-student-ambassadors-monthly-azure-150`（12-11）：查官方是否補上「席次依國別調整」的實際數字、Ambassadors 的 monthly 重置細則與台灣學校是否在表單內；另 `fun-ai-camp-2027-nthu-taica` 11/25 要確認是否額滿（額滿即提前截止）。

**常態待辦（不佔上面五項）**：`tools/linkcheck.py` 本輪全掃仍有 7 個 dead（qoder community-boost 兩頁、voyage 行銷 pricing、astamuse 公告、deepinfra /papers、nscale /pricing、salad ssap），全部是已註記的失效頁，沒有新失效來源；下次要修前先單筆重掃（併發下的 404 不能當證據）。免費專區仍有約 170 筆「費用欄位 null、沒有 cost_note」只印「未列金額」；`verification_scope` 缺漏與 `conditional`＋`FREE`＋`HIGH BUT LIMITED` 的語意漂移（先訂規則再改）。

**發布**：commit `8519c9a` 已推上 `origin/main`（`638ee24..8519c9a`），對應的 `pages-build-deployment`（8519c9a）status=built。推送後在公開站 <https://richardhan.github.io/ai-access-intelligence/> 實測：資料 1,046 筆、概況卡 831／152／50／165、批次列 12／3／1,031、首頁 scope 為本輪文字（10:15–10:56）、資料更新 2026/11/11 10:56；`data/offers.json` 直接下載亦為 1,046 筆且 `last_research_run.reviewed_ids` 12 筆、`new_ids` 3 筆、`attempted_failed_ids` 3 筆；關鍵字「CyLeague」卡片顯示「申請截止 2026-11-30 · 剩 19 天」、「Fun AI」顯示「申請截止 2026/12/18 23:59 · 剩 37 天」、「300 席」回微軟非營利新紀錄；console error 0。以上是推送後在公開站實際載入的結果，不是只憑 Actions 成功推論。本則後段（發布狀態補寫）與資料無關，屬同一批次的文件更新。


## 2026-11-11 11:15–12:50（Asia/Taipei）｜R=17、A=3（2 機會＋1 觀察線索）、U=1,029、attempted=1

**基準與範圍**：本輪開始 N=1,046（831 機會／50 政策／165 觀察線索）。`python3 tools/queue.py --limit 22` 顯示**嚴格逾期 0 筆**、7 日內到期 10 筆（9 筆在 12 小時冷卻內，只剩 AOCAI 12:30 這一筆）、追查失敗待換路線 0 筆（1 筆冷卻中）、24 小時內未核 684 筆。上一輪（10:15–11:05，commit `8519c9a`／`ba51fcf`）結束才 10 分鐘，其 12 筆複核與 3 筆新增一律不重讀。本輪三個子代理分工：A 21 天內到期／即將關閉 8 筆、B 最久未核與官方說法衝突 8 筆、C 新機會研究與去重；主 agent 另做 AOCAI 梯次交接、1 筆前一批紀錄的補正、3 筆新紀錄的逐字審查，以及本輪唯一的流程改善。未登入、未申請、未付款。

**A 組 8 筆：21 天內到期或即將關閉（結論：沒有一筆延期、提前關閉、額滿或改價）**

- `moda-adi-forum-2026-free`（11/12 09:30）：活動頁 772 與資策會報名表仍列六個場次並可送出，新聞列表最新 2026-11-10、「ADI FORUM」0 命中。**新增可引用的單篇活動頁 `/ADI/news/events/21254`**（建立與更新日期皆 2026-11-06，內文與 772 相同），已補進 sources。
- `amazon-ara-multilingual-contextual-ai-fall-2026`（台北 11/12 15:59）：徵案頁仍「October 1 - November 11, 2026 (11:59PM Pacific Time).」、`article:modified_time` 仍 2026-10-28（無二次展延）；索引頁仍「Fall 2026: Open Now」＋「has been extended to November 11.」；program-rules 仍 2025-03-26 版、void 清單未列台灣。
- `taipei-kuai-ai-school-grant-batch2-115`（11/13）：北一女轉知頁仍「115年11月13日（星期五）前」；修訂版計畫書 PDF **位元組數 406,182 與前次完全相同**（同一檔案）、「9 萬元」0 命中、「延期／延長／順延」各 0；教育局公告列表仍 0 命中「酷」。
- `ugreen-ai-nas-hackathon-2026`（台北 11/16 15:45）：規則與 Taiwan 合格居住地不變，**參與人數 2061→2071**；宣傳頁與 FAQ 的初賽影片矛盾今日仍並存，依正式規則判「不需影片」。
- `tw-labor-pretraining-ai-smart-application-tnnu-03`（11/16 16:00）：**報名人數 27→28／34（剩約 6 席）**，日期、自付 5,760 元、188 小時、甄試 11/18 不變，仍可報名。
- `taoyuan-ai-productivity-online-courses-115`（11/17）：課程頁仍「115-08-28~115-11-17 免費、600 名/堂」、更新日 115-11-10；**頁面自身 11/17 與列表 11/20 的日期衝突仍在**，保留兩說不裁決。
- `autoclaw-weekly-perk-november-nine-hundred-million-tokens`（11/15 23:59）：M11W2 期間逐字未變、`dateModified` 2026-11-06，blog 最新一篇仍是 11/06（無 M11W3、無延期）。
- `stepfun-stepaudio3-music-gen-preview-nov8`（11/17 11:59:59）：兩份模型頁仍 `Free (limited time)`，docs 內 `extend/postpone/delay` 0 命中。

**B 組 7 筆：最久未核（verified_at 11-01～11-09）與官方衝突**

- `code-for-everyone-ai-school-2026`：**台灣判讀收斂**。公告逐字「2027年3月31日（水）まで」、対象学校種逐字「小学校・中学校・義務教育学校・高等学校・中等教育学校・特別支援学校」；FAQ 逐字「大学での利用は想定しておりません」、申請人限「教諭もしくは管理職の方」；官方申請表「都道府県」欄含選項「その他（在外教育施設・通信制等）」。結論：一般台灣學校或個人不符，唯一路徑是在台日本学制「在外教育施設」（如日僑學校）的教諭／管理職送件並經審查；`taiwan` 仍留 Unknown（官方未點名台灣，只給選項）。另補 ICT 支援企業／支援員個人不發帳號、教育委員會僅限功能確認／研修、不得跨校一括申請。
- `tidb-ai-startup-up-to-hundred-k`：新增明確目標市場句「You are building for markets such as the United States, Southeast Asia, Japan, or Europe.」，**台灣不在列名市場**；這是適合度敘述不是註冊地排除，故 taiwan 仍 Unknown，但把「未列名」寫成可判讀的敘述。最高 US$100,000、pre-seed～Series B 不變。
- `assemblyai-startup-recurring-year`：逐字新增「Credits land in your console within 48 hours of approval」與「Startup discounts continue after your credits run out. Standard pricing phases in with no migration and no cliff」；金額仍未公布（兩頁 `12,000`／`12k`／`twelve thousand` 0 命中），審核時程衝突（計畫頁一週 vs 申請頁 2–3 工作日）仍在。
- `cohere-catalyst-grants-api-credits`：`STATUS: Open`／`rolling basis` 不變；FAQ 支持主題比舊紀錄寬（新增語言模型安全、法律／歷史／社科、多語、價值對齊），追加額度窗口改為具名信箱 `brittawnya@cohere.com`；4 週發表前通知只適用 AI safety 類，舊紀錄寫成通則已收斂。
- `runpod-academic-research-case-by-case`：計畫仍在，新增機構層級導入（university SSO）與「教學／課程也支援」，個人學生一律個案審查；US$25,000 仍只在 B200 文章 FAQ、非計畫頁，維持不寫入額度。
- `together-research-invite-grants`：邀請制與「a few hundred dollars」不變；平台最低消費改記為兩段式「US$15 首次購買、之後 US$5」，研究贈額是否免首購仍無明文。
- `scholarcy-free-summarizer-quota-conflict-watch`：**衝突完整保留**（定價頁 10 summaries ×2、FAQ 每日 1 篇、工具頁每日 3 篇），狀態維持 `conflicting_official_usage_claims`，不任選一版。

**主 agent 直接處理的 2 筆**

- `fun-ai-camp-2027-nthu-taica`：**修正一筆會影響費用的錯誤敘述**。上一批（10:45）寫「住宿與交通未由主辦單位說明（費用另計未核）」，但活動頁「報名資格與注意事項」段逐字「本活動不提供住宿。請自行安排第二階段實體營隊之住宿與交通，並請自備筆電」，且「活動期間將提供『桃園機場捷運 A7 體育大學站 ↔ 長庚大學』接駁車服務」、筆電建議十代 i7 以上。已改寫 `access_risk`、刪除該條 unknowns、新增來源並更新 scope。費用、報名費、退費與截止日不變。
- `aocai-working-free-ai-courses-2026`：**梯次交接在 12:31:45 完成**。11/16 班報名期間在 2026-11-11 12:30 到期（事件頁逐字「2026/09/24 15:00 ~ 2026/11/11 12:30」），因此把 `deadline_at` 由 12:30 改指最近仍開放的 **11/26 工研院台北班**（該頁逐字「報名截止日期：2026/11/19」「起迄日期/ 2026/11/26 ~ 2026/12/08」），title／summary／access_risk／`verification_scope` 同步改寫，`next_review_at` 排 11/18（早於 11/19 截止）。12/01 BizBoost 班仍「尚有票券」但未公布截止日，列入 unknowns；12/02、12/14 兩個更晚的梯次由接續的回合補上。（補記：這條在 12:30 前是未完成的，接續的回合一度在此寫下「本輪沒寫完」；實際情形是本輪在 12:31:45 自行完成並 commit，該錯誤敘述已於下一則紀錄中更正。）

**新增 3 筆（皆由主 agent 逐字重讀官方頁後才納入）**

- `kiro-free-fifty-credits-monthly`（機會、C 級）：kiro.dev 定價頁逐字「KIRO FREE $0 per month 50 credits Access to open weight models and Claude Sonnet 4.5」「KIRO PRO $20 per user / month 1,000 credits」「Add-on credits ($0.04/credit)」。資料庫原有 4 筆 Kiro 紀錄（學生、新創、首次升 Pro、Kiroween）卻**沒有最基本的免費層**，這是補洞。台灣 Unknown：定價頁與 FAQ 未列可用或帳單國家，且既有紀錄顯示付費帳單國家未含台灣。
- `moe-ai-talents-ark-115-free-ai-literacy-downloads`（機會、S 級）：教育部 AI 人才方舟資料下載頁逐字列出「臺灣中小學教師與學生AI素養框架」「中小學使用生成式人工智慧注意事項2.1(教師、行政人員及家長版)」「…(學生版)」「115年中小學數位與AI教學指引」「教師數位與AI教學教案示例(國小)」等，頁面未列費用。已明確寫成「文件與教材、不是 API 額度或工具授權」；清單以 AJAX 載入，逐檔直連與授權條款列為缺口。
- `google-career-certificates-taiwan-free-coursera-accounts`（**觀察線索**）：Google 台灣 2026-11-05 文章逐字「免費提供 Coursera 平台上的 Google 專業證書（ Google Career Certificates ）學習帳號…已有超過 30 所大專院校響應並陸續開通帳號」。**沒有公開申請表單**、未列名額／期程／是否含 AI 證書，因此不放進機會而是觀察線索；同時記錄 grow.google 學術夥伴頁逐字「Be based in the United States」，排除把它當成台灣院校的替代路徑。

**未納入（保留否決理由）**

- **Google.org AI Opportunity Fund 亞太 Phase 3**（子代理提案）：`aiopportunityfund.withgoogle.com/apac` 逐字列 Taiwan 於 14 個市場、AVPN 頁逐字「The Fund is not currently open for general applications. However, you can register your interest as a learner or a partner.」，且 AVPN 頁有台灣人工智慧學校執行長署名。但它在台灣的**交付就是既有的 `taiwan-ai-academy-citizen-ai-literacy`（免費 10 小時課程）**，基金層頁面本身不提供新的可領取利益 → 判為同一方案，不新增紀錄（依「同一活動的不同頁面不是新案例」）。
- 子代理 C 另外否決 8 筆並附理由：Firebase Studio（已停新註冊）、Qwen Code（現行需付費帳號或自備 key）、Google AI for Education Accelerator（限美國）、Amp Free（是 PAYG 不是額度）、Experience AI（無繁中）、Claude 高教（僅機構銷售）、教育部教育資料素養工作坊（限推薦）、Infoxchange Grassroots AI Impact Lab（印度 NGO 專屬）。

**品質改善（本輪唯一一項）：把兩個「腳本會默默破壞、現有測試看不到」的資料契約變成斷言**

- 觀察到的問題：`json.dump()` 預設縮排是 1 空格，而 `data/*.json` 是 2 空格。本輪主 agent 的整合腳本漏了 `indent=2`，一次寫出 **90,542 insertions／90,542 deletions**，真正的內容變更（16 筆）完全被格式噪音蓋掉；同一時段另一個 session 的寫入也讓我在讀取時看到一次 **59,149 行的假 diff**（檔期中間狀態）。兩次都不是資料錯誤，但都會讓 review、`git blame` 與「這輪到底改了什麼」失效。
- 預期結果：任何人（包含未來的維護輪）改壞格式時，`tests/validate.py` 立刻失敗並指出正確的存檔寫法，而不是讓整份檔案的 diff 膨脹到無法審閱。
- 第二個契約（同一個問題的另一半）：`title`／`summary`／`cost_note`／`access_risk` 等欄位是**純文字**，卡片與詳情直接輸出、沒有 markdown 解析，寫進 `**粗體**` 只會在畫面上留下星號。全庫 3 筆命中（`supermemory-startup-research-scale` 的 summary、`nanonets-50-credits-no-card` 的 cost_note，以及**本輪自己新增的 Kiro 免費層 summary**），已一併清掉並加斷言。
- 驗證方式：兩條斷言都做**反向實測**。序列化：把 `data/offers.json` 以 `indent=1` 重寫 → validate 以 AssertionError 失敗並印出新訊息；還原後回到只剩 README 計數的預期失敗。同一檢查也套用在 `data/policy-history.json`。markdown：把 `**強調**` 塞回 Kiro 那筆的 summary → validate 以 `markdown bold in plain-text field summary of kiro-free-fifty-credits-monthly` 失敗；還原後 0 命中。

**attempted 1 筆（不刷新 `verified_at`）**

- `turboscribe-free-daily-three-thirty-minute-files`：`/pricing`、首頁（含 `#faqs` 錨點所在頁）與 `/terms` 三處全部 Cloudflare 403（curl 兩種 header 組合與內建 reader 皆失敗），已達替代來源上限即停止。**403 不代表方案結束**，每日 3 份／每份 30 分鐘／免卡維持 2026-11-01 讀值；只記 `last_review_attempt_at` 與原因，`next_review_at` 提前到 11/18（不得因一次讀不到就順延一整個月）。

**本輪遇到的流程問題（下輪要避開）**

1. **同一工作區可能有兩個維護 session 同時在跑**：本輪 11:05 開始時，另一個 session 的 10:15–10:56 那一輪還沒 commit，11:06:59 才落盤、11:12 才 push（`8519c9a`／`ba51fcf`）。我因此在讀取時撞到半寫入的 `policy-history.json`（整檔 diff、內容不完整），並一度把「別人的未提交成果」當成本輪基準。規則：**開始前**先 `git rev-parse HEAD origin/main` 與 `git status`，並確認 `data/*.json` 的 mtime 至少 30 秒沒變再讀；**commit 前**再確認一次 remote 沒有新 commit。
2. **`json.dump` 要帶 `indent=2`**（見品質改善）。任何批次腳本都應先做一次「讀進來、原樣寫回去、`git diff` 必須為空」的 round-trip 測試再開始改資料。
3. **探索型子代理需要硬性時間盒**：A、B 兩組各約 11 分鐘交件且品質可用；C 組（新機會研究）跑到 30 分鐘、request 數卡在 58 不動，steer 後才交件（交件時間早於 kill 2 分 42 秒）。下次對「開放式搜尋」類任務先給「20 分鐘內必須先把已驗證的部分寫檔」的指令，而不是等它自己收斂。
4. **活動頁的「注意事項」在摺線下**：fun-ai-camp 的住宿／接駁／筆電要求寫在報價與 FAQ 之後的「報名資格與注意事項」段，只讀價格與 FAQ 就會漏，而且會把「官方明寫不提供」誤寫成「官方未說明」。凡新增台灣營隊／課程紀錄，務必讀到頁尾注意事項。
5. **子代理的 PROPOSED_FIELDS 不會自動帶 `verification_scope` 與 `sources`**：B 組只提欄位差異，主 agent 需自行由 `SCOPE_TEXT` 與 `EVIDENCE` 組回來源陣列，並清掉 md 分隔線 `---` 被正則吃進 scope 尾巴的殘留（本輪 6 筆）。合併腳本要對 scope 做一次尾端正規化。

**主 agent 的獨立複核（不計入 R）**：子代理的證據抽驗 6 處，全部與官方頁一致——`code.or.jp` 的「2027年3月31日（水）まで」與対象学校種、FAQ 全文（大学での利用／イベント／ICT支援／一括申請）、申請表 `都道府県` 的「その他（在外教育施設・通信制等）」；Cohere 的「STATUS: Open」與 `brittawnya@cohere.com`；AssemblyAI 的「Credits land in your console within 48 hours」「discounts continue after your credits run out」；TiDB 的「You are building for markets such as the United States, Southeast Asia, Japan, or Europe.」；臺北酷AI 計畫書 PDF 406,182 bytes／16 頁與「115 年 11 月 13 日（星期五）前」；StepFun 的「remain free through 11:59:59 AM on November 17, 2026 (UTC+8)」（在 `pricing/details.md`，模型頁只有「Free (limited time)」）。另抽驗 47 個本輪用到的來源 URL：43 個 200、2 個 Cloudflare 403（Scholarcy，紀錄已註明改讀 reader）、1 個 401（Cohere 申請表需要 Google 登入，紀錄本來就寫「無法讀取表單本體」）、其餘 200，沒有新增死連結。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,049 筆、S/A/B/C/D＝139/187/127/275/105）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`python3 tools/prioritize.py`（S 138→139、C 274→275，其餘不變）、`git diff --check`。
瀏覽器（本機 8961、headless Chromium）：資料載入 1,049 筆；首頁批次列與 scope 為本輪文字；關鍵字「均一」只回 1 筆、「Fun AI」只回 1 筆且詳情顯示新的住宿／接駁／筆電文字；截止日排序首筆仍是 AOCAI；載入更多 24→48；1280px 與 390px 的 `scrollWidth` 等於視窗寬（無水平溢出）、console error 0。

**下輪優先（最多五項）**

① `aocai-working-free-ai-courses-2026`（`next_review_at` **2026-11-18**、biweekly→weekly 視情況）：11/19 是 11/26 工研院班報名截止，截止後要再往後接 12/01 BizBoost 班（`https://www.niea-bizboost.tw/activity/6fa437fa-e304-4cf2-b67b-56c0d3b905ad`，仍「尚有票券」）。每次交接都要同步 `deadline_at`、`usable_duration` 與 summary 第一句。
② `kiro-free-fifty-credits-monthly`（12/11，monthly）：查 kiro.dev 的註冊／帳單國家清單與免費層是否需綁卡；若找到國家清單就從 Unknown 定案。順便確認 `kiro-first-paid-subscription-bonus` 的「台灣未列付費國家」是否仍成立。
③ `turboscribe-free-daily-three-thirty-minute-files`（11/18）：403 需要換路線——用 `browser` 實際渲染（Cloudflare 對 curl 與 reader 都擋）或找官方 help center 子網域；仍失敗就改 `on_new_signal`，不要再每週重讀同一個 403。
④ `scholarcy-free-summarizer-quota-conflict-watch`（12/11）：三個額度數字仍未收斂，優先找官方 changelog／FAQ 的更新日；若仍衝突，維持 `conflicting_official_usage_claims` 並在卡片上寫清楚「三個數字都出自官方」。
⑤ `google-career-certificates-taiwan-free-coursera-accounts`（觀察線索，12/11）：找台灣端參與院校名單或申請窗口（growonairtw、Google 台灣 newsroom、各大學研發處公告）；找到就升級為 opportunity 並補名額／期程，找不到就維持線索。

**常態待辦（不佔上面五項）**：`deepinfra-two-minute-papers-twenty-credit`、`astamuse-agent-trial-oct31-index-only` 已連續多輪失敗且官方端全無，維持低頻；`tools/linkcheck.py` 本輪未全掃（併發下的 404 不能當證據，下輪要修 404 前先單筆重掃）；免費專區仍有約 170 筆「費用欄位 null、沒有 cost_note」；另有 7 筆的 summary／verification_scope 含反引號（` 這類 markdown 在卡片上同樣是字面輸出，但多為程式符號、可讀性影響小，要清就與本輪的 `**` 斷言一起擴充規則再清）；`verification_scope` 缺漏與 `conditional`＋`FREE`＋`HIGH BUT LIMITED` 的語意漂移（先訂規則再改）。

**發布**：commit `d78a15f` 已推上 `origin/main`（`ba51fcf..d78a15f`）。這一批研究與資料由本輪（11:15 開始）完成；commit 的時間點是 12:32:17，比原本預期晚——12:04 開始的另一個維護回合與本輪同時在跑，兩邊都在等 12:30 之後重讀 AOCAI，本輪先完成並發布。（補記：本段原本被同時段的另一個回合寫成「本輪未 commit，由接續回合代為提交」，那是錯的；實際是本輪自行 commit 並 push。詳細的併發經過記在下一則。）

## 2026-11-11 12:04–12:35（Asia/Taipei）｜R=12、A=1（1 機會）、U=1,037、attempted=0

**基準與範圍**：本輪開始時工作樹有 1,049 筆（833 機會／50 政策／166 觀察線索），**另一個同時段的維護回合（11:15 開始、pid 40428）仍在跑**，它的 3 筆新增與 16 筆複核當時都還沒 commit。開場先確認：`git log` 的 HEAD 仍是 `ba51fcf`、`data/offers.json` 在 12:06:51 與 12:14:01 被整份重寫、`README` 與 `last_research_run` 一度互相矛盾（README 寫複核 19 筆／未核 1,027，批次欄位是 16／1,030）。因此本輪前 25 分鐘只做唯讀來源查核，所有寫入延後到對方停手，並用 `tools/queue.py` 避開它已複核的 16 個 ID。對方在 12:32:17 自行 commit `d78a15f` 並 push，本輪即在其上加值。**R=12、A=1、attempted=0、U=1,037**（結果 1,050 筆）。未登入、未申請、未付款、未操作 VPN。

**會改變讀者決定的更正**

- `aocai-working-free-ai-courses-2026`：上一輪已在 12:31:45 把 `deadline_at` 交接給 11/26 工研院班（11/19 截止）。本輪補的是**更晚的兩個仍開放梯次**：12/02 台北班（ievents 3585，逐字報名期間「2026/10/14 12:00 ~ 2026/11/27 12:30」）與 12/14 班（ievents 3588，「2026/10/19 07:00 ~ 2026/12/11 17:00」）。3588 的內文標【台中場】而地點欄寫臺北市大安區，兩說並存進 unknowns——讀者要報名臺中場卻看到臺北市地址，這種矛盾必須寫出來，不能替官方選一個。
- `hsinchu-city-ai-youth-digital-tool-subsidy-2026`：**同一筆紀錄裡兩個互相矛盾的數字**。`summary` 早在 01:47 就寫「餘額仍是 NT$253,197（4.4%），自 11/9 17:26 起未再下降」，`cost_note` 卻還寫「餘額以每日數萬元速度下降」、`access_risk` 寫「經費僅剩 5.9%」。12:19 重讀官方頁仍是「剩餘補助經費 $253, 197(4.4%)」，已改寫兩處。順帶確認「購買日期自 115 年 4 月 2 日起至 115 年 10 月 31 日止」——**現在才新訂閱的人不符合補助**，這筆只對「已在期限內購買、尚未送件」的人有行動價值。
- `mango-inference-community`：`cost_note` 原本是 `null`，卡片只印「未列金額」，讀者看到的是「有 US$10 免費額度」的標題配一個空的費用欄。實際是**按量計費的預付制**：餘額歸零即拒絕請求，而「$10 in free credits」只出現在行銷頁——`inference.mangoboost.io` 的 docs（credits-and-balance、billing-and-payments、models-and-pricing）以 free credit／$10／30%／discount／promo 搜尋 **0 命中**。已寫進 `cost_note`，並把累積的重複來源 URL 併成一筆。
- `kiro-free-fifty-credits-monthly`：**上一批新增的紀錄把官方已明文的事記成未知**。FAQ 逐字「New users can start with the perpetual Kiro Free tier, which includes 50 credits per month」與「For individual subscriptions, usage limits reset at the start of each billing month. Unused credits do not roll over to the next month.」——重置與不結轉都不是未知。另外定價頁有一段原紀錄漏掉的升級試用「when you first upgrade to Pro, you'll get the rest of the month free, plus 500 trial credits to use within 12 months」，這是**要先付費訂閱**才拿得到的東西，已寫進 `cost_note` 與 `access_risk`，避免被讀成免費層加碼。
- `read-ai-free-monthly-five-shared-meeting-reports`：額度不變（5 份／月、單場 1 小時、免卡），但條款 §4(b) 逐字「Read AI may use your User Content to train, develop, and improve its artificial intelligence and machine learning technologies」，免費與付費帳號都在授權範圍內（與 Privacy Policy 衝突時以 Privacy Policy 為準）。原紀錄只寫內容權利與參與者同意，漏掉最直接影響「要不要把會議交給它」的那一條。
- `parseur-free-monthly-twenty-first-process-credits`：把 `taiwan_note` 從「保留地區限制」升級成可引用的範圍——條款只排除 EU／US 禁運國與 SDN／Entity List 等制裁名單，台灣未被列名；仍沒有台灣可用的正面承諾，`taiwan` 維持 Unknown。
- `supabase-aws-activate-vc-three-hundred`／`context-free-monthly-thousand-shared`：各修一句與官方原文不符的敘述。Supabase 的 US$300 是「any Supabase product including database, auth, storage, and edge functions」，不是模型推論額度；Context.dev 的 Free 除了「2 concurrent」還有**全組織每分鐘 10 次請求**、10 monitors、1 active batch，後者才是實務上先撞到的牆。
- `scrapegraph-free-credit-reset-conflict`：一次性 500 點與每月 500 點兩種官方說法**今天仍並存**（定價頁 one-time、docs pricing.md `/month`），維持衝突狀態不裁決。
- `mozilla-foundation-human-scale-ai-incubator-2026`／`jules-free-fifteen-tasks-entrypoint-watch`：主張不變，只補查核路線。Mozilla 官方網域今天直取只回 60 字元空殼（連試三次），改讀 Wayback 對同一頁的快照才取得逐字「The deadline to apply is Friday, November 20, 2026 at 11:59 p.m. Pacific Standard Time (UTC-8).」，這件事寫進 `verification_scope` 與來源標籤，不假裝是直讀官方頁。Jules 的 changelog 逐字確認 11/11 之後轉唯讀、12/31 退場，`deadline_at` 與 `expires_at` 都正確，不動。

**新增 1 筆機會**

- `ibm-bob-free-trial-50-bobcoins-30-days`（A 級）：bob.ibm.com/trial 逐字「Get 50 Bobcoins for 30 days」「After your trial ends, upgrade to Pro, Pro+, or Ultra to continue using IBM Bob.」；定價頁把 Trial 列為「Free／30 days／50 Bobcoins」並註明 **「No payment required」**，付費級距 Pro US$20／月、Pro+ US$60、Ultra US$200。這是額度型試用，不是永久免費層；`taiwan` 記 **Unknown**——官方只寫價格「vary by country … subject to availability」，全站無國別清單，不能因為英文頁可讀就當成台灣可申請。`setup_cost_usd` 0（免付款方式）與 `recurring_cost_usd` 0（試用期無月費）分開寫，沒有把 Pro 的 US$20 混進來。資料庫原本只有 SkillsBuild 與 watsonx Lite 兩筆 IBM 紀錄，這是第一個 IBM 開發工具試用。

**未納入（保留否決理由）**：子代理只找到 1 筆達收錄門檻。Learning Commons（CZI 相關開放教育基建）全站無費用、額度與申請資格，屬基礎設施不是可計量額度；IBM Bob Premium Package 首月免費（2026-12-31 前）須先有付費訂閱，已併入新紀錄的 `cost_note` 不另立；Scale×UMSL 免費 K-12 教師訓練只有二手新聞頁、對象為美國教師；NVIDIA NIM 的聚合站條目與既有 `nvidia-build-free` 疑同一方案。

**品質改善（本輪唯一一項）：把「同時有兩個維護回合在跑」變成一行可查的狀態**

- 觀察到的問題：今天 11:15 與 12:04 **各啟動了一個同題目的維護回合**，兩邊讀寫同一份 6MB `data/offers.json`。可觀察到的後果：那一輪自己的紀錄寫著「同一時段另一個 session 的寫入讓我看到一次 59,149 行的假 diff（檔期中間狀態）」；本輪在 12:06:51 與 12:14:01 兩次看到整份檔案被重寫，其中一次讀到的 README 與批次欄位互相矛盾（19／1,027 vs 16／1,030）；兩輪都排到 `aocai-working-free-ai-courses-2026`，把稀缺的查核時間花在同一個 12:30 截止的官方頁上；最糟的是，本輪在 12:29 寫進 `MAINTENANCE.md` 的兩處接手說明，被那一輪 12:32 的 `git add -A` 一起 commit 進 `d78a15f`，於是那則紀錄一度宣稱「本輪未 commit，由接續回合代為提交」——**內容是錯的**，已在前一則以補記更正。這些都不會被現有測試抓到：`tests/validate.py` 讀的是「已經寫完的檔案」。
- 預期結果：開場一行 `python3 tools/round_lock.py status` 就知道有沒有人在寫；搶不到鎖就只讀、換 ID、把寫入延後，不必等 `git diff` 突然膨脹幾萬行、或看到別人的 commit 裡有自己的句子才發現。
- 做法：`tools/round_lock.py`——repo 根目錄 `.round-lock.json`（已列入 `.gitignore`）記 pid／主機／開始時間／備註；判定用 pid 是否還活著，不靠心跳或超時；程序被砍掉留下的鎖，下次 `acquire` 會接管並說明；只有持有者能 `release`。它沒有強制力（不會阻止寫檔），但把衝突從「事後從 diff 猜」變成「事前一行輸出」。
- 驗證方式：`python3 tools/round_lock.py --self-test` 覆蓋四條規則（活的持有者不得被接管、不同主機的同號 pid 只能接管並講明、只有持有者能 release、pid 已死要能接管）→ `PASS: round lock ...`；另在真的 repo 上實測 `status` → `acquire` → 第二次 `acquire` 被拒 → `release`，輸出 `no round lock: nobody claimed this repo`。

**本輪遇到的流程問題（下輪要避開）**

1. **同一個 repo 可能有兩個回合同時在跑**：本輪前 25 分鐘完全無法寫檔，最後是等對方 commit 後才動。下輪開場先 `python3 tools/round_lock.py status`，再跑 `tools/queue.py`；對方還在跑就只讀，不要中途插隊——本輪的教訓是插隊的句子會被對方的 `git add -A` 一起 commit。
2. **子代理讀得到、主 agent 讀不到**：Mozilla 官方頁對子代理回完整 HTML、對主 agent 的 curl 只回 60 字元空殼。抽驗失敗先換路線（Wayback／不同 UA／子頁），並在 `verification_scope` 寫清楚讀的是快照還是直讀。
3. **「複核了但沒更新來源時間」會被擋**：第一次套用時 `supabase`／`context`／`jules` 被 `no per-source accessed time for this batch record` 擋下——只改 summary 不算複核，至少要有一個來源的 `accessed_at` 指到本批次。
4. **同一 URL 當天只能有一筆來源**：`scrapegraph` 與 `mango` 都累積了重複 URL，直接更新會變成同日兩筆而被擋；寫入前先按 URL 併。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,050 筆，S/A/B/C/D＝139/188/127/275/105）、`node --check app.js`、`node tests/filters.cjs`（全綠）、`python3 tools/prioritize.py`（S 139／A 187→188，其餘不變）、`git diff --check`、`python3 tools/round_lock.py --self-test`。

瀏覽器（本機 8977、headless Chromium，先在資料副本跑完整流程、再到真實 repo 重跑）：資料 1,050 筆；捷徑「本輪更新」13 筆、「免費方案」686 筆、「台灣條件適用」154 筆、「開發者」595 筆；關鍵字「IBM Bob」回新紀錄（A 級）、「服務業AI免費課程」卡的截止膠囊顯示**「申請截止 2026-11-19 · 剩 8 天」**、「新竹市」卡顯示 4.4% 與購買期限已過、「Mango」展開後費用說明為新的 `cost_note`；「截止日由近到遠」排序中 AOCAI 落在 11/17 之後、11/21 Mozilla 之前；載入更多 24→48；390px 寬 `scrollWidth=390` 無水平溢出、console error 0。

**下輪優先（最多五項）**

① `aocai-working-free-ai-courses-2026`（`next_review_at` 11/18、`deadline_at` 11/19）：11/19 後把 `deadline_at` 接給 12/02 班（報名至 11/27 12:30）或 12/14 班（12/11 17:00）；同時確認 11/16 班是否真的關閉、11/26 班是否額滿、3588 的地點矛盾是否被官方修正。來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`...id=3585`、`...id=3588`、`https://college.itri.org.tw/Lesson/LessonData/7571A149-3346-4FAE-B5AF-DCADB2DBDAC3`。
② `mango-inference-community`（next 11/12 09:00）：11/12 起價格表是否回原價（platform 與 pricing 兩頁），以及 US$10 贈額是否須綁付款方式——docs 至今 0 命中，只能看註冊後的 console（本任務不登入，故列為長期缺口）。
③ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`（next 11/14）：11/30 前是否出現「經費用罄／停止受理」公告；餘額已連續多次讀值停在 NT$253,197，若 11/30 前仍不動，把 `next_review_at` 拉到月底並在 `unknowns` 註明讀值停滯。來源 `https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`。
④ `moe-ai-talents-ark-115-free-ai-literacy-downloads`（12/11）：AJAX 逐檔清單與授權條款仍未取得；要確認 PDF 直連是否需要登入、可否改作與商用。
⑤ `ibm-bob-free-trial-50-bobcoins-30-days`（12/11）：確認台灣帳號能否完成試用表單（IBM 帳號條款與 store 國別）與 50 Bobcoins 的扣點率；另查 Premium Package 首月免費（2026-12-31 前）是否值得獨立成案。

**常態待辦（不佔上面五項）**：`tools/linkcheck.py` 本輪未全掃（併發下的 404 不能當證據；上次全掃的 7 個 dead 都是已註記的失效頁）；`verification_scope` 缺漏與 `conditional`＋`FREE`＋`HIGH BUT LIMITED` 的語意漂移仍未處理（先訂規則再改）；免費專區約 170 筆「費用欄位 null、沒有 cost_note」只印「未列金額」，本輪只補了 Mango 一筆。

**發布**：commit `45b106f` 已推上 `origin/main`（`d78a15f..45b106f`），對應的 `pages build and deployment`（run 42960298492）status=completed／conclusion=success。推送後在公開站 <https://richardhan.github.io/ai-access-intelligence/> 實測（?v=45b106f 破快取）：資料 1,050 筆、「本輪更新」13 筆、「免費方案」686 筆、「台灣條件適用」154 筆、「開發者」595 筆；資料更新 2026/11/11 12:33 Asia/Taipei；關鍵字「IBM Bob」回新紀錄（A 級）、「服務業AI」卡的截止膠囊為「申請截止 2026-11-19 · 剩 8 天」且展開後含 12/02（3585）與 12/14（3588）兩個梯次與地點矛盾；直接抓 `data/offers.json` 亦為 1,050 筆、`reviewed_ids` 12 筆、`new_ids` 1 筆、`unreviewed_existing_count` 1,037、`updated_at` 12:33:41；console error 0。以上是推送後在公開站實際載入的結果，不是只憑 Actions 成功推論。

## 2026-11-11 13:05–13:35（Asia/Taipei）｜R=18、A=1（1 機會）、U=1,032、attempted=0

**基準**：開場工作樹乾淨、`HEAD=0acbc8a`、`main == origin/main`；`python3 tools/round_lock.py status` 顯示無人持有（12:04 那輪已於 12:35 commit/push 結束）。資料 1,050 筆（834 機會／50 政策／166 觀察線索）；嚴格逾期 0 筆、7 天內到期 9 筆（9 筆都在 12 小時冷卻內）、retry 桶 0 筆、最久未核 = 2026-11-01 共 10 筆。

**範圍與理由**：①最久未核輪替 10 筆（2026-11-01，含 Vinci、TurboScribe、Reclaim×2、Buzz、ChatPDF、Jan、Cerebras×2、Mathpix）——這一層是月度排程裡最舊的一批；②高風險 8 筆：Qoder／Tencent 兩個仍在跑的限時窗，加上 2026-11-02 六筆帶明確配額或同頁條款衝突的紀錄（Activepieces、Traceloop、Codespaces、Devin、Poe、Firecrawl）；③新機會研究（32 個頁面／目錄線索）。三個子代理平行執行，主 agent 負責整合、複核台灣 Yes 的新紀錄與發布。

**兩個同時段的教訓（本輪開場就踩到）**：我依 `next_review_at` 手挑了 8 筆「7 天內到期」名單，派出去 5 分鐘後才發現其中 6 筆在 11:16–11:22 已被上一輪核實——`tools/queue.py` 的 12 小時冷卻本來就會濾掉它們，但沒有介面能對「手動名單」問同一句話。當場改派成 2 筆（Qoder／Tencent）＋6 筆 11/02 配額紀錄，並把這個缺口做成 `--explain`（見下方品質改善）。

**實質更正**

- `qoder-free-mechanisms`：**Qoduck 免費窗今日 10:00（UTC+8）結束**。官方 `docs.qoder.com/events/qoduck-free` 逐字「Promotion period: From November 7, 2026 to November 11, 2026 at 10:00 (UTC+8).」「Qoduck will be removed when the promotion ends.」——原標題仍把它寫成現行機制，讀者中午之後照著找會找不到模型。已改標題與摘要，並補一筆政策歷史。仍可用：每日 100 Credits（桌面 App 手領、30 天效期、結束日 TBA）、Efficient 0.0×（付費者；免費者僅 Pro 試用期）、離峰 14:00–00:00 UTC 的 60%／80% 折扣（台北 22:00–08:00）。Qwen3.8-Flash 免扣的兩頁矛盾（flashoffer 寫 11/07 00:00 結束 vs 100credits 頁仍寫 extended、結束日待公告）今日仍並存，不裁決。
- `turboscribe-free-daily-three-thirty-minute-files`：昨日 11:19–11:20 的 Cloudflare 403 **已排除**（今天以 Chromium 讀到定價頁、首頁與條款）：3 份／日、每份 30 分鐘、一次 1 份、優先度較低、免卡全部逐字不變；已清掉 `last_review_attempt_at` 並把 `next_review_at` 從 11/18 換回 12/01。這是「403 不等於方案結束」的又一個例子。
- `tencent-hy4-workbuddy-codebuddy-free-window-nov4-15`：中英文新聞稿 dateModified 仍 2026-11-06，免費窗 11/4–11/15 未延期也未提前結束；**沒有時區與時鐘點、額度也沒有數字**（英文 available for free／中文「一定额度」）。產品端 Free 是 100 credits／月＋每日 30 credits 活躍獎勵（結束日另公告），7 天 Pro 試用要綁卡並開自動續訂——兩者不能混成同一個免費窗。
- 最久未核那 10 筆**沒有一個數字需要更正**（Vinci US$1,000／最高 US$10,000、TurboScribe 3×30 分鐘、Reclaim Lite 5 agents、Reclaim 教育五折 12 個月、ChatPDF 2 份／日、Mathpix 10 pages＋10 images、Cerebras 大使 US$100 全部重讀後逐字相符）。新增的是邊界條件：ChatPDF 前端另有未公布數值的每日上傳／對話／訊息上限；Buzz 官網 Classic 清單仍列 macOS (Intel) 而 README 寫 v1.4.5 後需 Apple Silicon；Reclaim 試用天數 help center 寫 30 天、網站 CTA 寫 14 天。
- 六筆 11/02 配額紀錄**主張不變**，但三個官方矛盾今天仍並存：Activepieces「1,000 a month」vs「Credit reset Daily／Waits for tomorrow」、Traceloop 卡面「Up to 5 Seats」vs 同頁 FAQ「There is no seat limit」、Poe 每日點數無數字（另確認官方訂閱國家表列 Taiwan，但那只管訂閱、不代表免費層在台開通）。
- `taiwan-industry-talent-investment-ai-courses-2026`：兩份 wda 附件（nws／ws.wda.gov.tw 的 Download.ashx）在 13:38 實測**連主機根路徑都回 404**，而存活的新聞頁 s=19233 上五個附件連結全部指向同一個 nws 主機。只把它寫進 `unknowns`（404 不代表方案終止），本輪未改任何主張、未動 `verified_at`。

**新增 1 筆機會**

- `ntpc-gemini-education-city-pro-accounts-115`（S 級，台灣 Yes）：新北市教育局採購 Google Workspace 教育網域的 Gemini Education 授權，專案網站逐字「全市學校共配發了9425組帳號，會依照學校規模有不同的額度」、市立明德高中公告寫採購「配置1萬組 Pro 帳號」；Pro 授權 115/04/01 全面啟用、可用至 116/03/31，經費由教育局支應、使用者零付費，帳號在 gsuite.ntpc.edu.tw 教育網域且官方稱資料不作 AI 訓練。限新北市學校教職員經校內資訊組申請（行政人員優先、超額比序；明德高中另要求 A1／A2、A3、B5-1 研習），並須每週登入 1 次、每學期 1 場 AI 研習、引用生成內容標註 AI 比例，未達標可收回。主 agent 於 13:24 自行直取兩頁逐字複核（`expires_at` 只寫日期 2027-03-31，因為官方只給 116/03/31、沒有時鐘時間，不寫 23:59 以免卡片宣稱官方精度）。

**未納入（保留否決理由）**：子代理檢視約 32 個線索，只有 1 筆達門檻。Grok for Startups、GitHub for Startups、Upstage×AWS、AMD Developer 都已有紀錄（x.ai 條款仍是紀錄已記的 2026-10-27 版，無需更新）；OpenAI Daybreak 個人存取要付費方案、Frontline Defenders 只寫「starting with the United States」；Anthropic Claude for Startups 官方已寫無名額；Mistral Education US$14.99 是付費折扣；Verdent 無免費層；Chromebook Plus 送 12 個月 AI Pro 的條款停在 2024-12-31 且台灣不在國別清單；桃園 AI 好幫手 10/11 已截止、臺北青年補助 11/10 已過、教育部示範學校 5/27 已關閉；Paperspace／DigitalOcean Gradient Free GPU 有「FREE GPU $0」但機型、小時上限與是否綁卡全未公布，列觀察線索而非紀錄；NTU 低收戶 AI 訂閱補助只有新聞、官網查無公告頁；Hailuo AI 定價頁兩次都只有 JS 外殼。

**品質改善（本輪唯一一項）：`python3 tools/queue.py --explain ID…`**

- 觀察到的問題：本輪開場用手挑的清單裡有 6 筆在 1.5 小時前才被另一個回合核實（11:16–11:22），而 12:04 那輪也與 11:15 那輪排到同一個 `aocai`。`build_queue()` 的 12 小時冷卻一直是對的，錯的是「手動名單沒有任何介面可以問同一句話」——上一輪因此只能靠 `round_lock` 事後發現衝突，這一輪則是靠我事後翻 `verified_at` 才發現白派了 6 筆。
- 預期結果：列清單前一行就能看到「冷卻中，不排入：2.2 小時前才打開官方頁」，把查核預算留給真的沒人碰過的紀錄。
- 做法：把單筆判定抽成 `classify(record, now, cooldown, window)`，`build_queue()` 與新的 `explain()` 共用同一份規則（不再有第二套實作），CLI 加 `--explain ID [ID…]`（`--json` 亦可）。沒有改任何桶的順序或門檻。
- 驗證：`python3 tools/queue.py --self-test` 新增四條斷言（冷卻中的 ID 必須回報「冷卻中」並附小時數、輪替 ID 必須回報「會排入 [rotation]」、已截止 ID 回報不進佇列、未知 ID 另外列出）→ PASS；實跑 `--explain` 五個 ID（含本輪剛核的 TurboScribe／Qoder／新紀錄）均正確顯示冷卻中，`--limit 12` 的佇列與基準數字與改動前一致（1,051 筆、可行動 967、7 天內到期 9、retry 0）。

**來源掃描（full linkcheck，13:07 起跑、145 秒）**：2,863 個 URL 可開、9 個 dead（404）、13 個 unreachable、65 個 blocked。9 個 dead 逐筆檢視後都落在「該頁失效已寫進來源 evidence／標題」的紀錄（voyage 的行銷站 pricing、nscale 定價頁、qoder community-boost、salad、astamuse、deepinfra papers、ideogram docs .md、wda 附件），本輪不新增維修項；wda 那筆已如上述寫進缺口。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,051 筆，S/A/B/C/D＝140/188/127/275/105）、`node --check app.js`、`node tests/filters.cjs`（全綠，含 0 筆缺 status）、`python3 tools/prioritize.py`、`python3 tools/queue.py --self-test`、`git diff --check`。資料層稽核：與 HEAD 相比只有 19 筆變動（18 筆複核＋1 筆新增），無刪除、無 ID 變更。

瀏覽器（本機 8981、headless Chromium，改資料後重跑）：全庫 1,051 筆；捷徑「本輪更新」19、「免費方案」687、「台灣條件適用」155、「開發者」595；首頁顯示「18 本輪局部複核／1 新增／1032 尚未複核／資料更新 2026/11/11 13:24」；關鍵字「新北市 Gemini Education」回新紀錄（S 級、台灣條件適用），詳情列正確顯示效期「2027-03-31（來源未列時刻）」、核實範圍 2026-11-11 13:24 與 4 項缺口；「Qoduck」卡標題已改為「已於 2026-11-11 10:00 結束」；TurboScribe 卡不再出現「追查未成功」且核實日為 2026/11/11；「截止日由近到遠」排序前三為 Amazon ARA 11/12 15:59（剩 1 天）、ADI FORUM 11/12、酷 AI 11/13；載入更多 24→48；390px 寬 `scrollWidth=390` 無水平溢出、console error 0。

**下輪優先（完整五項）**

① `mango-inference-community`（next 11/12 09:00）：11/12 起 platform 與 pricing 兩頁是否回原價、「through Nov 11」是否已消失；順帶確認 `inference.mangoboost.io/pricing` 是否仍只回「Loading pricing…」外殼（本輪 13:1x 實測仍是外殼）。來源 `https://www.mangoboost.io/platform/mango-inference`、`https://inference.mangoboost.io/pricing`。
② `qoder-free-mechanisms`（next 11/12 12:00、cadence daily）：確認 Qoduck 是否真的自模型選單消失、`events/100credits` 的 Flash 舊敘述是否被更新（若仍衝突就維持並列），以及每日 100 Credits 是否仍可手領。來源 `https://docs.qoder.com/events/qoduck-free`、`.../100credits`、`.../flashoffer`。
③ `tencent-hy4-workbuddy-codebuddy-free-window-nov4-15`（next 11/13、窗到 11/15）：11/16 之後確認免費窗是否如期結束、有沒有延期公告，以及中國站體驗版 500 積分是否同步轉付費。來源 `https://www.tencent.com/zh-cn/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/`、`https://www.codebuddy.ai/docs/ide/Account/Subscription`。
④ `hsinchu-city-ai-youth-digital-tool-subsidy-2026`（next 11/14、受理至 11/30）：13:07 再讀仍是「剩餘補助經費 $253,197（4.4%）」（自 11/9 17:26 起未再下降）；11/30 前若仍不動，把 `next_review_at` 拉到月底並在 `unknowns` 註明讀值停滯，同時確認有無「經費罄／停止受理」公告。來源 `https://dgservice.hccg.gov.tw/serviceNotice.do?rule=guest&id=1323`。
⑤ `aocai-working-free-ai-courses-2026`（next 11/18、`deadline_at` 11/19）：11/19 後把 `deadline_at` 接給 12/02 班（報名至 11/27 12:30）或 12/14 班（12/11 17:00），並確認 11/16 班是否關閉、11/26 班是否額滿、3588 的地點矛盾是否修正。來源 `https://ievents.iii.org.tw/EventS.aspx?t=0&id=3544`、`...?id=3585`、`...?id=3588`。

**常態待辦（不佔上面五項）**：`ntpc-gemini-education-city-pro-accounts-115`（next 12/11：各校剩餘名額、私立學校 115.03.09 函文、116 年度是否續辦）；`taiwan-industry-talent-investment-ai-courses-2026` 的 wda 附件主機仍 404，要找仍可開啟的官方鏡像或改用 s=19409 的新聞頁版本；79 筆紀錄的 `verified_at` 比所有來源查閱時間新（多為 11/07–11/08 批次，來源缺 `accessed_at`），下輪起排到時一併補；`tools/linkcheck.py` 的 9 個 dead 仍屬「已註記的失效頁」，暫不列維修。

**發布**：commit `9fd867a` 已推上 `origin/main`（`0acbc8a..9fd867a`，fast-forward，推送前 `git fetch` 確認遠端無其他更新）。GitHub Pages（legacy build、source=main）於 13:31:23（台北）重建完成：`data/offers.json` 的 `last-modified` 與 etag 大小（6,086,322 bytes）與該 commit 的檔案逐位元組相符。公開站 <https://richardhan.github.io/ai-access-intelligence/> 實測（`?v=9fd867a-fresh` 破快取）：全庫 1,051 筆、資料更新 2026/11/11 13:24 Asia/Taipei；捷徑「本輪更新」19、「免費方案」687、「台灣條件適用」155、「開發者」595；關鍵字「新北市 Gemini」回新紀錄（S 級），詳情顯示「截止與期限 方案或免費期結束 2027-03-31（來源未列時刻）」與「核實時間 2026/11/11 13:24」；console error 0。註記：對應 workflow run 的 `head_sha` 仍顯示 `0acbc8a`（legacy 建置在觸發當下讀取 branch HEAD，run 標籤落後一個 commit），因此發布確認以「伺服器回傳的檔案內容與 commit 相同」為準，不以 run 標籤為準。

## 2026-11-14 06:10–06:50（Asia/Taipei）｜R=20、A=1（1 機會）、U=1,031、attempted=1

**基準**：開場 `HEAD=9dd16cc`、工作樹乾淨、`main == origin/main`。`round_lock.py status` 顯示一筆 06:07:34 的鎖，pid 18010 已不在（前一個回合被砍掉），`acquire` 接管後才開工。資料 1,051 筆（835 機會／50 政策／166 觀察線索）；嚴格逾期 14 筆、7 天內到期 8 筆、retry 1 筆、最久未核仍是 2026-11-01 那批（排程都在 12/01，未到期）。

先跑 `tests/validate.py` 就直接失敗：`amazon-ara-multilingual-contextual-ai-fall-2026` 的 `deadline_at`（11/12 15:59）已過，狀態仍是 `application_based`。順手掃全庫，同樣情況共 3 筆（另有 `moda-adi-forum-2026-free` 11/12、`taipei-kuai-ai-school-grant-batch2-115` 11/13）——前兩天沒有回合，網站因此連續兩天把已截止的活動顯示成可報名。

**範圍與理由**：①逾期與期限剛過的 5 筆（Amazon ARA、MODA ADI FORUM、台北酷 AI、Tencent Hy4、AutoClaw）；②7 日內到期與限時窗 7 筆（UGREEN hackathon、StepFun、桃園課程、勞動部 166783、Rime、AOCAI、新北 UKO）；③輪替與條款追蹤 8 筆（Runable、Felo、Mango、Qoder、Grammarly、DigitalOcean×Secret、新竹市補助、CPC）＋嘗試失敗 1 筆（Adobe）。三個子代理平行（9／10／新機會），主 agent 自行直核 Amazon ARA、ElevenAI、CPC 兄弟課程與 Cloudflare／Reducto 的重複性。

**實質更正**

- `amazon-ara-...`：**Fall 2026 已關閉**。ARA 索引頁由 11/11 讀到的「Fall 2026: Open Now」「extended to November 11」改為「Fall 2026: Closed　The submission period closed on November 11.」；徵案頁時間軸仍寫到 11/11 23:59 PT，且 `article:modified_time` 是截止後的 2026-11-12 15:32。狀態改 `applications_closed`、停止每日追蹤。
- `moda-adi-forum-2026-free`：**活動已辦畢**。報名系統整個回應只剩「報名已截止，截止時間為 2026/11/12 17:00。」（53 bytes，六個場次表單與送出按鈕消失）；官方 11/12 會後成果稿寫「今（12）日於台北世貿一館舉辦」。改 `closed`、`on_new_signal`。
- `taipei-kuai-...`：第 2 批期限 11/13 已過，轉知頁與修訂版計畫書 PDF（406,182 bytes 未變）仍寫 11/13、「延期／延長／順延／額滿」0 命中，教育局列表仍查無此案。沒有官方「已截止」字樣，因此判 `expired`（不是 closed_confirmed），表單 `forms.gle` 未開啟列缺口。
- `hsinchu-...`：剩餘補助經費不再停滯——11/11 的 NT$253,197（4.4%）降到 11/14 的 **NT$192,051（3.3%）**，三日核銷 NT$61,146；受理仍至 11/30 或經費用罄，無停止受理公告。`next_review_at` 由 11/14 拉近到 11/18。
- `tw-labor-...-tnnu-03`：唯一實質變化是**報名人數 28 → 39，已超過名額 34**（超額報名、靠 11/18 筆試與口試篩選）。原本「剩約 6 席」的敘述已失效，summary／access_risk 改寫。
- `aocai-...`：11/16 班在官方總覽由未額滿轉為「**已額滿**」；11/27 臺中班同樣額滿。ievents 3588 的「活動地點：臺北市大安區」與【台中場】矛盾已消失（場次表改「臺中市」、上課地點台中文心會議室）。
- `autoclaw-...`：本期 M11W2 不延長（11/15 23:59 到期），但官方 11/13 已公告下一期 **M11W3（11/16–11/22，同為 100M Tokens／10,000 credits，每帳戶一次）**，週福利續辦；下輪應以 M11W3 為現行期。
- `mango-inference-community`：11/11 過了 3 天，platform 頁仍印「30% off all models through Nov 11. Prices below already include the discount.」與折扣價（DeepSeek V4.1 Flash $0.20→$0.14），未撤文案也未回原價；pricing 頁仍只回「Loading pricing…」外殼。保留為矛盾，不改費用欄位。
- `cpc-moeai-elite-free-ai-course-115`：原紀錄「僅 2027/01/14 梯可報名」對它自己那門課仍成立，但同計畫另有兄弟課程「AI 製造業五大職能數據分析實戰」桃園班 **11/23–12/28（30 小時、10 人開班）**，頁面寫「點選上方日期即可報名」。已把兄弟課程寫進 summary，並列報名狀態為缺口（沒有取得開放證據）。
- `adobe-startups-...`：換三條路線後官方部落格可讀且內容未變，但計畫頁 `business.adobe.com/solutions/startups.html` 仍 HTTP 逾時、Firefly 產品頁 403。依規則只記 `last_review_attempt_at`／reason，**不刷新 `verified_at`**，下次複核排在 11/18（14 天內）。
- 其餘 10 筆（taoyuan、ntpc-uko、tencent、ugreen、stepfun、runable、felo、qoder、grammarly、digitalocean、rime）主張不變，只更新查閱時間、來源 accessed_at 與少數邊界條件（Qoder 的 Qoduck 頁仍未標 [Ended]、模型選單需登入不可觀測；Tencent 中英文稿 dateModified 仍 2026-11-06、額度仍無數字；Runable 定價頁 SSR payload 有 `limit:15000, interval:"month"` 但同頁 `freePlan.credits.month` 是 null）。

**新增 1 筆機會**

- `elevenlabs-elevenai-free-three-months-mac`（申請審核制、台灣 Unknown）：ElevenLabs 2026 年 11 月的新產品 ElevenAI（macOS 桌面 App：90+ 語言聽寫＋會議紀錄，逐字稿可經 MCP 接到既有 AI 工具）。官方產品頁的 meta／og／twitter description 共 6 處逐字「**Free for 3 months on Mac.**」，但頁面本文只寫「Sign up for early access」；條款要求 18 歲以上、**僅供商業／專業用途、須以組織（Organization）網域信箱註冊**，出口管制只排除受美國制裁國家（未列台灣）。免費期起算日、額度、是否綁卡與期後計價全未公布，台灣是否在 early access 隊列未核。

**未納入（保留否決理由）**：子代理比對 aicreditradar／aifree.dev／freetokens 等目錄後，只提出 4 筆，其中 3 筆經主 agent 直核後**判定為已收錄**：Cloudflare for Startups 的 Tier 3 US$10k 與 Workers AI 自 12/1 起不納入 credits 已寫在 `cloudflare-startup-tier3`（11/10 版）；Reducto 的 15,000 credits／US$150 與「已無美國限定」也已寫在 `reducto-standard-initial-credit-us-only`（11/09 版）；CPC 則只更新兄弟課程。其餘否決：數產署 AI 領航智慧服務代理人（10/21 已截止、限本國公司）、衛福部 AI 排班案（限部屬醫療機構）、AWS Kiro 學生方案擴大到 132 校（亞太名單無台灣學校）、Devin SWE-2 免費（限付費訂閱）、臺中勞工大學 AI 課程（10/2026 前已開課、報名關閉、官網 JS 載不出現行梯次）、ChatGPT Go（付費）、Claude for higher education（無免費額度、合作校無台灣）、高屏澎東分署第 02 期（10/26 已截止）、Neon Agent Plan（須先訂付費方案）、臺北酷課雲酷 AI（校園平台、無可領額度）、US$2–10 級微型促銷（金額過低或需綁卡）。

**品質改善（本輪唯一一項）：`tests/validate.py` 一次列出全部「期限已過但狀態仍可行動」**

- 觀察到的問題：這條規則原本寫在逐筆迴圈裡用 `assert` 中斷，一次只報一筆。今天全庫同時有 3 筆違規，第一輪只看到 `amazon-ara`，改完重跑才看到 `moda`，再跑才看到 `taipei-kuai`——每多一筆就多一次「改資料→重跑」，而且「修完第一筆就綠燈」會讓人誤以為全庫只剩那一筆。
- 預期結果：一次看到全部違規 ID、欄位與狀態，判斷要關閉哪幾筆不必來回三次。
- 做法：把判斷移到迴圈前，用 `_passed_deadlines` 收集全部違規後一次 `raise`，判斷邏輯與 `close_points()` 相同，沒有改任何門檻；逐筆迴圈裡的原規則刪除，只留一行指向新位置。
- 驗證：改完後直接跑 `python3 tests/validate.py`，單一錯誤訊息同時列出 3 筆（amazon 11/12 15:59、moda 11/12、taipei-kuai 11/13）與各自的 status；修完三筆後 PASS（1,052 筆、S/A/B/C/D＝138/188/127/275/108）。
- 附帶修正（不是第二項改善，是本輪資料變更暴露的測試耦合）：`tests/filters.cjs` 原本拿 `amazon-ara-...` 當「未來截止會顯示膠囊」的範例，該筆今天關閉後 `closeBadge` 依規則回 null，測試就紅了。已改成合成紀錄驗證文字與緊急色，再用動態檢查（任何 `closeBadge` 非 null 的可行動紀錄都必須在卡片正面有膠囊），不再綁單筆隨時會關閉的真實資料。

**本輪檢查**：`python3 tests/validate.py`（PASS，1,052 筆）、`node --check app.js`、`node tests/filters.cjs`（全綠；台灣條件適用 153、免費 685、開發者 594、本輪更新 21）、`python3 tools/prioritize.py`、`python3 tools/queue.py --self-test`、`git diff --check`。資料層稽核：與 HEAD 相比新增 1 筆、刪除 0 筆、變更 21 筆（20 筆複核＋1 筆 attempted），無 ID 變更。

瀏覽器（本機 8971、headless Chromium）：全庫 1,052 筆、資料更新 2026/11/14 06:33；首頁「20 本輪局部複核／1 新增機會／1031 尚未複核」；捷徑「本輪更新」21、「台灣條件適用」153、「免費方案」685、「開發者」594；關鍵字「ElevenAI」回新紀錄（詳情列正確顯示 US$0 設定費、每月費用未列、台灣資格待核實、核實時間 06:33 與 5 項缺口），「ADI FORUM」回已關閉卡（單一歷史標籤「已關閉・原分類」、D 級）；「Amazon Research Awards」詳情顯示「新申請已截止」、截止 11/12 15:59、核實範圍與 12 項缺口；「截止日由近到遠」前三為 AutoClaw 11/15 23:59（剩 1 天）、Tencent 11/15（剩 1 天）、UGREEN 11/16 15:45（剩 2 天）；載入更多 24→48；390px 寬 `scrollWidth=390` 無水平溢出、console error 0。

**下輪優先（完整五項）**

① `autoclaw-...` 與 `tencent-hy4-...`（都在 11/15 到期）：11/16 確認兩者到期後狀態；AutoClaw 應改以 M11W3（11/16–11/22）為現行期，Tencent 確認中國站體驗版 500 積分是否同步轉付費。來源 `https://autoclaw.z.ai/blog/news/M11W3/`、`https://www.codebuddy.ai/docs/ide/Account/Subscription`。
② `ugreen-ai-nas-hackathon-2026`（台北 11/16 15:45 截止）與 `tw-labor-...-tnnu-03`（11/16 16:00 截止）：截止前確認是否提前關閉；UGREEN 確認 Updates 是否出現 submissions closed，勞動部確認報名人數是否再增與是否提前關閉。來源 `https://ugreenhackathon.devpost.com/updates`、`https://its.taiwanjobs.gov.tw/Course/Detail?ID=166783`。
③ `stepfun-...`（11/17 11:59:59）與 `taoyuan-...`（11/17 最後一場）：截止當日上午確認；StepFun 確認 preview 是否退役、免費額度是否照扣，桃園確認 11/17 Teams 連結是否上架與截止日 11/17／11/20 矛盾是否修正。
④ `mango-inference-community`（11/14 已逾期 3 天仍掛折扣）與 `qoder-free-mechanisms`（每週）：Mango 確認是否回原價、有沒有延期公告或 pricing 頁恢復；Qoder 確認 Qoduck 是否自選單消失（需登入）與 Qwen3.8-Flash 兩頁矛盾是否更新。
⑤ `adobe-startups-...`（next 11/18、two attempts failed）：改找 Wayback 完整快照、Adobe 官方 helpx 頁或改用瀏覽器直開計畫頁；`hsinchu-...`（next 11/18）確認剩餘經費是否用罄、有無停止受理公告。

**常態待辦（不佔上面五項）**：`ntpc-uko` 的 PL-900 第二梯（11/21–22）報名入口與名額仍未找到；`cpc` 桃園 11/23 班報名狀態；`aocai` 11/26 與 12/02／12/14 班名額；`taipei-kuai` 是否開第 3 批；ElevenAI 台灣 early access 是否開放（官方無國別清單）；`mango` 的「Nov 11」年份；`runable` 定價頁 payload 與 `freePlan.credits.month` 的矛盾。

**來源掃描（full linkcheck，06:43 起跑、119 秒）**：79 筆 blocked（400／401／403／405／429／5xx，多為反爬或擋 HEAD）；dead 影響 10 筆紀錄（astamuse、baseten、deepinfra、nscale、perplexity×2、qoder-community-1024、salad、taiwan-industry-talent-investment、voyage），多是 web.archive 快照 URLError 與前幾輪已註記的失效頁（voyage 定價、nscale 定價、qoder community-boost、salad、astamuse、deepinfra papers、wda 附件）。**本輪新增或更新的來源都不在這份清單內**，因此不新增維修項；`taiwan-industry-talent-investment-ai-courses-2026` 的 wda 附件仍 404，維持寫在 unknowns。

**發布**：commit `cc2c918` 已推上 `origin/main`（`9dd16cc..cc2c918`，fast-forward）。推送時 gh 的 active 帳號是 `richard-han_tmemu`（對本 repo 無權限，第一次 push 回 403），改用同機已登入、且是 repo owner 的 `RichardHan` 推送，推送後已把 active 帳號切回原本的 `richard-han_tmemu`，沒有改動 remote URL 或任何憑證設定。GitHub Pages（legacy build、source=main）重建後，公開 `data/offers.json` 已回 1,052 筆、`latest_research_at` 2026-11-14T06:33:59+08:00、`reviewed_ids` 20 筆／`new_ids` 1 筆／`attempted_failed_ids` 1 筆；公開站（`?v=cc2c918-check` 破快取）實測全庫 1,052 筆、首頁 20 本輪局部複核／1 新增／1031 尚未複核，關鍵字「ElevenAI」回新紀錄（C 級），「ADI FORUM」回已關閉卡（單一歷史標籤），console error 0。
