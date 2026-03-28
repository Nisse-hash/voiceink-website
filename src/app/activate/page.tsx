'use client';

import { useUser, useAuth, SignInButton } from '@clerk/nextjs';
import { Mic, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ActivatePage() {
  const { user } = useUser();
  const { isSignedIn, isLoaded } = useAuth();
  const [copied, setCopied] = useState(false);

  const activationCode = user?.id || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(activationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-muted)]">Loading...</div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-gold-bright)] to-[var(--color-gold)] flex items-center justify-center mx-auto mb-6">
            <Mic className="w-8 h-8 text-[var(--color-ink)]" />
          </div>
          <h1 className="text-3xl font-black mb-4" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
            Activate VoiceInk Pro
          </h1>
          <p className="text-[var(--color-muted)] mb-8">
            Sign in to get your activation code for the desktop app.
          </p>
          <SignInButton mode="modal">
            <button className="px-8 py-3 bg-gradient-to-r from-[var(--color-gold-bright)] to-[var(--color-gold)] text-[var(--color-ink)] font-bold rounded-xl text-lg cursor-pointer hover:scale-105 transition-transform">
              Sign in
            </button>
          </SignInButton>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-gold-bright)] to-[var(--color-gold)] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(201,168,76,0.3)]">
          <Check className="w-8 h-8 text-[var(--color-ink)]" />
        </div>

        <h1 className="text-3xl font-black mb-2" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
          Your Activation Code
        </h1>
        <p className="text-[var(--color-muted)] mb-8">
          Copy this code and paste it in VoiceInk Settings on your desktop.
        </p>

        {/* Activation code display */}
        <div className="bg-[var(--color-ink-light)] border border-[var(--color-subtle)] rounded-xl p-6 mb-6">
          <div className="font-mono text-lg text-[var(--color-gold)] tracking-wider mb-4 break-all select-all">
            {activationCode}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 rounded-lg text-[var(--color-gold)] hover:bg-[var(--color-gold)]/20 transition-colors cursor-pointer"
          >
            {copied ? (
              <><Check className="w-4 h-4" /> Copied!</>
            ) : (
              <><Copy className="w-4 h-4" /> Copy Code</>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="text-left bg-[var(--color-ink-light)] border border-[var(--color-subtle)] rounded-xl p-6">
          <h3 className="text-sm font-bold mb-4 text-center text-white/70">How to activate</h3>
          <div className="space-y-3">
            {[
              'Open VoiceInk on your desktop',
              'Right-click the tray icon, click Settings',
              'Paste your activation code in the "Activation" field',
              'Click Save. Pro features are now unlocked!',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs font-bold text-[var(--color-gold)] bg-[var(--color-gold)]/10 rounded px-1.5 py-0.5 shrink-0">{i + 1}</span>
                <p className="text-sm text-[var(--color-muted)]">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <a href="/" className="inline-flex items-center gap-2 mt-8 text-sm text-[var(--color-gold-dim)] hover:text-[var(--color-gold)] transition-colors">
          <Mic className="w-4 h-4" /> Back to voice-ink.com
        </a>
      </div>
    </main>
  );
}
