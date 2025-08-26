// @module:auth-session @layer:repo @owner:studio
import 'server-only';
import type { User } from '@/modules/users/service/users.types';
import { firestore } from '@/lib/firebase/firebase-admin';

// >>> BEGIN gen:auth.claims.ensure (layer:repo)
export interface SessionData {
  isLoggedIn: boolean;
  user: Omit<User, 'enrolled' | 'password'>;
}
// <<< END gen:auth.claims.ensure

// >>> BEGIN gen:auth.login.repo (layer:repo)
/**
 * Validates user credentials. 
 * This now checks against Firestore and validates the password.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise that resolves with the user object or rejects with an error.
 */
export async function login(username: string, password: string): Promise<{ success: true, user: Omit<User, 'enrolled' | 'password'> }> {
  const usersRef = firestore.collection('users');
  const snapshot = await usersRef.where('username', '==', username.toLowerCase()).limit(1).get();

  if (snapshot.empty) {
    // This is a temporary fallback for the initial admin user.
    // In a real application, all users should be in the database.
    if (username.toLowerCase() === 'admin' && password === 'datHung3384') {
        return {
            success: true,
            user: {
                id: 'user-admin',
                username: 'admin',
                email: 'iamhuwng@gmail.com',
                name: 'Admin User',
                role: 'admin',
            },
        };
    }
    throw new Error('Invalid username or password');
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  // In a real app, passwords should be hashed.
  // For this project, we are comparing plaintext passwords.
  if (userData.password !== password) {
    throw new Error('Invalid username or password');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, enrolled, ...userToReturn } = userData;

  return {
    success: true,
    user: {
        id: userDoc.id,
        ...userToReturn
    } as Omit<User, 'enrolled' | 'password'>,
  };
}
// <<< END gen:auth.login.repo
