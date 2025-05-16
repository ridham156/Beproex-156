import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

// Handle the callback after login/signup
const afterCallback = async (req: Request, session: any) => {
  // Check if this is a new user (no previous logins)
  const isNewUser = session.user.login_count === 1;

  if (isNewUser) {
    // Set initial metadata for new users
    session.user['https://example.com/user_metadata'] = {
      isNewUser: true,
      onboardingCompleted: false,
      preferences: {
        theme: 'light',
        notifications: true
      }
    };
  }

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({
    afterCallback
  }),
  onError: (req: Request, error: Error) => {
    console.error('Auth error:', error);
    return NextResponse.redirect(new URL('/?error=auth', req.url));
  }
});
