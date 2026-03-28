'use client';

import { useState, useEffect, useRef } from 'react';

const ANIMATIONS = [
  { id: 'gold-pulse', name: 'Gold Pulse' },
  { id: 'waveform', name: 'Waveform' },
  { id: 'ripple', name: 'Ripple' },
  { id: 'minimal', name: 'Minimal' },
  { id: 'neon-ring', name: 'Neon Ring' },
  { id: 'spin', name: 'Spin' },
  { id: 'silk-wave', name: 'Silk Wave' },
];

export function AnimationShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(a => (a + 1) % ANIMATIONS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Preview circle */}
      <div className="w-40 h-40 rounded-full bg-[var(--color-ink)] border border-[var(--color-subtle)] flex items-center justify-center relative overflow-hidden">
        <AnimationPreview id={ANIMATIONS[active].id} />
      </div>

      {/* Name */}
      <p className="text-lg font-bold text-[var(--color-gold)]">{ANIMATIONS[active].name}</p>

      {/* Selector dots */}
      <div className="flex gap-3">
        {ANIMATIONS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => setActive(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active ? 'bg-[var(--color-gold)] scale-125' : 'bg-[var(--color-subtle)] hover:bg-[var(--color-muted)]'}`}
          />
        ))}
      </div>
    </div>
  );
}

function AnimationPreview({ id }: { id: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (id !== 'silk-wave') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;
    const waves = Array.from({ length: 8 }, (_, i) => ({
      amp: 8 + Math.random() * 16,
      freq: 2 + Math.random() * 3,
      phase: (i / 8) * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.2,
      alpha: 0.2 + (i / 8) * 0.5,
      hue: 38 + i * 3,
    }));

    function draw() {
      time += 0.016;
      ctx!.clearRect(0, 0, 120, 120);
      for (const w of waves) {
        ctx!.beginPath();
        ctx!.strokeStyle = `hsla(${w.hue}, 75%, 50%, ${w.alpha})`;
        ctx!.lineWidth = 0.8;
        for (let s = 0; s <= 40; s++) {
          const t = s / 40;
          const y = 10 + t * 100;
          const env = Math.sin(t * Math.PI);
          const wave = Math.sin(t * w.freq * Math.PI + w.phase + time * w.speed) * 0.7 + Math.sin(t * w.freq * 1.8 * Math.PI + time * w.speed * 0.8) * 0.3;
          const x = 60 + wave * w.amp * env;
          s === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        ctx!.stroke();
      }
      animFrame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animFrame);
  }, [id]);

  if (id === 'silk-wave') {
    return <canvas ref={canvasRef} width={120} height={120} className="w-full h-full" />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {id === 'gold-pulse' && <GoldPulse />}
      {id === 'waveform' && <WaveformAnim />}
      {id === 'ripple' && <RippleAnim />}
      {id === 'minimal' && <MinimalAnim />}
      {id === 'neon-ring' && <NeonRingAnim />}
      {id === 'spin' && <SpinAnim />}
    </div>
  );
}

function GoldPulse() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {[0, 0.5, 1].map((delay, i) => (
        <div key={i} className="absolute w-16 h-16 rounded-full border-2 border-[var(--color-gold)]/50" style={{ animation: `pulse-gold-ring 1.5s ease-in-out infinite ${delay}s` }} />
      ))}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-gold-bright)] to-[var(--color-gold)] z-10" style={{ animation: 'breathe 2s ease-in-out infinite' }} />
      <style jsx>{`
        @keyframes pulse-gold-ring { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      `}</style>
    </div>
  );
}

function WaveformAnim() {
  return (
    <div className="flex items-center gap-1">
      {[16, 28, 40, 32, 44, 28, 16].map((h, i) => (
        <div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-[var(--color-gold)] to-[var(--color-gold-bright)]" style={{ height: h, animation: `wf-bar 1.2s ease-in-out infinite ${i * 0.1}s` }} />
      ))}
      <style jsx>{`
        @keyframes wf-bar { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
      `}</style>
    </div>
  );
}

function RippleAnim() {
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      {[0, 0.5, 1, 1.5].map((delay, i) => (
        <div key={i} className="absolute w-4 h-4 rounded-full border border-[var(--color-gold)]" style={{ animation: `ripple-expand 2s ease-out infinite ${delay}s` }} />
      ))}
      <div className="w-4 h-4 rounded-full bg-[var(--color-gold)] z-10" />
      <style jsx>{`
        @keyframes ripple-expand { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(5); opacity: 0; } }
      `}</style>
    </div>
  );
}

function MinimalAnim() {
  return (
    <div className="w-6 h-6 rounded-full bg-red-500 shadow-[0_0_15px_rgba(229,62,62,0.6)]" style={{ animation: 'minimal-pulse 1.5s ease-in-out infinite' }}>
      <style jsx>{`
        @keyframes minimal-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); box-shadow: 0 0 30px rgba(229,62,62,0.4); } }
      `}</style>
    </div>
  );
}

function NeonRingAnim() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <div className="absolute w-14 h-14 rounded-full border-[3px] border-transparent border-t-cyan-400 border-r-[var(--color-gold)]" style={{ animation: 'neon-spin 1s linear infinite', boxShadow: '0 0 15px rgba(0,240,255,0.3)' }} />
      <div className="absolute w-10 h-10 rounded-full border-2 border-transparent border-b-[var(--color-gold)] border-l-cyan-400" style={{ animation: 'neon-spin 0.7s linear infinite reverse' }} />
      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
      <style jsx>{`
        @keyframes neon-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function SpinAnim() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center" style={{ animation: 'spin-gentle 4s linear infinite' }}>
      <div className="flex items-center gap-1">
        {[10, 18, 24, 18, 10].map((h, i) => (
          <div key={i} className="w-1 rounded-full bg-gradient-to-t from-[var(--color-gold)] to-[var(--color-gold-bright)]" style={{ height: h, animation: `wf-bar2 1.2s ease-in-out infinite ${i * 0.1}s` }} />
        ))}
      </div>
      <style jsx>{`
        @keyframes spin-gentle { to { transform: rotate(360deg); } }
        @keyframes wf-bar2 { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1); } }
      `}</style>
    </div>
  );
}
