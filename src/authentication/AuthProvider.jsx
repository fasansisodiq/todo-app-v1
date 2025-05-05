import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";
import { useState } from "react";

export function AuthProvider({ children }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(null);
  function toggleHidePassword() {
    setHidePassword(!hidePassword);
  }


  // Function to create a new user
  const signUp = async function (email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User signed up successfully
      const user = userCredential.user;
      console.log("User signed up:", user);
      setIsSubmitting(true);
      return user;
    } catch (error) {
      console.error("Error signing up:", error.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to sign in an existing user
  const signIn = async function (email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // User signed in successfully
      const user = userCredential.user;
      console.log("User signed in:", user);
      setError(null);
      // return user;
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.code);
      throw error;
    }
  };
  //function to sign in an existing user with google
  const googleSignin = async function () {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };
  // Function to sign out the current user
  const logOut = async function () {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  };


  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        googleSignin,
        logOut,
        isSubmitting,
        hidePassword,
        toggleHidePassword,
        errorCode: error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
