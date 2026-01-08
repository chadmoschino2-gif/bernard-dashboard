"use client";

import { motion } from "framer-motion";
import {
    Rocket,
    Lightning,
    Target,
    ChartLineUp,
    Database,
    CheckCircle,
    ArrowRight,
    Gear,
    MagnifyingGlass,
    Globe,
    Star,
    Users,
    CreditCard,
    Question,
    CaretDown,
    Play,
    Plugs,
    Repeat,
    Sparkle,
    ShieldCheck,
    Trophy,
    Palette,
    Wrench,
    Storefront,
    CurrencyDollar,
    Megaphone,
    Handshake,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import FeaturesSectionDemo from "@/components/features-section-demo-3";

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// How it works steps
const steps = [
    {
        number: "01",
        title: "Choose your city & niche",
        description:
            "Select target locations and industries. Bernard supports any city and over 50+ business categories.",
        icon: Target,
    },
    {
        number: "02",
        title: "System searches automatically",
        description:
            "Bernard scans Google Maps, Yelp, and social platforms to find active local businesses.",
        icon: MagnifyingGlass,
    },
    {
        number: "03",
        title: "Websites are checked for issues",
        description:
            "Each business is analyzed for missing websites, broken pages, outdated designs, and mobile issues.",
        icon: Globe,
    },
    {
        number: "04",
        title: "Reviews & activity analyzed",
        description:
            "Recent reviews, social engagement, and online presence are evaluated for opportunity signals.",
        icon: Star,
    },
    {
        number: "05",
        title: "Leads are scored by opportunity",
        description:
            "Each lead receives a score: Premium, Hot, Warm, or Cool — based on urgency and potential.",
        icon: ChartLineUp,
    },
    {
        number: "06",
        title: "Best leads sent to Notion",
        description:
            "Qualified leads are automatically pushed to your Notion CRM with all relevant details.",
        icon: Database,
    },
    {
        number: "07",
        title: "You contact or automate outreach",
        description:
            "Reach out directly or connect Bernard to your email automation for hands-free prospecting.",
        icon: Megaphone,
    },
];

// What you get items
const features = [
    {
        title: "Dashboard Access",
        description: "Full access on your own custom domain",
        icon: Palette,
    },
    {
        title: "Config-Driven Scraper",
        description: "Easily configure cities, niches, and scoring rules",
        icon: Gear,
    },
    {
        title: "Notion Integration",
        description: "Pre-built template for your lead CRM",
        icon: Database,
    },
    {
        title: "Automated Lead Scoring",
        description: "AI-powered Premium, Hot, Warm, Cool rankings",
        icon: Trophy,
    },
    {
        title: "Flexible Scheduling",
        description: "Run daily, weekly, or on-demand",
        icon: Repeat,
    },
    {
        title: "System Updates",
        description: "Continuous improvements and new features",
        icon: Sparkle,
    },
];

// Who this is for
const audiences = [
    { title: "Web Designers & Agencies", icon: Palette },
    { title: "Payment Processors", icon: CreditCard },
    { title: "SEO Consultants", icon: ChartLineUp },
    { title: "Local Service Providers", icon: Wrench },
    { title: "Anyone Selling to SMBs", icon: Storefront },
];

// FAQ items
const faqs = [
    {
        question: "Do I need technical skills?",
        answer:
            "No. Bernard is designed for non-technical users. The setup is point-and-click, and the dashboard handles everything for you.",
    },
    {
        question: "Does this run automatically?",
        answer:
            "Yes! Once configured, Bernard can run daily or weekly without any manual intervention. Just set your preferences and let it work.",
    },
    {
        question: "Can I use my own domain?",
        answer:
            "Absolutely. Your Bernard dashboard deploys to Netlify with full custom domain support. It's your own branded system.",
    },
    {
        question: "Can I target multiple cities?",
        answer:
            "Yes. You can configure as many cities and niches as you want. Bernard will rotate through them based on your schedule.",
    },
    {
        question: "Is Notion required?",
        answer:
            "The current version uses Notion as the CRM backend. We provide a ready-to-use template that you simply duplicate to your workspace.",
    },
    {
        question: "How are leads scored?",
        answer:
            "Bernard uses a proprietary algorithm that analyzes website quality, review recency, social presence, and business activity to assign scores: Premium (immediate opportunity), Hot (high potential), Warm (good prospect), or Cool (worth monitoring).",
    },
];

export default function InstructionsPage() {
    const handlePurchase = () => {
        console.log("Purchase clicked - routing to checkout...");
        // Placeholder for Stripe/LemonSqueezy integration
    };

    const handleSeeHow = () => {
        const element = document.getElementById("how-it-works");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen">
            {/* SECTION 1 - HERO */}
            <section className="relative overflow-hidden py-16 md:py-24 px-4 md:px-6 lg:px-8">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-4xl mx-auto text-center"
                >
                    <Badge
                        variant="secondary"
                        className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-1"
                    >
                        <Rocket className="w-4 h-4 mr-2" weight="duotone" />
                        Autonomous Lead Generation
                    </Badge>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        <span className="gradient-text">Automated Lead Generation,</span>
                        <br />
                        <span className="text-foreground">Done For You</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Find, score, and organize local business leads automatically — no
                        manual research. Bernard works 24/7 so you can focus on closing
                        deals.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={handlePurchase}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-6 text-lg glow-blue"
                        >
                            <ShieldCheck className="w-5 h-5 mr-2" weight="duotone" />
                            Unlock Instructions & Access
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleSeeHow}
                            className="border-border/50 hover:border-blue-500/50 hover:bg-blue-500/10 px-8 py-6 text-lg"
                        >
                            See How It Works
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* BENTO GRID FEATURES SECTION */}
            <section className="py-8 md:py-12 px-4 md:px-6 lg:px-8">
                <FeaturesSectionDemo />
            </section>

            {/* SECTION 2 - WHAT THIS SYSTEM DOES */}
            <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-card/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                        >
                            Core Features
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What Bernard Does For You
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A complete autonomous system that handles lead discovery from
                            start to finish.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            {
                                icon: MagnifyingGlass,
                                title: "Finds Businesses Automatically",
                                description:
                                    "Scans Google Maps, Yelp, and social platforms to discover local businesses in your target markets.",
                            },
                            {
                                icon: Globe,
                                title: "Detects Website Problems",
                                description:
                                    "Identifies businesses with no website, broken sites, outdated designs, or poor mobile experience.",
                            },
                            {
                                icon: ChartLineUp,
                                title: "Scores Leads by Urgency",
                                description:
                                    "Ranks every lead as Premium, Hot, Warm, or Cool based on opportunity signals and potential value.",
                            },
                            {
                                icon: Database,
                                title: "Pushes to Notion CRM",
                                description:
                                    "Qualified leads flow directly into your Notion database with all relevant contact and business details.",
                            },
                            {
                                icon: Repeat,
                                title: "Runs on Autopilot",
                                description:
                                    "Schedule daily or weekly scans. Bernard works around the clock without manual intervention.",
                            },
                            {
                                icon: Sparkle,
                                title: "Continuously Improves",
                                description:
                                    "Regular updates ensure you always have the latest features and improved lead discovery algorithms.",
                            },
                        ].map((feature, index) => (
                            <motion.div key={index} variants={fadeInUp}>
                                <Card className="bg-card/50 border-border/50 hover:border-cyan-500/30 transition-all duration-300 h-full group">
                                    <CardContent className="p-6">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <feature.icon
                                                className="w-6 h-6 text-cyan-400"
                                                weight="duotone"
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* SECTION 3 - HOW IT WORKS */}
            <section
                id="how-it-works"
                className="py-16 md:py-20 px-4 md:px-6 lg:px-8"
            >
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        >
                            Step by Step
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            How It Works
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            From configuration to qualified leads in your CRM — here's the
                            process.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-cyan-500 to-emerald-500" />

                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.number}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative pl-16 md:pl-20"
                                >
                                    {/* Step number circle */}
                                    <div className="absolute left-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm md:text-base glow-blue">
                                        {step.number}
                                    </div>

                                    <Card className="bg-card/50 border-border/50 hover:border-blue-500/30 transition-all duration-300">
                                        <CardContent className="p-5 md:p-6">
                                            <div className="flex items-start gap-4">
                                                <step.icon
                                                    className="w-6 h-6 text-blue-400 shrink-0 mt-1"
                                                    weight="duotone"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-1">
                                                        {step.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {step.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 - WHAT YOU GET */}
            <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-card/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30"
                        >
                            Your Package
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What You Get Access To
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to run your own autonomous lead generation
                            system.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="bg-card/50 border-border/50 hover:border-purple-500/30 transition-all duration-300 h-full">
                                    <CardContent className="p-6 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                                            <feature.icon
                                                className="w-5 h-5 text-purple-400"
                                                weight="duotone"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5 - WHO THIS IS FOR */}
            <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30"
                        >
                            Perfect For
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Who This Is For
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Bernard is built for professionals who sell services to local
                            businesses.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {audiences.map((audience, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border/50 hover:border-orange-500/30 transition-colors">
                                    <audience.icon
                                        className="w-5 h-5 text-orange-400"
                                        weight="duotone"
                                    />
                                    <span className="font-medium">{audience.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 - SETUP OVERVIEW */}
            <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-card/30">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30"
                        >
                            Simple Setup
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Easy to Get Started
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            No technical skills required. Get up and running in minutes.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                step: "1",
                                title: "Connect Your Notion",
                                description:
                                    "Duplicate the provided template to your Notion workspace and connect it to Bernard.",
                                icon: Plugs,
                            },
                            {
                                step: "2",
                                title: "Choose Your Targets",
                                description:
                                    "Select your city and industry. Add as many combinations as you want.",
                                icon: Target,
                            },
                            {
                                step: "3",
                                title: "Click Run",
                                description:
                                    "Hit the Initiate button or set up automated scheduling. That's it!",
                                icon: Play,
                            },
                            {
                                step: "4",
                                title: "Leads Appear Automatically",
                                description:
                                    "Qualified leads flow into your Notion CRM with scores and contact details.",
                                icon: Sparkle,
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="bg-card/50 border-border/50 hover:border-blue-500/30 transition-all duration-300 h-full">
                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                                {item.step}
                                            </div>
                                            <item.icon
                                                className="w-6 h-6 text-blue-400"
                                                weight="duotone"
                                            />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 7 - PRICING CTA */}
            <section className="py-16 md:py-24 px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <Card className="relative overflow-hidden border-blue-500/30 bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-transparent">
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

                        <CardContent className="relative z-10 p-8 md:p-12 text-center">
                            <Badge
                                variant="secondary"
                                className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            >
                                <CurrencyDollar className="w-4 h-4 mr-1" weight="duotone" />
                                One-Time Setup
                            </Badge>

                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Get Full Access Now
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                                One-time setup. Your own system. Unlimited leads. Deploy Bernard
                                to your domain and start generating qualified SMB leads today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                <Button
                                    size="lg"
                                    onClick={handlePurchase}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-10 py-6 text-lg glow-blue"
                                >
                                    <ShieldCheck className="w-5 h-5 mr-2" weight="duotone" />
                                    Purchase Instructions & Access
                                </Button>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <CheckCircle
                                        className="w-4 h-4 text-emerald-500"
                                        weight="fill"
                                    />
                                    Custom Domain
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle
                                        className="w-4 h-4 text-emerald-500"
                                        weight="fill"
                                    />
                                    Notion CRM Template
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle
                                        className="w-4 h-4 text-emerald-500"
                                        weight="fill"
                                    />
                                    Autonomous Runs
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>

            {/* SECTION 8 - FAQ */}
            <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-card/30">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-slate-500/20 text-slate-400 border-slate-500/30"
                        >
                            <Question className="w-4 h-4 mr-2" weight="duotone" />
                            FAQ
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                    </motion.div>

                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border border-border/50 rounded-lg px-6 bg-card/50 hover:border-blue-500/30 transition-colors"
                                >
                                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground pb-5">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Ready to Automate Your Lead Generation?
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Join the professionals who have already deployed Bernard and
                        started filling their pipelines with qualified SMB leads.
                    </p>
                    <Button
                        size="lg"
                        onClick={handlePurchase}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-8 py-6 text-lg glow-blue"
                    >
                        Get Started Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </motion.div>
            </section>
        </div>
    );
}
