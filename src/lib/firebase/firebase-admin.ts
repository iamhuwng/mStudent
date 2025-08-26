// @module:platform-core @layer:repo @owner:studio
import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n').trim();
    if (!privateKey) {
        throw new Error("FIREBASE_PRIVATE_KEY is not set or empty in your environment variables.");
    }
    
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID?.trim(),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.trim(),
        privateKey: privateKey,
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID?.trim()}.firebaseio.com`,
    });
  } catch (error) {
    console.error('Firebase admin initialization error. Make sure your .env.local file is configured correctly.', error);
  }
}

const firestore = admin.firestore();
export { firestore };