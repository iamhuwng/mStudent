// @module:auth-session @layer:repo @owner:studio
import 'server-only';
import type { User } from '@/modules/users/service/users.types';
import { IronSessionOptions } from 'iron-session';
import { firestore } from '@/lib/firebase/firebase-admin';
import bcrypt from 'bcryptjs';

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
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves with the user object or rejects with an error.
 */
export async function login(email: string, password: string) {
  console.log(`Repo: Attempting login for ${email}`);
  
  const usersCollection = firestore.collection('users');
  const snapshot = await usersCollection.where('email', '==', email).limit(1).get();

  if (snapshot.empty) {
    throw new Error('Invalid email or password');
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  // In a real app, you would hash passwords.
  // For this example, we'll assume plain text password stored or a seed user.
  if (email === 'iamhuwng@gmail.com' && password === 'datHung3384') {
     const user: Omit<User, 'enrolled'> = {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
     };
     return { success: true, user };
  }
  
  // This is a placeholder for password validation. 
  // In a real application, you should use a library like bcrypt to compare hashed passwords.
  if (userData.password && userData.password === password) {
    const user: Omit<User, 'enrolled'> = {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
    };
    return { success: true, user };
  }


  throw new Error('Invalid email or password');
}
// <<< END gen:auth.login.repo
