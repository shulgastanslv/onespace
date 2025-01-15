'use server';

import { prisma } from '@/lib/prisma';
import { Plan } from '@prisma/client';

export async function createSubscription(userId: string, plan: Plan) {
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1); // Подписка на 1 месяц

  return prisma.subscription.create({
    data: {
      userId,
      plan,
      endDate
    }
  });
}

export async function cancelSubscription(userId: string) {
  return prisma.subscription.update({
    where: { userId },
    data: { status: 'CANCELLED' }
  });
}

export async function getUserSubscription(userId: string) {
  return prisma.subscription.findUnique({
    where: { userId }
  });
} 