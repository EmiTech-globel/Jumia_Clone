import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/cart(.*)',
  '/categories(.*)',
  '/orders(.*)',
  '/product(.*)',
  '/search(.*)',
  // Add other protected routes
]);

export default clerkMiddleware((auth, req) => {
  if (!isProtectedRoute(req)) return; // Skip auth for non-protected routes
  
  // Protect the route
  auth();
});

export const config = {
  matcher: [
    '/((?!_next|success|api|trpc).*)',
    '/(api|trpc)(.*)',
  ],
};