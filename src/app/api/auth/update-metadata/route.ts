import { getSession, updateSession } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';
import type { UserMetadata } from '@/utils/user';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const updates: Partial<UserMetadata> = await request.json();

    // Update the user's metadata through Auth0 Management API
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${session.user.sub}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
      },
      body: JSON.stringify({
        user_metadata: updates,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user metadata');
    }

    // Update the session with new metadata
    const updatedUser = await response.json();
    await updateSession({ user_metadata: updates });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user metadata:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
