// @module:assignments @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { Assignment, BulkAssignmentPayload } from './assignments.types';
import type { Page } from '@/lib/types/pagination';

const MODULE_ID = 'assignments';

// >>> BEGIN gen:assignments.create (layer:service)
export async function createAssignment(assignmentData: Omit<Assignment, 'id' | 'createdAt'>): Promise<Assignment> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Assignments module is disabled.');
    }
    return http<Assignment>('/assignments', {
        method: 'POST',
        body: JSON.stringify(assignmentData),
    });
}
// <<< END gen:assignments.create

// >>> BEGIN gen:assignments.bulkCreate (layer:service)
export async function createBulkAssignments(bulkData: BulkAssignmentPayload): Promise<Assignment[]> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Assignments module is disabled.');
    }
    return http<Assignment[]>('/assignments', {
        method: 'POST',
        body: JSON.stringify(bulkData),
    });
}
// <<< END gen:assignments.bulkCreate

// >>> BEGIN gen:assignments.list.forStudent (layer:service)
export async function getAssignmentsForStudent(
    studentId: string,
    pagination: { limit?: number, cursor?: string }
): Promise<Page<Assignment>> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Assignments module is disabled.');
    }
    const params = new URLSearchParams({ studentId, ...pagination } as Record<string, string>);
    return http<Page<Assignment>>(`/assignments?${params.toString()}`);
}
// <<< END gen:assignments.list.forStudent

// >>> BEGIN gen:assignments.list.forClass (layer:service)
export async function getAssignmentsForClass(
    classId: string,
    pagination: { limit?: number, cursor?: string }
): Promise<Page<Assignment>> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Assignments module is disabled.');
    }
    const params = new URLSearchParams({ classId, ...pagination } as Record<string, string>);
    return http<Page<Assignment>>(`/assignments?${params.toString()}`);
}
// <<< END gen:assignments.list.forClass

// >>> BEGIN gen:assignments.delete (layer:service)
export async function deleteAssignment(id: string): Promise<void> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Assignments module is disabled.');
    }
    await http<null>(`/assignments/${id}`, {
        method: 'DELETE',
    });
}
// <<< END gen:assignments.delete

// >>> BEGIN gen:assignments.types (layer:service)
export * from './assignments.types';
// <<< END gen:assignments.types
