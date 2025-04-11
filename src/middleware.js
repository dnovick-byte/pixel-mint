import { NextResponse } from 'next/server';

// Protected routes that require authentication
const PROTECTED_ROUTES = [
    //'/draw', // instead block preview after draw ( can i block the api call )
  //  '/my-collection'
];

// This middleware runs on every request
export function middleware(request) {
    const { pathname } =  request.nextUrl;

    // check if requested route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

    if (isProtectedRoute) {
        // Check for auth token in cookies
        const authToken = request.cookies.get('auth-token')?.value;

        // If no auth token is found, redirect to the homepage
        if (!authToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    // Allow the request to continue
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
        * Match all request paths except:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - public files (public assets)
        */ 
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};

// check if the user is authenticated