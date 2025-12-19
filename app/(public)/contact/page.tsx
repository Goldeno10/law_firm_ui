import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Info Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Have questions about our portal or need immediate legal assistance? 
              Our administrative team is available 24/7 to direct your inquiry.
            </p>
          </div>

          <div className="grid gap-6">
            {[
              { icon: Phone, title: "Phone", val: "+1 (555) 123-4567" },
              { icon: Mail, title: "Email", val: "contact@lawfirmpro.com" },
              { icon: MapPin, title: "Office", val: "123 Legal Plaza, NY 10001" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl border bg-muted/20">
                <item.icon className="text-primary h-6 w-6" />
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground tracking-widest">{item.title}</p>
                  <p className="font-semibold">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-card border p-8 md:p-12 rounded-3xl shadow-2xl">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">First Name</label>
                <Input placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Email</label>
              <Input type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Message</label>
              <Textarea placeholder="How can we help you?" className="min-h-[150px] resize-none" />
            </div>
            <Button className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/20">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
