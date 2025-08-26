// @module:assignments @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import type { Assignment, PaginatedResponse } from '../service/assignments.types';

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
export async function getAssignmentsForStudent(
    studentId: string,
    pagination: { limit: number, cursor?: string }
): Promise<PaginatedResponse<Assignment>> {
    // Get classes the student is in
    const memberSnapshot = await classMembersCollection.where('userId', '==', studentId).get();
    const classIds = memberSnapshot.docs.map(doc => doc.data().classId);

    // This requires a composite index on (assignedToId, createdAt)
    let query = assignmentsCollection
        .where('assignedToId', 'in', [...classIds, studentId])
        .orderBy('createdAt', 'desc');
    
    if (pagination.cursor) {
        const cursorTimestamp = Timestamp.fromMillis(parseInt(pagination.cursor));
        query = query.startAfter(cursorTimestamp);
    }
        
    const assignmentsSnapshot = await query.limit(pagination.limit + 1).get();
    
    if (assignmentsSnapshot.empty) {
        return { items: [], nextCursor: null, hasMore: false };
    }

    const items = assignmentsSnapshot.docs.map(doc => {
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

    const hasMore = items.length > pagination.limit;
    let nextCursor: string | null = null;
    
    if (hasMore) {
        const nextCursorDoc = items.pop();
        const timestamp = (nextCursorDoc!.createdAt as Date).getTime();
        nextCursor = timestamp.toString();
    }

    return { items, nextCursor, hasMore };
}
// <<< END gen:assignments.list.forStudent

// >>> BEGIN gen:assignments.list.forClass (layer:repo)
export async function getAssignmentsForClass(
    classId: string,
    pagination: { limit: number, cursor?: string }
): Promise<PaginatedResponse<Assignment>> {
    let query = assignmentsCollection
        .where('assignedToId', '==', classId)
        .orderBy('createdAt', 'desc');

    if (pagination.cursor) {
        const cursorTimestamp = Timestamp.fromMillis(parseInt(pagination.cursor));
        query = query.startAfter(cursorTimestamp);
    }

    const assignmentsSnapshot = await query.limit(pagination.limit + 1).get();

    if (assignmentsSnapshot.empty) {
        return { items: [], nextCursor: null, hasMore: false };
    }

    const items = assignmentsSnapshot.docs.map(doc => {
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

    const hasMore = items.length > pagination.limit;
    let nextCursor: string | null = null;
    
    if (hasMore) {
        const nextCursorDoc = items.pop();
        const timestamp = (nextCursorDoc!.createdAt as Date).getTime();
        nextCursor = timestamp.toString();
    }

    return { items, nextCursor, hasMore };
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
