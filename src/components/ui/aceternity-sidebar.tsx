"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  House,
  Rocket,
  BookOpen,
  Gear,
  SignOut,
  Robot,
  ChartLineUp,
  Database,
  Lightning,
  TelegramLogo,
} from "@phosphor-icons/react";

// Aceternity Sidebar Components
interface SidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
}

function SidebarLink({ link }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === link.href;

  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
        isActive
          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
          : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
      )}
    >
      {link.icon}
      <span className="text-sm font-medium">{link.label}</span>
    </Link>
  );
}

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}

function Sidebar({ open, setOpen, children }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-[#111] border-r border-neutral-800 transition-all duration-300",
        open ? "w-64" : "w-16"
      )}
    >
      {children}
    </div>
  );
}

function SidebarBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {children}
    </div>
  );
}

// Logo Components
export const Logo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-4 px-4 text-sm font-normal text-white"
    >
      <div className="h-8 w-8 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
        <Robot className="w-5 h-5 text-white" weight="duotone" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg tracking-tight"
      >
        Bernard
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center justify-center py-4 px-4 text-sm font-normal text-white"
    >
      <div className="h-8 w-8 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
        <Robot className="w-5 h-5 text-white" weight="duotone" />
      </div>
    </Link>
  );
};

// Main Sidebar Component
export function AceternitySidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const mainNavItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: <House className="h-5 w-5 shrink-0" weight={pathname === "/" ? "fill" : "regular"} />,
    },
    {
      label: "Lead Pipeline",
      href: "/pipeline",
      icon: <ChartLineUp className="h-5 w-5 shrink-0" weight={pathname === "/pipeline" ? "fill" : "regular"} />,
    },
    {
      label: "Automation",
      href: "/automation",
      icon: <Lightning className="h-5 w-5 shrink-0" weight={pathname === "/automation" ? "fill" : "regular"} />,
    },
    {
      label: "Database",
      href: "/database",
      icon: <Database className="h-5 w-5 shrink-0" weight={pathname === "/database" ? "fill" : "regular"} />,
    },
  ];

  const resourceItems = [
    {
      label: "Get Started",
      href: "/instructions",
      icon: <Rocket className="h-5 w-5 shrink-0" weight={pathname === "/instructions" ? "fill" : "regular"} />,
    },
    {
      label: "Operations Guide",
      href: "/operations",
      icon: <BookOpen className="h-5 w-5 shrink-0" weight={pathname === "/operations" ? "fill" : "regular"} />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <Gear className="h-5 w-5 shrink-0" weight={pathname === "/settings" ? "fill" : "regular"} />,
    },
  ];

  return (
    <>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-6">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}

            {/* Navigation Section */}
            <div className="mt-6 px-3">
              <div className="mb-2">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2">
                  Navigation
                </p>
              </div>
              <div className="flex flex-col gap-1">
                {mainNavItems.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="mt-4 px-3">
              <div className="mb-2">
                <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider px-2">
                  Resources
                </p>
              </div>
              <div className="flex flex-col gap-1">
                {resourceItems.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="px-3 pb-4 border-t border-neutral-800 pt-4">
            <div className="flex flex-col gap-1">
              <SidebarLink
                link={{
                  label: "Contact Support",
                  href: "https://t.me/imChadGPT",
                  icon: <TelegramLogo className="h-5 w-5 shrink-0" weight="duotone" />,
                }}
              />
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 transition-all duration-200">
                <SignOut className="h-5 w-5 shrink-0" weight="regular" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-all md:hidden"
      >
        <span className="text-sm">☰</span>
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

