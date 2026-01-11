"use client";

import { useState, useEffect } from "react";
import { Vortex } from "@/components/ui/vortex";
import { FlipWords } from "@/components/ui/flip-words";
import { BorderMagicButton } from "@/components/ui/border-magic-button";
import { BorderMagicInput } from "@/components/ui/border-magic-input";
import { AceternitySidebar } from "@/components/ui/aceternity-sidebar";
import {
  IconRocket,
  IconBolt,
  IconLoader2,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const flipWords = ["powerful", "autonomous", "intelligent", "efficient"];

export default function YouTubeScraper() {
  const [isActivating, setIsActivating] = useState(false);
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // YouTube-specific inputs
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Dynamic YouTube search examples
  const youtubeSearchExamples = [
    "Marketing tutorials",
    "Business coaching",
    "Tech startups",
    "Real estate tips",
    "E-commerce guides",
    "SaaS companies"
  ];

  // Dynamic channel filter examples
  const channelFilterExamples = [
    "Subscribers > 10k",
    "Views > 100k",
    "Uploads > 50",
    "Recent activity",
    "Channel age > 2 years",
    "Engagement > 5%"
  ];

  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  // Validation: both search query and filter must be filled
  const isFormValid = searchQuery.trim().length > 0 && channelFilter.trim().length > 0;

  // Check backend status on load
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/status`);
        if (res.ok) {
          const data = await res.json();
          setIsConnected(true);
          setIsRunning(data.isRunning);
        }
      } catch {
        setIsConnected(false);
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [API_URL]);

  // Rotate placeholders
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % youtubeSearchExamples.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [youtubeSearchExamples.length]);

  const handleSingleScan = async () => {
    if (!isFormValid) return;

    setIsActivating(true);
    setStatusMessage(`Scraping YouTube for "${searchQuery}" with ${channelFilter}...`);

    try {
      const res = await fetch(`${API_URL}/api/youtube/scan/single`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchQuery,
          channelFilter,
        }),
      });

      if (res.ok) {
        setStatusMessage("YouTube scraper running...");
        setIsRunning(true);
        // Clear fields after successful submission
        setSearchQuery("");
        setChannelFilter("");
      } else {
        const err = await res.json();
        setStatusMessage(`Error: ${err.error || "Failed to start"}`);
      }
    } catch {
      setStatusMessage("Connection failed. Is the backend running?");
    }

    setTimeout(() => setIsActivating(false), 2000);
  };

  const handleAutoRun = async () => {
    if (!isFormValid) return;

    setIsAutoRunning(true);
    setStatusMessage(`Starting 5-day cycle for "${searchQuery}"...`);

    try {
      const res = await fetch(`${API_URL}/api/youtube/scan/auto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchQuery,
          channelFilter,
          days: 5,
        }),
      });

      if (res.ok) {
        setStatusMessage("Auto-run active.");
        setIsRunning(true);
        // Clear fields after successful submission
        setSearchQuery("");
        setChannelFilter("");
      } else {
        setStatusMessage("Failed to start.");
      }
    } catch {
      setStatusMessage("Connection failed.");
    }

    setTimeout(() => setIsAutoRunning(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-black">
      <AceternitySidebar />

      <main className="flex-1 ml-0 md:ml-[72px]">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={200}
          className="flex items-center flex-col justify-center px-6 md:px-12 py-4 w-full min-h-screen"
        >
          {/* Status Indicator */}
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs text-neutral-400 font-medium">
              {isConnected ? (isRunning ? 'Running' : 'Online') : 'Offline'}
            </span>
          </div>

          {/* Logo & Title */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <IconBrandYoutube className="w-12 h-12 md:w-16 md:h-16 text-red-500" />
              <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                YouTube Scraper
              </h1>
            </div>
            <div className="text-neutral-400 text-base md:text-xl mt-4 font-light">
              Your <FlipWords words={flipWords} className="text-red-400 font-semibold" /> YouTube lead scraper
            </div>
          </div>

          {/* Search Inputs */}
          <div className="w-full max-w-xl space-y-4 mb-8">
            <div className="relative z-20">
              <PlaceholdersAndVanishInput
                placeholders={[
                  "Marketing tutorials",
                  "Business coaching",
                  "Tech startups",
                  "Real estate tips",
                  "Any YouTube content..."
                ]}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={(e) => { e.preventDefault(); }}
                value={searchQuery}
                setValue={setSearchQuery}
              />
            </div>
            {/* Channel Filter Input */}
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-red-400/80 font-medium text-center mb-2">
                Channel Filter System
              </p>
              <BorderMagicInput
                placeholder={channelFilterExamples[placeholderIndex]}
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="text-center"
              />
            </div>
            {/* 3-Step Micro Guide */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 mt-8 max-w-lg mx-auto">
              <div className="flex-1 text-center px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-red-500/20 transition-all duration-200">
                <p className="text-[10px] text-red-400 font-semibold uppercase tracking-widest">Step 1</p>
                <p className="text-sm text-neutral-300 mt-1 font-medium">Search Query</p>
              </div>
              <span className="text-neutral-500 text-lg">→</span>
              <div className="flex-1 text-center px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-red-500/20 transition-all duration-200">
                <p className="text-[10px] text-red-400 font-semibold uppercase tracking-widest">Step 2</p>
                <p className="text-sm text-neutral-300 mt-1 font-medium">Filter</p>
              </div>
              <span className="text-neutral-500 text-lg">→</span>
              <div className="flex-1 text-center px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.05] hover:border-red-500/20 transition-all duration-200">
                <p className="text-[10px] text-red-400 font-semibold uppercase tracking-widest">Step 3</p>
                <p className="text-sm text-neutral-300 mt-1 font-medium">Launch</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <BorderMagicButton
              onClick={handleSingleScan}
              disabled={isActivating || isRunning || !isFormValid}
            >
              {isActivating ? (
                <IconLoader2 className="w-5 h-5 animate-spin" />
              ) : (
                <IconRocket className="w-5 h-5" />
              )}
              {isActivating ? "Starting..." : "Single Scan"}
            </BorderMagicButton>

            <BorderMagicButton
              onClick={handleAutoRun}
              disabled={isAutoRunning || isRunning || !isFormValid}
            >
              {isAutoRunning ? (
                <IconLoader2 className="w-5 h-5 animate-spin" />
              ) : (
                <IconBolt className="w-5 h-5" />
              )}
              {isAutoRunning ? "Initializing..." : "5-Day Auto Run"}
            </BorderMagicButton>
          </div>

          {/* Validation Hint */}
          {!isFormValid && !statusMessage && (
            <p className="text-neutral-500 text-xs mt-4 text-center">
              Enter a search query and filter to enable scanning
            </p>
          )}

          {/* Status Message */}
          {statusMessage && (
            <p className="text-neutral-400 text-sm mt-6 animate-pulse">
              {statusMessage}
            </p>
          )}

          {/* Quick Stats - Bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-neutral-600 text-[10px] tracking-wide">
            <span>Query: <span className="text-neutral-400">{searchQuery || "Not set"}</span></span>
            <span className="text-neutral-700">•</span>
            <span>Filter: <span className="text-neutral-400">{channelFilter || "Any"}</span></span>
          </div>
        </Vortex>
      </main>
    </div>
  );
}
