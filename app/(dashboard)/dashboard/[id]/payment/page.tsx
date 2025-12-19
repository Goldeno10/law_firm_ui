'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useQueryClient } from '@tanstack/react-query';
import { 
  CheckCircle, 
  Clock, 
  CreditCard, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Receipt,
  History
} from 'lucide-react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function PaymentPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['dashboard', params.id]);

  if (!data) return <div className="p-10">Loading...</div>;

  const { payment, assignedLawyerName } = data.consultation;
  const isPaid = payment.status === 1; // 1 = PAID
  const isPending = payment.status === 0;

  const handlePay = () => {
    if (payment.paymentLink) {
      window.location.href = payment.paymentLink;
    }
  };

  const currencyFormat = (amount: number, currency: string) => {
    return (amount / 100).toLocaleString('en-US', { style: 'currency', currency: currency });
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Billing & Payments</h2>
        <Receipt className="h-8 w-8 text-primary" />
      </div>

      <div className="space-y-8">
        {/* Payment Status Card */}
        <Card className={`border-none shadow-xl ${isPaid ? "bg-emerald-50/50" : ""}`}>
          <div className={`h-2 ${isPaid ? 'bg-emerald-500' : 'bg-primary'}`} />
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CreditCard className="h-7 w-7 text-primary" />
                Invoice Summary
              </CardTitle>
              <Badge 
                className={`text-base px-4 py-2 font-bold ${isPaid ? 'bg-emerald-500 hover:bg-emerald-500 text-white' : 'bg-amber-500 hover:bg-amber-500 text-white'}`}
              >
                {isPaid ? "PAID" : "PENDING"}
              </Badge>
            </div>
            <CardDescription>
              Invoice for professional legal services provided by {assignedLawyerName || 'assigned counsel'}.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="font-semibold text-muted-foreground">Invoice ID</div>
                <div className="text-right font-medium">{payment.invoiceId || 'N/A'}</div>
                <div className="font-semibold text-muted-foreground">Service Date</div>
                <div className="text-right font-medium">{data.consultation.scheduledAt ? new Date(data.consultation.scheduledAt).toLocaleDateString() : 'N/A'}</div>
                <div className="font-semibold text-muted-foreground">Description</div>
                <div className="text-right font-medium">1-hour Initial Consultation</div>
            </div>

            <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
              <span>Total Amount Due</span>
              <span>{currencyFormat(payment.amount, payment.currency)}</span>
            </div>

            {isPaid && (
              <div className="flex items-center gap-3 text-emerald-700 bg-emerald-100 p-4 rounded-lg">
                <CheckCircle className="h-6 w-6 shrink-0" />
                <span className="text-sm font-medium">Your payment was successfully processed. A receipt has been emailed to you.</span>
              </div>
            )}

            {isPending && (
              <div className="flex items-center gap-3 text-amber-700 bg-amber-100 p-4 rounded-lg">
                <Clock className="h-6 w-6 shrink-0" />
                <span className="text-sm font-medium">Payment is required to confirm your slot and receive the meeting link.</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {!isPaid && (
              <>
                <Button 
                    size="lg" 
                    className="w-full text-lg h-14 font-bold shadow-xl shadow-primary/30 group" 
                    onClick={handlePay} 
                    disabled={!payment.paymentLink}
                >
                    {payment.paymentLink ? (
                        <>
                            Proceed to Secure Payment
                            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                    ) : (
                        'Waiting for Admin to set fee...'
                    )}
                </Button>
                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Payments processed by Stripe. 100% secure checkout.
                 </div>
              </>
            )}
          </CardFooter>
        </Card>

        {/* Payment History Card (Placeholder) */}
        <Card className="border-none shadow-sm">
            <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <History className="h-4 w-4" />
                    Payment History
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Placeholder for future payment records table */}
                <div className="p-8 text-center text-muted-foreground text-sm">
                    No past transaction history found for this account.
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}




// 'use client';

// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { useQueryClient } from '@tanstack/react-query';
// import { CheckCircle, Clock, CreditCard } from 'lucide-react';
// import { useParams } from 'next/navigation';

// export default function PaymentPage() {
//   const params = useParams();
//   const queryClient = useQueryClient();
//   const data: any = queryClient.getQueryData(['dashboard', params.id]);

//   if (!data) return <div className="p-10">Loading...</div>;

//   const { payment } = data.consultation;
//   const isPaid = payment.status === 1; // 1 = PAID (from Proto Enum)
//   const isPending = payment.status === 0;

//   // Function to redirect to Stripe
//   const handlePay = () => {
//     if (payment.paymentLink) {
//       window.location.href = payment.paymentLink;
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-8">
//       <h2 className="text-3xl font-bold mb-6">Payment Status</h2>

//       <Card className={isPaid ? "border-green-500/50 bg-green-500/10" : ""}>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <CreditCard className="h-6 w-6" />
//               Consultation Fee
//             </CardTitle>
//             <Badge variant={isPaid ? "default" : "destructive"} className="text-lg px-4 py-1">
//               {isPaid ? "PAID" : "UNPAID"}
//             </Badge>
//           </div>
//           <CardDescription>
//             Fee for 1-hour consultation with {data.consultation.assignedLawyerName}
//           </CardDescription>
//         </CardHeader>
        
//         <CardContent className="space-y-4">
//           <div className="flex justify-between text-xl font-semibold border-b pb-4">
//             <span>Total Amount</span>
//             <span>
//               {(payment.amount / 100).toLocaleString('en-US', { style: 'currency', currency: payment.currency })}
//             </span>
//           </div>

//           {isPaid && (
//             <div className="flex items-center gap-2 text-green-500 mt-4">
//               <CheckCircle className="h-5 w-5" />
//               <span>Payment processed successfully. Meeting is confirmed.</span>
//             </div>
//           )}

//           {isPending && (
//             <div className="flex items-center gap-2 text-yellow-600 mt-4">
//               <Clock className="h-5 w-5" />
//               <span>Payment is required to confirm your slot.</span>
//             </div>
//           )}
//         </CardContent>

//         <CardFooter>
//           {!isPaid && (
//             <Button size="lg" className="w-full text-lg" onClick={handlePay} disabled={!payment.paymentLink}>
//               {payment.paymentLink ? 'Proceed to Secure Payment' : 'Waiting for Admin to set fee...'}
//             </Button>
//           )}
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }