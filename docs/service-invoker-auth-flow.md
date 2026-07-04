# ServiceInvoker 认证 + 授权流程（StarterKit）

本文档描述 StarterKit 中用于 manager 方法 RPC 调用的认证架构。

## 关键术语

- **ServiceInvoker**：将前端调用路由到后端 manager 方法的唯一 API 入口。
- **Auth token manager**：`IAuthTokenManager`，由 `AuthManager` 实现，统一负责 ServiceInvoker 的 token 刷新与请求认证。
- **Authenticator engine**：与具体提供方无关的 token 校验与常用 claim 提取逻辑。
- **Auth accessor**：与具体提供方绑定的认证集成。本地开发与 Supabase 分别通过 `IAuthAccessor` 提供 token 生成、刷新、校验细节。
- **AuthZ**：通过 `[RequireAuthenticated]` 与 `[RequireRole(...)]` 在方法级别做授权。

## 请求路径

普通 manager 调用：

`POST /api/invoke` → `ServiceInvokerEndpoints` → `ServiceMethodInvoker.InvokeAsync`

流式 manager 调用：

`POST /api/stream` → `ServiceInvokerEndpoints` → `ServiceMethodInvoker.InvokeStreamingAsync`

## Token 传输

前端把 token 放在 ServiceInvoker 请求体里：

- `AccessToken`
- `RefreshToken`

后端把 token 放在 ServiceInvoker 响应信封里返回：

- `AccessToken`
- `RefreshToken`
- `Session`
- `Result`

包含 token 的请求 / 响应体不得写入日志，也不得在 UI 中展示。

## 后端流程

对每个 ServiceInvoker 请求：

1. `ServiceMethodInvoker` 解析目标 manager 方法。
2. `ServiceMethodInvoker` 调用 `IAuthTokenManager.EnsureAuthenticatedRequest(...)` 协调 token 刷新与请求认证。
3. `AuthManager` 校验 / 刷新请求体中的 token 对。
4. 刷新后若 access token 可用，`AuthManager` 将其以内部 `Authorization: Bearer ...` 头的形式写入当前请求。
5. `AuthManager` 向当前激活的 `IAuthAccessor` 索取该提供方专属的 `TokenValidationParameters`。
6. `AuthenticatorEngine` 校验 bearer token，构造 `HttpContext.User`，并把 user id、email、roles 写入 `UserContextService`。
7. `AttributeMethodAuthorizer` 校验方法上的特性。
8. 调用 manager 方法。
9. 结果包装成 `ServiceInvocationResponseEnvelopeDto`。

## Session 信封行为

如果 manager 返回 `SessionDto`，ServiceInvoker 用该返回值作为 `envelope.Session`。

否则，ServiceInvoker 回退到一份基于 `HttpContext.User` 的基础 session。

这让项目特有的 session 字段通过面向 session 的 manager 方法顺利流转，而不会被通用 JWT claim 数据覆盖。

## 本地开发提供方

`LocalAuthAccessor` 持有本地提供方行为：

- 本地 JWT 的 issuer / audience / signing key 常量
- 本地 JWT 生成
- 本地刷新行为
- 本地 access token 校验参数

本地刷新在校验旧 access token 时不检查生命周期——这样过期 token 仍能在交换 refresh token 时识别用户。

## Supabase 提供方

`AuthAccessor` 持有 Supabase 提供方行为：

- Supabase 登录 / 注册 / 刷新调用
- 顶层与嵌套 `Session` token 形态的归一化
- Supabase issuer 与 audience 校验参数
- JWKS 从以下地址获取 / 缓存：

`https://{SupabaseId}.supabase.co/auth/v1/.well-known/jwks.json`

JWKS 密钥缓存 15 分钟。

## 授权

manager 用以下特性标记受保护方法：

- `[RequireAuthenticated]`
- `[RequireRole(...)]`

角色优先从 Supabase / 本地 JWT 的 `app_metadata.roles` 读取；若该 claim 缺失，再回退到直接的角色 claims。

格式错误的 `app_metadata` 角色 JSON 会"失败关闭"（拒绝通过），而不会被悄悄忽略。

## 前端受保护路由

`ProtectedRoute` 持有受保护路由的 session 注水逻辑：

- 无 token → 跳转到 `/unauthorized`
- 有 token 但无 session → 调用 `AuthManager.GetSession({})`
- 恢复超时 → 显示重试 / 登出 UI
- session 恢复成功 → 渲染受保护路由

StarterKit 默认首页路由是公开的。项目只有在确实需要登录受限的视图时，再去新增受保护路由。
