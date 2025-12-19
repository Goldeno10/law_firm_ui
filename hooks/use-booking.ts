import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { BookingFormValues } from '@/lib/schemas/booking';
import { toast } from 'sonner';

export const useCreateConsultation = () => {
  return useMutation({
    mutationFn: async (data: BookingFormValues) => {
      // Convert string enum to number for backend
      const payload = {
        ...data,
        caseType: parseInt(data.caseType),
        preferredTimes: [], // Can implement time picker logic later
      };
      const response = await api.post('/consultations', payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Consultation Request Received!');
      // We will redirect to dashboard here in the component
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });
};