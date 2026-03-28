import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceInk — Your voice, in ink.",
  description: "Press a key, speak, watch your words appear. Offline speech-to-text that works everywhere on your desktop. Free, private, instant.",
  keywords: ["voice typing", "speech to text", "dictation", "whisper", "offline", "desktop app"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://api.fontshare.com" />
          <link href="https://api.fontshare.com/v2/css?f%5B%5D=satoshi@700,400,500,900&display=swap" rel="stylesheet" />
          <link href="https://api.fontshare.com/v2/css?f%5B%5D=cabinet-grotesk@800,700&display=swap" rel="stylesheet" />
        </head>
        <body className="grain-overlay">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
