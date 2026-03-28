import { createClerkClient } from '@clerk/backend';
import { NextRequest, NextResponse } from 'next/server';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ valid: false, error: 'Missing userId' }, { status: 400 });
    }

    // Verify user exists in Clerk
    const user = await clerk.users.getUser(userId);

    if (!user) {
      return NextResponse.json({ valid: false, error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      valid: true,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      pro: true, // For now, all signed-up users are Pro. Later: check Stripe payment metadata.
    });
  } catch (err: any) {
    return NextResponse.json({ valid: false, error: 'Invalid code' }, { status: 400 });
  }
}
