'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import {
    UserPlus,
    Users,
    Loader2,
    ShieldCheck,
    AlertCircle,
    Scale,
    BadgeCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Lawyer {
    id: string;
    name: string;
    email: string;
    isVerified: boolean;
    specializations: string[];
}

interface ReassignModalProps {
    consultationId: string;
    isOpen: boolean;
    onClose: () => void;
    lawyers: Lawyer[];
}

export function ReassignModal({ consultationId, isOpen, onClose, lawyers }: ReassignModalProps) {
    const [selectedLawyerId, setSelectedLawyerId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Find the currently selected lawyer object for the preview UI
    const selectedLawyer = lawyers.find(l => l.id === selectedLawyerId);

    async function handleReassign() {
        if (!selectedLawyerId || !selectedLawyer) return;

        setLoading(true);
        try {
            await api.patch('/consultations/admin/assign', {
                consultationId,
                lawyerEmail: selectedLawyer.email,
                // We keep the current schedule but update the lead counsel
            });

            toast.success(`Matter reassigned to ${selectedLawyer.name}`, {
                description: "The new counsel and the client have been notified via secure mail.",
                icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />
            });

            onClose();
        } catch (e) {
            toast.error('Reassignment failed', {
                description: "Please check your network connection or the lawyer's availability."
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl">
                {/* Top Accent Bar */}
                <div className="h-1.5 w-full bg-primary" />

                <div className="p-6">
                    <DialogHeader className="mb-6">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Scale size={18} />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Administrative Action</span>
                        </div>
                        <DialogTitle className="text-2xl font-bold">Reassign Counsel</DialogTitle>
                        <DialogDescription className="text-sm leading-relaxed">
                            Transfer this matter to a different verified attorney. The previous counsel's access will be revoked immediately.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-2">
                        {/* Lawyer Selection */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                Select Lead Counsel
                            </label>
                            <Select onValueChange={setSelectedLawyerId}>
                                <SelectTrigger className="h-12 border-muted-foreground/20 bg-muted/30 focus:ring-primary">
                                    <SelectValue placeholder="Search available attorneys..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Verified Attorneys</SelectLabel>
                                        {lawyers.filter(l => l.isVerified).map((lawyer) => (
                                            <SelectItem key={lawyer.id} value={lawyer.id} className="py-3">
                                                <div className="flex flex-col">
                                                    <span className="font-bold flex items-center gap-1.5">
                                                        {lawyer.name}
                                                        <BadgeCheck size={14} className="text-emerald-500" />
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                                                        {lawyer.specializations?.join(' • ')}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Selection Preview Card */}
                        {selectedLawyer && (
                            <div className="rounded-xl border bg-primary/5 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                        {selectedLawyer.name.charAt(0)}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-none">{selectedLawyer.name}</p>
                                        <p className="text-xs text-muted-foreground">{selectedLawyer.email}</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {selectedLawyer.specializations.slice(0, 2).map(s => (
                                                <Badge key={s} variant="outline" className="text-[9px] h-4 bg-background">
                                                    {s}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notice Alert */}
                        <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-800">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p className="text-[11px] leading-relaxed">
                                <strong>Attention:</strong> Reassigning a case will reset the meeting permissions. The client will be required to re-verify their identity before the next session.
                            </p>
                        </div>
                    </div>

                    <DialogFooter className="mt-8 gap-2 sm:gap-0">
                        <Button variant="ghost" onClick={onClose} className="font-semibold text-muted-foreground">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleReassign}
                            disabled={loading || !selectedLawyerId}
                            className="px-8 font-bold shadow-lg shadow-primary/20"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating Ledger...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Confirm Transfer
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
