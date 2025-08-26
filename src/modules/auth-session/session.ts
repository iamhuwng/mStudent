// @module:auth-session @layer:repo @owner:studio
import type { IronSessionOptions } from 'iron-session';
import type { User } from '@/modules/users/service/users.types';

export interface SessionData {
  isLoggedIn: boolean;
  user: Omit<User, 'enrolled' | 'password'>;
}

export const sessionOptions: IronSessionOptions = {
  password: (process.env.SECRET_COOKIE_PASSWORD as string)?.trim(),
  cookieName: 'mstudent-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};