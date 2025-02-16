// Firebase DB config file
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "auth-domain",
  projectId: "project-id",
  storageBucket: "storage-bucket",
  messagingSenderId: "messaging-sender-id",
  appId: "app-id"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP); // Authentication
export const FIREBASE_DB = getFirestore(FIREBASE_APP); // Database
// Will be exported to other files