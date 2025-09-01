import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      <HeroSection />
      <section className="bg-amber-200 h-[100vh]"></section>
    </main>
  );
}
