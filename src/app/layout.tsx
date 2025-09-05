import './globals.css';
import Providers from '@/providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import VideoCreateModal from '@/components/modals/VideoCreateModal';

export const metadata = {
  title: 'Edeo - Educational Video Platform',
  description: 'Educational Video Player',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="mx-auto mt-26 min-h-screen max-w-[1504px] px-4 sm:px-6 lg:px-8">{children}</main>
          <Footer />
          <VideoCreateModal />
        </Providers>
      </body>
    </html>
  );
}
