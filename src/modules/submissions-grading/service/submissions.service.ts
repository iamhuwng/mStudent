// @module:submissions-grading @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { Submission, Grade } from './submissions.types';

const MODULE_ID = 'submissions-grading';

// >>> BEGIN gen:submissions.create (layer:service)
export async function createSubmission(submissionData: Omit<Submission, 'id' | 'submittedAt' | 'grade'>): Promise<Submission> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Submissions module is disabled.');
    }
    return http<Submission>('/submissions', {
        method: 'POST',
        body: JSON.stringify(submissionData),
    });
}
// <<< END gen:submissions.create

// >>> BEGIN gen:submissions.list.ungraded (layer:service)
export async function getUngradedSubmissions(classId?: string): Promise<Submission[]> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Submissions module is disabled.');
    }
    const params = new URLSearchParams();
    if (classId) params.append('classId', classId);
    params.append('status', 'ungraded');
    
    return http<Submission[]>(`/submissions?${params.toString()}`);
}
// <<< END gen:submissions.list.ungraded

// >>> BEGIN gen:submissions.grade (layer:service)
export async function gradeSubmission(submissionId: string, gradeData: Omit<Grade, 'gradedAt'>): Promise<Submission> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Submissions module is disabled.');
    }
    return http<Submission>(`/submissions/${submissionId}/grade`, {
        method: 'PUT',
        body: JSON.stringify(gradeData),
    });
}
// <<< END gen:submissions.grade

// >>> BEGIN gen:submissions.types (layer:service)
export * from './submissions.types';
// <<< END gen:submissions.types
