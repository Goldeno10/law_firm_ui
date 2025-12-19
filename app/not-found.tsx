'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    FileQuestion,
    ChevronLeft,
    Home,
    Search,
    ShieldAlert,
    Scale,
    ArrowRight
} from 'lucide-react';

/**
 * NotFound Page
 * 
 * A professional, high-fidelity error page for LawFirm Pro.
 * Provides clear pathways back to the main application while maintaining
 * the firm's authoritative and secure aesthetic.
 */
export default function NotFound() {
    return (
        <div className="relative flex h-screen flex-col items-center justify-center bg-background px-4 overflow-hidden">

            {/* 1. Background Visual Decoration (Subtle Legal-Tech Grid) */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
            </div>

            {/* 2. Main Content Card */}
            <div className="flex max-w-lg flex-col items-center text-center">
                {/* Animated Icon Container */}
                <div className="relative mb-8">
                    <div className="absolute -inset-4 rounded-full bg-primary/5 animate-pulse" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary shadow-inner">
                        <Scale className="h-12 w-12" />
                        <Search className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full border-4 border-background bg-muted p-1 text-muted-foreground" />
                    </div>
                </div>

                {/* Textual Content */}
                <div className="space-y-4 mb-10">
                    <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">
                        Matter Not Found
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        The page or legal record you are seeking is unavailable.
                        This link may have expired, or the file has been moved for archival purposes.
                    </p>
                </div>

                {/* Action Grid */}
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link href="/" passHref className="w-full">
                        <Button variant="outline" className="w-full h-12 font-semibold group">
                            <Home className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                            Return to Home
                        </Button>
                    </Link>
                    <Link href="/book" passHref className="w-full">
                        <Button className="w-full h-12 font-bold shadow-lg shadow-primary/20 group">
                            Get Legal Help
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                </div>

                {/* 3. Security Reassurance (Crucial for Legal Portals) */}
                <div className="mt-12 flex items-center gap-2 rounded-full border bg-muted/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                    Secure Session Active
                </div>
            </div>

            {/* 4. Support Footer Link */}
            <footer className="absolute bottom-8 text-sm text-muted-foreground">
                <p>
                    Need assistance? <Link href="/contact" className="font-bold text-primary hover:underline">Contact our Clerk's Office</Link>
                </p>
            </footer>
        </div>
    );
}
