"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    Play,
    Clock,
    CheckCircle,
    Lightning,
    Target,
    ArrowRight,
    Info,
    Warning,
    Lightbulb,
    Repeat,
    Fire,
    Sparkle,
    Star,
} from "@phosphor-icons/react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const operationSteps = [
    {
        title: "Pre-Run Checklist",
        items: [
            "Verify your Notion integration is connected",
            "Confirm target cities are configured",
            "Check niche categories are set",
            "Review scoring thresholds if customized",
        ],
        icon: CheckCircle,
        color: "emerald",
    },
    {
        title: "Running a Single Scan",
        items: [
            "Navigate to the Dashboard",
            "Click the 'Initiate' 3D button",
            "Wait for the scan to complete (~5 minutes)",
            "Check your Notion database for new leads",
        ],
        icon: Play,
        color: "blue",
    },
    {
        title: "Setting Up Autonomous Mode",
        items: [
            "Click the 'Auto Run' 3D button",
            "Bernard will run daily for 5 consecutive days",
            "Each day targets different city/niche combinations",
            "Leads are automatically scored and pushed to Notion",
        ],
        icon: Repeat,
        color: "cyan",
    },
    {
        title: "Understanding Lead Scores",
        items: [
            "Premium: Immediate opportunity, no website or critical issues",
            "Hot: High potential, poor web presence or outdated site",
            "Warm: Good prospect, minor issues or growth signals",
            "Cool: Worth monitoring, already has decent presence",
        ],
        icon: Target,
        color: "purple",
    },
];

const tips = [
    {
        type: "tip",
        icon: Lightbulb,
        title: "Pro Tip",
        content:
            "Start with 2-3 cities and 1 niche to test your outreach messaging before scaling up.",
    },
    {
        type: "info",
        icon: Info,
        title: "Good to Know",
        content:
            "Bernard rotates through your configured targets to ensure even coverage and avoid duplicate leads.",
    },
    {
        type: "warning",
        icon: Warning,
        title: "Important",
        content:
            "Allow 24 hours between manual runs for the same city/niche combination to avoid rate limiting.",
    },
];

const Step = ({ title }: { title: string }) => {
    return (
        <li className="flex gap-2 items-start">
            <CheckIcon />
            <p className="text-white text-sm">{title}</p>
        </li>
    );
};

const CheckIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-blue-500 mt-0.5 shrink-0"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
                d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                fill="currentColor"
                strokeWidth="0"
            />
        </svg>
    );
};

export default function OperationsPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                        <BookOpen className="w-6 h-6 text-white" weight="duotone" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Operations Guide</h1>
                        <p className="text-muted-foreground">
                            Learn how to use Bernard effectively
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Start Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <CardSpotlight className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 relative z-20">
                        <div className="flex-1">
                            <Badge className="mb-3 bg-blue-500/20 text-blue-400 border-blue-500/30">
                                Quick Start
                            </Badge>
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                Ready to run your first scan?
                            </h2>
                            <p className="text-neutral-400">
                                Head to the Dashboard, click 'Initiate', and watch Bernard
                                discover qualified leads in your target market.
                            </p>
                        </div>
                        <Link href="/">
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 whitespace-nowrap">
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </CardSpotlight>
            </motion.div>

            {/* Operation Steps with CardSpotlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {operationSteps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    >
                        <CardSpotlight className="h-full p-6">
                            <div className="relative z-20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.color === "emerald"
                                                ? "bg-emerald-500/20"
                                                : step.color === "blue"
                                                    ? "bg-blue-500/20"
                                                    : step.color === "cyan"
                                                        ? "bg-cyan-500/20"
                                                        : "bg-purple-500/20"
                                            }`}
                                    >
                                        <step.icon
                                            className={`w-5 h-5 ${step.color === "emerald"
                                                    ? "text-emerald-400"
                                                    : step.color === "blue"
                                                        ? "text-blue-400"
                                                        : step.color === "cyan"
                                                            ? "text-cyan-400"
                                                            : "text-purple-400"
                                                }`}
                                            weight="duotone"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {step.title}
                                    </h3>
                                </div>
                                <ul className="space-y-2">
                                    {step.items.map((item, itemIndex) => (
                                        <Step key={itemIndex} title={item} />
                                    ))}
                                </ul>
                            </div>
                        </CardSpotlight>
                    </motion.div>
                ))}
            </div>

            {/* Lead Scoring Legend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <CardSpotlight className="p-6">
                    <div className="relative z-20">
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-white mb-6">
                            <Star className="w-5 h-5 text-yellow-400" weight="duotone" />
                            Lead Scoring System
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                {
                                    label: "Premium",
                                    color: "from-yellow-500 to-orange-500",
                                    icon: Fire,
                                    desc: "Immediate opportunity",
                                },
                                {
                                    label: "Hot",
                                    color: "from-orange-500 to-red-500",
                                    icon: Sparkle,
                                    desc: "High potential",
                                },
                                {
                                    label: "Warm",
                                    color: "from-blue-500 to-cyan-500",
                                    icon: Lightning,
                                    desc: "Good prospect",
                                },
                                {
                                    label: "Cool",
                                    color: "from-slate-500 to-slate-600",
                                    icon: Target,
                                    desc: "Worth monitoring",
                                },
                            ].map((score, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800"
                                >
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${score.color} flex items-center justify-center mb-3`}
                                    >
                                        <score.icon
                                            className="w-5 h-5 text-white"
                                            weight="duotone"
                                        />
                                    </div>
                                    <p className="font-semibold text-white">{score.label}</p>
                                    <p className="text-xs text-neutral-500">{score.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardSpotlight>
            </motion.div>

            {/* Tips Section with CardSpotlight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-4"
            >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" weight="duotone" />
                    Tips & Best Practices
                </h2>

                <div className="grid gap-4">
                    {tips.map((tip, index) => (
                        <CardSpotlight
                            key={index}
                            className={`p-5 border-l-4 ${tip.type === "tip"
                                    ? "border-l-yellow-500"
                                    : tip.type === "info"
                                        ? "border-l-blue-500"
                                        : "border-l-orange-500"
                                }`}
                        >
                            <div className="flex items-start gap-3 relative z-20">
                                <tip.icon
                                    className={`w-5 h-5 shrink-0 ${tip.type === "tip"
                                            ? "text-yellow-400"
                                            : tip.type === "info"
                                                ? "text-blue-400"
                                                : "text-orange-400"
                                        }`}
                                    weight="duotone"
                                />
                                <div>
                                    <p className="font-medium text-sm mb-1 text-white">
                                        {tip.title}
                                    </p>
                                    <p className="text-sm text-neutral-400">{tip.content}</p>
                                </div>
                            </div>
                        </CardSpotlight>
                    ))}
                </div>
            </motion.div>

            {/* Time Estimates */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <CardSpotlight className="p-6">
                    <div className="relative z-20">
                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 text-white">
                            <Clock className="w-5 h-5 text-cyan-400" weight="duotone" />
                            Time Estimates
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                                <p className="text-2xl font-bold text-blue-400">~5 min</p>
                                <p className="text-sm text-neutral-500">Single scan duration</p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                                <p className="text-2xl font-bold text-emerald-400">50-200</p>
                                <p className="text-sm text-neutral-500">Leads per city/niche</p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800">
                                <p className="text-2xl font-bold text-cyan-400">5 days</p>
                                <p className="text-sm text-neutral-500">Autonomous run cycle</p>
                            </div>
                        </div>
                    </div>
                </CardSpotlight>
            </motion.div>
        </div>
    );
}
