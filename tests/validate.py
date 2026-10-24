import json,pathlib,math
import jsonschema
p=pathlib.Path(__file__).resolve().parents[1]
d=json.loads((p/'data/offers.json').read_text());jsonschema.validate(d,json.loads((p/'schema.json').read_text()))
ids=[x['id'] for x in d['offers']];assert len(ids)==len(set(ids))
for o in d['offers']:
 assert o['verification']!='Official' or o['sources'] and o['verified_at']
 assert o['benefit_cost_ratio'] is None or math.isfinite(o['benefit_cost_ratio'])
 if o['setup_cost_usd']==0 and o['recurring_cost_usd']==0: assert o['benefit_cost_ratio'] is None
 if o['usage_type']=='Unlimited':assert o['quota_classification'] in ['OFFICIALLY UNLIMITED','TEMPORARILY UNLIMITED']
 if o['savings_usd'] is not None:assert o['valuation_scenario']
 assert set(['service_availability','account_eligibility','billing_country','identity_residency','terms_restrictions','taiwan_note'])<=set(o['eligibility'])
print(f'PASS: {len(ids)} records; unique IDs, schema, zero-cost ratios, provenance, eligibility, unlimited assertions.')
