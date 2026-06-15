# Avoid The Pit · 技术交付 spec v1.0

> 北美华人防坑防骗社区平台
> 文档版本:2026.06 · 设计冻结
> 适用对象:前端 / 后端 / 产品 / 内容运营 / 法务

---

## 0. 这份文档说什么

这是把 16 个完整页面 mockup 和所有产品决策**冻结成可执行规范**的文档。它不解释"为什么这样设计"(那是产品讨论),只回答"具体长什么样、用什么数据、按什么规则跑、什么时候做"。

每个 section 都是一个独立模块,任何角色可以只读自己那一块开工。开发顺序见第 12 节。

代号:`atp`(avoidthepit),数据库前缀、CSS 命名空间、内部代码均统一使用。

---

## 1. 产品一句话定义

> 一个按"省/州"地理切片的、本地化中文防骗 + 民生政策媒体兼社区,面向北美华人,通过订阅 + 单篇付费 + 创作者分成变现。

核心差异化:**地理精度** + **法律合规的 UGC** + **创作者职业化体系**。

---

## 2. 品牌系统

### 2.1 颜色 token

所有颜色全局以 CSS 变量定义,前缀 `--atp-`。

| Token | Hex | 用途 |
|---|---|---|
| `--atp-bg-page` | `#F5F1EA` | 页面背景(温暖米色) |
| `--atp-bg-card` | `#FFFEFB` | 卡片/容器背景 |
| `--atp-bg-soft` | `#FAF6EE` | 次级背景(输入框、tab 非激活) |
| `--atp-bg-divider` | `#FAF6EE` | 段与段之间的浅色分隔条 |
| `--atp-text-primary` | `#1A1A1A` | 主文本 |
| `--atp-text-secondary` | `#4A4A4A` | 次级文本 |
| `--atp-text-tertiary` | `#8C8C8C` | 提示、meta |
| `--atp-text-disabled` | `#C0C0C0` | 禁用、跨境弱化 |
| `--atp-accent` | `#FF2C55` | 主 CTA、当前 tab、未读红点 |
| `--atp-accent-dark` | `#C81E3F` | 高风险/警报、错误 |
| `--atp-accent-bg` | `#FFF1F4` | 警报背景、当前 tab 背景 |
| `--atp-trust` | `#1A2E4A` | 海军蓝 · 信任/数据/权威 |
| `--atp-trust-light` | `#3A5278` | 海军蓝渐变 |
| `--atp-premium` | `#C9A356` | 金色 · 付费、信任分、收益 |
| `--atp-premium-bg` | `#FBF5E8` | 金色背景 |
| `--atp-premium-border` | `#E6CB89` | 金色边框 |
| `--atp-success` | `#18A058` | 已验证、正向 |
| `--atp-success-bg` | `#E8F4EC` | 已验证背景 |
| `--atp-warning` | `#F0993E` | 待处理、定时、温和提醒 |
| `--atp-warning-bg` | `#FFF4E5` | 警告背景 |
| `--atp-border-1` | `rgba(0,0,0,0.06)` | 默认弱边框 |
| `--atp-border-2` | `rgba(0,0,0,0.12)` | 卡片边框 |
| `--atp-border-3` | `rgba(0,0,0,0.20)` | 输入框边框 |

颜色编码原则:**红 = 你的本地 + 紧急**,**金 = 钱 + 信任**,**蓝 = 数据 + 权威**,**灰 = 远方**。开发不可在组件里硬编码 hex。

### 2.2 字体

| Token | Value |
|---|---|
| 中文 | "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif |
| 英文 | "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif |
| 数字 | "Inter Variable", "Inter", monospace tabular |
| 标题专用(可选) | "Noto Serif SC", "Source Han Serif" |

字号阶梯(rem, 1rem = 16px):

| 用途 | 移动 | 桌面 |
|---|---|---|
| 大标题(文章 H1) | 1.25rem (20px) | 1.5rem (24px) |
| 段头(section title) | 0.94rem (15px) | 1.13rem (18px) |
| 正文 | 0.81rem (13px) | 0.94rem (15px) |
| Meta / 副 | 0.69rem (11px) | 0.75rem (12px) |
| 标签 / pill | 0.63rem (10px) | 0.69rem (11px) |

字重:仅用 400(常规) + 500(强调)。**不允许 600 / 700**,在米色背景上过重。

### 2.3 圆角 & 间距

| Token | Value |
|---|---|
| `--atp-radius-sm` | 4px(标签、内嵌徽章) |
| `--atp-radius-md` | 6px(按钮、输入框) |
| `--atp-radius-lg` | 8px(卡片) |
| `--atp-radius-xl` | 10px(大卡片、 modal) |
| `--atp-radius-pill` | 14px(tab、chip) |
| `--atp-radius-phone` | 22px(预留,iOS 风格容器) |

间距使用 4 倍数:`4 / 8 / 12 / 16 / 20 / 24 / 32 / 48`。卡片内边距固定 `padding: 12px 14px`(移动),`16px 20px`(桌面)。

### 2.4 图标

统一使用 **Tabler Icons Outline**(已知 5800+ 字符)。**禁止 emoji 作为功能图标**,emoji 仅在用户产生内容(评论、UGC)里允许。

常用映射:

| 含义 | Tabler 名 |
|---|---|
| 地理位置 | `ti-map-pin` / `ti-map-pin-filled`(已选) |
| 警报 | `ti-alert-triangle-filled` |
| 防护 | `ti-shield-half-filled` |
| 收益 | `ti-coin` |
| 信任分 | `ti-rosette-discount-check` |
| 已验证 | `ti-circle-check-filled` |
| 数据 | `ti-chart-line` |

### 2.5 阴影、渐变

**禁止**:drop-shadow、neon、blur 背景。整站走 flat 风。允许:0.5px solid 边框、单色填充、两色直线性 gradient(仅限封面图、品牌色块、签名色背景)。

---

## 3. 组件库

每个组件命名 `ATP{Name}`,React 中以独立文件 + Storybook story 维护。下表按使用频率排序,*星标*为产品独有、市面没有现成组件可复用的。

### 3.1 基础

| 组件 | 状态 | 关键 props |
|---|---|---|
| `ATPButton` | default / hover / active / disabled / loading | `variant`(primary/secondary/ghost), `size`(sm/md/lg), `icon` |
| `ATPInput` | default / focus / error / disabled | `type`, `prefix-icon`, `suffix`, `counter` |
| `ATPChip` | default / selected / dismissable | `count`(显示数字角标), `dot`(显示红点) |
| `ATPCard` | default / hover / pressed | `padding`, `border`, `radius` |
| `ATPAvatar` | image / initials / icon | `size`(20/28/44/60), `badge` |
| `ATPBadge` | dot / count / text | `severity`(info/success/warning/danger/premium) |
| `ATPSheet` / `ATPModal` | open / closed | 全屏 / 半屏 / 底部抬升 |

### 3.2 业务专有(★)

#### ATPEmergencyBanner ★

粉色应急横条,出现在搜索结果顶部、文章正文顶部。

```ts
interface Props {
  trigger: 'wire_transfer' | 'irs_call' | 'court_summons' | 'lawyer_email' | ...;
  steps: string[];          // 3 条以内
  cta: { label: string, action: () => void };
}
```

触发逻辑见 §8.5。

#### ATPScamFileCard ★

红边骗局档案卡。带 5 秒判断板。

```ts
interface Props {
  scamId: string;              // 形如 SC-024
  title: string;
  scope: GeoScope;             // 见 §6.3
  metrics: {
    cases_this_year: number;
    amount_involved_usd?: number;
    recovery_rate?: number;
  };
  five_second_test: string;   // ≤ 60 字
  saved: boolean;
}
```

#### ATPRegionScopeBadge ★

文章/视频顶部的地理范围 banner。

```ts
type Scope = 'city' | 'metro' | 'province' | 'country' | 'continent';

interface Props {
  scope: Scope;
  primary_label: string;      // "BC · 大温" / "全加拿大" 等
  user_match: 'exact' | 'partial' | 'distant';  // 决定颜色:粉红/金/灰
  distance_km?: number;        // 仅 city/metro 显示
}
```

#### ATPLocationMapModule ★

文章中嵌入的"你的地区受影响吗"模块。底图用 SVG 简化版(MVP),后期可换 Mapbox。

```ts
interface Props {
  user_location?: { lat: number, lng: number };  // 可选,无则用 IP 城市中心
  incident_points: { lat: number, lng: number, severity: 1|2|3 }[];
  risk_radius_km: number;
  enable_alert_cta: boolean;
}
```

#### ATPTrustScoreCard ★

创作者中心左下角的"信任分"模块,带 V1→V2→V3 进度条。

```ts
interface Props {
  score: number;             // 0-100
  tier: 'V1' | 'V2' | 'V3';
  next_tier_at: number;       // 下一档分数线
  perks_unlocked_at_next: string[];
}
```

#### ATPVerifiedUGCBadge ★

绿色"✓ 已审核"标记。**强制**显示在所有 UGC 内容旁边。

```ts
interface Props {
  status: 'pending' | 'approved' | 'rejected' | 'edited';
  reviewer_id?: string;        // 内部可见
  reviewed_at?: ISODate;
  edited_summary?: string;
}
```

#### ATPCommentContextCard ★

消息中心的评论通知,带"上下文卡片"。

```ts
interface Props {
  comment: Comment;
  source_content: { id, title, type };
  reply_to_excerpt?: string;   // 你被回复的那条原评论
  community_signal: { likes: number, is_high_quality: boolean };
  actions: ('reply' | 'pin_to_thread' | 'thank' | 'report')[];
}
```

#### ATPPaywallCard ★

付费墙。两种形态:**软**(显示前 30% 内容)、**硬**(标题 + 摘要 + 解锁价)。

```ts
interface Props {
  variant: 'soft' | 'hard';
  price_usd: number;
  membership_price_usd: number;   // 用月费整套订阅省多少
  unlock_method: 'single' | 'membership' | 'tier_required';
  preview_content?: ReactNode;     // soft 模式下显示
}
```

#### ATPRegionPicker ★

完整的省级选择器(简化版,见 §7.4)。

#### ATPCascadeFeed ★

按地区级联渲染的列表组件。算法 §7。

```ts
interface Props {
  user_regions: RegionConfig;     // 主省 + 关注省
  identity_tags?: IdentityTag[];   // 见 §6.2
  topic_interests: TopicTag[];
  scroll_position?: number;
}
```

### 3.3 不同状态规范

每个交互组件**必须**提供:default / hover / focus / pressed / disabled / loading / error / empty 八态,在 Storybook 全部展开。

无状态的组件(如 Badge)只需提供其 variant 矩阵。

---

## 4. 布局 & 响应式

### 4.1 断点

| 断点 | 宽度 | 用途 |
|---|---|---|
| `xs` | < 480px | 移动小屏 |
| `sm` | 480 - 767 | 移动大屏 |
| `md` | 768 - 1023 | 平板、桌面浏览器窄窗 |
| `lg` | 1024 - 1439 | 标准桌面 |
| `xl` | ≥ 1440 | 大屏桌面 |

移动版以 `xs` 设计为基准(375px 视窗),`sm` 自动放大字号 1px。桌面以 `lg` 设计(1280px 视窗),`xl` 居中 1280 主体 + 留白。

### 4.2 移动布局

底部 tab 5 项:**首页 / 发现 / [+ 发布] / 消息 / 我的**。所有页面共享此 tab。`+ 发布`是中间凸起按钮,点击展开 4 种发布类型。

### 4.3 桌面布局

经典三栏:**左侧导航(152px) | 主体(自适应) | 右侧助手(178px)**。

左侧:logo + 主导航 + 信任分卡(创作者中心)或登录/订阅按钮(消费者视图)。
右侧仅在创作者中心、消息中心、文章详情中出现;首页/发现/搜索/订阅不显示右栏。

---

## 5. 信息架构 & URL

### 5.1 站点地图

```
/                                  首页(级联推荐)
/feed?tab={recommended|latest|hot|local|following}
/explore                           发现页(主题/地区入口)
/search?q={query}&type={...}       搜索结果
/scams/{slug}                      骗局档案
/articles/{slug}                   付费/免费文章
/videos/{slug}                     视频(也可走 articles 模板)
/topics/{slug}                     主题汇总页(SEO 专题)
/regions/{province_code}           省级专题页
/u/{username}                      创作者公开主页
/u/{username}/articles
/u/{username}/scams

# 用户已登录区
/messages                          消息中心
/me                                我的
/me/settings
/me/settings/regions               地区设置
/me/settings/notifications
/me/library                        收藏/订阅历史
/me/billing

# 创作者中心 — 桌面优先
/creator                           跳转 /creator/analytics
/creator/analytics
/creator/content
/creator/content/new?type={...}
/creator/content/{id}/edit
/creator/earnings
/creator/subscribers
/creator/moderation

# 发布 / 互动
/post/new?type={article|photo|video|scam_report|question}

# 认证
/login
/signup                            走完整 onboarding 5 屏
/auth/callback/{provider}

# 付费
/membership
/checkout?item={...}

# 静态/合规
/about /privacy /terms /tos /dmca /contact /press
```

### 5.2 URL 命名规则

* 英文 slug,kebab-case:`/articles/h1b-renewal-pitfalls`,不用中文 URL 编码
* slug 由作者发布时生成,小写、去停用词、最多 60 字符
* 历史 slug 永久 301 到当前
* 不在 URL 里放任何 ID(美观 + 防爬虫),内部以 slug 解析 ID
* 省代码使用标准 ISO:`bc` / `on` / `ab` / `qc` / `ca-ny` / `ca-ca` 等

### 5.3 SEO 必备

每页 SSR 渲染(Next.js `getServerSideProps` 或 RSC),OG 元数据齐全,JSON-LD `Article` / `NewsArticle` / `FAQPage` schema。文章页注入 `BreadcrumbList`、`Person`(作者)、`Place`(地理范围)。

---

## 6. 数据模型

PostgreSQL 14+。所有表 `id` 用 `bigint` + `nanoid`(11 字符),时间用 `timestamptz`。

### 6.1 核心表(精简版,完整字段在数据库 migration)

```sql
-- 用户
users (
  id, nanoid, email, username,
  primary_region_code,         -- e.g. "ca-bc"
  primary_city_id,             -- 可选,IP 自动填
  display_name, avatar_url,
  trust_score INT DEFAULT 0,    -- 0-100,见 §8.2
  tier ENUM('V0','V1','V2','V3') DEFAULT 'V0',
  identity_tags TEXT[],          -- ['immigrant_pr','homeowner']
  topic_interests TEXT[],        -- ['fraud','immigration']
  is_creator BOOLEAN,
  is_verified BOOLEAN,           -- 蓝标
  created_at, updated_at,
  last_active_at
)

-- 用户关注的其他省/州
user_followed_regions (
  user_id, region_code, note, relation_tag, created_at
)
-- relation_tag: 'parents'|'children'|'friend'|'future'|'investment'|null

-- 内容统一表(article / video / scam_file / ugc_report 都在这里,polymorphic)
contents (
  id, nanoid, slug, content_type ENUM,
  title, summary, body,         -- body 用 markdown + structured blocks
  cover_image_url, video_url,
  author_id, status ENUM,        -- draft|review|published|scheduled|archived|removed
  geo_scope ENUM,                -- city|metro|province|country|continent
  geo_ids TEXT[],                -- ['ca-bc-richmond','ca-bc']
  geo_specificity INT,           -- 1-5
  topic_tags TEXT[],
  identity_relevance TEXT[],     -- 哪些身份最相关
  is_paid BOOLEAN,
  price_usd NUMERIC(8,2),
  paywall_position INT,          -- 截断到第几个 block
  is_emergency BOOLEAN,          -- 触发应急横条
  emergency_keywords TEXT[],     -- 哪些关键词匹配触发
  published_at, scheduled_at,
  metrics JSONB                   -- {views, completes, likes, bookmarks, shares}
)

-- UGC 上报特殊字段
ugc_reports (
  content_id PRIMARY KEY,
  role ENUM,                      -- victim|family|witness|researcher
  incident_location_precise JSONB, -- 内部用,不公开
  incident_location_public TEXT,   -- "列治文 · 某商场附近"
  incident_date,
  loss_usd NUMERIC,
  is_anonymized BOOLEAN,
  named_entities_check BOOLEAN,    -- 是否声明未点名指控
  review_status ENUM,              -- pending|approved|rejected|needs_edit
  reviewer_id,
  reviewed_at,
  reviewer_notes TEXT
)

-- 地区表
regions (
  code PRIMARY KEY,                -- 'ca-bc'
  country_code,
  level ENUM,                      -- country|province|state|metro|city
  parent_code,
  display_name_zh, display_name_en,
  ietf_locale,
  active_user_count INT,
  last_recomputed_at
)

cities (
  id, code, name_zh, name_en,
  region_code,
  centroid_lat, centroid_lng,
  bounds JSONB
)

-- 评论
comments (
  id, content_id, user_id,
  parent_id,                       -- 回复关系
  body, status ENUM,
  is_pinned, is_creator_response,
  upvotes, downvotes,
  high_quality_score REAL,         -- 算法见 §8.6
  created_at
)

-- 订阅
subscriptions (
  user_id, plan ENUM,              -- monthly|annual
  status ENUM, price_usd,
  started_at, current_period_end, cancel_at
)

-- 单篇购买
purchases (
  user_id, content_id, price_usd, purchased_at
)

-- 警报订阅(地理)
alert_subscriptions (
  user_id,
  region_code,                     -- 省级
  city_radius_km INT,              -- 可选 0/1/3/5km 城市精度
  severity_threshold ENUM,         -- low|med|high
  active BOOLEAN
)
```

### 6.2 身份标签字典(`identity_tags`)

封闭枚举,运营可加但开发限制总数 ≤ 20:

```
immigrant_pr   immigrant_new  citizen
h1b            opt_student    other_visa
homeowner      renter         investor
parent_school  parent_adult   no_kids
retired        small_business employed
spouse_remote  cross_border
```

### 6.3 地理标签字典

`geo_scope`:

| 值 | 含义 |
|---|---|
| `city` | 仅本城市/某街区 |
| `metro` | 都会区(大温/GTA/湾区) |
| `province` | 省/州 |
| `country` | 国家 |
| `continent` | 北美 |

`geo_specificity`(1-5):

| 1 | 全北美 / 全华人通用 |
| 2 | 国家级 |
| 3 | 省/州级 |
| 4 | 都会区 |
| 5 | 单城市 / 街区精度 |

### 6.4 内容 → 地区匹配规则

发布者**必须**选择 `geo_scope` 和填写 `geo_ids`。系统验证:

* `geo_scope = city` 时,`geo_ids` 必须包含至少 1 个 city id
* `geo_scope = province` 时,`geo_ids` 必须是 region code(如 `ca-bc`),不能写城市
* `geo_specificity` ≤ 2 的内容,平台政策:**首 24 小时享受推荐位,之后排序权重减半**(逼大家精确打标)

---

## 7. 地区识别 & 推荐引擎

### 7.1 IP 检测

* MVP 阶段:全站套 Cloudflare,使用 `CF-IPCountry` + `CF-IPCity` 请求头
* 准确率:北美城市级 ~85%,可接受
* 不存原始 IP,只存 `region_code` + `city_id`,且首次设置后用户主选优先
* 服务端用户首次访问:301 至 `/onboarding`,或弹出 ATPRegionConfirmBanner

### 7.2 用户地区数据结构

```ts
interface UserRegionConfig {
  primary_region: string;          // e.g. "ca-bc" (必填)
  primary_city_id?: string;        // IP 自动填,不在 UI 强调
  followed_regions: {
    region_code: string;            // "ca-on" / "us-ca"
    note?: string;                   // "父母在多伦多"
    relation_tag?: RelationTag;
  }[];
  city_alert_enabled: boolean;     // 默认 false
  city_alert_radius_km: 1 | 3 | 5;  // 仅 enabled 时生效
  home_locale_strength: number;    // 默认 0.65
}
```

### 7.3 推荐评分公式

每个内容相对每个用户产出 score(0-1 区间),用于 feed 排序。

```python
def compute_score(content, user, now):
    geo_match = geo_match_weight(content, user)          # 0.0 - 1.0
    recency = recency_decay(content.published_at, now)    # 0.0 - 1.0,半衰期 36h
    social_proof = log1p(content.metrics.likes + 2 * content.metrics.shares)
    identity_match = jaccard(content.identity_relevance, user.identity_tags)
    paid_boost = 0.02 if content.is_paid else 0.0
    creator_trust = (content.author.trust_score / 100) ** 0.6

    score = (
        geo_match     * 0.45 +
        recency       * 0.25 +
        social_proof  * 0.15 +
        identity_match * 0.10 +
        creator_trust * 0.05
    ) + paid_boost
    return clamp(score, 0, 1)

def geo_match_weight(content, user):
    if content.geo_scope == 'city':
        if user.primary_city_id in content.geo_ids:
            return 1.0 * distance_decay(content, user)
        return 0.0   # 不显示
    if content.geo_scope == 'metro' or content.geo_scope == 'province':
        if user.primary_region in content.geo_ids:
            return 0.95
        if any(r.region_code in content.geo_ids for r in user.followed_regions):
            return 0.70
        return 0.0
    if content.geo_scope == 'country':
        if same_country(user.primary_region, content.geo_ids):
            return 0.45
        return 0.20    # 跨国基础权重
    if content.geo_scope == 'continent':
        return 0.15

def distance_decay(content, user):
    # 用户城市中心点 vs 事件地点
    d_km = haversine(user.city_centroid, content.incident_center)
    return max(0.3, 1.0 - (d_km / 50.0))   # 50km 内线性衰减
```

**关键参数(可调,先按此值上线)**:

| 参数 | 值 | 说明 |
|---|---|---|
| `recency_half_life` | 36 hours | 36 小时后权重减半 |
| `geo_weight` | 0.45 | 主权重,**不可低于 0.35** |
| `followed_region_weight` | 0.70 | 注意:**关注省 > 本国其他省**,设计哲学见 mockup 评注 |
| `distance_floor` | 0.30 | 50km 外也不归零,避免长尾断流 |
| `paid_boost` | 0.02 | 付费内容微弱加权,不强加 |

### 7.4 地区选择器交互

**5 步降级路径**(优先级从高到低):

1. 用户已登录 + 有 `primary_region` → 直接用
2. 用户已登录 + 无 → 强制走 onboarding 第 2 屏
3. 未登录 + cookie 中有 `atp_region` → 用
4. 未登录 + Cloudflare IP city → 顶部显示"检测到 BC,这样看?"banner
5. 完全无信息 → 默认 `ca-bc`(创始团队所在地),首页顶部强提示选择

### 7.5 冷启动 / 内容稀疏

如果用户所在省内容 < 20 条:

* 自动按"邻省"补充内容(BC ↔ AB / WA;ON ↔ QC / NY;CA ↔ NV / OR)
* 显示横幅:"你所在的 BC 还不够热闹,我们也找来了邻省同类内容,你也可以第一个写"
* CTA → `/post/new?prefill_region=ca-bc`

---

## 8. 核心业务逻辑

### 8.1 创作者层级 / 信任分

| 层级 | 信任分要求 | 解锁 |
|---|---|---|
| V0 | 0 - 30 | 默认所有人,可发评论、UGC 上报(匿名) |
| V1 | 31 - 60 | 可发文章、视频,实名发帖,基础分成 |
| V2 | 61 - 90 | 可建付费内容,广告分成 +0% |
| V3 | 91 - 100 | 蓝标认证,广告分成 +5%,优先推荐位,可建系列订阅 |

信任分计算(每日重算一次):

```python
trust_score = base_score(account_age_days) \
            + content_quality_bonus(approved_ratio, avg_engagement) \
            - violations_penalty(content_removed, complaints_upheld)
            + community_signals(citations_by_others, expert_endorsements)
```

权重见 `analytics/trust_score.py`(后续单独 doc)。

### 8.2 UGC 上报审核流程

每条 UGC 进入审核队列:

1. **自动检查**:命名实体识别(NER)扫描是否点名公司/律师/经纪/个人;敏感词;重复内容;图片 EXIF 元数据保护
2. **志愿审核员**(社区招募 V2 + 用户):2 人独立审,需 2 票通过
3. **平台审核员**(全职 1-2 人):仲裁分歧、处理 high-severity 的报告
4. **法律审核**(外部律师 quarterly retainer):涉及具名指控、巨额损失、可能引发诉讼的

SLA:普通 6 小时,紧急 1 小时(发布者主动标记)。
拒绝原因必须明示,允许 1 次修改重提。

### 8.3 付费墙策略

**软付费墙**(默认):文章前 30% + 第一张图免费,之后挡。
**硬付费墙**:标题 + 200 字摘要 + 解锁价。仅用于深度报告(单价 ≥ $5)。

订阅(`membership`)定价:**$9.99/月** 或 **$79.99/年**(年付节省 33%)。订阅者:

* 全部付费内容免费
* 早 24 小时看到所有内容
* 紧急警报 SMS(可选)
* 创作者中心 V3 福利同步

单篇定价范围:$1.99 - $9.99,**禁止** $0.99(支付手续费占比过高)。

支付流程:Stripe Checkout(美国 + 加拿大);后期可加 Stripe Tax 自动处理 GST/PST/HST。

### 8.4 评论排序

**默认非按时间**,按 high_quality_score 排序:

```python
hq_score = (
    log1p(comment.upvotes) * 0.5 -
    log1p(comment.downvotes) * 0.3 +
    is_creator_response * 0.2 +
    has_followup_discussion * 0.15 +
    time_decay(comment.created_at, half_life=24h) * 0.2
)
```

用户可切换"最新"视图(显示 `sort=newest`)。

### 8.5 应急横条触发

匹配下表关键词 + 用户上下文(搜索查询、阅读历史)时触发:

| 触发词 | 应急内容 |
|---|---|
| `电汇` `汇款` `wire` `定金` | "正准备汇款?3 件事先做" |
| `IRS` `CRA` `税务局` `补税` | "假冒税务局?5 秒识别法" |
| `律师` `lawyer` `legal action` | "律师函真假判断" |
| `法院` `court` `传票` | "传票真伪 + 你的权利" |
| `H-1B` `身份` `拒签` | "拒签后的法律选项" |
| `房产` `产权` `closing` | "签约前最后检查清单" |

每个触发词关联一个"应急内容卡"(运营预填,Markdown 格式,内嵌 3 行硬指令 + 1 个链接到完整指南)。

### 8.6 E-E-A-T 信号(SEO 关键)

每篇文章页面**必须**含:

* 作者卡:头像、display name、创作者层级、信任分、相关领域内容数
* 发布时间 + 最近更新时间(用户可信赖性)
* 至少 1 个数据点(案件数 / 涉案金额 / 时间)且标注来源
* 至少 1 个外部 cite(政府文件 / 媒体报道 / 学术),用 `<cite>` 标签
* 文末"本文修订历史"展开器

Google E-E-A-T 算法对这类信号敏感,实测排名差异 30-50%。

---

## 9. API 概要

REST,JSON,JWT 鉴权。所有响应统一 envelope:

```json
{
  "ok": true,
  "data": { ... },
  "meta": { "page": 1, "next_cursor": "..." }
}
```

### 9.1 关键端点(部分)

```
GET    /api/feed?cursor=&tab=          级联首页
GET    /api/contents/{slug}             单条内容(含付费状态判断)
POST   /api/contents                    创作者发布(草稿/发布)
PATCH  /api/contents/{id}
GET    /api/search?q=&type=&region=&time=
GET    /api/scams                        档案列表(按地区)
GET    /api/scams/{slug}

POST   /api/ugc/reports                  UGC 上报提交
GET    /api/me/ugc/reports               我的上报历史
PATCH  /api/admin/reviews/{id}            审核员决策

POST   /api/comments
GET    /api/comments?content_id=&sort=
POST   /api/comments/{id}/upvote

GET    /api/me                            个人信息
PATCH  /api/me/regions
PATCH  /api/me/notifications

GET    /api/me/notifications              消息中心
POST   /api/me/notifications/read_all

GET    /api/creator/analytics?range=
GET    /api/creator/contents
GET    /api/creator/earnings

POST   /api/billing/checkout              Stripe checkout 创建
POST   /api/billing/webhook               Stripe webhook
GET    /api/me/subscription

POST   /api/auth/signup
POST   /api/auth/login
GET    /api/auth/oauth/{provider}
```

### 9.2 速率限制

| 端点 | 未登录 | 登录 | 创作者 V2+ |
|---|---|---|---|
| `/api/feed` | 60/min | 120/min | 180/min |
| 写操作(POST) | 5/min | 20/min | 30/min |
| `/api/ugc/reports` POST | 1/天 | 3/天 | 5/天 |

---

## 10. 隐私 & 法律合规

### 10.1 隐私

* PIPEDA(加拿大)和 CCPA(美国加州)合规
* IP 地址不入库,只存解析后的 `region_code` / `city_id`,30 天后只保留 city_id
* 用户精确位置(浏览器 GPS):**永不获取**,仅在用户点击"开启 1km 警报"时通过浏览器 Geolocation API 临时取,不上传
* Cookie 同意:仅"必需 Cookie"默认开启,统计 Cookie 用户主动 opt-in
* 数据导出权:`GET /api/me/export` 返回 zip(JSON + 上传媒体)
* 数据删除权:`DELETE /api/me/account` 软删,30 天后硬删除

### 10.2 防诽谤策略

UGC 三层防护(见 §8.2)。**额外**:

* 任何被指控方可申诉(`/api/disputes`),48 小时内审核
* 平台内容下方常驻"该内容不构成法律建议或事实指控"小字脚注
* DMCA 渠道齐全,版权举报 24 小时内响应
* 保留外部律所季度法务咨询服务

### 10.3 内容警示

涉及"金融损失 / 法律行动 / 身份证件"的内容必须显示警示横条:**"本平台内容仅供参考,不构成专业建议。重大决策请咨询持牌律师 / 会计师 / 移民顾问。"**

---

## 11. 技术栈建议

**最小可行栈**(适合 1-3 人初期团队):

| 层 | 技术 | 备选 |
|---|---|---|
| 前端 | Next.js 14 (App Router) + TypeScript | Remix |
| UI | Tailwind + shadcn/ui + Radix Primitives | Mantine |
| 后端 | Next.js Route Handlers + tRPC | 独立 FastAPI |
| 数据库 | PostgreSQL 15(Neon / Supabase 托管) | RDS |
| 缓存 | Redis(Upstash) | — |
| 全文搜索 | Postgres pg_trgm + tsvector(MVP),Meilisearch v2 | Algolia |
| 媒体存储 | Cloudflare R2 | S3 |
| CDN + IP 地理 | Cloudflare(必选) | — |
| 支付 | Stripe | Paddle |
| 邮件 | Resend / Postmark | SendGrid |
| 鉴权 | Clerk / Auth.js | 自建 |
| 分析 | PostHog 自托管 | Mixpanel |
| 错误 | Sentry | — |
| Geocoding | Mapbox / Geoapify(免费层) | Google Maps |

**强烈建议**:不要自建 IP 地理 / 邮件 / 支付。这三块自建会消耗 40% 开发时间换不到 5% 用户价值。

---

## 12. 开发顺序(MVP 切分)

### Phase 0 · 基建(2 周)

* 仓库 / CI / Vercel / Cloudflare / DB 初始化
* Tailwind + 组件库骨架 + Storybook
* Auth(Clerk)
* 用户表、内容表、评论表
* SSR 框架

### Phase 1 · MVP 媒体站(4 周,可发布)

* 首页(级联推荐基础版,先全省 + 跨省混合,不上跨境)
* 文章详情(含付费墙、E-E-A-T 信号)
* SEO 专题页
* 搜索(Postgres 全文)
* 地区选择器(简化版)
* 创作者中心 - 仅内容/草稿/已发布 + 简单数据
* Stripe 接入 - 单篇 + 订阅
* Cloudflare IP 地理基础接入
* **运营预填:**30 篇文章、20 个骗局档案,覆盖 BC / ON 两个核心省

**这一阶段不上**:消息中心、UGC 投稿、地图模块、应急横条、信任分系统

### Phase 2 · 互动(4 周)

* 消息中心(评论、互动、系统、警报)
* 评论系统(含 hq_score 排序)
* 关注 / 收藏 / 订阅推送
* 创作者中心扩展:数据图表、待回复评论、选题建议
* 应急横条系统
* 完整 onboarding 流程

### Phase 3 · UGC + 完整防护(6 周)

* UGC 上报表单 + 审核后台
* 志愿审核员招募与培训
* 信任分系统
* 法务流程对接
* 防诽谤工具(NER 自动扫描)
* ATPVerifiedUGCBadge 全站铺开

### Phase 4 · 桌面创作者工作台 + 地图(4 周)

* 桌面端创作者中心完整功能
* ATPLocationMapModule(从 SVG mock 升级到 Mapbox)
* 城市级警报订阅(精度 1/3/5km)
* 创作者层级 V2 / V3 解锁
* 实名认证流程

### Phase 5 · 规模化(持续)

* 移动 App(React Native)
* 推送通知
* 跨省专题运营
* 视频上传与播放
* 移动端短视频信息流

**总时间预算:Phase 0-4 约 5 个月**,可上线 + 初步验证 PMF。

---

## 13. 开放问题(待产品决策)

1. **域名最终定**?目前用 `avoidthepit.com` 作占位,可考虑中文友好的:`bikenghua.com` / `pikeng.com`
2. 是否做**电子报(Newsletter)**?能显著提升留存,但增加运营成本
3. **认证创作者**的实名验证用什么方法?(护照?LinkedIn?)
4. **跨境用户**(在中国大陆但关心北美)是否服务?涉及 ICP 备案问题,MVP 建议放弃
5. 是否考虑**多语言**?英文版能扩大受众但中文优先级更高
6. UGC 审核员的**激励机制**?信任分 + 现金奖励 + 平台职位?
7. **AI 助手集成**?让 Claude / GPT 在文章下回答"这个套路在你的情况下怎么应对"——技术不难,法律风险需评估

---

## 14. 附录:已完成的设计资产清单

参考截图(请向产品要 Figma 链接):

**移动端(13 个)**
首页 · 文章详情(地区版) · 订阅墙 · UGC 发帖 · SEO 专题 · 我的+主页 · 创作者中心 · 消息中心 · 搜索结果 · 地区选择器 · Onboarding × 3 屏

**桌面端(4 个)**
首页 · 文章详情 · SEO 专题 · 创作者中心(数据视图)

每个 mockup 在 chat 历史中都附有详细的设计意图说明,建议产品和设计将其归档到 Figma 注释中。

---

*文档结束 · v1.0 · 2026.06*
*下次重大修订前置条件:Phase 1 上线 6 周后,基于真实数据迭代权重和 UX*
