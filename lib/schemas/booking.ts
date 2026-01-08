import * as z from 'zod';

// Matches Proto CaseType Enum
// 0=Unspecified, 1=Family, 2=Criminal, 3=Property, 4=Corporate, 5=Immigration, 6=IP
export const CaseTypeEnum = z.enum(['0', '1', '2', '3', '4', '5', '6']);

export const bookingSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  caseType: CaseTypeEnum,
  caseDescription: z.string(),
  duration: z.number().min(30).max(180),
  documentUrl: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;