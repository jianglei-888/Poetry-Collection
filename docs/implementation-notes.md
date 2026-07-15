# 项目实现索引（内部文档）

> 本文档是 `README.md` 拆分后的**内部工程实施索引**，对应 `AGENTS.md` 中「任务完成后必须维护的文档」一节。  
> 阅读对象：接手本项目的工程师 / Agent。  
> 风格：代码视角，回答"下次怎么改"；产品动机请看 `E:\myproject\诗歌集设计文档.md`。

---

## 1. StarterKit 中哪些是"真正的脚手架"、哪些是"占位"

### 1.1 需要保留（核心脚手架）

- **ServiceInvoker 路由 + 安全特性**：`Services/App.ServiceInvoker/*`
  - 核心请求路由机制。功能开发应通过新增/修改 **Managers** + **DTOs** 来实现，而不是修改 ServiceInvoker。
- **后端启动 / 依赖注入**：`Services/App.Api/Program.cs`
  - 注册 Managers / Engines / Accessors、配置、CORS、数据库，并映射 ServiceInvoker 端点。
- **核心基础设施 Accessor**（真实实现）：
  - `Services/App.Api/Accessors/DatabaseAccessor.cs`（Marten / Postgres）
  - `Services/App.Api/Accessors/AuthAccessor.cs`（Supabase 认证）
  - `Services/App.Api/Accessors/BlobStorageAccessor.cs`（Supabase 存储）
- **前端脚手架**：路由、认证状态、生成的 API 层接入、Tailwind / ShadCN 基础配置，以及共享 UI 基础组件集合。

### 1.2 占位 / 示例（需要被替换）

- **示例领域与 engine**（仅作演示）：
  - `Services/Contracts.Domain/Enums/SampleEnum.cs`
  - `Services/Contracts.Domain/Logic/SampleLogicContract.cs`
  - `Services/App.Api/Engines/SampleEngine.cs`
- **示例 / 占位页面**（替换为应用的实际页面）：
  - `react-app/src/views/ExampleView.tsx`
  - `react-app/src/views/NotFoundView.tsx`

---

## 2. 实现索引

### 2.1 前端页面（Views）

- `react-app/src/views/PoemHomeView.tsx` — 公开首页，展示夜空氛围下的精选诗歌入口，并以散落式场景卡承载访客进入阅读的起点。
- `react-app/src/views/PoemDetailView.tsx` — 公开诗歌详情页，展示单首作品的沉浸式阅读框、背景插画氛围层与逐行淡入正文。
- `react-app/src/views/NotFoundView.tsx` — 404 兜底页面。
- `react-app/src/views/UnauthorizedView.tsx` — 已登录但无权限访问受保护路由时的兜底页面。
- `react-app/src/views/ExampleView.tsx` — 保留的 starter 占位页，当前已不作为默认首页使用。

### 2.2 前端组件（Components）

- `react-app/src/components/ErrorBoundary.tsx` — 全局错误边界。
- `react-app/src/components/ui/button.tsx` — ShadCN button 基础组件，用于主要与次要操作。
- `react-app/src/components/ui/badge.tsx` — ShadCN badge 基础组件，用于紧凑的状态或标签。
- `react-app/src/components/ui/calendar.tsx` — ShadCN calendar 基础组件，用于较丰富的日期选择。
- `react-app/src/components/ui/card.tsx` — ShadCN 表面 / 容器基础组件，用于分组内容。
- `react-app/src/components/ui/checkbox.tsx` — ShadCN checkbox 基础组件，用于布尔与多选输入。
- `react-app/src/components/ui/dialog.tsx` — ShadCN dialog 基础组件，用于聚焦的模态流程。
- `react-app/src/components/ui/dropdown-menu.tsx` — ShadCN dropdown menu 基础组件，用于上下文操作菜单。
- `react-app/src/components/ui/input.tsx` — ShadCN 单行文本输入基础组件。
- `react-app/src/components/ui/label.tsx` — ShadCN label 基础组件，用于无障碍表单。
- `react-app/src/components/ui/navigation-menu.tsx` — ShadCN navigation menu 基础组件，用于更高层级的导航结构。
- `react-app/src/components/ui/popover.tsx` — ShadCN popover 基础组件，用于锚定上下文内容。
- `react-app/src/components/ui/select.tsx` — ShadCN select 基础组件，用于受控选项选择。
- `react-app/src/components/ui/textarea.tsx` — ShadCN 多行文本输入基础组件。
- `react-app/src/components/ui/separator.tsx` — ShadCN separator 基础组件。
- `react-app/src/components/ui/sheet.tsx` — ShadCN sheet 基础组件，用于抽屉与侧边面板交互。
- `react-app/src/components/ui/switch.tsx` — ShadCN switch 基础组件，用于开关类设置。
- `react-app/src/components/ui/table.tsx` — ShadCN table 基础组件，用于结构化的行列展示。
- `react-app/src/components/ui/tabs.tsx` — ShadCN tabs 基础组件，用于分区组织。
- `react-app/src/components/ui/tooltip.tsx` — ShadCN tooltip 基础组件，用于密集的上下文提示。
- `react-app/src/lib/utils.ts` — 共享的 `cn()` 工具函数，用于组合 Tailwind 类名。
- `react-app/src/components/poems/PoemSceneShell.tsx` — 诗歌前台共用场景外壳，负责星空背景、插画铺底与整体遮罩层次。
- `react-app/src/components/poems/PoemHomeCard.tsx` — 首页精选诗歌场景卡，承载同图裁切、柔和发光与缓慢放大反馈。

### 2.3 前端状态（Stores）

- `react-app/src/auth/AuthStore.ts` — 基于 `SessionDto` 的认证 / 会话状态；保存 access / refresh token，但自身不执行刷新。

### 2.4 Managers

- `Services/App.Api/Managers/AuthManager.cs` — 认证相关端点。
  - 方法：`Login`、`SignUp`、`SendPasswordResetEmail`、`GetSession`、`ChangePassword`、`UpdateUserEmail`、`UpdateUserPassword`、`UpdateUserName`。
- `Services/App.Api/Managers/PoemManager.cs` — 公开诗歌读取入口。
  - 方法：`GetFeaturedPoems`、`GetPoemDetail`。

### 2.5 Engines

- `Services/App.Api/Engines/SampleEngine.cs` — 占位示例的无状态 engine，请替换为真实 engine。

### 2.6 Accessors

- `Services/App.Api/Accessors/DatabaseAccessor.cs` — Marten 文档数据库操作。
- `Services/App.Api/Accessors/AuthAccessor.cs` — Supabase 认证操作。
- `Services/App.Api/Accessors/BlobStorageAccessor.cs` — Supabase 文件 / 存储操作。
- `Services/App.Api/Accessors/LocalDatabaseAccessor.cs` — 本地替代数据库实现，在 Development（本地）模式下使用。
- `Services/App.Api/Accessors/LocalAuthAccessor.cs` — 本地替代认证实现，在 Development（本地）模式下使用。
- `Services/App.Api/Accessors/LocalBlobStorageAccessor.cs` — 本地替代存储实现，在 Development（本地）模式下使用。

---

## 3. 关键流程

### 3.1 公开诗歌阅读流程

1. 访客打开 `/`，前端 `PoemHomeView` 调用 `PoemManager.GetFeaturedPoems` 读取首页精选诗歌。
2. 后端 `PoemManager` 通过 `IDatabaseAccessor` 读取被标记为 `IsFeaturedOnHome` 的诗歌，并按 `FeaturedOrder` 返回卡片所需最小数据。
3. 本地开发环境下，`LocalPoemSeedService` 会在首次读取时补充示例诗歌数据，确保首页和详情页有真实内容可用。
4. 首页以 `PoemHomeCard` 呈现同一张插画的局部取景，只显示诗名，并提供柔和发光与缓慢放大的进入反馈。
5. 访客点击卡片后进入 `/poems/:poemId`，`PoemDetailView` 调用 `PoemManager.GetPoemDetail` 读取单首诗完整内容。
6. 详情页复用同一张插画作为背景氛围层，在中央阅读框中展示标题、作者与逐行淡入的诗句。

### 3.2 后端 → 前端 HTTP 流式（NDJSON）

本 StarterKit 支持 ServiceInvoker 流式 RPC 模式（基于 `fetch()` 的按行 JSON，NDJSON）：

1. 前端调用 `ApiClient.streamMethod(...)`（或它的薄封装）向流式端点发起 POST。
2. 后端调用返回 `IAsyncEnumerable<T>` 的 manager 方法，并将每个元素以 NDJSON 形式流出。

端点：`POST /api/stream`。详见：`docs/service-invoker-streaming.md`。

相关文件：

- 后端：`Services/App.ServiceInvoker/Endpoints/ServiceInvokerEndpoints.cs` + `Services/App.ServiceInvoker/Reflection/ServiceMethodInvoker.cs`
- 前端：`react-app/src/api/ApiClient.ts`（`streamMethod`）

---

## 4. 认证与角色

- 前端在 ServiceInvoker 请求体中携带当前的 access / refresh token。
- ServiceInvoker 在调用 manager 之前统一确保 / 刷新 token，并返回包含刷新后 token 与 `SessionDto` 的认证信封。
- 认证刷新 **不会** 调用前端的 `ApiClient`，以避免递归刷新循环。
- `AuthManager` 实现了 `IAuthTokenManager`，因此 ServiceInvoker 只有一个认证协调依赖，能在一次调用中完成 token 刷新与请求鉴权。
- `AuthenticatorEngine` 包含与具体提供方无关的 JWT 校验与常用 claim 提取逻辑。`LocalAuthAccessor` 与 `AuthAccessor` 负责各自提供方特有的 token 生成、刷新、校验参数，以及 Supabase JWKS 处理。
- Supabase 的登录 / 注册 / 刷新响应由 `AuthAccessor` 统一归一化：token 可能来自顶层响应字段，也可能来自嵌套的 provider `Session` 对象，但应用层对外始终暴露同样的 `AccessToken` / `RefreshToken` 结构。
- StarterKit 不内置有立场的登录 / 注册页面。默认首页路由是公开的，使脚手架出来的应用无需登录界面也能直接启动。只有当应用真正需要交互式登录时，才去新增项目专属的登录页面。
- 受保护路由在本地读取 session，并在失败时提供重试 / 登出；若没有任何 token，则跳转到公开首页；角色校验失败则跳转到未授权页面。
- 前端认证 store 只持久化完整的认证状态：access token + refresh token + `SessionDto`。如果注册成功但 Supabase 还需要后续步骤才发放 token，则 `SignUpResponseDto.RequiresFollowUp` 为 true，此时 UI 应提示后续步骤，而不是存储一份残缺的认证状态。
- 角色保存在 Supabase **app_metadata**（JWT claim `app_metadata.roles`）中，由 ServiceInvoker 的角色特性校验。
- 角色管理更新必须使用 Supabase 的 secret key，并写入 `app_metadata`。
- 当 manager 返回 `SessionDto` 时，ServiceInvoker 直接以该返回值作为 `envelope.Session`；否则回退到一份基于 `HttpContext.User` 的基础 session。把项目特有的 session 字段放在 `SessionDto` 上，并由面向 session 的 manager 方法返回，避免增强后的 session 状态丢失。
- access token 与 refresh token 在 ServiceInvoker 请求体与响应信封中流转。请把 `AccessToken` 与 `RefreshToken` 当作机密：绝不打印包含它们的请求体、绝不展示在 UI / 报错中，并在诊断 / 工具输出中打码。

### 4.1 ServiceInvoker 认证流程（本地 + 云端）

- ServiceInvoker 通过请求体中的 token 与方法上的特性，对 manager 方法调用进行认证与鉴权。
- 生产环境通过由 `SupabaseId` 派生的 JWKS 校验 Supabase JWT；本地开发使用本地 JWT。
- 详见 `docs/service-invoker-auth-flow.md`。

### 4.2 配置项

- Supabase 认证 / 存储 / 数据库的配置由 StarterKit 部署 / 配置流水线提供。不要再添加重复的 `SupabaseUrl` 或 `SupabaseJwksUrl` 配置项；运行时代码在需要时会从 `SupabaseId` 派生认证 URL。

---

## 5. 近期重要修复

### 5.1 首页↔详情页"小卡片一闪"已修（2026-07-08）

**现象**：首页点诗 → 路由切到详情页瞬间，article 容器以"标题/作者/× 按钮已就位 + 诗槽空"那一帧 paint，被用户视觉系统读成"先小卡片后大卡片"。

**根因**：stagger 动画启动前 `lines` 还没就位，article 容器渲染时诗槽全空。**不能砍 stagger**（产品设计意图"诗逐行显现"），只能让诗在 mount 时已就位。

**修法**：三层模块级缓存协同
- [react-app/src/api/PoemManager.ts](react-app/src/api/PoemManager.ts) — `featuredCache` + `detailCache` + `inflightDetail`（并发去重）
- [react-app/src/components/poems/PoemHomeCard.tsx](react-app/src/components/poems/PoemHomeCard.tsx) — 卡片 `onMouseEnter / onFocus` 触发 `prefetchPoemDetail`
- [react-app/src/views/PoemDetailView.tsx](react-app/src/views/PoemDetailView.tsx) — `useState` 初值从 `getDetailCache` / `getFeaturedCache` 拿

**结果**：鼠标 hover 后再点诗，详情页 mount 首帧就是完整诗，stagger 启动走 9 秒逐行显现，**没有"诗槽空"那一帧**。

**未覆盖的边缘场景**：触屏 / 键盘 Tab 直按 Enter（无 hover），prefetch 不触发，详情页仍会出现"小卡片"一闪。

**详见**：`E:\myproject\诗歌集实施备忘.md` 第七章。
