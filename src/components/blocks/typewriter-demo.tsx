'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

const DEMO_PHRASES = [
  { lang: "EN", text: "Send the proposal to the client by end of day and schedule a follow-up call for next Tuesday." },
  { lang: "FR", text: "Envoie le devis au client avant ce soir et programme un appel de suivi pour mardi prochain." },
  { lang: "ES", text: "Enviar la propuesta al cliente antes del final del dia y programar una llamada de seguimiento para el martes." },
  { lang: "DE", text: "Schicken Sie den Vorschlag bis Ende des Tages an den Kunden und planen Sie einen Folgeanruf fur nachsten Dienstag." },
];

export function TypewriterDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cursorBlink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    // Auto-cycle through phrases
    const cycle = () => {
      setIsRecording(true);
      setDisplayedText('');

      const phrase = DEMO_PHRASES[currentPhrase % DEMO_PHRASES.length];
      let charIndex = 0;

      intervalRef.current = setInterval(() => {
        if (charIndex < phrase.text.length) {
          setDisplayedText(phrase.text.slice(0, charIndex + 1));
          charIndex++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(() => {
            setIsRecording(false);
            setTimeout(() => {
              setCurrentPhrase(p => p + 1);
            }, 2000);
          }, 500);
        }
      }, 35);
    };

    const timeout = setTimeout(cycle, 1000);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentPhrase]);

  const phrase = DEMO_PHRASES[currentPhrase % DEMO_PHRASES.length];

  return (
    <div className="relative">
      {/* Mock window */}
      <div className="rounded-2xl border border-[var(--color-subtle)] bg-[var(--color-ink)] overflow-hidden shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-ink-lighter)] border-b border-[var(--color-subtle)]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-[var(--color-muted)] ml-2">Document.txt</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-[10px] tracking-wider uppercase text-[var(--color-gold-dim)]">{phrase.lang}</span>
            {isRecording ? (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--color-gold)]/10 border border-[var(--color-gold)]/30">
                <Mic className="w-3 h-3 text-[var(--color-gold)] animate-pulse" />
                <span className="text-[10px] text-[var(--color-gold)]">Listening</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5">
                <MicOff className="w-3 h-3 text-[var(--color-muted)]" />
                <span className="text-[10px] text-[var(--color-muted)]">Idle</span>
              </div>
            )}
          </div>
        </div>

        {/* Editor area */}
        <div className="p-8 min-h-[160px] font-mono text-base md:text-lg leading-relaxed">
          <span className="text-white/90">{displayedText}</span>
          <span className={`inline-block w-0.5 h-5 bg-[var(--color-gold)] ml-0.5 align-middle transition-opacity ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>

      {/* Floating hotkey badge */}
      <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isRecording ? 'bg-[var(--color-gold)]/20 border border-[var(--color-gold)]/40 scale-105' : 'bg-[var(--color-ink-lighter)] border border-[var(--color-subtle)]'}`}>
        <kbd className={`text-sm font-bold ${isRecording ? 'text-[var(--color-gold)]' : 'text-[var(--color-muted)]'}`}>Alt + A</kbd>
      </div>
    </div>
  );
}
