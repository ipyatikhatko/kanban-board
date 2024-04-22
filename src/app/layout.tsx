import type { Metadata } from 'next';
import './global.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { quicksand } from '@/lib/fonts';
import { unstable_noStore } from 'next/cache';

import dynamic from 'next/dynamic';
// const Providers = dynamic(() => import('../components/providers'), {
//   ssr: false,
// });
import Providers from '@/components/providers';

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
    <html suppressHydrationWarning lang='en'>
      <SessionProvider session={session}>
        <Providers>
          <body className={quicksand.className}>{children}</body>
        </Providers>
      </SessionProvider>
    </html>
  );
}
