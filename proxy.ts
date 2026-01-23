import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('admin-auth');
    
    // Allow access to admin page itself (it handles auth internally)
    // But you could redirect unauthenticated users here if preferred
    if (!authCookie && request.nextUrl.pathname === '/admin') {
      // Optional: uncomment to force redirect to login
      // return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
