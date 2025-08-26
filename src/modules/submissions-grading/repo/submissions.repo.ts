// @module:submissions-grading @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Submission, Grade } from '../service/submissions.types';

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
export async function getUngradedSubmissions(classId?: string): Promise<Submission[]> {
    // This is a simplification. A real implementation would need to join across assignments to filter by class.
    // For now, we will fetch all ungraded submissions.
    let query = submissionsCollection.where('grade', '==', null).orderBy('submittedAt', 'desc');

    const snapshot = await query.get();
    if (snapshot.empty) {
        return [];
    }

    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            submittedAt: data.submittedAt.toDate(),
        } as Submission;
    });
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
