# M'Student

This is a Next.js application built with a specific layered and modular architecture.

## Core Architecture

The application follows a strict layered architecture to ensure separation of concerns and maintainability. The data flows in one direction:

**UI (Client) -> Client Services -> API Routes -> Repositories (Server) -> Data Source (Firestore)**

### Layer Rules

1.  **UI Layer (`@layer:ui`)**:
    *   Located in `src/modules/<module>/ui/` and `src/app/**/page.tsx`.
    *   Responsible for rendering and user interaction.
    *   **MUST NOT** import from the `repo` layer, `firebase-admin`, or `next/server`.
    *   **MUST** use the `service` layer to fetch or mutate data.
    *   Client components use the `"use client"` directive.

2.  **Service Layer (`@layer:service`)**:
    *   Located in `src/modules/<module>/service/`.
    *   Thin wrappers around `fetch` that call the application's own API routes (e.g., `/api/users`).
    *   These services run on the client.
    *   They check the `modules/registry.ts` to see if a module is enabled before making a network request.

3.  **API Layer (`@layer:api`)**:
    *   Located in `src/app/api/**/route.ts`.
    *   Handles incoming HTTP requests from the `service` layer.
    *   Responsible for request validation, authentication, and orchestrating calls to the `repo` layer.
    *   **MUST** only return JSON responses using `NextResponse.json(...)`. No redirects or HTML.

4.  **Repository Layer (`@layer:repo`)**:
    *   Located in `src/modules/<module>/repo/`.
    *   The only layer that interacts with the database (e.g., Firestore).
    *   **MUST** be server-only. Every file must start with `import 'server-only';`.
    *   **MUST NOT** use the `"use server"` directive. They are not Server Actions.
    *   They export classes or stub functions for data access.

## Modular Structure

The application is composed of "Lego piece" modules located in `src/modules/`. Each module is self-contained and can be enabled or disabled without breaking the application.

### Toggling Modules

You can enable or disable any feature module by editing the `enabled` flag in `src/modules/registry.ts`.

```typescript
// src/modules/registry.ts
export const modules = [
  // ...
  { id: 'users', title: 'Users', enabled: true }, // Set to false to disable
];
```

If a module is disabled:
*   It will not appear in the main navigation.
*   Its client service will throw a "Module disabled" error, preventing any API calls.
*   Direct navigation to its pages may result in an error or empty state.

## Initial Setup & Local Development

Before running the application, you must set up your local environment.

1.  **Create `.env.local`**: Create a file named `.env.local` in the root of the project.
2.  **Follow Getting Started**: Run the app (`npm run dev`) and navigate to the `/getting-started` page. It will provide the contents for your `.env.local` file and guide you through obtaining your Firebase and Gemini API keys.
3.  **Create Firestore Database**: In the Firebase Console for your project, navigate to the **Firestore Database** section and click **Create database**. Start in **test mode** for now.
4.  **Seed the Database**: Once your environment is configured, run `npm run db:seed` in your terminal to populate your database with initial data.
5.  **Run the App**: `npm run dev`.

### Default Logins

The seed script creates the following users. You can log in with them to test different roles.

-   **Admin**: `admin` / `datHung3384`
-   **Teacher**: `teacher` / `password123`
-   **Student**: `student` / `password123`

## Code Traceability

Every file in this project includes a header comment for traceability:
`// @module:<name> @layer:<ui|service|api|repo> @owner:studio`

Additionally, all generated functions are wrapped with markers to aid in automated code analysis:
`// >>> BEGIN gen:<module>.<action> (layer:<layer>)`
...
`// <<< END gen:<module>.<action>`

A `CODEMAP` is generated in the `/docs` directory to provide a complete map of the codebase based on these markers.
