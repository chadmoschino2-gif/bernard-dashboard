"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightning,
  Repeat,
  Target,
  ChartLineUp,
  CheckCircle,
  Clock,
  Fire,
  Sparkle,
  ArrowRight,
  Play,
  Calendar,
} from "@phosphor-icons/react";
import { PinContainer } from "@/components/ui/3d-pin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Stats data
const stats = [
  {
    label: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    positive: true,
    icon: Target,
  },
  {
    label: "Premium Leads",
    value: "156",
    change: "+8.3%",
    positive: true,
    icon: Fire,
  },
  {
    label: "Hot Leads",
    value: "423",
    change: "+15.2%",
    positive: true,
    icon: Sparkle,
  },
  {
    label: "Conversion Rate",
    value: "24.8%",
    change: "+3.1%",
    positive: true,
    icon: ChartLineUp,
  },
];

// Recent activity
const recentActivity = [
  {
    type: "lead",
    message: "New premium lead found in Miami - Restaurant",
    time: "2 min ago",
    status: "premium",
  },
  {
    type: "scan",
    message: "Completed scan for Atlanta - Dentists",
    time: "15 min ago",
    status: "complete",
  },
  {
    type: "lead",
    message: "5 hot leads discovered in Chicago - HVAC",
    time: "32 min ago",
    status: "hot",
  },
  {
    type: "sync",
    message: "Notion database synced successfully",
    time: "1 hour ago",
    status: "synced",
  },
];

export default function Dashboard() {
  const [isRunning, setIsRunning] = useState(false);
  const [autoRunDays] = useState(5);

  const handleInitiate = () => {
    console.log("Initiating single scan...");
    setIsRunning(true);
    // Placeholder for backend integration
    setTimeout(() => setIsRunning(false), 3000);
  };

  const handleAutoRun = () => {
    console.log(`Starting ${autoRunDays}-day autonomous run...`);
    // Placeholder for backend integration
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-transparent border border-border/50 p-6 md:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="relative z-10">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
            System Online
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
            Welcome to Bernard
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Your autonomous lead generation system is ready. Start a scan or
            configure automated runs to discover qualified SMB leads.
          </p>
        </div>
      </motion.div>

      {/* 3D Pin Trigger Buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-8">
        {/* Initiate Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <PinContainer title="Start Single Scan" href="#">
            <div
              onClick={handleInitiate}
              className="flex flex-col p-6 tracking-tight text-slate-100/50 w-[18rem] h-[18rem] cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center glow-blue">
                  <Play className="w-6 h-6 text-white" weight="fill" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Initiate</h3>
                  <p className="text-xs text-slate-400">Single Scan</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6">
                Run a one-time scan with your current configuration. Perfect for
                testing or quick lead discovery.
              </p>

              <div className="flex-1 w-full rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-600/20 border border-blue-500/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 shimmer" />
                <Lightning
                  className="w-16 h-16 text-blue-400"
                  weight="duotone"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> ~5 min
                </span>
                <Badge
                  variant="outline"
                  className="text-emerald-400 border-emerald-400/30"
                >
                  Ready
                </Badge>
              </div>
            </div>
          </PinContainer>
        </motion.div>

        {/* Automatic Run Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <PinContainer title={`${autoRunDays}-Day Autonomous Run`} href="#">
            <div
              onClick={handleAutoRun}
              className="flex flex-col p-6 tracking-tight text-slate-100/50 w-[18rem] h-[18rem] cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center glow-emerald">
                  <Repeat className="w-6 h-6 text-white" weight="bold" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">Auto Run</h3>
                  <p className="text-xs text-slate-400">{autoRunDays}-Day Cycle</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-6">
                Set it and forget it. Bernard runs autonomously for{" "}
                {autoRunDays} days straight, collecting leads while you focus on
                closing.
              </p>

              <div className="flex-1 w-full rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 shimmer" />
                <Calendar
                  className="w-16 h-16 text-emerald-400"
                  weight="duotone"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Repeat className="w-3 h-3" /> Daily scans
                </span>
                <Badge
                  variant="outline"
                  className="text-blue-400 border-blue-400/30"
                >
                  Autonomous
                </Badge>
              </div>
            </div>
          </PinContainer>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="bg-card/50 border-border/50 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3">
                <stat.icon
                  className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-colors"
                  weight="duotone"
                />
                <Badge
                  variant="outline"
                  className={
                    stat.positive
                      ? "text-emerald-400 border-emerald-400/30 text-xs"
                      : "text-red-400 border-red-400/30 text-xs"
                  }
                >
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl md:text-3xl font-bold mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" weight="duotone" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${activity.status === "premium"
                        ? "bg-yellow-500"
                        : activity.status === "hot"
                          ? "bg-orange-500"
                          : activity.status === "complete"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                      }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <CheckCircle
                    className="w-4 h-4 text-emerald-500"
                    weight="fill"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-card/50 border-border/50 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightning className="w-5 h-5 text-cyan-400" weight="duotone" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/instructions" className="block">
                <Button
                  variant="outline"
                  className="w-full justify-between group border-border/50 hover:border-blue-500/50 hover:bg-blue-500/10"
                >
                  <span>Get Started Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full justify-between group border-border/50 hover:border-emerald-500/50 hover:bg-emerald-500/10"
              >
                <span>Configure Cities</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between group border-border/50 hover:border-cyan-500/50 hover:bg-cyan-500/10"
              >
                <span>View All Leads</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between group border-border/50 hover:border-purple-500/50 hover:bg-purple-500/10"
              >
                <span>Notion Settings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
