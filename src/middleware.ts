// @module:platform-core @layer:api @owner:studio
import { type NextRequest, NextResponse } from 'next/server';

// Simple path → roles map (UI & APIs will still enforce real auth/roles)
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

  const needsAuth = Object.keys(protectedRoutes).some((prefix) =>
    pathname.startsWith(prefix)
  );
  if (!needsAuth) return NextResponse.next();

  // In middleware, use request.cookies – NOT next/headers cookies()
  const session = request.cookies.get('mstudent-session')?.value;

  if (!session) {
    const url = new URL('/login', request.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // (Optional) We could decode role from a compact cookie here,
  // but keep it simple and let server routes/pages enforce roles.
  return NextResponse.next();
}
// <<< END gen:core.middleware.guard

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
