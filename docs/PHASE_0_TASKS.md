# Phase 0 · 第一周任务清单

> 给新接手项目的工程师 · 总计 ~ 1 周

## Day 1 · 环境

- [ ] Clone 仓库 `git clone <repo-url>`
- [ ] 安装 Node 20+(用 nvm 推荐)
- [ ] `npm install`
- [ ] 复制 `.env.example` → `.env.local`
- [ ] 启动本地 PostgreSQL(`docker run -d --name atp-pg -e POSTGRES_PASSWORD=atp -p 5432:5432 postgres:15`)
- [ ] `npx prisma migrate dev --name init`
- [ ] `npm run dev` 看到 localhost:3000 跑起来
- [ ] 运行 `npm test`,所有测试绿

## Day 2 · 阅读

- [ ] 读 `README.md` 全文
- [ ] 读 `docs/avoidthepit_technical_spec_v1.1.md` 全文(~ 90 分钟)
- [ ] 浏览 `design-references/` 所有 mockup,**对照 spec 看**
- [ ] 跟 PM 1 on 1,问任何不清楚的产品决策

## Day 3-4 · 基础设施

- [ ] 注册项目 Cloudflare 账号(免费 plan 够 MVP)
- [ ] 把开发域名套上 Cloudflare(DNS 切走)
- [ ] 测试 `CF-IPCity` / `CF-IPCountry` headers 拿得到
- [ ] 注册 Clerk 账号 + 基础接通(spec §11 推荐 Clerk MVP)
- [ ] 注册 Stripe(test mode 即可),创建 Product:Trial / Monthly / Annual / Family
- [ ] 启用 Stripe Tax(后台开关)
- [ ] 注册微信开放平台账号 + 申请网页应用(**审核 5-15 天,越早开始越好**)
- [ ] 设置 Vercel preview 部署

## Day 5 · 第一个真实页面

- [ ] 实现首页骨架(空数据,but 用真实数据结构)
- [ ] 实现 `ATPFontSizeControl` 持久挂顶(已有 stub)
- [ ] 实现 `ATPEmergencyBanner`(已有 stub)
- [ ] 实现地区选择器组件(spec §7.4,对照 `design-references/mobile/region-picker.html`)
- [ ] 部署到 Vercel preview,给 PM 看

## Week 1 结束 review

- [ ] PM + 工程师 1 on 1,梳理 spec 里有没有需要澄清的
- [ ] 把 spec v1.1 没说清楚的地方,在 GitHub 开 issue 讨论 → 共识后改 docs
- [ ] 估算 Phase 1 剩下 5 周的任务拆分
- [ ] 决定:Phase 1 关键路径上的人员 / 时间风险

---

## 第一周不要做的事

- 不要实现 UGC 上报(Phase 3)
- 不要实现 dispute resolution(Phase 2-3)
- 不要实现私信(MVP 不上)
- 不要追求 100% 的 mockup 视觉还原(80% 即可,先跑通流程)
- 不要装新 npm 依赖(开 issue 讨论)

---

## 问题升级路径

1. 卡住 > 2 小时 → GitHub Issue
2. 紧急(影响 Phase 1 进度)→ 微信群
3. 涉及 spec 决策 → 跟 PM 1 on 1
4. 涉及法律 / 隐私 → 暂停,等 PM 咨询律师
