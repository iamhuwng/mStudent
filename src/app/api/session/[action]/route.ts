// @module:auth-session @layer:api @owner:studio
import { type NextRequest, NextResponse } from 'next/server';
import { login as repoLogin } from '@/modules/auth-session/repo/session.repo';
import { getIronSession } from 'iron-session';
import { sessionOptions, type SessionData } from '@/modules/auth-session/repo/session.repo';
import { cookies } from 'next/headers';

// >>> BEGIN gen:auth.api (layer:api)
export async function POST(
  req: NextRequest,
  { params }: { params: { action: string } }
) {
  const { action } = params;
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (action === 'login') {
    try {
      const { username, password } = await req.json();
      const { user } = await repoLogin(username, password);
      
      session.isLoggedIn = true;
      session.user = user;
      await session.save();

      return NextResponse.json({ success: true, user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  if (action === 'logout') {
    session.destroy();
    return NextResponse.json({ message: 'Logged out successfully' });
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 404 });
}
// <<< END gen:auth.api
