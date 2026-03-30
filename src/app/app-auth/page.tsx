'use client';

import { useAuth, useUser, SignIn } from '@clerk/nextjs';
import { useEffect } from 'react';
import { Mic } from 'lucide-react';

export default function AppAuthPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  // When signed in, redirect to success URL that the Electron app detects
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const email = user.emailAddresses[0]?.emailAddress || '';
      const name = user.firstName || '';
      const image = user.imageUrl || '';
      // Redirect to a URL the Electron BrowserWindow can detect
      window.location.href = `/app-auth/success?userId=${user.id}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&image=${encodeURIComponent(image)}`;
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-muted)]">Loading...</div>
      </main>
    );
  }

  if (isSignedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-gold)]">Signing you in...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#0A0A0F]">
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F0B429] to-[#C9A84C] flex items-center justify-center">
          <Mic className="w-4 h-4 text-[#0A0A0F]" />
        </div>
        <span className="font-bold text-lg text-white">VoiceInk</span>
      </div>
      <SignIn
        forceRedirectUrl="/app-auth"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-[#13131A] border border-[#2a2a35]",
          },
        }}
      />
    </main>
  );
}
