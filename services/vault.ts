'use server';

import { Vault } from '@/types/vault';
import { prisma } from '@/lib/prisma';
import { CreateVaultDTO } from '@/schemas/vault';

export const getAllVaults = async (userId: string | undefined): Promise<Vault[] | null> => {
  if(!userId) return null;
  const vaults = await prisma.vault.findMany({
    where: {
      userId,
    },
  });
  return vaults as Vault[];
};

export const getTrashVaults = async (userId: string | undefined): Promise<Vault[] | null> => {
  if(!userId) return null;
  const vaults = await prisma.vault.findMany({
    where: {
      userId,
      isInTrash: true,
    },
  });
  return vaults as Vault[];
};

export const createVault = async (userId: string | undefined, data: CreateVaultDTO): Promise<Vault | null> => {
  if (!userId) return null;

  const vault = await prisma.vault.create({
    data: {
      ...data,
      userId,
      icon: data.icon || '',
      count: 0,
      isInTrash: false,
    },
  });
  return vault as Vault;
};

export const getVault = async (userId: string | undefined, id: string): Promise<Vault | null> => {
  if (!userId) return null;
  
  const vault = await prisma.vault.findUnique({
    where: { 
      id,
      userId,
    },
  });
  
  return vault as Vault;
};

export const moveToTrash = async (userId: string | undefined, id: string): Promise<void> => {
  if (!userId) return;
  await prisma.vault.update({
    where: { 
      id,
      userId,
    },
    data: { 
      isInTrash: true,
      updatedAt: new Date(),
    },
  });
};

export const restoreFromTrash = async (userId: string | undefined, id: string): Promise<boolean> => {
  if(!userId) return false;
  await prisma.vault.update({
    where: { 
      id,
      userId,
    },
    data: { 
      isInTrash: false,
      updatedAt: new Date(),
    },
  });
  return true;
};

export const emptyTrash = async (userId: string | undefined): Promise<void> => {
  if (!userId) return;
  await prisma.vault.deleteMany({
    where: { 
      userId,
      isInTrash: true,
    },
  });
};

export const deleteVault = async (userId: string | undefined, id: string): Promise<void> => {
  if (!userId) return;
  await prisma.vault.delete({
    where: { 
      id,
      userId,
    },
  });
};
