import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { requireAdmin } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | High Adventure Camps',
  description: 'Manage tours, activities, and bookings for High Adventure Camps',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch (error) {
    redirect('/');
  }

  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
}
