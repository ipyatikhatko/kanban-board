'use client';
import Header from '@/components/layout/header';
import MobileNav from '@/components/layout/mobile-nav';
import Sidebar from '@/components/layout/sidebar';
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen flex-col md:flex-row'>
      <Sidebar />
      <section className='flex min-w-0 flex-1 flex-col'>
        <Header />
        <main className='flex-1 overflow-auto bg-slate-50 px-4 pt-4'>
          <div className='mx-auto max-w-screen-xl'>{children}</div>
        </main>
      </section>
      <MobileNav />
    </div>
  );
}
