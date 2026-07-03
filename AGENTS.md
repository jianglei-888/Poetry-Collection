# Agent Instructions for this Repository

## Purpose
This repository is a React + TypeScript frontend paired with a .NET 8 backend and a ServiceInvoker RPC layer. Use this file to quickly understand the project structure, the part of the code to modify for new features, and the conventions that matter.

## Key work areas
- `react-app/`: frontend app
  - `react-app/src/api/ApiClient.ts`: central API / streaming client layer
  - `react-app/src/auth/AuthStore.ts`: auth/session state
  - `react-app/src/components/ui/*`: shared ShadCN UI primitives
  - `react-app/src/views/*`: page-level views
- `Services/`: backend services
  - `Services/App.Api/`: ASP.NET API implementation
  - `Services/App.ServiceInvoker/`: ServiceInvoker routing and reflection
  - `Services/Contracts.Dto/`: request/response DTO definitions
  - `Services/Contracts.Domain/`: domain contracts and sample placeholder logic

## What to change for feature work
- Add or update manager methods in `Services/App.Api/Managers/*` for backend business logic.
- Add request/response DTOs in `Services/Contracts.Dto/*.cs` when new API payloads are needed.
- Use `App.ServiceInvoker` only to expose or route manager methods. Core business logic belongs in managers, engines, and accessors.
- Frontend UI and data flow belong in `react-app/src/views/*`, `react-app/src/components/*`, and `react-app/src/api/*`.

## Important conventions
- The ServiceInvoker endpoints are the main API surface. Do not bypass them with ad-hoc controllers unless there is a strong reason.
- Treat existing sample plumbing as real infrastructure and sample domain code as placeholder:
  - Keep `App.ServiceInvoker` and `App.Api/Program.cs` infrastructure intact.
  - Replace `Services/Contracts.Domain/Enums/SampleEnum.cs`, `Services/Contracts.Domain/Logic/SampleLogicContract.cs`, and `Services/App.Api/Engines/SampleEngine.cs` only when replacing starter sample data.
- Prefer semantic Tailwind utilities such as `bg-background`, `text-foreground`, `bg-card`, and `border-border` instead of hardcoded colors.
- Frontend should reuse shared ShadCN primitives in `react-app/src/components/ui/*` rather than adding a new UI framework.
- Do not log or expose `AccessToken` / `RefreshToken` values. Tokens are secrets passed in request bodies and returned in auth envelopes.

## Build and run commands
- Frontend development: `cd react-app && npm install && npm run dev`
- Frontend build: `cd react-app && npm run build`
- Frontend tests: `cd react-app && npm run test`
- Backend build: `dotnet build Services/Services.sln`
- Backend tests: `dotnet test Services/App.Api.Tests/App.Api.Tests.csproj`

## Documentation links
- Project overview: `README.md`
- Auth flow: `docs/service-invoker-auth-flow.md`
- Streaming RPC: `docs/service-invoker-streaming.md`

## What to read first
1. `README.md` for the overall StarterKit design and plumbing vs placeholder guidance.
2. `react-app/src/api/ApiClient.ts` to understand frontend API and stream usage.
3. `Services/App.ServiceInvoker/Endpoints/ServiceInvokerEndpoints.cs` and `Services/App.ServiceInvoker/Reflection/ServiceMethodInvoker.cs` for the backend routing model.
4. `Services/App.Api/Managers/AuthManager.cs` and `Services/App.Api/Managers/PoemManager.cs` for current auth and poem flows.

## Agent behavior
- Prefer minimal changes: add new DTOs and manager methods rather than altering the ServiceInvoker routing.
- If a task involves auth, follow the existing ServiceInvoker token envelope pattern and preserve token redaction rules.
- If a task is frontend-only, keep it inside `react-app/` and reuse the existing shared UI primitives.
- If you are uncertain about domain intent, infer from the sample `PoemHomeView`, `PoemDetailView`, and `PoemManager` patterns.
