import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const MAX_FREE_DAILY = 20;

export async function POST(req: NextRequest) {
  try {
    const { userId, model, language, wordCount, durationMs } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Log the transcription event
    await supabase.from('usage').insert({
      user_id: userId,
      model: model || 'base',
      language: language || 'auto',
      word_count: wordCount || 0,
      duration_ms: durationMs || 0,
    });

    // Update last_seen_at
    await supabase
      .from('users')
      .update({ last_seen_at: new Date().toISOString() })
      .eq('id', userId);

    // Return today's usage count
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const { count } = await supabase
      .from('usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gte('created_at', todayStart.toISOString());

    const todayUsage = count || 0;

    // Check if user is Pro
    const { data: user } = await supabase
      .from('users')
      .select('pro')
      .eq('id', userId)
      .single();

    const remaining = user?.pro ? -1 : Math.max(0, MAX_FREE_DAILY - todayUsage);

    return NextResponse.json({ logged: true, todayUsage, remaining });
  } catch (err: any) {
    console.error('[usage] Error:', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
