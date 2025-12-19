'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Video, FileText, Search, Scale, Clock, Calendar } from 'lucide-react';
import { CaseDetailSheet } from '@/components/shared/case-detail-sheet';
import { Badge } from '@/components/ui/badge';

export default function LawyerDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isCaseSheetOpen, setIsCaseSheetOpen] = useState(false);

  useEffect(() => {
    api.get('/consultations/admin?page=1').then(res => setCases(res.data.data));
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center gap-4 mb-8">
         <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
            <Scale size={28} />
         </div>
         <h1 className="text-3xl font-black tracking-tight">Attorney Workspace</h1>
      </div>

      <Card className="border-none shadow-xl">
        <CardHeader className="bg-muted/10 border-b">
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <FileText size={16} className="text-primary" /> Current Docket
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="font-bold">Client</TableHead>
                <TableHead className="font-bold">Schedule</TableHead>
                <TableHead className="text-right font-bold">Preparation & Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((c) => (
                <TableRow key={c.id} className="group hover:bg-muted/20 transition-colors">
                  <TableCell className="font-bold py-4">{c.fullName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs font-medium">
                        <span className="flex items-center gap-1.5"><Calendar size={12}/> {c.scheduledAt ? new Date(c.scheduledAt).toLocaleDateString() : 'TBD'}</span>
                        <span className="flex items-center gap-1.5 text-muted-foreground"><Clock size={12}/> {c.scheduledAt ? new Date(c.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Waiting'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        {/* Preparation: Open the Case Detail Sheet */}
                        <Button variant="ghost" size="sm" className="font-bold hover:bg-primary/10 hover:text-primary" onClick={() => { setSelectedCase(c); setIsCaseSheetOpen(true); }}>
                            <Search className="h-4 w-4 mr-2" /> Review Files
                        </Button>
                        
                        {/* Execution: Start Meeting */}
                        {c.status >= 3 && (
                            <Button size="sm" className="bg-primary font-bold shadow-md shadow-primary/10 transition-all hover:scale-[1.02]">
                                <Video className="h-4 w-4 mr-2" /> Start Meeting
                            </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* SHARED CASE FILE MODAL */}
      <CaseDetailSheet 
        data={selectedCase} 
        open={isCaseSheetOpen} 
        onOpenChange={setIsCaseSheetOpen} 
      />
    </div>
  );
}


// 'use client';

// import { useEffect, useState } from 'react';
// import { api } from '@/lib/axios';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { 
//   Video, 
//   Calendar, 
//   User, 
//   FileText, 
//   Clock, 
//   ExternalLink, 
//   AlertCircle,
//   CheckCircle2,
//   MoreVertical,
//   Scale
// } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { toast } from 'sonner';

// export default function LawyerDashboard() {
//   const [cases, setCases] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
//     fetchCases();
//   }, []);

//   const fetchCases = async () => {
//     setLoading(true);
//     try {
//       // In a real app, this endpoint should be filtered for the logged-in lawyer
//       const res = await api.get('/consultations/admin?page=1');
//       setCases(res.data.data);
//     } catch (err) {
//       toast.error("Could not sync your case files.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   async function getHostLink(consultationId: string) {
//     try {
//       toast.info("Preparing secure meeting room...");
//       const res = await api.get(`/meetings/start/${consultationId}`);
//       window.open(res.data.startUrl, '_blank');
//     } catch (err) {
//       toast.error("Failed to generate meeting link.");
//     }
//   }

//   // Find the next upcoming case for the Hero section
//   const nextCase = cases.find(c => c.status >= 3 && c.scheduledAt);

//   return (
//     <div className="min-h-screen bg-muted/20">
//       {/* Header */}
//       <header className="bg-background border-b sticky top-0 z-10">
//         <div className="container mx-auto py-4 px-6 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="bg-primary text-primary-foreground p-1.5 rounded">
//               <Scale size={20} />
//             </div>
//             <h1 className="text-xl font-bold tracking-tight">Attorney Workspace</h1>
//           </div>
//           <div className="flex items-center gap-4">
//              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
//                <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
//                Verified Account
//              </Badge>
//              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs">
//                JD
//              </div>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto py-8 px-4 sm:px-6 space-y-8">
        
//         {/* Next Meeting Hero */}
//         {nextCase && (
//           <Card className="border-none shadow-lg bg-slate-900 text-white overflow-hidden">
//             <CardContent className="p-0">
//               <div className="grid md:grid-cols-3">
//                 <div className="p-8 md:col-span-2 space-y-4">
//                   <Badge className="bg-primary text-white border-none">Next Up</Badge>
//                   <h2 className="text-3xl font-bold">Meeting with {nextCase.fullName}</h2>
//                   <div className="flex flex-wrap gap-4 text-slate-300">
//                     <div className="flex items-center gap-1.5 text-sm">
//                       <Clock size={16} />
//                       {new Date(nextCase.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </div>
//                     <div className="flex items-center gap-1.5 text-sm">
//                       <Calendar size={16} />
//                       {new Date(nextCase.scheduledAt).toLocaleDateString()}
//                     </div>
//                     <div className="flex items-center gap-1.5 text-sm text-primary font-medium">
//                       <FileText size={16} />
//                       {nextCase.caseType}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="bg-slate-800 p-8 flex flex-col justify-center items-center md:items-end">
//                    <Button 
//                     size="lg" 
//                     onClick={() => getHostLink(nextCase.id)}
//                     className="w-full md:w-auto h-14 px-8 text-lg font-bold shadow-2xl shadow-primary/20"
//                    >
//                      <Video className="mr-2 h-5 w-5" />
//                      Join Meeting
//                    </Button>
//                    <p className="mt-2 text-xs text-slate-400 text-center md:text-right">
//                      Client is notified and awaiting your arrival.
//                    </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Main Case List */}
//           <div className="lg:col-span-3">
//             <Card className="border-none shadow-sm">
//               <CardHeader className="flex flex-row items-center justify-between">
//                 <div>
//                   <CardTitle>Case Docket</CardTitle>
//                   <CardDescription>Manage and review your active legal consultations.</CardDescription>
//                 </div>
//                 <Button variant="outline" size="sm" onClick={fetchCases}>
//                   Sync Cases
//                 </Button>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-muted/50 hover:bg-muted/50">
//                       <TableHead className="w-[200px]">Client Name</TableHead>
//                       <TableHead>Case Details</TableHead>
//                       <TableHead>Schedule</TableHead>
//                       <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {loading ? (
//                        <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Loading docket...</TableCell></TableRow>
//                     ) : cases.length === 0 ? (
//                        <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">No assigned cases found.</TableCell></TableRow>
//                     ) : cases.map((c) => (
//                       <TableRow key={c.id} className="group transition-colors hover:bg-muted/30">
//                         <TableCell>
//                           <div className="flex items-center gap-3">
//                             <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs italic">
//                               {c.fullName.charAt(0)}
//                             </div>
//                             <span className="font-semibold text-sm">{c.fullName}</span>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <div className="flex flex-col gap-1">
//                             <span className="text-xs font-bold text-primary uppercase tracking-tighter">{c.caseType}</span>
//                             <p className="text-sm text-muted-foreground line-clamp-1 line-break-words text-wrap">
//                               "{c.caseDescription}"
//                             </p>
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           {c.scheduledAt ? (
//                             <div className="flex flex-col">
//                               <span className="text-sm font-medium">{new Date(c.scheduledAt).toLocaleDateString()}</span>
//                               <span className="text-xs text-muted-foreground">{new Date(c.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
//                             </div>
//                           ) : (
//                             <Badge variant="outline" className="text-[10px] uppercase font-bold">Unscheduled</Badge>
//                           )}
//                         </TableCell>
//                         <TableCell className="text-right">
//                           <div className="flex justify-end gap-2">
//                              {c.status >= 3 ? (
//                                <Button 
//                                 variant="default" 
//                                 size="sm" 
//                                 className="h-8 px-4"
//                                 onClick={() => getHostLink(c.id)}
//                                >
//                                  <Video className="h-3 w-3 mr-2" />
//                                  Join
//                                </Button>
//                              ) : (
//                                <Button variant="outline" size="sm" className="h-8 px-4">
//                                  <FileText className="h-3 w-3 mr-2" />
//                                  Review
//                                </Button>
//                              )}
//                              <Button variant="ghost" size="icon" className="h-8 w-8">
//                                <MoreVertical size={14} />
//                              </Button>
//                           </div>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Sidebar Stats/Tips */}
//           <div className="space-y-6">
//             <Card className="border-none shadow-sm bg-primary text-primary-foreground">
//               <CardHeader>
//                 <CardTitle className="text-lg flex items-center gap-2 font-bold">
//                   <CheckCircle2 size={18} />
//                   Daily Quota
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-3xl font-bold mb-1">{cases.filter(c => c.status >= 3).length} / 5</div>
//                 <p className="text-xs opacity-80 uppercase tracking-widest font-semibold">Consultations Today</p>
//               </CardContent>
//             </Card>

//             <Card className="border-none shadow-sm">
//               <CardHeader>
//                 <CardTitle className="text-sm font-bold flex items-center gap-2">
//                   <AlertCircle size={16} className="text-amber-500" />
//                   Lawyer Tip
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="text-xs text-muted-foreground leading-relaxed">
//                 Ensure your camera and microphone are tested 5 minutes before each consultation. Recorded sessions are automatically uploaded to the client file.
//               </CardContent>
//             </Card>

//             <Button variant="outline" className="w-full border-dashed h-12 text-muted-foreground hover:text-primary">
//               <Calendar className="mr-2 h-4 w-4" />
//               Manage Availability
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }