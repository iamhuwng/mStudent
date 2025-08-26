// @module:deadlines-notifications @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import { getNotificationsForUser } from '@/modules/deadlines-notifications/repo/deadlines.repo';
import { logApiRequest, logApiResponse } from '@/lib/logging';

// >>> BEGIN gen:deadlines.getNotifications (layer:api)
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { requestId, startTime } = logApiRequest(request);
  if (!isModuleEnabled('deadlines-notifications')) {
    const response = { ok: false, error: 'Deadlines module is disabled', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }
  
  try {
    const notifications = await getNotificationsForUser(params.userId);
    const response = { data: notifications, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:deadlines.getNotifications
