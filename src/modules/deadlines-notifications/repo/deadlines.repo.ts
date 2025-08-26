// @module:deadlines-notifications @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { Timestamp, FieldValue } from 'firebase-admin/firestore';
import { logActivity } from '@/modules/activity/repo/activity.repo';

const assignmentsCollection = firestore.collection('assignments');
const notificationsCollection = firestore.collection('notifications');

// >>> BEGIN gen:deadlines.compute (layer:repo)
export async function computeDeadlines(): Promise<{ upcoming: any[], overdue: any[] }> {
    console.log(`Repo: Computing upcoming/overdue deadlines`);
    
    const now = Timestamp.now();
    const twentyFourHoursFromNow = Timestamp.fromMillis(now.toMillis() + 24 * 60 * 60 * 1000);

    const upcomingSnapshot = await assignmentsCollection
        .where('deadline', '>', now)
        .where('deadline', '<=', twentyFourHoursFromNow)
        .get();

    const overdueSnapshot = await assignmentsCollection
        .where('deadline', '<', now)
        .get();

    const upcoming = upcomingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const overdue = overdueSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { upcoming, overdue };
}
// <<< END gen:deadlines.compute

// >>> BEGIN gen:deadlines.notify (layer:repo)
export async function notifyUser(userId: string, notification: { message: string, entityId: string, entityType: string }): Promise<void> {
    console.log(`Repo: Sending notification to user ${userId}`);
    await notificationsCollection.add({
        userId,
        read: false,
        createdAt: FieldValue.serverTimestamp(),
        ...notification,
    });
}
// <<< END gen:deadlines.notify


// >>> BEGIN gen:deadlines.process (layer:repo)
export async function processAndNotifyDeadlines(): Promise<{ notifiedUpcoming: number, notifiedOverdue: number }> {
    const { upcoming, overdue } = await computeDeadlines();

    const processNotifications = async (assignments: any[], type: 'upcoming' | 'overdue') => {
        const promises = assignments.map(async (assignment) => {
            // This is a simplification. A real app would look up all users in a class.
            // For now, we assume direct assignment to a user.
            if (assignment.assignedToType === 'user') {
                const userId = assignment.assignedToId;
                const message = type === 'upcoming' 
                    ? `Assignment for material ${assignment.materialId} is due soon.`
                    : `Assignment for material ${assignment.materialId} is overdue.`;

                await notifyUser(userId, {
                    message,
                    entityId: assignment.id,
                    entityType: 'assignment',
                });
                
                await logActivity({
                    actorId: 'system',
                    action: `deadline.${type}`,
                    entityType: 'assignment',
                    entityId: assignment.id,
                    details: { userId }
                });
            }
        });
        await Promise.all(promises);
        return assignments.length;
    }

    const notifiedUpcoming = await processNotifications(upcoming, 'upcoming');
    const notifiedOverdue = await processNotifications(overdue, 'overdue');
    
    return { notifiedUpcoming, notifiedOverdue };
}
// <<< END gen:deadlines.process


// >>> BEGIN gen:deadlines.getNotifications (layer:repo)
export async function getNotificationsForUser(userId: string): Promise<any[]> {
    const snapshot = await notificationsCollection
        .where('userId', '==', userId)
        .where('read', '==', false)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
        
    if (snapshot.empty) {
        return [];
    }

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
    }));
}
// <<< END gen:deadlines.getNotifications
