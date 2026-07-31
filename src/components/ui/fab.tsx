'use client';
import { useState } from 'react';

export function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-hover text-2xl text-black shadow-lg shadow-gold/30 transition-transform hover:scale-105"
      >
        {open ? '✕' : '+'}
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-48 rounded-xl border border-glass-border bg-glass-bg p-2 backdrop-blur-xl">
          {['Доход', 'Расход', 'Кредит', 'Карта'].map((item) => (
            <div key={item} className="cursor-pointer rounded-lg px-4 py-2 text-white/80 hover:bg-white/10">
              {item}
            </div>
          ))}
        </div>
      )}
    </>
  );
}