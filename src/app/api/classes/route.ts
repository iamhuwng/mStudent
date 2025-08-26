// @module:classes @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:classes.list.api (layer:api)
export async function GET() {
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
  }
  // Stub implementation
  return NextResponse.json([{ id: 'class-1', name: 'Math 101', description: 'Intro to Mathematics' }]);
}
// <<< END gen:classes.list.api

// >>> BEGIN gen:classes.create.api (layer:api)
export async function POST(request: Request) {
    if (!isModuleEnabled('classes')) {
        return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
    }
    // Stub implementation
    const body = await request.json();
    return NextResponse.json({ id: 'class-new', ...body }, { status: 201 });
}
// <<< END gen:classes.create.api
