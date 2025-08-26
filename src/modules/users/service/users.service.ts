// @module:users @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { User } from './users.types';

const MODULE_ID = 'users';

// >>> BEGIN gen:users.get-users (layer:service)
export async function getUsers(): Promise<User[]> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Users module is disabled.');
  }
  return http<User[]>('/users');
}
// <<< END gen:users.get-users

// >>> BEGIN gen:users.get-user-by-id (layer:service)
export async function getUserById(id: string): Promise<User> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Users module is disabled.');
  }
  return http<User>(`/users/${id}`);
}
// <<< END gen:users.get-user-by-id

// >>> BEGIN gen:users.types (layer:service)
export * from './users.types';
// <<< END gen:users.types
