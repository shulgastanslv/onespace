import { z } from 'zod';

export const createLinkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().optional(),
  url: z.string().url('Enter a valid URL'),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  vaultId: z.string()
});

export type CreateLinkDTO = z.infer<typeof createLinkSchema>; 