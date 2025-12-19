import { Gavel, Heart, Building2, Briefcase, Landmark, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

const practices = [
  { name: "Family Law", icon: Heart, slug: "family" },
  { name: "Criminal Defense", icon: Gavel, slug: "criminal" },
  { name: "Corporate Law", icon: Building2, slug: "corporate" },
  { name: "Real Estate", icon: Landmark, slug: "real-estate" },
  { name: "Employment", icon: Briefcase, slug: "employment" },
  { name: "Cybersecurity", icon: ShieldAlert, slug: "cyber" },
];

export default function PracticesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-16">
        <h1 className="text-4xl font-extrabold mb-4">Practice Areas</h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          Our specialists are divided into dedicated practice groups to ensure you receive the most relevant expertise for your case.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {practices.map((p, i) => (
          <Link key={i} href={`/book?type=${p.slug}`}>
            <div className="group p-8 rounded-2xl border bg-card hover:bg-primary transition-all duration-300">
              <p.icon size={40} className="text-primary group-hover:text-white transition-colors mb-6" />
              <h3 className="text-2xl font-bold group-hover:text-white transition-colors mb-2">{p.name}</h3>
              <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors text-sm">
                Expert representation and strategic advice tailored to your {p.name.toLowerCase()} needs.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
