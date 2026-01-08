'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Clock,
  Gavel,
  Scale,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.6 } 
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative py-24 lg:py-32 overflow-hidden border-b">
          <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left Content with Staggered Animation */}
            <motion.div 
              className="flex flex-col items-start gap-6 text-left"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary/10 text-primary">
                v2.0 Now Live — Secure Legal Access
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl font-extrabold tracking-tight sm:text-6xl">
                Premier Legal Expertise <br />
                <span className="text-primary">At Your Fingertips.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="max-w-[550px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                Connect with specialist attorneys instantly. Manage your entire case 
                through a secure dashboard designed for modern legal needs.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/book">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="h-12 px-8 text-md font-semibold group w-full sm:w-auto">
                      Start Your Case 
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-md w-full sm:w-auto">
                    View Practice Areas
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-slate-200" />
                  ))}
                </div>
                <p>Trusted by <span className="font-bold text-foreground">2,500+</span> clients nationwide</p>
              </motion.div>
            </motion.div>

            {/* Right Image/Graphic */}
            <motion.div 
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
               <motion.div 
                 className="border rounded-2xl bg-card p-4 shadow-2xl relative"
                 animate={{ y: [0, -10, 0] }} // Floating animation
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               >
                  <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
                    <Gavel className="h-20 w-20 text-muted/50" />
                  </div>
               </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. TRUST STATISTICS */}
        <section className="py-12 bg-muted/30 border-b">
          <div className="container">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                { val: "98%", label: "Success Rate" },
                { val: "15min", label: "Avg. Response" },
                { val: "500+", label: "Expert Lawyers" },
                { val: "Zero", label: "Hidden Fees" },
              ].map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <p className="text-3xl font-bold">{stat.val}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. FEATURES SECTION */}
        <section id="features" className="py-24 container">
          <motion.div 
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Comprehensive Legal Features</h2>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Everything you need to handle complex legal matters without the traditional paperwork headache.
            </p>
          </motion.div>

          <motion.div 
            className="grid gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Clock, title: "Fast Booking", desc: "Sync with attorney calendars in real-time. Choose a time that suits your schedule without the back-and-forth emails." },
              { icon: ShieldCheck, title: "Secure Portal", desc: "Your data is protected by AES-256 encryption. Access case files, billing, and updates via a secure, private dashboard." },
              { icon: Scale, title: "Expert Matching", desc: "Our algorithm analyzes your case requirements to match you with a lawyer specializing in your specific jurisdiction." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -5 }} // Slight lift on hover
                className="group relative rounded-xl border bg-card p-8 transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 5. HOW IT WORKS (Process Section) */}
        <section id="process" className="py-24 bg-slate-950 text-slate-50">
          <div className="container">
            <motion.div 
              className="text-center mb-16 space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
              <p className="text-slate-400">Three simple steps to professional legal resolution.</p>
            </motion.div>

            <motion.div 
              className="grid gap-12 md:grid-cols-3 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                { id: 1, title: "Submit Details", desc: "Tell us about your case through our intuitive, guided form." },
                { id: 2, title: "Consult Expert", desc: "Meet your lawyer via encrypted video call or in-person meeting." },
                { id: 3, title: "Resolve Case", desc: "Track progress, sign documents, and finalize your legal matters." }
              ].map((step) => (
                <motion.div key={step.id} variants={fadeInUp} className="flex flex-col items-center text-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold ring-8 ring-primary/20">
                    {step.id}
                  </div>
                  <h4 className="text-xl font-semibold">{step.title}</h4>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 6. CALL TO ACTION SECTION */}
        <section className="py-24 container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="rounded-3xl bg-primary px-8 py-16 text-primary-foreground text-center space-y-8 shadow-2xl relative overflow-hidden"
          >
             {/* Decorative Background Elements */}
             <motion.div 
               animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" 
             />
             
             <h2 className="text-3xl font-bold sm:text-5xl max-w-2xl mx-auto leading-tight relative z-10">
               Ready to discuss your case with a professional?
             </h2>
             <p className="text-primary-foreground/80 max-w-lg mx-auto text-lg relative z-10">
               Consultations are confidential and our team is ready to provide the guidance you need.
             </p>
             <div className="flex justify-center gap-4 relative z-10">
               <Link href="/book">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="secondary" className="font-bold px-10">
                    Book Consultation Now
                  </Button>
                </motion.div>
               </Link>
             </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}



// 'use client';

// import { Button } from '@/components/ui/button';
// import {
//   ArrowRight,
//   Clock,
//   Gavel,
//   Scale,
//   ShieldCheck
// } from 'lucide-react';
// import Link from 'next/link';

// export default function LandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-background">

//       <main className="flex-1">
//         {/* 2. HERO SECTION */}
//         <section className="relative py-24 lg:py-32 overflow-hidden border-b">
//           <div className="container relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
//             <div className="flex flex-col items-start gap-6 text-left">
//               <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
//                 v2.0 Now Live — Secure Legal Access
//               </div>
//               <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
//                 Premier Legal Expertise <br />
//                 <span className="text-primary">At Your Fingertips.</span>
//               </h1>
//               <p className="max-w-[550px] text-muted-foreground text-lg md:text-xl leading-relaxed">
//                 Connect with specialist attorneys instantly. Manage your entire case 
//                 through a secure dashboard designed for modern legal needs.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                 <Button size="lg" className="h-12 px-8 text-md font-semibold group">
//                   Start Your Case 
//                   <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 </Button>
//                 <Button size="lg" variant="outline" className="h-12 px-8 text-md">
//                   View Practice Areas
//                 </Button>
//               </div>
//               <div className="flex items-center gap-4 text-sm text-muted-foreground">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-slate-200" />
//                   ))}
//                 </div>
//                 <p>Trusted by <span className="font-bold text-foreground">2,500+</span> clients nationwide</p>
//               </div>
//             </div>
//             <div className="relative hidden lg:block">
//                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl" />
//                <div className="border rounded-2xl bg-card p-4 shadow-2xl">
//                   {/* Visual placeholder for a dashboard or professional image */}
//                   <div className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center">
//                     <Gavel className="h-20 w-20 text-muted/50" />
//                   </div>
//                </div>
//             </div>
//           </div>
//         </section>

//         {/* 3. TRUST STATISTICS */}
//         <section className="py-12 bg-muted/30 border-b">
//           <div className="container">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//               <div>
//                 <p className="text-3xl font-bold">98%</p>
//                 <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Success Rate</p>
//               </div>
//               <div>
//                 <p className="text-3xl font-bold">15min</p>
//                 <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Avg. Response</p>
//               </div>
//               <div>
//                 <p className="text-3xl font-bold">500+</p>
//                 <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Expert Lawyers</p>
//               </div>
//               <div>
//                 <p className="text-3xl font-bold">Zero</p>
//                 <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Hidden Fees</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 4. FEATURES SECTION */}
//         <section id="features" className="py-24 container">
//           <div className="text-center space-y-4 mb-16">
//             <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Comprehensive Legal Features</h2>
//             <p className="text-muted-foreground max-w-[700px] mx-auto">
//               Everything you need to handle complex legal matters without the traditional paperwork headache.
//             </p>
//           </div>
//           <div className="grid gap-8 md:grid-cols-3">
//             <div className="group relative rounded-xl border bg-card p-8 transition-all hover:shadow-md hover:border-primary/50">
//               <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
//                 <Clock className="h-6 w-6" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Fast Booking</h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 Sync with attorney calendars in real-time. Choose a time that suits your schedule without the back-and-forth emails.
//               </p>
//             </div>
//             <div className="group relative rounded-xl border bg-card p-8 transition-all hover:shadow-md hover:border-primary/50">
//               <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
//                 <ShieldCheck className="h-6 w-6" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Secure Portal</h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 Your data is protected by AES-256 encryption. Access case files, billing, and updates via a secure, private dashboard.
//               </p>
//             </div>
//             <div className="group relative rounded-xl border bg-card p-8 transition-all hover:shadow-md hover:border-primary/50">
//               <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
//                 <Scale className="h-6 w-6" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">Expert Matching</h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 Our algorithm analyzes your case requirements to match you with a lawyer specializing in your specific jurisdiction.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* 5. HOW IT WORKS (Process Section) */}
//         <section id="process" className="py-24 bg-slate-950 text-slate-50">
//           <div className="container">
//             <div className="text-center mb-16 space-y-4">
//               <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
//               <p className="text-slate-400">Three simple steps to professional legal resolution.</p>
//             </div>
//             <div className="grid gap-12 md:grid-cols-3 relative">
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold ring-8 ring-primary/20">1</div>
//                 <h4 className="text-xl font-semibold">Submit Details</h4>
//                 <p className="text-slate-400 text-sm">Tell us about your case through our intuitive, guided form.</p>
//               </div>
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold ring-8 ring-primary/20">2</div>
//                 <h4 className="text-xl font-semibold">Consult Expert</h4>
//                 <p className="text-slate-400 text-sm">Meet your lawyer via encrypted video call or in-person meeting.</p>
//               </div>
//               <div className="flex flex-col items-center text-center space-y-4">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-bold ring-8 ring-primary/20">3</div>
//                 <h4 className="text-xl font-semibold">Resolve Case</h4>
//                 <p className="text-slate-400 text-sm">Track progress, sign documents, and finalize your legal matters.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 6. CALL TO ACTION SECTION */}
//         <section className="py-24 container">
//           <div className="rounded-3xl bg-primary px-8 py-16 text-primary-foreground text-center space-y-8 shadow-2xl relative overflow-hidden">
//              {/* Decorative Background Elements */}
//              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
             
//              <h2 className="text-3xl font-bold sm:text-5xl max-w-2xl mx-auto leading-tight">
//                Ready to discuss your case with a professional?
//              </h2>
//              <p className="text-primary-foreground/80 max-w-lg mx-auto text-lg">
//                Consultations are confidential and our team is ready to provide the guidance you need.
//              </p>
//              <div className="flex justify-center gap-4">
//                <Link href="/book">
//                 <Button size="lg" variant="secondary" className="font-bold px-10">
//                   Book Consultation Now
//                 </Button>
//                </Link>
//              </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }