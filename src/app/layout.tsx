import './globals.css';
import Providers from '@/providers';
import Header from '@/components/Header';

export const metadata = {
  title: 'Edeo - Educational Video Platform',
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
          <main className="min-h-screen max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8 mt-26">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
