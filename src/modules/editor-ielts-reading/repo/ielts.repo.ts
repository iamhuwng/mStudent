// @module:editor-ielts-reading @layer:repo @owner:studio
import 'server-only';
import { updateMaterial } from '@/modules/materials/repo/materials.repo';

// >>> BEGIN gen:editor.ielts.reading.save (layer:repo)
/**
 * Saves structured IELTS content to the `content` field of a material.
 * @param materialId The ID of the material to update.
 * @param content The structured IELTS content object.
 */
export async function saveIeltsTask(materialId: string, content: any): Promise<void> {
  console.log(`Repo: Saving IELTS content for material ${materialId}`);
  // The editor saves its output into the content field of the material
  await updateMaterial(materialId, { content });
}
// <<< END gen:editor.ielts.reading.save
