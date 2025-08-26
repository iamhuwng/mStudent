// @module:flashcards @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { FlashcardSet, Flashcard } from '../service/flashcards.types';
import { logActivity } from '@/modules/activity/repo/activity.repo';
import { isModuleEnabled } from '@/modules/registry';

const setsCollection = firestore.collection('flashcardSets');
const cardsCollection = firestore.collection('flashcards');

// >>> BEGIN gen:flashcards.set.list (layer:repo)
export async function getFlashcardSets(ownerId: string): Promise<FlashcardSet[]> {
    const snapshot = await setsCollection.where('ownerId', '==', ownerId).orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
        } as FlashcardSet;
    });
}
// <<< END gen:flashcards.set.list

// >>> BEGIN gen:flashcards.set.get (layer:repo)
export async function getFlashcardSetById(id: string): Promise<FlashcardSet | null> {
    const doc = await setsCollection.doc(id).get();
    if (!doc.exists) {
        return null;
    }
    const data = doc.data()!;
    return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
    } as FlashcardSet;
}
// <<< END gen:flashcards.set.get

// >>> BEGIN gen:flashcards.set.create (layer:repo)
export async function createFlashcardSet(setData: Omit<FlashcardSet, 'id' | 'createdAt'>): Promise<FlashcardSet> {
    const newSetRef = await setsCollection.add({
        ...setData,
        createdAt: FieldValue.serverTimestamp(),
    });

    const newSet = await getFlashcardSetById(newSetRef.id);

    if (isModuleEnabled('activity')) {
      await logActivity({
          actorId: setData.ownerId,
          action: 'flashcards.set.create',
          entityType: 'flashcardSet',
          entityId: newSet!.id,
          details: { title: newSet!.title },
      });
    }

    return newSet!;
}
// <<< END gen:flashcards.set.create

// >>> BEGIN gen:flashcards.card.list (layer:repo)
export async function getCardsForSet(setId: string): Promise<Flashcard[]> {
    const snapshot = await cardsCollection.where('setId', '==', setId).orderBy('createdAt', 'asc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
        } as Flashcard;
    });
}
// <<< END gen:flashcards.card.list

// >>> BEGIN gen:flashcards.card.create (layer:repo)
export async function createFlashcard(cardData: Omit<Flashcard, 'id'| 'createdAt'>): Promise<Flashcard> {
    const newCardRef = await cardsCollection.add({
        ...cardData,
        createdAt: FieldValue.serverTimestamp(),
    });
    const doc = await newCardRef.get();
    const data = doc.data()!;
    return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
    } as Flashcard;
}
// <<< END gen:flashcards.card.create

// >>> BEGIN gen:flashcards.progress.mark (layer:repo)
export async function markFlashcardProgress(progressData: any): Promise<void> {
    console.log(`Repo: Marking flashcard progress`);
    // This is a stub for future implementation of spaced repetition.
}
// <<< END gen:flashcards.progress.mark
