'use client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}
export function GlassCard({ interactive, className, children, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl border border-glass-border bg-glass-bg p-5 shadow-glass backdrop-blur-glass',
        interactive && 'cursor-pointer transition-all duration-200 hover:bg-white/5 active:scale-[0.98]',
        className
      )}
      whileHover={interactive ? { scale: 1.01 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}