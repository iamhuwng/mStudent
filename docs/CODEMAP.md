# Code Map

This document provides a map of the generated code in the M'Student application, based on traceability markers in the source files.

## platform-core

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `platform-core.header` | `Header` | `ui` | `src/modules/platform-core/ui/header.tsx` | - |
| `platform-core.main-nav` | `MainNav` | `ui` | `src/modules/platform-core/ui/main-nav.tsx` | - |
| `platform-core.home-page` | `Home` | `ui` | `src/app/page.tsx` | `/` |
| `platform-core.middleware` | `middleware` | `api` | `src/middleware.ts` | `* (excluded)` |
| `platform-core.http-fetch` | `http` | `service` | `src/lib/services/http.ts` | - |

## auth-session

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `auth-session.login-form` | `LoginForm` | `ui` | `src/modules/auth-session/ui/login-form.tsx` | - |
| `auth-session.login` | `login` | `service` | `src/modules/auth-session/service/session.service.ts` | `/api/session/login` |
| `auth-session.api-handler` | `POST` | `api` | `src/app/api/session/[action]/route.ts` | `/api/session/*` |
| `auth-session.repo-login` | `login` | `repo` | `src/modules/auth-session/repo/session.repo.ts` | - |

## users

| Gen ID | Export | Layer | File | Routes |
|---|---|---|---|---|
| `users.users-list` | `UsersList` | `ui` | `src/modules/users/ui/users-list.tsx` | - |
| `users.user-detail` | `UserDetail` | `ui` | `src/modules/users/ui/user-detail.tsx` | - |
| `users.get-users` | `getUsers` | `service` | `src/modules/users/service/users.service.ts` | `/api/users` |
| `users.get-user-by-id` | `getUserById` | `service` | `src/modules/users/service/users.service.ts` | `/api/users/:id` |
| `users.api-get-users` | `GET` | `api` | `src/app/api/users/route.ts` | `/api/users` |
| `users.api-get-user-by-id`| `GET` | `api` | `src/app/api/users/[id]/route.ts`| `/api/users/:id` |
| `users.repo-get-users` | `getUsers` | `repo` | `src/modules/users/repo/users.repo.ts` | - |
| `users.repo-get-user-by-id`| `getUserById`| `repo` | `src/modules/users/repo/users.repo.ts` | - |
