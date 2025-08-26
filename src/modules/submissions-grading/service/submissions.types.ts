// @module:submissions-grading @layer:service @owner:studio
import type { Page as CorePage } from '@/lib/types/pagination';

// >>> BEGIN gen:core.types.pagination (layer:service)
/** @deprecated use Page from @/lib/types/pagination directly */
export type PaginatedResponse<T> = CorePage<T>;
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
