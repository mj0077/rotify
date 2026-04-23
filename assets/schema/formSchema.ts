// schema/formSchema.ts
import { z } from 'zod';

export const FormSchema = z.object({
  name: z.string().trim()
        .min(3, { message: "Username must be at least 3 characters." })
        .max(20, { message: "Username must be at most 20 characters." }),

  phNumber: z.string().trim()
        .regex(/^[6-9]\d{9}$/, { message: "Please enter a valid 10-digit phone number." }),

  startDate: z.string().trim()
        .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, { message: "Date must be in DD/MM/YYYY format." }), // ISO or dd/mm/yyyy
  endDate: z.string().trim()
        .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, { message: "Date must be in DD/MM/YYYY format." }), // ISO or dd/mm/yyyy
  breakfast: z.boolean(),
  lunch: z.boolean(),
  dinner: z.boolean(),
});

export const WaitlistSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  phNumber: z.string().regex(/^\d{10}$/, { message: "Phone Number must be exactly 10 digits." }),
  address: z.string().min(10, { message: "Please provide a complete address (at least 10 characters)." }),
});