'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';
import { toast } from 'sonner';

// Shadcn UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Icons
import { 
  MoreHorizontal, 
  ShieldAlert, 
  User, 
  ShieldCheck, 
  ArrowRightLeft, 
  Gavel, 
  Search, 
  Users, 
  Clock, 
  Scale, 
  LayoutDashboard,
  RefreshCw,
  FileText
} from "lucide-react";

// Shared Modals
import { LawyerDetailSheet } from "@/components/admin/lawyer-detail-sheet";
import { ReassignModal } from "@/components/admin/reassign-modal";
import { CaseDetailSheet } from '@/components/shared/case-detail-sheet';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State Management
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isLawyerSheetOpen, setIsLawyerSheetOpen] = useState(false);
  const [isCaseSheetOpen, setIsCaseSheetOpen] = useState(false);
  const [reassignCaseId, setReassignCaseId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [uRes, cRes] = await Promise.all([
        api.get('/users/admin/users?role=LAWYER'),
        api.get('/consultations/admin?page=1')
      ]);
      setUsers(uRes.data.users);
      setConsultations(cRes.data.data);
    } catch (e) {
      toast.error('Failed to sync administrative ledger.');
    } finally {
      setLoading(false);
    }
  }

  async function toggleVerification(email: string, currentStatus: boolean) {
    try {
      await api.patch('/users/admin/verify-user', { email, isVerified: !currentStatus });
      toast.success(currentStatus ? 'Verification Revoked' : 'Practitioner Verified');
      fetchData();
    } catch (err) {
      toast.error('Identity verification toggle failed.');
    }
  }

  // Quick Stats Calculation
  const stats = [
    { title: 'Pending Intake', val: consultations.filter(c => c.status === 0).length, icon: Clock, color: 'text-amber-500' },
    { title: 'Active Counsel', val: users.filter(u => u.isVerified).length, icon: Users, color: 'text-blue-500' },
    { title: 'Total Matters', val: consultations.length, icon: Scale, color: 'text-emerald-500' },
    { title: 'Awaiting Verification', val: users.filter(u => !u.isVerified).length, icon: ShieldAlert, color: 'text-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      {/* 1. Page Header Area */}
      <div className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-4xl font-black tracking-tighter">FIRM CONSOLE</h1>
              <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-bold tracking-[0.3em]">
                <LayoutDashboard size={14} className="text-primary" />
                Administrative Oversight • 2025 v4.2
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="shadow-sm" onClick={fetchData} disabled={loading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh Ledger
              </Button>
              <Button className="bg-primary font-bold shadow-lg shadow-primary/20">
                Firm Reports
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8">
        {/* 2. Top-Level Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-xl shadow-slate-200/40 dark:shadow-none bg-background">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.title}</p>
                  <p className="text-3xl font-black tracking-tight">{stat.val}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-muted/50 ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3. Main Operational Tabs */}
        <Tabs defaultValue="consultations" className="space-y-8">
          <TabsList className="bg-muted/50 p-1 border rounded-xl w-fit">
            <TabsTrigger value="consultations" className="px-8 font-bold text-xs uppercase tracking-widest">Matters</TabsTrigger>
            <TabsTrigger value="lawyers" className="px-8 font-bold text-xs uppercase tracking-widest">Practitioners</TabsTrigger>
          </TabsList>

          {/* TAB: CASE MANAGEMENT */}
          <TabsContent value="consultations" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-none shadow-2xl overflow-hidden bg-background">
              <CardHeader className="border-b bg-muted/10 pb-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                        <Gavel size={16} className="text-primary" /> Active Case Load
                    </CardTitle>
                    <CardDescription>Monitor intake status and matter assignments.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="font-bold py-5 pl-8 uppercase text-[10px] tracking-wider">Client Identity</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-wider">Practice Area</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-wider">Financial Status</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-wider">Assigned Counsel</TableHead>
                      <TableHead className="text-right font-bold pr-8 uppercase text-[10px] tracking-wider">Operations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations.map((c) => (
                      <TableRow key={c.id} className="group transition-colors hover:bg-muted/20">
                        <TableCell className="font-bold pl-8 text-sm">{c.fullName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-bold text-[10px] bg-background border-slate-200">
                            {c.caseType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={c.payment?.status === 1 ? "default" : "secondary"} 
                            className={c.payment?.status === 1 ? "bg-emerald-500 hover:bg-emerald-500" : "bg-rose-500/10 text-rose-600 border-rose-100 shadow-none"}
                          >
                            {c.payment?.status === 1 ? 'SETTLED' : 'UNPAID'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-medium italic text-muted-foreground">
                          {c.assignedLawyerName || 'Unassigned'}
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 font-bold border-primary/20 text-primary hover:bg-primary hover:text-white"
                                onClick={() => { setSelectedCase(c); setIsCaseSheetOpen(true); }}
                              >
                                <Search className="h-3.5 w-3.5 mr-2" /> View File
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                  <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">Matter Controls</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => setReassignCaseId(c.id)} className="cursor-pointer">
                                    <ArrowRightLeft className="mr-2 h-4 w-4" /> Reassign Counsel
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <FileText className="mr-2 h-4 w-4" /> Archive Record
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: LAWYER MANAGEMENT */}
          <TabsContent value="lawyers" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Card className="border-none shadow-2xl overflow-hidden bg-background">
              <CardHeader className="border-b bg-muted/10 pb-6">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Users size={16} className="text-primary" /> Attorney Directory
                  </CardTitle>
                  <CardDescription>Verify credentials and manage professional access.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead className="font-bold py-5 pl-8 uppercase text-[10px] tracking-wider">Practitioner</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-wider">Contact Ledger</TableHead>
                      <TableHead className="font-bold uppercase text-[10px] tracking-wider">Status</TableHead>
                      <TableHead className="text-right font-bold pr-8 uppercase text-[10px] tracking-wider">Operations</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id} className="group transition-colors hover:bg-muted/20">
                        <TableCell className="pl-8">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary italic">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-sm leading-none mb-1">{u.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Bar #: {u.barNumber || 'TBD'}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-muted-foreground">{u.email}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={u.isVerified ? 'default' : 'secondary'} 
                            className={u.isVerified ? "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/10" : "bg-rose-500/10 text-rose-600 border-rose-100 hover:bg-rose-500/10"}
                          >
                            {u.isVerified ? 'Verified' : 'Review Required'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-60 shadow-xl border-none">
                              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-muted-foreground">Attorney Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => { setSelectedLawyer(u); setIsLawyerSheetOpen(true); }} className="cursor-pointer py-3">
                                <User className="mr-3 h-4 w-4 text-primary" /> View Full Credentials
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {u.isVerified ? (
                                <DropdownMenuItem onClick={() => toggleVerification(u.email, true)} className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 cursor-pointer py-3">
                                  <ShieldAlert className="mr-3 h-4 w-4" /> Revoke Professional Access
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => toggleVerification(u.email, false)} className="text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 cursor-pointer py-3">
                                  <ShieldCheck className="mr-3 h-4 w-4" /> Approve Practitioner
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* DETACHED MODALS & DRILL-DOWN SHEETS */}
      {/* View Details: Slides from Right */}
      <CaseDetailSheet 
        data={selectedCase} 
        open={isCaseSheetOpen} 
        onOpenChange={setIsCaseSheetOpen} 
      />

      {/* Attorney Review: Slides from Right */}
      <LawyerDetailSheet 
        lawyer={selectedLawyer} 
        open={isLawyerSheetOpen} 
        onOpenChange={setIsLawyerSheetOpen} 
      />

      {/* Caseload Transfer: Centered Dialog */}
      <ReassignModal 
        consultationId={reassignCaseId || ''} 
        isOpen={!!reassignCaseId} 
        onClose={() => setReassignCaseId(null)}
        lawyers={users.filter(u => u.isVerified)} 
      />
    </div>
  );
}
