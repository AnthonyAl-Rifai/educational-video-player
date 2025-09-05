import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
      <p className="text-gray-600">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/" className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  );
}
