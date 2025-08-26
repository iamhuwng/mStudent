// @module:auth-session @layer:api @owner:studio
import { type NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/modules/auth-session/session';
import { cookies } from 'next/headers';
import { login as repoLogin } from '@/modules/auth-session/repo/session.repo';
import { z } from 'zod';
import { loginSchema } from '@/modules/auth-session/service/session.types';

// >>> BEGIN gen:auth.api (layer:api)
export async function POST(
  req: NextRequest,
  { params }: { params: { action: string } }
) {
  const { action } = params;

  if (action === 'login') {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    try {
      const body = await req.json();
      const credentials = loginSchema.parse(body);
      const { user } = await repoLogin(credentials.username, credentials.password);
      
      session.isLoggedIn = true;
      session.user = user;
      await session.save();

      return NextResponse.json({ success: true, user });
    } catch (error) {
      const message = error instanceof z.ZodError 
        ? error.errors.map(e => e.message).join(', ')
        : error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  if (action === 'logout') {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.destroy();
    return NextResponse.json({ message: 'Logged out successfully' });
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 404 });
}
// <<< END gen:auth.api
