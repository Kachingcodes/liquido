// middleware.js
import { NextResponse } from 'next/server'
import { adminAuth } from "./firebase/firebase-admin";


export async function proxy(request) {
  // console.log("Proxy running:", request.nextUrl.pathname);
  const token = request.cookies.get("liquido_session")?.value;

  if (!token) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    try {
        await adminAuth.verifySessionCookie(
            token,
            true
        );

        return NextResponse.next();

    } catch (error) {
    console.error("Session verification failed:");
    console.error(error);

    return NextResponse.redirect(
        new URL("/login", request.url)
    );
}
}

export const config = {
    matcher:["/admin/:path*"]
};
