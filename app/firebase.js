import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqoz3lGJsPWF-5RZXf9pjeXI1YKG7mLfU",
  authDomain: "liquido-ad440.firebaseapp.com",
  projectId: "liquido-ad440",
  storageBucket: "liquido-ad440.firebasestorage.app",
  messagingSenderId: "41043441848",
  appId: "1:41043441848:web:9dadd1588510a951045c4d",
  measurementId: "G-Z0JXQPYRB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);