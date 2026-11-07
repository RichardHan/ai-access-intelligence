const fs=require('fs'),vm=require('vm'),assert=require('assert');const source=fs.readFileSync(__dirname+'/../app.js','utf8').replace('const $=s=>document.querySelector(s);','const $=s=>null;');const ctx={};vm.createContext(ctx);vm.runInContext(source,ctx);const d=JSON.parse(fs.readFileSync(__dirname+'/../data/offers.json'));const f=ctx.matches;for(const o of d.offers) assert(f(o,{}));const unknown=d.offers.find(o=>o.setup_cost_usd===null);assert(!f(unknown,{cost:'0'}));const free=d.offers.find(o=>o.id==='work-codex-free');assert(f(free,{cost:'0',view:'free'}));assert(!f(free,{effort:'15'}));assert(f(free,{effort:'30'}));assert(!f(free,{taiwan:'Yes'}));assert(!f(free,{usage:'Unlimited'}));assert(f(free,{verification:'Official'}));const twai=d.offers.find(o=>o.id==='twai-cloud-free-trial');assert(twai.priority_tier==='S'&&twai.priority_score>0);assert(f(twai,{tier:'S'}));assert(!f(twai,{tier:'A'}));const pol=d.offers.find(o=>o.record_type==='policy');assert(pol.priority_tier===null);assert(!f(pol,{tier:'S'}));assert([pol,twai].sort(ctx.byPriority)[0]===twai);console.log('PASS: filter combinations, unknown costs, strict effort thresholds, eligibility, unlimited separation, priority tier filter and S→D sort.');
const ended=d.offers.find(o=>o.id==='chatgpt-back-to-school-us');assert(f(ended,{}));assert(!f(ended,{cost:'0',view:'free'}));assert(!f({...ended,status:'expired_unverified'},{cost:'0',view:'free'}));assert(f({...ended,status:'expired_unverified'},{}));assert(!f({...ended,status:'applications_closed'},{cost:'0',view:'free'}));assert(f({...ended,status:'applications_closed'},{}));assert(!f({...ended,status:'resolved_rumor_disproven'},{cost:'0',view:'free'}));assert(f({...ended,status:'resolved_rumor_disproven'},{}));
const sunset=d.offers.find(o=>o.id==='weaviate-engram-free');assert(f(sunset,{}));assert(!f(sunset,{cost:'0',view:'free'}));
assert.strictEqual(ctx.statusInfo({status:'resolved_rumor_disproven'}).tone,'closed');

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
