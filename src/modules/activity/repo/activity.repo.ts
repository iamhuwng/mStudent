// @module:activity @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { isModuleEnabled } from '@/modules/registry';
import type { ActivityEvent } from '../service/activity.types';

const activityCollection = firestore.collection('activity');

// >>> BEGIN gen:activity.log (layer:repo)
export async function logActivity(eventData: Omit<ActivityEvent, 'id' | 'timestamp'>): Promise<void> {
    if (!isModuleEnabled('activity')) {
        // If the module is disabled, do nothing. This prevents errors in other modules.
        return;
    }
    await activityCollection.add({
        ...eventData,
        timestamp: FieldValue.serverTimestamp(),
    });
}
// <<< END gen:activity.log

// >>> BEGIN gen:activity.list (layer:repo)
export async function getActivity(filters: { entityType?: string, entityId?: string }): Promise<ActivityEvent[]> {
    let query: FirebaseFirestore.Query = activityCollection;

    if (filters.entityType) {
        query = query.where('entityType', '==', filters.entityType);
    }
    if (filters.entityId) {
        query = query.where('entityId', '==', filters.entityId);
    }

    const snapshot = await query.orderBy('timestamp', 'desc').limit(20).get();

    if (snapshot.empty) {
        return [];
    }

    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            timestamp: data.timestamp.toDate(),
        } as ActivityEvent;
    });
}
// <<< END gen:activity.list

// >>> BEGIN gen:activity.prune (layer:repo)
export async function pruneActivity(before: Date): Promise<void> {
    const snapshot = await activityCollection.where('timestamp', '<', before).get();
    
    if (snapshot.empty) {
        return;
    }

    const batch = firestore.batch();
    snapshot.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
}
// <<< END gen:activity.prune
