# **App Name**: M'Student

## Core Features:

- Layered Architecture: Layers: UI (client) -> client services -> API routes -> repos (server-only) -> Firestore.
- UI Layer Restriction: UI must NOT import repos, firebase-admin, or next/server.
- Repository Constraints: Repos: start files with `import 'server-only'`; no "use server"; export stubs/classes only.
- API Route Restrictions: API routes: JSON only via NextResponse.json(...); no HTML/redirects.
- Client Services Design: Client services: thin fetch wrappers that call /api/* (ok to stub).
- Modular Structure: Modules are Lego pieces: `src/modules/<name>/{ ui/, service/<name>.service.ts, api/app/api/<name>/route.ts, repo/<name>.repo.ts, README.md }`
- Central Registry: Central registry: `src/modules/registry.ts` -> `[{ id, title, enabled }]`. Nav reads this. If a module is disabled or deleted, the app still builds; each service short-circuits with a “module disabled” error.
- Code Traceability: Traceability: add to TOP of every file a one-line header: `// @module:<name> @layer:<ui|service|api|repo> @owner:studio` Wrap every generated function with markers: `// >>> BEGIN gen:<module>.<action> (layer:<layer>)` … `// <<< END gen:<module>.<action>` Generate `docs/CODEMAP.md` and `docs/codemap.json` from markers (gen id -> file -> export -> layer -> callers/routes).
- Middleware Configuration: Middleware: include minimal `middleware.ts` that EXCLUDES `/api/*`, `_next/*`, `favicon.ico`.
- Platform Core Module: Module `platform-core`: registry, nav from registry, `src/lib/services/http.ts` (basic JSON fetch helper), `middleware.ts` as above, root README explaining layer rules & toggling modules.
- Auth Session Module: Module `auth-session` (placeholders): username+password login flow STUB (no real logic), routes stubs `/api/session/login` & `/api/session/logout`, role claim placeholders.
- Users Module: Module `users` (placeholders): CRUD stubs & minimal UI list/detail stubs. Everything should compile and run even if any module is disabled or deleted.

## Style Guidelines:

- Primary color: Deep Indigo (#4B0082) for a sense of intellect and focus.
- Background color: Very light grey (#F0F0F0) to provide a clean and unobtrusive canvas.
- Accent color: Golden Yellow (#FFC857) to highlight key elements and actions.
- Body font: 'Inter', sans-serif, for a modern and readable text.
- Headline font: 'Space Grotesk', sans-serif, for a techy, modern heading font.
- Code font: 'Source Code Pro' for displaying code snippets.
- Prioritize clean, structured layouts with consistent spacing to facilitate easy navigation and content discovery.