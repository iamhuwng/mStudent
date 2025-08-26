// @module:editor-ielts-reading @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:editor.ielts.reading.addTask (layer:api)
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('editor-ielts-reading')) {
    return NextResponse.json({ message: 'IELTS Editor module is disabled' }, { status: 403 });
  }

  try {
    // This is a stub implementation.
    console.log(`API: Adding task to material ${params.id}`);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:editor.ielts.reading.addTask
