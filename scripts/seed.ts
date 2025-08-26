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

  // Clear existing data
  console.log('Deleting existing data...');
  const collections = ['users', 'classes', 'materials', 'classMembers'];
  for (const col of collections) {
      const snapshot = await db.collection(col).get();
      const deletePromises: Promise<any>[] = [];
      snapshot.forEach((doc) => {
        deletePromises.push(doc.ref.delete());
      });
      await Promise.all(deletePromises);
      console.log(`- Existing ${col} deleted.`);
  }

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

  // --- Seed Classes ---
  console.log('Adding new classes...');
  const classes = [
      { id: 'class-algebra', name: 'Algebra 101', description: 'An introductory course on modern algebra.'},
      { id: 'class-history', name: 'World History', description: 'A survey of world history from 1500 to the present.'},
  ];
  const classPromises = classes.map(cls => {
      console.log(`- Adding class: ${cls.name}`);
      return db.collection('classes').doc(cls.id).set(cls);
  });
  await Promise.all(classPromises);

  // --- Seed Materials ---
  console.log('Adding new materials...');
  const materials = [
      { id: 'mat-alg-quiz', name: 'Algebra Basics Quiz', format: 'quiz', tags: ['algebra', 'quiz'], timeLimit: 30, content: 'This quiz covers basic algebraic concepts including variables, equations, and functions.' },
      { id: 'mat-hist-video', name: 'The Renaissance', format: 'video', tags: ['history', 'renaissance', 'video'], content: 'A documentary exploring the cultural rebirth of Europe.' },
      { id: 'mat-alg-doc', name: 'Polynomials Explained', format: 'document', tags: ['algebra', 'polynomials'], content: 'A comprehensive document detailing the properties and operations of polynomials.' },
  ];
  const materialPromises = materials.map(mat => {
      console.log(`- Adding material: ${mat.name}`);
      return db.collection('materials').doc(mat.id).set(mat);
  });
  await Promise.all(materialPromises);

  // --- Seed Class Members ---
  console.log('Assigning members to classes...');
  const assignments = [
      { classId: 'class-algebra', userId: 'user-teacher-1', role: 'teacher' },
      { classId: 'class-algebra', userId: 'user-student-1', role: 'student' },
      { classId: 'class-history', userId: 'user-teacher-1', role: 'teacher' },
      { classId: 'class-history', userId: 'user-student-1', role: 'student' },
      { classId: 'class-history', userId: 'user-student-2', role: 'student' },
  ];
  const assignmentPromises = assignments.map(a => {
      console.log(`- Assigning ${a.userId} to ${a.classId}`);
      return db.collection('classMembers').add(a);
  });
  await Promise.all(assignmentPromises);


  console.log('Database seeding completed successfully!');
}

seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
