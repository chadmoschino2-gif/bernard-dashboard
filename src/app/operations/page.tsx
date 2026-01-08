"use client";

import { motion } from "framer-motion";
import {
    BookOpen,
    Play,
    Gear,
    Clock,
    CheckCircle,
    Lightning,
    Target,
    Database,
    ArrowRight,
    Info,
    Warning,
    Lightbulb,
    Repeat,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default function OperationsPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center glow-blue">
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

            {/* Quick Start */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Card className="bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-transparent border-blue-500/30">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <div className="flex-1">
                                <Badge className="mb-3 bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    Quick Start
                                </Badge>
                                <h2 className="text-xl font-semibold mb-2">
                                    Ready to run your first scan?
                                </h2>
                                <p className="text-muted-foreground">
                                    Head to the Dashboard, click 'Initiate', and watch Bernard
                                    discover qualified leads in your target market.
                                </p>
                            </div>
                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 whitespace-nowrap">
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Operation Steps */}
            <div className="space-y-6">
                {operationSteps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                    >
                        <Card className="bg-card/50 border-border/50 hover:border-blue-500/30 transition-all duration-300">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-${step.color}-500/20 flex items-center justify-center`}
                                    >
                                        <step.icon
                                            className={`w-5 h-5 text-${step.color}-400`}
                                            weight="duotone"
                                        />
                                    </div>
                                    <span>{step.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3">
                                    {step.items.map((item, itemIndex) => (
                                        <li
                                            key={itemIndex}
                                            className="flex items-start gap-3 text-muted-foreground"
                                        >
                                            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                                                {itemIndex + 1}
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Tips Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-4"
            >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" weight="duotone" />
                    Tips & Best Practices
                </h2>

                <div className="grid gap-4">
                    {tips.map((tip, index) => (
                        <Card
                            key={index}
                            className={`border-l-4 ${tip.type === "tip"
                                    ? "border-l-yellow-500 bg-yellow-500/5"
                                    : tip.type === "info"
                                        ? "border-l-blue-500 bg-blue-500/5"
                                        : "border-l-orange-500 bg-orange-500/5"
                                }`}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
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
                                        <p className="font-medium text-sm mb-1">{tip.title}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {tip.content}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>

            {/* Time Estimates */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Card className="bg-card/50 border-border/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-cyan-400" weight="duotone" />
                            Time Estimates
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-muted/30">
                                <p className="text-2xl font-bold text-blue-400">~5 min</p>
                                <p className="text-sm text-muted-foreground">
                                    Single scan duration
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/30">
                                <p className="text-2xl font-bold text-emerald-400">50-200</p>
                                <p className="text-sm text-muted-foreground">
                                    Leads per city/niche
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/30">
                                <p className="text-2xl font-bold text-cyan-400">5 days</p>
                                <p className="text-sm text-muted-foreground">
                                    Autonomous run cycle
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
