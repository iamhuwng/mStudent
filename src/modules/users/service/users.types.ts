// @module:users @layer:service @owner:studio
import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    role: z.enum(['student', 'teacher', 'admin']),
    enrolled: z.date(),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
});


export type User = z.infer<typeof userSchema>;
