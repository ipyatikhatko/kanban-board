'use client';
import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import QueryClientProvider from './query-client';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
