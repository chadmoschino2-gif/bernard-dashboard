"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "relative z-50 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl transition-all duration-300",
          hovered && "border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]",
          className
        )}
      >
        {children}
      </div>

      {/* Title badge on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 10,
        }}
        transition={{ duration: 0.2 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium whitespace-nowrap shadow-lg">
          {title}
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};
