import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 12);

  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      passwordHash,
      name: 'Alice',
    },
  });
  const bob = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      passwordHash,
      name: 'Bob',
    },
  });

  const family = await prisma.family.create({
    data: {
      name: 'Smith Family',
      inviteCode: 'SMITH123',
      members: {
        create: [
          { userId: alice.id, role: 'OWNER' },
          { userId: bob.id, role: 'PARTNER' },
        ],
      },
    },
  });

  const mainAccount = await prisma.account.create({
    data: {
      familyId: family.id,
      name: 'Основной счёт',
      type: 'CHECKING',
      currency: 'RUB',
      initialBalance: 500000,
      currentBalance: 500000,
    },
  });

  const salaryCategory = await prisma.category.create({
    data: { familyId: family.id, name: 'Зарплата', type: 'INCOME', icon: 'wallet', color: '#D4A843' },
  });
  const foodCategory = await prisma.category.create({
    data: { familyId: family.id, name: 'Продукты', type: 'EXPENSE', icon: 'shopping-cart', color: '#FF9F0A' },
  });

  await prisma.transaction.create({
    data: {
      familyId: family.id,
      accountId: mainAccount.id,
      categoryId: salaryCategory.id,
      type: 'INCOME',
      amount: 150000,
      currency: 'RUB',
      plannedDate: new Date('2026-08-01'),
      status: 'PLANNED',
      createdBy: alice.id,
    },
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });