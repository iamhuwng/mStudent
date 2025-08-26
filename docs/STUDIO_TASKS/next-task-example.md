Goal: Standardize pagination and JSON parsing across list endpoints.

Scope (IN):
- Define `Page<T> = { items: T[]; nextCursor?: string; hasMore: boolean }` in `lib/types.ts`.
- Ensure assignments, submissions-grading, and activity list endpoints + services accept `?limit&?cursor` and return `Page<T>`.
- Update `lib/services/http.ts` to verify `Content-Type` includes `application/json` before parsing; otherwise throw the first 400 chars of the body.

Out (NOT doing): UI changes beyond wiring lists to services.

Acceptance:
- Page 1 ≠ Page 2 using cursor.
- Non-JSON responses never cause JSON.parse crashes.
- CODEMAP updated; module removable.
