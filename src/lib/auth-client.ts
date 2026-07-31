import { auth } from '@/features/auth/auth';
import { headers } from 'next/headers';

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}