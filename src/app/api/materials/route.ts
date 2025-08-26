// @module:materials @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { 
    getMaterials as repoGetMaterials,
    createMaterial as repoCreateMaterial
} from '@/modules/materials/repo/materials.repo';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:materials.api.list (layer:api)
export async function GET() {
  if (!isModuleEnabled('materials')) {
    return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
  }

  try {
    const materials = await repoGetMaterials();
    return NextResponse.json(materials);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:materials.api.list

// >>> BEGIN gen:materials.api.create (layer:api)
export async function POST(request: Request) {
    if (!isModuleEnabled('materials')) {
        return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const newMaterial = await repoCreateMaterial(body);
        return NextResponse.json(newMaterial, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:materials.api.create
