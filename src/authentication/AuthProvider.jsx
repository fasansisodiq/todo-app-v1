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
  const user = auth.currentUser;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(
    () => localStorage.getItem("profilePic") || null
  );
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [accountStatus, setAccountStatus] = useState("Active");
  const [emailVerified, setEmailVerified] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef(null);

  // Sync profilePic with localStorage on mount and when changed
  useEffect(() => {
    const storedPic = localStorage.getItem("profilePic");
    if (storedPic) setProfilePic(storedPic);
  }, []);

  useEffect(() => {
    if (profilePic) {
      localStorage.setItem("profilePic", profilePic);
    }
  }, [profilePic]);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // When profilePic changes, update Firestore and localStorage for the current user
  useEffect(() => {
    if (!currentUser || !profilePic) return;
    // Save to Firestore
    updateDoc(doc(db, "users", currentUser.uid), { profilePic });
    // Save to localStorage with user-specific key
    localStorage.setItem(`profilePic_${currentUser.uid}`, profilePic);
  }, [profilePic, currentUser]);

  // When user logs in, load profilePic from localStorage cache if available
  useEffect(() => {
    if (!currentUser) return;
    const cachedPic = localStorage.getItem(`profilePic_${currentUser.uid}`);
    if (cachedPic) setProfilePic(cachedPic);
  }, [currentUser]);

  // Update profilePic (resize, set state, and Firestore)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Resize and store in localStorage
      const resized = await resizeImage(file, 256); // 256px max dimension
      setProfilePic(resized);
      // localStorage.setItem("profilePic", resized);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  function toggleHidePassword() {
    setHidePassword(!hidePassword);
  }

  // Function to create a new user and store profile in Firestore
  const signUp = async function (email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setIsSubmitting(true);
      setJoinDate(new Date().toISOString());

      // Send email verification
      await sendEmailVerification(user);

      // Store initial profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        joinDate: new Date().toISOString(),
        role: "User",
        accountStatus: "Active",
        emailVerified: user.emailVerified || false,
      });

      // Show message to user
      alert(
        "A verification email has been sent to your email address. Please verify your email before logging in."
      );

      //  sign out the user immediately after signup to prevent login before verification
      await signOut(auth);
      // Redirect to login page
      navigate("/login");
      return user;
    } catch (error) {
      setIsSubmitting(false);
      // Handle email already in use error
      if (error.code === "auth/email-already-in-use") {
        alert(
          "This email address is already in use. Please use a different email or log in."
        );
        return;
      }
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
      const user = userCredential.user;
      // Reload user to get latest emailVerified status
      await user.reload();
      // Block login if email is not verified
      if (!user.emailVerified) {
        await signOut(auth);
        alert(
          "Your email is not verified. Please check your inbox and verify your email before logging in."
        );
        throw new Error("Email not verified");
      }

      setError(null);

      // Update lastLogin in Firestore
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

  //function to sign in an existing user with google
  const googleSignin = async function () {
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
          // Optionally update Firestore with lastLogin
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

  //functions to update user profile
  async function updateUserProfile(data) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.username,
        photoURL: data.profilePic,
      });
      // Profile updated!
      console.log("Profile updated!");
      alert("Profile updated!");
    } catch (error) {
      // An error occurred.
      console.error("Error updating profile:", error.message);
      alert("Error updating profile:", error.message);
      throw error;
    }
  }

  // Function to update profilePic in localStorage by resizing
  const updatePhotoURL = async (file) => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
    try {
      const resized = await resizeImage(file, 256); // 256px max dimension
      setProfilePic(resized);
      localStorage.setItem("profilePic", resized);
      // Optionally update Firestore and Firebase Auth with the base64 string or upload to storage if needed
      // await updateProfile(auth.currentUser, { photoURL: resized });
      // await updateDoc(doc(db, "users", auth.currentUser.uid), { profilePic: resized });
      return resized;
    } catch (error) {
      console.error("Error updating photo URL:", error);
      return false;
    }
  };

  // Function to update user data in Firestore
  const updateUserData = async (newData) => {
    try {
      await updateDoc(doc(db, "users", currentUser.uid), newData);
      if (newData.role !== undefined) {
        setRole(newData.role);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Function to get user data from Firestore
  useEffect(() => {
    if (!currentUser) return;
    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setProfilePic(
          localStorage.getItem("profilePic") || data.profilePic || ""
        );
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
