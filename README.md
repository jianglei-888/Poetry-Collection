# 诗夜 · Poetry Collection

一个沉浸式的诗歌阅读产品。

夜空下读诗——首页精选一组作品，每张卡片是一张完整的夜空插画，点击进入后诗在画面中央逐行显现。

由 `jianglei` 个人开发。

---

## 体验入口

- 首页：散落式精选卡片，鼠标悬停时有微弱发光与缓慢放大反馈
- 详情页：单首诗沉浸阅读，诗行逐句淡入，背景沿用首页同一张插画
- 全站无需登录即可阅读

---

## 技术栈

- **前端**：React 18 + TypeScript + Vite + Tailwind CSS + ShadCN UI
- **后端**：.NET 8 Web API
- **认证 / 文件存储**：Supabase
- **数据库**：MartenDB（PostgreSQL）

---

## 本地运行

```bash
# 前端
cd react-app
npm install
npm run dev

# 后端
dotnet build Services/Services.sln
```

需要 Node.js 与 .NET 8 SDK。

---

## 关于本仓库

- 本仓库是产品源码仓库，不是脚手架仓库。
- 关于"哪些是基础设施、哪些是占位"、"manager / engine / accessor 分层"、"关键流程"等内部工程说明，见 [docs/implementation-notes.md](docs/implementation-notes.md)。
- 关于 ServiceInvoker 认证与流式 RPC 的细节，见 `docs/service-invoker-auth-flow.md` 与 `docs/service-invoker-streaming.md`。
