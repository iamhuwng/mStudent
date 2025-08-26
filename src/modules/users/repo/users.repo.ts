// @module:users @layer:repo @owner:studio
import 'server-only';
import type { User } from '../service/users.types';

// Mock data store
const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'student', enrolled: new Date('2023-09-01') },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', role: 'student', enrolled: new Date('2022-09-01') },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'teacher', enrolled: new Date('2020-08-15') },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'student', enrolled: new Date('2023-09-01') },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', role: 'admin', enrolled: new Date('2018-01-20') },
];


// >>> BEGIN gen:users.repo-get-users (layer:repo)
export async function getUsers(): Promise<User[]> {
  console.log('Repo: Fetching all users');
  // In a real app, this would query Firestore
  return Promise.resolve(mockUsers);
}
// <<< END gen:users.repo-get-users

// >>> BEGIN gen:users.repo-get-user-by-id (layer:repo)
export async function getUserById(id: string): Promise<User | null> {
  console.log(`Repo: Fetching user with id ${id}`);
  // In a real app, this would query Firestore
  const user = mockUsers.find(u => u.id === id) || null;
  return Promise.resolve(user);
}
// <<< END gen:users.repo-get-user-by-id
