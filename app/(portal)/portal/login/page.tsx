
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock, Loader2, Scale, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/users/login', { email, password });
      const { token } = res.data;
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);

      const profileRes = await api.get('/users/profile', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      const role = profileRes.data.role;

      if (role === 'SUPER_ADMIN') router.push('/portal/admin');
      else if (role === 'LAWYER') router.push('/portal/lawyer');
      else toast.error('Access Denied: Unauthorized Role');

    } catch (err) {
      toast.error('Invalid Credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side: Branding/Imagery (Hidden on Mobile) */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-primary/10 flex flex-col items-center justify-center p-12 overflow-hidden">
            {/* Background pattern or professional image would go here */}
            <div className="z-10 text-center space-y-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Scale size={32} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    Legal Management System
                </h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                    Secure access for authorized legal professionals and administrative staff.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-primary font-medium">
                    <ShieldCheck size={16} />
                    <span>Bank-grade 256-bit Encryption</span>
                </div>
            </div>
            {/* Subtle Gradient Backdrop */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please enter your credentials to access the portal
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="name@lawfirm.com"
                    className="pl-10"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold leading-none">
                        Password
                    </label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    className="pl-10"
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <p className="mt-10 text-center text-xs text-muted-foreground">
                By logging in, you agree to our <br />
                <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { api } from '@/lib/axios';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { toast } from 'sonner';

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function handleLogin(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // 1. Get Token
//       const res = await api.post('/users/login', { email, password });
//       const { token } = res.data;
      
//       // 2. Set Token in Headers (Simple approach for now, better to use HttpOnly Cookie via server proxy)
//       // Since we enabled withCredentials: true in axios, we are assuming backend sets cookies.
//       // IF backend returns token in body, we must store it locally or in context.
//       // For this example, we assume we need to attach it manually for subsequent requests 
//       // OR we just rely on the fact that we got it.
      
//       // Let's attach it to default headers for this session
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       localStorage.setItem('token', token); // Fallback storage

//       // 3. Get Profile to redirect correctly
//       const profileRes = await api.get('/users/profile', { headers: { Authorization: `Bearer ${token}` } });
//       const role = profileRes.data.role;

//       if (role === 'SUPER_ADMIN') router.push('/portal/admin');
//       else if (role === 'LAWYER') router.push('/portal/lawyer');
//       else toast.error('Access Denied');

//     } catch (err) {
//       toast.error('Invalid Credentials');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-50">
//       <Card className="w-[400px]">
//         <CardHeader>
//           <CardTitle>Portal Login</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Email</label>
//               <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium">Password</label>
//               <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? 'Logging in...' : 'Login'}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }