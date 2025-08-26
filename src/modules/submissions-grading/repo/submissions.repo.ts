// @module:submissions-grading @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import type { Submission, Grade } from '../service/submissions.types';
import type { Page } from '@/lib/types/pagination';

const submissionsCollection = firestore.collection('submissions');

// >>> BEGIN gen:submissions.create (layer:repo)
export async function createSubmission(submissionData: Omit<Submission, 'id' | 'submittedAt' | 'grade'>): Promise<Submission> {
    const newSubmissionRef = await submissionsCollection.add({
        ...submissionData,
        submittedAt: FieldValue.serverTimestamp(),
        grade: null,
    });
    const snapshot = await newSubmissionRef.get();
    const data = snapshot.data();
    return {
        id: snapshot.id,
        ...data,
        submittedAt: data?.submittedAt.toDate(),
    } as Submission;
}
// <<< END gen:submissions.create

// >>> BEGIN gen:submissions.list.ungraded (layer:repo)
export async function getUngradedSubmissions(
    filters: { classId?: string },
    pagination: { limit: number, cursor?: string }
): Promise<Page<Submission>> {
    // This is a simplification. A real implementation would need to join across assignments to filter by class.
    // For now, we will fetch all ungraded submissions.
    let query = submissionsCollection.where('grade', '==', null).orderBy('submittedAt', 'desc');

    if (pagination.cursor) {
        const cursorTimestamp = Timestamp.fromMillis(parseInt(pagination.cursor));
        query = query.startAfter(cursorTimestamp);
    }
    
    const snapshot = await query.limit(pagination.limit + 1).get();
    if (snapshot.empty) {
        return { items: [], nextCursor: null, hasMore: false };
    }

    const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            submittedAt: data.submittedAt.toDate(),
        } as Submission;
    });

    const hasMore = items.length > pagination.limit;
    let nextCursor: string | null = null;

    if (hasMore) {
        const nextCursorDoc = items.pop();
        const timestamp = (nextCursorDoc!.submittedAt as Date).getTime();
        nextCursor = timestamp.toString();
    }
    
    return { items, nextCursor, hasMore };
}
// <<< END gen:submissions.list.ungraded

// >>> BEGIN gen:submissions.grade (layer:repo)
export async function gradeSubmission(submissionId: string, gradeData: Omit<Grade, 'gradedAt'>): Promise<Submission> {
    const docRef = submissionsCollection.doc(submissionId);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Submission not found');
    }

    const grade: Grade = {
        ...gradeData,
        gradedAt: new Date(),
    };
    
    await docRef.update({ grade });
    
    const updatedDoc = await docRef.get();
    const data = updatedDoc.data()!;

    return {
        id: updatedDoc.id,
        ...data,
        submittedAt: data.submittedAt.toDate(),
        grade: {
            ...data.grade,
            gradedAt: data.grade.gradedAt.toDate(),
        }
    } as Submission;
}
// <<< END gen:submissions.grade
