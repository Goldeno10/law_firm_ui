
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Video, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardOverview() {
  const params = useParams();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['dashboard', params.id]); 

  if (!data) return null;

  const { consultation } = data;

  const statusSteps = [
    { label: 'Intake', value: 0 },
    { label: 'Assigned', value: 1 },
    { label: 'Confirmed', value: 3 },
    { label: 'In Progress', value: 4 },
  ];

  const statusMap: Record<number, { label: string; color: string }> = {
    0: { label: 'Reviewing Case', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    1: { label: 'Lawyer Assigned', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    2: { label: 'Awaiting Payment', color: 'bg-rose-100 text-rose-700 border-rose-200' },
    3: { label: 'Confirmed', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    4: { label: 'Consulting', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    5: { label: 'Case Completed', color: 'bg-slate-100 text-slate-700 border-slate-200' }
  };

  const currentStatus = statusMap[consultation.status] || { label: 'Unknown', color: 'bg-slate-100 text-slate-700' };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* 1. Header & Quick Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary uppercase tracking-widest">Client Dashboard</p>
          <h2 className="text-3xl font-extrabold tracking-tight">Case Overview</h2>
        </div>
        <Badge className={cn("px-4 py-1 text-sm font-bold border rounded-full", currentStatus.color)}>
          {currentStatus.label}
        </Badge>
      </div>

      {/* 2. Visual Case Roadmap */}
      <div className="relative flex justify-between w-full px-2 py-8">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2" />
        {statusSteps.map((step, idx) => {
          const isCompleted = consultation.status >= step.value;
          const isCurrent = consultation.status === step.value;
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                isCompleted ? "bg-primary border-primary text-white" : "bg-background border-muted text-muted-foreground",
                isCurrent && "ring-4 ring-primary/20 scale-110"
              )}>
                {isCompleted ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{idx + 1}</span>}
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-tight", isCompleted ? "text-foreground" : "text-muted-foreground")}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. Primary Action: Meeting Link */}
      {consultation.meetingLink ? (
        <Card className="relative overflow-hidden border-emerald-200 bg-emerald-50/50 shadow-lg shadow-emerald-500/5">
          <div className="absolute top-0 left-0 h-full w-1.5 bg-emerald-500" />
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-emerald-200 shadow-lg">
                  <Video size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-emerald-900">Meeting Room Ready</h3>
                  <p className="text-sm text-emerald-700/80 max-w-sm">
                    Your secure video consultation is confirmed. You can join the room 5 minutes before the scheduled time.
                  </p>
                </div>
              </div>
              <a href={consultation.meetingLink} target="_blank" rel="noreferrer" className="w-full md:w-auto">
                <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 px-8">
                  Join Video Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed bg-muted/20">
          <CardContent className="p-8 text-center space-y-3">
             <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                <Clock className="text-muted-foreground" size={24} />
             </div>
             <div className="space-y-1">
                <p className="font-bold">Awaiting Schedule</p>
                <p className="text-sm text-muted-foreground">Your lawyer is currently reviewing the docket. You will receive an email once the time is finalized.</p>
             </div>
          </CardContent>
        </Card>
      )}

      {/* 4. Details Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <User size={16} />
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Assigned Counsel</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{consultation.assignedLawyerName || "Pending..."}</div>
            <p className="text-sm text-muted-foreground mt-1">{consultation.assignedLawyerEmail || "Assigning specialist"}</p>
            {consultation.assignedLawyerName && (
              <Button variant="link" className="px-0 h-auto text-xs mt-4 text-primary">
                View Attorney Profile <ExternalLink size={12} className="ml-1" />
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <Calendar size={16} />
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Appointment</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {consultation.scheduledAt ? new Date(consultation.scheduledAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : "TBD"}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 font-medium">
              <Clock size={14} />
              {consultation.scheduledAt ? new Date(consultation.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Waiting for lawyer"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck size={16} />
              <CardTitle className="text-xs font-bold uppercase tracking-widest">Security Type</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Encrypted Session</div>
            <p className="text-sm text-muted-foreground mt-1">End-to-end 256-bit protected</p>
            <div className="mt-4 flex gap-1">
              <div className="h-1 w-full bg-primary rounded-full" />
              <div className="h-1 w-full bg-primary rounded-full" />
              <div className="h-1 w-full bg-primary rounded-full" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Case Summary */}
      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-muted-foreground" />
            <CardTitle className="text-sm font-bold">Case Statement for Record</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <p className="text-muted-foreground leading-relaxed italic">
            "{consultation.caseDescription}"
          </p>
          <div className="mt-6 p-4 rounded-lg bg-slate-50 border text-[11px] text-slate-500 leading-relaxed uppercase tracking-tight">
            Note: This description was submitted during initial intake. If you have additional documents or updates, please visit the <Link href={`/dashboard/${params.id}/documents`} className="text-primary underline">Documents Tab</Link>.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Simple Helper for the Note Link
function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return <a href={href} className={className}>{children}</a>;
}




// 'use client';

// import { useQueryClient } from '@tanstack/react-query';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';

// export default function DashboardOverview() {
//   const params = useParams();
//   const queryClient = useQueryClient();
//   // Get data cached from layout
//   const data: any = queryClient.getQueryData(['dashboard', params.id]); 

//   if (!data) return null;

//   const { consultation } = data;

//   const statusMap: Record<number, string> = {
//     0: 'Pending', 1: 'Assigned', 2: 'Payment Pending', 3: 'Confirmed', 4: 'In Progress', 5: 'Completed'
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-3xl font-bold tracking-tight">Case Overview</h2>
//         <Badge variant={consultation.status === 3 ? 'default' : 'secondary'} className="text-lg">
//           {statusMap[consultation.status] || 'Unknown'}
//         </Badge>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Assigned Lawyer</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{consultation.assignedLawyerName || "Pending Assignment"}</div>
//             <p className="text-xs text-muted-foreground">{consultation.assignedLawyerEmail}</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Scheduled Time</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {consultation.scheduledAt ? new Date(consultation.scheduledAt).toLocaleDateString() : "Not Scheduled"}
//             </div>
//             <p className="text-xs text-muted-foreground">
//               {consultation.scheduledAt ? new Date(consultation.scheduledAt).toLocaleTimeString() : "Waiting for lawyer"}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {consultation.meetingLink && (
//         <Card className="bg-green-50 border-green-200">
//           <CardHeader><CardTitle>Video Meeting Ready</CardTitle></CardHeader>
//           <CardContent>
//              <p className="mb-4">Your consultation is confirmed. Click below to join at the scheduled time.</p>
//              <a href={consultation.meetingLink} target="_blank" rel="noreferrer">
//                <Button className="bg-green-600 hover:bg-green-700">Join Video Call</Button>
//              </a>
//           </CardContent>
//         </Card>
//       )}

//       <Card>
//         <CardHeader><CardTitle>Case Description</CardTitle></CardHeader>
//         <CardContent>
//           <p>{consultation.caseDescription}</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }