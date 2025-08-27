// @module:platform-core @layer:repo @owner:studio
import 'server-only';
import admin from 'firebase-admin';

function initAdminApp(): admin.app.App {
  if (admin.apps.length) return admin.app();

  try {
    // Prefer a full service account JSON if provided (as JSON string).
    const saJson = process.env.FIREBASE_SERVICE_ACCOUNT?.trim();
    if (saJson) {
      const parsed = JSON.parse(saJson) as {
        project_id: string;
        client_email: string;
        private_key: string;
      };
      parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: parsed.project_id,
          clientEmail: parsed.client_email,
          privateKey: parsed.private_key,
        }),
      });
      return admin.app();
    }

    // Fallback to individual envs (ensure \n are unescaped).
    const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing FIREBASE_* envs. Provide FIREBASE_SERVICE_ACCOUNT or all of PROJECT_ID, CLIENT_EMAIL, PRIVATE_KEY.');
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    return admin.app();
  } catch (err) {
    console.error('Firebase Admin init failed:', err);
    // Fail fast so downstream calls don’t throw confusing errors.
    throw err;
  }
}

// Export a ready Firestore instance (or throw immediately if init fails)
const app = initAdminApp();
export const firestore = app.firestore();
