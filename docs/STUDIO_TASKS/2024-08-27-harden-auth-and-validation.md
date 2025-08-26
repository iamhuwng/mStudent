Goal: Harden auth, add Zod validation at API, and mirror perms in Firestore Rules.

Scope (IN):
- Make session cookies `httpOnly` using `iron-session`.
- Add Zod validation schemas to all POST/PUT API handlers to validate the request body.
- Add basic role-based access control (RBAC) guards at the API level (e.g., student cannot call admin APIs).
- Implement basic Firestore Rules that mirror the API permissions (e.g., only an admin can write to the `/users/{userId}` document).
- Implement login rate-limiting to prevent brute-force attacks.

Scope (OUT):
- No major UI changes.

Acceptance:
- Login sets an `httpOnly` cookie; logout clears it.
- An API call from an unauthorized role (e.g., student calling a teacher API) returns a 403 Forbidden.
- Posting an invalid payload to an API endpoint returns a 400 Bad Request with a JSON error object from Zod.
- Firestore Rules block unauthorized direct database writes when tested in the emulator.
- Rapid login attempts result in a `429 Too Many Requests` error.
