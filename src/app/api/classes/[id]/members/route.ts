// @module:classes @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { 
    getClassMembers as repoGetClassMembers,
    assignMemberToClass as repoAssignMemberToClass,
} from '@/modules/classes/repo/classes.repo';

// >>> BEGIN gen:classes.members.api (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!isModuleEnabled('classes')) {
    return NextResponse.json({ message: 'Classes module is disabled' }, { status: 403 });
  }
  
  try {
    const classId = params.id;
    const members = await repoGetClassMembers(classId);
    return NextResponse.json(members);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
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
  
  try {
    const classId = params.id;
    const body = await request.json();
    const newMember = await repoAssignMemberToClass(classId, body);
    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 400 });
  }
}
// <<< END gen:classes.assign.api
