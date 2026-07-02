# StarterKit — Project Implementation Notes

This `README.md` documents the project-specific implementation.

Use this file as a navigational map: what exists in this project, what it does, and how the key flows hang together.

---

## Tech Stack
- Frontend: React + TypeScript + Tailwind CSS + ShadCN UI primitives
- Backend: .NET 8 Web API
- Auth / Blob: Supabase
- Document DB: MartenDB (PostgreSQL) using the non-`public` `app` schema by default

---

## Frontend posture

This web StarterKit uses a ShadCN-based frontend foundation that is intended to be easy to understand, easy to replace, and practical for building real products.

### What is included
- Tailwind CSS for layout, spacing, typography, and visual styling
- ShadCN configuration via `react-app/components.json`
- Shared UI primitives under `react-app/src/components/ui/*`
- Semantic tokens and global styling in `react-app/src/default.css`
- A lightweight route structure with no starter-specific app shell abstraction

### Current shared UI primitives
These are the baseline primitives included with the StarterKit.

Core input and layout primitives:
- `button`
- `card`
- `input`
- `label`
- `textarea`
- `separator`

Navigation, overlay, and information-architecture primitives:
- `navigation-menu`
- `dropdown-menu`
- `sheet`
- `dialog`
- `tabs`

Selection and richer interaction primitives:
- `select`
- `checkbox`
- `switch`
- `popover`
- `calendar`

Display and utility primitives:
- `badge`
- `table`
- `tooltip`

This expanded baseline gives generated apps a stronger structural vocabulary than card-only layouts while keeping the shared language app-owned and coherent.

### Styling conventions
- Prefer semantic utilities such as `bg-background`, `text-foreground`, `bg-card`, and `border-border` over hardcoded palette values.
- Prefer extending or adding shared primitives in `react-app/src/components/ui/*` over introducing another frontend component framework.
- Treat `react-app/src/views/ExampleView.tsx` as a placeholder welcome page, not as the long-term app shell.

---

## What in the StarterKit is “real plumbing” vs “placeholder”

### Intended to stay (core plumbing)
- **ServiceInvoker routing + security attributes**: `Services/App.ServiceInvoker/*`
  - Core request routing mechanism. Feature work should be implemented by adding/updating **Managers** + **DTOs**, not by modifying ServiceInvoker.
- **Backend bootstrapping/DI**: `Services/App.Api/Program.cs`
  - Registers Managers/Engines/Accessors, config, CORS, database, and maps the ServiceInvoker endpoint.
- **Core infrastructure Accessors** (real implementations):
  - `Services/App.Api/Accessors/DatabaseAccessor.cs` (Marten/Postgres)
  - `Services/App.Api/Accessors/AuthAccessor.cs` (Supabase auth)
  - `Services/App.Api/Accessors/BlobStorageAccessor.cs` (Supabase storage)
- **Frontend app scaffolding**: routing, auth state, generated API layer wiring, Tailwind/ShadCN foundation, and the shared UI primitive set.

### Placeholders / examples (meant to be replaced)
- **Sample domain + engine** (demonstration-only):
  - `Services/Contracts.Domain/Enums/SampleEnum.cs`
  - `Services/Contracts.Domain/Logic/SampleLogicContract.cs`
  - `Services/App.Api/Engines/SampleEngine.cs`
- **Example/placeholder views** (replace with your app’s actual flows):
  - `react-app/src/views/ExampleView.tsx`
  - `react-app/src/views/NotFoundView.tsx`

---

## Implementation Index

### Frontend Views
- `react-app/src/views/PoemHomeView.tsx` — 公开首页，展示夜空氛围下的精选诗歌入口，并以散落式场景卡承载访客进入阅读的起点。
- `react-app/src/views/PoemDetailView.tsx` — 公开诗歌详情页，展示单首作品的沉浸式阅读框、背景插画氛围层与逐行淡入正文。
- `react-app/src/views/NotFoundView.tsx` — 404 fallback view.
- `react-app/src/views/UnauthorizedView.tsx` — fallback for authenticated users who do not have permission for a protected route.
- `react-app/src/views/ExampleView.tsx` — 保留的 starter 占位页，当前已不作为默认首页使用。

### Frontend Components
- `react-app/src/components/ErrorBoundary.tsx` — global error boundary.
- `react-app/src/components/ui/button.tsx` — ShadCN button primitive for primary and secondary actions.
- `react-app/src/components/ui/badge.tsx` — ShadCN badge primitive for compact status or labeling.
- `react-app/src/components/ui/calendar.tsx` — ShadCN calendar primitive for richer date picking.
- `react-app/src/components/ui/card.tsx` — ShadCN surface/container primitive for grouped content.
- `react-app/src/components/ui/checkbox.tsx` — ShadCN checkbox primitive for boolean and multi-select input.
- `react-app/src/components/ui/dialog.tsx` — ShadCN dialog primitive for focused modal flows.
- `react-app/src/components/ui/dropdown-menu.tsx` — ShadCN dropdown menu primitive for contextual action menus.
- `react-app/src/components/ui/input.tsx` — ShadCN single-line text input primitive.
- `react-app/src/components/ui/label.tsx` — ShadCN label primitive for accessible forms.
- `react-app/src/components/ui/navigation-menu.tsx` — ShadCN navigation menu primitive for higher-level navigation structure.
- `react-app/src/components/ui/popover.tsx` — ShadCN popover primitive for anchored contextual content.
- `react-app/src/components/ui/select.tsx` — ShadCN select primitive for controlled option picking.
- `react-app/src/components/ui/textarea.tsx` — ShadCN multi-line text input primitive.
- `react-app/src/components/ui/separator.tsx` — ShadCN separator primitive.
- `react-app/src/components/ui/sheet.tsx` — ShadCN sheet primitive for drawer and side-panel interactions.
- `react-app/src/components/ui/switch.tsx` — ShadCN switch primitive for toggle settings.
- `react-app/src/components/ui/table.tsx` — ShadCN table primitive for structured row/column display.
- `react-app/src/components/ui/tabs.tsx` — ShadCN tabs primitive for sectional organization.
- `react-app/src/components/ui/tooltip.tsx` — ShadCN tooltip primitive for dense contextual hints.
- `react-app/src/lib/utils.ts` — shared `cn()` helper for composing Tailwind class names.
- `react-app/src/components/poems/PoemSceneShell.tsx` — 诗歌前台共用场景外壳，负责星空背景、插画铺底与整体遮罩层次。
- `react-app/src/components/poems/PoemHomeCard.tsx` — 首页精选诗歌场景卡，承载同图裁切、柔和发光与缓慢放大反馈。

### Frontend Stores
- `react-app/src/auth/AuthStore.ts` — auth/session state backed by `SessionDto`; stores access/refresh tokens but does not perform refresh itself.

### Managers
- `Services/App.Api/Managers/AuthManager.cs` — auth endpoints.
  - Methods: `Login`, `SignUp`, `SendPasswordResetEmail`, `GetSession`, `ChangePassword`, `UpdateUserEmail`, `UpdateUserPassword`, `UpdateUserName`.
- `Services/App.Api/Managers/PoemManager.cs` — 公开诗歌读取入口。
  - Methods: `GetFeaturedPoems`, `GetPoemDetail`.

### Engines
- `Services/App.Api/Engines/SampleEngine.cs` — Placeholder example stateless engine; replace with real engines.

### Accessors
- `Services/App.Api/Accessors/DatabaseAccessor.cs` — Marten document DB operations.
- `Services/App.Api/Accessors/AuthAccessor.cs` — Supabase auth operations.
- `Services/App.Api/Accessors/BlobStorageAccessor.cs` — Supabase blob/storage operations.
- `Services/App.Api/Accessors/LocalDatabaseAccessor.cs` — local alternative DB implementation, used when the app is running in Development (local) mode.
- `Services/App.Api/Accessors/LocalAuthAccessor.cs` — local alternative auth implementation, used when the app is running in Development (local) mode.
- `Services/App.Api/Accessors/LocalBlobStorageAccessor.cs` — local alternative blob implementation, used when the app is running in Development (local) mode.

---

## Key Flows

### Public poem reading flow
1. 访客打开 `/`，前端 `PoemHomeView` 调用 `PoemManager.GetFeaturedPoems` 读取首页精选诗歌。
2. 后端 `PoemManager` 通过 `IDatabaseAccessor` 读取被标记为 `IsFeaturedOnHome` 的诗歌，并按 `FeaturedOrder` 返回卡片所需最小数据。
3. 本地开发环境下，`LocalPoemSeedService` 会在首次读取时补充示例诗歌数据，确保首页和详情页有真实内容可用。
4. 首页以 `PoemHomeCard` 呈现同一张插画的局部取景，只显示诗名，并提供柔和发光与缓慢放大的进入反馈。
5. 访客点击卡片后进入 `/poems/:poemId`，`PoemDetailView` 调用 `PoemManager.GetPoemDetail` 读取单首诗完整内容。
6. 详情页复用同一张插画作为背景氛围层，在中央阅读框中展示标题、作者与逐行淡入的诗句。

### Backend→Frontend HTTP Streaming (NDJSON)
This StarterKit supports a ServiceInvoker streaming RPC pattern (newline-delimited JSON over `fetch()`):

1. Frontend calls `ApiClient.streamMethod(...)` (or a thin wrapper) to POST to the streaming endpoint.
2. Backend invokes a manager method that returns `IAsyncEnumerable<T>` and streams each item as NDJSON.

Endpoint:
- `POST /api/stream`

See: `docs/service-invoker-streaming.md`.

Relevant files:
- Backend: `Services/App.ServiceInvoker/Endpoints/ServiceInvokerEndpoints.cs` + `Services/App.ServiceInvoker/Reflection/ServiceMethodInvoker.cs`
- Frontend: `react-app/src/api/ApiClient.ts` (`streamMethod`)

## Auth + Roles
- The frontend sends current access/refresh tokens in ServiceInvoker request bodies.
- ServiceInvoker centrally ensures/refreshes tokens before manager invocation and returns an auth envelope containing refreshed tokens plus `SessionDto`.
- Auth refresh does **not** call the frontend `ApiClient`, preventing recursive refresh loops.
- `AuthManager` implements `IAuthTokenManager`, so ServiceInvoker has one auth coordination dependency that performs token refresh and request authentication in a single call.
- `AuthenticatorEngine` contains provider-neutral JWT validation and common claim extraction. `LocalAuthAccessor` and `AuthAccessor` own provider-specific token creation, refresh, validation parameters, and Supabase JWKS handling.
- Supabase login/sign-up/refresh responses are normalized by `AuthAccessor`; tokens may come from top-level response fields or from a nested provider `Session` object, but app responses expose the same `AccessToken`/`RefreshToken` shape.
- The StarterKit does not ship an opinionated login/signup page. The default index route is public so a freshly scaffolded app launches without requiring auth UI. Add a project-specific auth screen only when the app needs interactive sign-in.
- Protected routes hydrate session locally and expose retry/sign-out on failure. If no tokens are present, they route to the public index route; role failures route to the unauthorized page.
- The frontend auth store only persists complete auth state: access token + refresh token + `SessionDto`. If sign-up succeeds but Supabase requires a follow-up step before issuing tokens, `SignUpResponseDto.RequiresFollowUp` is true and the UI should explain the next step rather than storing partial auth.
- Roles are stored in Supabase **app_metadata** (JWT claim `app_metadata.roles`) and checked by ServiceInvoker role attributes.
- Role admin updates must use the Supabase secret key and write to `app_metadata`.
- When a manager returns `SessionDto`, ServiceInvoker uses that returned value as `envelope.Session`; otherwise it falls back to a basic session derived from `HttpContext.User`. Put app-specific session fields on `SessionDto` and return it from session-oriented manager methods so enriched session state is not lost.
- Access and refresh tokens travel in ServiceInvoker request bodies and response envelopes. Treat `AccessToken` and `RefreshToken` as secrets: never log request bodies containing them, never show them in UI/errors, and redact them from diagnostics/tooling output.

### ServiceInvoker auth flow (local + cloud)

- ServiceInvoker authenticates and authorizes manager-method calls using request-body tokens and method attributes.
- Production validates Supabase JWTs through JWKS derived from `SupabaseId`; local development uses local JWTs.
- See `docs/service-invoker-auth-flow.md`.

## Integrations
- (External services/APIs used and what for)

## Configuration Keys
- Supabase auth/storage/database config is provisioned by the StarterKit deployment/config pipeline. Do not add duplicate `SupabaseUrl` or `SupabaseJwksUrl` keys; runtime code derives auth URLs from `SupabaseId` where needed.
