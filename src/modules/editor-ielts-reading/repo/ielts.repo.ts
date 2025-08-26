// @module:editor-ielts-reading @layer:repo @owner:studio
import 'server-only';
import { updateMaterial } from '@/modules/materials/repo/materials.repo';

// >>> BEGIN gen:editor.ielts.reading.save (layer:repo)
/**
 * This is a stub. In a real implementation, this would likely take structured
 * IELTS data and save it to the `content` field of a material.
 */
export async function saveIeltsTask(materialId: string, content: any): Promise<void> {
  console.log(`Repo: Saving IELTS content for material ${materialId}`);
  // The editor saves its output into the content field of the material
  await updateMaterial(materialId, { content: JSON.stringify(content) });
}
// <<< END gen:editor.ielts.reading.save
