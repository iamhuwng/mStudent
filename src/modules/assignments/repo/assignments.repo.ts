// @module:assignments @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Assignment } from '../service/assignments.types';

const assignmentsCollection = firestore.collection('assignments');
const classMembersCollection = firestore.collection('classMembers');

// >>> BEGIN gen:assignments.create (layer:repo)
export async function createAssignment(assignmentData: Omit<Assignment, 'id' | 'createdAt'>): Promise<Assignment> {
    const newAssignmentRef = await assignmentsCollection.add({
        ...assignmentData,
        createdAt: FieldValue.serverTimestamp(),
    });
    const snapshot = await newAssignmentRef.get();
    const data = snapshot.data();
    return {
        id: snapshot.id,
        ...data,
        createdAt: data?.createdAt.toDate(),
    } as Assignment;
}
// <<< END gen:assignments.create

// >>> BEGIN gen:assignments.list.forStudent (layer:repo)
export async function getAssignmentsForStudent(studentId: string): Promise<Assignment[]> {
    // Get classes the student is in
    const memberSnapshot = await classMembersCollection.where('userId', '==', studentId).get();
    const classIds = memberSnapshot.docs.map(doc => doc.data().classId);

    const assignedToClauses = [];
    if (classIds.length > 0) {
        assignedToClauses.push({ field: 'assignedToId', op: 'in' as const, value: classIds});
    }
    assignedToClauses.push({ field: 'assignedToId', op: '==' as const, value: studentId });

    // This requires a composite index on (assignedToId, createdAt)
    const assignmentsSnapshot = await assignmentsCollection
        .where('assignedToId', 'in', [...classIds, studentId])
        .orderBy('createdAt', 'desc')
        .get();
    
    if (assignmentsSnapshot.empty) {
        return [];
    }

    return assignmentsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            deadline: data.deadline?.toDate(),
            availabilityStart: data.availabilityStart?.toDate(),
            availabilityEnd: data.availabilityEnd?.toDate(),
            createdAt: data.createdAt.toDate(),
        } as Assignment;
    });
}
// <<< END gen:assignments.list.forStudent

// >>> BEGIN gen:assignments.list.forClass (layer:repo)
export async function getAssignmentsForClass(classId: string): Promise<Assignment[]> {
    const assignmentsSnapshot = await assignmentsCollection
        .where('assignedToId', '==', classId)
        .orderBy('createdAt', 'desc')
        .get();

    if (assignmentsSnapshot.empty) {
        return [];
    }

    return assignmentsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            deadline: data.deadline?.toDate(),
            availabilityStart: data.availabilityStart?.toDate(),
            availabilityEnd: data.availabilityEnd?.toDate(),
            createdAt: data.createdAt.toDate(),
        } as Assignment;
    });
}
// <<< END gen:assignments.list.forClass

// >>> BEGIN gen:assignments.delete (layer:repo)
export async function deleteAssignment(id: string): Promise<void> {
    const docRef = assignmentsCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Assignment not found');
    }
    await docRef.delete();
}
// <<< END gen:assignments.delete
