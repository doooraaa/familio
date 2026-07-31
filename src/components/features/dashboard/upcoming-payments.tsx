import { GlassCard } from '@/components/ui/glass-card';

interface Payment {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export function UpcomingPayments({ payments }: { payments: Payment[] }) {
  return (
    <GlassCard>
      <h2 className="mb-3 text-lg font-semibold">Ближайшие платежи</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {payments.map((p) => (
          <div key={p.id} className="min-w-[180px] rounded-xl bg-white/5 p-3 backdrop-blur-sm">
            <div className="text-sm">{p.name}</div>
            <div className="text-xs text-white/50">{new Date(p.date).toLocaleDateString('ru')}</div>
            <div className="mt-1 font-semibold">{p.amount.toLocaleString()} ₽</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}