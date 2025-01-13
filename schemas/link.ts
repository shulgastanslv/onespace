import { z } from 'zod';

export const createLinkSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string(),
  url: z.string().url('Введите корректный URL'),
  tags: z.array(z.string()).optional(),
  category: z.string().optional(),
  vaultId: z.string().min(1, 'VaultId обязателен')
});

export type CreateLinkDTO = z.infer<typeof createLinkSchema>; 