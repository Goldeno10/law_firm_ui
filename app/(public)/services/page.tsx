import { Button } from '@/components/ui/button';
import { Clock, ShieldCheck, Video, Zap } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: "Virtual Consultations",
    description: "Meet with top-tier attorneys from the comfort of your home via our encrypted video platform.",
    icon: Video,
  },
  {
    title: "24/7 Document Access",
    description: "Access your case files, evidence, and court filings anytime through your secure client vault.",
    icon: ShieldCheck,
  },
  {
    title: "Rapid Case Intake",
    description: "Our AI-assisted intake process ensures your case is reviewed by a specialist within 24 hours.",
    icon: Zap,
  },
  {
    title: "Transparent Billing",
    description: "View real-time invoice updates and pay securely via Stripe with no hidden administrative fees.",
    icon: Clock,
  }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Modern Legal Services</h1>
        <p className="text-lg text-muted-foreground">
          We’ve redesigned the legal experience to be faster, more transparent, and accessible from anywhere.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {services.map((service, i) => (
          <div key={i} className="flex gap-6 p-8 rounded-2xl border bg-card hover:shadow-xl transition-all">
            <div className="bg-primary/10 text-primary p-3 h-fit rounded-xl">
              <service.icon size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold">Ready to modernize your legal journey?</h2>
          <Link href="/book">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 h-14 text-lg font-bold">
              Start Your Consultation
            </Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
