"use client";

import { Bell, User } from "@phosphor-icons/react";

export function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-14 items-center justify-end gap-4 border-b border-neutral-800 bg-[#0a0a0a]/80 backdrop-blur-xl px-4 md:px-6">
            {/* Right side */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <button
                    className="relative p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" weight="regular" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                </button>

                {/* User */}
                <button
                    className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    aria-label="User"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" weight="bold" />
                    </div>
                </button>
            </div>
        </header>
    );
}
