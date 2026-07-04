# 本仓库 Agent 指令

## 文档语言约定

- **所有文档一律中文**：代码注释、Markdown 文档、本仓库所有 `.md` 文件默认用中文撰写。用户看不懂英文。
- 命名、代码、技术术语保留英文本身（如 `App.Api`、`React`、`Tailwind`、`ServiceInvoker`）。
- 引用文件名 / 类名 / 方法名 / 配置名保持原文不译。

## 任务完成后必须维护的文档

**遵循** `E:\myproject\CLAUDE.md` 第 2 节"任务完成后必须维护的文档"的跨项目通用规则。

**本项目的具体对应**：
- 实施类任务完成后，必须把改动摘要同步到 `E:\myproject\诗歌集实施备忘.md`。
  - 摘要以"代码视角"为主，回答"下次怎么改"，不写产品决策动机（动机在 `E:\myproject\诗歌集设计文档.md`）。
  - 复用速查 / 关键代码位点 / 常见改动映射表 / 保留的口子 这几个章节。
  - 新增章节不要堆叠——复用现有结构。如有必须的新增，按章节语义合入。
- 该备忘的位置与配套文档：
  - `E:\myproject\诗歌集设计文档.md`（产品视角，回答"为什么"）
  - `E:\myproject\诗歌集实施备忘.md`（实施视角，回答"怎么改"）
- 实施备忘未提及但被改动的位点（如新约定、新的关键文件路径），在备忘对应章节补充。

## 项目目的

本仓库是一个 React + TypeScript 前端，配合 .NET 8 后端，使用 ServiceInvoker RPC 层做接口路由。本文件用于让任何接手此项目的 Agent 快速理解项目结构、应改动的位置、以及需要遵守的约定。

## 关键工作区

- `react-app/`：前端应用
  - `react-app/src/api/ApiClient.ts`：API 与流式调用的客户端中枢
  - `react-app/src/auth/AuthStore.ts`：认证 / 会话状态
  - `react-app/src/components/ui/*`：共享 ShadCN UI 基础组件
  - `react-app/src/views/*`：页面级视图
- `Services/`：后端服务
  - `Services/App.Api/`：ASP.NET API 实现
  - `Services/App.ServiceInvoker/`：ServiceInvoker 路由与反射
  - `Services/Contracts.Dto/`：请求 / 响应 DTO 定义
  - `Services/Contracts.Domain/`：领域契约与示例占位逻辑

## 功能开发改动位置

- 后端业务逻辑：在 `Services/App.Api/Managers/*` 新增或更新 manager 方法。
- 新增 API 字段：在 `Services/Contracts.Dto/*.cs` 新增请求 / 响应 DTO。
- ServiceInvoker 仅用于暴露与路由 manager 方法——不要新增旁路控制器。核心业务逻辑放 manager、engine、accessor。
- 前端 UI 与数据流：放在 `react-app/src/views/*`、`react-app/src/components/*`、`react-app/src/api/*`。

## 重要约定

- ServiceInvoker 端点是 API 主入口。除非有强理由，不要旁路新建控制器。
- 区分真实基础设施与示例占位代码：
  - 保留 `App.ServiceInvoker` 与 `App.Api/Program.cs` 这类基础设施原样。
  - 替换示例占位：`Services/Contracts.Domain/Enums/SampleEnum.cs`、`Services/Contracts.Domain/Logic/SampleLogicContract.cs`、`Services/App.Api/Engines/SampleEngine.cs`——只在确实要替换样板数据时再动。
- 优先使用语义化 Tailwind 工具类（如 `bg-background`、`text-foreground`、`bg-card`、`border-border`），而非写死色值。
- 前端应复用 `react-app/src/components/ui/*` 下已有的 ShadCN 基础组件，不要引入其它 UI 框架。
- `AccessToken` / `RefreshToken` 是机密，绝不打印、不展示、不写入日志。Token 仅在 ServiceInvoker 请求体与认证信封中流转。

## 构建与启动命令

- 前端开发：`cd react-app && npm install && npm run dev`
- 前端构建：`cd react-app && npm run build`
- 前端测试：`cd react-app && npm run test`
- 后端构建：`dotnet build Services/Services.sln`
- 后端测试：`dotnet test Services/App.Api.Tests/App.Api.Tests.csproj`

## 文档索引

- 项目总览：`README.md`
- 诗歌集实施备忘：`E:\myproject\诗歌集实施备忘.md`（**任务完成后必须同步**）
- 诗歌集设计文档：`E:\myproject\诗歌集设计文档.md`
- 认证流程：`docs/service-invoker-auth-flow.md`
- 流式 RPC：`docs/service-invoker-streaming.md`

## 优先阅读

1. `README.md`：了解 StarterKit 整体设计与"基础设施 vs 占位"的区分。
2. `react-app/src/api/ApiClient.ts`：理解前端 API 与流式调用方式。
3. `Services/App.ServiceInvoker/Endpoints/ServiceInvokerEndpoints.cs` 与 `Services/App.ServiceInvoker/Reflection/ServiceMethodInvoker.cs`：理解后端路由模型。
4. `Services/App.Api/Managers/AuthManager.cs` 与 `Services/App.Api/Managers/PoemManager.cs`：当前认证与诗歌读取的实现。

## Agent 行为

- 最小改动优先：通过新增 DTO 与 manager 方法实现需求，而非调整 ServiceInvoker 路由。
- 涉及认证的任务：沿用现有 ServiceInvoker token 信封模式，遵守 token 屏蔽规则。
- 纯前端任务：仅在 `react-app/` 内改动，复用现有共享 UI 基础组件。
- 涉及领域意图不确定时：参考 `PoemHomeView`、`PoemDetailView`、`PoemManager` 现有模式推断。
- **任务总结必须按本文"任务完成后必须维护的文档"章节规则同步到 `E:\myproject\诗歌集实施备忘.md`。**
