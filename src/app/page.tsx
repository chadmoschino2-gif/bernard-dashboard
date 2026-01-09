"use client";

import { useEffect, useState } from "react";
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
  ChartLineUp,
} from "@phosphor-icons/react";
import Link from "next/link";
import { PinContainer } from "@/components/ui/3d-pin";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";

type Run = {
  id: number;
  started_at: string;
  finished_at: string | null;
  city: string;
  state: string;
  niche: string;
  max_leads: number;
  status: string;
  total_leads: number;
};

type Stats = {
  totalLeads: number;
  totalRuns: number;
  latestRun: Run | null;
};

// Swift-like spring animation presets
const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { ...springTransition, delay: 0 } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(6, 182, 212, 0.2)",
      "0 0 40px rgba(6, 182, 212, 0.4)",
      "0 0 20px rgba(6, 182, 212, 0.2)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};


export default function Dashboard() {
  const [isActivating, setIsActivating] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Raleigh");
  const [selectedNiche, setSelectedNiche] = useState("Restaurants");
  const [statusMessage, setStatusMessage] = useState("");
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [recentRuns, setRecentRuns] = useState<Run[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  const cities = ["Miami", "Atlanta", "Chicago", "Raleigh", "Los Angeles"];
  const niches = ["Restaurants", "Gyms", "Salons", "Contractors", "Dentists"];

  // API base URL - overridable in production via NEXT_PUBLIC_API_URL
  const API_URL = 
    process.env.NEXT_PUBLIC_API_URL ?? "https://bernard-scraperg.onrender.com";

  const handleActivate = async () => {
    setIsActivating(true);
    setStatusMessage("Starting single scan...");

    try {
      const res = await fetch(`${API_URL}/api/scan/single`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: selectedCity, niche: selectedNiche }),
      });

      if (res.ok) {
        setStatusMessage("Scraper running! View leads in the Database tab.");
        setIsConnected(true);
        setIsBackendOnline(true);
      } else {
        setStatusMessage("Server not running. Make sure the Bernard API is deployed and reachable.");
        setIsBackendOnline(false);
      }
    } catch {
      setStatusMessage("Cannot reach Bernard API. Start it locally or set NEXT_PUBLIC_API_URL to your deployed server.");
      setIsBackendOnline(false);
    }

    setTimeout(() => setIsActivating(false), 2000);
  };

  const handleAutoRun = async () => {
    setIsAutoRunning(true);
    setStatusMessage("Starting 5-day auto run...");

    try {
      const res = await fetch(`${API_URL}/api/scan/auto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: selectedCity, niche: selectedNiche, days: 5 }),
      });

      if (res.ok) {
        setStatusMessage("5-day autonomous run started! Leads will populate daily.");
        setIsConnected(true);
        setIsBackendOnline(true);
      } else {
        setStatusMessage("Server not running. Make sure the Bernard API is deployed and reachable.");
        setIsBackendOnline(false);
      }
    } catch {
      setStatusMessage("Cannot reach Bernard API. Start it locally or set NEXT_PUBLIC_API_URL to your deployed server.");
      setIsBackendOnline(false);
    }

    setTimeout(() => setIsAutoRunning(false), 2000);
  };

  // Poll backend status/logs while a run is active
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/status`);
        if (!res.ok) {
          setIsBackendOnline(false);
          return;
        }
        const data: { isRunning: boolean; logs: string[] } = await res.json();
        setIsRunning(data.isRunning);
        setLogs(data.logs ?? []);
        setIsBackendOnline(true);
      } catch {
        setIsBackendOnline(false);
      }
    };

    // Initial check
    fetchStatus();

    // Poll every 3s while activating/auto-running or while backend reports running
    if (isActivating || isAutoRunning || isRunning) {
      interval = setInterval(fetchStatus, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [API_URL, isActivating, isAutoRunning, isRunning]);

  // Fetch runs + stats for dashboard cards (non-blocking)
  useEffect(() => {
    let cancelled = false;

    const fetchRunsAndStats = async () => {
      try {
        const [runsRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/api/runs`, { cache: "no-store" }),
          fetch(`${API_URL}/api/stats`, { cache: "no-store" }),
        ]);

        if (!runsRes.ok) throw new Error("Failed to load runs");
        const runsData: { runs: Run[] } = await runsRes.json();
        const statsData: Stats | { error: string } = statsRes.ok
          ? await statsRes.json()
          : { error: "stats unavailable" };

        if (cancelled) return;
        setRecentRuns((runsData.runs ?? []).slice(0, 3));
        if (!("error" in statsData)) setStats(statsData);
      } catch {
        // Ignore: keep placeholders if API is cold
      }
    };

    fetchRunsAndStats();
    const interval = setInterval(fetchRunsAndStats, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [API_URL]);

  const timeAgo = (iso: string) => {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    if (Number.isNaN(diff)) return "—";
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Aceternity Sidebar */}
      <AceternitySidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 ml-16 md:ml-64 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-light text-white tracking-tight">
              Bernard
            </h1>
            <p className="text-neutral-500 text-sm mt-1">
              Autonomous Lead Scraper
            </p>
          </div>
            <div className="flex items-center gap-4">
              {/* Notification bell */}
              <button
                type="button"
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 hover:bg-neutral-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 inline-flex h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-neutral-900" />
              </button>

            <div className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${isConnected
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-neutral-800 text-neutral-400"
              }`}>
              <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-neutral-500"}`} />
              {isConnected ? "Connected" : "Not Connected"}
            </div>
          </div>
        </div>

        {/* Connection / Status strip */}
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-neutral-400">
            {statusMessage && <p>{statusMessage}</p>}
            {isBackendOnline === false && (
              <p className="text-amber-400 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
                Backend offline. Start `npm run server` in <code className="font-mono">bernard-scraper</code> or set{" "}
                <code className="font-mono">NEXT_PUBLIC_API_URL</code> to your deployed API.
              </p>
            )}
            {isBackendOnline && (
              <p className="text-emerald-400 flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Bernard API reachable at <code className="font-mono">{API_URL}</code>
              </p>
            )}
          </div>
          {isRunning && (
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-300">
              <CircleNotch className="w-3 h-3 animate-spin" weight="bold" />
              <span>Scraper is currently running…</span>
            </div>
          )}
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

            {/* Action Cards - Initiate & Auto Run with PinContainer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              id="activate"
            >
              {/* Initiate Single Scan */}
              <PinContainer title="Click to run single scan">
                <button
                  onClick={handleActivate}
                  disabled={isActivating}
                  className="w-full text-left"
                >
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
                </button>
              </PinContainer>

              {/* Auto Run 5-Day Cycle */}
              <PinContainer title="Click to start 5-day cycle">
                <button
                  onClick={handleAutoRun}
                  disabled={isAutoRunning}
                  className="w-full text-left"
                >
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
                </button>
              </PinContainer>
            </motion.div>

            {/* Recent Runs (placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111] rounded-2xl border border-neutral-800 p-6"
            >
              <h2 className="text-lg font-medium text-white mb-4">Recent Runs</h2>
              <div className="space-y-3">
                {(recentRuns.length > 0 ? recentRuns : [
                  { id: 0, city: "Miami", niche: "Restaurants", total_leads: 47, started_at: new Date().toISOString(), state: "", status: "", finished_at: null, max_leads: 0 },
                  { id: 0, city: "Atlanta", niche: "Dentists", total_leads: 32, started_at: new Date(Date.now() - 86400000).toISOString(), state: "", status: "", finished_at: null, max_leads: 0 },
                  { id: 0, city: "Chicago", niche: "Gyms", total_leads: 28, started_at: new Date(Date.now() - 2 * 86400000).toISOString(), state: "", status: "", finished_at: null, max_leads: 0 },
                ] as Run[]).map((run, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400" weight="fill" />
                      </div>
                      <div>
                        <p className="text-sm text-white">{run.city} - {run.niche}</p>
                        <p className="text-xs text-neutral-500">{timeAgo(run.started_at)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-cyan-400">{run.total_leads} leads</p>
                      <p className="text-xs text-neutral-500">Saved to Database</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Notion Connection (backend already handles Notion via environment variables) */}
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
              <div className="bg-[#111] rounded-xl border border-neutral-800 p-4 flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                  <ChartLineUp className="w-4 h-4" weight="bold" />
                </div>
                <div>
                  <p className="text-2xl font-light text-white leading-none">{stats?.totalLeads ?? 0}</p>
                  <p className="text-xs text-neutral-500 mt-1">Total Leads</p>
                </div>
              </div>
              <div className="bg-[#111] rounded-xl border border-neutral-800 p-4 flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                  <Lightning className="w-4 h-4" weight="fill" />
                </div>
                <div>
                  <p className="text-2xl font-light text-cyan-400 leading-none">156</p>
                  <p className="text-xs text-neutral-500 mt-1">Premium</p>
                </div>
              </div>
              <div className="bg-emerald-500/10 rounded-xl border border-emerald-500/20 p-4 flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/25 text-emerald-300">
                  <CircleNotch className="w-4 h-4 animate-spin-slow" weight="bold" />
                </div>
                <div>
                  <p className="text-2xl font-light text-emerald-400 leading-none">89%</p>
                  <p className="text-xs text-emerald-400/70 mt-1">Sync Rate</p>
                </div>
              </div>
              <div className="bg-[#111] rounded-xl border border-neutral-800 p-4 flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800 text-neutral-200">
                  <Globe className="w-4 h-4" weight="fill" />
                </div>
                <div>
                  <p className="text-2xl font-light text-white leading-none">5</p>
                  <p className="text-xs text-neutral-500 mt-1">Cities</p>
                </div>
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
