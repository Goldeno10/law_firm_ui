import * as z from 'zod';

export const lawyerRegistrationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  barNumber: z.string().min(3, 'Bar Number is required for verification'),
  yearsOfExperience: z.coerce.number().min(0, 'Years of experience is required'),
  // We will map this to the backend array
  specializations: z.array(z.string()).min(1, 'Select at least one specialization'),
  bio: z.string().optional(),
});

export type LawyerRegistrationValues = z.infer<typeof lawyerRegistrationSchema>;