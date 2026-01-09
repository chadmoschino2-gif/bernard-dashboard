"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Gear,
    MapPin,
    Storefront,
    Hash,
    ArrowClockwise,
    Check,
    Play,
    Trash,
    Lightning,
} from "@phosphor-icons/react";
import Link from "next/link";

// API base URL - overridable in production via NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://bernard-scraperg.onrender.com";

export default function SettingsPage() {
    const [config, setConfig] = useState({
        city: "Raleigh",
        state: "NC",
        niche: "restaurants",
        maxLeads: 10,
        sources: ["google_maps", "yelp"],
    });
    const [saved, setSaved] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const cities = [
        { name: "Raleigh", state: "NC" },
        { name: "Miami", state: "FL" },
        { name: "Atlanta", state: "GA" },
        { name: "Chicago", state: "IL" },
        { name: "Los Angeles", state: "CA" },
    ];

    const niches = ["restaurants", "gyms", "salons", "contractors", "dentists"];

    // Load config on mount
    useEffect(() => {
        fetch(`${API_URL}/api/config`)
            .then(r => r.json())
            .then(setConfig)
            .catch(() => { });

        // Poll for status
        const interval = setInterval(() => {
            fetch(`${API_URL}/api/status`)
                .then(r => r.json())
                .then(data => {
                    setIsRunning(data.isRunning);
                    setLogs(data.logs || []);
                })
                .catch(() => { });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const saveConfig = async () => {
        try {
            await fetch(`${API_URL}/api/config`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch {
            alert("Server not running. Start: npm run server");
        }
    };

    const runScraper = async () => {
        try {
            await fetch(`${API_URL}/api/scan/single`, { method: "POST" });
        } catch {
            alert("Server not running.");
        }
    };

    const clearDatabase = async () => {
        if (!confirm("Clear all leads from database?")) return;
        try {
            await fetch(`${API_URL}/api/clear`, { method: "POST" });
        } catch {
            alert("Server not running.");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-cyan-400 transition-colors mb-6"
                    >
                        ← Back to Dashboard
                    </Link>

                    <h1 className="text-3xl font-light text-white mb-2 flex items-center gap-3">
                        <Gear className="w-8 h-8 text-cyan-400" weight="duotone" />
                        Bot Configuration
                    </h1>
                    <p className="text-neutral-400">
                        Configure Bernard's scraping settings
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Configuration Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#111] rounded-2xl border border-neutral-800 p-6"
                    >
                        <h2 className="text-xl font-semibold text-white mb-6">Settings</h2>

                        {/* City */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                                <MapPin className="w-4 h-4" />
                                Target City
                            </label>
                            <select
                                value={config.city}
                                onChange={(e) => {
                                    const city = cities.find(c => c.name === e.target.value);
                                    setConfig({ ...config, city: city?.name || "Raleigh", state: city?.state || "NC" });
                                }}
                                className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                            >
                                {cities.map(city => (
                                    <option key={city.name} value={city.name}>
                                        {city.name}, {city.state}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Niche */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                                <Storefront className="w-4 h-4" />
                                Industry Niche
                            </label>
                            <select
                                value={config.niche}
                                onChange={(e) => setConfig({ ...config, niche: e.target.value })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                            >
                                {niches.map(niche => (
                                    <option key={niche} value={niche}>
                                        {niche.charAt(0).toUpperCase() + niche.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Max Leads */}
                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                                <Hash className="w-4 h-4" />
                                Max Leads Per Run
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="50"
                                value={config.maxLeads}
                                onChange={(e) => setConfig({ ...config, maxLeads: parseInt(e.target.value) || 10 })}
                                className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                            />
                        </div>

                        {/* Sources */}
                        <div className="mb-6">
                            <label className="text-sm text-neutral-400 mb-2 block">
                                Data Sources
                            </label>
                            <div className="space-y-2">
                                {["google_maps", "yelp"].map(source => (
                                    <label key={source} className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={config.sources.includes(source)}
                                            onChange={(e) => {
                                                const sources = e.target.checked
                                                    ? [...config.sources, source]
                                                    : config.sources.filter(s => s !== source);
                                                setConfig({ ...config, sources });
                                            }}
                                            className="w-4 h-4 rounded bg-black border-neutral-700"
                                        />
                                        <span className="text-white">
                                            {source === "google_maps" ? "Google Maps" : "Yelp"}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={saveConfig}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
                        >
                            {saved ? (
                                <>
                                    <Check className="w-5 h-5" weight="bold" />
                                    Saved!
                                </>
                            ) : (
                                <>
                                    <ArrowClockwise className="w-5 h-5" />
                                    Save Configuration
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Actions & Status Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Quick Actions */}
                        <div className="bg-[#111] rounded-2xl border border-neutral-800 p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Actions</h2>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={runScraper}
                                    disabled={isRunning}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30 transition-all disabled:opacity-50"
                                >
                                    <Play className="w-5 h-5" weight="fill" />
                                    Run Now
                                </button>

                                <button
                                    onClick={clearDatabase}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
                                >
                                    <Trash className="w-5 h-5" />
                                    Clear DB
                                </button>
                            </div>

                            <div className={`mt-4 px-3 py-2 rounded-lg text-sm ${isRunning ? "bg-cyan-500/20 text-cyan-400" : "bg-neutral-800 text-neutral-400"}`}>
                                {isRunning ? "⏳ Scraper running..." : "⏸️ Idle"}
                            </div>
                        </div>

                        {/* Live Logs */}
                        <div className="bg-[#111] rounded-2xl border border-neutral-800 p-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <Lightning className="w-5 h-5 text-cyan-400" />
                                Live Logs
                            </h2>

                            <div className="bg-black/50 rounded-xl p-4 h-64 overflow-y-auto font-mono text-xs">
                                {logs.length === 0 ? (
                                    <p className="text-neutral-500">No logs yet. Run the scraper to see output.</p>
                                ) : (
                                    logs.map((log, i) => (
                                        <div key={i} className="text-neutral-300 mb-1">
                                            {log}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Server Instructions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 bg-gradient-to-br from-[#111] to-[#0a1a1a] rounded-2xl border border-cyan-900/30 p-6"
                >
                    <h3 className="text-lg font-medium text-white mb-3">
                        🚀 Start the API Server
                    </h3>
                    <p className="text-neutral-400 mb-4">
                        Run this command to enable the dashboard controls:
                    </p>
                    <code className="block bg-black/50 rounded-lg px-4 py-3 text-cyan-400 font-mono text-sm">
                        cd bernard-scraper && npm run server
                    </code>
                </motion.div>
            </div>
        </div>
    );
}
