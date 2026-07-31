import { LoginForm } from '@/components/features/auth/login-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-4">
      <LoginForm />
    </div>
  );
}

// src/components/features/auth/login-form.tsx
'use client';
import { useState } from 'react';
import { signIn } from 'better-auth/react';
import { GlassCard } from '@/components/ui/glass-card';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn.email({ email, password, callbackUrl: '/dashboard' });
  };

  return (
    <GlassCard className="w-full max-w-md p-8">
      <h1 className="mb-4 text-2xl font-semibold">Войти</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg bg-white/5 p-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-gold"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-white/5 p-3 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-gold"
        />
        <button type="submit" className="w-full rounded-lg bg-gold py-3 font-semibold text-black">
          Войти
        </button>
      </form>
    </GlassCard>
  );
}