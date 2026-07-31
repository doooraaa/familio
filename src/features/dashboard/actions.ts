'use server';
import { authActionClient } from '@/lib/action-client';
import { prisma } from '@/lib/prisma';
import { subMonths, startOfMonth, endOfMonth } from 'date-fns';

export const getDashboardData = authActionClient.action(async ({ ctx }) => {
  const { familyId, userId } = ctx;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true } });

  const accounts = await prisma.account.findMany({ where: { familyId, isArchived: false } });
  const balance = accounts.reduce((sum, a) => sum + Number(a.currentBalance), 0);

  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  const upcoming = await prisma.transaction.findMany({
    where: { familyId, status: 'PLANNED', plannedDate: { gte: now } },
    orderBy: { plannedDate: 'asc' },
    take: 5,
    include: { category: true },
  });

  const spending = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: { familyId, status: 'EXECUTED', type: 'EXPENSE', executedDate: { gte: monthStart, lte: monthEnd } },
    _sum: { amount: true },
  });
  const categories = await prisma.category.findMany({ where: { id: { in: spending.map((s) => s.categoryId) } } });
  const spendingCategories = spending.map((s) => {
    const cat = categories.find((c) => c.id === s.categoryId);
    return { name: cat?.name || 'Other', value: Number(s._sum.amount), color: cat?.color || '#888' };
  });

  return {
    userName: user?.name || 'Пользователь',
    balance,
    trend: 5.2, // заглушка
    upcomingPayments: upcoming.map((t) => ({
      id: t.id,
      name: t.description || t.category?.name || 'Платёж',
      amount: Number(t.amount),
      date: t.plannedDate.toISOString(),
    })),
    spendingCategories,
  };
});