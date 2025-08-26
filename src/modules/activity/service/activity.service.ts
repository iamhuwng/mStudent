// @module:activity @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { ActivityEvent } from './activity.types';

const MODULE_ID = 'activity';

// >>> BEGIN gen:activity.log (layer:service)
export async function logActivity(eventData: Omit<ActivityEvent, 'id' | 'timestamp'>): Promise<ActivityEvent> {
  // Client-side logging might not be common, but supported by the architecture
  if (!isModuleEnabled(MODULE_ID)) {
    console.log('Activity module disabled, skipping log.');
    return null as any;
  }
  return http<ActivityEvent>('/activity', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
}
// <<< END gen:activity.log

// >>> BEGIN gen:activity.list (layer:service)
export async function getActivity(filters: { entityType?: string, entityId?: string }): Promise<ActivityEvent[]> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Activity module is disabled.');
  }
  const params = new URLSearchParams(filters as Record<string, string>);
  return http<ActivityEvent[]>(`/activity?${params.toString()}`);
}
// <<< END gen:activity.list

// >>> BEGIN gen:activity.prune (layer:service)
export async function pruneActivity(before: Date): Promise<void> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Activity module is disabled.');
  }
  const params = new URLSearchParams({ before: before.toISOString() });
  await http<null>(`/activity?${params.toString()}`, {
    method: 'DELETE',
  });
}
// <<< END gen:activity.prune

// >>> BEGIN gen:activity.types (layer:service)
export * from './activity.types';
// <<< END gen:activity.types
