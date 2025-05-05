import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdzg4yb6FRQGMxctiRVASW77x79VB_1Gg",
  authDomain: "todopro-716d1.firebaseapp.com",
  projectId: "todopro-716d1",
  storageBucket: "todopro-716d1.firebasestorage.app",
  messagingSenderId: "809097875735",
  appId: "1:809097875735:web:0ae6570abd53a960926752",
  measurementId: "G-NZVF1ZQ5L6",
};

// const { setTasks, setIsLoading } = useTasks();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
