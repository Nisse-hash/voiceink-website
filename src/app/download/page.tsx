'use client';

import { Download, Check, Mic, ArrowRight, Monitor, Heart } from 'lucide-react';
import { useUser, UserButton } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';

function TypewriterKaraoke({ text, delay = 500, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ');
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setActiveIndex(i);
        i++;
        if (i >= words.length) clearInterval(interval);
      }, 120);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <p className={`max-w-2xl mx-auto mb-10 leading-relaxed text-center ${className}`}>
      {words.map((word, i) => (
        <span key={i}>
          <span
            className="inline-block transition-all duration-300"
            style={{
              color: i <= activeIndex ? '#F0B429' : 'rgba(255,255,255,0.25)',
              textShadow: i === activeIndex
                ? '0 0 20px rgba(240,180,41,0.8), 0 0 40px rgba(240,180,41,0.4)'
                : i < activeIndex
                ? '0 0 8px rgba(240,180,41,0.3)'
                : 'none',
              transform: i === activeIndex ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {word}
          </span>
          {' '}
        </span>
      ))}
    </p>
  );
}

const WINDOWS_URL = '/api/download?os=windows';
const MAC_ARM_URL = '/api/download?os=mac-arm';
const MAC_X64_URL = '/api/download?os=mac-intel';

type Platform = 'windows' | 'mac' | 'other';

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('mac') || ua.includes('macintosh')) return 'mac';
  if (platform.includes('win') || ua.includes('windows')) return 'windows';
  return 'other';
}

function getDeviceName(): string {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('iphone')) return 'iPhone';
  if (ua.includes('ipad')) return 'iPad';
  if (ua.includes('android')) return 'Android';
  if (ua.includes('linux')) return 'Linux';
  if (ua.includes('chromeos')) return 'ChromeOS';
  return 'device';
}

// ============================================
// Heart Balloon Component
// ============================================
function HeartBalloon({ onSent }: { onSent: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'floating' | 'gone'>('idle');
  const balloonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (phase !== 'idle') return;
    setPhase('floating');
    setTimeout(() => {
      setPhase('gone');
      onSent();
    }, 2500);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {phase === 'gone' ? (
        <div className="animate-fade-in text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F0B429] to-[#C9A84C] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(201,168,76,0.4)]">
            <Check className="w-8 h-8 text-[#0A0A0F]" strokeWidth={3} />
          </div>
          <p className="text-[#C9A84C] font-semibold text-lg">Noted!</p>
          <p className="text-[#666] text-sm mt-1">We&apos;ll let you know when it&apos;s ready.</p>
        </div>
      ) : (
        <div
          ref={balloonRef}
          onClick={handleClick}
          className={`cursor-pointer select-none transition-all ${
            phase === 'floating' ? 'animate-balloon-fly pointer-events-none' : 'hover:scale-110'
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* String */}
          <div className="flex flex-col items-center">
            {/* Heart */}
            <div className={`relative ${phase === 'idle' ? 'animate-balloon-bob' : ''}`}>
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                <defs>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F0B429" />
                    <stop offset="100%" stopColor="#C9A84C" />
                  </linearGradient>
                </defs>
                <path
                  d="M40 70 C40 70 10 50 10 30 C10 18 20 10 30 10 C35 10 38 13 40 16 C42 13 45 10 50 10 C60 10 70 18 70 30 C70 50 40 70 40 70Z"
                  fill="url(#heartGrad)"
                />
                {/* Shine */}
                <ellipse cx="28" cy="28" rx="8" ry="10" fill="rgba(255,255,255,0.2)" transform="rotate(-20 28 28)" />
              </svg>
              {/* Sparkle particles around heart when idle */}
              {phase === 'idle' && (
                <>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F0B429] rounded-full animate-sparkle-1 opacity-60" />
                  <div className="absolute top-3 -left-2 w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-sparkle-2 opacity-40" />
                  <div className="absolute -bottom-1 right-2 w-1 h-1 bg-[#F0B429] rounded-full animate-sparkle-3 opacity-50" />
                </>
              )}
            </div>
            {/* String hanging down */}
            <svg width="4" height="60" className={phase === 'idle' ? 'animate-string-sway' : ''}>
              <path d="M2 0 Q0 15 2 30 Q4 45 2 60" stroke="#C9A84C" strokeWidth="1.5" fill="none" opacity="0.6" />
            </svg>
          </div>
        </div>
      )}

      {phase === 'idle' && (
        <p className="text-[#666] text-sm animate-pulse-slow">Tap the heart to let us know</p>
      )}
    </div>
  );
}

// ============================================
// Download Page
// ============================================
export default function DownloadPage() {
  const { user } = useUser();
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [heartSent, setHeartSent] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  if (!platform) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-[#666]">Detecting your system...</div>
      </main>
    );
  }

  // ============================================
  // OTHER / MOBILE
  // ============================================
  if (platform === 'other') {
    const device = getDeviceName();
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04),transparent_60%)]" />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          {user && (
            <div className="flex items-center justify-center gap-3 mb-10">
              <UserButton />
              <span className="text-sm text-[#666]">{user.emailAddresses[0]?.emailAddress}</span>
            </div>
          )}

          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F0B429] to-[#C9A84C] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(201,168,76,0.2)]">
            <Mic className="w-10 h-10 text-[#0A0A0F]" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
            VoiceInk is for Mac and Windows
          </h1>

          <p className="text-lg text-[#999] mb-2 leading-relaxed">
            Right now, VoiceInk lives on desktops only.
          </p>

          <p className="text-lg text-[#666] mb-8 leading-relaxed">
            Want it on <span className="text-[#C9A84C] font-semibold">{device}</span> too?
            <br />
            Send us a heart and we&apos;ll make it happen.
          </p>

          <HeartBalloon onSent={() => setHeartSent(true)} />

          <div className="mt-12 pt-8 border-t border-[#1a1a25]">
            <p className="text-sm text-[#555] mb-3">Or visit this page from your Mac or Windows computer:</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#13131A] border border-[#2a2a35] rounded-lg">
              <span className="text-sm text-[#C9A84C] font-mono">voice-ink.com/download</span>
            </div>
          </div>

          <a href="/" className="inline-flex items-center gap-2 mt-8 text-sm text-[#8a7235] hover:text-[#C9A84C] transition-colors">
            <Mic className="w-4 h-4" /> Back to voice-ink.com
          </a>
        </div>
      </main>
    );
  }

  // ============================================
  // MAC or WINDOWS
  // ============================================
  const isMac = platform === 'mac';
  const osName = isMac ? 'Mac' : 'Windows';
  const OsIcon = isMac ? () => <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> : Monitor;

  const primaryUrl = isMac ? MAC_ARM_URL : WINDOWS_URL;
  const primaryLabel = isMac ? 'Download for Mac' : 'Download for Windows';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_60%)]" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {user && (
          <div className="flex items-center justify-center gap-3 mb-10">
            <UserButton />
            <span className="text-sm text-[#666]">{user.emailAddresses[0]?.emailAddress}</span>
          </div>
        )}

        {/* OS Detection Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#13131A] border border-[#2a2a35] rounded-full mb-8 text-sm">
          <OsIcon />
          <span className="text-[#999]">You&apos;re on</span>
          <span className="text-white font-semibold">{osName}</span>
          <Check className="w-4 h-4 text-[#22c55e]" />
        </div>

        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F0B429] to-[#C9A84C] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(201,168,76,0.3)]">
          <Check className="w-10 h-10 text-[#0A0A0F]" strokeWidth={3} />
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
          Thank you{user?.firstName ? `, ${user.firstName}` : ''}!
        </h1>

        <TypewriterKaraoke text="VoiceInk Pro is yours. Forever. Download, install, and sign in with this account to activate." delay={800} className="text-2xl md:text-3xl font-semibold" />

        {/* Primary download */}
        <a
          href={primaryUrl}
          className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F0B429] to-[#C9A84C] text-[#0A0A0F] font-bold rounded-xl text-xl transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(201,168,76,0.3)] mb-6"
        >
          <Download className="w-6 h-6" />
          {primaryLabel}
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>

        {/* Secondary downloads */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {isMac ? (
            <>
              <a href={MAC_X64_URL} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#333] rounded-lg text-sm text-[#666] hover:text-white hover:border-[#C9A84C] transition-colors">
                Mac (Intel)
              </a>
              <a href={WINDOWS_URL} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#333] rounded-lg text-sm text-[#666] hover:text-white hover:border-[#C9A84C] transition-colors">
                <Monitor className="w-4 h-4" />
                Windows
              </a>
            </>
          ) : (
            <>
              <a href={MAC_ARM_URL} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#333] rounded-lg text-sm text-[#666] hover:text-white hover:border-[#C9A84C] transition-colors">
                Mac (Apple Silicon)
              </a>
              <a href={MAC_X64_URL} className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#333] rounded-lg text-sm text-[#666] hover:text-white hover:border-[#C9A84C] transition-colors">
                Mac (Intel)
              </a>
            </>
          )}
        </div>

        {/* SmartScreen note (Windows only) */}
        {!isMac && (
          <div className="flex items-start gap-3 px-5 py-4 bg-[#13131A] border border-[#2a2a35] rounded-xl mb-8 text-left">
            <span className="text-lg mt-0.5">🛡️</span>
            <div>
              <p className="text-sm text-[#999]">
                <span className="text-white font-medium">Windows may show a security prompt.</span> VoiceInk is brand new and we haven&apos;t applied for a Microsoft code signing certificate yet. Click &quot;More info&quot; then &quot;Run anyway&quot; to install safely.
              </p>
            </div>
          </div>
        )}

        {/* Quick Start */}
        <div className="bg-[#13131A] border border-[#2a2a35] rounded-2xl p-8 text-left">
          <h3 className="text-lg font-bold mb-6 text-center">Quick Start</h3>
          <div className="space-y-5">
            {(isMac ? [
              { step: '1', text: 'Open the .dmg and drag VoiceInk to Applications' },
              { step: '2', text: 'First launch downloads the speech model (~142MB, once only)' },
              { step: '3', text: 'Grant Microphone and Accessibility permissions when prompted' },
              { step: '4', text: 'Find VoiceInk in your menu bar (top-right), press Alt+A, and speak!' },
            ] : [
              { step: '1', text: 'Run the installer (one click, no admin needed)' },
              { step: '2', text: 'First launch downloads the speech model (~142MB, once only)' },
              { step: '3', text: 'Find VoiceInk in your system tray (bottom-right)' },
              { step: '4', text: 'Click in any text field, press Alt+A, and speak!' },
            ]).map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-[#C9A84C]">{s.step}</span>
                </div>
                <p className="text-[#666] pt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-[#666]">
          {isMac ? 'Click' : 'Right-click'} the {isMac ? 'menu bar' : 'tray'} icon &rarr; Settings to customize your shortcut, language, and animation.
        </p>

        <a href="/" className="inline-flex items-center gap-2 mt-6 text-sm text-[#8a7235] hover:text-[#C9A84C] transition-colors">
          <Mic className="w-4 h-4" /> Back to voice-ink.com
        </a>
      </div>
    </main>
  );
}
