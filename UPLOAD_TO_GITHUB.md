# 上传到 GitHub · 5 分钟教程

下载 `avoidthepit-seed.zip` 并解压后,按下面任一方式上传到你的 GitHub。

---

## 方式 A · GitHub 网页(最简单,0 命令行)

1. 打开 https://github.com/new
2. 填:
   - Repository name: `avoidthepit`
   - Description: `北美华人防骗社区平台 · Avoid The Pit`
   - 选 **Private**(强烈推荐 MVP 期保持私有)
   - **不要勾** "Initialize this repository with README"(我们已有 README)
3. 点 "Create repository"
4. 在新仓库页面,点 "**uploading an existing file**" 链接
5. 把解压后的所有文件 / 文件夹**拖到上传框**
6. Commit message: `Initial commit: spec v1.1 + Next.js scaffold + design references`
7. 点 "Commit changes"

完成。

---

## 方式 B · GitHub Desktop(图形界面)

1. 下载 [GitHub Desktop](https://desktop.github.com/)(免费)
2. 登录你的 GitHub 账号
3. File → Add Local Repository → 选解压后的文件夹
4. 它会提示初始化 git,点 "Create a Repository"
5. Repository name 填 `avoidthepit`
6. Description 自填
7. 主菜单 → Publish repository
8. 勾 **Keep this code private**
9. 点 Publish

完成。

---

## 方式 C · 命令行(已会 git 的人)

```bash
cd ~/Downloads/avoidthepit-seed  # 改成你解压的路径

git init
git branch -M main
git add .
git commit -m "Initial commit: spec v1.1 + Next.js scaffold + design references"

# 用 GitHub CLI(推荐)
gh repo create avoidthepit --private --source=. --push

# 或手动:
# 1. 在 github.com/new 创建空仓库 avoidthepit(不要 init README)
# 2. 然后:
git remote add origin https://github.com/<your-username>/avoidthepit.git
git push -u origin main
```

---

## 上传后验证

1. 仓库主页应该看到完整目录树
2. README.md 自动渲染在首页
3. 进入 `docs/` 看到两份 spec
4. 进入 `design-references/mobile/` 能直接预览 region-picker.html(GitHub 自带预览)

---

## 上传后给开发者发什么

发一条消息(微信 / Slack / Email):

> 仓库 + 文档已准备好:
> https://github.com/<your-username>/avoidthepit
>
> 第一步:cd 进去看 README.md,然后读 docs/avoidthepit_technical_spec_v1.1.md
> 第一周任务:docs/PHASE_0_TASKS.md
>
> 有任何问题在 GitHub Issue 提,或微信我。

---

## 注意

- ⚠️ **不要** commit `.env.local` 或任何含 secret 的文件(`.gitignore` 已设置)
- ⚠️ **不要** 把仓库设成 public —— spec 里有详细的算法决策、商业策略、定价,**对竞争对手等于送一份产品蓝图**
- ⚠️ 招开发后,加他们为 collaborator(Settings → Collaborators),**不要直接给主账号密码**

完成上传后这份文件可以删了,或留作内部文档。
