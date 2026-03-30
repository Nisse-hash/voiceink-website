import { createClerkClient } from '@clerk/backend';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ valid: false, error: 'Missing userId' }, { status: 400 });
    }

    const user = await clerk.users.getUser(userId);
    if (!user) {
      return NextResponse.json({ valid: false, error: 'User not found' }, { status: 404 });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    let isPro = !!(user.publicMetadata as any)?.pro;

    // If not marked Pro in Clerk, check Stripe directly
    if (!isPro && email) {
      const sessions = await stripe.checkout.sessions.list({
        customer_details: { email },
        status: 'complete',
        limit: 1,
      });

      if (sessions.data.length > 0) {
        isPro = true;
        await clerk.users.updateUser(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            pro: true,
            stripeSessionId: sessions.data[0].id,
            paidAt: new Date().toISOString(),
          },
        });
      }
    }

    // Upsert user in Supabase
    const { data: dbUser } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: email || '',
        name: user.firstName || '',
        image_url: user.imageUrl || '',
        pro: isPro,
        last_seen_at: new Date().toISOString(),
      }, { onConflict: 'id' })
      .select('settings')
      .single();

    // Get today's usage count for free tier
    let todayUsage = 0;
    if (!isPro) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from('usage')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', todayStart.toISOString());
      todayUsage = count || 0;
    }

    return NextResponse.json({
      valid: true,
      email,
      firstName: user.firstName,
      pro: isPro,
      settings: dbUser?.settings || {},
      todayUsage,
    });
  } catch (err: any) {
    console.error('[verify] Error:', err.message);
    return NextResponse.json({ valid: false, error: 'Invalid code' }, { status: 400 });
  }
}
