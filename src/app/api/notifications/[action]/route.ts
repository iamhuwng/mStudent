// @module:deadlines-notifications @layer:api @owner:studio
import { NextResponse } from 'next/server';
import { isModuleEnabled } from '@/modules/registry';
import * as repo from '@/modules/deadlines-notifications/repo/deadlines.repo';

// >>> BEGIN gen:deadlines.api (layer:api)
export async function GET(
  request: Request,
  { params }: { params: { action: string } }
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

  return NextResponse.json({ message: 'Unknown action' }, { status: 404 });
}
// <<< END gen:deadlines.api
