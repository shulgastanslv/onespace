'use server';

import { prisma } from '@/lib/prisma';

export async function createGlobalNotification(title: string, message: string) {
  const users = await prisma.user.findMany();
  
  const notifications = users.map(user => ({
    title,
    message,
    userId: user.id
  }));

  await prisma.notification.createMany({
    data: notifications
  });
}

export async function getUserNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}

export async function markNotificationAsRead(id: string) {
  await prisma.notification.update({
    where: { id },
    data: { isRead: true }
  });
} 