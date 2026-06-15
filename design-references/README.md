# Design References · 设计参照

这个目录包含 17 个完整 mockup 的 HTML 源码,**作为开发实现的视觉参照**。

## 怎么用

每个 .html 文件可以直接用浏览器打开,看实际渲染。**实现对应组件 / 页面时**:

1. 浏览器打开 .html 看视觉
2. 同步看 `/docs/avoidthepit_technical_spec_v1.1.md` 对应 § 看规范
3. 用 React + Tailwind + ATP 组件库重写,**不要直接复制 HTML 代码**(那是设计稿,不是产品代码)

## 移动端 (mobile/)

| 文件 | 对应 spec § | 描述 |
|---|---|---|
| `home-cascade.html` | §5 §7 | 首页(级联推荐,4 段) |
| `article-detail.html` | §5 §3.2 | 文章详情(地区感知) |
| `paywall.html` | §8.3 | 付费墙 |
| `ugc-scam-report.html` | §8.2 | UGC 上报 |
| `seo-topic.html` | §5 §8.6 | SEO 专题 |
| `me-profile.html` | §5 | 我的 + 公开主页 |
| `creator-center.html` | §3.2 | 创作者中心 |
| `messages.html` | §3.2 | 消息中心 |
| `search-results.html` | §8.5 | 搜索结果 |
| `region-picker.html` | §7.4 | 地区选择器(简化版) |
| `onboarding-3screens.html` | §7.6 | Onboarding(2-4 屏) |

## 桌面端 (desktop/)

| 文件 | 对应 spec § | 描述 |
|---|---|---|
| `home.html` | §5 §4.3 | 桌面首页 |
| `article-detail.html` | §4.3 | 桌面文章详情 |
| `seo-topic.html` | §4.3 | 桌面 SEO 专题 |
| `creator-analytics.html` | §3.2 | 创作者中心数据视图 |

## 关于 mockup 源码

⚠️ 这些 HTML 是**视觉参照,不是产品代码**:

- 颜色用了硬编码(实现时**必须**用 CSS 变量,见 `app/globals.css`)
- 没有交互逻辑(实现时按 spec §3 加状态机)
- 没有数据连接(实现时连 Prisma + tRPC)
- 字号是固定的(实现时支持 `data-font-size` 切换,见 §2.7)

## 找不到 mockup 源文件?

如果这个目录是空的或者只有部分文件,源码在 chat 历史里(产品负责人保留),需要从 chat 导出。每个 mockup 都是一个独立的 HTML widget(`visualize:show_widget` 输出),可以从 chat 中 inspect element 拿到完整 HTML。

**建议**:产品/设计师导出后用文件名 `{component}-{platform}.html` 命名,放入此目录。
