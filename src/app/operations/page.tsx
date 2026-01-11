"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";
import { StarField } from "@/components/ui/star-field";
import { BorderMagicButton } from "@/components/ui/border-magic-button";
import {
    IconTerminal,
    IconSettings,
    IconMapPin,
    IconBuildingStore,
    IconPlayerPlay,
    IconRepeat,
    IconFolder,
    IconBolt,
    IconArrowRight,
    IconCheck,
    IconLoader2,
    IconDatabase,
    IconClock,
} from "@tabler/icons-react";
import Link from "next/link";

export default function OperationsPage() {
    const [stats, setStats] = useState({ totalLeads: 0, totalRuns: 0, isRunning: false });
    const [isLoading, setIsLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

    const fetchStats = useCallback(async () => {
        try {
            const [statusRes, statsRes] = await Promise.all([
                fetch(`${API_URL}/api/status`).catch(() => null),
                fetch(`${API_URL}/api/stats`).catch(() => null),
            ]);

            if (statusRes?.ok) {
                const data = await statusRes.json();
                setStats(prev => ({ ...prev, isRunning: data.isRunning }));
            }

            if (statsRes?.ok) {
                const data = await statsRes.json();
                setStats(prev => ({
                    ...prev,
                    totalLeads: data.totalLeads || 0,
                    totalRuns: data.totalRuns || 0
                }));
            }
        } catch {
            // Silent fail
        }
        setIsLoading(false);
    }, [API_URL]);

    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 5000);
        return () => clearInterval(interval);
    }, [fetchStats]);

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] relative">
            <StarField />
            <AceternitySidebar />

            <main className="flex-1 p-6 md:p-12 ml-0 md:ml-[72px] pt-20 md:pt-12 overflow-x-hidden relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-cyan-400 transition-colors mb-6"
                    >
                        ← Back to Dashboard
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                            <IconTerminal className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-emerald-400 font-medium">Operations Center</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            Running Bernard
                        </h1>
                        <p className="text-lg text-neutral-400">
                            Monitor operations and understand the scraping workflow
                        </p>
                    </motion.div>

                    {/* Live Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-3 gap-4 mb-10"
                    >
                        <div className="bg-[#0d0d0d] rounded-2xl border border-neutral-800/60 p-5 text-center">
                            <IconDatabase className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">
                                {isLoading ? <IconLoader2 className="w-5 h-5 animate-spin mx-auto" /> : stats.totalLeads}
                            </p>
                            <p className="text-xs text-neutral-500">Total Leads</p>
                        </div>
                        <div className="bg-[#0d0d0d] rounded-2xl border border-neutral-800/60 p-5 text-center">
                            <IconClock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-white">
                                {isLoading ? <IconLoader2 className="w-5 h-5 animate-spin mx-auto" /> : stats.totalRuns}
                            </p>
                            <p className="text-xs text-neutral-500">Total Scans</p>
                        </div>
                        <div className="bg-[#0d0d0d] rounded-2xl border border-neutral-800/60 p-5 text-center">
                            <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${stats.isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
                            <p className="text-lg font-bold text-white">{stats.isRunning ? 'Active' : 'Idle'}</p>
                            <p className="text-xs text-neutral-500">Status</p>
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-gradient-to-br from-[#0d0d0d] to-[#0a1520] rounded-2xl border border-blue-900/30 p-6 mb-8"
                    >
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <IconBolt className="w-5 h-5 text-cyan-400" />
                            Quick Actions
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            <Link href="/">
                                <BorderMagicButton>
                                    <IconPlayerPlay className="w-4 h-4" />
                                    Start New Scan
                                </BorderMagicButton>
                            </Link>
                            <Link href="/database">
                                <BorderMagicButton>
                                    <IconDatabase className="w-4 h-4" />
                                    View Leads
                                </BorderMagicButton>
                            </Link>
                            <Link href="/settings">
                                <BorderMagicButton>
                                    <IconSettings className="w-4 h-4" />
                                    Settings
                                </BorderMagicButton>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Running Modes */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                    >
                        {/* Single Scan */}
                        <div className="bg-gradient-to-br from-[#0d0d0d] to-[#0a1520] rounded-2xl border border-blue-900/30 p-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                                <IconPlayerPlay className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2">Single Scan</h3>
                            <p className="text-neutral-400 mb-4 text-sm">
                                Run once and get immediate results. Perfect for testing or quick lead grabs.
                            </p>

                            <ul className="space-y-2">
                                {["Instant results", "One location at a time", "Full control"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                                        <IconCheck className="w-4 h-4 text-cyan-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Auto Run */}
                        <div className="bg-gradient-to-br from-[#0d0d0d] to-[#0a1a10] rounded-2xl border border-emerald-900/30 p-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                                <IconRepeat className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2">5-Day Auto Run</h3>
                            <p className="text-neutral-400 mb-4 text-sm">
                                Set it and forget it. Bernard runs automatically for 5 consecutive days.
                            </p>

                            <ul className="space-y-2">
                                {["Hands-free operation", "Scheduled scraping", "Maximum lead volume"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                                        <IconCheck className="w-4 h-4 text-emerald-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* What Happens */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#0d0d0d] rounded-2xl border border-neutral-800/60 p-6 mb-8"
                    >
                        <h2 className="text-xl font-semibold text-white mb-6">
                            What Happens When Bernard Runs
                        </h2>

                        <div className="space-y-5">
                            {[
                                {
                                    step: 1,
                                    title: "Scrape Google Maps",
                                    description: "Searches for businesses in your target location and niche",
                                    time: "~2-3 min",
                                },
                                {
                                    step: 2,
                                    title: "Extract Business Data",
                                    description: "Pulls name, phone, email, address, ratings, and reviews",
                                    time: "~5 sec/lead",
                                },
                                {
                                    step: 3,
                                    title: "AI Filtering",
                                    description: "Applies your natural language filters to qualify leads",
                                    time: "Instant",
                                },
                                {
                                    step: 4,
                                    title: "Save to Database",
                                    description: "Stores validated leads for export and viewing",
                                    time: "Instant",
                                },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                                        <span className="text-sm font-medium text-cyan-400">{item.step}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                                        <p className="text-sm text-neutral-400 mb-1">{item.description}</p>
                                        <p className="text-xs text-neutral-500">⏱️ {item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Pro Tips */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-[#0d0d0d] to-[#0a1a1a] rounded-2xl border border-cyan-900/30 p-6"
                    >
                        <h2 className="text-xl font-semibold text-white mb-5">
                            Pro Tips
                        </h2>

                        <ul className="space-y-3">
                            {[
                                "Use specific filters like 'rating > 4.5' for higher quality leads",
                                "Export leads quickly - fresh data converts better",
                                "Try different niches in the same city for variety",
                                "Use 'no website' filter to find businesses needing web services",
                                "Select individual leads to export only what you need",
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs text-cyan-400">✓</span>
                                    </div>
                                    <span className="text-neutral-300 text-sm">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
