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

    // Fewer lines, thicker, more spread out = friendlier
    const WAVE_COUNT = 8;
    const waves = Array.from({ length: WAVE_COUNT }, (_, i) => ({
      amplitude: 80 + Math.random() * 160,
      frequency: 1.2 + Math.random() * 2,
      phase: (i / WAVE_COUNT) * Math.PI * 2 + Math.random() * 1.2,
      speed: 0.15 + Math.random() * 0.35,
      hue: 36 + i * 4,
      lightness: 42 + i * 4,
      alpha: 0.08 + (i / WAVE_COUNT) * 0.18,
      width: 1.2 + Math.random() * 2,
    }));

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      time += 0.005;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const cx = canvas!.width / 2;
      const top = canvas!.height * 0.08;
      const bottom = canvas!.height * 0.92;

      // Warm glow at center
      const grd = ctx!.createRadialGradient(cx, canvas!.height / 2, 0, cx, canvas!.height / 2, canvas!.height * 0.4);
      grd.addColorStop(0, 'rgba(201, 168, 76, 0.04)');
      grd.addColorStop(1, 'transparent');
      ctx!.fillStyle = grd;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (const w of waves) {
        ctx!.beginPath();
        ctx!.strokeStyle = `hsla(${w.hue}, 70%, ${w.lightness}%, ${w.alpha})`;
        ctx!.lineWidth = w.width;
        ctx!.lineCap = 'round';
        ctx!.lineJoin = 'round';

        for (let step = 0; step <= 120; step++) {
          const t = step / 120;
          const y = top + t * (bottom - top);

          // Smooth soft envelope (wider belly)
          const envelope = Math.pow(Math.sin(t * Math.PI), 0.5);

          const wave =
            Math.sin(t * w.frequency * Math.PI + w.phase + time * w.speed) * 0.6 +
            Math.sin(t * w.frequency * 1.7 * Math.PI + w.phase * 0.5 + time * w.speed * 0.8) * 0.3 +
            Math.sin(t * w.frequency * 0.4 * Math.PI + time * w.speed * 1.2) * 0.15;

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
      style={{ opacity: 0.85 }}
    />
  );
}
