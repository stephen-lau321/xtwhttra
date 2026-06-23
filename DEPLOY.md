# 一街一师一乐器 - 部署指南

## 前置条件
- GitHub 仓库: stephen-lau321/xtwhttra
- Render.com 账号: https://notenear.onrender.com (已注册)

---

## 1. 推送代码到 GitHub

> 你在本地跑一下这些命令（需要先安装 Git）：

```bash
cd F:\软件\自定义 Office 模板\codex\street-music
git init
git add .
git commit -m "一街一师一乐器"
git remote add origin https://github.com/stephen-lau321/xtwhttra.git
git push -u origin main
```

---

## 2. 部署后端到 Render

在 Render Dashboard 创建 **Web Service**，连接 `stephen-lau321/xtwhttra` 仓库，然后按以下配置：

| 配置项 | 值 |
|--------|-----|
| **Name** | notenear |
| **Root Directory** | `backend`（注意：不是 street-music/backend） |
| **Runtime** | Node |
| **Build Command** | `npm install && npx prisma generate --schema=prisma/schema.prod.prisma && npx nest build` |
| **Start Command** | `node dist/main.js` |
| **Plan** | Free |

### 环境变量（Environment Variables）

在 Render 的 **Environment** 选项卡添加：

| 变量名 | 值 |
|--------|-----|
| `DATABASE_URL` | Render 提供的 PostgreSQL 连接串（在 Render 新建一个 PostgreSQL → 复制 Internal Database URL） |
| `JWT_SECRET` | 随便填一个随机字符串，例如 `a1b2c3d4e5f6g7h8i9j0` |
| `JWT_EXPIRES_IN` | `30d` |
| `AMAP_API_KEY` | `f1392fa410619aad5a6b18ee6da3c168` |
| `PORT` | `10000`（Render 自动设置，也可以不加） |

### 创建 PostgreSQL 数据库

Render Dashboard → 新建 → **PostgreSQL** → 创建后复制 **Internal Database URL** 填入 DATABASE_URL。

---

## 3. 部署前端到 GitHub Pages

a) 在本地重新构建前端（使用 Render 的 API 地址）：

```bash
cd F:\软件\自定义 Office 模板\codex\street-music\frontend
npm run build
```

b) push 到 GitHub

c) GitHub 仓库 → **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: `main`
- Directory: `/frontend/dist`
- 保存

几分钟后前端在 `https://stephen-lau321.github.io/xtwhttra/` 上线。

---

## 4. 高德地图安全域名

打开 https://console.amap.com/dev/key/app
- 安全域名加上 `stephen-lau321.github.io`
- 如果使用自定义域名，也加上

---

## 5. 日常维护

```bash
# 查看后端日志
Render Dashboard → notenear → Logs

# 重新部署
Render Dashboard → notenear → Manual Deploy → Deploy latest commit

# 更新代码
git add . && git commit -m "更新说明" && git push
```

---

## 本地开发

```bash
# 后端（需要先启动后端）
cd F:\软件\自定义 Office 模板\codex\street-music\backend
npx nest start

# 前端
cd F:\软件\自定义 Office 模板\codex\street-music\frontend
npx vite
```