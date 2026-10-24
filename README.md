# AI Access Intelligence · AI 超值福利研究

繁體中文公開研究資料與靜態瀏覽儀表板。

線上網站：[AI Access Intelligence · AI 超值福利研究](https://richardhan.github.io/ai-access-intelligence/)

目前資料：338筆，包含254筆機會、43筆政策、41筆待覆核線索；非338項可直接領取優惠。資料集更新至2026-10-25 04:25 Asia/Taipei。本次實讀複核既有8筆（Meta Global AI Developer Hackathon、Anthropic生命科學客座研究員徵案、Deepgram Speak現場報到、Deepgram Flux TTS、Picsart WAN 3.0、Adobe Firefly 12個月無限促銷、Voyage AI免費額度、DeepSeek API新用戶贈額與法源），新增2筆機會（Poe每日免費運算點數、JetBrains Student Pack全套IDE與AI Assistant）；336筆原有紀錄中328筆未於本次重查，未全面重核。重要限制：Meta黑客松申請即將於10/25 11:59 PM ET（台灣10/26 11:59 AM）截止且正式規則全文尚未發布；Anthropic客座研究員需於錄取14天內取得機構同意函且商業公司排除；Voyage AI免費tokens不適用Batch API；DeepSeek依台灣數發部公告為公務機關禁用但民間未限；Deepgram Speak需赴美親至舊金山現場報到；Picsart WAN 3.0 Prime未納入免點條款；Poe每日點數由系統動態調配且不滾存；JetBrains教育授權嚴格限非商業學術使用。法律/監管結論除有明確官方來源外皆標未核實；資料更新不代表全庫重新核實。

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
