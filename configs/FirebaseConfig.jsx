// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-maker-48bd8.firebaseapp.com",
  projectId: "ai-logo-maker-48bd8",
  storageBucket: "ai-logo-maker-48bd8.firebasestorage.app",
  messagingSenderId: "35499699614",
  appId: "1:35499699614:web:2a08c39654494cb1fefa8f",
  measurementId: "G-TLR2XR9619"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);