'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { 
  FileText, 
  LayoutDashboard, 
  Video, 
  CreditCard, 
  Scale, 
  ShieldCheck, 
  Menu,
  X,
  Lock,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const verificationId = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', verificationId],
    queryFn: async () => {
      const res = await api.get(`/consultations/dashboard/${verificationId}`);
      return res.data;
    },
    retry: 1,
    // 1. Refresh every 5 seconds
    refetchInterval: 5000, 
    refetchIntervalInBackground: false,
  });

  // Navigation Items Helper
  const navItems = [
    { name: 'Overview', href: `/dashboard/${verificationId}`, icon: LayoutDashboard },
    { name: 'Documents', href: `/dashboard/${verificationId}/documents`, icon: FileText },
    { name: 'Meetings', href: `/dashboard/${verificationId}/meetings`, icon: Video },
    { name: 'Billing', href: `/dashboard/${verificationId}/payment`, icon: CreditCard },
  ];

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Securing your case files...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground max-w-sm">
            This secure link has either expired or is invalid. Please contact your attorney for a new access token.
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">Return to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden w-72 flex-col border-r bg-background md:flex">
        <div className="flex h-20 items-center border-b px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Scale size={22} />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none tracking-tight">CasePortal</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Verified Client</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 px-4 py-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 px-4 font-semibold transition-all group",
                    isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 transition-colors",
                    isActive ? "text-primary" : "group-hover:text-foreground"
                  )} />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t">
          <div className="rounded-2xl bg-slate-900 p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-3 w-3 text-emerald-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Secure Session</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your connection is protected by end-to-end encryption.
            </p>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-20 border-b bg-background/80 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="h-20 flex items-center border-b px-8 font-bold">
                  <Scale className="mr-2 h-5 w-5 text-primary" /> CasePortal
                </div>
                <div className="p-4 space-y-2 mt-4">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsMobileOpen(false)}>
                      <Button variant={pathname === item.href ? "secondary" : "ghost"} className="w-full justify-start h-12">
                        <item.icon className="mr-3 h-5 w-5" /> {item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden sm:block">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-tight">Active Case</h2>
              <p className="text-lg font-bold text-foreground">
                {data.consultation.fullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <Badge variant="outline" className="hidden lg:flex items-center gap-1.5 py-1 px-3 border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                SSL Encrypted
             </Badge>
             <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-sm text-primary">
                {data.consultation.fullName.charAt(0)}
             </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-6xl p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
        
        {/* Footer info for clients */}
        <footer className="py-4 border-t bg-background px-8 text-center md:text-left">
           <p className="text-[10px] text-muted-foreground italic">
             Verification Token: {verificationId} • This portal session expires automatically for your protection.
           </p>
        </footer>
      </div>
    </div>
  );
}