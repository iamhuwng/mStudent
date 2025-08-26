// @module:submissions-grading @layer:service @owner:studio
import type { Page as CorePage } from '@/lib/types/pagination';
import { z } from 'zod';

// >>> BEGIN gen:core.types.pagination (layer:service)
/** @deprecated use Page from @/lib/types/pagination directly */
export type PaginatedResponse<T> = CorePage<T>;
// <<< END gen:core.types.pagination

export const perQuestionGradeSchema = z.object({
    questionId: z.string(),
    isCorrect: z.boolean(),
    studentAnswer: z.any(),
    correctAnswer: z.any(),
    feedback: z.string().optional(),
});

export const gradeSchema = z.object({
    score: z.number(),
    total: z.number(),
    comment: z.string().optional(),
    gradedBy: z.string(), // userId of teacher
    gradedAt: z.date(),
    details: z.array(perQuestionGradeSchema).optional(), // Detailed breakdown
});

export const submissionSchema = z.object({
    id: z.string(),
    assignmentId: z.string(),
    studentId: z.string(),
    submittedAt: z.date(),
    content: z.record(z.any()), // Student's answers { questionId: answer }
    status: z.enum(['graded', 'ungraded']),
    grade: gradeSchema.optional(),
});

export type PerQuestionGrade = z.infer<typeof perQuestionGradeSchema>;
export type Grade = z.infer<typeof gradeSchema>;
export type Submission = z.infer<typeof submissionSchema>;

    