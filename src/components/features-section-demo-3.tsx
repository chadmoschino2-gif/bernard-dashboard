"use client";

import React from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  MagnifyingGlass,
  Globe,
  Lightning,
  ChartLineUp,
  Buildings,
  Target,
  Rocket,
  Warning,
  CheckCircle,
  X,
} from "@phosphor-icons/react";

export default function FeaturesSectionDemo() {
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
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Autonomous Prospecting
          </span>
        </h4>

        <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-400 text-center font-normal">
          Replace manual research entirely. Bernard finds, analyzes, scores, and
          delivers qualified leads — while you focus on closing.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-2xl border-neutral-800 overflow-hidden">
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
    <p
      className={cn(
        "text-sm md:text-base max-w-4xl text-left mx-auto",
        "text-neutral-400 font-normal",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

// Skeleton One - Autonomous Lead Discovery / Scanning Animation
export const SkeletonOne = () => {
  const businesses = [
    { name: "Miami Pizza Co.", type: "Restaurant", status: "no-website" },
    { name: "Atlanta HVAC Pro", type: "Home Services", status: "outdated" },
    { name: "Chicago Dental", type: "Healthcare", status: "active" },
    { name: "LA Auto Repair", type: "Automotive", status: "broken" },
  ];

  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-neutral-900 shadow-2xl group h-full rounded-xl border border-neutral-800">
        <div className="flex flex-1 w-full h-full flex-col space-y-3">
          {/* Search bar simulation */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-neutral-800/50 border border-neutral-700/50">
            <MagnifyingGlass className="w-4 h-4 text-blue-400" weight="bold" />
            <div className="flex-1">
              <motion.div
                className="h-2 rounded bg-gradient-to-r from-blue-500/50 to-transparent"
                animate={{ width: ["0%", "80%", "60%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Scanning results animation */}
          <div className="flex-1 space-y-2">
            {businesses.map((biz, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.3,
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="flex items-center gap-3 p-2.5 rounded-lg bg-neutral-800/30 border border-neutral-700/30"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Buildings
                    className="w-4 h-4 text-blue-400"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">
                    {biz.name}
                  </p>
                  <p className="text-[10px] text-neutral-500">{biz.type}</p>
                </div>
                <motion.div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    biz.status === "no-website" && "bg-red-500",
                    biz.status === "broken" && "bg-orange-500",
                    biz.status === "outdated" && "bg-yellow-500",
                    biz.status === "active" && "bg-emerald-500"
                  )}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-2">
            <span className="flex items-center gap-1.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Lightning className="w-3 h-3 text-blue-400" weight="fill" />
              </motion.div>
              Scanning Miami...
            </span>
            <span className="text-emerald-400">147 found</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-[#09090b] via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

// Skeleton Two - Website & Business Signal Detection
export const SkeletonTwo = () => {
  const signals = [
    { label: "No Website", count: 23, icon: X, color: "red" },
    { label: "Broken", count: 12, icon: Warning, color: "orange" },
    { label: "Outdated", count: 31, icon: Globe, color: "yellow" },
    { label: "Opportunity", count: 45, icon: CheckCircle, color: "emerald" },
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
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                {signal.label}
              </span>
              <motion.div
                className={cn(
                  "w-2 h-2 rounded-full",
                  signal.color === "red" && "bg-red-500",
                  signal.color === "orange" && "bg-orange-500",
                  signal.color === "yellow" && "bg-yellow-500",
                  signal.color === "emerald" && "bg-emerald-500"
                )}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">
                {signal.count}
              </span>
              <signal.icon
                className={cn(
                  "w-5 h-5",
                  signal.color === "red" && "text-red-400",
                  signal.color === "orange" && "text-orange-400",
                  signal.color === "yellow" && "text-yellow-400",
                  signal.color === "emerald" && "text-emerald-400"
                )}
                weight="duotone"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analysis progress */}
      <div className="w-full mt-auto">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <span>Analyzing signals...</span>
          <span className="text-blue-400">111 leads scored</span>
        </div>
        <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-[#09090b] to-transparent h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-[#09090b] to-transparent h-full pointer-events-none" />
    </div>
  );
};

// Skeleton Three - AI-Guided Automation Visualization
export const SkeletonThree = () => {
  return (
    <div className="relative flex gap-10 h-full group/image">
      <div className="w-full mx-auto bg-transparent group h-full">
        <div className="flex flex-1 w-full h-full flex-col items-center justify-center relative py-8">
          {/* Central automation hub */}
          <motion.div
            className="relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <Rocket className="w-12 h-12 text-white" weight="duotone" />
            </div>

            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full"
                style={{ transformOrigin: "center" }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div
                  className="absolute w-3 h-3 rounded-full bg-blue-400 border-2 border-blue-300"
                  style={{
                    top: -6 - i * 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Status indicators */}
          <div className="mt-8 text-center">
            <p className="text-white font-medium mb-1">System Active</p>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>Scoring leads autonomously</span>
            </div>
          </div>

          {/* Flow lines */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[0, 1, 2, 3, 4].map((i) => (
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
                  duration: 4,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton Four - Global Scale Globe
export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent mt-10">
      <GlobeComponent className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  );
};

export const GlobeComponent = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.2],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.1, 0.3, 0.5],
      markers: [
        // Major cities for lead generation
        { location: [25.7617, -80.1918], size: 0.08 }, // Miami
        { location: [41.8781, -87.6298], size: 0.08 }, // Chicago
        { location: [33.749, -84.388], size: 0.06 }, // Atlanta
        { location: [34.0522, -118.2437], size: 0.08 }, // LA
        { location: [40.7128, -74.006], size: 0.1 }, // NYC
        { location: [29.7604, -95.3698], size: 0.06 }, // Houston
        { location: [47.6062, -122.3321], size: 0.05 }, // Seattle
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};
