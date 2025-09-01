import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="flex items-center min-h-[calc(85vh)]">
      <div className="w-full mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-2 gap-8 items-center">
          {/* First Column, First Row - Main Heading */}
          <div className="text-left lg:col-start-1 lg:row-start-1 mb-8 lg:mb-0">
            <h1
              className="font-bold text-gray-900 tracking-tight
             text-[clamp(2.25rem,6vw+1rem,6rem)]
             leading-[1.15] lg:leading-[1.06]"
            >
              Press Play.
              <span className="text-blue-600 block">Start Learning.</span>
            </h1>
          </div>

          {/* First Column, Second Row - Subtext and Buttons */}
          <div className="text-left lg:col-start-1 lg:row-start-2 mb-8 lg:mb-0">
            <p className="text-xl sm:text-3xl text-gray-600 mb-8">
              Discover, create, and share knowledge through engaging video
              content. Join our community of learners and educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/videos"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg text-center"
              >
                Start Learning
              </Link>
              <Link
                href="/videos/new"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 text-lg text-center"
              >
                Create Video
              </Link>
            </div>
          </div>

          {/* Second Column, Spans Both Rows - Hero Image */}
          <div className="hidden md:flex lg:col-start-2 lg:row-span-2 items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src="/assets/images/hero-image.svg"
                alt="Educational Video Learning"
                width={1000}
                height={900}
                className="w-full h-auto max-w-7xl scale-110"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
