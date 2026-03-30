import { NextRequest, NextResponse } from 'next/server';

const DOWNLOADS: Record<string, string> = {
  windows: 'https://github.com/Nisse-hash/voice-ink/releases/latest/download/VoiceInk.Setup.0.1.0.exe',
  'mac-arm': 'https://github.com/Nisse-hash/voice-ink/releases/latest/download/VoiceInk-0.1.0-mac-arm64.dmg',
  'mac-intel': 'https://github.com/Nisse-hash/voice-ink/releases/latest/download/VoiceInk-0.1.0-mac-x64.dmg',
};

function detectOS(ua: string): string {
  const lower = ua.toLowerCase();
  if (lower.includes('macintosh') || lower.includes('mac os')) {
    // Apple Silicon Macs report "arm64" or have newer OS versions
    // Default to arm64 since most Macs sold since late 2020 are Apple Silicon
    return 'mac-arm';
  }
  return 'windows';
}

export async function GET(req: NextRequest) {
  let os = req.nextUrl.searchParams.get('os');

  // Auto-detect OS from User-Agent if not specified
  if (!os) {
    const ua = req.headers.get('user-agent') || '';
    os = detectOS(ua);
  }

  const url = DOWNLOADS[os];

  if (!url) {
    return NextResponse.json({ error: 'Invalid OS' }, { status: 400 });
  }

  return NextResponse.redirect(url);
}
