import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/videos/')) {
    return NextResponse.next();
  }

  if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && pathname !== '/login' && pathname !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};