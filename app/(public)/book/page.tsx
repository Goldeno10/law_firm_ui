'use client';

import { useCreateConsultation } from '@/hooks/use-booking';
import { BookingFormValues, bookingSchema } from '@/lib/schemas/booking';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { FileUpload } from "@/components/shared/file-upload";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from "@/components/ui/slider";
import { Textarea } from '@/components/ui/textarea';
import {
  Briefcase,
  ChevronLeft,
  Clock,
  FileUp,
  Loader2,
  ShieldCheck,
  User
} from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const router = useRouter();
  const mutation = useCreateConsultation();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      caseDescription: '',
      duration: 30,
      documentUrl: '',
    },
  });

  // Dynamic Price Calculation
  const duration = form.watch('duration') || 30;
  const price = (duration / 30) * 20000;

  function onSubmit(data: BookingFormValues) {
    mutation.mutate(data, {
      onSuccess: (response) => {
        router.push(`/dashboard/${response.verificationId}`);
      },
    });
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-12 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Intake Portal
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Intake Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <CardHeader className="bg-primary/5 pb-8 border-b">
                <CardTitle className="text-2xl font-bold">Consultation Booking</CardTitle>
                <CardDescription>
                  Provide your details below.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                    {/* SECTION 1: IDENTITY */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <User className="h-4 w-4 text-primary" />
                        <h3 className="text-xs font-bold uppercase tracking-widest">Personal Information</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Harvey Specter" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="h.specter@firm.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* SECTION 2: DURATION & PRICING */}
                    <div className="space-y-6 bg-muted/30 p-6 rounded-2xl border border-dashed border-primary/20">
                      <div className="flex justify-between items-end mb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Appointment Length</h3>
                          </div>
                          <p className="text-sm text-muted-foreground italic">₦20,000 per 30-minute block</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black tracking-tighter text-primary">₦{price.toLocaleString()}</p>
                          <p className="text-xs font-bold text-muted-foreground uppercase">{duration} Minutes</p>
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Slider
                                min={30}
                                max={180}
                                step={30}
                                defaultValue={[30]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                                className="py-4"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* SECTION 3: CASE DATA & UPLOAD */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 border-b pb-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <h3 className="text-xs font-bold uppercase tracking-widest">Case Files & Evidence</h3>
                      </div>

                      <FormField
                        control={form.control}
                        name="caseDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Situation Summary</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe your legal issue in detail..."
                                className="min-h-[150px] resize-none focus-visible:ring-primary"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <FileUp className="h-4 w-4 text-primary" />
                            <FormLabel className="text-sm font-semibold">Supporting Documents (Optional)</FormLabel>
                        </div>
                        <FileUpload
                          onUploadComplete={(url) => form.setValue('documentUrl', url)}
                        />
                        <p className="text-[10px] text-muted-foreground italic">
                            Accepted: PDF, DOCX, JPG.
                        </p>
                      </div>
                    </div>

                    <Button type="submit" className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98]" disabled={mutation.isPending}>
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Confirm & Proceed'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <Card className="bg-slate-900 text-white border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>By submitting this form, you initiate an intake process.</p>
              </CardContent>
            </Card>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Payment Notice</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    The total fee displayed is an estimate for the initial consultation.
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}