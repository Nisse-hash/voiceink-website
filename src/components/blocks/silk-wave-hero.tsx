'use client';

import { useEffect, useRef } from 'react';

export function SilkWaveHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    const WAVE_COUNT = 14;
    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => ({
      amplitude: 30 + Math.random() * 60,
      frequency: 2 + Math.random() * 3,
      phase: (i / WAVE_COUNT) * Math.PI * 2 + Math.random() * 0.5,
      speed: 0.3 + Math.random() * 0.6,
      hue: 38 + i * 2,
      lightness: 40 + i * 3,
      alpha: 0.06 + (i / WAVE_COUNT) * 0.12,
      width: 0.5 + Math.random() * 1.2,
    }));

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      time += 0.008;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const cx = canvas!.width / 2;
      const top = canvas!.height * 0.15;
      const bottom = canvas!.height * 0.85;

      for (const w of waves) {
        ctx!.beginPath();
        ctx!.strokeStyle = `hsla(${w.hue}, 75%, ${w.lightness}%, ${w.alpha})`;
        ctx!.lineWidth = w.width;

        for (let step = 0; step <= 80; step++) {
          const t = step / 80;
          const y = top + t * (bottom - top);
          const envelope = Math.sin(t * Math.PI);

          const wave =
            Math.sin(t * w.frequency * Math.PI + w.phase + time * w.speed) * 0.6 +
            Math.sin(t * w.frequency * 1.8 * Math.PI + w.phase * 0.7 + time * w.speed * 0.8) * 0.3 +
            Math.sin(t * w.frequency * 0.6 * Math.PI + time * w.speed * 1.4) * 0.15;

          const x = cx + wave * w.amplitude * envelope;

          if (step === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }

        ctx!.stroke();
      }

      animFrame = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
