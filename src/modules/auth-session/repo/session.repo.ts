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
 * A placeholder for real login logic. In a real app, this would
 * validate credentials against a database (e.g., Firestore).
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A promise that resolves with a success message or rejects with an error.
 */
export async function login(email: string, password: string) {
  console.log(`Repo: Attempting login for ${email}`);

  // Seed user check
  if (email === 'iamhuwng@gmail.com' && password === 'datHung3384') {
    return {
      success: true,
      user: {
        id: 'dev-admin',
        name: 'Admin User',
        email: 'iamhuwng@gmail.com',
        role: 'admin' as const,
      },
    };
  }

  // Stub validation
  if (password === 'password123' && email.includes('@')) {
    return {
      success: true,
      user: {
        id: 'test-user',
        email,
        name: 'Test User',
        role: 'student' as const,
      },
    };
  } else {
    throw new Error('Invalid email or password');
  }
}
// <<< END gen:auth.login.repo
