"use client";

import { motion } from "framer-motion";
import {
    Terminal,
    Gear,
    MapPin,
    Storefront,
    Play,
    Repeat,
    Code,
    FileText,
    FolderOpen,
    Lightning,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function OperationsPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-cyan-400 transition-colors mb-6"
                    >
                        ← Back to Dashboard
                    </Link>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <Terminal className="w-4 h-4 text-emerald-400" weight="fill" />
                        <span className="text-sm text-emerald-400">Operations Guide</span>
                    </div>

                    <h1 className="text-4xl font-light text-white mb-4">
                        Running Bernard
                    </h1>
                    <p className="text-lg text-neutral-400">
                        Complete guide to operating the autonomous lead scraper
                    </p>
                </motion.div>

                {/* Quick Start */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-[#111] to-[#0a1520] rounded-2xl border border-blue-900/30 p-8 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <Lightning className="w-6 h-6 text-cyan-400" weight="fill" />
                        Quick Start
                    </h2>

                    <div className="bg-black/50 rounded-xl p-4 mb-6 font-mono text-sm">
                        <p className="text-neutral-500 mb-2"># Navigate to scraper directory</p>
                        <p className="text-cyan-400">cd /path/to/bernard-scraper</p>
                        <p className="text-neutral-500 mt-4 mb-2"># Run the scraper</p>
                        <p className="text-cyan-400">npm start</p>
                    </div>

                    <p className="text-neutral-400">
                        This will scrape leads using your configured cities and niches, then push them to Notion automatically.
                    </p>
                </motion.div>

                {/* Configuration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#111] rounded-2xl border border-neutral-800 p-8 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <Gear className="w-6 h-6 text-white" weight="duotone" />
                        Configuration
                    </h2>

                    {/* Master Config */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            Master Config
                        </h3>
                        <p className="text-neutral-400 mb-4">
                            Edit <code className="text-cyan-400 bg-neutral-900 px-2 py-1 rounded">config/master.json</code> to control what Bernard scrapes:
                        </p>

                        <div className="bg-black/50 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                            <pre className="text-neutral-300">{`{
  "activeNiches": ["web-design", "payment-processors"],
  "activeCities": ["miami", "atlanta", "raleigh"],
  "runSchedule": "daily",
  "maxLeadsPerCity": 100,
  "outputDestination": "notion"
}`}</pre>
                        </div>
                    </div>

                    {/* Cities */}
                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-emerald-400" />
                            Add New Cities
                        </h3>
                        <p className="text-neutral-400 mb-4">
                            Create a JSON file in <code className="text-cyan-400 bg-neutral-900 px-2 py-1 rounded">config/cities/</code>:
                        </p>

                        <div className="bg-black/50 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                            <pre className="text-neutral-300">{`{
  "cityName": "Miami",
  "state": "Florida",
  "stateCode": "FL",
  "country": "USA",
  "neighborhoods": ["Downtown", "Brickell", "Wynwood"],
  "dataSources": {
    "primary": ["google_maps", "yelp"]
  }
}`}</pre>
                        </div>
                    </div>

                    {/* Niches */}
                    <div>
                        <h3 className="text-lg font-medium text-white mb-3 flex items-center gap-2">
                            <Storefront className="w-5 h-5 text-blue-400" />
                            Add New Niches
                        </h3>
                        <p className="text-neutral-400 mb-4">
                            Create a JSON file in <code className="text-cyan-400 bg-neutral-900 px-2 py-1 rounded">config/niches/</code>:
                        </p>

                        <div className="bg-black/50 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                            <pre className="text-neutral-300">{`{
  "nicheName": "Web Design",
  "targetIndustries": [
    "restaurants", "gyms", "salons", "contractors"
  ],
  "signals": {
    "primary": ["no_website", "broken_website"],
    "secondary": ["active_social", "recent_reviews"]
  },
  "outreachAngle": "Outdated website hurting visibility"
}`}</pre>
                        </div>
                    </div>
                </motion.div>

                {/* Running Modes */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                    {/* Single Scan */}
                    <div className="bg-gradient-to-br from-[#111] to-[#0a1520] rounded-2xl border border-blue-900/30 p-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
                            <Play className="w-6 h-6 text-white" weight="fill" />
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-2">Single Scan</h3>
                        <p className="text-neutral-400 mb-4 text-sm">
                            Run once and stop. Perfect for testing configurations.
                        </p>

                        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
                            <p className="text-cyan-400">npm start</p>
                        </div>
                    </div>

                    {/* Auto Run */}
                    <div className="bg-gradient-to-br from-[#111] to-[#0a1a10] rounded-2xl border border-emerald-900/30 p-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                            <Repeat className="w-6 h-6 text-white" weight="bold" />
                        </div>

                        <h3 className="text-xl font-semibold text-white mb-2">Scheduled Run</h3>
                        <p className="text-neutral-400 mb-4 text-sm">
                            Set up a daily cron job for autonomous operation.
                        </p>

                        <div className="bg-black/50 rounded-lg p-3 font-mono text-xs">
                            <p className="text-neutral-500"># Run daily at 3 AM</p>
                            <p className="text-cyan-400">0 3 * * * npm start</p>
                        </div>
                    </div>
                </motion.div>

                {/* What Bernard Does */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[#111] rounded-2xl border border-neutral-800 p-8 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        What Happens When Bernard Runs
                    </h2>

                    <div className="space-y-6">
                        {[
                            {
                                step: 1,
                                title: "Scrape Google Maps",
                                description: "Searches for businesses in your target cities and industries",
                                time: "~2-3 min per city",
                            },
                            {
                                step: 2,
                                title: "Website Validation",
                                description: "Checks each business website to detect broken, placeholder, or outdated sites",
                                time: "~5-10 seconds per lead",
                            },
                            {
                                step: 3,
                                title: "Lead Scoring",
                                description: "Ranks leads as Premium, Hot, Warm, or Cool based on signals",
                                time: "Instant",
                            },
                            {
                                step: 4,
                                title: "Push to Notion",
                                description: "Sends all validated and scored leads to your Notion database",
                                time: "~1 second per lead",
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

                {/* File Structure */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#111] rounded-2xl border border-neutral-800 p-8 mb-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <FolderOpen className="w-6 h-6 text-white" weight="duotone" />
                        Project Structure
                    </h2>

                    <div className="bg-black/50 rounded-xl p-4 font-mono text-sm">
                        <pre className="text-neutral-300">{`bernard-scraper/
├── config/
│   ├── master.json              # Main configuration
│   ├── cities/                  # City configs
│   │   ├── miami.json
│   │   └── raleigh.json
│   └── niches/                  # Niche configs
│       ├── web-design.json
│       └── payment-processors.json
├── scrapers/
│   ├── google-maps.js           # Google Maps scraper
│   └── website-checker.js       # Website validator
├── scoring/
│   └── triage.js                # Lead scoring engine
├── output/
│   └── notion-writer.js         # Notion integration
├── main.js                      # Entry point
└── .env                         # Your credentials`}</pre>
                    </div>
                </motion.div>

                {/* Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-[#111] to-[#0a1a1a] rounded-2xl border border-cyan-900/30 p-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Pro Tips
                    </h2>

                    <ul className="space-y-3">
                        {[
                            "Start with 1-2 cities to test your configuration",
                            "Premium leads (no website + high reviews) close fastest",
                            "Run during off-peak hours (2-5 AM) to avoid rate limits",
                            "Check Notion daily - fresh leads go stale quickly",
                            "Customize outreach angles per niche in config files",
                        ].map((tip, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs text-cyan-400">✓</span>
                                </div>
                                <span className="text-neutral-300">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
