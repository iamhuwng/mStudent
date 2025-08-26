// @module:platform-core @layer:repo @owner:studio
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Explicitly load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Log to confirm that the environment variable is loaded
console.log(`Attempting to connect to Firebase project: ${process.env.FIREBASE_PROJECT_ID}`);

// Ensure all environment variables are loaded
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n').trim(),
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
  console.error('Firebase Admin SDK credentials are not set in .env.local');
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function seedDatabase() {
  console.log('Starting to seed database...');

  // Clear existing data
  console.log('Deleting existing users...');
  const usersSnapshot = await db.collection('users').get();
  const deletePromises: Promise<any>[] = [];
  usersSnapshot.forEach((doc) => {
    deletePromises.push(doc.ref.delete());
  });
  await Promise.all(deletePromises);
  console.log('- Existing users deleted.');

  // --- Seed Users ---
  console.log('Adding new users...');
  const users = [
    { id: 'user-admin', username: 'admin', email: 'iamhuwng@gmail.com', name: 'Admin User', password: 'datHung3384', role: 'admin', enrolled: new Date() },
    { id: 'user-teacher-1', username: 'teacher', email: 'teacher@example.com', name: 'Jane Teacher', password: 'password123', role: 'teacher', enrolled: new Date() },
    { id: 'user-student-1', username: 'student', email: 'student@example.com', name: 'John Student', password: 'password123', role: 'student', enrolled: new Date() },
    { id: 'user-student-2', username: 'student2', email: 'student2@example.com', name: 'Jill Student', password: 'password123', role: 'student', enrolled: new Date() },
  ];
  const userPromises = users.map(user => {
      console.log(`- Adding ${user.username} (${user.role})`);
      return db.collection('users').doc(user.id).set(user);
  });
  await Promise.all(userPromises);

  console.log('Database seeding completed successfully!');
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
