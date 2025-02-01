import { z } from 'zod';

export const createLinkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  url: z.string().url('Enter a valid URL'),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  vaultId: z.string().min(1, 'VaultId is required')
});

export type CreateLinkDTO = z.infer<typeof createLinkSchema>; 