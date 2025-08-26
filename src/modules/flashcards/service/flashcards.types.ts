// @module:flashcards @layer:service @owner:studio
import { z } from 'zod';

export const flashcardSetSchema = z.object({
  id: z.string(),
  ownerId: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  createdAt: z.date(),
});

export const flashcardSchema = z.object({
  id: z.string(),
  setId: z.string(),
  term: z.string().min(1, "Term is required"),
  definition: z.string().min(1, "Definition is required"),
  createdAt: z.date(),
});

export type FlashcardSet = z.infer<typeof flashcardSetSchema>;
export type Flashcard = z.infer<typeof flashcardSchema>;
