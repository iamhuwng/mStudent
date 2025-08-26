// @module:flashcards @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';

const MODULE_ID = 'flashcards';

// >>> BEGIN gen:flashcards.set.create (layer:service)
export async function createFlashcardSet(setData: any): Promise<any> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    return http<any>('/flashcards/sets', { method: 'POST', body: JSON.stringify(setData) });
}
// <<< END gen:flashcards.set.create

// >>> BEGIN gen:flashcards.card.create (layer:service)
export async function createFlashcard(cardData: any): Promise<any> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    return http<any>('/flashcards/cards', { method: 'POST', body: JSON.stringify(cardData) });
}
// <<< END gen:flashcards.card.create

// >>> BEGIN gen:flashcards.progress.mark (layer:service)
export async function markFlashcardProgress(progressData: any): Promise<void> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Flashcards module is disabled.');
    await http<null>('/flashcards/progress', { method: 'POST', body: JSON.stringify(progressData) });
}
// <<< END gen:flashcards.progress.mark
