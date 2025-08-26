// @module:auth-session @layer:api @owner:studio
import { type NextRequest, NextResponse } from 'next/server';
import { login as repoLogin } from '@/modules/auth-session/repo/session.repo';

// >>> BEGIN gen:auth.api (layer:api)
export async function POST(
  req: NextRequest,
  { params }: { params: { action: string } }
) {
  const { action } = params;

  if (action === 'login') {
    try {
      const { username, password } = await req.json();
      const { user } = await repoLogin(username, password);
      // In Phase 0, we don't have a real session yet.
      // We just return the successful login data.
      return NextResponse.json({ success: true, user });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  if (action === 'logout') {
    // No session to destroy in Phase 0.
    return NextResponse.json({ message: 'Logged out successfully' });
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 404 });
}
// <<< END gen:auth.api
