// @module:tags-search @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';

const MODULE_ID = 'tags-search';

// >>> BEGIN gen:tags.create (layer:service)
export async function createTag(tagData: any): Promise<any> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Tags module is disabled.');
    return http<any>('/tags', { method: 'POST', body: JSON.stringify(tagData) });
}
// <<< END gen:tags.create

// >>> BEGIN gen:search.materialsByTag (layer:service)
export async function searchMaterialsByTag(tag: string): Promise<any[]> {
    if (!isModuleEnabled(MODULE_ID)) throw new Error('Tags module is disabled.');
    const params = new URLSearchParams({ tag });
    return http<any[]>(`/search/materials?${params.toString()}`);
}
// <<< END gen:search.materialsByTag
