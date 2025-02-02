'use server';

import { Vault } from '@/types/vault';
import { prisma } from '@/lib/prisma';
import { CreateVaultDTO } from '@/schemas/vault';

export const getAllVaults = async (userId: string): Promise<Vault[]> => {
  const vaults = await prisma.vault.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return vaults as Vault[];
};

export const getTrashVaults = async (userId: string): Promise<Vault[]> => {
  const vaults = await prisma.vault.findMany({
    where: {
      userId,
      isInTrash: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return vaults as Vault[];
};

export const createVault = async (userId: string, data: CreateVaultDTO): Promise<Vault> => {
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

export const getVault = async (userId: string, id: string): Promise<Vault | null> => {
  if (!id) return null;
  
  const vault = await prisma.vault.findFirst({
    where: { 
      id,
      userId,
    },
  });
  
  return vault as Vault;
};

export const moveToTrash = async (userId: string, id: string): Promise<void> => {
  await prisma.vault.updateMany({
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

export const restoreFromTrash = async (userId: string, id: string): Promise<void> => {
  await prisma.vault.updateMany({
    where: { 
      id,
      userId,
    },
    data: { 
      isInTrash: false,
      updatedAt: new Date(),
    },
  });
};

export const emptyTrash = async (userId: string): Promise<void> => {
  await prisma.vault.deleteMany({
    where: { 
      userId,
      isInTrash: true,
    },
  });
};

export const deleteVault = async (userId: string, id: string): Promise<void> => {
  await prisma.vault.deleteMany({
    where: { 
      id,
      userId,
    },
  });
};
