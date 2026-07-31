import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedNumber } from '@/components/ui/animated-number';

export function BalanceCard({ balance, trend }: { balance: number; trend: number }) {
  return (
    <GlassCard className="balance-card">
      <div className="text-sm text-white/60">Общий баланс</div>
      <AnimatedNumber value={balance} />
      <div className={`mt-2 text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% за месяц
      </div>
    </GlassCard>
  );
}