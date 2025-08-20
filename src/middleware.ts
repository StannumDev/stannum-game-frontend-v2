import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isRoot = pathname === '/'

  if (token && (isAuthPage || isRoot)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/dashboard/:path*'],
}