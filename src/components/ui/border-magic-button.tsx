"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BorderMagicButtonProps {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit";
}

export function BorderMagicButton({
    children,
    onClick,
    disabled = false,
    className,
    type = "button",
}: BorderMagicButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]",
                className
            )}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#0ea5e9_50%,#22d3ee_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black px-6 py-1 text-sm font-semibold text-white backdrop-blur-3xl gap-2 hover:bg-neutral-900/80 transition-colors">
                {children}
            </span>
        </button>
    );
}
