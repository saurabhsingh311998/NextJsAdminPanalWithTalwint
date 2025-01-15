// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Optional: Set fallback for paths
  const pathname = req.nextUrl.pathname;
  const email = localStorage.getItem('email'); // Check email in localStorage

  if (pathname.startsWith('/auth') || pathname === '/') {
    return NextResponse.next(); // Allow access to public routes
  }

  return NextResponse.redirect(new URL('/auth/signin', req.url));
}

export const config = {
  matcher: ['/', '/dashboard/:path*'], // Add protected routes here
};