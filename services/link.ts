'use server';

import { prisma } from '@/lib/prisma';
import { CreateLinkDTO } from '@/schemas/link';

export const createLink = async (data: CreateLinkDTO) => {
  const link = await prisma.$transaction(async (tx) => {
    const link = await tx.link.create({
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

    return link;
  });

  return link;
}; 

export const getAllLinks = async (vaultId: string) => {
  const links = await prisma.link.findMany({
    where: { vaultId }
  });
  return links;
};

export const getLinkById = async (id: string) => {
  const link = await prisma.link.findUnique({
    where: { id }
  });
  return link;
};

export const deleteLink = async (id: string) => {
  await prisma.link.delete({
    where: { id }
  });
};
