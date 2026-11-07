# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **834 筆**（631 項機會、47 項政策、156 筆觀察線索），更新時間 **2026-11-07 14:17 Asia/Taipei**（不代表全庫複核）。本輪成功局部複核 **10 筆**既有案例，新增機會 **2 筆**、政策 **0 筆**、觀察線索 **0 筆**；其餘 **822 筆**既有紀錄未完成本輪複核，核心來源整筆追查失敗 **0 筆**。各案例僅核列明範圍，台灣個案資格須另確認；限時或重大條件衝突每日追蹤，其餘按月輪替。

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
