// @module:materials @layer:repo @owner:studio
import 'server-only';
import { firestore } from '@/lib/firebase/firebase-admin';
import type { Material } from '../service/materials.types';

const materialsCollection = firestore.collection('materials');

// >>> BEGIN gen:materials.list.repo (layer:repo)
export async function getMaterials(pagination: { page: number, limit: number }): Promise<Material[]> {
  console.log('Repo: Fetching all materials from Firestore');
  const { page, limit } = pagination;
  const offset = (page - 1) * limit;

  const snapshot = await materialsCollection.limit(limit).offset(offset).get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as Material));
}
// <<< END gen:materials.list.repo

// >>> BEGIN gen:materials.detail.repo (layer:repo)
export async function getMaterialById(id: string): Promise<Material | null> {
  console.log(`Repo: Fetching material with id ${id} from Firestore`);
  const doc = await materialsCollection.doc(id).get();
  if (!doc.exists) {
    return null;
  }
  return {
    id: doc.id,
    ...doc.data(),
  } as Material;
}
// <<< END gen:materials.detail.repo

// >>> BEGIN gen:materials.create.repo (layer:repo)
export async function createMaterial(materialData: Omit<Material, 'id'>): Promise<Material> {
    console.log('Repo: Creating new material in Firestore');
    const newMaterialRef = await materialsCollection.add(materialData);
    const newMaterial = await getMaterialById(newMaterialRef.id);
    return newMaterial!;
}
// <<< END gen:materials.create.repo

// >>> BEGIN gen:materials.update.repo (layer:repo)
export async function updateMaterial(id: string, materialData: Partial<Omit<Material, 'id'>>): Promise<Material> {
    console.log(`Repo: Updating material with id ${id} in Firestore`);
    const materialRef = materialsCollection.doc(id);
    const doc = await materialRef.get();
    if (!doc.exists) {
        throw new Error('Material not found');
    }
    await materialRef.update(materialData);
    const updatedMaterial = await getMaterialById(id);
    return updatedMaterial!;
}
// <<< END gen:materials.update.repo

// >>> BEGIN gen:materials.delete.repo (layer:repo)
export async function deleteMaterial(id: string): Promise<void> {
    console.log(`Repo: Deleting material with id ${id} from Firestore`);
    const materialRef = materialsCollection.doc(id);
    const doc = await materialRef.get();
    if (!doc.exists) {
        throw new Error('Material not found');
    }
    await materialRef.delete();
}
// <<< END gen:materials.delete.repo
