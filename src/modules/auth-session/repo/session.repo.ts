// @module:auth-session @layer:repo @owner:studio
import 'server-only';
import type { User } from '@/modules/users/service/users.types';
import { IronSessionOptions } from 'iron-session';
import { firestore } from '@/lib/firebase/firebase-admin';

// >>> BEGIN gen:auth.claims.ensure (layer:repo)
export interface SessionData {
  isLoggedIn: boolean;
  user: Omit<User, 'enrolled'>;
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
 * Validates user credentials against Firestore.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise that resolves with the user object or rejects with an error.
 */
export async function login(username: string, password: string) {
  console.log(`Repo: Attempting login for ${username}`);
  
  const usersCollection = firestore.collection('users');
  const snapshot = await usersCollection.where('username', '==', username).limit(1).get();

  if (snapshot.empty) {
    throw new Error('Invalid username or password');
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();
  
  // This is a placeholder for password validation. 
  // In a real application, you should use a library like bcrypt to compare hashed passwords.
  if (userData.password && userData.password === password) {
    const user: Omit<User, 'enrolled'> = {
        id: userDoc.id,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        role: userData.role,
    };
    return { success: true, user };
  }


  throw new Error('Invalid username or password');
}
// <<< END gen:auth.login.repo
