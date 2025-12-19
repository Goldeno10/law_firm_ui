'use client';

import { useRegisterLawyer } from '@/hooks/use-auth';
import { lawyerRegistrationSchema, LawyerRegistrationValues } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    BadgeCheck,
    Briefcase,
    ChevronLeft,
    Gavel,
    Info,
    Loader2,
    Lock,
    Mail,
    Scale,
    User
} from 'lucide-react';

const SPECIALIZATIONS = [
  { id: 'FAMILY', label: 'Family Law' },
  { id: 'CRIMINAL', label: 'Criminal Defense' },
  { id: 'PROPERTY', label: 'Real Estate / Property' },
  { id: 'CORPORATE', label: 'Corporate Law' },
  { id: 'IMMIGRATION', label: 'Immigration' },
  { id: 'INTELLECTUAL_PROPERTY', label: 'Intellectual Property' },
];

export default function RegisterPage() {
  const mutation = useRegisterLawyer();

  const form = useForm<LawyerRegistrationValues>({
    resolver: zodResolver(lawyerRegistrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      barNumber: '',
      yearsOfExperience: 0,
      specializations: [],
      bio: '',
    },
  });

  function onSubmit(data: LawyerRegistrationValues) {
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Top Navigation */}
        <div className="mb-8 flex items-center justify-between">
           <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <span className="font-bold tracking-tight">LawFirm Pro</span>
          </div>
        </div>

        <Card className="border-none shadow-2xl overflow-hidden">
          <div className="h-2 bg-primary" /> {/* Accented top border */}
          <CardHeader className="space-y-4 pt-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Gavel className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight">Professional Onboarding</CardTitle>
              <CardDescription className="max-w-md mx-auto text-base">
                Join our elite legal network. Provide your credentials for administrative verification.
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* ACCOUNT IDENTITIY SECTION */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <User className="h-4 w-4 text-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Account Identity</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Legal Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/40" />
                              <Input placeholder="Harvey Specter" className="pl-10" {...field} />
                            </div>
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
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/40" />
                              <Input placeholder="h.specter@firm.com" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secure Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/40" />
                            <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                {/* LEGAL CREDENTIALS SECTION */}
                <section className="space-y-4 pt-4">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Verification & Credentials</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="barNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bar License Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/40" />
                              <Input placeholder="NY-12345-AB" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Verification takes 24-48 hours.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="yearsOfExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (Years)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/40" />
                              <Input type="number" min={0} className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="specializations"
                    render={() => (
                      <FormItem className="space-y-4">
                        <div>
                          <FormLabel className="text-base">Practice Specializations</FormLabel>
                          <FormDescription>Select all areas that apply to your current practice.</FormDescription>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SPECIALIZATIONS.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="specializations"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(field.value?.filter((val) => val !== item.id))
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-medium cursor-pointer text-sm w-full">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                {/* PROFESSIONAL BIO */}
                <section className="space-y-4 pt-4">
                  <div className="flex items-center gap-2 border-b pb-2">
                    <Info className="h-4 w-4 text-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Professional Background</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Bio / Experience Overview</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Highlight your educational background and notable past successes..." 
                            className="min-h-[120px] resize-none focus-visible:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-12 text-md font-bold shadow-xl shadow-primary/20" disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      'Apply for Access'
                    )}
                  </Button>
                  <p className="mt-4 text-center text-[10px] text-muted-foreground">
                    By applying, you consent to our background verification process and agree to our <br />
                    <Link href="#" className="underline hover:text-primary">Professional Conduct Agreement</Link>.
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="bg-muted/50 border-t py-6 flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/portal/login" className="font-bold text-primary hover:underline">
                Sign in to Portal
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
