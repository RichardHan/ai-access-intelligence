import json,pathlib,math
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
offers_by_id={o['id']:o for o in d['offers']}
for rid in reviewed:assert offers_by_id[rid].get('verified_at') and offers_by_id[rid]['verified_at']>=run['started_at'], f'stale verified_at for reviewed ID: {rid}'
for nid in new:assert offers_by_id[nid].get('verified_at') and offers_by_id[nid]['verified_at']>=run['started_at'], f'stale verified_at for new ID: {nid}'
for aid in attempted:
 assert offers_by_id[aid].get('last_review_attempt_at') and offers_by_id[aid]['last_review_attempt_at']>=run['started_at'], f'stale last_review_attempt_at for attempted ID: {aid}'
 assert isinstance(offers_by_id[aid].get('last_review_attempt_reason'), str) and offers_by_id[aid]['last_review_attempt_reason'].strip(), f'missing last_review_attempt_reason for attempted ID: {aid}'
 assert not offers_by_id[aid].get('verified_at') or offers_by_id[aid]['verified_at']<run['started_at'], f'verified_at refreshed for failed attempted ID: {aid}'
tiers={'S','A','B','C','D'};dead={'expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','resolved_rumor_disproven'}
for o in d['offers']:
 assert o['verification']!='Official' or o['sources'] and o['verified_at']
 for s in o.get('sources', []):
  assert s.get('url', '').startswith('https://'), f'invalid source URL in {o["id"]}: {s.get("url")}'
  assert isinstance(s.get('scope'), str) and s['scope'].strip(), f'missing or empty source scope in {o["id"]}'
  assert isinstance(s.get('evidence'), str) and s['evidence'].strip(), f'missing or empty source evidence in {o["id"]}'
 if o.get('verified_at') and o.get('next_review_at'):assert o['next_review_at']>=o['verified_at'], f'next_review_at precedes verified_at in {o["id"]}'
 assert o['benefit_cost_ratio'] is None or math.isfinite(o['benefit_cost_ratio'])
 if o['setup_cost_usd']==0 and o['recurring_cost_usd']==0: assert o['benefit_cost_ratio'] is None
 if o['usage_type']=='Unlimited':assert o['quota_classification'] in ['OFFICIALLY UNLIMITED','TEMPORARILY UNLIMITED']
 if o['savings_usd'] is not None:assert o['valuation_scenario']
 assert set(['service_availability','account_eligibility','billing_country','identity_residency','terms_restrictions','taiwan_note'])<=set(o['eligibility'])
 if o['record_type']=='opportunity':
  assert o['priority_tier'] in tiers and math.isfinite(o['priority_score']) and o['priority_note']
  if o.get('status') in dead:assert o['priority_tier']=='D'
  if o['taiwan']=='Yes' and o.get('status') not in dead:assert o['priority_tier']=='S'
  if o.get('priority_tier')=='S':assert o['taiwan']=='Yes' and o.get('status') not in dead, f'invalid S-tier in {o["id"]}'
 else:assert o['priority_tier'] is None and o['priority_score'] is None
print(f'PASS: {len(ids)} records; unique IDs, schema, zero-cost ratios, provenance, eligibility, unlimited, priority-tier assertions.')
print('tiers:',{t:sum(1 for o in d['offers'] if o.get('priority_tier')==t) for t in ['S','A','B','C','D']})
