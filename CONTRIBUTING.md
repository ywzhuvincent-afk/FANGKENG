# CONTRIBUTING

## 提交流程

1. 从 `develop` 拉 feature branch:`git checkout -b feat/something`
2. 提交,follow conventional commits:`feat: 实现地区选择器`
3. PR 到 `develop`,**必须填 PR 模板**
4. CI 必须全绿
5. 1 reviewer 通过后 squash merge

## Commit 规范

```
feat:    新功能
fix:     bug 修复
docs:    文档
style:   格式(不改逻辑)
refactor: 重构
test:    测试
chore:   构建 / 依赖 / 工具

例:
feat(geo): 实现地区级联推荐算法 (spec §7.3)
fix(payment): Stripe Checkout locale 改为 zh
```

## 代码风格

- TypeScript strict 模式必开
- Prettier 自动 format
- ESLint 跑过
- 不允许 `@ts-ignore`(用 `@ts-expect-error` 加注释)

## Spec 是真相源

**任何代码决策有疑问时,先看 `docs/avoidthepit_technical_spec_v1.1.md`**。

如果你觉得 spec 错了,**不要直接改代码**,先开 GitHub Issue 讨论,达成共识后 PR 同时改 spec 和代码。

## 分支保护

- `main`:只接 release PR,从 `develop` 来
- `develop`:1 reviewer approval,CI 必绿
- `feat/*` / `fix/*`:开发分支

## 安全

- 不要 commit 任何 secret(检查 .gitignore)
- 发现安全问题不要开 public issue,发邮件给 security@avoidthepit.com
- 任何处理用户 PII 的代码必须有 security review

## 提问

- 技术问题:GitHub Issue
- 产品问题:微信群(见 onboarding 文档)
- 紧急问题(prod 宕机):微信 + 电话
