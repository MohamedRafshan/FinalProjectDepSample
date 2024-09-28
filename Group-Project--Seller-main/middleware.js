import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(["/",'/sign-in(.*)', '/sign-up(.*)','/api/buyer/:path*','/product/:path*','/store/:path*','/buyer','/api/checkout/notifyPayment','/api/pusher/auth']);

export default clerkMiddleware((auth, request) =>{
  if(!isPublicRoute(request)){
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}