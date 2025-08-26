// @module:materials @layer:service @owner:studio
import { z } from 'zod';

export const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  format: z.enum(['quiz', 'video', 'document', 'slide']),
  tags: z.array(z.string()),
  timeLimit: z.number().optional(),
  content: z.string(),
});


export type MaterialFormat = 'quiz' | 'video' | 'document' | 'slide';

export type Material = {
  id: string;
  name: string;
  format: MaterialFormat;
  tags: string[];
  timeLimit?: number; // in minutes
  content: string; // For now, a stub. Could be JSON, markdown, etc.
};
