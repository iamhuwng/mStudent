// @module:submissions-grading @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Submission, Grade } from '../service/submissions.types';

const submissionsCollection = firestore.collection('submissions');

// >>> BEGIN gen:submissions.create (layer:repo)
export async function createSubmission(submissionData: Omit<Submission, 'id' | 'submittedAt' | 'grade'>): Promise<Submission> {
    console.log(`Repo: Creating submission for student ${submissionData.studentId}`);
    const submissionPayload = {
        ...submissionData,
        submittedAt: FieldValue.serverTimestamp(),
        grade: null,
    };
    const docRef = await submissionsCollection.add(submissionPayload);
    const snapshot = await docRef.get();
    const data = snapshot.data()!;
    return {
        id: snapshot.id,
        ...data,
        submittedAt: data.submittedAt.toDate(),
    } as Submission;
}
// <<< END gen:submissions.create

// >>> BEGIN gen:submissions.list.ungraded (layer:repo)
// Note: In a real app, this would be more complex, likely involving lookups on assignments to get classId.
// This is a simplified version.
export async function getUngradedSubmissions(classId?: string): Promise<Submission[]> {
    console.log(`Repo: Fetching ungraded submissions.`);
    let query = submissionsCollection.where('grade', '==', null);

    const snapshot = await query.get();
    if (snapshot.empty) return [];

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
    console.log(`Repo: Grading submission ${submissionId}`);
    const docRef = submissionsCollection.doc(submissionId);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Submission not found');
    }

    const gradePayload: Grade = {
        ...gradeData,
        gradedAt: new Date(), // Firestore timestamps would be better
    };

    await docRef.update({ grade: gradePayload });

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
