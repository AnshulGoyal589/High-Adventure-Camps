'use client';

import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNavbar() {
  const { userId } = useAuth();
  const pathname = usePathname();

  if (!userId) return null;

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="bg-secondary/5 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="font-bold text-xl text-primary">
              Admin Dashboard
            </Link>
            <div className="flex gap-1">
              <Link
                href="/admin"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin') && !pathname.includes('/tours') && !pathname.includes('/activities') && !pathname.includes('/leads') && !pathname.includes('/bookings')
                    ? 'bg-primary text-white'
                    : 'hover:bg-secondary'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/tours"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/tours') ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
              >
                Tours
              </Link>
              <Link
                href="/admin/activities"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/activities') ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
              >
                Activities
              </Link>
              <Link
                href="/admin/leads"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/leads') ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
              >
                Leads
              </Link>
              <Link
                href="/admin/bookings"
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  isActive('/admin/bookings') ? 'bg-primary text-white' : 'hover:bg-secondary'
                }`}
              >
                Bookings
              </Link>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
