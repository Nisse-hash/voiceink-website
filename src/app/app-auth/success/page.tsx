'use client';

import { Check } from 'lucide-react';

export default function AppAuthSuccess() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0A0A0F]">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F0B429] to-[#C9A84C] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(201,168,76,0.3)]">
        <Check className="w-8 h-8 text-[#0A0A0F]" strokeWidth={3} />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Signed in!</h1>
      <p className="text-[#999] text-center">This window will close automatically.</p>
    </main>
  );
}
