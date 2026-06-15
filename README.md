# Avoid The Pit · 避坑指南

> 北美华人防坑防骗 + 民生政策社区平台
> Next.js 14 · TypeScript · PostgreSQL · Tailwind · shadcn/ui

---

## 这是什么

一个按"省/州"地理切片的、本地化中文防骗 + 民生政策媒体兼社区,面向北美华人。通过订阅 + 单篇付费 + 创作者分成变现。

完整产品描述见 `docs/avoidthepit_technical_spec_v1.1.md`(必读)。

---

## 给接手开发的工程师

**欢迎。开工前请按这个顺序读:**

1. **本 README**(你正在看)— 5 分钟
2. **`docs/avoidthepit_technical_spec_v1.1.md`** — 90 分钟,这是产品全部决策
3. **`design-references/`** 目录下的 17 个 HTML mockup — 边看边对照 spec
4. **本目录里的脚手架代码** — 30 分钟看一遍组织结构

**特别注意 spec 里的几节:**
- §2 品牌系统(色板 / 字体 / 圆角 token,绝对不可硬编码)
- §7.3 推荐算法公式(系数是产品决定的,可调,但要告知 PM)
- §8.2.5 UGC dispute resolution(整个流程都要建)
- §8.3 支付/订阅/家庭/货币/税务(Stripe Tax 必启)
- §10.2 匿名身份保护承诺(写进数据访问规则)
- §11.2 微信生态集成(MVP 必做)

---

## 快速启动

```bash
# 1. 装依赖
npm install

# 2. 复制环境变量
cp .env.example .env.local
# 编辑 .env.local 填上 DATABASE_URL / STRIPE_SECRET_KEY / WECHAT_APP_ID 等

# 3. 启动 PostgreSQL(用 Docker 最方便)
docker run -d --name atp-pg -e POSTGRES_PASSWORD=atp -p 5432:5432 postgres:15

# 4. 跑数据库 migration
npx prisma migrate dev

# 5. 启动开发服务器
npm run dev
```

打开 http://localhost:3000

---

## 目录组织

```
avoidthepit/
├── docs/                          # spec v1 + v1.1,产品决策的唯一真相源
├── design-references/             # 17 个 HTML mockup(看实物参照)
│   ├── mobile/                    # 13 个移动端
│   └── desktop/                   # 4 个桌面端
├── app/                           # Next.js 14 App Router
│   ├── _public/                   # 不需要登录的页面
│   ├── _authed/                   # 需要登录
│   │   ├── me/                    # 我的
│   │   ├── creator/               # 创作者中心
│   │   └── messages/              # 消息中心
│   └── api/                       # API routes
├── components/
│   └── atp/                       # 业务组件(ATPEmergencyBanner 等)
├── lib/
│   ├── db/                        # Prisma client
│   ├── auth/                      # JWT / OAuth / WeChat OAuth
│   ├── geo/                       # IP 地理 / 推荐算法
│   └── wechat/                    # 微信 SDK 封装
├── content/
│   ├── seed-articles/             # 创刊文章(运营提供)
│   └── scam-files/                # 骗局档案
├── prisma/
│   └── schema.prisma              # 数据库 schema
└── .github/                       # CI / issue 模板
```

---

## 关键技术决策(spec 已定,不要私自改)

- **前端框架**:Next.js 14 App Router,**强制 SSR**(SEO 必需)
- **数据库**:PostgreSQL 15 + Prisma ORM
- **样式**:Tailwind + CSS 变量(token 全部在 `app/globals.css`)
- **UI 组件**:shadcn/ui + Radix Primitives(可访问性已处理)
- **鉴权**:Clerk(MVP)或自建 JWT(后期),**必须支持微信 OAuth**
- **支付**:Stripe Checkout + Stripe Tax(`locale: 'zh'` 强制)
- **CDN + IP 地理**:Cloudflare(用 `CF-IPCity` 请求头)
- **错误**:Sentry
- **分析**:PostHog 自托管(隐私敏感,不上 GA)

---

## 开发原则

1. **不要写组件,先看 spec §3 组件库**。所有 `ATP*` 组件命名空间已定义,改名要 PR 讨论
2. **不要硬编码颜色/字号**。用 CSS 变量(`var(--atp-accent)`)
3. **每个交互组件提供 8 态**:default / hover / focus / pressed / disabled / loading / error / empty
4. **测试**:Vitest 单测 + Playwright e2e。**关键路径必须有 e2e**(注册 / 付费 / UGC 上报 / dispute)
5. **任何处理用户数据的代码必须考虑** §10 隐私要求(IP 不入库 / 30 天清理 / 匿名保护)
6. **不要装新依赖**前先在 GitHub Issue 里问

---

## 第一周该做什么

参见 `docs/PHASE_0_TASKS.md`(待补)。粗略:

- [ ] Clone 仓库,跑起来
- [ ] 通读 spec v1.1
- [ ] 读完 17 个 mockup
- [ ] 接 Clerk + WeChat OAuth
- [ ] 跑通基础 PostgreSQL + Prisma migration
- [ ] 部署到 Vercel preview 环境
- [ ] 给 product 反馈:spec 里哪些地方有疑问

---

## 联系

技术问题:GitHub Issue
产品问题:微信(见 `docs/team-contacts.md`,不要 commit 到 public 仓库)

---

## License

私有项目,**未授权不得复制 / 分发**。 © 2026 Avoid The Pit Inc.
