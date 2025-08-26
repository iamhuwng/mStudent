// @module:classes @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:classes.detail.api (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
  }
  
  // Stub implementation
  const id = params.id;
  return NextResponse.json({ id, name: `Class ${id}`, description: 'A stubbed class description' });
}
// <<< END gen:classes.detail.api
