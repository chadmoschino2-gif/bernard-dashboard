"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Bell,
    Envelope,
    ArrowClockwise,
    Check,
    Gear,
    Lightning,
    NotionLogo,
} from "@phosphor-icons/react";
import Link from "next/link";

export default function SettingsPage() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [email, setEmail] = useState("");

    const handleReset = () => {
        if (confirm("Are you sure you want to refresh the page? Any unsaved changes will be lost.")) {
            window.location.reload();
        }
    };

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

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <Gear className="w-4 h-4 text-blue-400" weight="fill" />
                        <span className="text-sm text-blue-400">Settings</span>
                    </div>

                    <h1 className="text-4xl font-light text-white mb-4">
                        Configuration
                    </h1>
                    <p className="text-lg text-neutral-400">
                        Manage Bernard's preferences and notifications
                    </p>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#111] rounded-2xl border border-neutral-800 p-8 mb-6"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <Bell className="w-6 h-6 text-white" weight="duotone" />
                        Notifications
                    </h2>

                    {/* Toggle Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 mb-4">
                        <div>
                            <h3 className="text-white font-medium mb-1">Enable Notifications</h3>
                            <p className="text-sm text-neutral-400">Get notified when new leads are found</p>
                        </div>
                        <button
                            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                            className={`w-14 h-8 rounded-full transition-colors relative ${notificationsEnabled ? "bg-cyan-500" : "bg-neutral-700"
                                }`}
                        >
                            <div
                                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${notificationsEnabled ? "translate-x-7" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Email Notifications */}
                    {notificationsEnabled && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                                <div>
                                    <h3 className="text-white font-medium mb-1">Email Notifications</h3>
                                    <p className="text-sm text-neutral-400">Receive daily summaries via email</p>
                                </div>
                                <button
                                    onClick={() => setEmailNotifications(!emailNotifications)}
                                    className={`w-14 h-8 rounded-full transition-colors relative ${emailNotifications ? "bg-cyan-500" : "bg-neutral-700"
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${emailNotifications ? "translate-x-7" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>

                            {emailNotifications && (
                                <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                                    <label className="text-sm text-neutral-400 mb-2 flex items-center gap-2">
                                        <Envelope className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-black/50 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500"
                                    />
                                    {email && (
                                        <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Email configured
                                        </p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#111] rounded-2xl border border-neutral-800 p-8 mb-6"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-cyan-500/50 transition-all text-left group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                                <ArrowClockwise className="w-5 h-5 text-cyan-400" weight="bold" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Refresh Page</h3>
                                <p className="text-xs text-neutral-500">Reset the dashboard</p>
                            </div>
                        </button>

                        <Link
                            href="/"
                            className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/50 transition-all group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors">
                                <Lightning className="w-5 h-5 text-emerald-400" weight="fill" />
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Back to Dashboard</h3>
                                <p className="text-xs text-neutral-500">Return to main view</p>
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Integration Status */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-[#111] to-[#0a1a1a] rounded-2xl border border-cyan-900/30 p-8"
                >
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <NotionLogo className="w-6 h-6 text-white" weight="fill" />
                        Notion Integration
                    </h2>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                            <span className="text-neutral-400">Status</span>
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                                Connected
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                            <span className="text-neutral-400">Database</span>
                            <span className="text-white">Bernard Lead Database</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
