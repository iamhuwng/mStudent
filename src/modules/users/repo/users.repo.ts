// @module:users @layer:repo @owner:studio
import 'server-only';
import type { User } from '../service/users.types';
import { firestore } from '@/lib/firebase/firebase-admin';

// >>> BEGIN gen:users.list.repo (layer:repo)
export async function getUsers(): Promise<User[]> {
  console.log('Repo: Fetching users from Firestore');
  const snapshot = await firestore.collection('users').get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        enrolled: data.enrolled.toDate(),
    } as User;
  });
}
// <<< END gen:users.list.repo

// >>> BEGIN gen:users.detail.repo (layer:repo)
export async function getUserById(id: string): Promise<User | null> {
  console.log(`Repo: Fetching user with id ${id} from Firestore`);
  const doc = await firestore.collection('users').doc(id).get();
  if (!doc.exists) {
    return null;
  }
  const data = doc.data()!;
  return {
    id: doc.id,
    ...data,
    enrolled: data.enrolled.toDate(),
  } as User;
}
// <<< END gen:users.detail.repo

// >>> BEGIN gen:users.create.repo (layer:repo)
export async function createUser(userData: Omit<User, 'id' | 'enrolled'>): Promise<User> {
    console.log('Repo: Creating new user in Firestore');
    const newUserRef = await firestore.collection('users').add({
        ...userData,
        enrolled: new Date(),
    });
    const newUser = await getUserById(newUserRef.id);
    return newUser!;
}
// <<< END gen:users.create.repo

// >>> BEGIN gen:users.update.repo (layer:repo)
export async function updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    console.log(`Repo: Updating user with id ${id} in Firestore`);
    const userRef = firestore.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
        throw new Error('User not found');
    }

    await userRef.update(userData);
    const updatedUser = await getUserById(id);
    return updatedUser!;
}
// <<< END gen:users.update.repo

// >>> BEGIN gen:users.delete.repo (layer:repo)
export async function deleteUser(id: string): Promise<void> {
    console.log(`Repo: Deleting user with id ${id} from Firestore`);
    const userRef = firestore.collection('users').doc(id);
    const doc = await userRef.get();

    if (!doc.exists) {
        throw new Error('User not found');
    }

    await userRef.delete();
}
// <<< END gen:users.delete.repo
