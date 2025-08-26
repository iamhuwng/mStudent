// @module:submissions-grading @layer:service @owner:studio
import type { PaginatedResponse as CorePaginatedResponse } from '@/modules/activity/service/activity.types';

// >>> BEGIN gen:core.types.pagination (layer:service)
export type PaginatedResponse<T> = CorePaginatedResponse<T>;
// <<< END gen:core.types.pagination

export type Grade = {
    score: number;
    total: number;
    comment: string;
    gradedBy: string; // userId of teacher
    gradedAt: Date;
}

export type Submission = {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: Date;
    content: string; // For now, a stub. Could be JSON, a file path, etc.
    grade?: Grade;
};
