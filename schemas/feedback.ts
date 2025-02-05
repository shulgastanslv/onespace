import { z } from 'zod';

export const feedbackSchema = z.object({
    type: z.string().min(1, 'Feedback type is required'),
    subject: z
      .string()
      .trim()
      .min(3, 'Subject must contain at least 3 characters')
      .max(100, 'Subject must not exceed 100 characters'),
    description: z
      .string()
      .trim()
      .min(10, 'Description must contain at least 10 characters')
      .max(1000, 'Description must not exceed 1000 characters'),
    email: z
      .string()
      .trim()
      .email('Invalid email format')
      .optional()
      .or(z.literal(''))
      .transform((e) => e || undefined),
  });
  