import { getDashboardData } from '@/features/dashboard/actions';
import { BalanceCard } from '@/components/features/dashboard/balance-card';
import { UpcomingPayments } from '@/components/features/dashboard/upcoming-payments';
import { SpendingPie } from '@/components/features/dashboard/spending-pie';
import { FloatingActionButton } from '@/components/ui/fab';

export default async function DashboardPage() {
  const data = await getDashboardData();
  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-semibold">Доброе утро, {data.userName}</h1>
      <BalanceCard balance={data.balance} trend={data.trend} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingPayments payments={data.upcomingPayments} />
        <SpendingPie categories={data.spendingCategories} />
      </div>
      <FloatingActionButton />
    </div>
  );
}