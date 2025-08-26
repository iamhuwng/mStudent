# Code Map

This document provides a map of the generated code in the M'Student application, based on traceability markers in the source files.

## platform-core

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `core.nav` | `MainNav` | `ui` | `src/modules/platform-core/ui/main-nav.tsx` | - |
| `core.home` | `Home` | `ui` | `src/app/page.tsx` | `/` |
| `core.middleware.guard` | `middleware` | `api` | `src/middleware.ts` | `* (excluded)` |
| `core.http.fetch` | `http` | `service` | `src/lib/services/http.ts` | - |
| `core.registry.read` | `modules`, `isModuleEnabled` | `service` | `src/modules/registry.ts` | - |

## auth-session

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `auth.login.ui` | `LoginForm` | `ui` | `src/modules/auth-session/ui/login-form.tsx` | - |
| `auth.login.service` | `login` | `service` | `src/modules/auth-session/service/session.service.ts` | `/api/session/login` |
| `auth.logout.service` | `logout` | `service` | `src/modules/auth-session/service/session.service.ts` | `/api/session/logout` |
| `auth.api` | `POST` | `api` | `src/app/api/session/[action]/route.ts` | `/api/session/*` |
| `auth.login.repo` | `login` | `repo` | `src/modules/auth-session/repo/session.repo.ts` | - |
| `auth.claims.ensure` | `session` | `repo` | `src/modules/auth-session/repo/session.repo.ts` | - |

## users

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `users.list` | `UsersList` | `ui` | `src/modules/users/ui/users-list.tsx` | - |
| `users.detail` | `UserDetail` | `ui` | `src/modules/users/ui/user-detail.tsx` | - |
| `users.list.service` | `getUsers` | `service` | `src/modules/users/service/users.service.ts` | `/api/users` |
| `users.detail.service` | `getUserById` | `service` | `src/modules/users/service/users.service.ts` | `/api/users/:id` |
| `users.create.service` | `createUser` | `service` | `src/modules/users/service/users.service.ts` | `/api/users` |
| `users.update.service` | `updateUser` | `service` | `src/modules/users/service/users.service.ts` | `/api/users/:id` |
| `users.delete.service` | `deleteUser` | `service` | `src/modules/users/service/users.service.ts` | `/api/users/:id` |
| `users.api.list` | `GET` | `api` | `src/app/api/users/route.ts` | `/api/users` |
| `users.api.create` | `POST` | `api` | `src/app/api/users/route.ts` | `/api/users` |
| `users.api.detail`| `GET` | `api` | `src/app/api/users/[id]/route.ts`| `/api/users/:id` |
| `users.api.update`| `PUT` | `api` | `src/app/api/users/[id]/route.ts`| `/api/users/:id` |
| `users.api.delete`| `DELETE` | `api` | `src/app/api/users/[id]/route.ts`| `/api/users/:id` |
| `users.list.repo` | `getUsers` | `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.detail.repo`| `getUserById`| `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.create.repo` | `createUser` | `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.update.repo`| `updateUser`| `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.delete.repo`| `deleteUser`| `repo` | `src/modules/users/repo/users.repo.ts` | - |
