// @module:activity @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import type { ActivityEvent } from '../service/activity.types';
import type { Page } from '@/lib/types/pagination';

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
export async function getActivity(
    filters: { entityType?: string, entityId?: string },
    pagination: { limit: number, cursor?: string }
): Promise<Page<ActivityEvent>> {
    let query: FirebaseFirestore.Query = activityCollection;

    if (filters.entityType) {
        query = query.where('entityType', '==', filters.entityType);
    }
    if (filters.entityId) {
        query = query.where('entityId', '==', filters.entityId);
    }
    
    query = query.orderBy('timestamp', 'desc');

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
            timestamp: data.timestamp.toDate(),
        } as ActivityEvent;
    });

    const hasMore = items.length > pagination.limit;
    let nextCursor: string | null = null;
    
    if (hasMore) {
        const nextCursorDoc = items.pop(); // remove the extra item
        const timestamp = (nextCursorDoc!.timestamp as Date).getTime();
        nextCursor = timestamp.toString();
    }

    return { items, nextCursor, hasMore };
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
