import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/search',
  '/api/search',
  '/api/webhooks/(.*)',
  '/customer-care',
  '/about',
  '/packages',
  '/packages/(.*)',
  '/tours',
  '/tours/(.*)',
  '/activities',
  '/activities/(.*)',
  '/contact',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/tours(.*)',
  '/api/activities(.*)',
  '/api/payment/create-order',
  '/api/payment/verify-payment',
  '/api/bookings/(.*)',
  '/api/leads',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    const { userId } = await auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
