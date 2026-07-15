// middleware.js
import { NextResponse } from 'next/server'

export function proxy(request) {
  const token = request.cookies.get("liquido_session")?.value;

  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if(!token) {
      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
