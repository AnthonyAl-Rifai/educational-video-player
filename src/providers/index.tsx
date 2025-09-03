'use client';

import QueryProvider from './QueryProvider';
import LenisProvider from './LenisProvider';
import { ModalProvider } from './ModalProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <ModalProvider>
        <LenisProvider>{children}</LenisProvider>
      </ModalProvider>
    </QueryProvider>
  );
}
