import { auth } from '@/features/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  return (
    <div className="flex h-screen bg-app">
      <SidebarNav className="hidden md:flex" />
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</main>
      <MobileBottomNav className="md:hidden" />
    </div>
  );
}