"use client";

import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";
import React, { InputHTMLAttributes } from "react";

interface BorderMagicInputProps extends InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
}

export function BorderMagicInput({
    className,
    containerClassName,
    ...props
}: BorderMagicInputProps) {
    return (
        <div className={cn("relative inline-flex h-12 w-full overflow-hidden rounded-xl p-[2px] transition-all", containerClassName)}>
            {/* The Rainbow Magic Gradient Border */}
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FF0000_0%,#FF7F00_14%,#FFFF00_28%,#00FF00_42%,#0000FF_56%,#4B0082_70%,#9400D3_84%,#FF0000_100%)] opacity-100" />

            {/* The Input Container */}
            <div className="relative inline-flex h-full w-full items-center rounded-xl bg-black px-3 py-1">
                <IconSearch className="mr-2 h-5 w-5 text-cyan-500/70 shrink-0" />
                <input
                    className={cn(
                        "h-full w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 pr-10",
                        className
                    )}
                    {...props}
                />
                {/* Arrow Button */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                    >
                        <path d="M5 12l14 0" />
                        <path d="M13 18l6 -6" />
                        <path d="M13 6l6 6" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
