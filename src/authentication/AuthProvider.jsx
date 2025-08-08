import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  updateProfile,
  getRedirectResult,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import { useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router";

// Helper to resize image and return base64 string
const resizeImage = (file, maxSize = 256) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height *= maxSize / width));
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width *= maxSize / height));
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [joinDate, setJoinDate] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [accountStatus, setAccountStatus] = useState("Active");
  const [emailVerified, setEmailVerified] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const fileInputRef = useRef(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Load profilePic from Firestore and cache in localStorage
  useEffect(() => {
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setProfilePic(data.profilePic || "");
        setUsername(data.username || "");
        setFullName(data.fullName || "");
        setPhoneNumber(data.phoneNumber || "");
        setDateOfBirth(data.dateOfBirth || "");
        setStreetAddress(data.streetAddress || "");
        setCity(data.city || "");
        setState(data.state || "");
        setCountry(data.country || "");
        setZipCode(data.zipCode || "");
        setRole(data.role || "User");
        setEmail(data.email || currentUser.email || "");
        setJoinDate(data.joinDate || "");
        setLastLogin(data.lastLogin || "");
        setAccountStatus(data.accountStatus || "Active");
        setEmailVerified(
          data.emailVerified !== undefined
            ? data.emailVerified
            : currentUser.emailVerified || false
        );
        // Cache profilePic per user
        if (data.profilePic) {
          localStorage.setItem(
            `profilePic_${currentUser.uid}`,
            data.profilePic
          );
        }
      } else {
        setProfile(null);
        setProfilePic("");
        setUsername("");
        setFullName("");
        setPhoneNumber("");
        setDateOfBirth("");
        setStreetAddress("");
        setCity("");
        setState("");
        setCountry("");
        setZipCode("");
        setRole("User");
        setEmail(currentUser.email || "");
        setJoinDate("");
        setLastLogin("");
        setAccountStatus("Active");
        setEmailVerified(currentUser.emailVerified || false);
      }
    });
    return () => unsubscribe();
  }, [currentUser]);

  // When profilePic changes, update Firestore and localStorage for the current user
  useEffect(() => {
    if (!currentUser || !profilePic) return;
    updateDoc(doc(db, "users", currentUser.uid), { profilePic });
    localStorage.setItem(`profilePic_${currentUser.uid}`, profilePic);
  }, [profilePic, currentUser]);

  // When user logs in, load profilePic from localStorage cache if available
  useEffect(() => {
    if (!currentUser) return;
    const cachedPic = localStorage.getItem(`profilePic_${currentUser.uid}`);
    if (cachedPic) setProfilePic(cachedPic);
  }, [currentUser]);

  // Handle profile image file input
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const resized = await resizeImage(file, 256);
      setProfilePic(resized);
    }
  };

  function toggleHidePassword() {
    setHidePassword((prev) => !prev);
  }
  // Sign up new user (allow re-registration if Firestore user doc is missing)
  const signUp = async (email, password) => {
    try {
      setIsSubmitting(true);
      // Try to create a new Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Always (re)create the Firestore user profile
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        joinDate: new Date().toISOString(),
        role: "User",
        accountStatus: "Active",
        emailVerified: user.emailVerified || false,
      });

      alert(
        "A verification email has been sent to your email address. Please verify your email before logging in."
      );
      await signOut(auth);
      navigate("/login");
      return user;
    } catch (error) {
      setIsSubmitting(false);
      if (error.code === "auth/email-already-in-use") {
        // Try to sign in to check if the user is deleted in Firestore
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (!userDoc.exists()) {
            // User exists in Auth but not in Firestore, recreate Firestore profile
            await setDoc(doc(db, "users", user.uid), {
              email: user.email,
              joinDate: new Date().toISOString(),
              role: "User",
              accountStatus: "Active",
              emailVerified: user.emailVerified || false,
            });
            alert(
              "Account restored. Please verify your email before logging in."
            );
            await signOut(auth);
            navigate("/login");
            return user;
          } else {
            alert(
              "This email address is already in use. Please use a different email or log in."
            );
            await signOut(auth);
            return;
          }
        } catch (signInError) {
          console.log(signInError);
          alert(
            "This email address is already in use. Please use a different email or log in."
          );
          return;
        }
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  // // Sign up new user (allow re-registration if Firestore user doc is missing)
  // const signUp = async (email, password) => {
  //   try {
  //     setIsSubmitting(true);
  //     // Try to create a new Firebase Auth user
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const user = userCredential.user;
  //     setJoinDate(new Date().toISOString());

  //     await sendEmailVerification(user);
  //     // Always (re)create the Firestore user profile
  //     await setDoc(doc(db, "users", user.uid), {
  //       email: user.email,
  //       joinDate: new Date().toISOString(),
  //       role: "User",
  //       accountStatus: "Active",
  //       emailVerified: user.emailVerified || false,
  //     });

  //     alert(
  //       "A verification email has been sent to your email address. Please verify your email before logging in."
  //     );
  //     await signOut(auth);
  //     navigate("/login");
  //     return user;
  //   } catch (error) {
  //     setIsSubmitting(false);
  //     if (error.code === "auth/email-already-in-use") {
  //       alert(
  //         "This email address is already in use. Please use a different email or log in."
  //       );
  //       return;
  //     }
  //     throw error;
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Sign in existing user
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await user.reload();
      if (!user.emailVerified) {
        await signOut(auth);
        alert(
          "Your email is not verified. Please check your inbox and verify your email before logging in."
        );
        throw new Error("Email not verified");
      }
      setError(null);
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        lastLogin: new Date().toISOString(),
      });
      setLastLogin(new Date().toISOString());
      navigate("/layout");
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.code);
      throw error;
    }
  };

  // Google sign-in
  const googleSignin = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    }
  };

  // Handle Google redirect result
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          const userRef = doc(db, "users", result.user.uid);
          await updateDoc(userRef, {
            lastLogin: new Date().toISOString(),
          });
          setLastLogin(new Date().toISOString());
          setError(null);
          navigate("/layout");
        }
      })
      .catch((error) => {
        console.error("Google sign-in redirect error:", error.message);
        setError(error.code);
      });
  }, [navigate]);

  // Sign out
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  };

  // Update user profile in Firebase Auth
  async function updateUserProfile(data) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.username,
        photoURL: data.profilePic,
      });
      alert("Profile updated!");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Error updating profile:", error.message);
      throw error;
    }
  }

  // Update user data in Firestore
  const updateUserData = async (newData) => {
    try {
      await updateDoc(doc(db, "users", currentUser.uid), newData);
      if (newData.role !== undefined) setRole(newData.role);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Update profilePic in localStorage by resizing
  const updatePhotoURL = async (file) => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
    try {
      const resized = await resizeImage(file, 256);
      setProfilePic(resized);
      localStorage.setItem(`profilePic_${currentUser.uid}`, resized);
      return resized;
    } catch (error) {
      console.error("Error updating photo URL:", error);
      return false;
    }
  };
  // Password reset function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        "✨ Password reset link sent! Please check your inbox (and spam folder). Follow the instructions in the email to securely reset your password."
      );
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("No account found with that email address.");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        authLoading,
        signUp,
        signIn,
        googleSignin,
        logOut,
        isSubmitting,
        hidePassword,
        toggleHidePassword,
        errorCode: error,
        username,
        setUsername,
        profilePic,
        setProfilePic,
        updateUserProfile,
        fullName,
        setFullName,
        phoneNumber,
        setPhoneNumber,
        dateOfBirth,
        setDateOfBirth,
        streetAddress,
        setStreetAddress,
        city,
        setCity,
        state,
        setState,
        country,
        setCountry,
        zipCode,
        setZipCode,
        email,
        setEmail,
        updateUserData,
        role,
        setRole,
        joinDate,
        setJoinDate,
        lastLogin,
        setLastLogin,
        accountStatus,
        setAccountStatus,
        emailVerified,
        setEmailVerified,
        updatePhotoURL,
        profile,
        currentUser,
        setProfile,
        fileInputRef,
        handleFileChange,
        handleImageClick,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
