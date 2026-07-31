'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { GlassCard } from '@/components/ui/glass-card';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export function SpendingPie({ categories }: { categories: CategoryData[] }) {
  return (
    <GlassCard>
      <h2 className="mb-3 text-lg font-semibold">Расходы по категориям</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={categories} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
            {categories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}