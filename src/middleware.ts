// @module:platform-core @layer:api @owner:studio
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import type { SessionData } from '@/modules/auth-session/session'
import { sessionOptions } from '@/modules/auth-session/session'

// Public routes (no auth)
const PUBLIC_PREFIXES = [
  '/login',
  '/api/session/login',
  '/api/session/logout',
  '/favicon.ico',
  '/_next', // static & images below are excluded via matcher anyway
]

// >>> BEGIN gen:core.middleware.guard (layer:api)
export async function middleware(request: NextRequest) {
  // IMPORTANT: in middleware use iron-session/edge with Request/Response
  const res = NextResponse.next()
  const session = await getIronSession<SessionData>(request, res, sessionOptions)
  const { isLoggedIn } = session
  const { pathname } = request.nextUrl

  // Allow public paths through
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return res
  }

  // Block everything else if not logged in
  if (!isLoggedIn) {
    const url = new URL('/login', request.url)
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // Allow request; iron-session headers/cookies are on `res`
  return res
}
// <<< END gen:core.middleware.guard

// Keep your matcher minimal (no /api, no static buckets)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
