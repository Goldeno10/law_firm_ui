import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { LawyerRegistrationValues } from '@/lib/schemas/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useRegisterLawyer = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LawyerRegistrationValues) => {
      const payload = {
        ...data,
        role: 'LAWYER',
        isVerified: false,
      };
      const response = await api.post('/users/register', payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Registration successful! Please wait for Admin verification.');
      router.push('/auth/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    },
  });
};