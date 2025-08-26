// @module:classes @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { getClassById as repoGetClassById } from '@/modules/classes/repo/classes.repo';

// >>> BEGIN gen:classes.detail.api (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
  }
  
  try {
    const id = params.id;
    const cls = await repoGetClassById(id);

    if (!cls) {
      return NextResponse.json({ message: 'Class not found' }, { status: 404 });
    }
    
    return NextResponse.json(cls);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:classes.detail.api
