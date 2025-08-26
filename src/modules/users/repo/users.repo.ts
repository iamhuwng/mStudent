// @module:users @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import type { User } from '../service/users.types';
import { FieldValue } from 'firebase-admin/firestore';

const usersCollection = firestore.collection('users');

// >>> BEGIN gen:users.list.repo (layer:repo)
export async function getUsers(limit: number = 10, startAfterDocId?: string): Promise<{users: User[], hasNextPage: boolean}> {
  console.log('Repo: Fetching users from Firestore with pagination');
  let query = usersCollection.orderBy('name').limit(limit + 1);

  if (startAfterDocId) {
    const startAfterDoc = await usersCollection.doc(startAfterDocId).get();
    if (startAfterDoc.exists) {
        query = query.startAfter(startAfterDoc);
    }
  }

  const snapshot = await query.get();
  if (snapshot.empty) {
    return { users: [], hasNextPage: false };
  }

  const users = snapshot.docs.map(doc => {
    const { password, ...user } = doc.data();
    return {
        id: doc.id,
        ...user,
        enrolled: user.enrolled?.toDate(),
    } as User
  });

  const hasNextPage = users.length > limit;
  if (hasNextPage) {
    users.pop(); // Remove the extra document used to check for the next page
  }

  return { users, hasNextPage };
}
// <<< END gen:users.list.repo

// >>> BEGIN gen:users.detail.repo (layer:repo)
export async function getUserById(id: string): Promise<User | null> {
  console.log(`Repo: Fetching user with id ${id} from Firestore`);
  const doc = await usersCollection.doc(id).get();
  if (!doc.exists) {
    return null;
  }
  const data = doc.data();
  // Exclude password from the returned data
  const { password, ...user } = data!;
  return {
    id: doc.id,
    ...user,
    enrolled: user.enrolled?.toDate(),
  } as User;
}
// <<< END gen:users.detail.repo

// >>> BEGIN gen:users.create.repo (layer:repo)
export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
    console.log('Repo: Creating new user in Firestore');
    const newUserPayload = {
      ...userData,
      enrolled: FieldValue.serverTimestamp(),
    };
    const newUserRef = await usersCollection.add(newUserPayload);
    const newUser = await getUserById(newUserRef.id);
    return newUser!;
}
// <<< END gen:users.create.repo

// >>> BEGIN gen:users.update.repo (layer:repo)
export async function updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    console.log(`Repo: Updating user with id ${id} in Firestore`);
    const userRef = usersCollection.doc(id);
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
    const userRef = usersCollection.doc(id);
    const doc = await userRef.get();
    if (!doc.exists) {
        throw new Error('User not found');
    }
    await userRef.delete();
}
// <<< END gen:users.delete.repo
