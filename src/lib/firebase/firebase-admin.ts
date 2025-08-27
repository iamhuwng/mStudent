// @module:platform-core @layer:repo @owner:studio
import 'server-only';
import admin from 'firebase-admin';

function initAdminApp(): admin.app.App {
  if (admin.apps.length) return admin.app();

  // Explicit emulator detection: only switch when emulator envs are present.
  const usingEmulator =
    !!process.env.FIREBASE_AUTH_EMULATOR_HOST ||
    !!process.env.FIRESTORE_EMULATOR_HOST;

  try {
    // 1) Emulator: no credentials needed, just projectId.
    if (usingEmulator) {
      const projectId = process.env.FIREBASE_PROJECT_ID?.trim() || 'demo-project';
      admin.initializeApp({ projectId });
      return admin.app();
    }

    // 2) Full service account JSON (preferred in prod/CI)
    const saJson = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
    if (saJson) {
      const parsed = JSON.parse(saJson) as {
        project_id: string;
        client_email: string;
        private_key: string;
      };
      const privateKey = parsed.private_key.replace(/\\n/g, '\n');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: parsed.project_id,
          clientEmail: parsed.client_email,
          privateKey,
        }),
      });
      return admin.app();
    }

    // 3) Individual env vars (fallback)
    const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY || '';
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        'Firebase Admin init failed: provide FIREBASE_SERVICE_ACCOUNT (JSON) OR all of FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY. If running emulators, set FIREBASE_AUTH_EMULATOR_HOST / FIRESTORE_EMULATOR_HOST.'
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
    return admin.app();
  } catch (err) {
    console.error('Firebase Admin init failed:', err);
    throw err; // fail fast so downstream errors aren’t confusing
  }
}

const app = initAdminApp();
export const firestore = app.firestore();
export const auth = app.auth();
