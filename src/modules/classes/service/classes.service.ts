// @module:classes @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { Class, ClassMember } from './classes.types';

const MODULE_ID = 'classes';

// >>> BEGIN gen:classes.list.service (layer:service)
export async function getClasses(): Promise<Class[]> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Classes module is disabled.');
  }
  return http<Class[]>('/classes');
}
// <<< END gen:classes.list.service

// >>> BEGIN gen:classes.detail.service (layer:service)
export async function getClassById(id: string): Promise<Class> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Classes module is disabled.');
  }
  return http<Class>(`/classes/${id}`);
}
// <<< END gen:classes.detail.service

// >>> BEGIN gen:classes.members.service (layer:service)
export async function getClassMembers(classId: string): Promise<ClassMember[]> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Classes module is disabled.');
  }
  return http<ClassMember[]>(`/classes/${classId}/members`);
}
// <<< END gen:classes.members.service

// >>> BEGIN gen:classes.create.service (layer:service)
export async function createClass(classData: Omit<Class, 'id'>): Promise<Class> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Classes module is disabled.');
    }
    return http<Class>('/classes', {
        method: 'POST',
        body: JSON.stringify(classData),
    });
}
// <<< END gen:classes.create.service

// >>> BEGIN gen:classes.assign.service (layer:service)
export async function assignMemberToClass(classId: string, memberData: Omit<ClassMember, 'classId' | 'user'>): Promise<ClassMember> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Classes module is disabled.');
    }
    return http<ClassMember>(`/classes/${classId}/members`, {
        method: 'POST',
        body: JSON.stringify(memberData),
    });
}
// <<< END gen:classes.assign.service

// >>> BEGIN gen:classes.types (layer:service)
export * from './classes.types';
// <<< END gen:classes.types
