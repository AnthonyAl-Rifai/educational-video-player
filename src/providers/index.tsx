'use client';

import QueryProvider from './QueryProvider';
import LenisProvider from './LenisProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <LenisProvider>{children}</LenisProvider>
    </QueryProvider>
  );
}
