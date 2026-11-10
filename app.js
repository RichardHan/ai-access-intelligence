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
  'closed_to_new_subscriptions', 'sunset_announced', 'resolved_rumor_disproven',
  'duplicate_merged'
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
  taiwan_availability_unverified: '台灣可用度待核',
  unverified_taiwan_eligibility: '台灣資格待核',
  application_based_unverified: '申請資格待核',
  application_based_unverified_terms: '申請條款待核',
  account_specific_unverified: '個別帳戶資格待核',
  grant_terms_unverified: '資助條款待核',
  resolved_rumor_disproven: '線索已釐清・未獲支持',
  amount_and_eligibility_unverified: '額度與資格待核',
  current_approval_unverified: '審核現況待核',
  grant_delivery_unverified: '資助發放待核',
  legacy_closed_new_path_conditional: '舊途徑關閉・新途徑需條件',
  quota_and_taiwan_eligibility_unverified: '額度與台灣資格待核',
  taiwan_not_listed_supported_region: '台灣未列於支援地區',
  duplicate_merged: '重複紀錄・已併入其他 ID',
  watchlist: '觀察線索待追蹤'
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

const UNLIMITED_QUOTA = new Set(['OFFICIALLY UNLIMITED', 'TEMPORARILY UNLIMITED']);
// 「機會專區」是可採取行動的入口：已截止、已關閉與重複合併的紀錄退出每個專區選項，
// 但仍可在全部紀錄搜尋到。2026-11-09 統計：先前只排除免費／無限／高額度／Beta 四個選項，
// 「新創與開發者」因此仍列出 39 筆已截止或已併入他筆的紀錄（含 copilot-free 等重複紀錄），
// 「美國與地區限定」列出 15 筆（該專區共 57 筆）。專區清單必須與 index.html 的 view 選項同步。
const ACTIONABLE_VIEWS = new Set(['free', 'quota', 'unlimited', 'regional', 'value', 'developer', 'beta']);
// 「台灣條件適用」是頁面上第一個捷徑按鈕，但它走的是 taiwan:'Yes' 這個一般篩選，不經 viewMatches，
// 因此上表的排除規則涵蓋不到它：2026-11-09 統計 106 筆 taiwan=Yes 中仍有 10 筆已截止／已關閉／重複合併
// （例如 moda-service-robot-virtual-scene-subsidy-2026、taiwan-ai-rap-pilot、taiwan-adi-ai-compute-115），
// 卡片標題自己寫著「已截止」。可行動捷徑一律排除，全庫搜尋仍找得到。
const OPEN_ONLY_PRESETS = new Set(['taiwan']);

function presetMatches(o, preset, filters) {
  if (!matches(o, filters ?? presetFilters(preset))) return false;
  return !(OPEN_ONLY_PRESETS.has(preset) && CLOSED_STATUSES.has(o.status));
}

// The 用量 filter and the 無限專區 read the schema-enforced quota_classification.
// usage_type is free-text descriptions (358 distinct values, many in Chinese), so exact
// matching against a few English option strings silently dropped most records.
function viewMatches(o, view) {
  if (view === 'unlimited') return UNLIMITED_QUOTA.has(o.quota_classification);
  // 免費專區是可採取行動的入口，必須由 schema 管制的費用欄位判定，不能只靠人工 views 標記：
  // 設定費與每月費用皆為 0 者一律列入；每月費用未知（null）者只在明確標記 free 時列入；
  // 已知每月費用 > 0 的試用不得列入（曾把 US$29.99/月 的七日試用列為免費方案）。
  if (view === 'free') {
    if ((o.recurring_cost_usd || 0) > 0) return false;
    if (o.setup_cost_usd === 0 && o.recurring_cost_usd === 0) return true;
    return (o.views || []).includes('free');
  }
  // 「高免費額度」與「Beta 存取」同樣有大範圍的人工 views 落差：2026-11-09 統計 view=quota 只標了
  // 63 筆，而 schema 的 HIGH-QUOTA 類別有 127 筆（其中 69 筆沒標）；view=beta 只標 15 筆，
  // BETA-ACCESS 有 50 筆（35 筆沒標）。兩者與下拉標籤一一對應，改讀 categories，不再看 views。
  // 「美國與地區限定」問的是「哪些方案依官方規則不含台灣」，同樣不能用人工 views 回答：2026-11-10
  // 統計 view=regional 的 57 筆裡有 27 筆 taiwan=Yes（台北青年 AI 補助、新竹市補助、緯創算力捐贈、
  // Google 學生方案、台智雲 TWAI…），選這個專區的讀者拿到的是與「台灣條件適用」重疊的清單，卡片
  // 排序又把 S 級（台灣可用）排在最前面；反向也漏掉 10 筆真正受限、沒被人工標記的方案（日本限定
  // beta、中國限定 voucher、歐洲／亞洲額度、美號碼專用方案）。改讀 schema 的 REGION-LOCKED 類別，
  // 並排除台灣已符合資格者——台灣已可用的方案由「台灣條件適用」與其他專區涵蓋，不重複列在這裡。
  // value 仍維持人工標記：VALUE-DEAL 與 LOW-COST／免費高值不是一對一，語意未定前不改。
  if (view === 'quota') return (o.categories || []).includes('HIGH-QUOTA');
  if (view === 'beta') return (o.categories || []).includes('BETA-ACCESS');
  if (view === 'regional') return (o.categories || []).includes('REGION-LOCKED') && o.taiwan !== 'Yes';
  return (o.views || []).includes(view);
}

// regions is free text with 26 distinct spellings (TW, Taiwan, Taipei, Taiwan, GLOBAL,
// Worldwide, United States…). Exact matching against the four select options silently
// dropped 71 records from every region choice, including 6 Taiwan=Yes records stored as
// "TW". Bucket each value instead so a region choice returns every record that claims it.
const REGION_BUCKETS = {
  global: ['global', 'global / country eligibility unverified', 'worldwide', 'worldwide / individual eligibility unverified'],
  us: ['us', 'united states', 'united states of america'],
  taiwan: ['tw', 'taiwan', 'taipei, taiwan'],
  other: ['other']
};
function regionMatches(o, region) {
  const wanted = String(region).toLowerCase();
  const bucket = REGION_BUCKETS[wanted];
  const values = (o.regions || []).map(value => String(value).trim().toLowerCase());
  if (bucket) {
    // 選「服務地區＝Taiwan」的讀者問的是「我在台灣能不能用」，而 taiwan 才是 schema 管制的
    // 資格判斷欄位。2026-11-09 統計 108 筆 taiwan=Yes 有 33 筆不進 Taiwan 選項：其中 20 筆
    // regions 留空、13 筆只寫 Global／Worldwide（含 AWS Free Tier、Azure 免費帳戶、Amazon Polly、
    // Google AI 開發者額度）。與資料自身「台灣可用」的主張矛盾，故 Taiwan 桶也接受 taiwan=Yes。
    if (wanted === 'taiwan' && o.taiwan === 'Yes') return true;
    if (values.some(value => bucket.includes(value))) return true;
    // 'Other' also covers a named region that is not global/US/Taiwan (Japan, EU, India…),
    // which a reader choosing the fourth option expects; unknown/empty stays out of every bucket.
    if (wanted === 'other') {
      const known = new Set(Object.entries(REGION_BUCKETS).filter(([key]) => key !== 'other').flatMap(([, list]) => list));
      return values.some(value => value && value !== 'unknown' && !known.has(value));
    }
    return false;
  }
  return values.includes(wanted);
}

// 關鍵字搜尋只比對「紀錄自己主張的內容」，不比對 JSON 鍵名、來源 scope／evidence、排程與內部欄位。
// 舊版是 JSON.stringify(offer).includes(q)，於是鍵名本身變成可搜尋字串：2026-11-10 的 967 筆資料中，
// 「sources」「status」「evidence」「scope」「null」「https」各命中 967 筆（等於整個資料庫），輸入框等於失效。
// 只出現在來源證據裡的詞也被算成命中：日本限定的 lawson-restricted-japan 因為證據文字寫到「免費」，
// 會出現在「免費」搜尋結果，但卡片上沒有任何免費主張。下列欄位是卡片與詳情真正顯示的內容。
const SEARCH_FIELDS = [
  'id', 'title', 'summary', 'categories', 'regions', 'eligibility', 'unknowns',
  'setup_cost_basis', 'cost_note', 'recurring_cost_original', 'quota_details', 'quota',
  'quota_classification_note', 'usable_duration', 'cancellation', 'access_risk',
  'plan_variants', 'regional_variants', 'offer_validity', 'terms_compliance', 'tos_status',
  'legal_and_terms_note', 'deadline_at', 'expires_at', 'expiry', 'duplicate_of'
];

function searchText(offer) {
  const parts = [];
  for (const field of SEARCH_FIELDS) {
    const value = offer[field];
    if (value === null || value === undefined || value === '') continue;
    if (Array.isArray(value)) {
      parts.push(value.map(item => (item && typeof item === 'object' ? Object.values(item).join(' ') : item)).join(' '));
    } else if (typeof value === 'object') {
      parts.push(Object.values(value).join(' '));
    } else {
      parts.push(String(value));
    }
  }
  return parts.join(' ').toLowerCase();
}

function matches(o, f = {}) {
  return (!f.q || searchText(o).includes(String(f.q).trim().toLowerCase()))
    && (!f.type || o.record_type === f.type)
    && (!f.cost || typeof o.setup_cost_usd === 'number' && o.setup_cost_usd <= Number(f.cost))
    // 邊界含等於：選「15 分鐘」必須包含正好需 15 分鐘的紀錄（109 筆），否則最省力的方案會被濾掉。
    && (!f.effort || typeof o.effort_minutes_max === 'number' && o.effort_minutes_max <= Number(f.effort))
    && (!f.taiwan || o.taiwan === f.taiwan)
    && (!f.region || regionMatches(o, f.region))
    && (!f.usage || o.quota_classification === f.usage)
    && (!f.verification || o.verification === f.verification)
    && (!f.view || viewMatches(o, f.view))
    // 免費、無限、高額度與 Beta 專區都是可行動的入口：已截止紀錄退出，但仍可在全部紀錄搜尋。
    && !(ACTIONABLE_VIEWS.has(f.view) && CLOSED_STATUSES.has(o.status))
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
  else if (status === 'conditional' || status === 'application_based' || status === 'legacy_closed_new_path_conditional') tone = 'conditional';
  // 沒有 status 的舊紀錄：藥丸寫「狀態待釐清」，同一張卡的「優先度依據」卻寫「狀態未記錄」
  // （tools/prioritize.py 的 note_of()），同一份資料兩種說法；「待釐清」還暗示已排入追查，
  // 但這些紀錄不一定有排程。缺值一律寫「狀態未記錄」，未知的字串值才留「狀態待釐清」。
  if (!status) return { label: '狀態未記錄', tone: 'uncertain' };
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

// 查閱時間是自由文字（ISO、ISO 區間、甚至「2026-10-25（Asia/Taipei）」這種帶註記的寫法）。
// 舊版用 `split('/')` 取最後一段，遇到註記就會拿到「Taipei）」這種垃圾字串，排序時被當成
// 最舊的一筆：2026-11-10 統計 10 組同網址來源因此把最新證據藏在「較早的 N 筆同網址紀錄」裡
// （adobe-firefly-assistant-free-beta-regions 的 11/10 04:24 被 10/25 的註記版蓋住、
// bubble-agent2、kakao-plus-young-adult、supership、v0-free-policy、together-prepaid-policy、
// mistral-free-api-policy、freshservice 同型）。`tests/validate.py` 上一輪已用同樣的規則
// （抽出字串裡最後一個 YYYY-MM-DD）修掉批次檢查，前端卻還留著舊寫法。
// 只取最後一個日期或時間戳當排序鍵，原文仍照原樣顯示給讀者。
const SOURCE_STAMP = /\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2})?)?/g;
// 有些舊來源沒有 accessed_at／accessed_time_range，查閱時間只寫在證據文字開頭
// （例：「2026-11-01 05:06–05:07 Asia/Taipei實讀：…」）。這種來源原本排序鍵是空字串，
// 於是永遠排在「最舊」，把同網址較新的那筆壓進「較早的 N 筆」。
// 2026-11-10 統計 8 組同網址來源（5 筆紀錄：code-for-everyone、taiwan-ai-rap、kimi、gitlab、murf）
// 中文證據寫的日期比畫面上顯示的主來源還新。只採用「開頭就是日期＋30 字內出現實讀動詞」的
// 明確寫法，避免把「2026-10-23日本時間上線」這類公告日期誤當查閱時間。
const SOURCE_READ_STAMP = /^\s*(\d{4}-\d{2}-\d{2})(?:[ ,，]*(?:[0-9]{1,2}[:：][0-9]{2}(?:[:：][0-9]{2})?)?)?[^\n]{0,30}?(?:實讀|重讀|查閱|讀取|複核|瀏覽|檢視)/;
function sourceReadStamp(source) {
  const match = String(source.evidence || '').match(SOURCE_READ_STAMP);
  return match ? match[1] : '';
}
function sourceStamp(source) {
  const raw = String(source.accessed_at || source.accessed_time_range || '');
  const found = raw.match(SOURCE_STAMP);
  if (found) return found[found.length - 1];
  return sourceReadStamp(source);
}

function groupSources(sources) {
  const groups = new Map();
  for (const source of sources || []) {
    const key = source.url || '';
    const group = groups.get(key);
    if (group) group.entries.push(source);
    else groups.set(key, { entries: [source] });
  }
  return [...groups.values()].map(group => {
    const entries = group.entries
      .map((source, index) => ({ source, index, stamp: sourceStamp(source) }))
      .sort((a, b) => (a.stamp === b.stamp ? a.index - b.index : (a.stamp < b.stamp ? 1 : -1)));
    return { source: entries[0].source, earlier: entries.slice(1).map(entry => entry.source) };
  });
}

// 精確截止時間只存在於 expires_at／deadline_at／expiry 三個欄位（2026-11-09 統計 17 筆），
// 「有效期間」則是自由文字（例：「促銷免費至 2026-11-19（FAQ 已明列年份；頁面未公布精確時區）」），
// 卡片先前只渲染後者，於是 Amazon ARA 的台北 11/12 15:59、DataCamp 的今日 12:59 這類
// 讀者真正要趕的時間點只藏在段落文字裡。逐欄位列出，並標明是台北時間或來源未列時刻。
function deadlineInfo(offer) {
  const stamp = value => {
    const raw = String(value);
    return /T\d{2}:\d{2}/.test(raw) ? `${dateLabel(raw, true)}（台北時間）` : `${raw}（來源未列時刻）`;
  };
  const parts = [];
  if (offer.deadline_at) parts.push(`申請截止 ${stamp(offer.deadline_at)}`);
  if (offer.expires_at) parts.push(`方案或免費期結束 ${stamp(offer.expires_at)}`);
  const expiry = offer.expiry;
  if (typeof expiry === 'string' && expiry.trim()) parts.push(`期限 ${expiry}`);
  else if (expiry && typeof expiry === 'object') {
    if (expiry.date) parts.push(`期限 ${stamp(expiry.date)}`);
    if (expiry.text) parts.push(display(expiry.text));
    if (expiry.timezone) parts.push(`時區 ${expiry.timezone}`);
  }
  return parts.length ? parts.join('；') : null;
}

// 機器可讀的截止點只有 deadline_at／expires_at／expiry.date。2026-11-10 統計：906 筆可行動紀錄中
// 只有 22 筆帶有未來的截止點，但它們在預設的 S→D 優先度排序裡散落各頁（Amazon ARA 台北 11/12 15:59
// 排在第 609 張，第一頁的 24 張只涵蓋其中 4 筆），而日期又只出現在收合的詳情區。也就是說「期限查清楚」
// 的主張在最需要它的地方看不到。改為：卡片正面顯示近期截止點，並提供「截止日由近到遠」排序。
// 只列日期者視為當日仍可行動（同日 23:59 台北時間），與 tools/queue.py 的 parse_stamp 一致。
const CLOSE_FIELDS = [['deadline_at', '申請截止'], ['expires_at', '方案結束']];
// 卡片正面只放 60 天內會發生的截止點：更遠的日期（例：expiry.date 只有年月，換算成 2028-06-01）
// 卻顯示「剩 569 天」既不緊急也不是讀者當下的決策依據，完整日期仍留在詳情的「截止與期限」列。
const CLOSE_BADGE_DAYS = 60;
const TAIPEI_DAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' });
function nowMs() {
  return Date.now();
}
function closeInstant(value) {
  const raw = String(value ?? '').trim();
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return Date.parse(`${raw}T23:59:59+08:00`);
  const at = Date.parse(raw);
  return Number.isNaN(at) ? null : at;
}
// 以台北日曆日相減，避免「今天 23:59 截止」被算成剩 1 天、或跨時區算成昨天。
function daysUntil(at, now) {
  return Math.round((Date.parse(TAIPEI_DAY.format(new Date(at))) - Date.parse(TAIPEI_DAY.format(new Date(now)))) / 86400000);
}
function closePoints(offer) {
  const points = [];
  for (const [field, label] of CLOSE_FIELDS) {
    const at = closeInstant(offer[field]);
    if (at !== null) points.push({ label, at, value: offer[field] });
  }
  const expiry = offer.expiry;
  if (expiry && typeof expiry === 'object' && expiry.date) {
    const at = closeInstant(expiry.date);
    if (at !== null) points.push({ label: '期限', at, value: expiry.date });
  }
  return points.sort((a, b) => a.at - b.at);
}
// 已截止／已終止／重複合併的紀錄不再主張「剩 N 天」：它們的日期是歷史，卡片正面已由歷史標籤說明。
function soonestClose(offer, now = nowMs()) {
  if (CLOSED_STATUSES.has(offer.status)) return null;
  return closePoints(offer).find(point => point.at > now) ?? null;
}
function closeBadge(offer, now = nowMs()) {
  const point = soonestClose(offer, now);
  if (!point) return null;
  const days = daysUntil(point.at, now);
  if (days > CLOSE_BADGE_DAYS) return null;
  const raw = String(point.value);
  const text = /T\d{2}:\d{2}/.test(raw) ? dateLabel(raw, true) : raw;
  return { label: point.label, text, days };
}
// 沒有截止日者不得被排到有截止日者前面；兩者都沒有時沿用優先度排序，維持原本的可讀順序。
function compareDeadline(a, b, now = nowMs()) {
  const left = soonestClose(a, now);
  const right = soonestClose(b, now);
  if (!left && !right) return byPriority(a, b);
  if (!left) return 1;
  if (!right) return -1;
  return left.at - right.at || byPriority(a, b);
}
function byDeadline(a, b) {
  return compareDeadline(a, b, nowMs());
}

function createDetails(offer) {
  const details = text('details', '', 'card-details');
  details.append(text('summary', '查看資格、限制與來源'));
  const grid = text('dl', '', 'detail-grid');
  addRow(grid, '完整研究摘要', offer.summary);
  addRow(grid, '本次核實範圍', offer.verification_scope || '僅限各來源列明主張；其他欄位可能沿用較早研究。');
  addRow(grid, '優惠現況', statusInfo(offer).label);
  if (offer.duplicate_of) {
    addRow(grid, '重複收錄處理', `與 ${offer.duplicate_of} 為同一方案，已併入該筆並保留本ID供追溯；額度與資格以合併後紀錄為準。`);
  }
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
  const deadline = deadlineInfo(offer);
  if (deadline) addRow(grid, '截止與期限', deadline);
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
  const cadence = {
    daily: '每日', monthly: '每月輪替', weekly: '每週', biweekly: '雙週輪替',
    on_new_signal: '有新線索時', monthly_or_new_signal: '每月或有新線索時', event: '特定活動事件追蹤'
  }[offer.review_cadence] || (offer.review_cadence ? display(offer.review_cadence) : (offer.next_review_at ? '定期輪替' : '未指定週期'));
  const nextText = offer.next_review_at
    ? `${cadence}；${dateLabel(offer.next_review_at, true)}`
    : (CLOSED_STATUSES.has(offer.status) ? '已停止定期複核；有新線索時追蹤' : `${cadence}；未安排特定複核日期`);
  addRow(grid, '下次複核', nextText);
  if (offer.last_review_attempt_at) addRow(grid, '最近來源追查', `${dateLabel(offer.last_review_attempt_at, true)}${offer.last_review_attempt_reason ? `；${offer.last_review_attempt_reason}` : ''}`);
  details.append(grid, text('h4', '來源與支持的主張', 'detail-heading'));
  const sources = text('ol', '', 'source-list');
  const grouped = groupSources(offer.sources);
  for (const entry of grouped) {
    const source = entry.source;
    const item = text('li', '', 'source-item');
    item.append(sourceLink(source) || text('span', source.label || '來源網址待確認'));
    item.append(text('p', `支持範圍：${display(source.scope)}`));
    item.append(text('p', display(source.evidence)));
    const accessed = source.accessed_at || source.accessed_time_range;
    const recovered = accessed ? '' : sourceReadStamp(source);
    item.append(text('small', `查閱時間：${accessed || (recovered ? `${recovered}（來源未另列，取自證據文字）` : '未另列，請參照證據文字')}`, 'source-date'));
    if (entry.earlier.length) {
      const earlier = text('details', '', 'source-earlier');
      earlier.append(text('summary', `較早的 ${entry.earlier.length} 筆同網址紀錄`));
      for (const older of entry.earlier) {
        earlier.append(text('p', `支持範圍：${display(older.scope)}｜${display(older.evidence)}`, 'source-earlier-text'));
        const olderAccessed = older.accessed_at || older.accessed_time_range;
        const olderRecovered = olderAccessed ? '' : sourceReadStamp(older);
        earlier.append(text('small', `查閱時間：${olderAccessed || (olderRecovered ? `${olderRecovered}（取自證據文字）` : '未另列')}`, 'source-date'));
      }
      item.append(earlier);
    }
    sources.append(item);
  }
  if (!sources.childElementCount) sources.append(text('li', '尚未列出可查閱來源。'));
  details.append(sources);
  return details;
}

// 最新一次追查失敗不等於已核實：`last_review_attempt_at` 晚於 `verified_at` 表示這筆最後一次
// 打開官方頁是「查不到」，卡片卻只印出較舊的核實日期，讀者點進來源才發現 404。
// 2026-11-10 統計 8 筆屬此類（deepinfra、e2e、qoder、astamuse、claude-artifacts、articul8、coze、stitch），
// 其中 qoder／astamuse 的來源全部失效。失敗原因仍留在詳情的「最近來源追查」列，卡片正面只標記狀態。
function latestAttemptFailed(offer) {
  const attemptRaw = offer.last_review_attempt_at;
  if (!attemptRaw) return null;
  const attempt = Date.parse(attemptRaw);
  if (Number.isNaN(attempt)) return null;
  const verified = offer.verified_at ? Date.parse(offer.verified_at) : NaN;
  if (!Number.isNaN(verified) && verified >= attempt) return null;
  return { at: attemptRaw, reason: offer.last_review_attempt_reason || '' };
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
  // 已截止、已關閉與重複合併的卡片不得再以「免費機會」「高額度」這類可領取標籤開場：
  // 2026-11-09 Amazon Q Developer 於 2026-05-15 停止新註冊後，卡片仍以「免費機會」標籤排在標題下，
  // 讀者要讀完整段摘要才會發現不能申請（當時全庫 76 筆已截止／已關閉／重複合併紀錄中，47 筆帶「免費機會」「高額度」「Beta 存取」等可領取標籤）。
  // 資料欄位不改：categories 仍是歷史事實，只在卡片上改成單一歷史標籤並列原分類。
  if (CLOSED_STATUSES.has(offer.status)) {
    const original = (offer.categories || []).map(category => CATEGORY_LABELS[category] || category).join('、');
    tags.append(text('span', `${status.label}${original ? `・原分類：${original}` : ''}`, 'tag tag-closed'));
  } else {
    for (const category of offer.categories || []) tags.append(text('span', CATEGORY_LABELS[category] || category, 'tag'));
  }
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
  // 卡片標籤與費用欄位會互相矛盾：8 筆 categories 含 FREE 的紀錄帶著已知月費（US$5–399），
  // 卡片同時顯示「免費機會」與「每月費用 US$29.99」，而其中 5 筆連一句說明都沒有，
  // 讀者只能自己猜那個月費是期滿續用價、替代付費方案，還是免費期就要付。這類紀錄一律
  // 在卡片正面列出 cost_note（`tests/validate.py` 對非已截止者強制要求），完整說明仍留在詳情。
  if ((offer.recurring_cost_usd || 0) > 0 && offer.cost_note) {
    card.append(text('p', `每月費用說明：${display(offer.cost_note)}`, 'cost-basis'));
  }
  const foot = text('div', '', 'card-foot');
  const closing = closeBadge(offer);
  if (closing) {
    const soon = closing.days <= 7;
    foot.append(text('span', `${closing.label} ${closing.text}${closing.days === 0 ? ' · 今天' : ` · 剩 ${closing.days} 天`}`, `deadline-pill${soon ? ' deadline-soon' : ''}`));
  }
  foot.append(text('span', status.label, `status-pill status-${status.tone}`));
  foot.append(text('span', `核實 ${dateLabel(offer.verified_at)}`, 'verified-date'));
  const failedAttempt = latestAttemptFailed(offer);
  if (failedAttempt) {
    const marker = text('span', `追查未成功 ${dateLabel(failedAttempt.at)}`, 'attempt-pill');
    if (failedAttempt.reason) marker.title = failedAttempt.reason;
    foot.append(marker);
  }
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
  const items = dataset.offers.filter(offer => (!recentOnly || recentIds.has(offer.id))
    && presetMatches(offer, activePreset, filters));
  if (filters.sort === 'priority') items.sort(byPriority);
  if (filters.sort === 'fresh') items.sort((a, b) => String(b.verified_at || '').localeCompare(String(a.verified_at || '')));
  if (filters.sort === 'deadline') items.sort(byDeadline);
  if (filters.sort === 'cost') items.sort((a, b) => {
    const costA = a.setup_cost_usd ?? Infinity;
    const costB = b.setup_cost_usd ?? Infinity;
    return costA === costB ? 0 : costA - costB;
  });
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

// 免費方案的判定規則全在 viewMatches('free')：設定費與每月費用皆為 0 一律列入、每月費用
// 未知者只在明確標記 free 時列入。preset 不能再疊加 cost:'0'——那等於額外要求「設定費必須
// 已知為 0」，把 108 筆真正免費但設定費未填的紀錄（Cloudflare Workers Free、BeatAPI 零餘額
// 免費模型、Orkes Playground…）擋在入口外，也和 README 寫的規則不一致。
function presetFilters(preset) {
  return {
    all: {}, taiwan: { taiwan: 'Yes' }, free: { view: 'free' },
    developer: { view: 'developer' }, recent: { sort: 'fresh' }
  }[preset] || {};
}

function applyPreset(preset) {
  clearTimeout(searchTimer);
  const form = $('#filters');
  applyingPreset = true;
  form?.reset();
  applyingPreset = false;
  activePreset = preset;
  recentOnly = preset === 'recent';
  const values = presetFilters(preset);
  for (const [name, value] of Object.entries(values)) {
    const control = form?.elements.namedItem(name);
    if (control) control.value = value;
  }
  render();
}

// 概況卡與快捷按鈕使用同一個名詞就必須是同一個數字。2026-11-09 統計：快捷鍵「台灣條件適用」回
// 96 筆（taiwan=Yes 且未截止，含 5 筆政策與 6 筆觀察線索），但概況卡同名標籤只算 priority_tier=S
// 的 85 筆，讀者在同一頁看到兩個「台灣條件適用」卻差 11 筆。改由 presetMatches('taiwan') 計算，
// 並在說明列拆出 S 級機會數，讓數字對得起來，也不把政策／觀察線索算成可領取的機會。
function overviewMetrics(offers) {
  const taiwanCount = offers.filter(offer => presetMatches(offer, 'taiwan')).length;
  const sTierCount = offers.filter(offer => offer.priority_tier === 'S').length;
  return [
    [offers.filter(o => o.record_type === 'opportunity').length, '福利研究', '免費、試用與折扣機會'],
    [taiwanCount, '台灣條件適用', `含 S 級機會 ${sTierCount} 筆，其餘為政策與觀察線索`],
    [offers.filter(o => o.record_type === 'policy').length, '政策追蹤', '條款、方案與存取變動'],
    [offers.filter(o => o.record_type === 'watchlist').length, '觀察線索', '等待更多可靠證據']
  ];
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
  const metrics = overviewMetrics(offers);
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
