// @module:auth-session @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { LoginCredentials, LoginResponse } from './session.types';

const MODULE_ID = 'auth-session';

// >>> BEGIN gen:auth-session.login (layer:service)
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Authentication module is disabled.');
  }

  return http<LoginResponse>('/session/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}
// <<< END gen:auth-session.login

// >>> BEGIN gen:auth-session.logout (layer:service)
export async function logout(): Promise<{ message: string }> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Authentication module is disabled.');
    }
    
    return http<{ message: string }>('/session/logout', {
        method: 'POST',
    });
}
// <<< END gen:auth-session.logout

// Define types for the service
// >>> BEGIN gen:auth-session.types (layer:service)
export * from './session.types';
// <<< END gen:auth-session.types
