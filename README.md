# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **869 筆**（665 項機會、48 項政策、156 筆觀察線索），更新時間 **2026-11-08 13:20 Asia/Taipei**（不代表全庫複核）。本輪成功局部複核 **17 筆**既有案例，新增機會 **3 筆**、政策 **1 筆**、觀察線索 **1 筆**；其餘 **847 筆**既有紀錄未完成本輪複核，來源整筆追查失敗 **2 筆**（Perplexity 官方頁全數 403）。各案例僅核列明範圍，台灣個案資格須另確認；限時或重大條件衝突每日追蹤，其餘按月輪替。

## 使用方式

可先選「台灣條件適用、免費方案、開發者、本輪更新」快捷入口，再搜尋產品或資格關鍵字，依紀錄類別、優先層級（S–D）、地區、費用、設定時間、證據與用量篩選。免費專區排除已截止、疑似過期及宣布終止的紀錄，但設定費零不代表後續免費；歷史仍可從全部紀錄搜尋。預設按綜合優先度排序，每次顯示 24 筆；S 級仍需符合個人資格。本輪更新僅涵蓋批次紀錄明列的複核與新增案例。點開「資格、限制與來源」查看完整摘要、來源查閱時間、核實範圍與下次複核安排。

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

同一 URL 再次查核時就地更新該筆來源（scope、evidence、查閱時間），不新增重複條目；`tests/validate.py` 對本輪批次強制「無重複 URL」與「每筆至少一個本次查閱時間」，前端則把同網址的歷次查核收在「較早的 N 筆同網址紀錄」內。

平行研究回報的來源查閱時間可能與實際時鐘不符（本輪收到比實際時間快約 1.5 小時的時間戳），主 agent 須自行重讀關鍵來源、以自己讀取的時間寫入 `accessed_at`，不得直接沿用未核對的時間。

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
