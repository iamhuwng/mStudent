// @module:auth-session @layer:repo @owner:studio
import 'server-only';
import type { User } from '@/modules/users/service/users.types';

// >>> BEGIN gen:auth.claims.ensure (layer:repo)
export interface SessionData {
  isLoggedIn: boolean;
  user: Omit<User, 'enrolled' | 'password'>;
}
// <<< END gen:auth.claims.ensure

// >>> BEGIN gen:auth.login.repo (layer:repo)
/**
 * Validates user credentials. This is a stub implementation.
 * In a real application, this would involve a database lookup and password hashing.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise that resolves with the user object or rejects with an error.
 */
export async function login(username: string, password: string): Promise<{ success: true, user: Omit<User, 'enrolled' | 'password'> }> {
  console.log(`Repo: Stub login for ${username}`);
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
// <<< END gen:auth.login.repo
