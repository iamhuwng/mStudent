// @module:submissions-grading @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Submission, Grade } from '../service/submissions.types';

const submissionsCollection = firestore.collection('submissions');

// >>> BEGIN gen:submissions.create (layer:repo)
export async function createSubmission(submissionData: Omit<Submission, 'id' | 'submittedAt' | 'grade'>): Promise<Submission> {
    console.log(`Repo: Creating submission for student ${submissionData.studentId}`);
    // Stub implementation
    return {
        id: `sub-${Math.random()}`,
        submittedAt: new Date(),
        ...submissionData
    } as Submission;
}
// <<< END gen:submissions.create

// >>> BEGIN gen:submissions.list.ungraded (layer:repo)
export async function getUngradedSubmissions(classId?: string): Promise<Submission[]> {
    console.log(`Repo: Fetching ungraded submissions.`);
    // Stub implementation
    return [];
}
// <<< END gen:submissions.list.ungraded

// >>> BEGIN gen:submissions.grade (layer:repo)
export async function gradeSubmission(submissionId: string, gradeData: Omit<Grade, 'gradedAt'>): Promise<Submission> {
    console.log(`Repo: Grading submission ${submissionId}`);
    // Stub implementation
    const grade: Grade = {
        ...gradeData,
        gradedAt: new Date(),
    };
    return {
        id: submissionId,
        assignmentId: 'asgn-1',
        studentId: 'user-1',
        submittedAt: new Date(),
        content: 'Stub content',
        grade: grade
    } as Submission;
}
// <<< END gen:submissions.grade
