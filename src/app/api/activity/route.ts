// @module:activity @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { 
    logActivity as repoLogActivity,
    getActivity as repoGetActivity,
    pruneActivity as repoPruneActivity
} from '@/modules/activity/repo/activity.repo';
import { logApiRequest, logApiResponse } from '@/lib/logging';

// >>> BEGIN gen:activity.log (layer:api)
export async function POST(request: Request) {
    const { requestId, startTime } = logApiRequest(request);
    // Note: The repo function itself checks if the module is enabled.
    // This allows other server modules to call it without breaking if disabled.
    try {
        const body = await request.json();
        await repoLogActivity(body);
        logApiResponse(requestId, startTime, request, { status: 204, body: null });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        const response = { ok: false, error: message, rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 400, body: response });
        return NextResponse.json(response, { status: 400 });
    }
}
// <<< END gen:activity.log

// >>> BEGIN gen:activity.list (layer:api)
export async function GET(request: NextRequest) {
  const { requestId, startTime } = logApiRequest(request);
  if (!isModuleEnabled('activity')) {
    const response = { ok: false, error: 'Activity module is disabled', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const filters = {
    entityType: searchParams.get('entityType') || undefined,
    entityId: searchParams.get('entityId') || undefined,
  };
  const pagination = {
      limit: Number(searchParams.get('limit')) || 10,
      cursor: searchParams.get('cursor') || undefined,
  }

  try {
    const activity = await repoGetActivity(filters, pagination);
    const response = { ...activity, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:activity.list

// >>> BEGIN gen:activity.prune (layer:api)
export async function DELETE(request: NextRequest) {
    const { requestId, startTime } = logApiRequest(request);
    if (!isModuleEnabled('activity')) {
        const response = { ok: false, error: 'Activity module is disabled', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const beforeParam = searchParams.get('before');

    if (!beforeParam) {
        const response = { ok: false, error: 'Missing "before" date parameter', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 400, body: response });
        return NextResponse.json(response, { status: 400 });
    }
    
    try {
        const before = new Date(beforeParam);
        await repoPruneActivity(before);
        logApiResponse(requestId, startTime, request, { status: 204, body: null });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        const response = { ok: false, error: message, rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 500, body: response });
        return NextResponse.json(response, { status: 500 });
    }
}
// <<< END gen:activity.prune
