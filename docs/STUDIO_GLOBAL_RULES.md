# Studio Global Rules

*This document is the single source of truth for architectural rules. It is applied on every task.*

## Core Architecture

1.  **Strict Layering**: Data flows in one direction: UI (Client) → Client Services → API Routes → Repositories (Server) → Data Source (e.g., Firestore).
2.  **UI Layer (`@layer:ui`)**:
    *   Client components, responsible for rendering and user interaction.
    *   **MUST NOT** import from the `repo` layer.
    *   **MUST NOT** import server-only packages like `firebase-admin` or `next/server`.
    *   **MUST** use the `service` layer for all data fetching and mutations.
3.  **Service Layer (`@layer:service`)**:
    *   Thin wrappers around an HTTP client (`fetch`) that call the application's own API routes (e.g., `/api/users`).
    *   Run on the client.
    *   Check if a module is enabled before making a network request.
4.  **API Layer (`@layer:api`)**:
    *   Server-side handlers for incoming HTTP requests from the `service` layer.
    *   Responsible for request validation (e.g., Zod), authentication, and orchestrating calls to the `repo` layer.
    *   **MUST** return JSON responses only, using `NextResponse.json(...)`. Never return HTML or redirects.
5.  **Repository Layer (`@layer:repo`)**:
    *   The only layer that interacts with the database (e.g., Firestore).
    *   **MUST** be server-only. Every file **MUST** start with `import 'server-only';`.
    *   **MUST NOT** use the `"use server"` directive; they are not Server Actions.

## Modular Structure

1.  **Lego Pieces**: The application is composed of self-contained modules located in `src/modules/<name>`.
2.  **Standard Module Structure**: Each module should follow the directory structure: `{ui, service, repo, README.md}`. API routes are centralized under `src/app/api/`.
3.  **Central Registry**: `src/modules/registry.ts` is the single source of truth for which modules are enabled. The application navigation is built from this registry.
4.  **Removability**: The application **MUST** build and run successfully even if any module is disabled in the registry or its directory is deleted. Services for disabled modules should short-circuit gracefully.

## Code Traceability & Docs

1.  **File Headers**: Every file must start with a one-line header comment for traceability: `// @module:<name> @layer:<ui|service|api|repo> @owner:studio`
2.  **Function Markers**: Every generated function must be wrapped with start and end markers:
    *   `// >>> BEGIN gen:<module>.<action> (layer:<layer>)`
    *   `// <<< END gen:<module>.<action>`
3.  **CODEMAP**: The `docs/CODEMAP.md` and `docs/codemap.json` files are automatically generated from these markers and must be kept up-to-date.
