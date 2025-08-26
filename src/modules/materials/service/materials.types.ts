// @module:materials @layer:service @owner:studio
import { z } from 'zod';

// Base schema for any task
const ieltsTaskBaseSchema = z.object({
  id: z.string(),
  type: z.string(),
  instructions: z.string(),
});

// Specific task schemas
const ieltsTrueFalseNotGivenTaskSchema = ieltsTaskBaseSchema.extend({
  type: z.literal('true-false-not-given'),
  statements: z.array(z.object({
    id: z.string(),
    text: z.string(),
    answer: z.enum(['true', 'false', 'not-given']),
  })),
});

const ieltsMultipleChoiceTaskSchema = ieltsTaskBaseSchema.extend({
  type: z.literal('multiple-choice'),
  questions: z.array(z.object({
    id: z.string(),
    question: z.string(),
    options: z.array(z.string()),
    answer: z.string(),
  })),
});

// A discriminated union for all possible task types
const ieltsTaskSchema = z.discriminatedUnion('type', [
  ieltsTrueFalseNotGivenTaskSchema,
  ieltsMultipleChoiceTaskSchema,
]);

export const ieltsReadingContentSchema = z.object({
  passages: z.array(z.object({
    id: z.string(),
    title: z.string(),
    text: z.string(),
  })),
  tasks: z.array(ieltsTaskSchema),
});

export const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  format: z.enum(['quiz', 'video', 'document', 'slide', 'ielts-reading']),
  tags: z.array(z.string()),
  timeLimit: z.number().optional(),
  content: z.union([z.string(), ieltsReadingContentSchema]),
});


export type MaterialFormat = 'quiz' | 'video' | 'document' | 'slide' | 'ielts-reading';

export type Material = {
  id: string;
  name: string;
  format: MaterialFormat;
  tags: string[];
  timeLimit?: number; // in minutes
  content: string | z.infer<typeof ieltsReadingContentSchema>; // For now, a stub. Could be JSON, markdown, etc.
};

export type IeltsReadingContent = z.infer<typeof ieltsReadingContentSchema>;
export type IeltsTask = z.infer<typeof ieltsTaskSchema>;
