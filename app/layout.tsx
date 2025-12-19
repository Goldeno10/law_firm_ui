import type { Metadata } from 'next';
// Import the Inter font from Next.js
import QueryProvider from '@/components/providers/query-provider';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';
import './globals.css';

// Configure the Inter font with specific subsets and a CSS variable name
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // This is key for Tailwind utility classes
});

export const metadata: Metadata = {
  title: 'LawFirm Pro',
  description: 'Professional Legal Services',
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Attach the font variable to the HTML root
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      {/* Apply the font utility class to the body */}
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Default to Dark as requested in the previous context
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
              {children}
            </main>
            {/* Toaster position often works better at the bottom center */}
            <Toaster position="bottom-center" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}



// import type { Metadata } from 'next';
// // import { Inter } from 'next/font/google';
// import QueryProvider from '@/components/providers/query-provider';
// import { Toaster } from '@/components/ui/sonner';
// import './globals.css';

// import { ThemeProvider } from "@/components/providers/theme-provider";
// // const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'LawFirm Pro',
//   description: 'Professional Legal Services',
// };

// // ... imports

// // {/* <body className={inter.className}> */}
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="dark" // Default to Dark
//           enableSystem
//           disableTransitionOnChange
//         >
//           <QueryProvider>
//             {children}
//             <Toaster />
//           </QueryProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }