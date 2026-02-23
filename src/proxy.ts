import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard'];
const GUEST_ONLY_ROUTES = ['/login', '/password-recovery'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasTokens = request.cookies.has('access_token') || request.cookies.has('refresh_token');
  const hasLoginFlag = request.cookies.get('logged_in')?.value === '1';

  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!hasTokens && !hasLoginFlag) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (GUEST_ONLY_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/')) || pathname === '/register' || pathname === '/') {
    if (hasLoginFlag) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register', '/password-recovery'],
};
