// @module:users @layer:service @owner:studio
import { z } from 'zod';

export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    enrolled: Date;
    password?: string; // Only present for creation, never returned from API
};

export const userCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    role: z.enum(['student', 'teacher', 'admin']),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const userUpdateSchema = userCreateSchema.partial();
