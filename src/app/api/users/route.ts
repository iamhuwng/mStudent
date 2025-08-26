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
import { logApiRequest } from '@/lib/logging';

// >>> BEGIN gen:users.api.list (layer:api)
export async function GET(request: NextRequest) {
  const reqId = logApiRequest(request);
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn || !['admin', 'teacher'].includes(session.user.role)) {
      return NextResponse.json({ message: 'Forbidden', reqId }, { status: 403 });
  }

  if (!isModuleEnabled('users')) {
    return NextResponse.json({ message: 'Users module is disabled', reqId }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  try {
    const users = await repoGetUsers({ page, limit });
    return NextResponse.json({ data: users, reqId });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message, reqId }, { status: 500 });
  }
}
// <<< END gen:users.api.list

// >>> BEGIN gen:users.api.create (layer:api)
export async function POST(request: Request) {
    const reqId = logApiRequest(request);
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn || session.user.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden', reqId }, { status: 403 });
    }
    
    if (!isModuleEnabled('users')) {
        return NextResponse.json({ message: 'Users module is disabled', reqId }, { status: 403 });
    }

    try {
        const body = await request.json();
        const userData = userSchema.omit({ id: true, enrolled: true }).parse(body);
        const newUser = await repoCreateUser(userData);
        return NextResponse.json({ data: newUser, reqId }, { status: 201 });
    } catch (error) {
        const message = error instanceof z.ZodError 
            ? error.errors.map(e => e.message).join(', ')
            : error instanceof Error 
            ? error.message 
            : 'An unknown error occurred';
        return NextResponse.json({ message, reqId }, { status: 400 });
    }
}
// <<< END gen:users.api.create
