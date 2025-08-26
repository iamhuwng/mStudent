Goal: Scaffold the Phase 0 application spine with placeholders.

Scope (IN):
- Create the initial directory structure based on the layered architecture.
- Scaffold the `platform-core`, `auth-session`, and `users` modules with placeholder files and stubbed functions.
- Implement the module registry in `src/modules/registry.ts` and have the main navigation read from it.
- Create the minimal `http.ts` service helper.
- Implement `middleware.ts` to exclude `/api/*` and other static paths.
- Add file headers and function markers to all created files.
- Generate the initial `docs/CODEMAP.md` and `docs/codemap.json`.

Scope (OUT):
- No database integration. All data access in repos should be stubbed/mocked.
- No business logic.

Acceptance:
- The project builds and runs.
- Disabling a module in `registry.ts` causes its link to disappear from the nav, and the app still builds.
- All API routes return mock JSON responses.
- The `CODEMAP.md` file correctly lists all generated functions.
