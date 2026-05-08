import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/provider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vibify | Real-Time Social Music Rooms",
  description:
    "Vibify is a real-time social music platform where users can create rooms, join friends, stream music together, and control the vibe collaboratively.",

  keywords: [
    "Vibify",
    "music room app",
    "real-time music streaming",
    "social music platform",
    "listen together",
    "collaborative playlist",
    "music sharing app",
    "Next.js music app",
    "group listening",
    "online music rooms",
  ],

  authors: [{ name: "Jay Bhende" }],

  creator: "Jay Bhende",

  openGraph: {
    title: "Vibify | Real-Time Social Music Rooms",
    description:
      "Create rooms, stream music with friends, and experience collaborative listening in real time with Vibify.",
    url: "https://vibify.vercel.app",
    siteName: "Vibify",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibify Music Rooms",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vibify | Real-Time Social Music Rooms",
    description:
      "Join live music rooms, vibe with friends, and stream together in real time.",
    images: ["/og-image.png"],
  },

  metadataBase: new URL("https://vibify.vercel.app"),

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="">
        <Providers>
{children}
        </Providers>
        </body>
    </html>
  );
}
