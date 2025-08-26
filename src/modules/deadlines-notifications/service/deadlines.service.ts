// @module:deadlines-notifications @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';

const MODULE_ID = 'deadlines-notifications';

// >>> BEGIN gen:deadlines.compute (layer:service)
export async function computeDeadlines(): Promise<any> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Deadlines module is disabled.');
    return http<any>('/notifications/compute');
}
// <<< END gen:deadlines.compute

// >>> BEGIN gen:deadlines.notify (layer:service)
export async function notifyUser(userId: string, notification: any): Promise<any> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Deadlines module is disabled.');
    return http<any>('/notifications/notify', { method: 'POST', body: JSON.stringify({ userId, notification }) });
}
// <<< END gen:deadlines.notify
