import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "webapp-5e9c4.firebaseapp.com",
  projectId: "webapp-5e9c4",
  storageBucket: "webapp-5e9c4.appspot.com",
  messagingSenderId: "993768902521",
  appId: "1:993768902521:web:a04f88e5cb4f515fc2e9a8",
  measurementId: "G-KS9NZ7DX94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
export const auth = getAuth();
