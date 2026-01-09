"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Gear,
  Bell,
  House,
  Rocket,
  Database,
  Lightning,
  CheckCircle,
  ArrowRight,
  NotionLogo,
  Globe,
  MapPin,
  Storefront,
  TelegramLogo,
  CircleNotch,
  Clock,
  Repeat,
  Calendar,
} from "@phosphor-icons/react";
import Link from "next/link";

// Minimal sidebar icons
const sidebarIcons = [
  { icon: House, label: "Dashboard", href: "/", active: true },
  { icon: Rocket, label: "Activate", href: "#activate" },
  { icon: Database, label: "Database", href: "#" },
  { icon: Gear, label: "Settings", href: "#" },
];

export default function Dashboard() {
  const [isActivating, setIsActivating] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Miami");
  const [selectedNiche, setSelectedNiche] = useState("Restaurants");

  const cities = ["Miami", "Atlanta", "Chicago", "Raleigh", "Los Angeles"];
  const niches = ["Restaurants", "Gyms", "Salons", "Contractors", "Dentists"];

  const handleActivate = () => {
    setIsActivating(true);
    // Simulate activation
    setTimeout(() => {
      setIsActivating(false);
      setIsConnected(true);
    }, 3000);
  };

  const handleAutoRun = () => {
    setIsAutoRunning(true);
    // Simulate 5-day autonomous run setup
    setTimeout(() => {
      setIsAutoRunning(false);
      setIsConnected(true);
    }, 4000);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Minimal Icon Sidebar */}
      <aside className="w-16 bg-[#111] border-r border-neutral-800 flex flex-col items-center py-6 gap-6">
        {/* Logo */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4">
          <Lightning className="w-5 h-5 text-white" weight="fill" />
        </div>

        {/* Nav Icons */}
        <nav className="flex flex-col gap-4 flex-1">
          {sidebarIcons.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${item.active
                ? "bg-cyan-500/20 text-cyan-400"
                : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800"
                }`}
            >
              <item.icon className="w-5 h-5" weight={item.active ? "fill" : "regular"} />
            </Link>
          ))}
        </nav>

        {/* Bottom Icons */}
        <div className="flex flex-col gap-4">
          <a
            href="https://t.me/imChadGPT"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
          >
            <TelegramLogo className="w-5 h-5" weight="duotone" />
          </a>
          <button className="w-10 h-10 rounded-xl flex items-center justify-center text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-all">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-white tracking-tight">
              Bernard
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Autonomous Lead Scraper
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${isConnected
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-neutral-800 text-neutral-400"
              }`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-neutral-500"}`} />
              {isConnected ? "Connected to Notion" : "Not Connected"}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Panel - Left 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Configuration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] rounded-2xl border border-neutral-800 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-white">Configuration</h2>
                <span className="text-xs text-neutral-500">Step 1 of 2</span>
              </div>

              {/* City Selection */}
              <div className="mb-6">
                <label className="text-sm text-neutral-400 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Target City
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCity === city
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                        : "bg-neutral-800/50 text-neutral-400 border border-transparent hover:border-neutral-700"
                        }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Niche Selection */}
              <div>
                <label className="text-sm text-neutral-400 mb-3 flex items-center gap-2">
                  <Storefront className="w-4 h-4" />
                  Industry Niche
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {niches.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => setSelectedNiche(niche)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedNiche === niche
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                        : "bg-neutral-800/50 text-neutral-400 border border-transparent hover:border-neutral-700"
                        }`}
                    >
                      {niche}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Action Cards - Initiate & Auto Run */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              id="activate"
            >
              {/* Initiate Single Scan */}
              <button
                onClick={handleActivate}
                disabled={isActivating}
                className="group relative bg-gradient-to-br from-[#111] to-[#0a1520] rounded-2xl border border-blue-900/30 p-6 text-left hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <Play className="w-6 h-6 text-white" weight="fill" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Initiate</h3>
                      <p className="text-xs text-neutral-500">Single Scan</p>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-400 mb-4">
                    Run a one-time scan for <span className="text-cyan-400">{selectedCity}</span> targeting <span className="text-cyan-400">{selectedNiche}</span>. Perfect for testing.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~5 min
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActivating
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-emerald-500/20 text-emerald-400"
                      }`}>
                      {isActivating ? "Scanning..." : "Ready"}
                    </span>
                  </div>
                </div>
              </button>

              {/* Auto Run 5-Day Cycle */}
              <button
                onClick={handleAutoRun}
                disabled={isAutoRunning}
                className="group relative bg-gradient-to-br from-[#111] to-[#0a1a10] rounded-2xl border border-emerald-900/30 p-6 text-left hover:border-emerald-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Repeat className="w-6 h-6 text-white" weight="bold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Auto Run</h3>
                      <p className="text-xs text-neutral-500">5-Day Cycle</p>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-400 mb-4">
                    Set it and forget it. Bernard runs autonomously for 5 days, collecting leads while you focus on closing.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Daily scans
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${isAutoRunning
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-blue-500/20 text-blue-400"
                      }`}>
                      {isAutoRunning ? "Running..." : "Autonomous"}
                    </span>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Recent Runs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111] rounded-2xl border border-neutral-800 p-6"
            >
              <h2 className="text-lg font-medium text-white mb-4">Recent Runs</h2>
              <div className="space-y-3">
                {[
                  { city: "Miami", niche: "Restaurants", leads: 47, time: "2 hours ago" },
                  { city: "Atlanta", niche: "Dentists", leads: 32, time: "Yesterday" },
                  { city: "Chicago", niche: "Gyms", leads: 28, time: "2 days ago" },
                ].map((run, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400" weight="fill" />
                      </div>
                      <div>
                        <p className="text-sm text-white">{run.city} - {run.niche}</p>
                        <p className="text-xs text-neutral-500">{run.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-cyan-400">{run.leads} leads</p>
                      <p className="text-xs text-neutral-500">Pushed to Notion</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Notion Connection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-[#111] rounded-2xl border border-neutral-800 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center">
                  <NotionLogo className="w-5 h-5 text-white" weight="fill" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Notion</h3>
                  <p className="text-xs text-neutral-500">Output Destination</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-neutral-900/50 border border-neutral-800">
                  <p className="text-xs text-neutral-500 mb-1">Database</p>
                  <p className="text-sm text-white truncate">Bernard Lead Database</p>
                </div>
                <button className="w-full py-2.5 rounded-lg bg-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2">
                  <Gear className="w-4 h-4" />
                  Configure
                </button>
              </div>
            </motion.div>

            {/* Stats Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="bg-[#111] rounded-xl border border-neutral-800 p-4">
                <p className="text-2xl font-light text-white">847</p>
                <p className="text-xs text-neutral-500 mt-1">Total Leads</p>
              </div>
              <div className="bg-[#111] rounded-xl border border-neutral-800 p-4">
                <p className="text-2xl font-light text-cyan-400">156</p>
                <p className="text-xs text-neutral-500 mt-1">Premium</p>
              </div>
              <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/20 p-4">
                <p className="text-2xl font-light text-emerald-400">89%</p>
                <p className="text-xs text-emerald-400/70 mt-1">Sync Rate</p>
              </div>
              <div className="bg-[#111] rounded-xl border border-neutral-800 p-4">
                <p className="text-2xl font-light text-white">5</p>
                <p className="text-xs text-neutral-500 mt-1">Cities</p>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-[#111] rounded-2xl border border-neutral-800 p-6"
            >
              <h3 className="text-white font-medium mb-4">Resources</h3>
              <div className="space-y-2">
                <Link href="/instructions" className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 transition-colors group">
                  <span className="text-sm text-neutral-300">Get Started Guide</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/operations" className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-800 transition-colors group">
                  <span className="text-sm text-neutral-300">Operations Guide</span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
