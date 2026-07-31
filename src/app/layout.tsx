import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import { Toaster } from 'sonner';
import { MotionConfig } from 'framer-motion';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: { default: 'Familio — Семейный бюджет', template: '%s | Familio' },
  description: 'Премиальный SaaS для ведения совместного бюджета',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <body className={inter.className}>
        <MotionConfig reducedMotion="user">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#F2F4F8',
                borderRadius: '12px',
              },
            }}
          />
        </MotionConfig>
      </body>
    </html>
  );
}