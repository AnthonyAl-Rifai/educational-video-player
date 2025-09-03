'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-[1504px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Edeo
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              An educational video platform designed to make learning engaging
              and accessible for everyone.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Videos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Edeo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
