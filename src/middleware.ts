import { NextResponse, type NextRequest } from 'next/server'
import { getUserByToken } from './services'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isDashboard = pathname.startsWith('/dashboard')
  const isRoot = pathname === '/'

  if (!token && isDashboard) {
    console.log("1")
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && (isAuthPage || isRoot)) {
    console.log("2")
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (token && isDashboard) {
    console.log("3")
    const user = await getUserByToken()
    if (!user) {
      console.log("4")
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.set('token', '', { maxAge: 0 })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/dashboard/:path*'],
}