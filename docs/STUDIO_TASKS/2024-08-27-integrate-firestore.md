Goal: Replace all placeholder data with a real Firestore database.

Scope (IN):
- Add `firebase` and `firebase-admin` dependencies to the project.
- Initialize the Firebase Admin SDK in a server-only context for backend operations.
- Initialize the Firebase client SDK for browser interactions.
- Update all repository files (`*.repo.ts`) to interact with Firestore collections instead of returning mock data.
- Create a database seeding script (`scripts/seed.ts`) to populate Firestore with initial data (users, classes, etc.).
- Update the `README.md` and create a `/getting-started` page to instruct users on how to create a `.env.local` file with their Firebase credentials.

Scope (OUT):
- No changes to the UI components other than what's needed to handle asynchronous data.
- Does not include setting up Firestore security rules (this will be a separate task).

Acceptance:
- The application successfully reads and writes data to a Firestore database.
- The `npm run db:seed` command successfully populates the database.
- The login functionality works by validating credentials against the `users` collection in Firestore.
