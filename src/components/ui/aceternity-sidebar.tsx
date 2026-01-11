"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconGauge,
  IconStack2,
  IconAdjustments,
  IconBrandOpenai,
  IconMenu2,
  IconX,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandDiscord,
  IconBrandYoutube,
} from "@tabler/icons-react";

const navItems = [
  { label: "Dashboard", href: "/", icon: IconGauge },
  { label: "YouTube Scraper", href: "/youtube-scraper", icon: IconBrandYoutube },
  { label: "Leads", href: "/database", icon: IconStack2 },
  { label: "Settings", href: "/settings", icon: IconAdjustments },
];

export function AceternitySidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, isMobile]);

  return (
    <>
      {/* Mobile Toggle Button - Perfectly Aligned */}
      {/* Mobile Toggle Button - Vanishes when open */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            className="fixed top-5 left-5 z-[60] md:hidden w-12 h-12 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-lg active:scale-95 touch-manipulation"
            aria-label="Open menu"
          >
            <IconMenu2 className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[49] md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={{
          open: { x: 0, width: isMobile ? 280 : 260 },
          closed: { x: isMobile ? -280 : 0, width: isMobile ? 280 : 72 }
        }}
        transition={{
          type: "tween",
          ease: "circOut", // Super snappy
          duration: 0.2
        }}
        className={cn(
          "fixed inset-y-0 left-0 z-[50] flex flex-col bg-black border-r border-white/10 overflow-hidden",
          // On mobile, start off-screen
          !isMobile ? "translate-x-0" : ""
        )}
        onMouseEnter={() => !isMobile && setOpen(true)}
        onMouseLeave={() => !isMobile && setOpen(false)}
      >
        {/* Header / Logo Area */}
        {/* Header / Logo Area with Internal Close Button */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-white/5 bg-black/50 shrink-0">
          <Link href="/" className="flex items-center gap-3 overflow-hidden" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Bernard" className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
            </div>
            <motion.div
              variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -10 } }}
              transition={{ duration: 0.2 }}
              className="flex flex-col whitespace-nowrap"
            >
              <span className="text-white font-bold text-lg leading-none">Bernard</span>
              <span className="text-[10px] text-neutral-500 font-medium tracking-widest uppercase mt-0.5">Scraper AI</span>
            </motion.div>
          </Link>

          {/* Mobile Internal Close Button */}
          {isMobile && (
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-none">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg group relative transition-colors duration-150",
                  isActive ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"
                )}
              >
                {/* Active Border Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                )}

                <Icon className={cn("w-5 h-5 shrink-0 transition-colors duration-150", isActive ? "text-cyan-400" : "group-hover:text-white")} />

                <motion.span
                  variants={{ open: { opacity: 1, x: 0, display: "block" }, closed: { opacity: 0, x: -10, display: "none" } }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Status */}
        <div className="p-3 border-t border-white/5 bg-black/50 shrink-0 space-y-2">
          {/* Feedback Message - Only fade, no height change */}
          <motion.p
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 }
            }}
            transition={{ duration: 0.15 }}
            className="text-[10px] text-neutral-500 text-center leading-relaxed px-2 mb-2"
            style={{ display: open ? 'block' : 'none' }}
          >
            Need help? Have ideas? Reach out below for feature requests & feedback!
          </motion.p>

          {/* Social Links - Icons always visible, just fade */}
          <div className="flex items-center justify-center gap-5 py-1">
            <a
              href="https://instagram.com/oneFlyassnerd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1306C] hover:text-[#E1306C] hover:scale-110 transition-transform duration-200 hover:drop-shadow-[0_0_10px_rgba(225,48,108,0.6)]"
            >
              <IconBrandInstagram size={22} stroke={2} />
            </a>
            <a
              href="https://t.me/imChadGPT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2AABEE] hover:text-[#2AABEE] hover:scale-110 transition-transform duration-200 hover:drop-shadow-[0_0_10px_rgba(42,171,238,0.6)]"
            >
              <IconBrandTelegram size={22} stroke={2} />
            </a>
            <div className="group relative flex items-center">
              <a
                href="https://discord.gg/realchadmoschino"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5865F2] hover:text-[#5865F2] hover:scale-110 transition-transform duration-200 hover:drop-shadow-[0_0_10px_rgba(88,101,242,0.6)]"
              >
                <IconBrandDiscord size={22} stroke={2} />
              </a>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-medium bg-[#5865F2] border border-white/10 rounded-md text-white opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(88,101,242,0.4)]">
                realchadmoschino
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/5 overflow-hidden">
            <div className="relative shrink-0 w-2 h-2">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-emerald-500 rounded-full" />
            </div>
            <motion.div
              variants={{ open: { opacity: 1, width: "auto" }, closed: { opacity: 0, width: 0 } }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-xs font-medium text-neutral-300">System Active</span>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
