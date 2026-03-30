import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoiceInk — Your voice, in ink.",
  description: "Press a key, speak, watch your words appear. Offline speech-to-text that works everywhere on your desktop. Free, private, instant.",
  keywords: ["voice typing", "speech to text", "dictation", "whisper", "offline", "desktop app"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "VoiceInk — Your voice, in ink.",
    description: "Press a key, speak, watch your words appear. Offline speech-to-text for Mac and Windows.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    siteName: "VoiceInk",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceInk — Your voice, in ink.",
    description: "Press a key, speak, watch your words appear. Offline speech-to-text for Mac and Windows.",
    images: ["/og-image.jpg"],
  },
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
