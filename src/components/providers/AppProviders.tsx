'use client';

import { SessionProvider } from './SessionProvider';
import { ThemeProvider } from './ThemeProvider';
import { TRPCProvider } from './TRPCProvider';

type AppProvidersProps = {
  children: React.ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </TRPCProvider>
    </SessionProvider>
  );
}