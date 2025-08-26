// @module:platform-core @layer:api @owner:studio
import { type NextRequest, NextResponse } from 'next/server';

// >>> BEGIN gen:core.middleware.guard (layer:api)
export function middleware(request: NextRequest) {
  // This is a placeholder for any future middleware logic,
  // such as authentication checks.
  return NextResponse.next();
}
// <<< END gen:core.middleware.guard

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
