import Link from 'next/link';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', icon: '🏠' },
  { href: '/plan', icon: '📅' },
  { href: '/obligations', icon: '🛡️' },
  { href: '/archive', icon: '📂' },
  { href: '/analytics', icon: '📊' },
];

export function MobileBottomNav({ className }: { className?: string }) {
  return (
    <nav className={cn('fixed bottom-0 left-0 right-0 flex justify-around border-t border-glass-border bg-glass-bg py-3 backdrop-blur-xl', className)}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="text-xl text-white/60">
          {item.icon}
        </Link>
      ))}
    </nav>
  );
}