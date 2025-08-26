// @module:classes @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import type { Class, ClassMember } from '../service/classes.types';
import { getUserById } from '@/modules/users/repo/users.repo';
import { FieldValue } from 'firebase-admin/firestore';

const classesCollection = firestore.collection('classes');
const classMembersCollection = firestore.collection('classMembers');

// >>> BEGIN gen:classes.list.repo (layer:repo)
export async function getClasses(pagination: { page: number; limit: number }): Promise<Class[]> {
  console.log('Repo: Fetching all classes from Firestore');
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  const snapshot = await classesCollection.limit(limit).offset(offset).get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Class));
}
// <<< END gen:classes.list.repo

// >>> BEGIN gen:classes.detail.repo (layer:repo)
export async function getClassById(id: string): Promise<Class | null> {
  console.log(`Repo: Fetching class with id ${id} from Firestore`);
  const doc = await classesCollection.doc(id).get();
  if (!doc.exists) {
    return null;
  }
  return {
    id: doc.id,
    ...doc.data(),
  } as Class;
}
// <<< END gen:classes.detail.repo

// >>> BEGIN gen:classes.create.repo (layer:repo)
export async function createClass(classData: Omit<Class, 'id'>): Promise<Class> {
    console.log('Repo: Creating new class in Firestore');
    const newClassRef = await classesCollection.add(classData);
    const newClass = await getClassById(newClassRef.id);
    return newClass!;
}
// <<< END gen:classes.create.repo

// >>> BEGIN gen:classes.members.repo (layer:repo)
export async function getClassMembers(classId: string): Promise<ClassMember[]> {
    console.log(`Repo: Fetching members for class with id ${classId}`);
    const snapshot = await classMembersCollection.where('classId', '==', classId).get();
    if (snapshot.empty) {
        return [];
    }
    const members = await Promise.all(snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const user = await getUserById(data.userId);
        return {
            ...data,
            startDate: data.startDate?.toDate(),
            endDate: data.endDate?.toDate(),
            user,
        } as ClassMember;
    }));
    return members;
}
// <<< END gen:classes.members.repo

// >>> BEGIN gen:classes.assign.repo (layer:repo)
export async function assignMemberToClass(classId: string, memberData: Omit<ClassMember, 'classId' | 'user'>): Promise<ClassMember> {
    console.log(`Repo: Assigning user ${memberData.userId} to class ${classId}`);
    
    // Check if user and class exist
    const user = await getUserById(memberData.userId);
    if (!user) throw new Error('User not found');
    const classDoc = await getClassById(classId);
    if (!classDoc) throw new Error('Class not found');
    
    // In a real app, you'd check if the assignment already exists
    
    const newMemberPayload = {
        ...memberData,
        classId,
        startDate: memberData.startDate ? FieldValue.serverTimestamp() : null,
        endDate: memberData.endDate ? FieldValue.serverTimestamp() : null,
    };
    
    const newMemberRef = await classMembersCollection.add(newMemberPayload);
    const doc = await newMemberRef.get();
    const data = doc.data()!;
    
    return {
        ...data,
        startDate: data.startDate?.toDate(),
        endDate: data.endDate?.toDate(),
        user
    } as ClassMember;
}
// <<< END gen:classes.assign.repo
