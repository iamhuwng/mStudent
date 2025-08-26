// @module:assignments @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import type { Assignment } from '../service/assignments.types';

const assignmentsCollection = firestore.collection('assignments');

// >>> BEGIN gen:assignments.create (layer:repo)
export async function createAssignment(assignmentData: Omit<Assignment, 'id' | 'createdAt'>): Promise<Assignment> {
    console.log('Repo: Creating new assignment');
    const assignmentPayload = {
        ...assignmentData,
        createdAt: FieldValue.serverTimestamp(),
    };
    const docRef = await assignmentsCollection.add(assignmentPayload);
    const snapshot = await docRef.get();
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
    console.log(`Repo: Fetching assignments for student ${studentId}`);
    const snapshot = await assignmentsCollection
        .where('assignedToId', '==', studentId)
        .where('assignedToType', '==', 'user')
        .get();
    
    if (snapshot.empty) return [];
    
    return snapshot.docs.map(doc => {
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
    console.log(`Repo: Fetching assignments for class ${classId}`);
    const snapshot = await assignmentsCollection
        .where('assignedToId', '==', classId)
        .where('assignedToType', '==', 'class')
        .get();

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => {
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
    console.log(`Repo: Deleting assignment with id ${id}`);
    const docRef = assignmentsCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
        throw new Error('Assignment not found');
    }
    await docRef.delete();
}
// <<< END gen:assignments.delete
