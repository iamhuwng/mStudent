// @module:platform-core @layer:repo @owner:studio
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config';

// Ensure all environment variables are loaded
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
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

  const usersCollection = db.collection('users');

  // Clear existing users to prevent duplicates
  console.log('Deleting existing users...');
  const snapshot = await usersCollection.get();
  const deletePromises: Promise<any>[] = [];
  snapshot.forEach((doc) => {
    deletePromises.push(doc.ref.delete());
  });
  await Promise.all(deletePromises);
  console.log('Existing users deleted.');

  // Define users to seed
  const users = [
    {
      username: 'admin',
      email: 'iamhuwng@gmail.com',
      name: 'Admin User',
      password: 'datHung3384', // In a real app, this should be hashed
      role: 'admin',
      enrolled: new Date(),
    },
    {
      username: 'teacher',
      email: 'teacher@example.com',
      name: 'Jane Teacher',
      password: 'password123',
      role: 'teacher',
      enrolled: new Date(),
    },
    {
      username: 'student',
      email: 'student@example.com',
      name: 'John Student',
      password: 'password123',
      role: 'student',
      enrolled: new Date(),
    },
  ];

  // Add new users
  console.log('Adding new users...');
  const writePromises: Promise<any>[] = [];
  for (const user of users) {
    console.log(`- Adding ${user.username} (${user.role})`);
    writePromises.push(usersCollection.add(user));
  }

  await Promise.all(writePromises);
  console.log('Database seeding completed successfully!');
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
