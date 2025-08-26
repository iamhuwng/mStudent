// @module:editor-ielts-reading @layer:service @owner:studio
'use client';

import { http } from '@/lib/services/http';
import { isModuleEnabled } from '@/modules/registry';

const MODULE_ID = 'editor-ielts-reading';

// >>> BEGIN gen:editor.ielts.reading.addTask (layer:service)
/**
 * This is a stub for adding a new task to the editor content.
 */
export async function addIeltsTask(materialId: string, task: any): Promise<void> {
  if (!isModuleEnabled(MODULE_ID)) {
    throw new Error('IELTS editor module is disabled.');
  }
  // In a real app, this might be a more complex interaction
  console.log(`Service: Adding IELTS task to material ${materialId}`);
  await http<null>(`/materials/${materialId}/editor/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
  });
}
// <<< END gen:editor.ielts.reading.addTask

// >>> BEGIN gen:editor.ielts.reading.save (layer:service)
/**
 * This is a stub for saving the entire editor content.
 */
export async function saveIeltsContent(materialId: string, content: any): Promise<void> {
    if (!isModuleEnabled(MODULE_ID)) {
        throw new Error('IELTS editor module is disabled.');
    }
    await http<null>(`/materials/${materialId}/editor/content`, {
        method: 'PUT',
        body: JSON.stringify(content),
    });
}
// <<< END gen:editor.ielts.reading.save
