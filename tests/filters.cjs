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
const validStatuses=['active','active_verified','conditional','expired','expired_unverified','closed','applications_closed','closed_to_new_subscriptions','sunset_announced','paused','restricted','application_based','limited_availability','terms_conflict','conflicting_official_usage_claims','unverified','needs_verification','unverified_numeric_claims','unverified_redemption','campaign_current_availability_unverified','taiwan_availability_unverified','unverified_taiwan_eligibility','application_based_unverified','application_based_unverified_terms','account_specific_unverified','grant_terms_unverified','resolved_rumor_disproven','duplicate_merged','amount_and_eligibility_unverified','eligibility_unverified','current_approval_unverified','grant_delivery_unverified','legacy_closed_new_path_conditional','quota_and_taiwan_eligibility_unverified','taiwan_not_listed_supported_region','watchlist'];
for (const st of validStatuses) {
  assert.notStrictEqual(ctx.statusInfo({status:st}).label, '狀態待釐清', `missing status label in app.js: ${st}`);
}

// The latest attempt is not a successful verification: expose its failure reason.
class Element {
  constructor(tag) { this.tagName=tag; this.children=[]; this.textContent=''; }
  append(...children) { this.children.push(...children); }
  get childElementCount() { return this.children.length; }
  setAttribute(key,value) { this[key]=value; }
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

// 最新一次追查「失敗」不是已核實：卡片正面必須標記，否則讀者只看到較舊的核實日期，
// 點進來源才發現 404（2026-11-10 全庫 8 筆屬此類，含來源全部失效的 qoder 與 astamuse）。
assert(css.includes('.attempt-pill'),'missing .attempt-pill in style.css');
const newerFail=ctx.latestAttemptFailed({last_review_attempt_at:'2026-11-10T10:20:00+08:00',verified_at:'2026-11-02T18:10:00+08:00',last_review_attempt_reason:'官方頁仍 404'});
assert(newerFail&&newerFail.at==='2026-11-10T10:20:00+08:00','a newer failed attempt must be flagged');
assert.strictEqual(newerFail.reason,'官方頁仍 404');
assert.strictEqual(ctx.latestAttemptFailed({last_review_attempt_at:'2026-10-01T00:00:00+08:00',verified_at:'2026-11-02T18:10:00+08:00'}),null,'an older failed attempt must not shadow the newer successful verification');
assert.strictEqual(ctx.latestAttemptFailed({verified_at:'2026-11-02T18:10:00+08:00'}),null,'no attempt recorded means no marker');
assert(ctx.latestAttemptFailed({last_review_attempt_at:'2026-11-10T10:20:00+08:00'}),'an attempt with no verification at all must be flagged');
// 資料驅動：每一筆「最新證據是失敗」的紀錄都要被標記，其他紀錄不得被標記。
const staleAttempts=d.offers.filter(o=>o.last_review_attempt_at&&(!o.verified_at||Date.parse(o.last_review_attempt_at)>Date.parse(o.verified_at)));
assert(staleAttempts.length>0,'dataset should still contain records whose latest evidence is a failed attempt');
for(const o of d.offers){
  const flagged=!!ctx.latestAttemptFailed(o);
  const expected=!!(o.last_review_attempt_at&&(!o.verified_at||Date.parse(o.last_review_attempt_at)>Date.parse(o.verified_at)));
  assert.strictEqual(flagged,expected,`attempt marker disagrees with data in ${o.id}`);
}
console.log(`PASS: latest failed lookup is marked on the card face (${staleAttempts.length} records) and never overrides a newer verification.`);

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

// 精確截止時間存在 expires_at／deadline_at／expiry，但卡片先前只渲染自由文字的「有效期間」，
// 讀者要趕的台北 11/12 15:59、今日 12:59 只藏在段落裡。以下為規格值：有這三個欄位就必須出現
// 「截止與期限」列，且帶時刻者標明台北時間、只有日期者標明來源未列時刻；沒有欄位就不得出現。
function deadlineRow(offer) {
  const details = ctx.createDetails({ eligibility: {}, sources: [], ...offer });
  return details.children.find(node => node.tagName === 'dl').children.find(row => row.children[0].textContent === '截止與期限');
}
function withoutPinnedDates(offer) {
  const copy = { ...offer };
  for (const field of ['deadline_at', 'expires_at', 'expiry']) delete copy[field];
  return copy;
}
for (const offer of d.offers) {
  const hasDates = ['deadline_at', 'expires_at', 'expiry'].some(field => offer[field]);
  const row = deadlineRow(offer);
  if (hasDates) assert(row, `missing 截止與期限 row for ${offer.id}`);
  else assert(!row, `unexpected 截止與期限 row for ${offer.id}`);
}
const ara = deadlineRow(d.offers.find(o => o.id === 'amazon-ara-multilingual-contextual-ai-fall-2026'));
assert.strictEqual(ara.children[1].textContent, '申請截止 2026/11/12 15:59（台北時間）');
const datacamp = deadlineRow(d.offers.find(o => o.id === 'datacamp-free-access-week-november-2026'));
assert(datacamp.children[1].textContent.startsWith('方案或免費期結束 '), 'expires_at must render under 方案或免費期結束');
assert(datacamp.children[1].textContent.includes('台北時間'), 'expires_at with a clock time must be labelled as Taipei time');
const rime = deadlineRow(d.offers.find(o => o.id === 'rime-stt-nov19-free-window'));
assert.strictEqual(rime.children[1].textContent, '方案或免費期結束 2026-11-19（來源未列時刻）');
const teachers = deadlineRow(d.offers.find(o => o.id === 'claude-teachers-us'));
assert.strictEqual(teachers.children[1].textContent, '期限 2027-06-30（來源未列時刻）');
const bothFields = deadlineRow({ deadline_at: '2026-12-01', expires_at: '2026-12-01T23:59:00+09:00' });
assert.strictEqual(bothFields.children[1].textContent, '申請截止 2026-12-01（來源未列時刻）；方案或免費期結束 2026/12/01 22:59（台北時間）');
assert(!deadlineRow(withoutPinnedDates({ expires_at: '2026-11-19' })), 'an offer without pinned dates must not show the row');

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
// 查閱時間是自由文字時不能靠 split('/') 取尾段：帶註記的「2026-10-25（Asia/Taipei）」會變成
// 「Taipei）」，排序時被當成最舊，最新證據就被收進「較早的 N 筆同網址紀錄」。2026-11-10 統計
// 10 組同網址來源因此藏住較新的證據（adobe-firefly-assistant 的 11/10 04:24、bubble-agent2 的
// 11/01、kakao-plus-young-adult 的 10/30、v0-free-policy、together-prepaid-policy 等）。
assert.strictEqual(ctx.sourceStamp({ accessed_at: '2026-10-25（Asia/Taipei）' }), '2026-10-25');
assert.strictEqual(ctx.sourceStamp({ accessed_at: '2026-10-26 Asia/Taipei；頁面於18:37:26+08:00前讀取完成' }), '2026-10-26');
assert.strictEqual(ctx.sourceStamp({ accessed_time_range: '2026-11-08T10:00:00+08:00/2026-11-08T10:05:00+08:00' }), '2026-11-08T10:05:00');
assert.strictEqual(ctx.sourceStamp({}), '');
const annotated = ctx.groupSources([
  { url: 'https://example.com/x', scope: '舊註記', evidence: '舊證據', accessed_at: '2026-10-25（Asia/Taipei）' },
  { url: 'https://example.com/x', scope: '新ISO', evidence: '新證據', accessed_at: '2026-11-10T04:24:00+08:00' }
]);
assert.strictEqual(annotated[0].source.scope, '新ISO', 'an annotated free-text stamp must not hide newer evidence');
assert.strictEqual(annotated[0].earlier[0].scope, '舊註記');
// 沒有 accessed_at／accessed_time_range 的舊來源，查閱時間只寫在證據文字開頭。它們原本排序鍵是
// 空字串，永遠排最舊，把同網址較新的一筆壓進「較早的 N 筆」。2026-11-10 統計 8 組（5 筆紀錄：
// code-for-everyone-ai-school-2026、taiwan-ai-rap-pilot、kimi-api-free-voucher-cn-locked、
// gitlab-education-ai-credit-exclusion、murf-startup-incubator-three-month）畫面上的主來源
// 日期比被收起來的那筆還舊。只認「開頭日期＋30 字內有實讀動詞」的明確寫法。
assert.strictEqual(ctx.sourceStamp({ evidence: '2026-11-01 05:06–05:07 Asia/Taipei實讀：私立學校可申請。' }), '2026-11-01');
assert.strictEqual(ctx.sourceStamp({ evidence: '2026-10-26 23:08 Asia/Taipei實讀：條款原文。' }), '2026-10-26');
assert.strictEqual(ctx.sourceStamp({ evidence: '2026-10-23日本時間上線，為北美以外首個開放地區。' }), '', 'a launch date is not a read time');
assert.strictEqual(ctx.sourceStamp({ evidence: '2026-10-25 17:19–17:25 Asia/Taipei；同時段官方搜尋結果列 Education Pro' }), '', 'a bare timestamp without a read verb is not a read time');
assert.strictEqual(ctx.sourceStamp({ evidence: '“professors and faculty members at accredited instituti' }), '');
assert.strictEqual(ctx.sourceStamp({ accessed_at: '2026-10-25', evidence: '2026-11-01 實讀：x' }), '2026-10-25', 'an explicit accessed_at always wins');
const recovered = ctx.groupSources([
  { url: 'https://example.com/y', scope: '舊實讀', evidence: '2026-10-26 01:46 Asia/Taipei 實讀：舊。' },
  { url: 'https://example.com/y', scope: '新實讀', evidence: '2026-11-01 05:06 Asia/Taipei實讀：新。' }
]);
assert.strictEqual(recovered[0].source.scope, '新實讀', 'an evidence-only read date must order the group');
assert.strictEqual(recovered[0].earlier[0].scope, '舊實讀');
// 資料驅動：任何同網址群組的主要來源都必須是最新的查閱時間（沒有時間者略過，無從排序）。
for (const offer of d.offers) {
  for (const group of ctx.groupSources(offer.sources || [])) {
    const primary = ctx.sourceStamp(group.source);
    if (!primary) continue;
    for (const older of group.earlier) {
      const stamp = ctx.sourceStamp(older);
      if (!stamp) continue;
      assert(stamp <= primary, `source order hides newer evidence in ${offer.id}: ${primary} shown, ${stamp} collapsed`);
    }
  }
}
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

// 機器可讀的截止日先前只出現在收合的詳情列：2026-11-10 統計，906 筆可行動紀錄中有 22 筆帶未來截止點，
// 但依預設 S→D 排序時有 18 筆不在第一頁（Amazon ARA 台北 11/12 15:59 排在第 609 張），也沒有任何排序
// 能把它們找出來。以下為規格值：只列日期者視為當日 23:59 台北時間、已過的日期不算即將截止、
// 已截止紀錄不得主張剩餘天數、超過 60 天不擠上卡片、排序時有截止點者一律排在沒有的人前面。
const CLOSE_NOW=Date.parse('2026-11-10T08:30:00+08:00');
const realNow=ctx.nowMs;
ctx.nowMs=()=>CLOSE_NOW;
assert.strictEqual(ctx.closeInstant('2026-11-12'),Date.parse('2026-11-12T23:59:59+08:00'),'date-only deadlines count as the whole Taipei day');
assert.strictEqual(ctx.closeInstant('2026-11-12T15:59:00+08:00'),Date.parse('2026-11-12T15:59:00+08:00'));
assert.strictEqual(ctx.closeInstant(null),null);
assert.strictEqual(ctx.daysUntil(Date.parse('2026-11-10T23:59:59+08:00'),CLOSE_NOW),0,'a same-day deadline is 0 days, not 1');
assert.strictEqual(ctx.daysUntil(Date.parse('2026-11-12T15:59:00+08:00'),CLOSE_NOW),2);
const syntheticClose={id:'synthetic',status:'active',deadline_at:'2026-11-12T15:59:00+08:00',expires_at:'2026-11-11T09:00:00+08:00'};
assert.strictEqual(ctx.closeBadge(syntheticClose,CLOSE_NOW).label,'方案結束','badge must show the nearest close point');
assert.strictEqual(ctx.closeBadge({...syntheticClose,expires_at:undefined,deadline_at:'2026-11-01'},CLOSE_NOW),null,'a past date is not an upcoming deadline');
assert.strictEqual(ctx.closeBadge({...syntheticClose,status:'applications_closed'},CLOSE_NOW),null,'closed records must not claim remaining days');
assert.strictEqual(ctx.closeBadge({...syntheticClose,expires_at:undefined,deadline_at:'2027-06-30'},CLOSE_NOW),null,'dates beyond 60 days stay in the details row only');
assert.strictEqual(ctx.closeBadge({...syntheticClose,expires_at:undefined,deadline_at:'2026-11-10'},CLOSE_NOW).days,0);
// 2026-11-14：這裡原本拿 amazon-ara-... 當範例，但該筆當天已標 applications_closed，closeBadge
// 依規則不再顯示倒數，測試因此失敗。要測的是「未來截止會在卡片正面顯示膠囊」，不該綁在一筆
// 隨時可能關閉的真實紀錄上（每次有紀錄到期就會再紅一次）。改用合成紀錄驗證文字與緊急色，
// 再用真實資料做動態檢查：任何仍可行動、且最近截止點在 60 天內的紀錄都必須有膠囊。
const soonCard=ctx.createCard({id:'synthetic-soon',title:'Synthetic',summary:'s',status:'active',record_type:'opportunity',verification:'Official',taiwan:'Yes',categories:['FREE'],deadline_at:'2026-11-12T15:59:00+08:00'});
const soonPill=soonCard.children.find(n=>n.className==='card-foot').children.find(n=>n.className&&n.className.includes('deadline-pill'));
assert(soonPill,'card face must show the upcoming deadline');
assert.strictEqual(soonPill.textContent,'申請截止 2026/11/12 15:59 · 剩 2 天');
assert(soonPill.className.includes('deadline-soon'),'a deadline within a week needs the urgent tone');
const openWithSoon=d.offers.filter(o=>ctx.closeBadge(o,CLOSE_NOW));
assert(openWithSoon.length>0,'expected at least one open record with an upcoming close point');
for (const openRecord of openWithSoon.slice(0,5)) {
  const openPill=ctx.createCard(openRecord).children.find(n=>n.className==='card-foot').children.find(n=>n.className&&n.className.includes('deadline-pill'));
  assert(openPill,`an open record with a close point must render a deadline pill: ${openRecord.id}`);
}
const plainFoot=ctx.createCard(d.offers.find(o=>o.id==='gemini-api-free')).children.find(n=>n.className==='card-foot');
assert(!plainFoot.children.some(n=>n.className&&n.className.includes('deadline-pill')),'cards without a machine-readable deadline must not show one');
const closeOrdered=[...d.offers].sort(ctx.byDeadline);
const closeDated=closeOrdered.filter(o=>ctx.soonestClose(o,CLOSE_NOW));
assert(closeDated.length>10,'expected records with an upcoming close point');
assert(closeOrdered.slice(0,closeDated.length).every(o=>ctx.soonestClose(o,CLOSE_NOW)),'records with an upcoming close point must precede the rest');
const closeAts=closeOrdered.slice(0,closeDated.length).map(o=>ctx.soonestClose(o,CLOSE_NOW).at);
assert(closeAts.every((at,i)=>i===0||at>=closeAts[i-1]),'deadline sort must be ascending');
assert(ctx.compareDeadline({id:'later',deadline_at:'2026-11-20'},{id:'sooner',deadline_at:'2026-11-12'},CLOSE_NOW)>0);
assert(ctx.compareDeadline({id:'undated'},{id:'dated',deadline_at:'2026-11-12'},CLOSE_NOW)>0,'undated records must sort after dated ones');
const undatedPair=closeOrdered.slice(closeDated.length,closeDated.length+2);
assert.strictEqual(ctx.compareDeadline(undatedPair[0],undatedPair[1],CLOSE_NOW),ctx.byPriority(undatedPair[0],undatedPair[1]),'undated records keep the priority order');
ctx.nowMs=realNow;
assert(!d.offers.some(o=>deadStatuses.includes(o.status)&&ctx.closeBadge(o,CLOSE_NOW)),'closed records must never show a deadline pill');
const sortSelect=/<select name="sort">([\s\S]*?)<\/select>/.exec(fs.readFileSync(__dirname+'/../index.html','utf8'));
assert(sortSelect,'sort select missing from index.html');
assert(/<option value="deadline">/.test(sortSelect[1]),'sort select must expose the deadline order');
assert(css.includes('.deadline-pill'),'missing .deadline-pill in style.css');
console.log('PASS: overdue/near deadlines are visible on the card face and sortable, and closed records claim no remaining days.');
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
// taiwan 是 schema 管制的資格欄位；regions 常留空或只寫 Global。Taiwan 選項必須同時接受
// taiwan=Yes，否則 33 筆自稱台灣可用的紀錄（AWS Free Tier、Azure 免費帳戶、Amazon Polly…）
// 在讀者選「Taiwan」時消失。以下為規格值，兩邊都要有反向案例。
assert(ctx.regionMatches({regions:[],taiwan:'Yes'},'Taiwan'),'taiwan=Yes with empty regions must match the Taiwan option');
assert(ctx.regionMatches({regions:['Global'],taiwan:'Yes'},'Taiwan'),'taiwan=Yes with Global regions must match the Taiwan option');
assert(!ctx.regionMatches({regions:[],taiwan:'Unknown'},'Taiwan'),'unknown Taiwan eligibility must not match the Taiwan option');
assert(!ctx.regionMatches({regions:['Global'],taiwan:'No'},'Taiwan'),'taiwan=No must not match the Taiwan option');
assert(!ctx.regionMatches({regions:[],taiwan:'Yes'},'US'),'taiwan=Yes must not leak into the US option');

// Regression: the data actually contains these variants, and every record that claims a
// Taiwan region must be reachable from the Taiwan option (previously 6 Taiwan=Yes were lost).
const twVariant=d.offers.find(o=>(o.regions||[]).some(v=>['TW','Taipei, Taiwan'].includes(v)));
assert(twVariant,'dataset should still hold a TW/Taipei, Taiwan region variant to guard against');
for(const o of d.offers){
  if(!(o.regions||[]).some(v=>['TW','Taiwan','Taipei, Taiwan'].includes(v))) continue;
  assert(f(o,{region:'Taiwan'}),'record claiming a Taiwan region must appear under the Taiwan option: '+o.id);
}
// 資料驅動的反向檢查：任何標記 taiwan=Yes 的紀錄都必須出現在 Taiwan 選項下，且 taiwan=No 的
// 紀錄不得被 Taiwan 選項收進來（先前 33 筆 taiwan=Yes 選 Taiwan 時查不到）。
for(const o of d.offers){
  if(o.taiwan==='Yes') assert(f(o,{region:'Taiwan'}),'taiwan=Yes record must appear under the Taiwan option: '+o.id);
  if(o.taiwan==='No') assert(!f(o,{region:'Taiwan'}),'taiwan=No record must not appear under the Taiwan option: '+o.id);
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

// 「機會專區」下拉的每個選項都是可行動入口：已截止、已關閉與重複合併紀錄必須退出全部選項，
// 但仍留在全庫搜尋。先前只排除免費／無限／高額度／Beta 四個，2026-11-09 統計「新創與開發者」
// 仍列 38 筆已截止或已併入他筆的紀錄（含 copilot-free、lovable-student-discount 等重複紀錄），
// 「美國與地區限定」57 筆中有 15 筆已截止。以下為規格值：對 index.html 每個選項逐一斷言。
for(const v of viewValues){
  const leaked=d.offers.filter(o=>closedSet.has(o.status)&&f(o,{view:v}));
  assert.strictEqual(leaked.length,0,'closed or merged records must leave the 機會專區 option "'+v+'": '+leaked.map(o=>o.id).join(','));
}
const mergedDev=d.offers.find(o=>o.status==='duplicate_merged'&&(o.views||[]).includes('developer'));
assert(mergedDev,'dataset should hold a merged duplicate tagged developer to guard against');
assert(!f(mergedDev,{view:'developer'}),'merged duplicate must not appear in the developer preset: '+mergedDev.id);
assert(f(mergedDev,{}),'merged duplicate must stay findable in the full list: '+mergedDev.id);
const openDev=d.offers.find(o=>!closedSet.has(o.status)&&(o.views||[]).includes('developer'));
assert(openDev&&f(openDev,{view:'developer'}),'an open developer record must stay in the preset');
const closedRegional=d.offers.find(o=>closedSet.has(o.status)&&(o.categories||[]).includes('REGION-LOCKED')&&o.taiwan!=='Yes');
assert(closedRegional,'dataset should hold a closed region-locked record to guard against');
assert(!f(closedRegional,{view:'regional'}),'closed regional record must leave the regional preset: '+closedRegional.id);
assert(f(closedRegional,{taiwan:closedRegional.taiwan}),'non-view filters must still reach closed records');
console.log('PASS: every 機會專區 option excludes closed and merged records; closed records remain reachable without a view filter.');

// 「美國與地區限定」問的是「哪些方案依官方規則不含台灣」，不能由人工 views 回答。2026-11-10 統計：
// view=regional 的 57 筆中有 27 筆 taiwan=Yes（台北青年 AI 補助、新竹市補助、緯創算力捐贈、Google
// 學生方案、台智雲 TWAI、Oracle 免費層…），選這個專區等於拿到「台灣條件適用」的鏡像，卡片排序又把
// S 級（台灣可用）排最前面；反向也漏掉 10 筆真正受限、只是沒被標記的方案（sarashina 日本限定 beta、
// kimi／aliyun 中國限定、fal 歐洲／亞洲額度、vapi 美號碼方案、chatgpt/claude 教師美國限定）。
// 改讀 schema 的 REGION-LOCKED 類別並排除台灣已符合資格者。以下為規格值，不是現況快照。
const regionLocked=d.offers.filter(o=>(o.categories||[]).includes('REGION-LOCKED'));
assert(regionLocked.length>40,'REGION-LOCKED category unexpectedly small: '+regionLocked.length);
for(const o of regionLocked) assert.strictEqual(f(o,{view:'regional'}),o.taiwan!=='Yes'&&!closedSet.has(o.status),'REGION-LOCKED record must appear in 美國與地區限定 unless Taiwan qualifies or it is closed: '+o.id);
const twRegionalTagged=d.offers.find(o=>o.taiwan==='Yes'&&(o.views||[]).includes('regional'));
assert(twRegionalTagged,'dataset should hold a Taiwan-qualifying record tagged regional to guard against');
assert(!f(twRegionalTagged,{view:'regional'}),'a Taiwan-qualifying record must not appear in 美國與地區限定: '+twRegionalTagged.id);
assert(f(twRegionalTagged,{}),'it must stay findable without the view filter: '+twRegionalTagged.id);
const regionGain=d.offers.find(o=>o.taiwan!=='Yes'&&!closedSet.has(o.status)&&(o.categories||[]).includes('REGION-LOCKED')&&!(o.views||[]).includes('regional'));
assert(regionGain,'dataset should hold an open region-locked record without the manual regional tag to guard against');
assert(f(regionGain,{view:'regional'}),'a region-locked record must not depend on a manual tag: '+regionGain.id);
console.log('PASS: regional preset = REGION-LOCKED and Taiwan not eligible ('+d.offers.filter(o=>f(o,{view:'regional'})).length+' open records).');

// 「台灣條件適用」是頁面上第一個捷徑按鈕，但它用的是 taiwan:'Yes' 這個一般篩選，不經 viewMatches，
// 所以上面那段排除規則涵蓋不到它：2026-11-09 統計 106 筆 taiwan=Yes 中有 10 筆已截止／已關閉／重複合併，
// 卡片標題自己寫著「已截止」（例如 moda-service-robot-virtual-scene-subsidy-2026、taiwan-ai-rap-pilot）。
// presetMatches() 讓這個捷徑與其他可行動專區一致；全庫搜尋仍找得到，一般 taiwan 篩選不受影響。
const closedTW=d.offers.find(o=>closedSet.has(o.status)&&o.taiwan==='Yes');
assert(closedTW,'dataset should hold a closed taiwan=Yes record to guard against');
assert(!ctx.presetMatches(closedTW,'taiwan'),'closed taiwan record must leave the 台灣條件適用 preset: '+closedTW.id);
assert(ctx.presetMatches(closedTW,'all'),'closed taiwan record must stay findable without the preset');
assert(ctx.presetMatches(closedTW,null),'closed taiwan record must stay findable once the preset is released');
assert(f(closedTW,{taiwan:'Yes'}),'the plain taiwan filter must still reach closed records');
const openTW=d.offers.find(o=>!closedSet.has(o.status)&&o.taiwan==='Yes');
assert(openTW&&ctx.presetMatches(openTW,'taiwan'),'an open taiwan record must stay in the 台灣條件適用 preset');
const presetTW=d.offers.filter(o=>ctx.presetMatches(o,'taiwan'));
assert.strictEqual(presetTW.filter(o=>closedSet.has(o.status)).length,0,'closed records leak into the 台灣條件適用 preset');
const rawTW=d.offers.filter(o=>o.taiwan==='Yes').length;
assert(presetTW.length<rawTW,'preset must be narrower than the raw taiwan filter: '+presetTW.length+'/'+rawTW);
assert.strictEqual(presetTW.length,rawTW-d.offers.filter(o=>o.taiwan==='Yes'&&closedSet.has(o.status)).length,'preset must equal open taiwan=Yes records');
assert(!ctx.presetMatches(paidTrial,'free'),'presetMatches must still honour the preset filters');
assert(ctx.presetMatches(zeroUntagged,'free'));
assert(!ctx.presetMatches(paidTrial,'free',{view:'free'}),'an explicit filter set must still be respected');
const presetButtons=[...fs.readFileSync(__dirname+'/../index.html','utf8').matchAll(/data-preset="([^"]+)"/g)].map(m=>m[1]);
assert(presetButtons.includes('taiwan'),'index.html must keep the 台灣條件適用 preset button');
for(const name of presetButtons) assert.strictEqual(typeof ctx.presetMatches(d.offers[0],name),'boolean','presetMatches must accept every index.html preset: '+name);
console.log('PASS: 台灣條件適用 preset ('+presetTW.length+'/'+rawTW+') excludes closed records and keeps them searchable.');

// 概況卡與快捷鍵同名就要同數：曾用 priority_tier==='S' 算「台灣條件適用」概況（85），
// 快捷鍵卻回 taiwan=Yes 且未截止的 96 筆（多出 5 筆政策、6 筆觀察線索），同一頁兩個數字。
const metrics=ctx.overviewMetrics(d.offers);
const twMetric=metrics.find(m=>m[1]==='台灣條件適用');
assert(twMetric,'overview must keep a 台灣條件適用 metric');
assert.strictEqual(twMetric[0],presetTW.length,'overview 台灣條件適用 count must equal the preset count ('+twMetric[0]+' vs '+presetTW.length+')');
const sTier=d.offers.filter(o=>o.priority_tier==='S').length;
assert(sTier<presetTW.length,'fixture must hold non-S open taiwan records so the split is exercised');
assert(twMetric[2].includes('S 級機會 '+sTier+' 筆'),'metric note must expose the S-tier split: '+twMetric[2]);
assert.strictEqual(metrics.find(m=>m[1]==='福利研究')[0],d.offers.filter(o=>o.record_type==='opportunity').length);
console.log('PASS: overview metrics agree with the presets they share a label with (台灣條件適用 '+twMetric[0]+', S 級 '+sTier+').');

// 已截止的卡片仍把「免費機會」「高額度」放在標題下，讀者要讀完整段摘要才知道不能申請
// （2026-11-09：Amazon Q Developer 於 2026-05-15 停止新註冊後仍以「免費機會」開場；
// 全庫 75 筆已截止／已關閉／重複合併紀錄中 72 筆帶分類標籤）。已截止卡片改為單一歷史標籤並列原分類；
// categories 資料不改，避免用前端掩蓋歷史事實。以下為規格值斷言。
const closedCard=ctx.createCard(d.offers.find(o=>o.id==='chatgpt-back-to-school-us'));
const closedTags=closedCard.children.find(n=>n.className==='card-tags');
assert.strictEqual(closedTags.children.length,1,'closed card must show exactly one tag');
assert(closedTags.children[0].className.includes('tag-closed'),'closed tag must carry the closed style');
assert(closedTags.children[0].textContent.includes('優惠已到期'),'closed tag must name the status');
assert(closedTags.children[0].textContent.includes('原分類'),'closed tag must keep the historical categories');
assert(!closedTags.children[0].textContent.startsWith('免費機會'),'closed card must not open with a claimable tag');
const openCard=ctx.createCard(d.offers.find(o=>o.id==='gemini-api-free'));
const openTags=openCard.children.find(n=>n.className==='card-tags');
assert.strictEqual(openTags.children.length,1,'open card keeps its category tags');
assert.strictEqual(openTags.children[0].textContent,'免費機會','open card must keep the positive category tag');
assert(!openTags.children[0].className.includes('tag-closed'),'open card must not be styled as closed');
const qCard=ctx.createCard(d.offers.find(o=>o.id==='amazon-q-developer-free-signup-conflict'));
const qTags=qCard.children.find(n=>n.className==='card-tags');
assert.strictEqual(qTags.children.length,1,'closed-to-new-subscriptions card must show one historical tag');
assert(qTags.children[0].textContent.includes('已停止新訂閱'),'closed-to-new-subscriptions card must name the status');
console.log('PASS: closed cards show a single historical tag instead of claimable category chips.');

// 「免費機會」標籤與同一張卡的「每月費用 US$29.99」並列時，讀者只能猜那個月費是什麼。
// 非已截止、categories 含 FREE 且 recurring_cost_usd > 0 的紀錄必須帶 cost_note，
// 並在卡片正面以「每月費用說明」呈現（validate.py 同步強制資料側）。以下為規格值斷言。
const paidFreeCards=d.offers.filter(o=>!deadStatuses.includes(o.status)&&(o.categories||[]).includes('FREE')&&(o.recurring_cost_usd||0)>0);
assert(paidFreeCards.length>=5,'expected records tagged FREE that carry a known monthly fee');
for(const o of paidFreeCards){
  assert(typeof o.cost_note==='string'&&o.cost_note.trim(),'FREE tag with a known monthly fee needs a cost_note: '+o.id);
  const card=ctx.createCard(o);
  const note=card.children.find(n=>n.className==='cost-basis'&&n.textContent.startsWith('每月費用說明'));
  assert(note,'card must explain the monthly fee next to the FREE tag: '+o.id);
  assert(note.textContent.includes(String(o.recurring_cost_usd)),'fee explanation must name the amount: '+o.id);
}
const lindyCard=ctx.createCard(d.offers.find(o=>o.id==='lindy-free-fifty-dollar-seven-day-trial'));
const lindyNote=lindyCard.children.find(n=>n.className==='cost-basis'&&n.textContent.startsWith('每月費用說明'));
assert(lindyNote.textContent.includes('US$29.99')&&lindyNote.textContent.includes('不是'),'Lindy must state the fee is not the free trial cost');
const zeroCostCard=ctx.createCard(d.offers.find(o=>o.id==='gemini-api-free'));
assert(!zeroCostCard.children.some(n=>n.className==='cost-basis'&&n.textContent.startsWith('每月費用說明')),'zero-fee cards must not show a monthly-fee explanation');
console.log('PASS: FREE-tagged records with a known monthly fee explain the fee on the card face.');

// 反向的費用誤導：欄位是 null 時卡片正面只寫得出「設定費 未列金額／每月費用 未列金額」，
// 真正說明「要綁卡、期滿自動扣款、折扣不是免費」的 cost_note 卻只出現在詳情。2026-11-11 統計
// 91 筆可行動紀錄屬此類（46 筆在免費專區，例：ovh-public-cloud-first-project 的「須綁付款方式」、
// google-students-tw-plus 的「期滿自動按月收取 NT$165」、nebius 的「requires a bank card」）。
// 資料驅動斷言：任一費用欄位為 null 且寫了 cost_note 的紀錄，卡片正面必須有「費用說明」且逐字等於該 note；
// 數字完整的紀錄不得冒出這一列（避免同一欄位在卡片上出現兩次說法）。
const feeUnknownWithNote=d.offers.filter(o=>(o.setup_cost_usd===null||o.recurring_cost_usd===null)&&typeof o.cost_note==='string'&&o.cost_note.trim());
assert(feeUnknownWithNote.length>=40,'expected actionable records with an unknown USD fee and a cost_note');
for(const o of feeUnknownWithNote){
  const card=ctx.createCard(o);
  const notes=card.children.filter(n=>n.className==='cost-basis'&&(n.textContent.startsWith('費用說明')||n.textContent.startsWith('每月費用說明')));
  const knownMonthly=(o.recurring_cost_usd||0)>0;
  assert.strictEqual(notes.length,1,'unknown-fee card must carry exactly one fee explanation: '+o.id);
  assert.strictEqual(notes[0].textContent,(knownMonthly?'每月費用說明：':'費用說明：')+o.cost_note,'cost caveat must be shown verbatim: '+o.id);
}
const ovhNote=ctx.createCard(d.offers.find(o=>o.id==='ovh-public-cloud-first-project-two-hundred-month')).children.find(n=>n.className==='cost-basis'&&n.textContent.startsWith('費用說明'));
assert(ovhNote&&ovhNote.textContent.includes('須綁付款方式'),'OVH must state the payment-method requirement on the card face');
const completeFee=d.offers.filter(o=>o.setup_cost_usd!==null&&o.recurring_cost_usd!==null);
assert(completeFee.length>0&&completeFee.every(o=>!ctx.createCard(o).children.some(n=>n.className==='cost-basis'&&n.textContent.startsWith('費用說明'))),'cards with both USD fees recorded must not show the unknown-fee caveat');
console.log('PASS: unknown USD fees surface the recorded cost caveat instead of hiding it in the details.');
// 費用欄位是美元數字，null 只代表「沒有記下美元金額」，不代表沒查。舊版一律印「未核實」，
// 於是 26 筆 setup_cost_usd 為 null 卻有 setup_cost_basis 的紀錄在同一張卡上自相矛盾：
// 「設定費 未核實」底下緊接「費用依據：活動頁列註冊US$10額度…」（mango-inference-community）。
// 規格值斷言：null →「未列金額」；數字照舊 US$；零費用仍是 US$0（零設定費不等於整體免費）。
const cardFacts=o=>ctx.createCard(o).children.find(n=>n.className==='card-facts').children.map(r=>[r.children[0].textContent,r.children[1].textContent]);
const basisOnly=d.offers.find(o=>o.id==='mango-inference-community');
assert(basisOnly.setup_cost_usd===null&&basisOnly.setup_cost_basis,'anchor record changed: need a null cost with a documented basis');
assert.deepStrictEqual(cardFacts(basisOnly).find(r=>r[0]==='設定費'),['設定費','未列金額'],'null USD cost must not read as an unverified cost');
assert(!cardFacts(basisOnly).some(r=>r[1]==='未核實'),'card must not claim a researched fee was never checked');
assert.deepStrictEqual(cardFacts(d.offers.find(o=>o.id==='lindy-free-fifty-dollar-seven-day-trial')).find(r=>r[0]==='每月費用'),['每月費用','US$29.99']);
assert.deepStrictEqual(cardFacts(d.offers.find(o=>o.id==='gemini-api-free')).find(r=>r[0]==='設定費'),['設定費','US$0']);
console.log('PASS: null cost fields render 「未列金額」 instead of claiming the fee was never verified.');
// 缺 status 的紀錄：藥丸與「優先度依據」必須說同一件事（prioritize 寫「狀態未記錄」）。
// 舊版 fallback 是「狀態待釐清」，同一張卡因此同時主張「待釐清」與「狀態未記錄」，
// 且「待釐清」暗示已排入追查，但缺 status 的紀錄未必有排程（2026-11-09 仍有 13 筆）。
assert.strictEqual(ctx.statusInfo({}).label, '狀態未記錄');
assert.strictEqual(ctx.statusInfo({status:null}).label, '狀態未記錄');
assert.strictEqual(ctx.statusInfo({}).tone, 'uncertain');
assert.strictEqual(ctx.statusInfo({status:'unknown_future_value'}).label, '狀態待釐清');
const statusless=d.offers.filter(o=>!o.status&&o.record_type==='opportunity');
for(const o of statusless) assert.strictEqual(ctx.statusInfo(o).label,'狀態未記錄',`statusless opportunity must not claim a pending review: ${o.id}`);
console.log(`PASS: missing status renders 「狀態未記錄」 (${statusless.length} opportunities), unknown string still 「狀態待釐清」.`);

// 關鍵字搜尋不得比對 JSON 鍵名或來源證據。舊版 `JSON.stringify(o).includes(q)` 讓鍵名本身可被搜尋：
// 「sources」「status」「evidence」「scope」「null」「https」在 2026-11-10 的 967 筆資料上各命中 967 筆，
// 搜尋框等於失效；只寫在來源 evidence 的詞也被當成命中（日本限定的 lawson-restricted-japan 因證據文字
// 出現「免費」而進入「免費」搜尋）。以下為規格值斷言，不是現況快照。
assert(!f({id:'a',title:'範例',summary:'內容',status:'active',sources:[{url:'https://e',scope:'s',evidence:'台灣'}]},{q:'台灣'}),'source evidence must not be searchable');
assert(!f({id:'a',title:'範例',summary:'內容',status:'active',sources:[]},{q:'status'}),'JSON key names must not be searchable');
assert(!f({id:'a',title:'範例',summary:'內容',sources:[]},{q:'sources'}),'JSON key names must not be searchable');
assert(!f({id:'a',title:'範例',summary:'內容',verified_at:'2026-11-10T02:00:00+08:00',sources:[]},{q:'2026-11-10'}),'schedule timestamps must not be searchable');
assert(f({id:'a',title:'台灣方案',summary:'',sources:[]},{q:'台灣'}),'card title must be searchable');
assert(f({id:'a',title:'方案',summary:'學生免費',sources:[]},{q:'學生'}),'card summary must be searchable');
assert(f({id:'a',title:'方案',summary:'',eligibility:{taiwan_note:'條件式'},sources:[]},{q:'條件式'}),'eligibility text must be searchable');
// 部分命中是正常的：卡片文字本來就可能寫「scope」「status」或一條網址。要擋的是「鍵名本身」造成的
// 全庫命中——舊版這六個詞各回 967/967。規格值：任一鍵名詞命中率必須低於 2%。
for(const term of ['sources','evidence','scope','status','null','https']){
  const hits=d.offers.filter(o=>f(o,{q:term})).length;
  assert(hits<d.offers.length*0.02,`key-name term "${term}" still matches ${hits}/${d.offers.length} records`);
}
const lawson=d.offers.find(o=>o.id==='lawson-restricted-japan');
assert(lawson,'expected lawson record');
assert(!f(lawson,{q:'免費'}),'a record whose card claims nothing about 免費 must not match 免費 only because its evidence quotes it');
const freeHits=d.offers.filter(o=>f(o,{q:'免費'})).length;
// 反向對照：證據裡寫「免費」但卡片不主張免費的紀錄必須存在，否則上面那條 lawson 斷言只是空過。
const freeEvidenceOnly=d.offers.filter(o=>!f(o,{q:'免費'})&&JSON.stringify(o.sources).includes('免費')).length;
assert(freeEvidenceOnly>=10,'expected records whose evidence mentions 免費 while their card does not, got '+freeEvidenceOnly);
// 命中數必須落在「紀錄本身（去掉 sources）提到該詞」與「含 sources 的全紀錄」之間：前者是上限，
// 後者證明關鍵字不再把來源證據算進來（差額就是只靠 evidence 才命中的紀錄）。
const withoutSources=o=>{const {sources,...rest}=o;return JSON.stringify(rest);};
const freeWithoutSources=d.offers.filter(o=>withoutSources(o).includes('免費')).length;
const freeWithSources=d.offers.filter(o=>JSON.stringify(o).includes('免費')).length;
assert(freeHits<=freeWithoutSources,`search hits (${freeHits}) must not exceed records whose own fields mention the term (${freeWithoutSources})`);
assert(freeHits<freeWithSources,`search must exclude source evidence: ${freeHits} hits vs ${freeWithSources} records that mention it anywhere`);
console.log('PASS: keyword search reads claim fields only — no JSON key names, no source evidence, no timestamps ('+freeHits+' 免費 hits).');

// 「本次核實範圍」是一個主張，不是一個欄位名稱。2026-11-10 統計 99 筆已標「官方」的紀錄沒有
// verification_scope，卡片卻一律印「本次核實範圍：僅限各來源列明主張…」——讀者看到的是「這輪核過、
// 只是範圍有限」，實際上這筆根本沒記錄核過什麼，於是「只核了其中一項」與「整筆都核過」長得一樣。
// 規格值：缺值時標籤必須明說未記錄，有值時必須逐字顯示。
const scopeRow = record => ctx.createDetails(record).children
  .find(node => node.tagName === 'dl').children
  .find(row => ['本次核實範圍', '核實範圍未記錄'].includes(row.children[0].textContent));
const noScope = d.offers.find(o => o.verification === 'Official' && !(o.verification_scope || '').trim());
assert(noScope, 'expected an official record without verification_scope to exercise the fallback');
const fallback = scopeRow(noScope);
assert.strictEqual(fallback.children[0].textContent, '核實範圍未記錄', 'a record without verification_scope must not label the row 本次核實範圍');
assert(fallback.children[1].textContent.includes('未記錄核實範圍'), 'the fallback must say the scope was not recorded');
const withScope = d.offers.find(o => (o.verification_scope || '').trim());
const shown = scopeRow(withScope);
assert.strictEqual(shown.children[0].textContent, '本次核實範圍');
assert.strictEqual(shown.children[1].textContent, withScope.verification_scope.trim(), 'the recorded scope must be shown verbatim');
console.log('PASS: 核實範圍 row states whether the scope was recorded instead of printing a generic claim.');

// 「核實時間」不是「公告時間」。卡片的核實日是我們最後一次讀官方頁的時間，公告日才是方案公布的
// 時間；先前只印前者，於是 2024-04-24 公布、今天重讀仍寫同樣內容的紀錄（salad-ssap 等）看起來
// 跟本月新方案一樣新。2026-11-11 統計：125 筆有 announcement_at，其中 76 筆的公告日比最後核實日
// 早 30 天以上。規格值：有欄位就必須出現「官方公告日期」並照原文顯示，沒有就不得出現該列。
const announcementRow = record => ctx.createDetails(record).children
  .find(node => node.tagName === 'dl').children
  .find(row => row.children[0].textContent === '官方公告日期');
const announced = d.offers.filter(o => o.announcement_at);
assert(announced.length >= 50, `expected records that record an announcement date, got ${announced.length}`);
const staleAnnouncement = announced.find(o => o.id === 'salad-ssap-migration-credit-watch');
assert(staleAnnouncement && staleAnnouncement.announcement_at.startsWith('2024-'), 'expected a record whose announcement predates its verification by more than a year');
for (const offer of d.offers) {
  const row = announcementRow(offer);
  if (offer.announcement_at) assert(row, `missing 官方公告日期 row for ${offer.id}`);
  else assert(!row, `unexpected 官方公告日期 row for ${offer.id}`);
}
assert.strictEqual(announcementRow(staleAnnouncement).children[1].textContent, staleAnnouncement.announcement_at, 'the announcement date must be shown verbatim, not reformatted');
assert(!announcementRow(d.offers.find(o => !o.announcement_at)), 'a record without announcement_at must not claim an announcement date');
console.log(`PASS: 官方公告日期 is shown for the ${announced.length} records that record it and never invented for the rest.`);
