'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mic, Keyboard, Globe, Sparkles, Zap, Shield, Download, ChevronRight, Volume2, Type, Settings, Waves, Check } from 'lucide-react';
import { SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import ShaderBackground from '@/components/ui/shader-background';
import { KaraokeText } from '@/components/blocks/karaoke-text';
import { TypewriterDemo } from '@/components/blocks/typewriter-demo';
import { AnimationShowcase } from '@/components/blocks/animation-showcase';

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <main>
      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--color-ink)]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-gold-bright)] to-[var(--color-gold)] flex items-center justify-center">
            <Mic className="w-3.5 h-3.5 text-[var(--color-ink)]" />
          </div>
          <span className="font-bold text-base">VoiceInk</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#pricing" className="text-sm text-[var(--color-muted)] hover:text-white transition-colors">Pricing</a>
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal">
              <button className="text-sm text-[var(--color-gold)] hover:text-[var(--color-gold-bright)] transition-colors cursor-pointer">Sign in</button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && (
            <UserButton />
          )}
        </div>
      </nav>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* WebGL shader flowing lines background */}
        <ShaderBackground />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#0A0A0F]/60 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#0A0A0F_65%)] z-[1]" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="animate-fade-in-up animate-delay-1">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-subtle)] text-[var(--color-gold)] text-xs tracking-[0.2em] uppercase mb-8">
              <Shield className="w-3 h-3" /> 100% Offline. Zero internet required.
            </span>
          </div>

          <h1 className="animate-fade-in-up animate-delay-2 text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
            Your voice,
            <br />
            <span className="bg-gradient-to-r from-[var(--color-gold-bright)] via-[var(--color-gold)] to-[var(--color-gold-dim)] bg-clip-text text-transparent">
              in ink.
            </span>
          </h1>

          <KaraokeText />

          <p className="animate-fade-in-up animate-delay-3 text-sm text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            No cloud. No account. No internet connection needed. Your voice is processed entirely on your machine. Nothing is ever sent, stored, or shared. Period.
          </p>

          <div className="animate-fade-in-up animate-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#pricing" className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--color-gold-bright)] to-[var(--color-gold)] text-[var(--color-ink)] font-bold rounded-xl text-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]"
              style={{ animation: 'pulse-gold 3s ease-in-out infinite' }}>
              <Download className="w-5 h-5" />
              Get VoiceInk
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <span className="text-sm text-[var(--color-muted)]">Windows 10/11 &middot; Works without WiFi</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animate-delay-6">
          <div className="w-6 h-10 rounded-full border-2 border-[var(--color-subtle)] flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-[var(--color-gold)] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ===== DEMO: Live Typewriter ===== */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold-dim)] mb-4 block">How it works</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
              Speak. It types.
            </h2>
            <p className="text-[var(--color-muted)] text-lg max-w-lg mx-auto">No training. No cloud. Just press your shortcut and talk.</p>
          </div>
          <TypewriterDemo />
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-32 px-6 bg-[var(--color-ink-light)] relative overflow-hidden">
        {/* Diagonal gold line accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-30" />

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold-dim)] mb-4 block">Features</span>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
              Everything you need,<br />
              <span className="text-[var(--color-gold)]">nothing you don't.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Zap />, title: "Instant", desc: "Press Alt+A (or your custom shortcut), speak, done. Text appears where your cursor is." },
              { icon: <Shield />, title: "No Internet. Ever.", desc: "Runs on your CPU. Works in airplane mode, on a submarine, in a cabin with no signal. Your voice never touches a server." },
              { icon: <Globe />, title: "Auto Language", desc: "Speaks French at home, English at work? VoiceInk detects the language automatically." },
              { icon: <Type />, title: "Custom Words", desc: "Add names, brands, and technical terms. VoiceInk learns your vocabulary." },
              { icon: <Waves />, title: "7 Animations", desc: "Gold Pulse, Waveform, Ripple, Minimal, Neon Ring, Spin, Silk Wave. Pick your vibe." },
              { icon: <Settings />, title: "Fully Custom", desc: "Change your shortcut, language, model accuracy, animation style. Make it yours." },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-[var(--color-ink)] border border-[var(--color-subtle)] hover:border-[var(--color-gold-dim)] transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-ink-lighter)] flex items-center justify-center text-[var(--color-gold)] mb-5 group-hover:scale-110 transition-transform">
                  {React.cloneElement(f.icon, { className: 'w-5 h-5' })}
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-[var(--color-muted)] leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OFFLINE PRIVACY BANNER ===== */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/5 border border-green-500/20 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-sm font-medium tracking-wide">Disconnect your WiFi. VoiceInk still works.</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-6" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
            Your words stay on <span className="text-[var(--color-gold)]">your machine</span>.
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-2xl mx-auto leading-relaxed">
            VoiceInk uses Whisper AI running entirely on your CPU. No internet connection required. No servers processing your voice. No data leaving your computer. Not now, not ever. Your conversations, your medical notes, your private thoughts; they stay private.
          </p>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <section className="py-12 overflow-hidden border-y border-[var(--color-subtle)]">
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-6xl md:text-8xl font-black opacity-5 tracking-tight px-8" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
              <span>SPEAK</span><span className="text-[var(--color-gold)]">&middot;</span>
              <span>TYPE</span><span className="text-[var(--color-gold)]">&middot;</span>
              <span>CREATE</span><span className="text-[var(--color-gold)]">&middot;</span>
              <span>SPEAK</span><span className="text-[var(--color-gold)]">&middot;</span>
              <span>TYPE</span><span className="text-[var(--color-gold)]">&middot;</span>
              <span>CREATE</span><span className="text-[var(--color-gold)]">&middot;</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ANIMATION SHOWCASE ===== */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold-dim)] mb-4 block">Personality</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
                Choose your
                <br />
                <span className="text-[var(--color-gold)]">listening style.</span>
              </h2>
              <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-8">
                Seven unique animations that appear while VoiceInk listens. From the elegant Gold Pulse to the flowing Silk Wave. Each one a small piece of visual poetry that tells you: I'm listening.
              </p>
            </div>
            <div className="flex-1 w-full">
              <AnimationShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-24 px-6 bg-[var(--color-ink-light)]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "0", suffix: "ms", label: "Cloud latency" },
            { num: "0", suffix: "", label: "Internet needed" },
            { num: "99", suffix: "+", label: "Languages" },
            { num: "$19", suffix: "", label: "Lifetime access" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-black text-[var(--color-gold)]" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
                {s.num}<span className="text-2xl text-[var(--color-gold-dim)]">{s.suffix}</span>
              </div>
              <div className="text-xs tracking-[0.15em] uppercase text-[var(--color-muted)] mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,168,76,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Early access banner */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30">
              <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
              <span className="text-[var(--color-gold)] text-sm font-semibold">Early Access: $19 lifetime price. No subscription. Ever.</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-gold-dim)] mb-4 block">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
              Pay once. <span className="text-[var(--color-gold)]">Own forever.</span>
            </h2>
            <p className="text-[var(--color-muted)] text-lg">No subscription fees. No recurring charges. One payment, lifetime updates.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free tier */}
            <div className="p-8 rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-ink)]">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-black mb-6" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>
                $0
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  { text: '10 transcriptions / day', on: true },
                  { text: 'Tiny model (fast)', on: true },
                  { text: 'Auto language detection', on: true },
                  { text: '2 animations', on: true },
                  { text: 'All models (Base, Small)', on: false },
                  { text: 'Custom vocabulary', on: false },
                  { text: 'All 7 animations', on: false },
                ].map((f, i) => (
                  <li key={i} className={`flex items-center gap-3 text-sm ${f.on ? 'text-white/80' : 'text-[var(--color-muted)] line-through'}`}>
                    <Check className={`w-4 h-4 shrink-0 ${f.on ? 'text-green-500' : 'text-[var(--color-subtle)]'}`} />
                    {f.text}
                  </li>
                ))}
              </ul>
              <a href="https://github.com/Nisse-hash/voice-input-button/releases/latest" className="block w-full text-center py-3 rounded-xl border border-[var(--color-subtle)] text-[var(--color-muted)] hover:border-[var(--color-gold-dim)] hover:text-white transition-all font-medium">
                Download Free
              </a>
            </div>

            {/* Pro tier */}
            <div className="p-8 rounded-2xl border-2 border-[var(--color-gold)]/50 bg-[var(--color-ink)] relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[var(--color-gold)] text-[var(--color-ink)] text-xs font-bold rounded-bl-lg">LAUNCH PRICE</div>
              <h3 className="text-xl font-bold mb-1">Pro</h3>
              <p className="text-xs text-[var(--color-gold-dim)] tracking-wide mb-3">Lifetime early access price</p>
              <div className="mb-6">
                <span className="text-4xl font-black text-[var(--color-gold)]" style={{ fontFamily: 'Cabinet Grotesk, Satoshi, sans-serif' }}>$19</span>
                <span className="text-[var(--color-muted)] ml-2 line-through">$29</span>
                <span className="text-sm text-[var(--color-muted)] ml-1">one-time, forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited transcriptions',
                  'All models (Tiny, Base, Small)',
                  'Auto language detection',
                  'All 7 animations',
                  'Custom vocabulary',
                  'Priority updates',
                  'Lifetime access',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 shrink-0 text-[var(--color-gold)]" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="https://biling.ibuiltthis.ai/b/test_6oU28rccW6LLcm83o628800" className="group block w-full text-center py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-gold-bright)] to-[var(--color-gold)] text-[var(--color-ink)] font-bold text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]">
                Get Pro &mdash; $19
              </a>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-[var(--color-muted)]">
            No account needed &middot; No data collection &middot; 100% offline &middot; macOS coming soon
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 px-6 border-t border-[var(--color-subtle)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-gold-bright)] to-[var(--color-gold)] flex items-center justify-center">
              <Mic className="w-4 h-4 text-[var(--color-ink)]" />
            </div>
            <span className="font-bold text-lg">VoiceInk</span>
          </div>
          <p className="text-sm text-[var(--color-muted)]">
            &copy; 2026 Pixel Drift LLC. Your voice, in ink.
          </p>
        </div>
      </footer>
    </main>
  );
}
