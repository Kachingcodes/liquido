// middleware.js
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Import Firebase inside the middleware function to avoid server-side issues
  const { getAuth } = await import('firebase/auth')
  const { initializeApp, getApps } = await import('firebase/app')
  
  // Import your Firebase config
  const firebaseConfig = {
  apiKey: "AIzaSyCK97eo8xyVOqmAiug6YeeuqDBm_HzuZRk",
  authDomain: "liquido-99b05.firebaseapp.com",
  projectId: "liquido-99b05",
  storageBucket: "liquido-99b05.firebasestorage.app",
  messagingSenderId: "551428334367",
  appId: "1:551428334367:web:89f406bea4c6834a51c62a",
  measurementId: "G-6ET556Q1CB"
  }
  
  // Initialize Firebase if not already initialized
  if (!getApps().length) {
    initializeApp(firebaseConfig)
  }
  
  const auth = getAuth()
  const user = auth.currentUser
  
  // Define protected routes
  const protectedRoutes = ['/admin', '/dashboard', '/admin/dashboard', '/admin/products']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  // If accessing protected route and not authenticated
  if (isProtectedRoute && !user) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  
  // If accessing login page while already authenticated
  if (request.nextUrl.pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/login']
}