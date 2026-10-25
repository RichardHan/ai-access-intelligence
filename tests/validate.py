import json,pathlib,math
import jsonschema
p=pathlib.Path(__file__).resolve().parents[1]
d=json.loads((p/'data/offers.json').read_text());jsonschema.validate(d,json.loads((p/'schema.json').read_text()))
ids=[x['id'] for x in d['offers']];assert len(ids)==len(set(ids))
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
