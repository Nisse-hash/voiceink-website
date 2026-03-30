import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { userId, settings } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Save settings to Supabase
    const { error } = await supabase
      .from('users')
      .update({ settings })
      .eq('id', userId);

    if (error) {
      console.error('[sync-settings] Save error:', error.message);
      return NextResponse.json({ error: 'Save failed' }, { status: 500 });
    }

    return NextResponse.json({ saved: true });
  } catch (err: any) {
    console.error('[sync-settings] Error:', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
