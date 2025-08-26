// @module:auth-session @layer:service @owner:studio
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export type LoginResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
    roles: string[];
  };
};
