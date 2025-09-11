import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdzg4yb6FRQGMxctiRVASW77x79VB_1Gg",
  authDomain: "todopro-716d1.firebaseapp.com",
  projectId: "todopro-716d1",
  storageBucket: "todopro-716d1.firebasestorage.app",
  messagingSenderId: "809097875735",
  appId: "1:809097875735:web:0ae6570abd53a960926752",
  measurementId: "G-NZVF1ZQ5L6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

// Enable new Firestore offline persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export const googleProvider = new GoogleAuthProvider();

export default app;
