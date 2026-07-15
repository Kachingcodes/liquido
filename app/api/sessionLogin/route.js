import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "../../../firebase/firebase-admin";

export async function POST(request) {
    try{
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json(
                { error: "MISSING ID TOKEN" },
                { status: 400 }
            );
        }

        const expiresIn = 1000 * 60 * 60 * 24 * 5;

        await adminAuth.verifyIdToken(idToken);

        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn,
        });
        const cookieStore = await cookies();

        cookieStore.set("liquido_session", sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    path: "/",
    });

    return NextResponse.json({
        success:true,
    });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                error: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }
}