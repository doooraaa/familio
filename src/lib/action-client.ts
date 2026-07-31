import { createSafeActionClient } from 'next-safe-action';
import { getSession } from './auth-client';

export const actionClient = createSafeActionClient();

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();
  if (!session) throw new Error('Unauthorized');

  const { prisma } = await import('./prisma');
  const familyMember = await prisma.familyMember.findFirst({
    where: { userId: session.user.id },
    select: { familyId: true, role: true },
  });
  if (!familyMember) throw new Error('No family');
  return next({ ctx: { userId: session.user.id, familyId: familyMember.familyId, role: familyMember.role } });
});