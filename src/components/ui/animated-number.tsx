'use client';
import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

export function AnimatedNumber({ value, currency = '₽' }: { value: number; currency?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(0, value, { duration: 0.8, ease: 'easeOut', onUpdate: (latest) => setDisplay(latest) });
    return controls.stop;
  }, [value]);

  return (
    <span className="font-mono text-4xl font-bold tabular-nums">
      {Math.round(display).toLocaleString()} {currency}
    </span>
  );
}