// @module:auth-session @layer:api @owner:studio
import { type NextRequest, NextResponse } from 'next/server';
import { login as repoLogin } from '@/modules/auth-session/repo/session.repo';

// >>> BEGIN gen:auth-session.api-handler (layer:api)
export async function POST(
  req: NextRequest,
  { params }: { params: { action: string } }
) {
  const { action } = params;

  if (action === 'login') {
    try {
      const { email, password } = await req.json();
      const result = await repoLogin(email, password);
      return NextResponse.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return NextResponse.json({ message }, { status: 400 });
    }
  }

  if (action === 'logout') {
    // In a real app, you would clear the session/cookie here.
    return NextResponse.json({ message: 'Logged out successfully' });
  }

  return NextResponse.json({ message: 'Invalid action' }, { status: 404 });
}
// <<< END gen:auth-session.api-handler
