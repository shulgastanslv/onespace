"use server";
import { prisma } from '@/lib/prisma';
import { CreateUserDto, UpdateUserDto } from '../types/user';

export async function findById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      vaults: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

export async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: CreateUserDto) {
  return prisma.user.create({
    data: {
      ...data,
    },
  });
}

export async function updateUser(id: string, data: UpdateUserDto) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}