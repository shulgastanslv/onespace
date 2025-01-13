import { z } from 'zod';

export const createVaultSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  icon: z.string().nullable()
});

export type CreateVaultDTO = z.infer<typeof createVaultSchema>;

