'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    BadgeCheck,
    Briefcase,
    Clock,
    Gavel,
    Info,
    Mail,
    Scale,
    ShieldAlert
} from "lucide-react";

interface Lawyer {
  id: string;
  name: string;
  email: string;
  profilePhotoUrl?: string;
  isVerified: boolean;
  barNumber: string;
  yearsOfExperience: number;
  specializations: string[];
  bio?: string;
  joinedAt?: string;
}

interface LawyerDetailProps {
  lawyer: Lawyer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LawyerDetailSheet({ lawyer, open, onOpenChange }: LawyerDetailProps) {
  if (!lawyer) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg p-0 flex flex-col">
        {/* Decorative Top Accent */}
        <div className="h-1.5 w-full bg-primary" />

        <ScrollArea className="flex-1">
          <div className="p-8">
            <SheetHeader className="text-left">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Scale size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Practitioner Profile</span>
              </div>
              <SheetTitle className="text-2xl font-bold">Attorney Details</SheetTitle>
              <SheetDescription>
                Comprehensive legal credentials and practice history for {lawyer.name}.
              </SheetDescription>
            </SheetHeader>

            {/* Profile Hero Section */}
            <div className="mt-8 flex flex-col items-center p-6 rounded-2xl bg-muted/30 border border-dashed">
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
                  <AvatarImage src={lawyer.profilePhotoUrl} alt={lawyer.name} className="object-cover" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold">
                    {lawyer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {lawyer.isVerified && (
                  <div className="absolute bottom-1 right-1 bg-background rounded-full p-0.5">
                    <BadgeCheck className="h-7 w-7 text-emerald-500 fill-emerald-50" />
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-center space-y-1">
                <h3 className="text-xl font-bold tracking-tight">{lawyer.name}</h3>
                <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {lawyer.email}
                </div>
                <div className="pt-2">
                  <Badge 
                    variant={lawyer.isVerified ? "default" : "outline"} 
                    className={lawyer.isVerified ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/10" : "text-amber-600 border-amber-200 bg-amber-50"}
                  >
                    {lawyer.isVerified ? (
                      <span className="flex items-center gap-1">Active Practitioner</span>
                    ) : (
                      <span className="flex items-center gap-1"><ShieldAlert size={12}/> Review Pending</span>
                    )}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Credential Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-card space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Gavel size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Bar License</span>
                </div>
                <p className="text-sm font-black text-foreground">{lawyer.barNumber}</p>
              </div>
              <div className="p-4 rounded-xl border bg-card space-y-1.5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Tenure</span>
                </div>
                <p className="text-sm font-black text-foreground">{lawyer.yearsOfExperience} Years Exp.</p>
              </div>
            </div>

            {/* Specializations Section */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-2 border-b pb-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-widest">Practice Specializations</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {lawyer.specializations.length > 0 ? (
                  lawyer.specializations.map((spec: string) => (
                    <Badge key={spec} variant="secondary" className="px-3 py-1 bg-primary/5 text-primary border-primary/10 hover:bg-primary/10 transition-colors">
                      {spec}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground italic">No specializations defined.</span>
                )}
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-8 space-y-3 pb-8">
              <div className="flex items-center gap-2 border-b pb-2">
                <Info className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-bold uppercase tracking-widest">Professional Bio</h4>
              </div>
              <div className="relative p-4 rounded-xl bg-muted/40 italic text-sm text-foreground/80 leading-relaxed">
                <span className="absolute -top-3 -left-1 text-4xl text-primary/10 font-serif">“</span>
                {lawyer.bio || "This practitioner has not yet completed their professional biography."}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Action Footer (Optional) */}
        {/* You could add Approve/Reject buttons here if this is for the Admin View */}
      </SheetContent>
    </Sheet>
  );
}
