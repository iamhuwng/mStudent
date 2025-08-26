// @module:users @layer:api @owner:studio
import { NextRequest, NextResponse } from 'next/server';
import { 
    getUsers as repoGetUsers,
    createUser as repoCreateUser
} from '@/modules/users/repo/users.repo';
import { isModuleEnabled } from '@/modules/registry';
import { z } from 'zod';
import { userSchema } from '@/modules/users/service/users.types';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/modules/auth-session/session';
import { cookies } from 'next/headers';
import { logApiRequest, logApiResponse } from '@/lib/logging';

// >>> BEGIN gen:users.api.list (layer:api)
export async function GET(request: NextRequest) {
  const { requestId, startTime } = logApiRequest(request);
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  if (!session.isLoggedIn || !['admin', 'teacher'].includes(session.user.role)) {
      const response = { ok: false, error: 'Forbidden', rid: requestId };
      logApiResponse(requestId, startTime, request, { status: 403, body: response });
      return NextResponse.json(response, { status: 403 });
  }

  if (!isModuleEnabled('users')) {
    const response = { ok: false, error: 'Users module is disabled', rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 403, body: response });
    return NextResponse.json(response, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  try {
    const users = await repoGetUsers({ page, limit });
    const response = { data: users, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 200, body: response });
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    const response = { ok: false, error: message, rid: requestId };
    logApiResponse(requestId, startTime, request, { status: 500, body: response });
    return NextResponse.json(response, { status: 500 });
  }
}
// <<< END gen:users.api.list

// >>> BEGIN gen:users.api.create (layer:api)
export async function POST(request: Request) {
    const { requestId, startTime } = logApiRequest(request);
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn || session.user.role !== 'admin') {
        const response = { ok: false, error: 'Forbidden', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }
    
    if (!isModuleEnabled('users')) {
        const response = { ok: false, error: 'Users module is disabled', rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 403, body: response });
        return NextResponse.json(response, { status: 403 });
    }

    try {
        const body = await request.json();
        const userData = userSchema.omit({ id: true, enrolled: true }).parse(body);
        const newUser = await repoCreateUser(userData);
        const response = { data: newUser, rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 201, body: response });
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        const message = error instanceof z.ZodError 
            ? error.errors
            : error instanceof Error 
            ? error.message 
            : 'An unknown error occurred';
        const response = { ok: false, error: message, rid: requestId };
        logApiResponse(requestId, startTime, request, { status: 400, body: response });
        return NextResponse.json(response, { status: 400 });
    }
}
// <<< END gen:users.api.create
