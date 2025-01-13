'use server';

import { Vault } from '@/types/vault';
import { prisma } from '@/lib/prisma';
import { CreateVaultDTO } from '@/schemas/vault';

export const getAllVaults = async (): Promise<Vault[]> => {
  const vaults = await prisma.vault.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return vaults as Vault[];
};

export const createVault = async (data: CreateVaultDTO): Promise<Vault> => {
  const vault = await prisma.vault.create({
    data: {
      ...data,
      icon: data.icon || '',
      count: 0,
    },
  });
  return vault as Vault;
};

export const deleteVault = async (id: string): Promise<void> => {
  await prisma.vault.delete({
    where: { id },
  });
};

export const moveToTrash = async (id: string): Promise<void> => {
  await prisma.vault.update({
    where: { id },
    data: { isInTrash: true },
  });
};

export const restoreFromTrash = async (id: string): Promise<void> => {
  await prisma.vault.update({
    where: { id },
    data: { isInTrash: false },
  });
};

export const emptyTrash = async (): Promise<void> => {
  await prisma.vault.deleteMany({
    where: { isInTrash: true },
  });
};

