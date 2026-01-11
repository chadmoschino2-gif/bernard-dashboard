"use client";

import { motion } from "framer-motion";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";
import { StarField } from "@/components/ui/star-field";
import {
    IconBolt,
    IconTarget,
    IconFilter,
    IconDownload,
    IconCheck,
    IconArrowRight,
    IconBrain,
    IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";

export default function InstructionsPage() {
    const steps = [
        {
            number: 1,
            title: "Set Your Target Location",
            icon: IconTarget,
            description: "Enter any city and state combination in the location field.",
            examples: [
                "Miami, FL",
                "Los Angeles, CA",
                "New York, NY",
                "Dallas, TX",
            ],
        },
        {
            number: 2,
            title: "Use AI-Powered Filtering",
            icon: IconBrain,
            description: "Type natural language descriptions of your ideal leads.",
            examples: [
                "Dentists rating > 4.5",
                "Plumbers with no website",
                "Restaurants reviews > 100",
                "Real estate agents",
            ],
        },
        {
            number: 3,
            title: "Launch Your Scan",
            icon: IconBolt,
            description: "Choose between single scan or 5-day automated scraping.",
            examples: [
                "Single Scan - Quick one-time scrape",
                "5-Day Auto - Continuous lead generation",
                "Monitor progress in real-time",
                "Results appear instantly in Leads page",
            ],
        },
        {
            number: 4,
            title: "Export Your Leads",
            icon: IconDownload,
            description: "Download your leads in your preferred format.",
            examples: [
                "Select specific leads with checkboxes",
                "Export as CSV for spreadsheets",
                "Export as PDF for reports",
                "Filter and sort before exporting",
            ],
        },
    ];

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
                            <IconBolt className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm text-cyan-400 font-medium">Complete Guide</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                            Bernard Instructions
                        </h1>
                        <p className="text-lg text-neutral-400 max-w-xl mx-auto">
                            Master the art of autonomous lead generation in minutes.
                        </p>
                    </motion.div>

                    {/* Steps */}
                    <div className="space-y-6 mb-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#0d0d0d] rounded-2xl border border-neutral-800/60 p-6 hover:border-cyan-500/30 transition-all duration-200"
                            >
                                <div className="flex items-start gap-5">
                                    {/* Step Number */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                            <step.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                                                Step {step.number}
                                            </span>
                                            <div className="h-px bg-neutral-800 flex-1" />
                                        </div>

                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-neutral-400 mb-4 text-sm">{step.description}</p>

                                        {/* Examples */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {step.examples.map((example, j) => (
                                                <div key={j} className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/5">
                                                    <IconCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                                                    <span className="text-xs text-neutral-300">{example}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI Filter Examples */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-gradient-to-br from-[#0d0d0d] to-[#0a0a1a] rounded-2xl border border-purple-900/30 p-6 mb-8"
                    >
                        <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
                            <IconSparkles className="w-5 h-5 text-purple-400" />
                            AI Filter Power Examples
                        </h2>

                        <p className="text-neutral-400 mb-4 text-sm">
                            Bernard understands natural language. Try these powerful filters:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                                { query: "Dentists rating > 4.5", result: "High-rated dental practices" },
                                { query: "Plumbers with no website", result: "Businesses needing web presence" },
                                { query: "Restaurants reviews > 100", result: "Popular dining establishments" },
                                { query: "Gyms rating > 4.0", result: "Well-reviewed fitness centers" },
                                { query: "Lawyers", result: "Legal service providers" },
                                { query: "Auto repair", result: "Vehicle service businesses" },
                            ].map((item, i) => (
                                <div key={i} className="p-3 rounded-xl bg-black/40 border border-purple-500/10">
                                    <p className="text-sm font-medium text-purple-400 font-mono mb-1">"{item.query}"</p>
                                    <p className="text-xs text-neutral-500">→ {item.result}</p>
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
                            <span>Start Scanning</span>
                            <IconArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/settings"
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-neutral-800/80 text-neutral-300 font-medium hover:bg-neutral-700 transition-all active:scale-95"
                        >
                            <span>View Settings</span>
                        </Link>
                    </motion.div>

                    {/* Help */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-10 text-center"
                    >
                        <p className="text-neutral-500 text-sm">
                            Need help?{" "}
                            <a
                                href="https://t.me/imChadGPT"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                Contact @imChadGPT on Telegram
                            </a>
                        </p>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
