// @module:users @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { User } from './users.types';

const MODULE_ID = 'users';

export type GetUsersResponse = {
    users: User[];
    hasNextPage: boolean;
}

// >>> BEGIN gen:users.list.service (layer:service)
export async function getUsers(limit: number = 10, startAfter?: string): Promise<GetUsersResponse> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Users module is disabled.');
  }
  const params = new URLSearchParams({ limit: String(limit) });
  if (startAfter) {
    params.append('startAfter', startAfter);
  }
  return http<GetUsersResponse>(`/users?${params.toString()}`);
}
// <<< END gen:users.list.service

// >>> BEGIN gen:users.detail.service (layer:service)
export async function getUserById(id: string): Promise<User> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Users module is disabled.');
  }
  return http<User>(`/users/${id}`);
}
// <<< END gen:users.detail.service

// >>> BEGIN gen:users.create.service (layer:service)
export async function createUser(userData: Omit<User, 'id' | 'enrolled'>): Promise<User> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Users module is disabled.');
    }
    return http<User>('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}
// <<< END gen:users.create.service

// >>> BEGIN gen:users.update.service (layer:service)
export async function updateUser(id: string, userData: Partial<Omit<User, 'id'>>): Promise<User> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Users module is disabled.');
    }
    return http<User>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
    });
}
// <<< END gen:users.update.service

// >>> BEGIN gen:users.delete.service (layer:service)
export async function deleteUser(id: string): Promise<void> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Users module is disabled.');
    }
    await http<null>(`/users/${id}`, {
        method: 'DELETE',
    });
}
// <<< END gen:users.delete.service

// >>> BEGIN gen:users.types (layer:service)
export * from './users.types';
// <<< END gen:users.types
