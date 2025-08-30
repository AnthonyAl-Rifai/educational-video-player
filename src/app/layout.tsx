import './globals.css';
import Providers from './providers';
import Header from '@/components/Header';

export const metadata = {
  title: 'Scope Labs - Full Stack Showcase',
  description: 'Educational Video Player',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
