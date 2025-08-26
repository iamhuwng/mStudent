// @module:materials @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:materials.api.list (layer:api)
export async function GET() {
  if (!isModuleEnabled('materials')) {
    return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
  }

  // Stub implementation
  return NextResponse.json([{ id: 'material-1', name: 'Intro to Algebra', format: 'document', tags: ['math'] }]);
}
// <<< END gen:materials.api.list

// >>> BEGIN gen:materials.api.create (layer:api)
export async function POST(request: Request) {
    if (!isModuleEnabled('materials')) {
        return NextResponse.json({ message: 'Materials module is disabled' }, { status: 403 });
    }

    // Stub implementation
    const body = await request.json();
    return NextResponse.json({ id: 'material-new', ...body }, { status: 201 });
}
// <<< END gen:materials.api.create
