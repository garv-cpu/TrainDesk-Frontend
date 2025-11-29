import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBPMR-prjPy8T3nR75ytAI-ODbAP8yCqp8",
  authDomain: "traindesk-79911.firebaseapp.com",
  projectId: "traindesk-79911",
  storageBucket: "traindesk-79911.firebasestorage.app",
  messagingSenderId: "675572663326",
  appId: "1:675572663326:web:9dc309f34775b1019b9a0f",
  measurementId: "G-C7379H2K90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (optional)
getAnalytics(app);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
