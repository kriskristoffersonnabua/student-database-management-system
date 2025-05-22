import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyB3mRQbcnPdw_wUzIuVnK4c9yLWkFbhKn4",
  authDomain: "sms-application-ae24c.firebaseapp.com",
  projectId: "sms-application-ae24c",
  storageBucket: "sms-application-ae24c.firebasestorage.app",
  messagingSenderId: "862370209496",
  appId: "1:862370209496:web:7e7fc899c583c0d0ac81ad"
})

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);