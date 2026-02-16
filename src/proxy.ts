import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard'];
const GUEST_ONLY_ROUTES = ['/login', '/password-recovery'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuth = request.cookies.has('access_token') || request.cookies.has('refresh_token');

  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    if (!hasAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  if (GUEST_ONLY_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/')) || pathname === '/register') {
    if (hasAuth) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/password-recovery'],
};
