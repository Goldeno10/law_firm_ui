'use client';

import * as React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  User, 
  CreditCard, 
  Clock, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Download,
  ShieldCheck,
  History,
  Scale,
  ExternalLink,
  Gavel
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CaseDetailProps {
  data: any; // Ideally use your Consultation interface
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CaseDetailSheet({ data, open, onOpenChange }: CaseDetailProps) {
  if (!data) return null;

  // 2025 Status Mapping with Semantic Styles
  const statusConfig: Record<number, { label: string; className: string }> = {
    0: { label: 'Pending Intake', className: 'bg-amber-100 text-amber-700 border-amber-200' },
    1: { label: 'Counsel Assigned', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    2: { label: 'Payment Pending', className: 'bg-rose-100 text-rose-700 border-rose-200' },
    3: { label: 'Confirmed', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    4: { label: 'In Progress', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    5: { label: 'Completed', className: 'bg-slate-100 text-slate-700 border-slate-200' },
    6: { label: 'Void/Cancelled', className: 'bg-red-100 text-red-700 border-red-200' },
  };

  const currentStatus = statusConfig[data.status] || statusConfig[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col h-full p-0 border-l shadow-2xl">
        {/* Top Professional Accent */}
        <div className="h-1.5 w-full bg-primary" />

        <div className="p-6 flex flex-col flex-1 overflow-hidden">
          <SheetHeader className="space-y-4 mb-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.2em]">
                  <Scale size={14} />
                  Legal Matter File
                </div>
                <SheetTitle className="text-2xl font-black tracking-tight">
                  {data.caseType} Consultation
                </SheetTitle>
              </div>
              <Badge className={cn("px-3 py-1 font-bold border rounded-full", currentStatus.className)}>
                {currentStatus.label}
              </Badge>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md border border-dashed">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <SheetDescription className="text-[11px] font-mono uppercase tracking-tighter">
                    REF-ID: {data.verificationId}
                </SheetDescription>
            </div>
          </SheetHeader>

          <Tabs defaultValue="details" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50 h-11 p-1">
              <TabsTrigger value="details" className="font-bold text-xs uppercase tracking-widest">General</TabsTrigger>
              <TabsTrigger value="documents" className="font-bold text-xs uppercase tracking-widest">Evidence</TabsTrigger>
              <TabsTrigger value="timeline" className="font-bold text-xs uppercase tracking-widest">History</TabsTrigger>
            </TabsList>

            {/* TAB 1: CORE DETAILS */}
            <TabsContent value="details" className="flex-1 mt-6 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-8 pb-10">
                  
                  {/* Client Identification */}
                  <section className="space-y-4">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                      <User size={14} className="text-primary" /> Client Profile
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex flex-col p-4 rounded-xl border bg-card shadow-sm">
                        <span className="text-lg font-bold">{data.fullName}</span>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail size={12} /> {data.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={12} /> {data.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Appointment Details */}
                  <section className="space-y-4">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                      <Calendar size={14} className="text-primary" /> Schedule & Assignment
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Date & Time</span>
                        <p className="text-sm font-bold">
                          {data.scheduledAt ? new Date(data.scheduledAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'TBD'}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Counsel</span>
                        <p className="text-sm font-bold truncate">{data.assignedLawyerName || 'Unassigned'}</p>
                      </div>
                    </div>
                  </section>

                  {/* Fact Summary */}
                  <section className="space-y-4">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                      <Gavel size={14} className="text-primary" /> Matter Statement
                    </h3>
                    <div className="p-5 rounded-xl border bg-card leading-relaxed text-sm italic text-foreground/80">
                      "{data.caseDescription}"
                    </div>
                  </section>

                  {/* Financial Audit */}
                  <section className="space-y-4">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] flex items-center gap-2">
                      <CreditCard size={14} className="text-primary" /> Billing Audit
                    </h3>
                    <div className={cn(
                      "flex items-center justify-between p-4 rounded-xl border shadow-sm",
                      data.payment?.status === 1 ? "bg-emerald-50/50 border-emerald-100" : "bg-rose-50/50 border-rose-100"
                    )}>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-tighter">Total Fee Invoiced</span>
                        <p className="text-xl font-black">
                           {data.payment?.currency} {(data.payment?.amount / 100).toLocaleString()}
                        </p>
                      </div>
                      <Badge className={cn("font-bold", data.payment?.status === 1 ? "bg-emerald-600" : "bg-rose-600")}>
                        {data.payment?.status === 1 ? 'SETTLED' : 'UNPAID'}
                      </Badge>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* TAB 2: EVIDENCE VAULT */}
            <TabsContent value="documents" className="flex-1 mt-6 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                {(!data.documents || data.documents.length === 0) ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3 border-2 border-dashed rounded-2xl">
                    <FileText size={40} className="opacity-20" />
                    <p className="text-sm font-medium">No evidentiary files uploaded.</p>
                  </div>
                ) : (
                  <div className="space-y-3 pb-10">
                    {data.documents.map((doc: any, i: number) => (
                      <div key={i} className="group flex items-center justify-between p-4 border rounded-xl bg-card hover:border-primary/50 transition-all shadow-sm">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
                            <FileText size={20} />
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-bold truncate max-w-[240px]">{doc.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-tight">
                              Source: {doc.uploadedBy} • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                            <a href={doc.url} target="_blank" rel="noreferrer">
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                    <ExternalLink size={16} />
                                </Button>
                            </a>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                                <Download size={16} />
                            </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            {/* TAB 3: CASE LOGS */}
            <TabsContent value="timeline" className="flex-1 mt-6 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6 pb-10 ml-4 border-l-2 border-muted pl-6">
                  {/* Logic for 2025: Generating a dummy timeline if real logs don't exist */}
                  <TimelineItem 
                    icon={<Clock />} 
                    title="Case Initiated" 
                    time={new Date(data.createdAt).toLocaleString()} 
                    description="Initial intake form submitted via web portal."
                    isFirst
                  />
                  {data.status >= 1 && (
                    <TimelineItem 
                        icon={<User />} 
                        title="Counsel Assigned" 
                        time="Matter updated" 
                        description={`Assigned to ${data.assignedLawyerName}.`}
                    />
                  )}
                  {data.payment?.status === 1 && (
                    <TimelineItem 
                        icon={<CreditCard />} 
                        title="Payment Secured" 
                        time="Transaction Complete" 
                        description="Professional fees settled via secure gateway."
                    />
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Action Footer */}
          <div className="mt-6 pt-6 border-t flex gap-3">
             <Button variant="outline" className="flex-1 h-11 font-bold" onClick={() => onOpenChange(false)}>
                Close File
             </Button>
             <Button className="flex-1 h-11 font-bold shadow-lg shadow-primary/20">
                Generate Report
             </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Helper component for the Timeline
function TimelineItem({ icon, title, time, description, isFirst = false }: any) {
    return (
        <div className="relative">
            <div className={cn(
                "absolute -left-[35px] top-1 h-4 w-4 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[8px] text-primary",
                isFirst && "ring-4 ring-primary/10"
            )}>
                {React.cloneElement(icon, { size: 10 })}
            </div>
            <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-foreground">{title}</p>
                <p className="text-[10px] text-muted-foreground font-mono">{time}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">{description}</p>
            </div>
        </div>
    )
}
