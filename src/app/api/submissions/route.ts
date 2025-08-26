// @module:submissions-grading @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { 
    createSubmission as repoCreateSubmission,
    getUngradedSubmissions as repoGetUngradedSubmissions,
} from '@/modules/submissions-grading/repo/submissions.repo';

// >>> BEGIN gen:submissions.create (layer:api)
export async function POST(request: Request) {
    if (!isModuleEnabled('submissions-grading')) {
        return NextResponse.json({ message: 'Submissions module is disabled' }, { status: 403 });
    }

    try {
        const body = await request.json();
        const newSubmission = await repoCreateSubmission(body);
        return NextResponse.json(newSubmission, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:submissions.create

// >>> BEGIN gen:submissions.list (layer:api)
export async function GET(request: NextRequest) {
  if (!isModuleEnabled('submissions-grading')) {
    return NextResponse.json({ message: 'Submissions module is disabled' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const classId = searchParams.get('classId');
  const pagination = {
      limit: Number(searchParams.get('limit')) || 10,
      cursor: searchParams.get('cursor') || undefined,
  }

  try {
    let submissions;
    if (status === 'ungraded') {
        submissions = await repoGetUngradedSubmissions({classId: classId || undefined}, pagination);
    } else {
        // Extend with other statuses like 'graded', 'forStudent', etc. in the future
        return NextResponse.json({ message: 'Invalid or missing status parameter' }, { status: 400 });
    }
    return NextResponse.json(submissions);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:submissions.list
