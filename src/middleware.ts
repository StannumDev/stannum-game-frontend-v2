// import { NextResponse, type NextRequest } from 'next/server';

export function middleware() {

  // const token = request.cookies.get('token')?.value

  // if (token && request.nextUrl.pathname === '/login') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }
  
  // if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/dashboard/:path*'],
}