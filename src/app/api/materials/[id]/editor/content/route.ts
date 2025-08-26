// @module:editor-ielts-reading @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { saveIeltsTask } from '@/modules/editor-ielts-reading/repo/ielts.repo';

// >>> BEGIN gen:editor.ielts.reading.save (layer:api)
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('editor-ielts-reading')) {
    return NextResponse.json({ message: 'IELTS Editor module is disabled' }, { status: 403 });
  }

  try {
    const materialId = params.id;
    const body = await request.json();
    await saveIeltsTask(materialId, body);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:editor.ielts.reading.save
