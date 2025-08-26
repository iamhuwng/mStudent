// @module:users @layer:service @owner:studio
export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    enrolled: Date;
    password?: string; // Only present for creation, never returned from API
};
