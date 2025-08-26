// @module:auth-session @layer:service @owner:studio
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your username.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export type LoginResponse = {
  success: boolean;
  user: {
    username: string;
    name: string;
    roles: string[];
  };
};
