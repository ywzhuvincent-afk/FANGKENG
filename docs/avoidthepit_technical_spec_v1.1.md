# Avoid The Pit · 技术交付 spec v1.1

> 北美华人防坑防骗社区平台
> 文档版本:2026.06 · **v1.1**(v1 + 23 项 UX 走查补丁)
> 适用对象:前端 / 后端 / 产品 / 内容运营 / 法务
> 上次更新:基于 6 个真实用户场景(王太太 47 岁列治文 + 父母 70 岁多伦多)的走查

---

## 变更说明 · v1 → v1.1

通过模拟一位真实北美华人用户(王秀芬,Richmond BC,新移民 5 年,地产经纪)走完 6 个场景(注册 / 浏览 / 评论 / 购买 / UGC 抖纷 / 帮父母设置),共发现 23 项 spec 缺漏。本版本全部整合。

### Critical(上线前必做,6 项)

| # | 改动 | 影响 spec § |
|---|---|---|
| 1 | 微信生态适配(WeChat OAuth + 内置浏览器检测 + 微信分享 SDK + 公众号) | §11.2 新增 |
| 2 | 价格按用户地区显示本地货币 + Stripe Tax 自动计算 GST/PST | §8.3 重写 |
| 3 | Stripe Checkout 启用 zh locale + Apple Pay / Google Pay / PayPal / Interac | §8.3 §11.3 |
| 4 | UGC dispute resolution 完整流程 | §8.2.5 新增 |
| 5 | 匿名用户身份保护承诺写进 ToS + 法庭令例外 | §10.2 增强 |
| 6 | MVP 不上私信 + 私下通道走平台审核员中转 | §8.8 新增 |

### High(3 个月内做,9 项)

| # | 改动 | 影响 spec § |
|---|---|---|
| 7 | 订阅增加"试用 7 天" + "家庭计划"(4 账号 + 1 父母代管) | §8.3 |
| 8 | "为长辈设置"模式 + 二维码代登录 | §7.6 新增 |
| 9 | accessibility(大字号 / 简化 / 语音输出)持久挂顶 | §2.7 新增 |
| 10 | 信任分扣分必须可解释 + 申诉链接 | §8.7 新增 |
| 11 | identity_tags 扩展(地产经纪 / 月嫂 / OAS / 依亲 等 7 项) | §6.2 |
| 12 | topic_interests 扩展(医疗 / 老年 / 汽车 / 美容保健 5 项) | §6.4 |
| 13 | 已购单篇 30 天内可抵扣会员 + 我的页加已购库 | §8.3 |
| 14 | 客服微信号 + 客服 SLA | §8.4.2 新增 |
| 15 | 应急关键词库按年龄段差异化触发 | §8.5 |

### Medium(Phase 4+,8 项)

| # | 改动 | 影响 spec § |
|---|---|---|
| 16 | 游客模式("先逛一逛",commit action 才登录) | §7.7 新增 |
| 17 | 双语收据 + PDF 下载 | §8.3 |
| 18 | 老年模式 SMS 通知 + 紧急警报短信 | §11.4 |
| 19 | 老年模式语音上报 + 审核员电话回访 | §8.2.6 新增 |
| 20 | 英文术语 tooltip 中文解释 | §3.4 新增 |
| 21 | 卡片右下角水印 | §3.5 |
| 22 | 繁简体切换 + 港台术语映射 | §2.8 新增 |
| 23 | 老年身份子分类 + 老年模式默认推送策略 | §6.2 §11.4 |

---

## 0. 这份文档说什么

这是把 16 个完整页面 mockup 和所有产品决策**冻结成可执行规范**的文档。它不解释"为什么这样设计",只回答"具体长什么样、用什么数据、按什么规则跑、什么时候做"。

每个 section 都是一个独立模块,任何角色可以只读自己那一块开工。开发顺序见 §12。

代号:`atp`(avoidthepit),数据库前缀、CSS 命名空间、内部代码均统一使用。

---

## 1. 产品一句话定义

> 一个按"省/州"地理切片的、本地化中文防骗 + 民生政策媒体兼社区,面向北美华人,通过订阅 + 单篇付费 + 创作者分成变现。

核心差异化:**地理精度** + **法律合规的 UGC** + **创作者职业化体系** + **跨代际(青年-长辈)家庭使用**。

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
| `--atp-wechat-green` | `#07C160` | 仅用于微信相关按钮 / 标识 |

颜色编码原则:**红 = 你的本地 + 紧急**,**金 = 钱 + 信任**,**蓝 = 数据 + 权威**,**灰 = 远方**,**绿 = 微信 + 已验证**。开发不可在组件里硬编码 hex。

### 2.2 字体

| Token | Value |
|---|---|
| 中文 | "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif |
| 英文 | "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif |
| 数字 | "Inter Variable", "Inter", monospace tabular |
| 标题专用 | "Noto Serif SC", "Source Han Serif" |

字号阶梯有三档(基于 `font-size-scale` 用户设置):

| 用途 | 标准 | 大字号 (+) | 简化 (++) |
|---|---|---|---|
| 大标题 | 1.25rem | 1.5rem | 1.75rem |
| 段头 | 0.94rem | 1.13rem | 1.31rem |
| 正文 | 0.81rem | 1rem | 1.19rem |
| Meta | 0.69rem | 0.81rem | 0.94rem |

`font-size-scale` 存在用户偏好,默认 standard。大字号 + 简化模式见 §2.7。

字重:仅用 400 + 500。

### 2.3 圆角 & 间距

| Token | Value |
|---|---|
| `--atp-radius-sm` | 4px(标签) |
| `--atp-radius-md` | 6px(按钮、输入框) |
| `--atp-radius-lg` | 8px(卡片) |
| `--atp-radius-xl` | 10px(大卡片、modal) |
| `--atp-radius-pill` | 14px(tab、chip) |

间距使用 4 倍数:`4 / 8 / 12 / 16 / 20 / 24 / 32 / 48`。

### 2.4 图标

统一使用 **Tabler Icons Outline**。**禁止 emoji 作为功能图标**,emoji 仅在 UGC 内容里允许。

### 2.5 阴影、渐变

整站走 flat 风,允许 0.5px solid 边框、单色填充、两色直线性 gradient(仅限封面图、品牌色块、签名色背景)。

### 2.6 [v1.1 新增] 微信生态视觉规范

任何与微信相关的 UI 元素遵循:

- 颜色:`--atp-wechat-green` `#07C160`(微信品牌绿)
- 字符:用 `微信` 不用 `WeChat`(华人用户更熟悉)
- 微信按钮:绿色填充 + 微信图标(用 SVG 自绘,Tabler 没有)
- 微信用户头像:可选显示用户的微信头像(若 OAuth 授权)
- 公众号二维码:必须有官方品牌框,**避免被识别为钓鱼**

### 2.7 [v1.1 新增] Accessibility 规范

所有页面**右上角持久挂**字号控制条 `[A- A A+]`(三档),用户切换后立即生效,偏好存 `user.font_size_scale`。

简化模式(用户偏好 `user.ui_mode = 'senior'`):
- 字号自动跳到 ++ 档
- 行高从 1.7 提到 2.0
- 颜色对比度提高(text-secondary 升级到 text-primary 同色)
- 移除装饰性元素(渐变背景、动画)
- 卡片间距增大 1.5 倍
- 按钮 min-height 从 36px 增到 48px(便于老年手指点击)
- 默认开"语音输出"按钮(每篇文章顶部"听一下"按钮)

辅助功能必检:
- 所有 icon 必须有 `aria-label`
- 颜色对比度 WCAG AA(4.5:1)
- 键盘导航完整(Tab + Enter + Esc)
- 屏幕阅读器测试用 NVDA + VoiceOver 双过

### 2.8 [v1.1 新增] 繁简体策略

MVP 仅支持简体中文 (`zh-CN`)。Phase 4+ 加繁体支持:

- 用户偏好 `user.locale = 'zh-CN' | 'zh-TW' | 'zh-HK'`
- 简繁体转换通过 `opencc-js` 库自动完成(非翻译)
- 维护**港台华人术语映射表**:打印→列印 / 软件→軟體 / 视频→影片 等 ~50 词
- footer 显示当前语言选择,用户可一键切换
- SEO:不同语言版本不同 URL(`/zh-CN/article-slug` vs `/zh-TW/article-slug`)避免重复内容惩罚

---

## 3. 组件库

每个组件命名 `ATP{Name}`,React 中以独立文件 + Storybook story 维护。

### 3.1 基础

(同 v1,略)

### 3.2 业务专有(★)

(以下组件同 v1: ATPEmergencyBanner / ATPScamFileCard / ATPRegionScopeBadge / ATPLocationMapModule / ATPTrustScoreCard / ATPVerifiedUGCBadge / ATPCommentContextCard / ATPPaywallCard / ATPRegionPicker / ATPCascadeFeed)

### 3.3 [v1.1 更新] 新增/调整组件

#### ATPFontSizeControl ★

持久挂在所有页面右上角的字号调节器。

```ts
interface Props {
  current: 'standard' | 'large' | 'senior';
  onChange: (size: FontSizeScale) => void;
}
```

#### ATPWeChatLoginButton ★

微信登录按钮(WeChat OAuth)。

```ts
interface Props {
  variant: 'primary' | 'compact';
  redirect_url: string;
  // 微信内置浏览器 vs 外部浏览器走不同流程
  source: 'wechat_browser' | 'external';
}
```

#### ATPWeChatShareSheet ★

微信分享 sheet。在微信内置浏览器里调用微信 JSSDK,在外部浏览器里 fallback 到"复制链接 + 提示去微信粘贴"。

```ts
interface Props {
  url: string;
  title: string;
  description: string;
  thumb_url: string;
  // 微信内置浏览器才显示"朋友圈"
  show_moments: boolean;
}
```

#### ATPGuestModeBanner ★ [v1.1 新增]

未登录用户在某些动作时弹出的"快速登录"banner,非阻塞式。

```ts
interface Props {
  action: 'comment' | 'subscribe' | 'report' | 'bookmark';
  // 登录后回到原页面继续操作
  continue_action: () => void;
}
```

#### ATPDisputeBanner ★ [v1.1 新增]

UGC 内容被异议时显示在内容顶部的状态条。

```ts
interface Props {
  status: 'under_review' | 'edited' | 'resolved_kept' | 'resolved_removed';
  visible_to: 'author_only' | 'subscribers' | 'public';
  estimated_resolution: ISODate;
}
```

#### ATPTrustScoreExplainCard ★ [v1.1 新增]

信任分变化的可解释卡片,出现在通知中心。

```ts
interface Props {
  delta: number;            // -3, +5 等
  reason_code: string;       // 引用 community guidelines § id
  reason_text: string;
  rule_link: string;
  appeal_deadline?: ISODate;
}
```

#### ATPSeniorOnboardingMode ★ [v1.1 新增]

为长辈设置模式的特殊 onboarding 包装。

```ts
interface Props {
  setter_user_id: string;     // 帮谁设置(子女)
  target_relation: 'parent' | 'grandparent' | 'spouse';
  pre_selected_region: RegionCode;
  pre_selected_topics: TopicTag[];
  // 生成 QR 让长辈扫码登录
  output_qr: boolean;
}
```

### 3.4 [v1.1 新增] 英文术语 tooltip

任何含英文术语(wire transfer, SWIFT recall, class action, escrow 等)的文章,**前端构建时自动注入 tooltip 包装**。

实现:
- 维护英文术语词典 JSON(`/data/glossary.json`),~200 条
- 服务端渲染时正则匹配 → 包裹 `<span class="atp-term" data-term="wire-transfer">wire transfer</span>`
- 客户端水合时绑定 hover/tap 显示中文解释 + 例句

每个术语条目:
```json
{
  "key": "wire-transfer",
  "en": "wire transfer",
  "zh": "电汇",
  "definition": "通过 SWIFT 网络在国际银行间转移资金的方式",
  "example": "买房定金通常需要通过电汇支付到律师事务所的信托账户",
  "first_seen_alert": true  // 首次见到时弹小气泡提示
}
```

### 3.5 [v1.1 更新] 卡片水印规范

所有可分享卡片(scam file / 文章 cover / 警报)右下角添加水印:

- 文字:`@避坑指南 avoidthepit.com`
- 字号:9px
- 颜色:rgba(255,255,255,0.5)(图片背景上)或 var(--atp-text-tertiary)(纯色背景上)
- 截图时水印不可被裁掉(放在卡片底部 6px 内边距)

---

## 4. 布局 & 响应式

(同 v1,略)

[v1.1 增补] 所有页面顶部右侧持久显示 `ATPFontSizeControl`,移动端折叠到设置抽屉的最顶部。

---

## 5. 信息架构 & URL

(同 v1,略)

[v1.1 新增] URL:

```
/setup-for-elder                  为长辈设置流程
/me/family                         家庭计划管理
/me/library                        已购 / 已订阅 / 已收藏(更新)
/me/wechat-link                    微信账号绑定
/disputes/{id}                     dispute 进展页(仅相关方可见)
```

---

## 6. 数据模型

### 6.1 核心表(精简,完整字段在 DB migration)

(基础结构同 v1,略)

[v1.1 增补字段]

```sql
-- users 表新增
ALTER TABLE users ADD COLUMN font_size_scale ENUM('standard','large','senior') DEFAULT 'standard';
ALTER TABLE users ADD COLUMN ui_mode ENUM('default','senior') DEFAULT 'default';
ALTER TABLE users ADD COLUMN locale VARCHAR(8) DEFAULT 'zh-CN';
ALTER TABLE users ADD COLUMN wechat_open_id VARCHAR(64) UNIQUE;
ALTER TABLE users ADD COLUMN wechat_union_id VARCHAR(64);
ALTER TABLE users ADD COLUMN phone_e164 VARCHAR(20);
ALTER TABLE users ADD COLUMN sms_alerts_enabled BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN age_group ENUM('youth','adult','senior') DEFAULT 'adult';
ALTER TABLE users ADD COLUMN managed_by_user_id BIGINT;   -- 子女管理父母账号

-- 家庭计划
CREATE TABLE family_plans (
  id, owner_user_id, plan_type, max_members INT DEFAULT 4,
  parent_slot_used BOOLEAN DEFAULT false,
  stripe_subscription_id,
  current_period_end TIMESTAMPTZ
);

CREATE TABLE family_plan_members (
  family_plan_id, user_id, role ENUM('owner','member','parent_slot'),
  joined_at, removed_at
);

-- 信任分变化日志
CREATE TABLE trust_score_events (
  id, user_id, delta INT,
  reason_code VARCHAR(64),     -- 'L1_NER_FLAG','L2_NER_FLAG','UGC_APPROVED','CONTENT_REMOVED' 等
  reason_text TEXT,
  rule_section VARCHAR(64),     -- 引用社区准则的 §
  appeal_status ENUM('none','submitted','reviewing','resolved'),
  appeal_deadline TIMESTAMPTZ,
  created_at
);

-- UGC dispute
CREATE TABLE ugc_disputes (
  id, content_id, submitter_email,        -- 异议方,不要求登录
  submitter_proof TEXT,                    -- 异议证据
  status ENUM('open','under_review','escalated_legal','resolved_kept','resolved_edited','resolved_removed'),
  legal_review_required BOOLEAN DEFAULT false,
  resolution_notes TEXT,
  opened_at, resolved_at
);

-- 已购库
CREATE TABLE user_library (
  user_id, content_id, acquired_via ENUM('purchase','subscription','gift'),
  acquired_at, expires_at
);
```

### 6.2 [v1.1 扩展] 身份标签字典

总共扩到 ~30 个标签,运营可加但**总数 ≤ 30**:

```
# 身份阶段
immigrant_pr        immigrant_new       immigrant_invest
citizen             permanent_returnee

# 工签 / 学签
h1b                 opt_student         lmia_wp
visitor_visa        super_visa          parent_dependent

# 居住状态
homeowner           renter              investor

# 家庭阶段
parent_school       parent_adult        parent_visiting   no_kids

# 退休 / 长辈
retired             retiree_oas_cpp     senior_70plus     senior_health_issues

# 职业(华人圈高频)
realtor             insurance_broker    nanny_caregiver
study_abroad_agent  accountant          daigou_ecommerce
restaurant_owner    small_business      employed
```

`senior_*` 类标签会**自动触发**简化模式建议(用户首次设置时弹"建议开启长辈模式")。

### 6.3 地理标签字典

(同 v1,略)

### 6.4 [v1.1 扩展] topic_interests 字典

```
# 核心(预选)
fraud               immigration         real_estate

# 财税
tax_canada          tax_us              tax_cross_border
financial_planning  remittance

# 家庭
education_k12       education_higher    childcare
parenting           senior_care         marriage_divorce

# 健康
healthcare          pharmacy            mental_health    senior_benefits

# 生活
auto_driving        beauty_health       shopping_dining

# 职业
employment          career_change       small_business_ops

# 跨境
travel              china_returnee      cross_border_legal
```

老年用户预选偏向:`fraud / healthcare / senior_benefits / pharmacy / immigration / cross_border_legal`。

---

## 7. 地区识别 & 推荐引擎

### 7.1 - 7.5 (同 v1,略)

### 7.6 [v1.1 新增] 为长辈设置模式

入口:`/setup-for-elder` 或"我的 → 家庭 → 帮 TA 设置"。

流程:

1. **关系选择**:父亲 / 母亲 / 公婆 / 岳父岳母 / 配偶 / 其他
2. **基础信息**:对方所在省/州(用户填,因为父母可能在不同地区)、年龄段、英文程度
3. **预设偏好**:子女勾选 → 系统建议默认值
   - 字号 → senior
   - UI mode → senior
   - 通知 → 仅 SMS 紧急警报 + 周一 9 AM digest
   - 推送声音 → 关闭(防止半夜惊扰)
4. **生成代登录 QR 码**:
   - 含一次性 token(24h 有效)
   - 父母手机摄像头扫一下,直接登录、记住设备 30 天
   - 后台关联 `users.managed_by_user_id = 子女_user_id`(供客服支持时识别)
5. **绑定提醒**:每月给子女发"父母 X 的活动摘要"邮件,可关

法律:子女代设置默认**只能管理父母的偏好和通知**,不能代发 UGC 或代付费,后两者需要父母独立确认。

### 7.7 [v1.1 新增] 游客模式

未登录用户可以:浏览所有免费内容、搜索、看 SEO 专题、看骗局档案、看部分付费内容前 30%。

不能:评论、收藏、订阅、上报、查看完整付费内容、获取个性化推荐。

任何受限动作触发时,弹出 `ATPGuestModeBanner`:

```
触发评论 → "想留个评论?快速登录,3 秒完成"
触发收藏 → "登录后保存,下次直接看到"
触发上报 → "登录后可匿名上报,保护你的身份"
触发付费 → "登录后可享 7 天免费试用"
```

登录后**自动恢复用户原本要做的动作**(commit-after-login),不要让用户重新点一次。

---

## 8. 核心业务逻辑

### 8.1 [v1.1 更新] 创作者层级 / 信任分

(基础结构同 v1)

[新增] 信任分**每次变化都生成 trust_score_events 记录**,用户在"我的 → 信任分历史"可见所有 ±N 的原因和引用条款。详见 §8.7。

### 8.2 UGC 上报审核流程

(基础结构同 v1)

### 8.2.5 [v1.1 新增] UGC dispute resolution(异议处理)完整流程

任何已发布的 UGC 内容,任何人(包括非平台用户)可通过 `/disputes/new?content_id=X` 提交异议。提交方需要:

- 邮箱(用于回复)
- 异议类型(诽谤 / 事实错误 / 隐私侵犯 / 商业损害 / 其他)
- 证据描述(可附文件)
- 真实身份声明(可匿名,但优先处理实名)

**流程**:

```
1. dispute 提交 → 24h 内平台必须响应
   - 内容立即标记 status='under_review',显示 ATPDisputeBanner
   - 公开页面仍可见,但顶部有"审核中"灰色横条
   - 原作者收到温和措辞通知(不要吓到匿名用户)

2. 平台审核员核验 → 48h 内
   - 重新走 §8.2 的 NER 扫描
   - 对照 dispute 证据
   - 联系原作者收集补充(可选,作者 7 天内回复)
   - 决定:
     a) 维持原内容(异议无效)
     b) 编辑内容(去除具名指控/夸大表述)
     c) 撤下(明显违规或证据强)

3. 律师审核 → 仅以下情况触发,72h 内
   - 涉及实名指控具体公司/律师/经纪
   - 损失金额 > $10k
   - 异议方提供律师签名要求
   - 法庭传票 / cease and desist 信

4. 决定告知双方
   - 维持 → 异议方收到"未采纳 + 你的申诉途径"
   - 编辑 → 作者收到"系统对内容做了 X 处编辑 + 你 7 天内可对此再异议"
   - 撤下 → 作者收到"撤下 + 完整理由 + 信任分扣减(若有)"

5. 重大争议升级
   - 律师介入(平台付费 retainer 包含)
   - V2+ 创作者享免费法律咨询额度(每年 2 小时)
   - 极端情况:平台可代为应诉
```

**关键决策**:

- **匿名用户的身份绝不暴露给 dispute 方**,除非加拿大法院签发法庭令(court order)
- 平台不会将匿名用户的真实邮箱、IP、设备指纹透露给任何非法律强制要求方
- 这条承诺写进 ToS §X.X 和 community guidelines

[v1.1 关键] 措辞模板见 `/copy/dispute_notifications.md`,需要 product + legal 共同 review。**第一次发给用户的通知是产品最关键的信任时刻**。

### 8.2.6 [v1.1 新增] 老年模式语音上报(Phase 4-5)

老年用户开 senior UI mode 后,UGC 上报入口变成大按钮"我刚遇到了 →":

1. 点击 → 录音(最多 5 分钟)
2. 自动转文字(用 OpenAI Whisper 或 Azure Speech)
3. 用户确认文字
4. 选事件类型(简化为 6 个大类,而非 30 个细类)
5. 提交

平台:
- **审核员电话回访**(若用户提供电话)
- 24h 内通话 5-10 分钟,了解详情
- 由审核员代写正式 UGC 内容,经原用户复述确认后发布

这是产品**最有人情味也最重的功能**,**Phase 4 才上**,需要专门客服团队。

### 8.3 [v1.1 重写] 付费墙 / 订阅 / 家庭 / 货币 / 税务

#### 8.3.1 套餐结构

```
试用             7 天免费 → 自动转月度($9.99 USD/mo)
                可随时取消,不留信用卡
                
个人月费         $9.99 USD/mo
个人年费         $79.99 USD/yr(节省 33%)

家庭月费         $14.99 USD/mo · 最多 4 账号 + 1 父母代管
家庭年费         $129 USD/yr  · 最多 4 账号 + 1 父母代管

单篇             $1.99 - $9.99 USD
                30 天内升级会员,**已购金额自动抵扣**到首期订阅费
```

**家庭计划是华人受众粘性最强的产品**,务必上。

#### 8.3.2 货币本地化

后端统一记账 USD,**前端按用户地区自动换算**显示:

```js
function displayPrice(usd_amount, user_region) {
  switch(user_region.country) {
    case 'CA':
      const cad = usd_amount * FX_RATE_USD_CAD;
      const tax = computeTaxCA(user_region.province);
      return `$${(cad + tax).toFixed(2)} CAD (含 ${tax_pct}% 税)`;
    case 'US':
      const tax = computeTaxUS(user_region.state);
      return `$${(usd_amount + tax).toFixed(2)} USD`;
    default:
      return `$${usd_amount.toFixed(2)} USD`;
  }
}
```

**关键:不要让用户在 Stripe Checkout 阶段才发现真实价格**,转化率会暴跌。

#### 8.3.3 税务自动计算

启用 Stripe Tax(每月成本 0.5% 交易量,值得):

```js
const session = await stripe.checkout.sessions.create({
  // ...
  automatic_tax: { enabled: true },
  customer_update: {
    address: 'auto',
    name: 'auto',
  },
  locale: 'zh',  // 中文界面!
  payment_method_types: ['card', 'apple_pay', 'google_pay', 'paypal', 'acss_debit'],
  // ...
});
```

加拿大税率:GST 5% 联邦 + 省税
- BC: PST 7%
- AB: 0%
- ON: HST 13% 综合
- QC: QST 9.975%

美国税率:按 ZIP code,Stripe Tax 自动算。

#### 8.3.4 支付方式

启用清单:

| 方法 | 加拿大 | 美国 |
|---|---|---|
| Credit Card | ✓ | ✓ |
| Debit Card | ✓ | ✓ |
| Apple Pay | ✓ | ✓ |
| Google Pay | ✓ | ✓ |
| PayPal | ✓ | ✓ |
| Interac (ACSS Debit) | ✓ | — |
| ACH Debit | — | ✓ |
| WeChat Pay | 不开(国内合规复杂) | 不开 |
| Alipay | 不开 | 不开 |

#### 8.3.5 单篇 → 会员抵扣政策

用户在过去 30 天内购买的单篇总金额,在升级到月度/年度订阅时**自动抵扣**首期订阅费。

例:用户买了 $4.99 + $2.99 = $7.98 → 升级月度 $9.99 → 首月只付 $2.01。

这一政策**提升单篇付费意愿** + **后续会员转化率**,运营成本几乎为零(只是会计科目转账)。

#### 8.3.6 退款 & 取消

- 月度订阅:**任何时候取消立即生效**(用户可继续用到当期结束),不主动 prorate 退款
- 年度订阅:**7 天内无理由退款**,7-30 天 prorate 退款,30 天后不退
- 单篇:**24 小时内无理由退款**,24 小时后不退
- 家庭计划:同上,owner 操作

退款政策写进 ToS §X 和 checkout 页底部小字。

#### 8.3.7 收据

Stripe 默认收据 + 平台自定义中英双语 receipt(每月 1 日批量发):

- 抬头:Avoid The Pit · 避坑指南
- 公司全称、商业注册号
- 用户姓名、邮箱、地区
- 订单详情(中英文)
- 税务明细
- PDF 下载链接(常驻于"我的 → 账单")

### 8.4 [v1.1 增补] 评论排序 + 客服

#### 8.4.1 评论排序(同 v1)

#### 8.4.2 [v1.1 新增] 客服微信号 + SLA

华人用户**绝大多数不发邮件给客服**,改用微信。

- 注册一个企业微信公众号 + 客服微信号(`avoidthepit-cs`)
- 所有"联系我们"按钮**首推微信**,邮件作为 fallback
- 客服 SLA:
  - 工作日 9 AM - 9 PM(Pacific):2 小时内回复
  - 周末:24 小时内回复
  - 紧急(已电汇 / 法律强制 / 账号被盗):立即(电话回拨)
- 客服关键词触发:用户发"汇款" / "被骗" / "失业" / "急" 等触发 emergency response

公众号:**仅用于发推送和官方通知**,不在公众号里处理客服(避免误用)。

### 8.5 [v1.1 更新] 应急横条 + 按年龄段差异化

(基础同 v1)

[更新] 触发关键词库按 `users.age_group` 分发:

**全年龄通用触发**:
| 触发词 | 应急内容 |
|---|---|
| `电汇` `汇款` `wire` | "正准备汇款?3 件事先做" |
| `IRS` `CRA` | "假冒税务局?5 秒识别法" |

**65+ 老年专属触发**:
| 触发词 | 应急内容 |
|---|---|
| `中奖` `中彩票` `公证处` | "中奖电话 = 100% 诈骗" |
| `儿子` `女儿` `孙子` + `急` | "假冒亲属求救?3 步验证" |
| `国安` `公检法` `通缉` | "国安电话 = 100% 诈骗" |
| `保健品` `特效` + 价格关键词 | "保健品骗局识别" |
| `养老金` `OAS` `回收` | "OAS 诈骗最新手法" |

**青年专属触发**:
| 触发词 | 应急内容 |
|---|---|
| `H-1B` `OPT` `身份` | "拒签后的法律选项" |
| `房产` `closing` | "签约前最后检查清单" |
| `面试` `录用` + `押金` | "假冒招聘押金骗局" |

老年用户的应急横条:**字号更大、动画更慢、解释更长**。

### 8.6 E-E-A-T

(同 v1,略)

### 8.7 [v1.1 新增] 信任分透明化 + 申诉

任何信任分变化都触发 `trust_score_events` 记录,用户立即收到通知:

```
"-3 分 · 原因:你的上报内容触发了 Level-1 NER 风险标记
        (可能涉及具名指控的措辞)
 → 详细引用:社区准则 §4.2
 → 这次没有直接处罚,请阅读后再发新上报
 → 觉得扣分错误?7 天内可申诉 →"
```

申诉流程:

1. 用户点"申诉" → 简短陈述(≤ 500 字)
2. 系统将原行为 + 申诉提交给平台审核员
3. 48h 内决定:
   - 维持扣分 → 通知用户 + 引用规则
   - 撤销扣分 → 还原 + 道歉
   - 部分撤销 → 减少扣分幅度

申诉决定**可再次申诉一次**(escalate to admin),admin 决定是 final。

**社区准则 §4 公开发布**,完整列出每类扣分行为的范围,杜绝"shadow penalty"感。

### 8.8 [v1.1 新增] 私信策略 · MVP 不上

**Phase 1-3 不上 user-to-user 私信**。所有用户间沟通走:

1. 公开评论 + @ 提及
2. "联系作者"按钮 → 消息先进入审核员队列 → 通过后送达
3. 平台公告 → admin 主动推送

私信被武器化是 UGC 平台**最大的隐藏雷区**(诽谤、骚扰、社工攻击、钓鱼)。MVP 不上,**等到有专门的反滥用团队和 trust & safety 能力后再考虑**(Phase 5+)。

---

## 9. API 概要

(同 v1,略)

[v1.1 新增]

```
# 微信 / 长辈相关
POST   /api/auth/wechat/initiate         发起微信 OAuth
GET    /api/auth/wechat/callback         OAuth 回调
POST   /api/setup-for-elder              创建长辈代设置 token
GET    /api/elder-login/{token}           父母扫码登录

# 家庭计划
GET    /api/me/family                    家庭计划详情
POST   /api/me/family/invite             邀请家庭成员
DELETE /api/me/family/members/{user_id}

# UGC dispute
POST   /api/disputes                      提交异议(无需登录)
GET    /api/disputes/{id}                 进展查询(token 鉴权)
GET    /api/me/disputes                   我的内容相关 dispute

# 信任分申诉
POST   /api/trust-score/appeal           对某次扣分申诉
GET    /api/me/trust-score/history       我的信任分历史

# 用户偏好
PATCH  /api/me/preferences                字号、UI 模式、语言、年龄段

# 库
GET    /api/me/library?type={purchased|subscribed|bookmarked}
```

---

## 10. 隐私 & 法律合规

### 10.1 (同 v1)

### 10.2 [v1.1 增强] 防诽谤 + 匿名身份保护

UGC 三层防护(见 §8.2)。**新增承诺**:

**匿名用户身份保护**:
- 平台**绝不**将匿名 UGC 用户的真实身份(姓名、邮箱、IP、设备指纹)透露给任何 dispute 提交方
- 例外仅限:
  - 加拿大法院签发的 court order
  - 美国法院签发的 subpoena(若用户在美)
  - 加拿大 RCMP / 美国 FBI 的正式调查请求(刑事案件)
- 平台收到上述强制要求后,**第一时间通知用户**(法律允许的情况下),给用户机会自行应诉
- 用户可以选择 "vault" 模式:任何法律请求来时,平台先冻结 30 天给用户准备律师

这条承诺写进:
- ToS §匿名权
- Community guidelines §你的权利
- 隐私政策 §对法律请求的回应
- 公司内部审核手册

### 10.3 内容警示

(同 v1)

---

## 11. 技术栈建议

### 11.1 基础栈

(同 v1)

### 11.2 [v1.1 重写] 微信生态集成

**必做组件**:

| 组件 | 实现 | 备注 |
|---|---|---|
| 微信 OAuth(开放平台) | 申请微信开放平台账号 → 网页应用 | 需要主体公司(可走加拿大注册) |
| 微信 JSSDK | 接入 wechat-js-sdk | 用于内置浏览器内的分享、支付、扫一扫 |
| UA 检测 | 检测 `MicroMessenger` 关键字 | 引导跳出 / 启用 JSSDK 模式 |
| 公众号 | 注册微信公众号(订阅号 / 服务号) | 服务号可发模板消息,订阅号一天一推 |
| 客服微信 | 独立企业微信账号 | 不放主公众号里 |

**微信内置浏览器适配清单**(出 bug 最多):
- Cookie 隔离:不能依赖 cookie,需用 token-based auth
- 文件上传:必须用微信 JSSDK 的 `chooseImage`
- 支付:必须用微信 JSSDK 的 `chooseWXPay`(若开微信支付)
- 分享:必须用微信 JSSDK 的 `updateAppMessageShareData`
- 复制链接:`document.execCommand('copy')` 在微信里不工作,需用 clipboard.js + fallback toast
- 视频:H.264 baseline + 短于 10 分钟,否则播放有问题

**WeChat Pay 不上**:涉及国内合规、外汇管制、跨境结算,在 MVP 阶段不值得。

### 11.3 [v1.1 新增] 支付与税务

- Stripe Checkout(必须配 locale: 'zh')
- Stripe Tax(0.5% / 笔)
- Stripe Customer Portal(用户自助管理订阅)
- Stripe Webhook 处理订阅状态变化
- 备用支付:PayPal (Stripe 集成) / Apple Pay / Google Pay / Interac (ACSS)

### 11.4 [v1.1 新增] SMS 与老年模式通知

- SMS 服务:Twilio(全球) 或 Plivo(加拿大友好)
- 老年用户紧急警报通过 SMS 送达(若用户提供电话)
- 加拿大 SMS 合规:遵守 CASL(Canadian Anti-Spam Legislation),需用户明示同意
- 美国 SMS 合规:TCPA + 10DLC 注册
- 周一 9 AM 老年版 digest 发邮件 + SMS 双通道

---

## 12. [v1.1 调整] 开发顺序

### Phase 0 · 基建(2 周)

(同 v1)

### Phase 1 · MVP 媒体站(增加到 6 周,Critical 项前置)

[新增的 Critical 任务,**必须在 Phase 1 完成**]:

- ★ 微信 OAuth + 内置浏览器 UA 检测 + 分享 SDK
- ★ Stripe Checkout(locale: zh + Apple Pay + Google Pay + PayPal + Interac)
- ★ 货币本地化显示(CAD/USD)+ Stripe Tax
- ★ 游客模式(commit action 才登录)
- ★ Accessibility 基础(字号控制 + 简化模式)

不变的 Phase 1 内容:首页 / 文章 / SEO 专题 / 搜索 / 地区选择器 / 创作者中心基础版 / 30 篇创刊文章 + 20 个骗局档案。

**Phase 1 总时长从 4 周延长到 6 周**,但保证上线即合格。

### Phase 2 · 互动 + dispute 准备(5 周)

(基础同 v1)+ 新增:
- ★ UGC dispute 流程基础版(收件 + 审核员后台)
- ★ 信任分透明化 + 申诉
- ★ 微信公众号 + 客服微信对接
- 应急关键词按年龄段差异化

### Phase 3 · UGC + 完整防护(7 周)

(基础同 v1)+ 新增:
- ★ 匿名身份保护承诺写进所有法律文档
- 平台-审核员-律师三层 dispute resolution 完整跑通
- identity_tags + topic_interests 扩展

### Phase 4 · 桌面创作者 + 长辈模式 + 家庭(5 周)

(基础同 v1)+ 新增:
- ★ 为长辈设置模式 + QR 代登录
- ★ 家庭计划(订阅 + 共享)
- ★ 老年 UI 模式完整版

### Phase 5 · 规模化 + 老年语音上报(持续)

(同 v1)+ 新增:
- 老年模式语音上报 + 电话回访
- 繁简体切换
- 私信(若 trust & safety 团队就位)

**总时间预算调整:Phase 0-4 约 6 个月**(v1 是 5 个月),延长 1 个月换 6 项 Critical UX 保障。

---

## 13. 开放问题

(同 v1,补充)

[v1.1 新增]:

8. **公众号定位**:服务号还是订阅号?服务号能推模板消息但每月只能 4 次群发;订阅号每天 1 次但用户看不到通知。**建议:订阅号 + 服务号双开**
9. **微信支付要不要开**?涉及国内合规、外汇、跨境结算,**建议:MVP 不上,Phase 5 评估**
10. **家庭计划的"父母代管账号"**法律上是子女的账号还是父母的账号?涉及隐私和数据所有权
11. **dispute 申诉律师 retainer 预算**:每季度 $5-10k 是底线吗?需要法务报价
12. **CASL / TCPA 合规咨询**:需要找一位熟悉北美 SMS 合规的律师

---

## 14. 附录 · 设计资产清单

(同 v1,补充)

[v1.1 新增] 走查记录:

- 6 个真实用户场景 walkthrough(王秀芬 + 父母),发现 23 项 UX 缺漏
- Persona walkthrough 文档(在 chat 历史中),建议产品 / 设计师 / 开发各读一遍
- Spec v1.1 由 v1 + 23 项补丁构成,本文档已完整整合

---

*文档结束 · v1.1 · 2026.06*
*下次重大修订前置条件:Phase 1 上线 6 周后,基于真实数据迭代权重和 UX*
*同时:Phase 1 完成时应该再做一轮 persona walkthrough(扮演不同 persona)*
