import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

export async function middleware(request: NextRequest) {
  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/settings', '/profile'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  // Check the session cookie
  const sessionCookie = request.cookies.get('appSession');

  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL('/api/auth/login', request.url));
  }

  // If accessing onboarding page, let them through
  if (request.nextUrl.pathname === '/onboarding') {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/api/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // Check user state from custom headers set by Auth0
  const isNewUser = request.headers.get('x-auth0-new-user') === 'true';
  const hasCompletedOnboarding = request.cookies.get('onboarding-completed')?.value === 'true';

  if (sessionCookie && isNewUser && !hasCompletedOnboarding && isProtectedPath) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/profile/:path*', '/onboarding'],
};
