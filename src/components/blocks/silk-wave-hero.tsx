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

    const WAVE_COUNT = 20;
    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => ({
      amplitude: 40 + Math.random() * 100,
      frequency: 1.5 + Math.random() * 3.5,
      phase: (i / WAVE_COUNT) * Math.PI * 2 + Math.random() * 0.8,
      speed: 0.2 + Math.random() * 0.5,
      hue: 36 + i * 2,
      lightness: 38 + i * 2.5,
      alpha: 0.04 + (i / WAVE_COUNT) * 0.14,
      width: 0.4 + Math.random() * 1.4,
    }));

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      time += 0.006;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const cx = canvas!.width / 2;
      const top = canvas!.height * 0.05;
      const bottom = canvas!.height * 0.95;

      // Subtle glow at center
      const grd = ctx!.createRadialGradient(cx, canvas!.height / 2, 0, cx, canvas!.height / 2, canvas!.height * 0.35);
      grd.addColorStop(0, 'rgba(201, 168, 76, 0.03)');
      grd.addColorStop(1, 'transparent');
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (const w of waves) {
        ctx!.beginPath();
        ctx!.strokeStyle = `hsla(${w.hue}, 75%, ${w.lightness}%, ${w.alpha})`;
        ctx!.lineWidth = w.width;

        for (let step = 0; step <= 100; step++) {
          const t = step / 100;
          const y = top + t * (bottom - top);

          // Sharper losange envelope: more pinched at tips
          const envelope = Math.pow(Math.sin(t * Math.PI), 0.7);

          const wave =
            Math.sin(t * w.frequency * Math.PI + w.phase + time * w.speed) * 0.55 +
            Math.sin(t * w.frequency * 2.1 * Math.PI + w.phase * 0.6 + time * w.speed * 0.7) * 0.28 +
            Math.sin(t * w.frequency * 0.5 * Math.PI + time * w.speed * 1.3) * 0.12 +
            Math.sin(t * w.frequency * 3.3 * Math.PI + w.phase * 1.4 + time * w.speed * 0.4) * 0.08;

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
      style={{ opacity: 0.8 }}
    />
  );
}
