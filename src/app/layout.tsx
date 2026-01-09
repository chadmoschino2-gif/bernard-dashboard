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

export const metadata: Metadata = {
  title: "Bernard | Autonomous Lead Scraper",
  description:
    "Automated lead generation system. Find, score, and push local business leads to Notion automatically.",
  keywords: [
    "lead generation",
    "automation",
    "SMB leads",
    "web scraping",
    "business leads",
    "notion",
  ],
  authors: [{ name: "Bernard AI" }],
  openGraph: {
    title: "Bernard | Autonomous Lead Scraper",
    description:
      "Automated lead generation system. Find, score, and push local business leads to Notion automatically.",
    type: "website",
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
