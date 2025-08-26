// @module:platform-core @layer:api @owner:studio
import { type NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/modules/auth-session/session';
import { cookies } from 'next/headers';

const protectedRoutes: Record<string, string[]> = {
  '/dashboard/teacher': ['admin', 'teacher'],
  '/dashboard/student': ['admin', 'student'],
  '/users': ['admin', 'teacher'],
  '/classes': ['admin', 'teacher'],
  '/materials': ['admin', 'teacher'],
};

// >>> BEGIN gen:core.middleware.guard (layer:api)
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const { isLoggedIn, user } = session;

  // If user is not logged in and tries to access a protected route, redirect to login
  if (!isLoggedIn && Object.keys(protectedRoutes).some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in, check role-based access
  if (isLoggedIn) {
      // If user tries to go to login page, redirect them to their respective dashboard
      if (pathname === '/login') {
          const dashboardPath = user.role === 'student' ? '/dashboard/student' : '/dashboard/teacher';
          return NextResponse.redirect(new URL(dashboardPath, request.url));
      }
      
      for (const route in protectedRoutes) {
          if (pathname.startsWith(route)) {
              const allowedRoles = protectedRoutes[route];
              if (!allowedRoles.includes(user.role)) {
                  // Redirect to home page if role doesn't match
                  return NextResponse.redirect(new URL('/', request.url));
              }
          }
      }
  }
  
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
