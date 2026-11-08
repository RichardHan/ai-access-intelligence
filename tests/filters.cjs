const fs=require('fs'),vm=require('vm'),assert=require('assert');const source=fs.readFileSync(__dirname+'/../app.js','utf8').replace('const $=s=>document.querySelector(s);','const $=s=>null;');const ctx={};vm.createContext(ctx);vm.runInContext(source,ctx);const d=JSON.parse(fs.readFileSync(__dirname+'/../data/offers.json'));const f=ctx.matches;for(const o of d.offers) assert(f(o,{}));const unknown=d.offers.find(o=>o.setup_cost_usd===null);assert(!f(unknown,{cost:'0'}));const free=d.offers.find(o=>o.id==='work-codex-free');assert(f(free,{cost:'0',view:'free'}));// 設定時間門檻含等於：正好 15 分鐘的紀錄（含 work-codex-free）必須出現在「15 分鐘」篩選內，
// 但 16 分鐘不行。舊版用嚴格小於，109 筆最省力方案被濾掉。
assert(f(free,{effort:'15'}));assert(f(free,{effort:'30'}));assert(!f({...free,effort_minutes_max:16},{effort:'15'}));assert(!f(free,{effort:'5'}));assert(!f(free,{taiwan:'Yes'}));assert(!f(free,{usage:'TEMPORARILY UNLIMITED'}));assert(f(free,{verification:'Official'}));
// 免費專區由 schema 管制的費用欄位判定，不能只靠人工 views 標記：零設定費＋零每月費用一律列入，
// 已知每月費用 > 0 的試用不得列入（曾把 US$29.99/月 的七日試用列為免費方案）。
const zeroUntagged=d.offers.find(o=>o.id==='gemini-watch');assert(zeroUntagged.setup_cost_usd===0&&zeroUntagged.recurring_cost_usd===0&&!(zeroUntagged.views||[]).includes('free'));assert(f(zeroUntagged,{cost:'0',view:'free'}),'zero-cost record without free tag must appear in the free preset');
const paidTrial=d.offers.find(o=>o.id==='lindy-free-fifty-dollar-seven-day-trial');assert(paidTrial.recurring_cost_usd>0&&(paidTrial.views||[]).includes('free'));assert(!f(paidTrial,{cost:'0',view:'free'}),'a trial with a known monthly fee must not appear in the free preset');assert(!f(paidTrial,{view:'free'}));
const unknownRecurring=d.offers.find(o=>o.id==='zo-computer-fourteen-day-no-card-trial');assert(unknownRecurring.setup_cost_usd===0&&unknownRecurring.recurring_cost_usd===null&&(unknownRecurring.views||[]).includes('free'));assert(f(unknownRecurring,{cost:'0',view:'free'}),'free-tagged record with unknown recurring cost stays in the preset');
const twai=d.offers.find(o=>o.id==='twai-cloud-free-trial');assert(twai.priority_tier==='S'&&twai.priority_score>0);assert(f(twai,{tier:'S'}));assert(!f(twai,{tier:'A'}));const pol=d.offers.find(o=>o.record_type==='policy');assert(pol.priority_tier===null);assert(!f(pol,{tier:'S'}));assert([pol,twai].sort(ctx.byPriority)[0]===twai);console.log('PASS: filter combinations, unknown costs, inclusive effort thresholds, eligibility, unlimited separation, priority tier filter and S→D sort.');
const ended=d.offers.find(o=>o.id==='chatgpt-back-to-school-us');assert(f(ended,{}));assert(!f(ended,{cost:'0',view:'free'}));assert(!f({...ended,status:'expired_unverified'},{cost:'0',view:'free'}));assert(f({...ended,status:'expired_unverified'},{}));assert(!f({...ended,status:'applications_closed'},{cost:'0',view:'free'}));assert(f({...ended,status:'applications_closed'},{}));assert(!f({...ended,status:'resolved_rumor_disproven'},{cost:'0',view:'free'}));assert(f({...ended,status:'resolved_rumor_disproven'},{}));assert(!f({...ended,status:'closed_to_new_subscriptions'},{cost:'0',view:'free'}));assert(f({...ended,status:'closed_to_new_subscriptions'},{}));assert(!f({...ended,status:'closed'},{cost:'0',view:'free'}));assert(f({...ended,status:'closed'},{}));
const sunset=d.offers.find(o=>o.id==='weaviate-engram-free');assert(f(sunset,{}));assert(!f(sunset,{cost:'0',view:'free'}));
assert.strictEqual(ctx.statusInfo({status:'resolved_rumor_disproven'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'duplicate_merged'}).tone,'closed');
assert.strictEqual(ctx.statusInfo({status:'duplicate_merged'}).label,'重複紀錄・已併入其他 ID');
assert(!f({...ended,status:'duplicate_merged'},{cost:'0',view:'free'}),'merged duplicate must not appear in free preset');
assert(f({...ended,status:'duplicate_merged'},{}));
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
assert.strictEqual(ctx.statusInfo({status:'conditional'}).tone,'conditional');
assert.strictEqual(ctx.statusInfo({status:'application_based'}).tone,'conditional');
const css=fs.readFileSync(__dirname+'/../style.css','utf8');
assert(css.includes('.status-conditional'),'missing .status-conditional in style.css');
assert.strictEqual(ctx.statusInfo({status:'quota_and_taiwan_eligibility_unverified'}).label,'額度與台灣資格待核');
assert.strictEqual(ctx.statusInfo({status:'taiwan_not_listed_supported_region'}).label,'台灣未列於支援地區');
assert.strictEqual(ctx.statusInfo({status:'watchlist'}).label,'觀察線索待追蹤');
const validStatuses=['active','active_verified','conditional','expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','paused','restricted','application_based','limited_availability','terms_conflict','conflicting_official_usage_claims','unverified','needs_verification','unverified_numeric_claims','unverified_redemption','campaign_current_availability_unverified','taiwan_availability_unverified','unverified_taiwan_eligibility','application_based_unverified','application_based_unverified_terms','account_specific_unverified','grant_terms_unverified','resolved_rumor_disproven','duplicate_merged','amount_and_eligibility_unverified','current_approval_unverified','grant_delivery_unverified','legacy_closed_new_path_conditional','quota_and_taiwan_eligibility_unverified','taiwan_not_listed_supported_region','watchlist'];
for (const st of validStatuses) {
  assert.notStrictEqual(ctx.statusInfo({status:st}).label, '狀態待釐清', `missing status label in app.js: ${st}`);
}

// The latest attempt is not a successful verification: expose its failure reason.
class Element {
  constructor(tag) { this.tagName=tag; this.children=[]; this.textContent=''; }
  append(...children) { this.children.push(...children); }
  get childElementCount() { return this.children.length; }
}
ctx.document={createElement:tag=>new Element(tag)};
const dup=d.offers.find(o=>o.status==='duplicate_merged');
assert(dup&&dup.duplicate_of,'dataset has a merged duplicate with duplicate_of');
const dupDetails=ctx.createDetails(dup);
const dupRow=dupDetails.children.find(n=>n.tagName==='dl').children.find(r=>r.children[0].textContent==='重複收錄處理');
assert(dupRow&&dupRow.children[1].textContent.includes(dup.duplicate_of),'merged duplicate details must name the canonical id');

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

const biweeklyDetails=ctx.createDetails({review_cadence:'biweekly',next_review_at:'2026-11-20',eligibility:{},sources:[]});
const biweeklyRow=biweeklyDetails.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert(biweeklyRow.children[1].textContent.startsWith('雙週輪替；2026-11-20'),'unexpected cadence text for biweekly');
const monthlySignalDetails=ctx.createDetails({review_cadence:'monthly_or_new_signal',next_review_at:'2026-11-20',eligibility:{},sources:[]});
const monthlySignalRow=monthlySignalDetails.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert(monthlySignalRow.children[1].textContent.startsWith('每月或有新線索時；2026-11-20'),'unexpected cadence text for monthly_or_new_signal');
const eventDetails=ctx.createDetails({review_cadence:'event',next_review_at:'2026-11-20',eligibility:{},sources:[]});
const eventRow=eventDetails.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert(eventRow.children[1].textContent.startsWith('特定活動事件追蹤；2026-11-20'),'unexpected cadence text for event');
const weeklyDetails=ctx.createDetails({review_cadence:'weekly',next_review_at:'2026-11-20',eligibility:{},sources:[]});
const weeklyRow=weeklyDetails.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert(weeklyRow.children[1].textContent.startsWith('每週；2026-11-20'),'unexpected cadence text for weekly');
const onSignalDetails=ctx.createDetails({review_cadence:'on_new_signal',next_review_at:'2026-11-20',eligibility:{},sources:[]});
const onSignalRow=onSignalDetails.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert(onSignalRow.children[1].textContent.startsWith('有新線索時；2026-11-20'),'unexpected cadence text for on_new_signal');
const closedDetails=ctx.createDetails({status:'expired',next_review_at:null,eligibility:{},sources:[]});
const closedRow=closedDetails.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert.strictEqual(closedRow.children[1].textContent,'已停止定期複核；有新線索時追蹤');
const unscheduledDetails=ctx.createDetails({status:'active',review_cadence:'monthly',next_review_at:null,eligibility:{},sources:[]});
const unscheduledRow=unscheduledDetails.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert.strictEqual(unscheduledRow.children[1].textContent,'每月輪替；未安排特定複核日期');
const nullCadenceScheduled=ctx.createDetails({status:'active',review_cadence:null,next_review_at:'2026-11-20',eligibility:{},sources:[]});
const nullCadenceScheduledRow=nullCadenceScheduled.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert(nullCadenceScheduledRow.children[1].textContent.startsWith('定期輪替；2026-11-20'),'unexpected cadence text for null cadence with scheduled date');
const nullCadenceUnscheduled=ctx.createDetails({status:'active',review_cadence:null,next_review_at:null,eligibility:{},sources:[]});
const nullCadenceUnscheduledRow=nullCadenceUnscheduled.children.find(node=>node.tagName==='dl').children.find(row=>row.children[0].textContent==='下次複核');
assert.strictEqual(nullCadenceUnscheduledRow.children[1].textContent,'未指定週期；未安排特定複核日期');

const sortItems = [
  { id: 'unknown-1', setup_cost_usd: null },
  { id: 'free-1', setup_cost_usd: 0 },
  { id: 'unknown-2', setup_cost_usd: null },
  { id: 'paid-1', setup_cost_usd: 5 }
];
const costComp = (a, b) => {
  const costA = a.setup_cost_usd ?? Infinity;
  const costB = b.setup_cost_usd ?? Infinity;
  return costA === costB ? 0 : costA - costB;
};
assert.strictEqual(costComp({setup_cost_usd: null}, {setup_cost_usd: null}), 0);
assert(!Number.isNaN(costComp({setup_cost_usd: null}, {setup_cost_usd: null})));
sortItems.sort(costComp);
assert.strictEqual(sortItems[0].id, 'free-1');
assert.strictEqual(sortItems[1].id, 'paid-1');
assert(sortItems[2].setup_cost_usd === null && sortItems[3].setup_cost_usd === null);

// Repeated lookups of the same URL must render once, newest evidence first,
// with earlier lookups kept behind a disclosure instead of duplicated rows.
const grouped = ctx.groupSources([
  { url: 'https://example.com/a', scope: '舊範圍', evidence: '舊證據' },
  { url: 'https://example.com/a', scope: '新範圍', evidence: '新證據', accessed_time_range: '2026-11-08T10:00:00+08:00/2026-11-08T10:05:00+08:00' },
  { url: 'https://example.com/b', scope: 'B範圍', evidence: 'B證據' }
]);
assert.strictEqual(grouped.length, 2, 'same URL should collapse into one source group');
assert.strictEqual(grouped[0].source.scope, '新範圍', 'newest accessed entry should be primary');
assert.strictEqual(grouped[0].earlier.length, 1);
assert.strictEqual(grouped[0].earlier[0].scope, '舊範圍');
assert.deepStrictEqual(ctx.groupSources([]).length, 0);
const repeatedDetails = ctx.createDetails({
  eligibility: {},
  sources: [
    { url: 'https://example.com/a', scope: '舊範圍', evidence: '舊證據' },
    { url: 'https://example.com/a', scope: '新範圍', evidence: '新證據', accessed_at: '2026-11-08T10:05:00+08:00' }
  ]
});
const repeatedList = repeatedDetails.children.find(node => node.tagName === 'ol');
assert.strictEqual(repeatedList.children.length, 1, 'duplicate source URLs must not render twice');
const repeatedItem = repeatedList.children[0];
assert(repeatedItem.children.some(node => node.tagName === 'p' && node.textContent.includes('新範圍')));
const earlierBlock = repeatedItem.children.find(node => node.tagName === 'details');
assert(earlierBlock, 'earlier lookups of the same URL must stay reachable');
assert(earlierBlock.children[0].textContent.includes('1 筆'));
assert(earlierBlock.children.some(node => node.textContent.includes('舊證據')));

// 用量/額度篩選改以 schema 管制的 quota_classification 判定；usage_type 是自由文字描述
// （曾為 358 種字串、262 筆 null，使舊版 3 個英文選項幾乎篩不到資料）。
const unlimitedByQuota=d.offers.filter(o=>o.quota_classification==='OFFICIALLY UNLIMITED'||o.quota_classification==='TEMPORARILY UNLIMITED');
assert(unlimitedByQuota.length>=4,'expected records classified as officially or temporarily unlimited');
const deadStatuses=['expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','resolved_rumor_disproven','duplicate_merged'];
for(const o of unlimitedByQuota){
  assert(f(o,{usage:o.quota_classification}),'usage filter must match quota_classification: '+o.id);
  // 專區只收可行動的紀錄；已截止者由下一段單獨驗證退出專區但仍在全庫。
  if(!deadStatuses.includes(o.status)) assert(f(o,{view:'unlimited'}),'unlimited preset must derive from quota_classification: '+o.id);
}
const freeTextUsage=d.offers.find(o=>o.id==='taiwan-moe-moocs-eighteen-free-ai-courses');
assert(freeTextUsage&&freeTextUsage.usage_type!=='Unlimited'&&freeTextUsage.quota_classification==='OFFICIALLY UNLIMITED');
assert(f(freeTextUsage,{usage:'OFFICIALLY UNLIMITED'}),'usage filter must not depend on the free-text usage_type');
assert(!f(freeTextUsage,{usage:'HIGH BUT LIMITED'}));
const highLimited=d.offers.find(o=>o.quota_classification==='HIGH BUT LIMITED');
assert(f(highLimited,{usage:'HIGH BUT LIMITED'}));
assert(!f(highLimited,{view:'unlimited'}),'HIGH BUT LIMITED record must not appear in the unlimited preset');
const usageSelect=/<select name="usage">([\s\S]*?)<\/select>/.exec(fs.readFileSync(__dirname+'/../index.html','utf8'));
assert(usageSelect,'usage filter select missing from index.html');
const usageValues=[...usageSelect[1].matchAll(/<option value="([^"]*)"/g)].map(m=>m[1]).filter(Boolean);
assert.strictEqual(usageValues.length,5,'usage filter option count changed without a matching data check');
for(const v of usageValues) assert(d.offers.some(o=>o.quota_classification===v),'usage filter option without any matching record: '+v);
console.log('PASS: usage/額度 filter reads quota_classification, unlimited preset derives from it, and every index.html option matches data.');
// 無限/暫時不限量專區是可採取行動的入口，已截止紀錄不得出現（與免費專區一致），
// 但仍須能從全部紀錄搜尋到。批次 2026-11-08 以此攔到兩個已截止的暫時不限量案例。
const closedUnlimited=d.offers.find(o=>['expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','resolved_rumor_disproven','duplicate_merged'].includes(o.status)&&['OFFICIALLY UNLIMITED','TEMPORARILY UNLIMITED'].includes(o.quota_classification));
assert(closedUnlimited,'dataset should contain a closed unlimited-classified record to guard against');
assert(!f(closedUnlimited,{view:'unlimited'}),'closed record must not appear in the unlimited preset: '+closedUnlimited.id);
assert(f(closedUnlimited,{}),'closed record must stay findable in the full list: '+closedUnlimited.id);
for(const o of unlimitedByQuota.filter(x=>!['expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','resolved_rumor_disproven','duplicate_merged'].includes(x.status))){
  assert(f(o,{view:'unlimited'}),'open unlimited record must appear in the preset: '+o.id);
}
console.log('PASS: closed records leave the unlimited preset but remain searchable; open unlimited records still appear.');

// 服務地區篩選曾用 (o.regions||[]).includes(f.region) 做字串完全比對，但 regions 是自由文字：
// 26 種寫法（TW／Taiwan／Taipei, Taiwan／GLOBAL／Worldwide／United States…）。結果選「Taiwan」
// 漏掉 6 筆 taiwan=Yes 但存成 "TW" 的紀錄，71 筆有地區值的紀錄在任何選項下都查不到。
// 以下為規格值：別名必須歸入同一桶，且不得把 Unknown 或空值塞進 Other。
assert(ctx.regionMatches({regions:['TW']},'Taiwan'),'TW must match the Taiwan region option');
assert(ctx.regionMatches({regions:['Taipei, Taiwan']},'Taiwan'),'"Taipei, Taiwan" must match the Taiwan option');
assert(ctx.regionMatches({regions:['Taiwan']},'Taiwan'));
assert(!ctx.regionMatches({regions:['TW']},'US'),'TW must not match the US option');
assert(ctx.regionMatches({regions:['United States']},'US'),'"United States" must match the US option');
assert(ctx.regionMatches({regions:['GLOBAL']},'Global'),'"GLOBAL" must match the Global option');
assert(ctx.regionMatches({regions:['Worldwide']},'Global'),'"Worldwide" must match the Global option');
assert(!ctx.regionMatches({regions:['Global']},'Taiwan'));
assert(ctx.regionMatches({regions:['Japan']},'Other'),'a named non-global/US/Taiwan region must match Other');
assert(ctx.regionMatches({regions:['Other']},'Other'));
assert(!ctx.regionMatches({regions:['Unknown']},'Other'),'Unknown region must not be filed under Other');
assert(!ctx.regionMatches({regions:[]},'Other'),'an empty region list must not match Other');
assert(!ctx.regionMatches({regions:['Japan']},'Taiwan'),'Japan must not match Taiwan');

// Regression: the data actually contains these variants, and every record that claims a
// Taiwan region must be reachable from the Taiwan option (previously 6 Taiwan=Yes were lost).
const twVariant=d.offers.find(o=>(o.regions||[]).some(v=>['TW','Taipei, Taiwan'].includes(v)));
assert(twVariant,'dataset should still hold a TW/Taipei, Taiwan region variant to guard against');
for(const o of d.offers){
  if(!(o.regions||[]).some(v=>['TW','Taiwan','Taipei, Taiwan'].includes(v))) continue;
  assert(f(o,{region:'Taiwan'}),'record claiming a Taiwan region must appear under the Taiwan option: '+o.id);
}
for(const o of d.offers){
  if(!(o.regions||[]).includes('United States')) continue;
  assert(f(o,{region:'US'}),'record claiming United States must appear under the US option: '+o.id);
}
const regionSelect=/<select name="region">([\s\S]*?)<\/select>/.exec(fs.readFileSync(__dirname+'/../index.html','utf8'));
assert(regionSelect,'region filter select missing from index.html');
const regionValues=[...regionSelect[1].matchAll(/<option value="([^"]*)"/g)].map(m=>m[1]).filter(Boolean);
assert.strictEqual(regionValues.length,4,'region filter option count changed without a matching data check');
for(const v of regionValues) assert(d.offers.some(o=>ctx.regionMatches(o,v)),'region filter option without any matching record: '+v);
console.log('PASS: region filter matches aliases (TW/Taipei Taiwan/United States/GLOBAL/Worldwide), keeps Unknown out of Other, and every index.html region option matches data.');

// 免費方案捷徑的篩選條件就是 viewMatches('free')，不可再疊加 cost:'0'：那會額外要求「設定費
// 必須已知為 0」，把只是沒填設定費的真正免費紀錄（Cloudflare Workers Free、BeatAPI 零餘額）
// 擋在入口外，與 README 寫的規則不一致。以下為規格值：preset 只帶 view，且未知設定費仍可入。
// vm 內建立的物件有不同 prototype，用 JSON 比對值而非 deepStrictEqual。
assert.strictEqual(JSON.stringify(ctx.presetFilters('free')),JSON.stringify({view:'free'}),'free preset must rely on viewMatches alone');
assert.strictEqual(JSON.stringify(ctx.presetFilters('taiwan')),JSON.stringify({taiwan:'Yes'}));
assert.strictEqual(JSON.stringify(ctx.presetFilters('unknown-preset')),'{}');
const unknownSetupFree=d.offers.find(o=>o.id==='cloudflare-workers-free-daily-requests');
assert(unknownSetupFree&&unknownSetupFree.setup_cost_usd===null&&unknownSetupFree.recurring_cost_usd===0&&(unknownSetupFree.views||[]).includes('free'));
assert(f(unknownSetupFree,Object.assign({},ctx.presetFilters('free'),{cost:undefined})),'free record with unknown setup cost must appear in the free preset');
assert(!f(paidTrial,ctx.presetFilters('free')),'paid trial must stay out of the free preset after dropping the cost filter');
const freeIds=d.offers.filter(o=>f(o,ctx.presetFilters('free'))).map(o=>o.id);
assert(freeIds.includes('cloudflare-workers-free-daily-requests'),'preset selection must include unknown-setup-cost free records');
assert(freeIds.length>500,'free preset unexpectedly small: '+freeIds.length);
console.log('PASS: free preset derives from viewMatches only ('+freeIds.length+' records) and still excludes paid trials.');

// 「高免費額度」與「Beta 存取」兩個專區過去只讀人工 views（2026-11-09 統計：view=quota 63 筆，
// 但 schema 的 HIGH-QUOTA 類別有 127 筆、69 筆沒標；view=beta 15 筆，BETA-ACCESS 有 50 筆、
// 35 筆沒標）。兩個下拉標籤與類別一一對應，改由 categories 判定；已截止紀錄退出可行動專區，
// 但仍留在全庫搜尋。以下為規格值，不是現況快照。
const closedSet=new Set(['expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','resolved_rumor_disproven','duplicate_merged']);
const hqAll=d.offers.filter(o=>(o.categories||[]).includes('HIGH-QUOTA'));
const betaAll=d.offers.filter(o=>(o.categories||[]).includes('BETA-ACCESS'));
assert(hqAll.length>100,'HIGH-QUOTA category unexpectedly small: '+hqAll.length);
assert(betaAll.length>30,'BETA-ACCESS category unexpectedly small: '+betaAll.length);
for(const o of hqAll) assert.strictEqual(f(o,{view:'quota'}),!closedSet.has(o.status),'HIGH-QUOTA record must appear in the quota preset unless it is closed: '+o.id);
for(const o of betaAll) assert.strictEqual(f(o,{view:'beta'}),!closedSet.has(o.status),'BETA-ACCESS record must appear in the beta preset unless it is closed: '+o.id);
const quotaPreset=d.offers.filter(o=>f(o,{view:'quota'}));
assert.strictEqual(quotaPreset.length,hqAll.filter(o=>!closedSet.has(o.status)).length,'quota preset must equal open HIGH-QUOTA records');
assert(quotaPreset.length>100,'quota preset unexpectedly small: '+quotaPreset.length);
// 反向案例：有明確限制但不屬 HIGH-QUOTA 的紀錄不得因人工標記或額度分類而進入高額度專區。
const limitedOnly=d.offers.find(o=>o.quota_classification==='HIGH BUT LIMITED'&&!(o.categories||[]).includes('HIGH-QUOTA'));
assert(limitedOnly,'dataset should hold a HIGH BUT LIMITED record outside HIGH-QUOTA to guard against');
assert(!f(limitedOnly,{view:'quota'}),'HIGH BUT LIMITED alone must not mean 高免費額度: '+limitedOnly.id);
assert(!f({...free,categories:['FREE'],views:['quota']},{view:'quota'}),'a manual quota tag alone must not enter the quota preset');
assert(!f({...free,categories:['FREE'],views:['beta']},{view:'beta'}),'a manual beta tag alone must not enter the beta preset');
// 已截止的 BETA-ACCESS／HIGH-QUOTA 紀錄退出專區，但仍須能從全部紀錄找到。
const closedQuota=hqAll.find(o=>closedSet.has(o.status));
assert(closedQuota,'dataset should hold a closed HIGH-QUOTA record to guard against');
assert(!f(closedQuota,{view:'quota'})&&f(closedQuota,{}),'closed quota record must leave the preset but stay searchable: '+closedQuota.id);
const viewSelect=/<select name="view">([\s\S]*?)<\/select>/.exec(fs.readFileSync(__dirname+'/../index.html','utf8'));
assert(viewSelect,'view select missing from index.html');
const viewValues=[...viewSelect[1].matchAll(/<option value="([^"]*)"/g)].map(m=>m[1]).filter(Boolean);
for(const v of viewValues) assert(d.offers.some(o=>f(o,{view:v})),'opportunity view option without any matching record: '+v);
console.log('PASS: quota ('+quotaPreset.length+') and beta presets derive from schema categories, exclude closed records, and every index.html view option matches data.');
