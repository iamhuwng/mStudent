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
    console.log(`Repo: Logging activity: ${eventData.action}`);
    // Stub implementation
}
// <<< END gen:activity.log

// >>> BEGIN gen:activity.list (layer:repo)
export async function getActivity(filters: { entityType?: string, entityId?: string }): Promise<ActivityEvent[]> {
    console.log(`Repo: Fetching activity with filters`, filters);
    // Stub implementation
    return [];
}
// <<< END gen:activity.list

// >>> BEGIN gen:activity.prune (layer:repo)
export async function pruneActivity(before: Date): Promise<void> {
    console.log(`Repo: Pruning activity before ${before}`);
    // Stub implementation
}
// <<< END gen:activity.prune
