// @module:users @layer:repo @owner:studio
import 'server-only';
import type { User } from '../service/users.types';

const MOCK_USERS: User[] = [
    { id: 'user-admin', username: 'admin', email: 'iamhuwng@gmail.com', name: 'Admin User', role: 'admin', enrolled: new Date('2023-01-01') },
    { id: 'user-teacher-1', username: 'teacher', email: 'teacher@example.com', name: 'Jane Teacher', role: 'teacher', enrolled: new Date('2023-02-15') },
    { id: 'user-student-1', username: 'student', email: 'student@example.com', name: 'John Student', role: 'student', enrolled: new Date('2023-09-01') },
];


// >>> BEGIN gen:users.list.repo (layer:repo)
export async function getUsers(): Promise<User[]> {
  console.log('Repo: Fetching all users (mock)');
  return Promise.resolve(MOCK_USERS);
}
// <<< END gen:users.list.repo

// >>> BEGIN gen:users.detail.repo (layer:repo)
export async function getUserById(id: string): Promise<User | null> {
  console.log(`Repo: Fetching user with id ${id} (mock)`);
  const user = MOCK_USERS.find(u => u.id === id) || null;
  return Promise.resolve(user);
}
// <<< END gen:users.detail.repo

// >>> BEGIN gen:users.create.repo (layer:repo)
export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
    console.log('Repo: Creating new user (mock)');
    const newUser: User = {
        id: `user-new-${Date.now()}`,
        ...userData,
    };
    MOCK_USERS.push(newUser);
    return Promise.resolve(newUser);
}
// <<< END gen:users.create.repo

// >>> BEGIN gen:users.update.repo (layer:repo)
export async function updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    console.log(`Repo: Updating user with id ${id} (mock)`);
    const userIndex = MOCK_USERS.findIndex(u => u.id === id);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...userData };
    return Promise.resolve(MOCK_USERS[userIndex]);
}
// <<< END gen:users.update.repo

// >>> BEGIN gen:users.delete.repo (layer:repo)
export async function deleteUser(id: string): Promise<void> {
    console.log(`Repo: Deleting user with id ${id} (mock)`);
    const userIndex = MOCK_USERS.findIndex(u => u.id === id);
    if (userIndex === -1) {
        throw new Error('User not found');
    }
    MOCK_USERS.splice(userIndex, 1);
    return Promise.resolve();
}
// <<< END gen:users.delete.repo
