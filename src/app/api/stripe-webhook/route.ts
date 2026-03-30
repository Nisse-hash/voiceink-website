import { createClerkClient } from '@clerk/backend';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('[stripe-webhook] Signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email || session.customer_email;

    if (!email) {
      console.error('[stripe-webhook] No email found in session');
      return NextResponse.json({ received: true });
    }

    console.log('[stripe-webhook] Payment completed for:', email);
    const now = new Date().toISOString();

    try {
      // Find Clerk user by email and mark as Pro
      const users = await clerk.users.getUserList({ emailAddress: [email] });

      if (users.data.length > 0) {
        const user = users.data[0];
        await clerk.users.updateUser(user.id, {
          publicMetadata: {
            ...user.publicMetadata,
            pro: true,
            stripeSessionId: session.id,
            paidAt: now,
          },
        });

        // Update Supabase
        await supabase
          .from('users')
          .upsert({
            id: user.id,
            email,
            pro: true,
            stripe_session_id: session.id,
            paid_at: now,
          }, { onConflict: 'id' });

        console.log('[stripe-webhook] Marked user as Pro:', user.id, email);
      } else {
        // No Clerk account yet. Pre-create a Supabase row so /api/verify can find it later.
        await supabase
          .from('users')
          .upsert({
            id: `pending_${email}`,
            email,
            pro: true,
            stripe_session_id: session.id,
            paid_at: now,
          }, { onConflict: 'id' });

        console.log('[stripe-webhook] No Clerk user for:', email, '- pre-created in Supabase');
      }
    } catch (err) {
      console.error('[stripe-webhook] Error:', err);
    }
  }

  // Handle refunds
  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge;
    const email = charge.billing_details?.email;

    if (email) {
      console.log('[stripe-webhook] Refund for:', email);

      try {
        // Revoke Pro in Clerk
        const users = await clerk.users.getUserList({ emailAddress: [email] });
        if (users.data.length > 0) {
          const user = users.data[0];
          await clerk.users.updateUser(user.id, {
            publicMetadata: { ...user.publicMetadata, pro: false },
          });

          // Revoke Pro in Supabase
          await supabase
            .from('users')
            .update({ pro: false })
            .eq('id', user.id);

          console.log('[stripe-webhook] Revoked Pro for:', user.id, email);
        }
      } catch (err) {
        console.error('[stripe-webhook] Refund error:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
