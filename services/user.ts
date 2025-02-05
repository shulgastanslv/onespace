'use server';
import { prisma } from '@/lib/prisma';
import { CreateUserDto, UpdateUserDto, User } from '../types/user';

export async function findById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      vaults: true,
    },
  });

  if (!user) {
    return null;
  }

  return user as User;
}

export async function findByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  return user as User;
}

export async function createUser(data: CreateUserDto): Promise<User> {
  const user = await prisma.user.create({
    data: {
      ...data,
    },
  });

  return user as User;
}

export async function updateUser(
  id: string | undefined,
  data: UpdateUserDto,
): Promise<User | null> {
  if (!id) {
    return null;
  }

  const user = await prisma.user.update({
    where: { id },
    data,
  });

  return user as User;
}

export async function deleteUser(id: string | undefined): Promise<User | null> {
  if (!id) {
    return null;
  }

  const user = await prisma.user.delete({
    where: { id },
  });

  return user as User;
}
