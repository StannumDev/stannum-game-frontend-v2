import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const isLoggedIn = !!token || !!refreshToken
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isRoot = pathname === '/'

  if (isLoggedIn && (isAuthPage || isRoot)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/dashboard/:path*'],
}