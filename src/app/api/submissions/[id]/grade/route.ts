// @module:submissions-grading @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { gradeSubmission as repoGradeSubmission } from '@/modules/submissions-grading/repo/submissions.repo';

// >>> BEGIN gen:submissions.grade (layer:api)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    if (!isModuleEnabled('submissions-grading')) {
        return NextResponse.json({ message: 'Submissions module is disabled' }, { status: 403 });
    }

    try {
        const id = params.id;
        const body = await request.json();
        const updatedSubmission = await repoGradeSubmission(id, body);
        return NextResponse.json(updatedSubmission);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        if (message === 'Submission not found') {
            return NextResponse.json({ message }, { status: 404 });
        }
        return NextResponse.json({ message }, { status: 500 });
    }
}
// <<< END gen:submissions.grade
