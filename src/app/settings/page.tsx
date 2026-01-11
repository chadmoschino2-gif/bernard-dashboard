"use client";

import { useState, useEffect, useCallback } from "react";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";
import { StarField } from "@/components/ui/star-field";
import {
    IconCheck,
    IconLoader2,
    IconRefresh,
    IconDatabase,
    IconServer,
    IconSettings,
    IconTrash,
    IconPlayerStop,
    IconTerminal,
    IconPlus,
    IconMinus,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
});

type SystemStatus = {
    backend: "online" | "offline" | "checking";
    database: "connected" | "disconnected" | "checking";
    scraper: "idle" | "running" | "error";
};

type Config = {
    city: string;
    state: string;
    niche: string;
    maxLeads: number;
};

export default function SettingsPage() {
    const [status, setStatus] = useState<SystemStatus>({
        backend: "checking",
        database: "checking",
        scraper: "idle",
    });
    const [stats, setStats] = useState({ totalLeads: 0, totalRuns: 0 });
    const [config, setConfig] = useState<Config>({ city: "Raleigh", state: "NC", niche: "Restaurants", maxLeads: 10 });
    const [logs, setLogs] = useState<string[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isStopping, setIsStopping] = useState(false);
    const [isClearing, setIsClearing] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const faqItems = [
        {
            question: "How do I start a scan?",
            answer: "Go to the Dashboard, enter your target location (e.g., 'Miami, FL') and describe your ideal leads (e.g., 'Dentists rating > 4.5'). Then click 'Single Scan' to start."
        },
        {
            question: "What does the AI Filter System do?",
            answer: "The AI understands natural language. You can type things like 'Plumbers with no website' or 'Restaurants with rating > 4.0' and Bernard will intelligently filter the results."
        },
        {
            question: "Where do I find my leads?",
            answer: "All scraped leads appear on the 'Leads' page. You can export them as CSV or PDF for your outreach campaigns."
        },
        {
            question: "How do I export only my leads?",
            answer: "On the Leads page, click the checkbox next to each lead you want to export. Selected leads show a cyan border. Then click CSV or PDF - it will export only your selected leads. Use 'Select All' for bulk selection."
        },
        {
            question: "How do I stop a running scan?",
            answer: "Use the 'Stop Scraper' button on this Settings page. The current scan will stop immediately."
        },
        {
            question: "What data does Bernard extract?",
            answer: "Bernard extracts: Business Name, Phone Number, Email, Address, Website Status, Star Rating, Review Count, and Google Maps URL."
        },
    ];

    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

    const checkStatus = useCallback(async () => {
        setIsRefreshing(true);

        try {
            const [statusRes, statsRes, configRes] = await Promise.all([
                fetch(`${API_URL}/api/status`).catch(() => null),
                fetch(`${API_URL}/api/stats`).catch(() => null),
                fetch(`${API_URL}/api/config`).catch(() => null),
            ]);

            if (statusRes?.ok) {
                const data = await statusRes.json();
                setStatus((prev) => ({
                    ...prev,
                    backend: "online",
                    scraper: data.isRunning ? "running" : "idle",
                }));
                setLogs(data.logs?.slice(-10) || []);
            } else {
                setStatus((prev) => ({ ...prev, backend: "offline" }));
            }

            if (statsRes?.ok) {
                const data = await statsRes.json();
                setStats({ totalLeads: data.totalLeads || 0, totalRuns: data.totalRuns || 0 });
                setStatus((prev) => ({ ...prev, database: "connected" }));
            } else {
                setStatus((prev) => ({ ...prev, database: "disconnected" }));
            }

            if (configRes?.ok) {
                const data = await configRes.json();
                setConfig(data);
            }
        } catch {
            setStatus({ backend: "offline", database: "disconnected", scraper: "error" });
        }

        setIsRefreshing(false);
    }, [API_URL]);

    useEffect(() => {
        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, [checkStatus]);

    const saveConfig = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/config`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config),
            });
            if (res.ok) {
                await checkStatus();
            }
        } catch {
            // Failed
        }
        setIsSaving(false);
    };

    const stopScraper = async () => {
        setIsStopping(true);
        try {
            await fetch(`${API_URL}/api/scan/stop`, { method: "POST" });
            await checkStatus();
        } catch {
            // Failed
        }
        setIsStopping(false);
    };

    const clearDatabase = async () => {
        if (!confirm("Are you sure you want to clear all leads?")) return;
        setIsClearing(true);
        try {
            await fetch(`${API_URL}/api/clear`, { method: "POST" });
            await checkStatus();
        } catch {
            // Failed
        }
        setIsClearing(false);
    };

    const StatusDot = ({ state }: { state: string }) => {
        const color =
            state === "online" || state === "connected" || state === "idle" ? "bg-emerald-500" :
                state === "running" ? "bg-cyan-500 animate-pulse" :
                    state === "checking" ? "bg-yellow-500 animate-pulse" : "bg-red-500";
        return <span className={`w-2 h-2 rounded-full ${color}`} />;
    };

    return (
        <div className="flex min-h-screen bg-[#0a0a0a] relative selection:bg-cyan-500/30">
            <StarField />
            <AceternitySidebar />

            <main className="flex-1 p-6 md:p-12 ml-0 md:ml-[72px] pt-20 md:pt-12 overflow-x-hidden relative z-10">
                <div className="max-w-2xl mx-auto space-y-4">
                    {/* Header */}
                    <div
                        className="flex items-center justify-between"
                    >
                        <div>
                            <h1 className="text-2xl font-light text-white">Settings</h1>
                            <p className="text-neutral-500 text-sm">System configuration</p>
                        </div>
                        <button
                            onClick={checkStatus}
                            disabled={isRefreshing}
                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 transition-colors disabled:opacity-50 flex items-center justify-center"
                        >
                            <IconRefresh className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                        </button>
                    </div>

                    {/* Status Grid */}
                    <div
                        className="grid grid-cols-3 gap-3"
                    >
                        <div className="bg-[#111] rounded-xl border border-neutral-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <IconServer className="w-4 h-4 text-neutral-500" />
                                <span className="text-xs text-neutral-500">Backend</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusDot state={status.backend} />
                                <span className="text-sm text-white capitalize">{status.backend}</span>
                            </div>
                        </div>

                        <div className="bg-[#111] rounded-xl border border-neutral-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <IconDatabase className="w-4 h-4 text-neutral-500" />
                                <span className="text-xs text-neutral-500">Database</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusDot state={status.database} />
                                <span className="text-sm text-white">{stats.totalLeads} leads</span>
                            </div>
                        </div>

                        <div className="bg-[#111] rounded-xl border border-neutral-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <IconSettings className="w-4 h-4 text-neutral-500" />
                                <span className="text-xs text-neutral-500">Scraper</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusDot state={status.scraper} />
                                <span className="text-sm text-white capitalize">{status.scraper}</span>
                            </div>
                        </div>
                    </div>

                    {/* Configuration */}
                    <div
                        className="bg-[#111] rounded-xl border border-neutral-800 p-5"
                    >
                        <h2 className="text-white font-medium mb-4">Scraper Config</h2>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="text-xs text-neutral-500 mb-1 block">City</label>
                                <input
                                    type="text"
                                    value={config.city}
                                    onChange={(e) => setConfig({ ...config, city: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-neutral-500 mb-1 block">State</label>
                                <input
                                    type="text"
                                    value={config.state}
                                    onChange={(e) => setConfig({ ...config, state: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-neutral-500 mb-1 block">Niche</label>
                                <input
                                    type="text"
                                    value={config.niche}
                                    onChange={(e) => setConfig({ ...config, niche: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-neutral-500 mb-1 block">Max Leads</label>
                                <input
                                    type="number"
                                    value={config.maxLeads}
                                    onChange={(e) => setConfig({ ...config, maxLeads: parseInt(e.target.value) || 10 })}
                                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                                />
                            </div>
                        </div>

                        <button
                            onClick={saveConfig}
                            disabled={isSaving}
                            className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSaving ? <IconLoader2 className="w-4 h-4 animate-spin" /> : <IconCheck className="w-4 h-4" />}
                            Save Configuration
                        </button>
                    </div>

                    {/* Controls */}
                    <div
                        className="grid grid-cols-2 gap-3"
                    >
                        <button
                            onClick={stopScraper}
                            disabled={isStopping || status.scraper !== "running"}
                            className="py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isStopping ? <IconLoader2 className="w-4 h-4 animate-spin" /> : <IconPlayerStop className="w-4 h-4" />}
                            Stop Scraper
                        </button>

                        <button
                            onClick={clearDatabase}
                            disabled={isClearing}
                            className="py-3 rounded-xl bg-red-900/50 hover:bg-red-800/50 text-red-400 text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isClearing ? <IconLoader2 className="w-4 h-4 animate-spin" /> : <IconTrash className="w-4 h-4" />}
                            Clear Database
                        </button>
                    </div>

                    {/* Logs */}
                    {logs.length > 0 && (
                        <div
                            className="bg-[#111] rounded-xl border border-neutral-800 p-5"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <IconTerminal className="w-4 h-4 text-neutral-500" />
                                <h2 className="text-white font-medium">Recent Logs</h2>
                            </div>
                            <div className="bg-black rounded-lg p-3 max-h-40 overflow-y-auto font-mono text-xs text-neutral-400 space-y-1">
                                {logs.map((log, i) => (
                                    <div key={i} className="truncate">{log}</div>
                                ))}
                            </div>
                        </div>
                    )}


                    {/* FAQ Section */}
                    <div className="bg-[#0d0d0d] rounded-2xl border border-neutral-800/60 p-6">
                        <h2 className="text-white font-semibold text-lg mb-5">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {faqItems.map((item, index) => (
                                <div key={index} className="border border-neutral-800/60 rounded-xl overflow-hidden bg-black/30">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.03] transition-all duration-150"
                                    >
                                        <span className="text-sm text-white font-medium">{item.question}</span>
                                        {openFaq === index ? (
                                            <IconMinus className="w-4 h-4 text-cyan-400 shrink-0 transition-transform duration-200" />
                                        ) : (
                                            <IconPlus className="w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200" />
                                        )}
                                    </button>
                                    {openFaq === index && (
                                        <div className="px-4 pb-4 text-sm text-neutral-400 leading-relaxed animate-in fade-in duration-200">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Globe Section */}
                    <div className="relative h-[30rem] w-full overflow-hidden rounded-xl border border-neutral-800 bg-[#0a0a0a]">
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-10 pointer-events-none">
                            <h2 className="text-xl md:text-3xl font-bold text-white text-center">
                                Global Reach
                            </h2>
                            <p className="text-neutral-400 text-sm md:text-base max-w-lg text-center mt-2 px-4">
                                Scrape the entire world with Bernard, industry-leading autonomous lead scraper. Give me the best, most premium high-quality leads you ever imagine.
                            </p>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent z-20" />
                        <div className="absolute inset-0 z-0 top-10">
                            <World
                                globeConfig={{
                                    pointSize: 4,
                                    globeColor: "#0a0a0a",
                                    showAtmosphere: true,
                                    atmosphereColor: "#ffffff",
                                    atmosphereAltitude: 0.1,
                                    emissive: "#0a0a0a",
                                    emissiveIntensity: 0.1,
                                    shininess: 0.9,
                                    polygonColor: "rgba(255,255,255,0.7)",
                                    ambientLight: "#38bdf8",
                                    directionalLeftLight: "#ffffff",
                                    directionalTopLight: "#ffffff",
                                    pointLight: "#ffffff",
                                    arcTime: 1000,
                                    arcLength: 0.9,
                                    rings: 1,
                                    maxRings: 3,
                                    initialPosition: { lat: 22.3193, lng: 114.1694 },
                                    autoRotate: true,
                                    autoRotateSpeed: 0.5,
                                }}
                                data={[
                                    {
                                        order: 1,
                                        startLat: 34.0522,
                                        startLng: -118.2437,
                                        endLat: 40.7128,
                                        endLng: -74.006,
                                        arcAlt: 0.1,
                                        color: "#06b6d4"
                                    },
                                    {
                                        order: 2,
                                        startLat: 40.7128,
                                        startLng: -74.006,
                                        endLat: 51.5072,
                                        endLng: -0.1276,
                                        arcAlt: 0.2,
                                        color: "#3b82f6"
                                    },
                                    {
                                        order: 3,
                                        startLat: 51.5072,
                                        startLng: -0.1276,
                                        endLat: 35.6762,
                                        endLng: 139.6503,
                                        arcAlt: 0.3,
                                        color: "#6366f1"
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}
