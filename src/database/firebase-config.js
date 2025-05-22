import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBHrXflcOsPaGZnhF3E2o0gyO3z3nTObxM",
  authDomain: "student-database-application.firebaseapp.com",
  projectId: "student-database-application",
  storageBucket: "student-database-application.firebasestorage.app",
  messagingSenderId: "308470630006",
  appId: "1:308470630006:web:476a2cb07e9206c5a1c157"
})

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);