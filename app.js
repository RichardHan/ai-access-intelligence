'use strict';

const $=s=>document.querySelector(s);
const PAGE_SIZE = 24;
let dataset = { offers: [] };
let visibleLimit = PAGE_SIZE;
let activePreset = 'all';
let recentOnly = false;
let applyingPreset = false;
let eventsBound = false;
let searchTimer;

const CATEGORY_LABELS = {
  FREE: '免費機會', 'LOW-COST': '低成本', 'VALUE-DEAL': '優惠組合',
  'EASY-EFFORT': '容易開始', QUALIFICATION: '資格審核',
  'REGION-LOCKED': '地區限定', 'HIGH-QUOTA': '高額度',
  'UNLIMITED-CLAIM': '不限量宣稱', 'BETA-ACCESS': 'Beta 存取'
};
const RECORD_LABELS = { opportunity: '福利研究', policy: '政策追蹤', watchlist: '觀察線索' };
const EVIDENCE_LABELS = {
  Official: '官方來源支持', 'Community reported': '社群回報', Unverified: '尚待核實'
};
const QUOTA_LABELS = {
  'OFFICIALLY UNLIMITED': '官方宣稱不限量（仍須看適用範圍）',
  'NO FIXED CAP PUBLISHED': '未公布固定上限',
  'HIGH BUT LIMITED': '有明確限制',
  'TEMPORARILY UNLIMITED': '暫時不限量', UNKNOWN: '用量尚未核實'
};
const ELIGIBILITY_LABELS = {
  service_availability: '服務與地區', account_eligibility: '帳戶與申請資格',
  billing_country: '帳單與付款', identity_residency: '身分與居住條件',
  terms_restrictions: '服務條款限制', taiwan_note: '台灣資格說明'
};
const CLOSED_STATUSES = new Set([
  'expired', 'expired_unverified', 'closed', 'applications_closed',
  'closed_to_new_subscriptions', 'sunset_announced'
]);
const STATUS_LABELS = {
  active: '方案仍列示', active_verified: '已核實列明主張', conditional: '需符合條件',
  expired: '優惠已到期', expired_unverified: '疑似過期・待確認',
  closed: '已關閉', applications_closed: '新申請已截止',
  closed_to_new_subscriptions: '已停止新訂閱', sunset_announced: '已公告終止',
  paused: '暫停開放', restricted: '存取受限', application_based: '申請審核制',
  limited_availability: '有限度開放', terms_conflict: '官方條款有差異',
  conflicting_official_usage_claims: '官方說法有差異',
  unverified: '尚待核實', needs_verification: '需要再次核實',
  unverified_numeric_claims: '額度數字待核', unverified_redemption: '領取條件待核',
  campaign_current_availability_unverified: '活動現況待核',
  resolved_rumor_disproven: '線索已釐清・未獲支持'
};

function text(tag, value, className) {
  const node = document.createElement(tag);
  node.textContent = value == null ? '' : String(value);
  if (className) node.className = className;
  return node;
}

function display(value) {
  if (value === null || value === undefined || value === '') return '未核實';
  if (Array.isArray(value)) return value.map(display).join('；');
  if (typeof value === 'object') {
    return Object.entries(value).map(([key, item]) => `${key}：${display(item)}`).join('；');
  }
  return String(value);
}

function money(value) {
  return typeof value === 'number' && Number.isFinite(value)
    ? `US$${value.toLocaleString('zh-TW', { maximumFractionDigits: 3 })}` : '未核實';
}

function dateLabel(value, includeTime = false) {
  if (!value) return '未核實';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit',
    ...(includeTime ? { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' } : {})
  }).format(date);
}

function matches(o, f = {}) {
  return (!f.q || JSON.stringify(o).toLowerCase().includes(String(f.q).trim().toLowerCase()))
    && (!f.type || o.record_type === f.type)
    && (!f.cost || typeof o.setup_cost_usd === 'number' && o.setup_cost_usd <= Number(f.cost))
    && (!f.effort || typeof o.effort_minutes_max === 'number' && o.effort_minutes_max < Number(f.effort))
    && (!f.taiwan || o.taiwan === f.taiwan)
    && (!f.region || (o.regions || []).includes(f.region))
    && (!f.usage || o.usage_type === f.usage)
    && (!f.verification || o.verification === f.verification)
    && (!f.view || (o.views || []).includes(f.view))
    && (!f.tier || o.priority_tier === f.tier);
}

function tierRank(tier) {
  return { S: 0, A: 1, B: 2, C: 3, D: 4 }[tier] ?? 9;
}

function byPriority(a, b) {
  return tierRank(a.priority_tier) - tierRank(b.priority_tier)
    || ((b.priority_score ?? -1) - (a.priority_score ?? -1));
}

function statusInfo(offer) {
  const status = offer.status;
  let tone = 'uncertain';
  if (CLOSED_STATUSES.has(status)) tone = 'closed';
  else if (status === 'active' || status === 'active_verified') tone = 'active';
  else if (status === 'conditional' || status === 'application_based') tone = 'conditional';
  return { label: STATUS_LABELS[status] || '狀態待釐清', tone };
}

function addRow(grid, label, value) {
  const row = text('div', '', 'detail-row');
  row.append(text('dt', label), text('dd', display(value)));
  grid.append(row);
}

function sourceLink(source) {
  try {
    const url = new URL(source.url);
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    const link = text('a', source.label || url.hostname);
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  } catch (_) {
    return null;
  }
}

function createDetails(offer) {
  const details = text('details', '', 'card-details');
  details.append(text('summary', '查看資格、限制與來源'));
  const grid = text('dl', '', 'detail-grid');
  addRow(grid, '完整研究摘要', offer.summary);
  addRow(grid, '本次核實範圍', offer.verification_scope || '僅限各來源列明主張；其他欄位可能沿用較早研究。');
  addRow(grid, '優惠現況', statusInfo(offer).label);
  if (offer.offer_validity) addRow(grid, '優惠有效性', offer.offer_validity);
  if (offer.terms_compliance || offer.tos_status) addRow(grid, '申請與條款判斷', offer.terms_compliance || offer.tos_status);
  for (const [key, value] of Object.entries(offer.eligibility || {})) {
    addRow(grid, ELIGIBILITY_LABELS[key] || key, value);
  }
  addRow(grid, '設定費／每月費用', `${money(offer.setup_cost_usd)}／${money(offer.recurring_cost_usd)}`);
  if (offer.setup_cost_basis) addRow(grid, '設定費計算依據', offer.setup_cost_basis);
  if (offer.cost_note) addRow(grid, '費用補充', offer.cost_note);
  if (offer.recurring_cost_original) addRow(grid, '原幣續費', offer.recurring_cost_original);
  if (offer.recurring_cost_annual_usd != null) addRow(grid, '年繳費用', money(offer.recurring_cost_annual_usd));
  addRow(grid, '用量分類', QUOTA_LABELS[offer.quota_classification] || '未核實');
  if (offer.quota_classification_note) addRow(grid, '用量說明', offer.quota_classification_note);
  if (offer.quota_details || offer.quota) addRow(grid, '額度細節', offer.quota_details || offer.quota);
  addRow(grid, '有效期間', offer.usable_duration);
  addRow(grid, '取消與續費', offer.cancellation);
  addRow(grid, '存取風險', offer.access_risk);
  if (offer.plan_variants) {
    addRow(grid, '不同方案', offer.plan_variants.map(variant =>
      `${display(variant.plan)}：設定 ${money(variant.setup_usd)}，每月 ${money(variant.monthly_usd)}；${display(variant.usage)}`));
  }
  if (offer.regional_variants) addRow(grid, '地區方案差異', offer.regional_variants);
  if (offer.vpn_research?.eligibility_note) addRow(grid, '地區與網路限制', offer.vpn_research.eligibility_note);
  addRow(grid, '優先度依據', offer.priority_note);
  addRow(grid, '可用效益／成本比', `${money(offer.usable_benefit_usd)}／${offer.benefit_cost_ratio == null ? '不適用或證據不足' : offer.benefit_cost_ratio}`);
  addRow(grid, '法律／監管核實', offer.legal_status === 'restriction_found'
    ? '已找到官方限制來源，請核對下列證據與適用範圍。'
    : offer.legal_status === 'no_restriction_found'
      ? '已查官方來源未發現明確限制，限所查範圍；不等於法律意見。'
      : '未核實；服務條款資格不等於法律意見。');
  if (offer.legal_and_terms_note) addRow(grid, '法律與條款補充', offer.legal_and_terms_note);
  addRow(grid, '證據缺口', offer.unknowns?.length ? offer.unknowns : '未另列缺口，不代表全面驗證。');
  addRow(grid, '核實時間', offer.verified_at ? `${dateLabel(offer.verified_at, true)} Asia/Taipei` : '未核實');
  const cadence = { daily: '每日', monthly: '每月輪替', weekly: '每週', on_new_signal: '有新線索時' }[offer.review_cadence] || display(offer.review_cadence);
  addRow(grid, '下次複核', `${cadence}；${dateLabel(offer.next_review_at, true)}`);
  if (offer.last_review_attempt_at) addRow(grid, '最近來源追查', dateLabel(offer.last_review_attempt_at, true));
  details.append(grid, text('h4', '來源與支持的主張', 'detail-heading'));
  const sources = text('ol', '', 'source-list');
  for (const source of offer.sources || []) {
    const item = text('li', '', 'source-item');
    item.append(sourceLink(source) || text('span', source.label || '來源網址待確認'));
    item.append(text('p', `支持範圍：${display(source.scope)}`));
    item.append(text('p', display(source.evidence)));
    const accessed = source.accessed_at || source.accessed_time_range;
    item.append(text('small', `查閱時間：${accessed || '未另列，請參照證據文字'}`, 'source-date'));
    sources.append(item);
  }
  if (!sources.childElementCount) sources.append(text('li', '尚未列出可查閱來源。'));
  details.append(sources);
  return details;
}

function createCard(offer) {
  const status = statusInfo(offer);
  const card = text('article', '', `card card--${status.tone}`);
  const top = text('div', '', 'card-top');
  const name = String(offer.title || '未命名紀錄').split(/[:：]/)[0].trim();
  const latin = name.match(/^[A-Za-z]+/);
  const mark = text('span', latin ? latin[0].slice(0, 2).toUpperCase() : [...name].slice(0, 1).join(''), 'provider-mark');
  mark.setAttribute('aria-hidden', 'true');
  const meta = text('div', '', 'card-meta');
  meta.append(text('span', RECORD_LABELS[offer.record_type] || '研究紀錄', 'record-label'));
  meta.append(text('span', EVIDENCE_LABELS[offer.verification] || '尚待核實', 'evidence-label'));
  top.append(mark, meta);
  const tier = offer.priority_tier;
  const tierLabel = tier === 'S' ? 'S · 台灣條件適用' : tier ? `${tier} 級` : '未分級';
  const badge = text('span', tierLabel, `tier-badge tier-${tier || 'none'}`);
  badge.title = tier === 'S' ? '地區條件符合紀錄所列範圍，仍須核對個人資格。' : display(offer.priority_note);
  top.append(badge);
  card.append(top, text('h3', offer.title || '未命名紀錄', 'card-title'), text('p', offer.summary || '研究摘要待補充。', 'card-summary'));
  const tags = text('div', '', 'card-tags');
  for (const category of offer.categories || []) tags.append(text('span', CATEGORY_LABELS[category] || category, 'tag'));
  card.append(tags);
  const facts = text('dl', '', 'card-facts');
  const taiwan = { Yes: '條件式適用', No: '不符合所列資格', Unknown: '資格待核實' }[offer.taiwan] || '資格待核實';
  const values = [
    ['台灣資格', taiwan], ['設定費', money(offer.setup_cost_usd)],
    ['每月費用', money(offer.recurring_cost_usd)],
    ['準備時間', typeof offer.effort_minutes_max === 'number' ? `約 ≤${offer.effort_minutes_max} 分鐘` : '尚未估計']
  ];
  for (const [label, value] of values) {
    const fact = text('div', '', 'fact');
    fact.append(text('dt', label), text('dd', value));
    facts.append(fact);
  }
  card.append(facts);
  if (offer.setup_cost_basis) card.append(text('p', `費用依據：${display(offer.setup_cost_basis)}`, 'cost-basis'));
  const foot = text('div', '', 'card-foot');
  foot.append(text('span', status.label, `status-pill status-${status.tone}`));
  foot.append(text('span', `核實 ${dateLabel(offer.verified_at)}`, 'verified-date'));
  card.append(foot, createDetails(offer));
  return card;
}

function latestResearchIds() {
  const run = dataset.last_research_run || {};
  return new Set([...(run.reviewed_ids || []), ...(run.new_ids || [])]);
}

function updatePresetButtons() {
  document.querySelectorAll('[data-preset]').forEach(button => {
    const selected = button.dataset.preset === activePreset;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function render(reset = true) {
  if (reset) visibleLimit = PAGE_SIZE;
  const form = $('#filters');
  const filters = form ? Object.fromEntries(new FormData(form)) : {};
  const recentIds = latestResearchIds();
  const items = dataset.offers.filter(offer => matches(offer, filters) && (!recentOnly || recentIds.has(offer.id)));
  if (filters.sort === 'priority') items.sort(byPriority);
  if (filters.sort === 'fresh') items.sort((a, b) => String(b.verified_at || '').localeCompare(String(a.verified_at || '')));
  if (filters.sort === 'cost') items.sort((a, b) => (a.setup_cost_usd ?? Infinity) - (b.setup_cost_usd ?? Infinity));
  const visible = items.slice(0, visibleLimit);
  const count = $('#count');
  if (count) count.textContent = `${recentOnly ? '本輪更新 · ' : ''}符合 ${items.length} 筆，已顯示 ${visible.length} 筆 · 全庫 ${dataset.offers.length} 筆`;
  const cards = $('#cards');
  if (cards) {
    cards.replaceChildren(...visible.map(createCard));
    if (!items.length) {
      const empty = text('div', '', 'empty-state');
      empty.append(text('h3', '目前沒有符合的紀錄'), text('p', '調整關鍵字或清除篩選，再探索其他機會。'));
      const resetButton = text('button', '清除所有篩選', 'button-reset');
      resetButton.type = 'button';
      resetButton.addEventListener('click', () => applyPreset('all'));
      empty.append(resetButton);
      cards.append(empty);
    }
  }
  const more = $('#load-more');
  if (more) {
    more.hidden = visible.length >= items.length;
    more.textContent = `再顯示 ${Math.min(PAGE_SIZE, items.length - visible.length)} 筆`;
  }
  updatePresetButtons();
}

function applyPreset(preset) {
  clearTimeout(searchTimer);
  const form = $('#filters');
  clearTimeout(searchTimer);
  applyingPreset = true;
  form?.reset();
  applyingPreset = false;
  activePreset = preset;
  recentOnly = preset === 'recent';
  const values = {
    all: {}, taiwan: { taiwan: 'Yes' }, free: { cost: '0', view: 'free' },
    developer: { view: 'developer' }, recent: { sort: 'fresh' }
  }[preset] || {};
  for (const [name, value] of Object.entries(values)) {
    const control = form?.elements.namedItem(name);
    if (control) control.value = value;
  }
  render();
}

function renderOverview() {
  const offers = dataset.offers;
  const run = dataset.last_research_run || {};
  const freshness = $('#freshness');
  if (freshness) freshness.textContent = `資料更新 ${dateLabel(dataset.updated_at, true)} · Asia/Taipei`;
  if ($('#research-scope')) $('#research-scope').textContent = dataset.scope || '資料更新不代表全庫複核；請查看各筆核實範圍。';
  const stats = [
    [(run.reviewed_ids || []).length, '本輪局部複核'],
    [(run.new_ids || []).length, '新增機會與線索'],
    [run.unreviewed_existing_count ?? '—', '既有紀錄尚未複核']
  ];
  if ($('#review-summary')) $('#review-summary').replaceChildren(...stats.map(([value, label]) => {
    const stat = text('div', '', 'review-stat');
    stat.append(text('strong', value), text('span', label));
    return stat;
  }));
  const metrics = [
    [offers.filter(o => o.record_type === 'opportunity').length, '福利研究', '免費、試用與折扣機會'],
    [offers.filter(o => o.priority_tier === 'S').length, '台灣條件適用', 'S 級，仍須符合個人資格'],
    [offers.filter(o => o.record_type === 'policy').length, '政策追蹤', '條款、方案與存取變動'],
    [offers.filter(o => o.record_type === 'watchlist').length, '觀察線索', '等待更多可靠證據']
  ];
  if ($('#metrics')) $('#metrics').replaceChildren(...metrics.map(([value, label, note]) => {
    const metric = text('div', '', 'metric');
    metric.append(text('strong', value), text('span', label), text('small', note));
    return metric;
  }));
}

function bindEvents() {
  if (eventsBound) return;
  eventsBound = true;
  const form = $('#filters');
  const onFilterChange = () => {
    clearTimeout(searchTimer);
    if (!recentOnly) activePreset = null;
    render();
  };
  form?.addEventListener('change', event => {
    if (event.target.name !== 'q') onFilterChange();
  });
  form?.addEventListener('input', event => {
    if (event.target.name !== 'q') return;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(onFilterChange, 160);
  });
  form?.addEventListener('reset', () => {
    if (applyingPreset) return;
    clearTimeout(searchTimer);
    activePreset = 'all';
    recentOnly = false;
    setTimeout(() => render(), 0);
  });
  document.querySelectorAll('[data-preset]').forEach(button => {
    button.addEventListener('click', () => applyPreset(button.dataset.preset));
  });
  let more = $('#load-more');
  if (!more && $('#cards')) {
    more = text('button', '顯示更多', 'load-more');
    more.id = 'load-more';
    more.type = 'button';
    $('#cards').after(more);
  }
  more?.addEventListener('click', () => {
    visibleLimit += PAGE_SIZE;
    render(false);
  });
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches) {
    const shell = $('.filter-shell');
    if (shell) shell.open = false;
  }
}

async function init() {
  const cards = $('#cards');
  cards?.setAttribute('aria-busy', 'true');
  if ($('#count')) $('#count').textContent = '正在讀取研究資料…';
  try {
    const response = await fetch(`data/offers.json?v=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const loaded = await response.json();
    if (!Array.isArray(loaded.offers)) throw new Error('Invalid research dataset');
    dataset = loaded;
    renderOverview();
    bindEvents();
    render();
  } catch (_) {
    if ($('#count')) $('#count').textContent = '資料暫時無法讀取';
    if (cards) {
      const error = text('div', '', 'empty-state error-state');
      error.append(text('h3', '研究資料尚未載入'), text('p', '請稍後重試，或透過頁尾的「完整資料」連結查閱。'));
      const retry = text('button', '重新載入', 'button-reset');
      retry.type = 'button';
      retry.addEventListener('click', init);
      error.append(retry);
      cards.replaceChildren(error);
    }
    if ($('#load-more')) $('#load-more').hidden = true;
  } finally {
    cards?.setAttribute('aria-busy', 'false');
  }
}

if (typeof document !== 'undefined') init();
