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

// >>> BEGIN gen:users.list.repo (layer:repo)
export async function getUsers(): Promise<User[]> {
  console.log('Repo: Fetching all users');
  // In a real app, this would query Firestore
  return Promise.resolve(mockUsers);
}
// <<< END gen:users.list.repo

// >>> BEGIN gen:users.detail.repo (layer:repo)
export async function getUserById(id: string): Promise<User | null> {
  console.log(`Repo: Fetching user with id ${id}`);
  // In a real app, this would query Firestore
  const user = mockUsers.find(u => u.id === id) || null;
  return Promise.resolve(user);
}
// <<< END gen:users.detail.repo

// >>> BEGIN gen:users.create.repo (layer:repo)
export async function createUser(userData: Omit<User, 'id' | 'enrolled'>): Promise<User> {
    console.log('Repo: Creating new user');
    const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        ...userData,
        enrolled: new Date(),
    };
    mockUsers.push(newUser);
    return Promise.resolve(newUser);
}
// <<< END gen:users.create.repo

// >>> BEGIN gen:users.update.repo (layer:repo)
export async function updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    console.log(`Repo: Updating user with id ${id}`);
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    const updatedUser = { ...mockUsers[userIndex], ...userData };
    mockUsers[userIndex] = updatedUser;
    return Promise.resolve(updatedUser);
}
// <<< END gen:users.update.repo

// >>> BEGIN gen:users.delete.repo (layer:repo)
export async function deleteUser(id: string): Promise<void> {
    console.log(`Repo: Deleting user with id ${id}`);
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    mockUsers.splice(userIndex, 1);
    return Promise.resolve();
}
// <<< END gen:users.delete.repo
