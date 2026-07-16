import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
};

console.log(process.env.FIREBASE_ADMIN_PRIVATE_KEY.startsWith("-----BEGIN"));
console.log(process.env.FIREBASE_ADMIN_PRIVATE_KEY.endsWith("-----END PRIVATE KEY-----\n"));
 

const adminApp = 
    getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
    })
    : getApps()[0];

    export const adminAuth = getAuth(adminApp);