'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getGoogleCalendarUrl } from '@/lib/calender';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import {
    AlertCircle,
    Calendar,
    Camera,
    CheckCircle2,
    Clock,
    ExternalLink,
    HelpCircle,
    Mic,
    ShieldCheck,
    User,
    Video,
    Lock
} from 'lucide-react';
import { useParams } from 'next/navigation';

export default function MeetingPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['dashboard', params.id]);

  if (!data) return (
    <div className="flex h-64 items-center justify-center">
      <Clock className="mr-2 h-5 w-5 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">Syncing meeting data...</p>
    </div>
  );

  const { consultation } = data;
  const meetingReady = consultation.status >= 3 && consultation.meetingLink;
  const scheduledDate = consultation.scheduledAt ? new Date(consultation.scheduledAt) : null;

  const googleUrl = scheduledDate ? getGoogleCalendarUrl({
    title: `Legal Consultation: ${consultation.assignedLawyerName}`,
    description: `Secure Consultation regarding ${consultation.caseType} case. Case ID: ${params.id}`,
    start: consultation.scheduledAt,
    durationMinutes: 60
  }) : '#';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary uppercase tracking-widest">Virtual Courtroom</p>
          <h2 className="text-3xl font-extrabold tracking-tight">Secure Conference Room</h2>
        </div>
        <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 py-1.5 px-3">
                <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                End-to-End Encrypted
            </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Left: Meeting Details & Action */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-xl overflow-hidden">
            <div className={cn("h-2 w-full", meetingReady ? "bg-emerald-500" : "bg-primary")} />
            <CardHeader className="bg-muted/30">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">Consultation: {consultation.caseType}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5" />
                    Counsel: {consultation.assignedLawyerName || "Pending Assignment"}
                  </CardDescription>
                </div>
                {meetingReady ? (
                  <Badge className="bg-emerald-600 text-white animate-pulse">Live Link Active</Badge>
                ) : (
                  <Badge variant="secondary" className="font-bold">Scheduled</Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-8 space-y-8">
              {/* Date/Time Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg shadow-primary/20">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none mb-1">Date</p>
                    <p className="font-bold text-lg">
                      {scheduledDate?.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) || "Pending"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg shadow-primary/20">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none mb-1">Time</p>
                    <p className="font-bold text-lg">
                      {scheduledDate?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "Not Set"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Check Section */}
              <div className="rounded-xl border p-6 bg-slate-50 dark:bg-slate-900/50">
                 <h4 className="font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Technical Readiness Check
                 </h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Camera className="h-4 w-4" /> Camera Access
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mic className="h-4 w-4" /> Microphone Check
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <ShieldCheck className="h-4 w-4" /> Secure ID Ready
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Video className="h-4 w-4" /> Stable Wi-Fi
                    </div>
                 </div>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/30 py-8 border-t">
              {meetingReady ? (
                <div className="w-full space-y-4">
                  <a href={consultation.meetingLink} target="_blank" rel="noreferrer" className="block w-full">
                    <Button size="lg" className="w-full text-xl h-16 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 font-extrabold group transition-all">
                      Launch Secure Video Meeting 
                      <ExternalLink className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                    <Lock size={12} className="text-emerald-500" />
                    This link is unique to you and should not be shared.
                  </p>
                </div>
              ) : (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <AlertTitle className="text-amber-800 font-bold">Meeting Room Locked</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    The join link will appear automatically 5 minutes before your scheduled time. Ensure your payment is finalized to unlock access.
                  </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* 3. Right: Sidebar Support & Calendar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Schedule Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Add this appointment to your calendar to receive notifications on your phone and computer.
              </p>
              {scheduledDate && (
                <a href={googleUrl} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="w-full font-bold h-11">
                    <Calendar className="mr-2 h-4 w-4" />
                    Sync to Google
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                Urgent Assistance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                If the attorney has not joined within 10 minutes, or you face technical issues, please contact our support desk immediately.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="text-slate-500 font-bold uppercase tracking-tighter">Phone</span>
                    <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-tighter">Reference</span>
                    <span className="font-mono text-[10px] text-primary">#{params.id?.slice(0, 8)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
