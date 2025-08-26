// @module:materials @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:materials.api.detail (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('materials')) {
    return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
  }
  
  // Stub implementation
  const id = params.id;
  return NextResponse.json({ id, name: `Material ${id}`, format: 'document', tags: ['math'], content: 'This is stub content.' });
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

    // Stub implementation
    const id = params.id;
    const body = await request.json();
    return NextResponse.json({ id, ...body });
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

    // Stub implementation
    console.log(`Deleting material ${params.id}`);
    return new NextResponse(null, { status: 204 });
}
// <<< END gen:materials.api.delete
