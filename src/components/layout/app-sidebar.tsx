"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    Rocket,
    BookOpen,
    Gear,
    SignOut,
    Robot,
    ChartLineUp,
    Database,
    Lightning,
    TelegramLogo,
} from "@phosphor-icons/react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const mainNavItems = [
    {
        label: "Dashboard",
        href: "/",
        icon: House,
    },
    {
        label: "Lead Pipeline",
        href: "/pipeline",
        icon: ChartLineUp,
    },
    {
        label: "Automation",
        href: "/automation",
        icon: Lightning,
    },
    {
        label: "Database",
        href: "/database",
        icon: Database,
    },
];

const resourceItems = [
    {
        label: "Get Started",
        href: "/instructions",
        icon: Rocket,
    },
    {
        label: "Operations Guide",
        href: "/operations",
        icon: BookOpen,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Gear,
    },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
            <SidebarHeader className="p-4">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg glow-blue group-hover:scale-105 transition-transform duration-300">
                            <Robot className="w-6 h-6 text-white" weight="duotone" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-sidebar animate-pulse" />
                    </div>
                    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                        <span className="font-bold text-lg tracking-tight gradient-text">
                            Bernard
                        </span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                            Lead Scraper
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarSeparator className="opacity-50" />

            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider px-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainNavItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.label}
                                            className={cn(
                                                "transition-all duration-200",
                                                isActive && "bg-sidebar-accent glow-blue/20"
                                            )}
                                        >
                                            <Link href={item.href}>
                                                <item.icon
                                                    className={cn(
                                                        "w-5 h-5 transition-colors",
                                                        isActive
                                                            ? "text-blue-400"
                                                            : "text-muted-foreground"
                                                    )}
                                                    weight={isActive ? "duotone" : "regular"}
                                                />
                                                <span
                                                    className={cn(
                                                        isActive
                                                            ? "text-foreground font-medium"
                                                            : "text-muted-foreground"
                                                    )}
                                                >
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator className="opacity-30 my-2" />

                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider px-2">
                        Resources
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {resourceItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={item.label}
                                            className={cn(
                                                "transition-all duration-200",
                                                isActive && "bg-sidebar-accent"
                                            )}
                                        >
                                            <Link href={item.href}>
                                                <item.icon
                                                    className={cn(
                                                        "w-5 h-5 transition-colors",
                                                        isActive
                                                            ? "text-blue-400"
                                                            : "text-muted-foreground"
                                                    )}
                                                    weight={isActive ? "duotone" : "regular"}
                                                />
                                                <span
                                                    className={cn(
                                                        isActive
                                                            ? "text-foreground font-medium"
                                                            : "text-muted-foreground"
                                                    )}
                                                >
                                                    {item.label}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            tooltip="Contact @imChadGPT"
                            className="text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                        >
                            <a href="https://t.me/imChadGPT" target="_blank" rel="noopener noreferrer">
                                <TelegramLogo className="w-5 h-5" weight="duotone" />
                                <span>Contact Support</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            tooltip="Sign Out"
                            className="text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                            <SignOut className="w-5 h-5" weight="regular" />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
