// @module:flashcards @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { FlashcardSet, Flashcard } from './flashcards.types';

const MODULE_ID = 'flashcards';

// >>> BEGIN gen:flashcards.set.list (layer:service)
export async function getFlashcardSets(): Promise<FlashcardSet[]> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    const response = await http<{data: FlashcardSet[]}>('/flashcards/sets');
    return response.data;
}
// <<< END gen:flashcards.set.list

// >>> BEGIN gen:flashcards.set.get (layer:service)
export async function getFlashcardSetById(id: string): Promise<FlashcardSet> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    const response = await http<{data: FlashcardSet}>(`/flashcards/sets/${id}`);
    return response.data;
}
// <<< END gen:flashcards.set.get

// >>> BEGIN gen:flashcards.set.create (layer:service)
export async function createFlashcardSet(setData: Omit<FlashcardSet, 'id' | 'createdAt'>): Promise<FlashcardSet> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    const response = await http<{data: FlashcardSet}>('/flashcards/sets', { 
        method: 'POST', 
        body: JSON.stringify(setData) 
    });
    return response.data;
}
// <<< END gen:flashcards.set.create


// >>> BEGIN gen:flashcards.card.list (layer:service)
export async function getCardsForSet(setId: string): Promise<Flashcard[]> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    const response = await http<{data: Flashcard[]}>(`/flashcards/sets/${setId}/cards`);
    return response.data;
}
// <<< END gen:flashcards.card.list


// >>> BEGIN gen:flashcards.card.create (layer:service)
export async function createFlashcard(cardData: Omit<Flashcard, 'id'| 'createdAt'>): Promise<Flashcard> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    return http<Flashcard>('/flashcards/cards', { method: 'POST', body: JSON.stringify(cardData) });
}
// <<< END gen:flashcards.card.create

// >>> BEGIN gen:flashcards.progress.mark (layer:service)
export async function markFlashcardProgress(progressData: any): Promise<void> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    await http<null>('/flashcards/progress', { method: 'POST', body: JSON.stringify(progressData) });
}
// <<< END gen:flashcards.progress.mark

// >>> BEGIN gen:flashcards.types (layer:service)
export * from './flashcards.types';
// <<< END gen:flashcards.types
