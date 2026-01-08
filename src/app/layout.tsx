import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Header } from "@/components/layout/header";

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
    "Automated lead generation system. Find, score, and organize local business leads automatically.",
  keywords: [
    "lead generation",
    "automation",
    "SMB leads",
    "web scraping",
    "business leads",
  ],
  authors: [{ name: "Bernard AI" }],
  openGraph: {
    title: "Bernard | Autonomous Lead Scraper",
    description:
      "Automated lead generation system. Find, score, and organize local business leads automatically.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
