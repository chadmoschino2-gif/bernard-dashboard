"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";
import { StarField } from "@/components/ui/star-field";
import {
    IconRocket,
    IconPlayerPlay,
    IconCheck,
    IconArrowRight,
    IconSparkles,
    IconDatabase,
    IconWorld,
    IconBrain,
} from "@tabler/icons-react";
import Link from "next/link";

export default function ActivatePage() {
    const [stats, setStats] = useState({ totalLeads: 0, isRunning: false });

    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/api/status`);
            if (res.ok) {
                const data = await res.json();
                setStats({ totalLeads: data.leadsCount || 0, isRunning: data.isRunning });
            }
        } catch {
            // Silent fail
        }
    }, [API_URL]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] relative">
            <StarField />
            <AceternitySidebar />

            <main className="flex-1 p-6 md:p-12 ml-0 md:ml-[72px] pt-20 md:pt-12 overflow-x-hidden relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                            <IconRocket className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-cyan-400 font-medium">Quick Start</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            How to Use Bernard
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
                            Get started in 3 simple steps. No complex setup required.
                        </p>
                    </motion.div>

                    {/* Live Stats Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-10 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/10"
                    >
                        <div className="flex items-center justify-center gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">{stats.totalLeads}</p>
                                <p className="text-xs text-neutral-500">Leads Generated</p>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="text-center">
                                <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${stats.isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
                                <p className="text-xs text-neutral-500">{stats.isRunning ? 'Running' : 'Idle'}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Steps */}
                    <div className="space-y-4 mb-12">
                        {[
                            {
                                step: 1,
                                title: "Enter Your Location",
                                description: "Type any city and state (e.g., 'Miami, FL') in the location field on the dashboard.",
                                icon: IconWorld,
                                color: "cyan",
                            },
                            {
                                step: 2,
                                title: "Describe Your Ideal Lead",
                                description: "Use natural language like 'Dentists rating > 4.5' or 'Restaurants with no website' in the AI Filter.",
                                icon: IconBrain,
                                color: "purple",
                            },
                            {
                                step: 3,
                                title: "Launch & Export",
                                description: "Click 'Single Scan' to start. View leads in the Leads page and export as CSV or PDF.",
                                icon: IconDatabase,
                                color: "emerald",
                            },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="bg-[#0d0d0d] rounded-2xl border border-neutral-800/60 p-6 hover:border-cyan-500/30 transition-all duration-200 group"
                            >
                                <div className="flex items-start gap-5">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color === 'cyan' ? 'from-cyan-500 to-blue-600' :
                                            step.color === 'purple' ? 'from-purple-500 to-pink-600' :
                                                'from-emerald-500 to-cyan-600'
                                        } flex items-center justify-center shadow-lg`}>
                                        <step.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Step {step.step}</span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-cyan-400 transition-colors">{step.title}</h3>
                                        <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* What Bernard Does */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-[#0d0d0d] to-[#0a1520] rounded-2xl border border-blue-900/30 p-6 mb-8"
                    >
                        <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                            <IconSparkles className="w-5 h-5 text-cyan-400" />
                            What Bernard Extracts Automatically
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                "Business Name",
                                "Phone Number",
                                "Email Address",
                                "Star Rating",
                                "Review Count",
                                "Website Status",
                                "Full Address",
                                "Google Maps URL",
                                "Social Links",
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-black/40 border border-white/5">
                                    <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span className="text-sm text-neutral-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                        >
                            <IconPlayerPlay className="w-5 h-5" />
                            <span>Go to Dashboard</span>
                        </Link>

                        <Link
                            href="/database"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-800/80 text-neutral-300 font-medium hover:bg-neutral-700 transition-all active:scale-95"
                        >
                            <span>View Leads</span>
                            <IconArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
