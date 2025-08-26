// @module:materials @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';
import type { Material } from './materials.types';

const MODULE_ID = 'materials';

// >>> BEGIN gen:materials.list.service (layer:service)
export async function getMaterials(): Promise<Material[]> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Materials module is disabled.');
  }
  return http<Material[]>('/materials');
}
// <<< END gen:materials.list.service

// >>> BEGIN gen:materials.detail.service (layer:service)
export async function getMaterialById(id: string): Promise<Material> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('Materials module is disabled.');
  }
  return http<Material>(`/materials/${id}`);
}
// <<< END gen:materials.detail.service

// >>> BEGIN gen:materials.create.service (layer:service)
export async function createMaterial(materialData: Omit<Material, 'id'>): Promise<Material> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Materials module is disabled.');
    }
    return http<Material>('/materials', {
        method: 'POST',
        body: JSON.stringify(materialData),
    });
}
// <<< END gen:materials.create.service

// >>> BEGIN gen:materials.update.service (layer:service)
export async function updateMaterial(id: string, materialData: Partial<Omit<Material, 'id'>>): Promise<Material> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Materials module is disabled.');
    }
    return http<Material>(`/materials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(materialData),
    });
}
// <<< END gen:materials.update.service

// >>> BEGIN gen:materials.delete.service (layer:service)
export async function deleteMaterial(id: string): Promise<void> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('Materials module is disabled.');
    }
    await http<null>(`/materials/${id}`, {
        method: 'DELETE',
    });
}
// <<< END gen:materials.delete.service

// >>> BEGIN gen:materials.types (layer:service)
export * from './materials.types';
// <<< END gen:materials.types
