// @module:auth-session @layer:repo @owner:studio
import 'server-only';
import type { User } from '@/modules/users/service/users.types';
import { IronSessionOptions } from 'iron-session';

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
 * STUB: Validates user credentials.
 * @param username - The user's username.
 * @param password - The user's password.
 * @returns A promise that resolves with the user object or rejects with an error.
 */
export async function login(username: string, password: string) {
  console.log(`Repo: Stub login for ${username}`);
  
  // This is a placeholder for actual credential validation.
  // In a real app, you would look up the user in a database.
  if (username === 'admin' && password === 'datHung3384') {
    const user: Omit<User, 'enrolled'> = {
        id: 'user-admin',
        name: 'Admin User',
        username: 'admin',
        email: 'iamhuwng@gmail.com',
        role: 'admin',
    };
    return { success: true, user };
  }

  throw new Error('Invalid username or password');
}
// <<< END gen:auth.login.repo
