const fs=require('fs'),vm=require('vm'),assert=require('assert');const source=fs.readFileSync(__dirname+'/../app.js','utf8').replace('const $=s=>document.querySelector(s);','const $=s=>null;');const ctx={};vm.createContext(ctx);vm.runInContext(source,ctx);const d=JSON.parse(fs.readFileSync(__dirname+'/../data/offers.json'));const f=ctx.matches;for(const o of d.offers) assert(f(o,{}));const unknown=d.offers.find(o=>o.setup_cost_usd===null);assert(!f(unknown,{cost:'0'}));const free=d.offers.find(o=>o.id==='work-codex-free');assert(f(free,{cost:'0',view:'free'}));assert(!f(free,{effort:'15'}));assert(f(free,{effort:'30'}));assert(!f(free,{taiwan:'Yes'}));assert(!f(free,{usage:'Unlimited'}));assert(f(free,{verification:'Official'}));const twai=d.offers.find(o=>o.id==='twai-cloud-free-trial');assert(twai.priority_tier==='S'&&twai.priority_score>0);assert(f(twai,{tier:'S'}));assert(!f(twai,{tier:'A'}));const pol=d.offers.find(o=>o.record_type==='policy');assert(pol.priority_tier===null);assert(!f(pol,{tier:'S'}));assert([pol,twai].sort(ctx.byPriority)[0]===twai);console.log('PASS: filter combinations, unknown costs, strict effort thresholds, eligibility, unlimited separation, priority tier filter and S→D sort.');
const ended=d.offers.find(o=>o.id==='chatgpt-back-to-school-us');assert(f(ended,{}));assert(!f(ended,{cost:'0',view:'free'}));assert(!f({...ended,status:'expired_unverified'},{cost:'0',view:'free'}));assert(f({...ended,status:'expired_unverified'},{}));assert(!f({...ended,status:'applications_closed'},{cost:'0',view:'free'}));assert(f({...ended,status:'applications_closed'},{}));assert(!f({...ended,status:'resolved_rumor_disproven'},{cost:'0',view:'free'}));assert(f({...ended,status:'resolved_rumor_disproven'},{}));assert(!f({...ended,status:'closed_to_new_subscriptions'},{cost:'0',view:'free'}));assert(f({...ended,status:'closed_to_new_subscriptions'},{}));assert(!f({...ended,status:'closed'},{cost:'0',view:'free'}));assert(f({...ended,status:'closed'},{}));
const sunset=d.offers.find(o=>o.id==='weaviate-engram-free');assert(f(sunset,{}));assert(!f(sunset,{cost:'0',view:'free'}));
assert.strictEqual(ctx.statusInfo({status:'resolved_rumor_disproven'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'closed_to_new_subscriptions'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'closed'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'sunset_announced'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'applications_closed'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'expired'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'taiwan_availability_unverified'}).label,'台灣可用度待核');
assert.strictEqual(ctx.statusInfo({status:'unverified_taiwan_eligibility'}).label,'台灣資格待核');
assert.strictEqual(ctx.statusInfo({status:'application_based_unverified'}).label,'申請資格待核');
assert.strictEqual(ctx.statusInfo({status:'amount_and_eligibility_unverified'}).label,'額度與資格待核');
assert.strictEqual(ctx.statusInfo({status:'current_approval_unverified'}).label,'審核現況待核');
assert.strictEqual(ctx.statusInfo({status:'grant_delivery_unverified'}).label,'資助發放待核');
assert.strictEqual(ctx.statusInfo({status:'legacy_closed_new_path_conditional'}).label,'舊途徑關閉・新途徑需條件');
assert.strictEqual(ctx.statusInfo({status:'legacy_closed_new_path_conditional'}).tone,'conditional');
assert.strictEqual(ctx.statusInfo({status:'quota_and_taiwan_eligibility_unverified'}).label,'額度與台灣資格待核');
assert.strictEqual(ctx.statusInfo({status:'taiwan_not_listed_supported_region'}).label,'台灣未列於支援地區');
assert.strictEqual(ctx.statusInfo({status:'watchlist'}).label,'觀察線索待追蹤');

// The latest attempt is not a successful verification: expose its failure reason.
class Element {
  constructor(tag) { this.tagName=tag; this.children=[]; this.textContent=''; }
  append(...children) { this.children.push(...children); }
  get childElementCount() { return this.children.length; }
}
ctx.document={createElement:tag=>new Element(tag)};
const details=ctx.createDetails({
  last_review_attempt_at:'2026-11-06', last_review_attempt_reason:'正式規則403',
  eligibility:{}, sources:[]
});
const rows=details.children.find(node=>node.tagName==='dl').children;
const attempt=rows.find(row=>row.children[0].textContent==='最近來源追查');
assert.strictEqual(attempt.children[1].textContent,'2026-11-06；正式規則403');
const noReason=ctx.createDetails({last_review_attempt_at:'2026-11-06',eligibility:{},sources:[]});
const attemptWithoutReason=noReason.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='最近來源追查');
assert.strictEqual(attemptWithoutReason.children[1].textContent,'2026-11-06');
