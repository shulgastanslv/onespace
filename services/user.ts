"use server";
import { prisma } from '@/lib/prisma';
import { CreateUserDto, UpdateUserDto } from '../types/user';

export async function findAll(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function findById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      files: true,
      activities: true,
      notifications: true,
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
      storageLimit: data.storageLimit ?? 2000,
      timeLimit: data.timeLimit ?? 24,
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

export async function getUserStorage(id: string) {
  const files = await prisma.file.findMany({
    where: { userId: id },
    select: { size: true },
  });

  const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
  return totalStorage;
}
