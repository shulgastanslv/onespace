import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string(),
  vaultId: z.string()
});

export type CreateNoteDTO = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string(),
});

export type UpdateNoteDTO = z.infer<typeof updateNoteSchema>; 