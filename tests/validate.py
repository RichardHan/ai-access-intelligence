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
json.loads((p/'data/policy-history.json').read_text(),object_pairs_hook=unique_keys)
ids=[x['id'] for x in d['offers']];assert len(ids)==len(set(ids))
run=d['last_research_run']
reviewed=run['reviewed_ids'];new=run['new_ids'];attempted=run['attempted_failed_ids']
assert len(reviewed)==len(set(reviewed)) and len(new)==len(set(new)) and len(attempted)==len(set(attempted)), 'duplicate batch ID'
assert not (set(reviewed)&set(new) or set(reviewed)&set(attempted) or set(new)&set(attempted)), 'overlapping batch IDs'
assert (set(reviewed)|set(new)|set(attempted))<=set(ids), 'unknown batch ID'
assert run['unreviewed_existing_count']==len(ids)-len(new)-len(reviewed), 'incorrect unreviewed count'
assert d['updated_at']==d['latest_research_at']==run['completed_at'], 'inconsistent batch timestamps'
tiers={'S','A','B','C','D'};dead={'expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced'}
for o in d['offers']:
 assert o['verification']!='Official' or o['sources'] and o['verified_at']
 assert o['benefit_cost_ratio'] is None or math.isfinite(o['benefit_cost_ratio'])
 if o['setup_cost_usd']==0 and o['recurring_cost_usd']==0: assert o['benefit_cost_ratio'] is None
 if o['usage_type']=='Unlimited':assert o['quota_classification'] in ['OFFICIALLY UNLIMITED','TEMPORARILY UNLIMITED']
 if o['savings_usd'] is not None:assert o['valuation_scenario']
 assert set(['service_availability','account_eligibility','billing_country','identity_residency','terms_restrictions','taiwan_note'])<=set(o['eligibility'])
 if o['record_type']=='opportunity':
  assert o['priority_tier'] in tiers and math.isfinite(o['priority_score']) and o['priority_note']
  if o.get('status') in dead:assert o['priority_tier']=='D'
  if o['taiwan']=='Yes' and o.get('status') not in dead:assert o['priority_tier']=='S'
 else:assert o['priority_tier'] is None and o['priority_score'] is None
print(f'PASS: {len(ids)} records; unique IDs, schema, zero-cost ratios, provenance, eligibility, unlimited, priority-tier assertions.')
print('tiers:',{t:sum(1 for o in d['offers'] if o.get('priority_tier')==t) for t in ['S','A','B','C','D']})
