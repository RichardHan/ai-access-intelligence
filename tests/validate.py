import json,pathlib,math,datetime
import jsonschema
p=pathlib.Path(__file__).resolve().parents[1]
def unique_keys(pairs):
 result={}
 for key,value in pairs:
  if key in result: raise ValueError(f'duplicate JSON key: {key}')
  result[key]=value
 return result
d=json.loads((p/'data/offers.json').read_text(),object_pairs_hook=unique_keys);jsonschema.validate(d,json.loads((p/'schema.json').read_text(),object_pairs_hook=unique_keys))
history=json.loads((p/'data/policy-history.json').read_text(),object_pairs_hook=unique_keys)
ids=[x['id'] for x in d['offers']];assert len(ids)==len(set(ids))
assert all(h['record_id'] in ids for h in history), 'unknown policy history record_id'
# Two records for one plan render as two cards with independent status/tier, so a duplicate
# title is a data error: merge into the earlier ID and re-point policy history instead.
titles={}
for o in d['offers']:
 norm=' '.join(o['title'].split())
 assert norm not in titles, f'duplicate record title under different IDs: {titles[norm]} / {o["id"]} — merge instead of adding a second record'
 titles[norm]=o['id']
# Same-source-set pairs are reported for review but not fatal: distinct plans legitimately share one docs page.
source_sets={}
for o in d['offers']:
 if o.get('status')=='duplicate_merged': continue
 key=tuple(sorted({s['url'] for s in o['sources']}))
 if key: source_sets.setdefault(key,[]).append(o['id'])
for key,group in source_sets.items():
 if len(group)>1: print(f'note: {len(group)} records share an identical source URL set (check for duplicates): {", ".join(group)}')
for h in history:
 assert isinstance(h.get('change_type'), str) and h['change_type'].strip(), f'missing or empty change_type in history: {h.get("record_id")}'
 assert isinstance(h.get('sources'), list), f'history sources not a list in {h.get("record_id")}'
 for u in h.get('sources', []):
  assert isinstance(u, str) and u.startswith('https://'), f'non-https history source URL: {u}'
run=d['last_research_run']
reviewed=run['reviewed_ids'];new=run['new_ids'];attempted=run['attempted_failed_ids']
assert len(reviewed)==len(set(reviewed)) and len(new)==len(set(new)) and len(attempted)==len(set(attempted)), 'duplicate batch ID'
assert not (set(reviewed)&set(new) or set(reviewed)&set(attempted) or set(new)&set(attempted)), 'overlapping batch IDs'
assert (set(reviewed)|set(new)|set(attempted))<=set(ids), 'unknown batch ID'
assert run['unreviewed_existing_count']==len(ids)-len(new)-len(reviewed), 'incorrect unreviewed count'
assert d['updated_at']==d['latest_research_at']==run['completed_at'], 'inconsistent batch timestamps'
assert run['completed_at']>=run['started_at'], 'completed_at precedes started_at'
# A timestamp is a claim about when a page was actually read or the batch actually finished.
# Parallel research reported times ahead of the real clock (2026-11-09 批次先寫 completed_at 02:40、
# 13 筆 verified_at 在 02:08–02:34，而該批次 commit 是 01:46)，發布後網站就顯示還沒發生的
# 「資料更新」。檢查在建置／push 前執行，所以領先的分鐘數只有在此時才看得到；容差 5 分鐘吸收
# 寫入者與檢查者之間的正常時鐘差。
STAMP_RE=__import__('re').compile(r'(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}(?::\d{2})?))?')
def latest_stamp(value):
 if not isinstance(value,str): return None
 found=[]
 for day,clock in STAMP_RE.findall(value):
  try: found.append(datetime.datetime.fromisoformat(day+('T'+clock if clock else 'T00:00')))
  except ValueError: pass
 return max(found) if found else None
TZ_TPE=datetime.timezone(datetime.timedelta(hours=8))
NOW=datetime.datetime.now(TZ_TPE).replace(tzinfo=None)
TOLERANCE=datetime.timedelta(minutes=5)
CLOCK_RE=__import__('re').compile(r'\d{1,2}:\d{2}')
def close_stamp(value):
 '''最後仍可動作的時點。只寫日期的期限代表「當天仍可動作」，因此取當日 23:59:59；
 若照 latest_stamp 讀成當日 00:00，最後一天還整天可申請的紀錄會被誤判為「期限已過」而要求關閉
 （2026-11-09 的台北青年 AI 補助與新竹市補助都是只寫日期的期限）。'''
 stamp=latest_stamp(value)
 if stamp is None or not isinstance(value,str): return stamp
 return stamp if CLOCK_RE.search(value) else stamp.replace(hour=23,minute=59,second=59)
def assert_not_future(value,label):
 stamp=latest_stamp(value)
 assert stamp is None or stamp-NOW<=TOLERANCE, f'{label} is in the future ({value}); use the real clock'
assert_not_future(d['updated_at'],'updated_at')
assert_not_future(run['completed_at'],'last_research_run.completed_at')
assert_not_future(run['started_at'],'last_research_run.started_at')
# expires_at／deadline_at／effective_at are future by design (offer expiry, application deadlines).
FIELDS=['verified_at','discovered_at','announcement_at','last_review_attempt_at','last_attempted_at']
for o in d['offers']:
 for field in FIELDS: assert_not_future(o.get(field),f'{field} in {o["id"]}')
 for s in o['sources']: assert_not_future(s.get('accessed_at') or s.get('accessed_time_range'),f'accessed_at in {o["id"]}')
 # A record cannot be verified after the batch that reports it finished.
 assert not o.get('verified_at') or latest_stamp(o['verified_at'])<=latest_stamp(d['updated_at']), f'verified_at after batch completion in {o["id"]}'
offers_by_id={o['id']:o for o in d['offers']}
for rid in reviewed:assert offers_by_id[rid].get('verified_at') and offers_by_id[rid]['verified_at']>=run['started_at'], f'stale verified_at for reviewed ID: {rid}'
for nid in new:assert offers_by_id[nid].get('verified_at') and offers_by_id[nid]['verified_at']>=run['started_at'], f'stale verified_at for new ID: {nid}'
run_day=run['started_at'][:10]
# 存取時間是自由文字（ISO、ISO 區間、甚至「2026-10-25（Asia/Taipei）」這種帶註記的寫法）。
# 舊版用 `raw.split('/')[-1][:10]` 取日期，遇到帶註記的值會取到「Taipei）」這種片段，
# 與 run_day 做字串比較時因為首字元 'T' 大於 '2' 而恆為真：2026-11-10 實測 adobe-firefly-assistant
# 的舊來源「2026-10-25（Asia/Taipei）」被算成「本批次查核」，於是同一 URL 當天出現兩筆就
# 誤報重複；反過來，一筆只有舊自由文字日期的紀錄也能通過下面的「本批次至少一個查閱時間」。
# 一律抽出字串裡最後一個 YYYY-MM-DD 再比較。
import re as _re
DATE_ONLY=_re.compile(r'\d{4}-\d{2}-\d{2}')
def accessed_day(source):
 raw=str(source.get('accessed_at') or source.get('accessed_time_range') or '')
 found=DATE_ONLY.findall(raw)
 return found[-1] if found else ''
for rid in reviewed+new:
 urls=[s.get('url') for s in offers_by_id[rid]['sources']]
 # 規則本意是「同一 URL 這次查核要就地更新，不要追加第二筆」，但舊版寫成整筆紀錄不得有重複
 # URL：2026-11-10 統計 266 筆（其中 216 筆仍可行動）因歷次查核累積了同網址多筆來源，
 # 一旦被排進 reviewed_ids 就永遠驗證失敗，只能靠有損的合併才能再複核——佇列因此默默繞過
 # 四分之一個資料庫（lawson 12 筆同網址、daytona 14 筆、cyleague／sambanova 各 11–12 筆）。
 # 前端 groupSources() 本來就把同網址收進「較早的 N 筆同網址紀錄」，多筆同網址是既有設計；
 # 因此改為只限制「本批次當天同一 URL 最多一筆」，仍然攔得住重複追加的錯誤，又不會鎖住舊紀錄。
 by_url={}
 for s in offers_by_id[rid]['sources']:
  by_url.setdefault(s.get('url'),[]).append(s)
 for url,group in by_url.items():
  same_day=[s for s in group if accessed_day(s)>=run_day]
  assert len(same_day)<=1, f'source URL checked twice in this batch (update the existing entry instead of appending): {rid} {url}'
 stamps=[accessed_day(s) for s in offers_by_id[rid]['sources']]
 assert any(stamp>=run_day for stamp in stamps), f'no per-source accessed time for this batch record: {rid}'
for aid in attempted:
 assert offers_by_id[aid].get('last_review_attempt_at') and offers_by_id[aid]['last_review_attempt_at']>=run['started_at'], f'stale last_review_attempt_at for attempted ID: {aid}'
 assert isinstance(offers_by_id[aid].get('last_review_attempt_reason'), str) and offers_by_id[aid]['last_review_attempt_reason'].strip(), f'missing last_review_attempt_reason for attempted ID: {aid}'
 assert not offers_by_id[aid].get('verified_at') or offers_by_id[aid]['verified_at']<run['started_at'], f'verified_at refreshed for failed attempted ID: {aid}'
# 追查失敗只留時間、沒留原因，等於把「那天為什麼讀不到」丟掉：下一輪無法判斷要換哪條路線，
# 讀者在卡片上只看到一個沒有說明的時間。上面的檢查只涵蓋本批次，因此 2026-11-09 仍累積了
# 4 筆歷史缺漏（qoder-lite、seoul-aihub-khdp-closed-september、kakao-plus-young-adult-promo-unverified、
# nchc-university-ai-compute-discount-2026）。原因真的不詳時要寫明「未留下原因」，不能留空。
for o in d['offers']:
 if o.get('last_review_attempt_at'):
  assert isinstance(o.get('last_review_attempt_reason'), str) and o['last_review_attempt_reason'].strip(), f'last_review_attempt_at without a recorded reason in {o["id"]}'
tiers={'S','A','B','C','D'};dead={'expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','resolved_rumor_disproven','duplicate_merged'}
valid_statuses={'active','active_verified','conditional','expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','paused','restricted','application_based','limited_availability','terms_conflict','conflicting_official_usage_claims','unverified','needs_verification','unverified_numeric_claims','unverified_redemption','campaign_current_availability_unverified','taiwan_availability_unverified','unverified_taiwan_eligibility','application_based_unverified','application_based_unverified_terms','account_specific_unverified','grant_terms_unverified','resolved_rumor_disproven','amount_and_eligibility_unverified','current_approval_unverified','grant_delivery_unverified','legacy_closed_new_path_conditional','duplicate_merged','quota_and_taiwan_eligibility_unverified','taiwan_not_listed_supported_region','watchlist'}
assert dead <= valid_statuses, 'dead statuses not subset of valid statuses'
# 追查失敗只留在 last_review_attempt_at、排程卻沿用原本的每月日期，等於把「這次讀不到」變成
# 「一個月後再說」。2026-11-10 統計 20 筆有追查紀錄，其中 2 筆的最新證據是失敗（attempt 晚於
# verified_at）而下次複核仍在 22–29 天後：taiwan-sme-ai-talent-training-2026（PDF 字型使文字
# 擷取失效、29 天）與 stitch-free-daily-credit-ui-design-beta（頁面只回前端外殼、22 天）。
# 失敗不是複核，不能因此把複核推遲一整個週期；仍可行動的紀錄要在 14 天內換路線重試。
# on_new_signal 依定義沒有固定日期，維持例外。
MAX_RETRY_AFTER_FAILURE=datetime.timedelta(days=14)
for o in d['offers']:
 attempt=latest_stamp(o.get('last_review_attempt_at')); verified=latest_stamp(o.get('verified_at')); nxt=latest_stamp(o.get('next_review_at'))
 if attempt is None or o.get('status') in dead or o.get('review_cadence')=='on_new_signal': continue
 if verified is not None and verified>=attempt: continue
 assert nxt is not None and nxt-attempt<=MAX_RETRY_AFTER_FAILURE, f'latest evidence is a failed attempt ({o["last_review_attempt_at"]}) but next review is {o["next_review_at"]}: retry within 14 days instead of a full cycle in {o["id"]}'
# Every record this batch reports must carry a managed status: the UI status pill and the
# priority score both branch on it, and a missing value silently reads as "狀態待釐清"
# (2026-11-09: the four new records were written without one before this check).
for rid in reviewed+new:
 assert offers_by_id[rid].get('status') in valid_statuses, f'missing or invalid status for a batch record: {rid}'
# The cadence string is a promise about re-check frequency and is shown to readers as
# 「下次複核：每日／每週…」. Scheduling a 30-day review on a `daily` record hides it from the
# rotation queue while the card still claims daily tracking, so cap the gap per cadence.
MAX_CADENCE_GAP={'daily':3,'weekly':10,'biweekly':20}
# 精確期限只存在三個欄位（README「截止與期限」段就是這樣寫的：deadline_at、expires_at、expiry），
# 但下面兩條規則先前只讀前兩個。2026-11-10 統計有 7 筆用 expiry.date 記錄期限，其中
# chatgpt-teachers-us（2028-06）與 claude-teachers-us（2027-06-30）仍是可行動狀態：一旦
# expiry.date 過去而狀態沒改，卡片會照樣宣稱可領取／報名，兩條規則都攔不到。expiry.date
# 只解析完整日期；像 2028-06 這種只到月份的寫法不解析（不猜月末日），expiry.text 是散文也不解析。
def close_points(record):
 points = [('deadline_at', record.get('deadline_at'), close_stamp(record.get('deadline_at'))),
           ('expires_at', record.get('expires_at'), close_stamp(record.get('expires_at')))]
 expiry = record.get('expiry')
 if isinstance(expiry, dict) and isinstance(expiry.get('date'), str):
  points.append(('expiry.date', expiry['date'], close_stamp(expiry['date'])))
 return [point for point in points if point[2] is not None]
for o in d['offers']:
 assert isinstance(o.get('title'), str) and o['title'].strip(), f'missing or empty title in {o["id"]}'
 if o.get('status') is not None: assert isinstance(o['status'], str) and o['status'] in valid_statuses, f'invalid or unmanaged status in {o["id"]}: {o.get("status")}'
 assert o['verification']!='Official' or o['sources'] and o['verified_at']
 cadence=o.get('review_cadence')
 # 排程欄位是複核佇列的唯一輸入：每輪開始時以 next_review_at 排序挑案例，因此一筆紀錄缺了
 # next_review_at 就永遠不會被排到，缺了 review_cadence 卡片就只寫「定期輪替」而不說頻率。
 # 2026-11-10 統計 12 筆有缺口（6 筆無 next_review_at、6 筆無 review_cadence），其中 2 筆是
 # monthly／monthly_or_new_signal 卻沒日期。on_new_signal 依定義沒有固定日期，是唯一例外。
 if cadence is None: raise AssertionError(f'missing review_cadence (the card then renders 定期輪替 without a frequency): {o["id"]}')
 if o.get('next_review_at') is None and cadence!='on_new_signal':
  raise AssertionError(f'missing next_review_at for {cadence} cadence — the record can never enter the review queue: {o["id"]}')
 if cadence in MAX_CADENCE_GAP and o.get('verified_at') and o.get('next_review_at'):
  gap=(datetime.datetime.fromisoformat(o['next_review_at'])-datetime.datetime.fromisoformat(o['verified_at'])).days
  assert gap<=MAX_CADENCE_GAP[cadence], f'{cadence} cadence but next review {gap} days out (fix the label or the schedule): {o["id"]}'
 # 讀者只能在截止前動作，所以還有未來截止／到期時點的紀錄，下次複核必須排在該時點之前。
 # 2026-11-09 發現 StepFun 免費 preview 到 11/17 11:59:59，next_review_at 卻是 11/18 12:00：
 # 整個免費期沒有任何複核，若官方提前結束或展延，網站要到活動結束後才更新。
 if o.get('status') not in dead and o.get('next_review_at'):
  scheduled=latest_stamp(o['next_review_at'])
  for field,raw,closes in close_points(o):
   if closes>NOW and scheduled and scheduled>closes:
    raise AssertionError(f'next review {o["next_review_at"]} falls after {field} {raw} in {o["id"]}: schedule the review while the offer is still actionable')
 # 反向：期限已過而狀態仍非已截止，卡片就會繼續宣稱可以領取／報名。AOCAI 服務業 AI 課程
 # 2026-11-09 就是這樣：報名表已回「活動已結束」、活動頁改列 11/08 23:59，但紀錄沒有
 # deadline_at，只有摘要裡的文字，因此上面那條排程規則看不到它，卡片整天寫著「報名表仍開放」。
 # 只要期限寫進機器可讀欄位，這裡就擋得住；散文日期仍要靠人工，README 維護章節寫明要回填。
 for field,raw,closes in close_points(o):
  if o.get('status') not in dead and closes<NOW:
   raise AssertionError(f'{field} {raw} has passed but status is {o.get("status")!r} in {o["id"]}: mark the offer closed or record the new end date')
 # 推定時刻不得寫進機器可讀欄位。卡片對帶時刻的值一律渲染成「（台北時間）」加分鐘，
 # 讀者看到的是官方給的截止時鐘；台北青年 AI 補助原始條文只寫「最遲應於11月10日前提出申請」
 # 「以送達本局之日為準」，23:59 是當日邊界推定，寫成 timestamp 後卡片就變成
 # 「申請截止 2026/11/10 23:59（台北時間）」，可能讓讀者以為當日 23:59 前寄達即可。
 # 只寫日期時前端會標「（來源未列時刻）」，這種精度才是來源真的有的。
 for field in ('deadline_at','expires_at'):
  value=o.get(field)
  if isinstance(value,str) and CLOCK_RE.search(value):
   assert not any('推定' in u and ('欄位' in u or field in u) for u in o['unknowns']), f'{field} carries an inferred clock time: {o["id"]} (store the date only, keep the inference in unknowns)'
 for s in o.get('sources', []):
  assert s.get('url', '').startswith('https://'), f'invalid source URL in {o["id"]}: {s.get("url")}'
  assert isinstance(s.get('scope'), str) and s['scope'].strip(), f'missing or empty source scope in {o["id"]}'
  assert isinstance(s.get('evidence'), str) and s['evidence'].strip(), f'missing or empty source evidence in {o["id"]}'
 if o.get('verified_at') and o.get('next_review_at'):assert o['next_review_at']>=o['verified_at'], f'next_review_at precedes verified_at in {o["id"]}'
 if o.get('review_cadence') is not None:assert o['review_cadence'] in {'daily','monthly','weekly','biweekly','on_new_signal','monthly_or_new_signal','event'}, f'invalid review_cadence in {o["id"]}: {o.get("review_cadence")}'
 # A closed offer cannot be acted on daily; daily cadence would re-queue it every round.
 if o.get('status') in dead and o.get('review_cadence')=='daily':raise AssertionError(f'closed record must not keep daily cadence (use monthly_or_new_signal / on_new_signal / event): {o["id"]}')
 assert o['benefit_cost_ratio'] is None or math.isfinite(o['benefit_cost_ratio'])
 if o['setup_cost_usd']==0 and o['recurring_cost_usd']==0: assert o['benefit_cost_ratio'] is None
 if o['usage_type']=='Unlimited':assert o['quota_classification'] in ['OFFICIALLY UNLIMITED','TEMPORARILY UNLIMITED']
 # The frontend derives the 無限 preset from quota_classification; a hand-set 'unlimited' view that
 # contradicts it shows a limited plan in the unlimited bucket.
 if 'unlimited' in (o.get('views') or []):assert o['quota_classification'] in ['OFFICIALLY UNLIMITED','TEMPORARILY UNLIMITED'], f'unlimited view conflicts with quota_classification in {o["id"]}: {o["quota_classification"]}'
 # 高額度與 Beta 專區改讀 categories（view=quota 曾只標 63 筆而 HIGH-QUOTA 有 127 筆），
 # 所以人工 views 不得再與 categories 相反，否則又是一個會誤導讀者的第二真相來源。
 if 'quota' in (o.get('views') or []):assert 'HIGH-QUOTA' in o['categories'], f'quota view without HIGH-QUOTA category in {o["id"]}'
 if 'beta' in (o.get('views') or []):assert 'BETA-ACCESS' in o['categories'], f'beta view without BETA-ACCESS category in {o["id"]}'
 if o['savings_usd'] is not None:assert o['valuation_scenario']
 # 卡片正文就是 summary。缺 summary 的紀錄在網站上顯示「研究摘要待補充」，等於把
 # 已核實的免費額度隱藏起來（2026-11-09 發現 12 筆，含 OpenAI 資料共享與 Viktor Free）。
 if o['record_type']=='opportunity':assert isinstance(o.get('summary'), str) and o['summary'].strip(), f'missing summary for an opportunity card in {o["id"]}'
 # 「免費機會」標籤與同一張卡的「每月費用」並列時，讀者看到的是兩個互相矛盾的數字。2026-11-09 統計
 # 8 筆 categories 含 FREE 的紀錄帶著已知月費（US$5–399，例：Lindy Team US$29.99、AgentMail 期滿
 # US$200、Supermemory Scale US$399），其中 5 筆連一句說明都沒有。費用欄位是歷史事實、不改，
 # 但非已截止的這類紀錄必須用 cost_note 說明那個月費是什麼（期滿續用價／替代付費方案／試用後
 # 自願升級），卡片正面才會出現「每月費用說明」。setup_cost_basis 只講設定費，不算說明。
 if o.get('status') not in dead and 'FREE' in (o.get('categories') or []) and (o.get('recurring_cost_usd') or 0)>0:
  assert isinstance(o.get('cost_note'), str) and o['cost_note'].strip(), f'FREE tag with a known monthly fee needs a cost_note explaining the fee: {o["id"]}'
 assert isinstance(o.get('unknowns'), list) and all(isinstance(u, str) and u.strip() for u in o['unknowns']), f'invalid unknowns in {o["id"]}'
 assert set(['service_availability','account_eligibility','billing_country','identity_residency','terms_restrictions','taiwan_note'])<=set(o['eligibility'])
 assert all(isinstance(o['eligibility'].get(k), str) and o['eligibility'][k].strip() for k in ['service_availability','account_eligibility','billing_country','identity_residency','terms_restrictions','taiwan_note']), f'missing or empty eligibility text in {o["id"]}'
 if o.get('duplicate_of') is not None:
  assert o.get('status')=='duplicate_merged', f'duplicate_of without merged status in {o["id"]}'
  assert o['duplicate_of'] in ids and o['duplicate_of']!=o['id'], f'duplicate_of must point to another existing id in {o["id"]}'
  target=offers_by_id[o['duplicate_of']];assert target.get('duplicate_of') is None, f'duplicate chain not allowed: {o["id"]}'
 elif o.get('status')=='duplicate_merged':
  raise AssertionError(f'duplicate_merged without duplicate_of in {o["id"]}')
 if o['record_type']=='opportunity':
  assert o['priority_tier'] in tiers and math.isfinite(o['priority_score']) and o['priority_note']
  # 卡片藥丸與「優先度依據」必須說同一件事。缺少 status 的紀錄在 app.js 顯示「狀態待釐清」，
  # 但 tools/prioritize.py 的 note_of() 曾把缺值寫成「條件式」（2026-11-09 統計 22 筆機會），
  # 同一張卡片因此同時主張「狀態不明」與「需符合條件」。
  assert o.get('status') is not None or '狀態未記錄' in o['priority_note'], f'note implies a status the record does not have in {o["id"]}: {o["priority_note"]}'
  # 同一個錯誤在非 conditional 的狀態上也存在：terms_conflict（藥丸「官方條款有差異」）、
  # paused（「暫停開放」）、limited_availability（「有限度開放」）等 21 筆機會的優先度依據
  # 一律寫「條件式」。優先度依據的狀態欄位現在直接取 app.js 的 STATUS_LABELS，這裡擋回歸：
  # 只有 conditional 家族可以寫「需符合條件」，其他狀態不得再冒稱條件式。
  note_state = o['priority_note'].split('·')[1]
  conditional_family = {'conditional', 'legacy_closed_new_path_conditional'}
  if o.get('status') in conditional_family:
   assert note_state == '需符合條件' or note_state == '舊途徑關閉・新途徑需條件', f'conditional record note disagrees with its status in {o["id"]}: {o["priority_note"]}'
  else:
   assert note_state not in ('需符合條件', '條件式'), f'note claims a conditional status the record does not have in {o["id"]}: {o["priority_note"]}'
  if o.get('status') in dead:assert o['priority_tier']=='D'
  if o['taiwan']=='Yes' and o.get('status') not in dead:assert o['priority_tier']=='S'
  if o.get('priority_tier')=='S':assert o['taiwan']=='Yes' and o.get('status') not in dead, f'invalid S-tier in {o["id"]}'
 else:assert o['priority_tier'] is None and o['priority_score'] is None
print(f'PASS: {len(ids)} records; unique IDs, schema, zero-cost ratios, provenance, eligibility, unlimited, priority-tier assertions.')
print('tiers:',{t:sum(1 for o in d['offers'] if o.get('priority_tier')==t) for t in ['S','A','B','C','D']})
