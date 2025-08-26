// @module:deadlines-notifications @layer:api @owner:studio
import { NextResponse, NextRequest } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import * as repo from '@/modules/deadlines-notifications/repo/deadlines.repo';

// >>> BEGIN gen:deadlines.api (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { action: string, userId?: string } }
) {
  if (!isModuleEnabled('deadlines-notifications')) {
    return NextResponse.json({ message: 'Deadlines module is disabled' }, { status: 403 });
  }
  
  if (params.action === 'compute') {
    const result = await repo.computeDeadlines();
    return NextResponse.json(result);
  }

  return NextResponse.json({ message: 'Unknown action' }, { status: 404 });
}

export async function POST(
  request: Request,
  { params }: { params: { action: string } }
) {
  if (!isModuleEnabled('deadlines-notifications')) {
    return NextResponse.json({ message: 'Deadlines module is disabled' }, { status: 403 });
  }

  if (params.action === 'notify') {
    const { userId, notification } = await request.json();
    await repo.notifyUser(userId, notification);
    return new NextResponse(null, { status: 204 });
  }

  if (params.action === 'process') {
    const result = await repo.processAndNotifyDeadlines();
    return NextResponse.json(result);
  }

  return NextResponse.json({ message: 'Unknown action' }, { status: 404 });
}
// <<< END gen:deadlines.api


// This should be in its own file like /api/notifications/for-user/[userId]/route.ts
// but for simplicity in this task, we'll add it here.

export async function handleUserNotifications(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  if (!isModuleEnabled('deadlines-notifications')) {
    return NextResponse.json({ message: 'Deadlines module is disabled' }, { status: 403 });
  }
  
  try {
    const notifications = await repo.getNotificationsForUser(params.userId);
    return NextResponse.json(notifications);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message }, { status: 500 });
  }
}
