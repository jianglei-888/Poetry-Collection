# ServiceInvoker 流式 RPC（NDJSON）

本 StarterKit 支持通过 HTTP 以**换行分隔 JSON（NDJSON）**实现**流式 manager 方法**。

它和"通过 ServiceInvoker 调用 manager 方法"的常规模式一致，只是响应是 JSON 对象流，而不是单一 JSON 响应。

---

## 概览

- **非流式**（常规）：
  - 端点：`POST /api/invoke`
  - manager 方法返回单一 DTO

- **流式**：
  - 端点：`POST /api/stream`
  - manager 方法返回 `IAsyncEnumerable<T>`
  - 每个 `yield` 出的 `T` 元素会被序列化为 JSON 并写成单独一行：

```text
{ ...json... }\n
{ ...json... }\n
...
```

Content-Type：`application/x-ndjson`

---

## 后端要求

### manager 方法签名

流式 manager 方法必须返回：

- `IAsyncEnumerable<T>`

可选地，它也可以接受一个 `CancellationToken` 参数，以便在客户端取消 / 断开时停止工作。

示例签名：

- `MyMethod(MyRequestDto request) : IAsyncEnumerable<MyEventDto>`

### 路由

- 流式端点由 `Services/App.ServiceInvoker/Endpoints/ServiceInvokerEndpoints.cs` 映射。
- 该端点使用与常规 ServiceInvoker 调用相同的 AuthN / AuthZ 组件：
  - `IRequestAuthenticator`
  - `IMethodAuthorizer`

---

## 前端使用

使用 `ApiClient.streamMethod(...)`（或 `src/apiClients/*` 中的封装）来做：

1) 把 `{ managerName, methodName, parameters }` POST 到 `/api/stream`
2) 解析每一行 NDJSON 为对象

参见：
- `react-app/src/api/ApiClient.ts`（`streamMethod`）
- （可选的演示 UI）可以构建一个小视图调用 `ApiClient.streamMethod(...)` 并渲染 NDJSON 事件。

---

## 流式 vs 常规调用的选择

需要增量进度更新或长时间运行的操作时使用流式。

单次请求 / 响应足够时，使用常规 manager 调用。
