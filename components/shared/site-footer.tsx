import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-950/50">
      <div className="container py-16 px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand & Mission (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 font-bold text-2xl text-primary">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Scale className="h-6 w-6" />
              </div>
              LawFirm Pro
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Providing elite legal counsel with integrated digital security. We combine traditional legal expertise with modern accessibility to resolve your most complex legal challenges.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
            </div>
          </div>

          {/* Practice Areas */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Practice Areas</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/book" className="hover:text-primary transition-colors">Family & Divorce Law</Link></li>
              <li><Link href="/book" className="hover:text-primary transition-colors">Criminal Defense</Link></li>
              <li><Link href="/book" className="hover:text-primary transition-colors">Corporate Litigation</Link></li>
              <li><Link href="/book" className="hover:text-primary transition-colors">Real Estate Law</Link></li>
              <li><Link href="/book" className="hover:text-primary transition-colors">Immigration Services</Link></li>
            </ul>
          </div>

          {/* Quick Support */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Legal Plaza, Suite 500<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>support@lawfirmpro.com</span>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground">Compliance</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Settings</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Disclosures</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground font-medium">
            © {currentYear} LawFirm Pro. Attorney Advertising. Prior results do not guarantee a similar outcome.
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-tighter border rounded px-2 py-1">
                <ShieldCheck size={12} className="text-emerald-500" />
                256-bit SSL Secure
             </div>
             <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
               NMLS ID: 000000
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
