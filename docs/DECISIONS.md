# Architecture Decision Records (ADRs)

This document records key architectural decisions for the M'Student project.

---

## ADR 001: Strict Layered Architecture

**Context:**
The application needs to be maintainable, scalable, and easy to reason about. A clear separation of concerns is required to prevent tight coupling between the user interface, business logic, and data access.

**Decision:**
We will enforce a strict, one-way data flow through four distinct layers:

1.  **UI Layer (`@layer:ui`):** Client-side React components. Responsible only for presentation and user interaction.
2.  **Service Layer (`@layer:service`):** Client-side services that act as an API client. They are the *only* way the UI can interact with the backend.
3.  **API Layer (`@layer:api`):** Server-side API routes (Next.js Route Handlers). They handle request validation, authentication, and orchestrate repository calls.
4.  **Repository Layer (`@layer:repo`):** Server-only modules that directly interact with the database (Firestore).

**Consequences:**
*   **Pro:** High degree of decoupling. The UI is completely unaware of the database implementation.
*   **Pro:** Clear boundaries make the system easier to test and debug.
*   **Pro:** Replacing a data source only requires changes in the repository layer.
*   **Con:** Can introduce boilerplate, as a single feature may require creating files in all four layers. This is a trade-off we accept for maintainability.

---

## ADR 002: Modular "Lego Piece" Structure

**Context:**
The application is expected to grow with many distinct features (e.g., Assignments, Flashcards, different Editors). We need a way to develop these features in isolation and enable/disable them without breaking the entire application.

**Decision:**
The application will be built as a collection of "Lego piece" modules located under `src/modules/`.

1.  **Self-Contained:** Each module encapsulates its own UI, services, and repository logic.
2.  **Central Registry:** A single file, `src/modules/registry.ts`, contains an array of all modules and an `enabled` flag for each.
3.  **Dynamic Navigation:** The main application navigation is generated dynamically based on the enabled modules in the registry.
4.  **Graceful Degradation:** Services for disabled modules must short-circuit and throw an error or return a no-op, ensuring the app remains stable. The UI must handle these cases (e.g., not rendering a feature card).

**Consequences:**
*   **Pro:** Features can be developed and tested independently.
*   **Pro:** Enables feature flagging and a "plug-in" architecture, allowing for easy addition or removal of features.
*   **Pro:** Prevents a broken or incomplete module from taking down the entire application.
*   **Con:** Requires discipline to avoid creating dependencies between modules outside of the established service layer contracts.

---

## ADR 003: Authentication Flow with httpOnly Session Cookies

**Context:**
We need a secure way to manage user sessions for an application with both client-side components and a server-side API.

**Decision:**
We will implement an authentication flow using `iron-session`.

1.  **Login Endpoint:** A `/api/session/login` endpoint accepts a username and password.
2.  **Credential Validation:** The `session.repo.ts` validates credentials against the database.
3.  **Session Creation:** Upon successful login, the server creates a session containing non-sensitive user data (e.g., `userId`, `role`, `name`).
4.  **`httpOnly` Cookie:** The session data is stored in an encrypted `httpOnly` cookie sent back to the client. This prevents client-side JavaScript from accessing the cookie, mitigating XSS risks.
5.  **Authenticated Requests:** On subsequent API calls, the browser automatically sends the session cookie. The API layer reads the cookie to identify and authorize the user for the requested action.

**Consequences:**
*   **Pro:** Secure. `httpOnly` cookies are a standard, secure way to handle sessions.
*   **Pro:** Decoupled. The UI does not need to manage tokens; it simply makes API calls, and the browser handles the session cookie automatically.
*   **Con:** Requires careful management of cookie settings (e.g., `secure`, `sameSite`) for production environments.
