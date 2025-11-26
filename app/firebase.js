// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCK97eo8xyVOqmAiug6YeeuqDBm_HzuZRk",
  authDomain: "liquido-99b05.firebaseapp.com",
  projectId: "liquido-99b05",
  storageBucket: "liquido-99b05.firebasestorage.app",
  messagingSenderId: "551428334367",
  appId: "1:551428334367:web:89f406bea4c6834a51c62a",
  measurementId: "G-6ET556Q1CB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);