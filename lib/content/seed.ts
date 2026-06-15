export type ContentType = 'article' | 'scam_file' | 'topic';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface RegionSeed {
  code: string;
  labelZh: string;
  labelEn: string;
  country: 'CA' | 'US' | 'NA';
  activeUserCount: number;
  defaultSelected?: boolean;
}

export interface ContentSeed {
  slug: string;
  type: ContentType;
  title: string;
  summary: string;
  body: string[];
  regionCodes: string[];
  category: string;
  riskLevel: RiskLevel;
  isEmergency: boolean;
  publishedAt: string;
  tags: string[];
  isPremiumPreview?: boolean;
}

export interface ContentFilter {
  regionCode?: string;
  category?: string;
  query?: string;
  type?: ContentType;
}

export const regions: RegionSeed[] = [
  { code: 'ca-bc', labelZh: 'BC 不列颠哥伦比亚', labelEn: 'British Columbia', country: 'CA', activeUserCount: 8400, defaultSelected: true },
  { code: 'ca-on', labelZh: 'ON 安大略', labelEn: 'Ontario', country: 'CA', activeUserCount: 14200 },
  { code: 'us-ca', labelZh: 'CA 加州', labelEn: 'California', country: 'US', activeUserCount: 17600 },
  { code: 'us-ny', labelZh: 'NY 纽约', labelEn: 'New York', country: 'US', activeUserCount: 7200 },
  { code: 'north-america', labelZh: '全北美', labelEn: 'North America', country: 'NA', activeUserCount: 61000 },
];

export const categories = ['租房', '报税', '求职', '买车', '留学', '老人防骗'];

export const contentItems: ContentSeed[] = [
  {
    slug: 'rental-deposit-before-transfer',
    type: 'scam_file',
    title: '租房押金转账前,先查这 5 件事',
    summary: '低价房源、催促汇款、拒绝看房、收款人不一致,是本周 BC 和安省高频风险。',
    body: [
      '如果对方要求你先转押金再看房,先暂停。真实房东或正规中介通常可以提供可核验的身份、租约草稿和看房安排。',
      '重点核对收款人姓名、房源地址、租约主体和平台记录。任何“今晚不转就没了”的压力话术,都应当被视为高风险。',
      '保留聊天记录、房源链接和付款要求截图。已经付款的用户应尽快联系银行、平台和当地非紧急报警渠道。'
    ],
    regionCodes: ['ca-bc', 'ca-on', 'north-america'],
    category: '租房',
    riskLevel: 'high',
    isEmergency: true,
    publishedAt: '2026-06-15',
    tags: ['租房', '押金', 'e-transfer', 'wire transfer', '房源核验']
  },
  {
    slug: 'irs-cra-phone-scam-checklist',
    type: 'article',
    title: 'CRA / IRS 冒充电话:5 秒识别高危信号',
    summary: '官方不会要求 gift card、加密货币、陌生链接或即时转账。先挂断,从官网入口核验。',
    body: [
      'CRA 和 IRS 不会通过电话要求你立刻购买礼品卡、提供验证码或点击陌生链接缴费。',
      '如果对方说“今天不付款就逮捕/冻结身份”,这是典型恐吓式脚本。先挂断,不要按对方提供的号码回拨。',
      '从政府官网或官方 App 进入账户查看通知。涉及欠税、退税或罚款时,优先使用公开渠道二次确认。'
    ],
    regionCodes: ['north-america'],
    category: '报税',
    riskLevel: 'high',
    isEmergency: true,
    publishedAt: '2026-06-14',
    tags: ['CRA', 'IRS', 'gift card', '税务', '电话诈骗']
  },
  {
    slug: 'remote-job-fake-check-warning',
    type: 'article',
    title: '远程工作假支票骗局:收到 offer 后先别买设备',
    summary: '假 HR 发 offer 后寄假支票,要求你向指定供应商买电脑和软件,新人求职尤其容易中招。',
    body: [
      '正规雇主不会让新员工先用个人账户垫付大额设备费,也不会要求你把支票差额退回给第三方。',
      '假支票可能几天后才被银行退回,这时你已经把真金白银转给了骗子。看到“指定供应商”“快速入职”“先买设备后报销”要谨慎。',
      '核验公司域名、招聘平台记录、LinkedIn 员工信息和正式合同。不要只相信邮件签名和面试聊天记录。'
    ],
    regionCodes: ['ca-bc', 'us-ca', 'us-ny', 'north-america'],
    category: '求职',
    riskLevel: 'medium',
    isEmergency: false,
    publishedAt: '2026-06-12',
    tags: ['remote job', 'fake check', 'offer', '求职']
  },
  {
    slug: 'used-car-title-and-payment',
    type: 'scam_file',
    title: '二手车 title 和付款路径怎么查',
    summary: '低价急售、只收现金、title 不清、VIN 不给查,都是买车前要停下来的信号。',
    body: [
      '看车前先索要 VIN,核对 title 状态、事故记录和卖家身份。不要因为“今天还有别人看车”就跳过核验。',
      '付款时尽量选择可留痕的方式,避免把钱转给与 title 不一致的人。跨州/跨省交易尤其要核对注册规则。',
      '如果卖家拒绝提供基本文件,或要求你用无法追回的方式付款,应直接放弃。'
    ],
    regionCodes: ['us-ca', 'us-ny', 'ca-bc', 'north-america'],
    category: '买车',
    riskLevel: 'medium',
    isEmergency: false,
    publishedAt: '2026-06-10',
    tags: ['二手车', 'title', 'VIN', '付款']
  },
  {
    slug: 'school-consultant-guarantee-admission',
    type: 'topic',
    title: '升学机构承诺保录,合同里要看什么',
    summary: '保录、内部名额、限时优惠常伴随高压销售。付款前先看退款条款和服务边界。',
    body: [
      '任何“保证录取”都应回到合同文本:服务包含什么,不包含什么,失败后如何退款,谁承担材料真实性责任。',
      '保留销售承诺截图,要求机构把关键承诺写进合同。仅在聊天里承诺,后续很难举证。',
      '这是一篇付费预览内容。MVP 首版展示摘要和检查清单入口,完整清单在会员功能上线后开放。'
    ],
    regionCodes: ['us-ca', 'ca-on', 'ca-bc', 'north-america'],
    category: '升学',
    riskLevel: 'medium',
    isEmergency: false,
    publishedAt: '2026-06-09',
    tags: ['升学', '保录', '合同', '退款'],
    isPremiumPreview: true
  },
  {
    slug: 'senior-health-product-family-check',
    type: 'article',
    title: '给父母买保健品前,先做家庭核验',
    summary: '免费讲座、限时折扣、夸大疗效和现场刷卡,是长辈群体常见消费坑。',
    body: [
      '涉及慢性病、药物替代和高额套装时,先让家人或家庭医生一起看说明。不要在讲座现场直接刷卡。',
      '夸大疗效、回避退货政策、不给正规收据,都应当暂停。保健品不能替代正规诊疗。',
      '给长辈设置大字号和简化模式,把常见风险卡片保存到手机桌面,比事后追钱更有效。'
    ],
    regionCodes: ['ca-bc', 'ca-on', 'us-ca', 'north-america'],
    category: '老人防骗',
    riskLevel: 'medium',
    isEmergency: false,
    publishedAt: '2026-06-08',
    tags: ['老人防骗', '保健品', '家庭', '退款']
  }
];

export function getDefaultRegion() {
  return regions.find((region) => region.defaultSelected) ?? regions[0];
}

export function getContentBySlug(slug: string) {
  return contentItems.find((item) => item.slug === slug);
}

export function filterContent(filters: ContentFilter = {}) {
  const normalizedQuery = normalize(filters.query);

  return contentItems
    .filter((item) => {
      if (filters.type && item.type !== filters.type) return false;
      if (filters.category && item.category !== filters.category) return false;
      if (filters.regionCode && !item.regionCodes.includes(filters.regionCode) && !item.regionCodes.includes('north-america')) {
        return false;
      }
      if (!normalizedQuery) return true;
      const haystack = normalize([item.title, item.summary, item.category, ...item.tags].join(' '));
      return haystack.includes(normalizedQuery);
    })
    .sort((a, b) => {
      if (a.isEmergency !== b.isEmergency) return a.isEmergency ? -1 : 1;
      if (riskRank(a.riskLevel) !== riskRank(b.riskLevel)) return riskRank(b.riskLevel) - riskRank(a.riskLevel);
      return b.publishedAt.localeCompare(a.publishedAt);
    });
}

export function getRelatedContent(item: ContentSeed, limit = 3) {
  return filterContent({ regionCode: item.regionCodes[0], category: item.category })
    .filter((candidate) => candidate.slug !== item.slug)
    .slice(0, limit);
}

function normalize(value = '') {
  return value.trim().toLowerCase();
}

function riskRank(level: RiskLevel) {
  if (level === 'high') return 3;
  if (level === 'medium') return 2;
  return 1;
}
