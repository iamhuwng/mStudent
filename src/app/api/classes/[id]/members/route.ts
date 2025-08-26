// @module:classes @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';

// >>> BEGIN gen:classes.members.api (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
  }
  
  // Stub implementation
  const classId = params.id;
  return NextResponse.json([
    { userId: 'user-teacher-1', classId, role: 'teacher' },
    { userId: 'user-student-1', classId, role: 'student' }
  ]);
}
// <<< END gen:classes.members.api

// >>> BEGIN gen:classes.assign.api (layer:api)
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
  }
  
  // Stub implementation
  const classId = params.id;
  const body = await request.json();
  return NextResponse.json({ classId, ...body }, { status: 201 });
}
// <<< END gen:classes.assign.api
