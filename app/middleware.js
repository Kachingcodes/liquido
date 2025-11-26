import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // 🚫 Make sure middleware NEVER runs on /login or on static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/login")
  ) {
    return NextResponse.next();
  }

  // 🛡 Protect /admin
  if (pathname.startsWith("/admin")) {
    const isLoggedIn = req.cookies.get("adminToken")?.value;

    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Make sure matcher ONLY catches admin
export const config = {
  matcher: ["/admin/:path*"],
};
