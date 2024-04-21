'use client';
import Header from '@/components/ui/layout/header';
import MobileNav from '@/components/ui/layout/mobile-nav';
import Sidebar from '@/components/ui/layout/sidebar';
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen flex-col md:flex-row'>
      <Sidebar />
      <section className='flex min-w-0 flex-1 flex-col'>
        <Header />
        <main className='flex-1 overflow-auto bg-slate-50 pl-2 lg:pl-4'>
          <div className='h-full'>{children}</div>
        </main>
      </section>
      <MobileNav />
    </div>
  );
}
