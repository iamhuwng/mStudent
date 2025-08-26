// @module:materials @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { 
    getMaterialById as repoGetMaterialById,
    updateMaterial as repoUpdateMaterial,
    deleteMaterial as repoDeleteMaterial
} from '@/modules/materials/repo/materials.repo';

// >>> BEGIN gen:materials.api.detail (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('materials')) {
    return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
  }
  
  try {
    const id = params.id;
    const material = await repoGetMaterialById(id);

    if (!material) {
      return NextResponse.json({ message: 'Material not found' }, { status: 404 });
    }
    
    return NextResponse.json(material);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:materials.api.detail

// >>> BEGIN gen:materials.api.update (layer:api)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    if (!isModuleEnabled('materials')) {
        return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
    }

    try {
        const id = params.id;
        const body = await request.json();
        const updatedMaterial = await repoUpdateMaterial(id, body);
        return NextResponse.json(updatedMaterial);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        if (message === 'Material not found') {
            return NextResponse.json({ message }, { status: 404 });
        }
        return NextResponse.json({ message }, { status: 500 });
    }
}
// <<< END gen:materials.api.update

// >>> BEGIN gen:materials.api.delete (layer:api)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    if (!isModuleEnabled('materials')) {
        return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
    }

    try {
        const id = params.id;
        await repoDeleteMaterial(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        if (message === 'Material not found') {
            return NextResponse.json({ message }, { status: 404 });
        }
        return NextResponse.json({ message }, { status: 500 });
    }
}
// <<< END gen:materials.api.delete
