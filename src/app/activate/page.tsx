"use client";

import { motion } from "framer-motion";
import { Rocket, Play, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

export default function ActivatePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                        <Rocket className="w-4 h-4 text-cyan-400" weight="fill" />
                        <span className="text-sm text-cyan-400">Getting Started</span>
                    </div>

                    <h1 className="text-4xl font-light text-white mb-4">
                        How to Use Bernard
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Get Bernard running in 3 simple steps
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="space-y-6 mb-16">
                    {[
                        {
                            title: "Select Your Targets",
                            description: "Choose a city and industry niche from the dropdown menus on the dashboard",
                            icon: "1",
                        },
                        {
                            title: "Choose Your Mode",
                            description: "Click 'Initiate' for a single scan or 'Auto Run' for 5 days of autonomous lead generation",
                            icon: "2",
                        },
                        {
                            title: "Check Your Notion",
                            description: "Leads automatically populate in your Notion database with full details and scores",
                            icon: "3",
                        },
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#111] rounded-2xl border border-neutral-800 p-8 hover:border-cyan-500/30 transition-all"
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                    <p className="text-neutral-400">{step.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* What Bernard Does */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-[#111] to-[#0a1520] rounded-2xl border border-blue-900/30 p-8 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        What Bernard Does Automatically
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Scrapes Google Maps for businesses",
                            "Checks website health & status",
                            "Scores leads as Premium/Hot/Warm/Cool",
                            "Pushes everything to Notion",
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-black/30">
                                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" weight="fill" />
                                <span className="text-neutral-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
                    >
                        <Play className="w-5 h-5" weight="fill" />
                        <span>Go to Dashboard</span>
                    </Link>

                    <Link
                        href="/instructions"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-neutral-800 text-neutral-300 font-medium hover:bg-neutral-700 transition-all"
                    >
                        <span>Full Setup Guide</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
