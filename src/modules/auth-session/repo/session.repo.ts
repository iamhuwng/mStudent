// @module:auth-session @layer:repo @owner:studio
import 'server-only';
import type { User } from '@/modules/users/service/users.types';
import { IronSessionOptions } from 'iron-session';
import { firestore } from '@/lib/firebase/firebase-admin';

// >>> BEGIN gen:auth.claims.ensure (layer:repo)
export interface SessionData {
  isLoggedIn: boolean;
  user: Omit<User, 'enrolled' | 'password'>;
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'm-student-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
// <<< END gen:auth.claims.ensure

// >>> BEGIN gen:auth.login.repo (layer:repo)
/**
 * Validates user credentials against the Firestore database.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise that resolves with the user object or rejects with an error.
 */
export async function login(username: string, password: string): Promise<{ success: true, user: Omit<User, 'enrolled' | 'password'> }> {
  console.log(`Repo: Attempting login for ${username}`);
  
  const usersRef = firestore.collection('users');
  const snapshot = await usersRef.where('username', '==', username).limit(1).get();

  if (snapshot.empty) {
    console.log(`Repo: User not found: ${username}`);
    throw new Error('Invalid username or password');
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  if (userData.password !== password) {
    console.log(`Repo: Invalid password for user: ${username}`);
    throw new Error('Invalid username or password');
  }

  const { password: _, enrolled: __, ...user } = userData;
  
  console.log(`Repo: Login successful for ${username}`);
  return { success: true, user: user as Omit<User, 'enrolled' | 'password'> };
}
// <<< END gen:auth.login.repo
