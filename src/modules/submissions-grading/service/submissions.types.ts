// @module:submissions-grading @layer:service @owner:studio
import type { Page as CorePage } from '@/lib/types/pagination';

// >>> BEGIN gen:core.types.pagination (layer:service)
/** @deprecated use Page from @/lib/types/pagination directly */
export type PaginatedResponse<T> = CorePage<T>;
// <<< END gen:core.types.pagination

export type PerQuestionGrade = {
    questionId: string;
    isCorrect: boolean;
    studentAnswer: any;
    correctAnswer: any;
    feedback?: string;
};

export type Grade = {
    score: number;
    total: number;
    comment: string;
    gradedBy: string; // userId of teacher
    gradedAt: Date;
    details?: PerQuestionGrade[]; // Detailed breakdown
};

export type Submission = {
    id: string;
    assignmentId: string;
    studentId: string;
    submittedAt: Date;
    content: Record<string, any>; // Student's answers { questionId: answer }
    status: 'graded' | 'ungraded';
    grade?: Grade;
};
