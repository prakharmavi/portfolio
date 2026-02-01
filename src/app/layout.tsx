import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import CalFloatingButton from "../components/CalFloatingButton";
import PrelineScriptWrapper from "../components/PrelineScriptWrapper";

// Code / accent font (self-hosted via next/font)
const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pmavi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prakhar Mavi — Software Developer",
    template: "%s — Prakhar Mavi",
  },
  description:
    "Software developer building fast, user‑friendly apps with Next.js, React, and modern tooling.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Prakhar Mavi — Software Developer",
    description:
      "Software developer building fast, user‑friendly apps with Next.js, React, and modern tooling.",
    siteName: "prakhar",
    images: [
      {
        url: "/next.svg",
        width: 1200,
        height: 630,
        alt: "Prakhar Mavi — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakhar Mavi — Software Developer",
    description:
      "Software developer building fast, user‑friendly apps with Next.js, React, and modern tooling.",
    images: ["/next.svg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-hs-theme="light" className="scroll-smooth">
      <head>
        {/* Fontshare fonts for Clash Display and Satoshi */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${firaCode.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <CalFloatingButton />
        </Providers>
        <PrelineScriptWrapper />
      </body>
    </html>
  );
}
