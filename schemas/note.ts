import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  vaultId: z.string().min(1, 'VaultId is required')
});

export type CreateNoteDTO = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
});

export type UpdateNoteDTO = z.infer<typeof updateNoteSchema>; 