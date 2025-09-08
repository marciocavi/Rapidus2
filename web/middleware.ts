import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin');
  if (!isAdminPath) return NextResponse.next();

  const hasAuth = req.cookies.get('auth')?.value === '1';
  if (hasAuth) return NextResponse.next();

  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('from', req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};



