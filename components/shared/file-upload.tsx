'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  UploadCloud, 
  FileIcon, 
  FileText, 
  ImageIcon, 
  X, 
  Loader2, 
  ShieldCheck, 
  AlertCircle,
  FileCheck2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onUploadComplete: (url: string, filename: string) => void;
  maxSizeMB?: number;
}

export function FileUpload({ onUploadComplete, maxSizeMB = 10 }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const droppedFile = acceptedFiles[0];
    if (!droppedFile) return;

    setFile(droppedFile);
    setUploading(true);
    
    const formData = new FormData();
    formData.append('file', droppedFile);

    try {
      // 1. Initial Toast for immediate feedback
      toast.promise(
        api.post('/storage/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
        {
          loading: 'Scanning and encrypting file...',
          success: (res) => {
            onUploadComplete(res.data.url, res.data.filename);
            return `${droppedFile.name} securely uploaded.`;
          },
          error: (err) => {
            setFile(null);
            return `Upload failed: ${err.message || 'Server error'}`;
          },
        }
      );
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({ 
    onDrop, 
    maxFiles: 1,
    maxSize: maxSizeMB * 1024 * 1024,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
    }
  });

  // Icon Helper based on file state
  const renderIcon = () => {
    if (uploading) return <Loader2 className="h-12 w-12 animate-spin text-primary" />;
    if (file) return <FileCheck2 className="h-12 w-12 text-emerald-500" />;
    if (isDragActive) return <UploadCloud className="h-12 w-12 text-primary animate-bounce" />;
    return <UploadCloud className="h-12 w-12 text-muted-foreground/50" />;
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all duration-200 ease-in-out cursor-pointer",
          isDragActive 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-muted-foreground/20 bg-background hover:border-primary/50 hover:bg-muted/30",
          file && !uploading && "border-emerald-500/50 bg-emerald-50/30"
        )}
      >
        <input {...getInputProps()} />
        
        {/* Animated Glow Backdrop */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex flex-col items-center text-center gap-4">
          <div className={cn(
            "p-4 rounded-2xl transition-colors",
            isDragActive ? "bg-primary/10" : "bg-muted"
          )}>
            {renderIcon()}
          </div>
          
          <div className="space-y-1">
            <p className="text-base font-bold tracking-tight">
              {uploading ? 'Processing Security Scan...' : 
               file ? 'File Selected' : 
               isDragActive ? 'Drop to start upload' : 
               'Secure File Intake'}
            </p>
            <p className="text-sm text-muted-foreground">
              {file ? file.name : `Drag & drop legal documents, or click to browse`}
            </p>
          </div>

          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
              <FileText size={12} /> PDF
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
              <FileIcon size={12} /> DOCX
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
              <ImageIcon size={12} /> JPG
            </div>
          </div>
        </div>

        {/* Error Handling for Rejections */}
        {fileRejections.length > 0 && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-destructive animate-in fade-in slide-in-from-top-1">
            <AlertCircle size={14} />
            {fileRejections[0].errors[0].code === 'file-too-large' 
              ? `File exceeds ${maxSizeMB}MB limit` 
              : 'Invalid file format'}
          </div>
        )}
      </div>

      {/* Security Footer */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            256-Bit SSL Encrypted
        </div>
        <p className="text-[10px] text-muted-foreground/60">
            Max Size: {maxSizeMB}MB
        </p>
      </div>
    </div>
  );
}
