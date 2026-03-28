'use client';

import { Download, Check, Mic, ArrowRight } from 'lucide-react';

export default function DownloadPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_60%)]" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-gold-bright)] to-[var(--color-gold)] flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(201,168,76,0.3)]">
          <Check className="w-10 h-10 text-[var(--color-ink)]" strokeWidth={3} />
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
          Thank you!
        </h1>

        <p className="text-xl text-[var(--color-muted)] mb-10 leading-relaxed">
          VoiceInk Pro is yours. Download, install, and start speaking.
        </p>

        {/* Download button */}
        <a
          href="https://github.com/Nisse-hash/voice-input-button/releases/latest/download/VoiceInk.Setup.0.1.0.exe"
          className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--color-gold-bright)] to-[var(--color-gold)] text-[var(--color-ink)] font-bold rounded-xl text-xl transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(201,168,76,0.3)] mb-12"
        >
          <Download className="w-6 h-6" />
          Download VoiceInk Pro
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </a>

        {/* Quick start steps */}
        <div className="bg-[var(--color-ink-light)] border border-[var(--color-subtle)] rounded-2xl p-8 text-left">
          <h3 className="text-lg font-bold mb-6 text-center">Quick Start</h3>

          <div className="space-y-5">
            {[
              { step: '1', text: 'Run the installer (one click, no admin needed)' },
              { step: '2', text: 'First launch downloads the speech model (~142MB, once only)' },
              { step: '3', text: 'Find VoiceInk in your system tray (bottom-right)' },
              { step: '4', text: 'Click in any text field, press Alt+A, and speak!' },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-[var(--color-gold)]">{s.step}</span>
                </div>
                <p className="text-[var(--color-muted)] pt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-8 text-sm text-[var(--color-muted)]">
          Right-click the tray icon &rarr; Settings to customize your shortcut, language, and animation.
        </p>

        <a href="/" className="inline-flex items-center gap-2 mt-6 text-sm text-[var(--color-gold-dim)] hover:text-[var(--color-gold)] transition-colors">
          <Mic className="w-4 h-4" /> Back to voice-ink.com
        </a>
      </div>
    </main>
  );
}
