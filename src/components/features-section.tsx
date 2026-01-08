"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    MagnifyingGlass,
    Globe,
    Lightning,
    Rocket,
    Target,
    ChartLineUp,
    Buildings,
    MapPin,
} from "@phosphor-icons/react";
import Image from "next/image";

export function FeaturesSection() {
    const features = [
        {
            title: "Autonomous Lead Discovery",
            description:
                "Automatically finds local businesses across cities and niches using live data sources. No manual research, no spreadsheets, no VA work.",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-800",
        },
        {
            title: "Real-Time Website & Business Analysis",
            description:
                "Instantly detects missing websites, broken pages, outdated setups, and active businesses — the exact signals that convert into high-value leads.",
            skeleton: <SkeletonTwo />,
            className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
        },
        {
            title: "AI-Guided Automation (Not a SaaS Tool)",
            description:
                "This isn't a bloated CRM. It's an autonomous system that runs for you, scores opportunities, and delivers qualified leads directly into your workspace.",
            skeleton: <SkeletonThree />,
            className: "col-span-1 lg:col-span-3 lg:border-r border-neutral-800",
        },
        {
            title: "Global, Scalable, Always-On",
            description:
                "Run lead generation across multiple cities and niches simultaneously. Schedule it once, deploy on your own domain, and scale without limits.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 lg:col-span-3 border-b lg:border-none",
        },
    ];

    return (
        <div className="relative z-20 py-10 lg:py-20 max-w-7xl mx-auto">
            <div className="px-8">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white">
                    Built for{" "}
                    <span className="gradient-text">Autonomous Prospecting</span>
                </h4>
                <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-400 text-center font-normal">
                    Replace manual research entirely. Bernard finds, analyzes, scores, and
                    delivers qualified leads — while you focus on closing.
                </p>
            </div>

            <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 border rounded-2xl border-neutral-800 overflow-hidden">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} className={feature.className}>
                            <FeatureTitle>{feature.title}</FeatureTitle>
                            <FeatureDescription>{feature.description}</FeatureDescription>
                            <div className="h-full w-full">{feature.skeleton}</div>
                        </FeatureCard>
                    ))}
                </div>
            </div>
        </div>
    );
}

const FeatureCard = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
            {children}
        </div>
    );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className="max-w-5xl mx-auto text-left tracking-tight text-white text-xl md:text-2xl md:leading-snug font-medium">
            {children}
        </p>
    );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
    return (
        <p className="text-sm md:text-base max-w-4xl text-left mx-auto text-neutral-400 font-normal my-2">
            {children}
        </p>
    );
};

// Skeleton One - Autonomous Discovery / Scanning Animation
const SkeletonOne = () => {
    return (
        <div className="relative flex py-8 px-2 gap-10 h-full">
            <div className="w-full p-5 mx-auto bg-neutral-900 shadow-2xl group h-full rounded-2xl border border-neutral-800">
                <div className="flex flex-1 w-full h-full flex-col space-y-2">
                    {/* Search bar simulation */}
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
                        <MagnifyingGlass className="w-4 h-4 text-blue-400" weight="bold" />
                        <div className="flex-1 h-3 rounded bg-gradient-to-r from-blue-500/30 to-transparent animate-pulse" />
                    </div>

                    {/* Scanning results animation */}
                    <div className="flex-1 space-y-2 pt-2">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                                className="flex items-center gap-3 p-2 rounded-lg bg-neutral-800/30"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                    <Buildings className="w-4 h-4 text-blue-400" weight="duotone" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div
                                        className="h-2 rounded bg-neutral-700"
                                        style={{ width: `${60 + i * 10}%` }}
                                    />
                                    <div
                                        className="h-1.5 rounded bg-neutral-800"
                                        style={{ width: `${40 + i * 5}%` }}
                                    />
                                </div>
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
                                    className="w-2 h-2 rounded-full bg-emerald-500"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Status bar */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
                        <span className="flex items-center gap-1">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Lightning className="w-3 h-3 text-blue-400" weight="fill" />
                            </motion.div>
                            Scanning...
                        </span>
                        <span>147 businesses found</span>
                    </div>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-background via-background to-transparent w-full pointer-events-none" />
            <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-background via-transparent to-transparent w-full pointer-events-none" />
        </div>
    );
};

// Skeleton Two - Website Analysis / Signal Detection Grid
const SkeletonTwo = () => {
    const signals = [
        { label: "No Website", color: "bg-red-500", icon: Globe },
        { label: "Broken", color: "bg-orange-500", icon: Globe },
        { label: "Outdated", color: "bg-yellow-500", icon: Globe },
        { label: "Active", color: "bg-emerald-500", icon: ChartLineUp },
    ];

    return (
        <div className="relative flex flex-col items-start p-8 gap-4 h-full overflow-hidden">
            {/* Signal cards grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
                {signals.map((signal, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15, duration: 0.4 }}
                        className="relative p-3 rounded-xl bg-neutral-900 border border-neutral-800 group hover:border-neutral-700 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${signal.color}`} />
                            <span className="text-xs text-neutral-400">{signal.label}</span>
                        </div>
                        <signal.icon
                            className="w-8 h-8 text-neutral-600 group-hover:text-neutral-500 transition-colors"
                            weight="duotone"
                        />
                        <motion.div
                            className="absolute inset-0 rounded-xl"
                            animate={{
                                boxShadow: [
                                    `0 0 0 0 ${signal.color.replace("bg-", "rgb(var(--")}`,
                                    `0 0 20px 2px transparent`,
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Analysis indicator */}
            <div className="w-full mt-auto">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                    <span>Analyzing signals...</span>
                    <span className="text-emerald-400">23 opportunities</span>
                </div>
                <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        animate={{ width: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>

            <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-background to-transparent h-full pointer-events-none" />
            <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-background to-transparent h-full pointer-events-none" />
        </div>
    );
};

// Skeleton Three - AI Automation / System Running Animation
const SkeletonThree = () => {
    return (
        <div className="relative flex gap-4 h-full flex-col items-center justify-center p-8">
            {/* Central automation node */}
            <motion.div
                className="relative"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center glow-blue">
                    <Rocket className="w-12 h-12 text-white" weight="duotone" />
                </div>

                {/* Orbiting elements */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 6 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{ transformOrigin: "center" }}
                    >
                        <motion.div
                            className="absolute w-4 h-4 rounded-full bg-blue-400/50 border border-blue-400"
                            style={{
                                top: -8 - i * 12,
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Status text */}
            <div className="text-center mt-6">
                <p className="text-white font-medium mb-1">System Running</p>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-500"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                    <span>Scoring leads automatically</span>
                </div>
            </div>

            {/* Flow lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
                        style={{
                            width: "100%",
                            top: `${20 + i * 15}%`,
                            left: 0,
                        }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{
                            duration: 3,
                            delay: i * 0.4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

// Skeleton Four - Global Scale / Multi-city Globe Animation
const SkeletonFour = () => {
    const cities = [
        { name: "Miami", x: 25, y: 45 },
        { name: "Chicago", x: 30, y: 30 },
        { name: "LA", x: 15, y: 40 },
        { name: "NYC", x: 40, y: 32 },
        { name: "Atlanta", x: 35, y: 48 },
    ];

    return (
        <div className="relative flex items-center justify-center h-full p-8">
            {/* Globe representation */}
            <div className="relative w-48 h-48">
                {/* Globe base */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-500/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                    {/* Latitude lines */}
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute inset-x-0 border-t border-blue-500/10"
                            style={{ top: `${25 + i * 25}%` }}
                        />
                    ))}
                </motion.div>

                {/* Longitude lines */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute inset-y-0 left-1/2 w-px bg-blue-500/10" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500/10" />
                </motion.div>

                {/* City markers */}
                {cities.map((city, i) => (
                    <motion.div
                        key={city.name}
                        className="absolute flex flex-col items-center"
                        style={{ left: `${city.x}%`, top: `${city.y}%` }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.3, duration: 0.5 }}
                    >
                        <motion.div
                            className="w-3 h-3 rounded-full bg-blue-500 glow-blue"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute -bottom-4 text-[10px] text-neutral-500 whitespace-nowrap"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                        >
                            {city.name}
                        </motion.div>

                        {/* Connection lines to center */}
                        <motion.div
                            className="absolute w-px bg-gradient-to-b from-blue-500/50 to-transparent"
                            style={{
                                height: 20,
                                top: -20,
                            }}
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        />
                    </motion.div>
                ))}

                {/* Center pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className="w-4 h-4 rounded-full bg-cyan-500"
                        animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </div>

            {/* Scale indicator */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" weight="duotone" />
                    5 cities active
                </span>
                <span className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-cyan-400" weight="duotone" />
                    12 niches
                </span>
            </div>
        </div>
    );
};

export default FeaturesSection;
