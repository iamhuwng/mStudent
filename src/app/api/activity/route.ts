// @module:activity @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { 
    logActivity as repoLogActivity,
    getActivity as repoGetActivity,
    pruneActivity as repoPruneActivity
} from '@/modules/activity/repo/activity.repo';

// >>> BEGIN gen:activity.log (layer:api)
export async function POST(request: Request) {
    // Note: The repo function itself checks if the module is enabled.
    // This allows other server modules to call it without breaking if disabled.
    try {
        const body = await request.json();
        await repoLogActivity(body);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 400 });
    }
}
// <<< END gen:activity.log

// >>> BEGIN gen:activity.list (layer:api)
export async function GET(request: NextRequest) {
  if (!isModuleEnabled('activity')) {
    return NextResponse.json({ message: 'Activity module is disabled' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const filters = {
    entityType: searchParams.get('entityType') || undefined,
    entityId: searchParams.get('entityId') || undefined,
  };

  try {
    const activity = await repoGetActivity(filters);
    return NextResponse.json(activity);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
// <<< END gen:activity.list

// >>> BEGIN gen:activity.prune (layer:api)
export async function DELETE(request: NextRequest) {
    if (!isModuleEnabled('activity')) {
        return NextResponse.json({ message: 'Activity module is disabled' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const beforeParam = searchParams.get('before');

    if (!beforeParam) {
        return NextResponse.json({ message: 'Missing "before" date parameter' }, { status: 400 });
    }
    
    try {
        const before = new Date(beforeParam);
        await repoPruneActivity(before);
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ message }, { status: 500 });
    }
}
// <<< END gen:activity.prune
