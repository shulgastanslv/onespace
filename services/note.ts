'use server';

import { prisma } from '@/lib/prisma';
import { Note } from '@/types/note';
import { CreateNoteDTO } from '@/schemas/note';

export const getAllNotes = async (vaultId: string): Promise<Note[]> => {
  const notes = await prisma.note.findMany({
    where: { 
      vaultId,
      isInTrash: false 
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return notes as Note[];
};

export const createNote = async (data: CreateNoteDTO): Promise<Note> => {
  const note = await prisma.$transaction(async (tx) => {
    const note = await tx.note.create({
      data: {
        ...data,
      },
    });

    await tx.vault.update({
      where: { id: data.vaultId },
      data: {
        count: {
          increment: 1
        }
      }
    });

    return note;
  });

  return note as Note;
};

export const deleteNote = async (id: string): Promise<void> => {
  const note = await prisma.note.findUnique({
    where: { id }
  });

  if (!note) return;

  await prisma.$transaction(async (tx) => {
    await tx.note.delete({
      where: { id }
    });

    await tx.vault.update({
      where: { id: note.vaultId },
      data: {
        count: {
          decrement: 1
        }
      }
    });
  });
};

export const moveNoteToTrash = async (id: string): Promise<void> => {
  const note = await prisma.note.findUnique({
    where: { id }
  });

  if (!note) return;

  await prisma.$transaction(async (tx) => {
    await tx.note.update({
      where: { id },
      data: { isInTrash: true }
    });

    await tx.vault.update({
      where: { id: note.vaultId },
      data: {
        count: {
          decrement: 1
        }
      }
    });
  });
};

export const restoreNoteFromTrash = async (id: string): Promise<void> => {
  const note = await prisma.note.findUnique({
    where: { id }
  });

  if (!note) return;

  await prisma.$transaction(async (tx) => {
    await tx.note.update({
      where: { id },
      data: { isInTrash: false }
    });

    await tx.vault.update({
      where: { id: note.vaultId },
      data: {
        count: {
          increment: 1
        }
      }
    });
  });
}; 