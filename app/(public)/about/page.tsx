import { Scale, Users, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
      {/* Mission Section */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge className="bg-primary/10 text-primary border-none">Founded 2015</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Justice, Enhanced by <span className="text-primary">Technology.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            LawFirm Pro was founded on a simple premise: the legal system is often too slow and too opaque. 
            By combining veteran legal expertise with cutting-edge digital infrastructure, we provide 
            representation that is as agile as the modern world.
          </p>
        </div>
        <div className="aspect-video bg-muted rounded-3xl flex items-center justify-center border-8 border-white shadow-2xl overflow-hidden">
             <div className="text-muted-foreground text-sm italic">Professional Office Photography Placeholder</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y py-12">
        {[
          { label: "Cases Won", val: "10k+", icon: Scale },
          { label: "Active Lawyers", val: "150+", icon: Users },
          { label: "Global Offices", val: "12", icon: Globe },
          { label: "Industry Awards", val: "45", icon: Award },
        ].map((stat, i) => (
          <div key={i} className="text-center space-y-2">
            <div className="mx-auto bg-primary/5 text-primary w-12 h-12 flex items-center justify-center rounded-full mb-2">
              <stat.icon size={20} />
            </div>
            <p className="text-3xl font-bold tracking-tight">{stat.val}</p>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${className}`}>{children}</span>;
}
