import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Bernard | #1 Autonomous Lead Scraper with AI",
  description:
    "Bernard is the #1 autonomous lead scraper with AI-powered filterization. Describe your ideal leads in natural language — rating thresholds, website status, any niche — and get precise, high-quality results instantly.",
  keywords: [
    "lead generation",
    "AI lead scraper",
    "autonomous scraper",
    "lead filtering",
    "business leads",
    "AI filterization",
    "Google Maps scraper",
    "lead generation automation",
  ],
  authors: [{ name: "Bernard AI" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Bernard | #1 Autonomous Lead Scraper with AI",
    description:
      "The most intelligent lead scraper. Use natural language to describe your ideal leads — Bernard's AI understands rating thresholds, website status, and any niche to deliver precise, high-quality results.",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0a]`}
      >
        {children}
      </body>
    </html>
  );
}
