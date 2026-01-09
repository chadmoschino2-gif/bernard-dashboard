"use client";

import { motion } from "framer-motion";
import {
    CheckCircle,
    NotionLogo,
    Lightning,
    Gear,
    Database,
    Play,
    ArrowRight,
    Code,
    Key,
    Link as LinkIcon,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function InstructionsPage() {
    const steps = [
        {
            number: 1,
            title: "Get Your Notion API Key",
            icon: Key,
            description: "Create a Notion integration to connect Bernard to your workspace.",
            substeps: [
                "Go to notion.so/my-integrations",
                "Click 'New Integration'",
                "Name it 'Bernard Lead Scraper'",
                "Copy the API key (starts with 'ntn_')",
            ],
        },
        {
            number: 2,
            title: "Create Your Lead Database",
            icon: Database,
            description: "Set up a Notion database where Bernard will push leads.",
            substeps: [
                "In Notion, create a new page",
                "Type '/database' and select 'Database - Inline'",
                "Name it 'Bernard Lead Database'",
                "Add a Title column called 'Name'",
            ],
        },
        {
            number: 3,
            title: "Share Database with Bernard",
            icon: LinkIcon,
            description: "Give Bernard access to write leads to your database.",
            substeps: [
                "Click the ••• menu on your database",
                "Select 'Add connections'",
                "Choose 'Bernard Lead Scraper'",
                "Copy the database ID from the URL",
            ],
        },
        {
            number: 4,
            title: "Configure Bernard",
            icon: Gear,
            description: "Add your credentials to the scraper configuration.",
            substeps: [
                "Navigate to /bernard-scraper/ folder",
                "Edit .env file",
                "Paste your NOTION_API_KEY",
                "Paste your NOTION_DATABASE_ID",
            ],
        },
        {
            number: 5,
            title: "Run Bernard",
            icon: Play,
            description: "Launch Bernard to start finding and scoring leads.",
            substeps: [
                "Open terminal in /bernard-scraper/",
                "Run: npm start",
                "Watch as leads populate your Notion database",
                "Bernard will auto-create columns as needed",
            ],
        },
    ];

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
                        <Lightning className="w-4 h-4 text-cyan-400" weight="fill" />
                        <span className="text-sm text-cyan-400">Setup Guide</span>
                    </div>

                    <h1 className="text-4xl font-light text-white mb-4">
                        Get Started with Bernard
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                        Complete these 5 steps to activate autonomous lead generation.
                        Takes less than 10 minutes.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="space-y-6 mb-16">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#111] rounded-2xl border border-neutral-800 p-8"
                        >
                            <div className="flex items-start gap-6">
                                {/* Step Number */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                        <step.icon className="w-6 h-6 text-white" weight="duotone" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm font-medium text-cyan-400">
                                            Step {step.number}
                                        </span>
                                        <div className="h-px bg-neutral-800 flex-1" />
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-neutral-400 mb-4">{step.description}</p>

                                    {/* Substeps */}
                                    <ul className="space-y-2">
                                        {step.substeps.map((substep, j) => (
                                            <li key={j} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" weight="fill" />
                                                <span className="text-sm text-neutral-300">{substep}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* What Bernard Creates */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-[#111] to-[#0a1a1a] rounded-2xl border border-cyan-900/30 p-8 mb-16"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <NotionLogo className="w-7 h-7 text-white" weight="fill" />
                        Database Schema
                    </h2>

                    <p className="text-neutral-400 mb-6">
                        Bernard automatically creates these columns in your Notion database:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            "Business Name",
                            "City & State",
                            "Address",
                            "Phone",
                            "Website URL",
                            "Website Status",
                            "Hotness Score",
                            "Lead Score",
                            "Reviews Count",
                            "Star Rating",
                            "Industry",
                            "Niche",
                            "Source",
                            "Outreach Angle",
                            "Notes",
                            "Status",
                        ].map((column, i) => (
                            <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 border border-neutral-800">
                                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                <span className="text-sm text-neutral-300">{column}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-[#111] rounded-2xl border border-neutral-800 p-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Next: Configure Your Scraper
                    </h2>

                    <p className="text-neutral-400 mb-6">
                        Once Bernard is connected to Notion, customize what cities and industries to target.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/operations"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20"
                        >
                            <span>View Operations Guide</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 text-neutral-300 font-medium hover:bg-neutral-700 transition-all"
                        >
                            <span>Back to Dashboard</span>
                        </Link>
                    </div>
                </motion.div>

                {/* Help Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 text-center"
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
        </div>
    );
}
