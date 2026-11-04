# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

資料集目前有 **804 筆**（602 項機會、47 項政策、155 筆觀察線索），更新時間 **2026-11-04 16:12:40 Asia/Taipei**（不代表全庫複核）。本輪局部複核 **3 筆**既有案例，新增 **1 項機會**，其餘 **800 筆**既有紀錄未完成本輪複核，整筆追查失敗 **0 筆**。各案例僅核列明範圍，台灣個案資格須另確認；限時或重大條件衝突每日追蹤，其餘按月輪替。

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
