import Link from 'next/link';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', icon: '🏠', label: 'Главная' },
  { href: '/plan', icon: '📅', label: 'План' },
  { href: '/obligations', icon: '🛡️', label: 'Обязательства' },
  { href: '/archive', icon: '📂', label: 'Архив' },
  { href: '/analytics', icon: '📊', label: 'Аналитика' },
  { href: '/settings', icon: '⚙️', label: 'Настройки' },
];

export function SidebarNav({ className }: { className?: string }) {
  return (
    <aside className={cn('flex-col items-center gap-6 border-r border-glass-border bg-glass-bg px-3 py-6 backdrop-blur-xl', className)}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="flex flex-col items-center text-white/60 transition-colors hover:text-gold">
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}