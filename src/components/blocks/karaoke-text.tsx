'use client';

import { useState, useEffect, useRef } from 'react';

const WORDS = 'Press a key. Speak. Watch your words appear in any text field, any app, instantly.'.split(' ');

export function KaraokeText() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [cycle, setCycle] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial delay before starting
    const startDelay = setTimeout(() => {
      let i = 0;
      intervalRef.current = setInterval(() => {
        setActiveIndex(i);
        i++;
        if (i >= WORDS.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          // Pause, then restart
          setTimeout(() => {
            setActiveIndex(-1);
            setTimeout(() => setCycle(c => c + 1), 800);
          }, 2000);
        }
      }, 180);
    }, 1500);

    return () => {
      clearTimeout(startDelay);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cycle]);

  return (
    <p className="animate-fade-in-up animate-delay-3 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed text-center">
      {WORDS.map((word, i) => (
        <span key={`${cycle}-${i}`}>
          <span
            className="inline-block transition-all duration-300"
            style={{
              color: i <= activeIndex
                ? '#F0B429'
                : 'rgba(255,255,255,0.35)',
              textShadow: i === activeIndex
                ? '0 0 20px rgba(240,180,41,0.8), 0 0 40px rgba(240,180,41,0.4), 0 0 60px rgba(201,168,76,0.2)'
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
