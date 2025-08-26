// @module:assignments @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { 
    createAssignment as repoCreateAssignment,
    getAssignmentsForStudent as repoGetAssignmentsForStudent,
    getAssignmentsForClass as repoGetAssignmentsForClass
} from '@/modules/assignments/repo/assignments.repo';

// >>> BEGIN gen:assignments.create (layer:api)
export async function POST(request: Request) {
    if (!isModuleEnabled('assignments')) {
        return NextResponse.json({ message: 'Assignments module is disabled' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const newAssignment = await repoCreateAssignment(body);
        return NextResponse.json(newAssignment, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:assignments.create

// >>> BEGIN gen:assignments.list (layer:api)
export async function GET(request: NextRequest) {
  if (!isModuleEnabled('assignments')) {
    return NextResponse.json({ message: 'Assignments module is disabled' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');
  const classId = searchParams.get('classId');
  const pagination = {
      limit: Number(searchParams.get('limit')) || 10,
      cursor: searchParams.get('cursor') || undefined,
  }

  try {
    let assignments;
    if (studentId) {
      assignments = await repoGetAssignmentsForStudent(studentId, pagination);
    } else if (classId) {
      assignments = await repoGetAssignmentsForClass(classId, pagination);
    } else {
        return NextResponse.json({ message: 'Missing studentId or classId parameter' }, { status: 400 });
    }
    return NextResponse.json(assignments);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:assignments.list
