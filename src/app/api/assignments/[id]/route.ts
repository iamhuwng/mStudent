// @module:assignments @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { deleteAssignment as repoDeleteAssignment } from '@/modules/assignments/repo/assignments.repo';

// >>> BEGIN gen:assignments.delete (layer:api)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    if (!isModuleEnabled('assignments')) {
        return NextResponse.json({ message: 'Assignments module is disabled' }, { status: 403 });
    }

    try {
        const id = params.id;
        await repoDeleteAssignment(id);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        if (message === 'Assignment not found') {
            return NextResponse.json({ message }, { status: 404 });
        }
        return NextResponse.json({ message }, { status: 500 });
    }
}
// <<< END gen:assignments.delete
