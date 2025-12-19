'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Scale, Menu, ShieldCheck } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: 'Services', href: '/services' },
  { name: 'About Us', href: '/about' },
  { name: 'Practices', href: '/practices' },
  { name: 'Contact', href: '/contact' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6 mx-auto">
        {/* Mobile Menu (Left side on mobile) */}
        <div className="md:hidden mr-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle className="flex items-center gap-2 text-primary">
                  <Scale className="h-6 w-6" /> LawFirm Pro
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="my-2" />
                <Link href="/portal/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">Lawyer Portal</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2 transition-opacity hover:opacity-80">
          <div className="bg-primary text-primary-foreground p-1 rounded-md shadow-sm">
            <Scale className="h-5 w-5" />
          </div>
          <span className="font-bold sm:inline-block text-xl tracking-tight">
            LawFirm<span className="text-primary">Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary relative py-1",
                pathname === link.href ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center space-x-3">
          <div className="hidden lg:flex items-center gap-1.5 mr-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 uppercase tracking-widest">
            <ShieldCheck className="h-3 w-3" />
            Secure Portal
          </div>
          
          <ModeToggle />
          
          <div className="flex items-center gap-2">
            <Link href="/portal/login" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm" className="font-semibold">
                Log In
              </Button>
            </Link>
            <Link href="/book">
              <Button size="sm" className="font-bold shadow-md hover:shadow-lg transition-all px-5">
                Start Case
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
