'use client';

import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  FileText, 
  UploadCloud, 
  Eye, 
  Lock, 
  ShieldCheck, 
  Loader2, 
  FileIcon,
  Trash2,
  Download,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function DocumentsPage() {
  const params = useParams();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['dashboard', params.id]);
  
  const [url, setUrl] = useState('');
  const [filename, setFilename] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      return api.post(`/consultations/documents/${params.id}`, { 
        filename: filename || "Untitled Document", 
        url 
      });
    },
    onSuccess: () => {
      toast.success('Document securely added to your case file');
      queryClient.invalidateQueries({ queryKey: ['dashboard', params.id] });
      setUrl('');
      setFilename('');
    },
    onError: () => {
      toast.error('Failed to register document. Please check the URL.');
    }
  });

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <p className="text-sm font-bold text-primary uppercase tracking-widest">Case Management</p>
          <h2 className="text-3xl font-extrabold tracking-tight">Evidence & Documents</h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border">
          <Lock className="h-3 w-3 text-emerald-500" />
          AES-256 Encrypted Storage
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. Upload Section (Left Sidebar style) */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UploadCloud className="h-5 w-5" /> 
                Add New File
              </CardTitle>
              <CardDescription className="text-primary-foreground/70 text-xs">
                Upload relevant evidence or requested identity documents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase">Display Name</label>
                 <Input 
                  placeholder="e.g., Police Report" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                  value={filename} 
                  onChange={(e) => setFilename(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase">Cloud Storage Link</label>
                <Input 
                  placeholder="secure-link.com" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-10"
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                />
              </div>
              <Button 
                className="w-full bg-white text-primary hover:bg-white/90 font-bold h-11" 
                onClick={() => mutation.mutate()} 
                disabled={mutation.isPending || !url}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Encrypting...
                  </>
                ) : 'Securely Upload'}
              </Button>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-muted/30 border border-dashed border-muted-foreground/20 space-y-3">
             <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={16} />
                <h4 className="text-xs font-bold uppercase">Legal Note</h4>
             </div>
             <p className="text-[11px] text-muted-foreground leading-relaxed">
               Please ensure all uploaded documents are legible. Scanned PDFs are preferred over photographs for court submissions.
             </p>
          </div>
        </div>

        {/* 3. Document Repository (Main Column) */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm min-h-[400px]">
            <CardHeader className="border-b bg-muted/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Shared Document Vault
                </CardTitle>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {data.consultation.documents?.length || 0} Files
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="text-xs uppercase font-bold px-6">File Details</TableHead>
                    <TableHead className="text-xs uppercase font-bold text-center">Security</TableHead>
                    <TableHead className="text-xs uppercase font-bold text-right px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.consultation.documents?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="h-64 text-center">
                        <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                          <FileIcon className="h-10 w-10 opacity-20" />
                          <p className="text-sm">Your document vault is currently empty.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.consultation.documents?.map((doc: any) => (
                      <TableRow key={doc.id} className="group hover:bg-muted/20 transition-colors">
                        <TableCell className="px-6 py-4">
                          <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                                <FileIcon size={20} />
                             </div>
                             <div className="flex flex-col">
                                <span className="font-bold text-sm truncate max-w-[150px] md:max-w-[250px]">{doc.name}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                                  {new Date(doc.uploadedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} • {doc.uploadedBy || 'Client'}
                                </span>
                             </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                           <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              <ShieldCheck size={10} />
                              SECURE
                           </div>
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <div className="flex justify-end gap-2">
                            <a href={doc.url} target="_blank" rel="noreferrer">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary">
                                <Eye size={16} />
                              </Button>
                            </a>
                            <a href={doc.url} download>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary">
                                  <Download size={16} />
                                </Button>
                            </a>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}




// 'use client';

// import { useState } from 'react';
// import { useQueryClient, useMutation } from '@tanstack/react-query';
// import { useParams } from 'next/navigation';
// import { api } from '@/lib/axios';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { toast } from 'sonner';

// export default function DocumentsPage() {
//   const params = useParams();
//   const queryClient = useQueryClient();
//   const data: any = queryClient.getQueryData(['dashboard', params.id]);
//   const [url, setUrl] = useState('');
//   const [filename, setFilename] = useState('');

//   const mutation = useMutation({
//     mutationFn: async () => {
//       // In a real app, you would upload file to S3 first, get URL, then send here
//       return api.post(`/consultations/documents/${params.id}`, { filename, url });
//     },
//     onSuccess: () => {
//       toast.success('Document added');
//       queryClient.invalidateQueries({ queryKey: ['dashboard', params.id] });
//       setUrl('');
//       setFilename('');
//     }
//   });

//   if (!data) return null;

//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-bold">Documents</h2>
      
//       <Card>
//         <CardHeader><CardTitle>Upload New Document</CardTitle></CardHeader>
//         <CardContent className="flex gap-4">
//           <Input placeholder="File Name (e.g. Evidence.pdf)" value={filename} onChange={(e) => setFilename(e.target.value)} />
//           <Input placeholder="File URL (e.g. https://s3...)" value={url} onChange={(e) => setUrl(e.target.value)} />
//           <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>Add</Button>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent className="pt-6">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Uploaded By</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.consultation.documents?.length === 0 && <TableRow><TableCell colSpan={4} className="text-center">No documents yet</TableCell></TableRow>}
//               {data.consultation.documents?.map((doc: any) => (
//                 <TableRow key={doc.id}>
//                   <TableCell>{doc.name}</TableCell>
//                   <TableCell>{doc.uploadedBy}</TableCell>
//                   <TableCell>{new Date(doc.uploadedAt).toLocaleDateString()}</TableCell>
//                   <TableCell>
//                     <a href={doc.url} target="_blank" className="text-blue-600 underline">View</a>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }