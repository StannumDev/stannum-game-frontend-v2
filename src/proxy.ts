import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard'];
const GUEST_ONLY_ROUTES = ['/login', '/password-recovery'];
const SKIP_REDIRECT_PATHS = ['/dashboard', '/login', '/register', '/password-recovery'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasTokens = request.cookies.has('access_token') || request.cookies.has('refresh_token');
  const hasLoginFlag = request.cookies.get('logged_in')?.value === '1';

  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!hasTokens && !hasLoginFlag) {
      const loginUrl = new URL('/login', request.url);
      if (!SKIP_REDIRECT_PATHS.some(p => pathname === p)) {
        loginUrl.searchParams.set('redirect', pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  if (GUEST_ONLY_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/')) || pathname === '/register' || pathname === '/') {
    if (hasLoginFlag && hasTokens) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // Stale logged_in flag without tokens — clean it up
    if (hasLoginFlag && !hasTokens) {
      const response = NextResponse.next();
      response.cookies.delete('logged_in');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register', '/password-recovery'],
};
