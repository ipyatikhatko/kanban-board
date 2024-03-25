import type { Metadata } from 'next';
import './global.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { quicksand } from '@/lib/fonts';
import { unstable_noStore } from 'next/cache';

export const metadata: Metadata = {
  title: 'Kanban board',
};

const getSession = async () => {
  unstable_noStore();
  const session = await auth();
  return session;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={quicksand.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
