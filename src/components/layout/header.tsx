"use client";

import { Bell, MagnifyingGlass, User } from "@phosphor-icons/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />

            {/* Search */}
            <div className="relative flex-1 max-w-md">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search leads, cities, niches..."
                    className="pl-10 bg-muted/50 border-border/50 focus:bg-muted transition-colors h-9"
                />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative text-muted-foreground hover:text-foreground"
                >
                    <Bell className="w-5 h-5" weight="regular" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                </Button>

                {/* User */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" weight="bold" />
                    </div>
                </Button>
            </div>
        </header>
    );
}
