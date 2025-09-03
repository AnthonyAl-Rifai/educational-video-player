'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-[1504px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold text-gray-900 transition-colors hover:text-blue-600"
            >
              Edeo
            </Link>
            <p className="mt-4 max-w-md text-gray-600">
              An educational video platform designed to make learning engaging
              and accessible for everyone.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider text-gray-900 uppercase">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-gray-600 transition-colors hover:text-blue-600"
                >
                  Videos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Edeo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
