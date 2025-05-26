import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  updateProfile,
  getRedirectResult,
} from "firebase/auth";

import { auth, db, googleProvider } from "../firebase";
import { useEffect, useState } from "react";
import {
  collection,
  // collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router";

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
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
  const [accountStatus, setAccountStatus] = useState("Active"); // Default to Active
  const [emailVerified, setEmailVerified] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(null);

  // const storage = getStorage();

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
      // Set joinDate for new user
      setJoinDate(new Date().toISOString());
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
      const user = userCredential.user;
      console.log("User signed in:", user);
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
  }, []);
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

  // Function to upload a new profile picture and update the user's photoURL
  const updatePhotoURL = async (file) => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }
    const storage = getStorage();
    const storageRef = ref(storage, `images/${user.uid}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setProfilePic(url);
      await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      // Optionally update Firestore as well
      await updateDoc(doc(db, "users", user.uid), { profilePic: url });
      return url;
    } catch (error) {
      console.error("Error updating photo URL:", error);
      return false;
    }
  };

  // Store additional user data in Firestore
  useEffect(() => {
    const storeUserData = async () => {
      if (user) {
        const userRef = collection(db, "users");
        const userData = {
          username: username,
          profilePic: profilePic,
          fullName: fullName,
          phoneNumber: phoneNumber,
          dateOfBirth: dateOfBirth,
          streetAddress: streetAddress,
          city: city,
          state: state,
          country: country,
          zipCode: zipCode,
          role: role,
          joinDate: joinDate || new Date().toISOString(),
          lastLogin: lastLogin || new Date().toISOString(),
          accountStatus,
          emailVerified,
        };
        await setDoc(doc(userRef, user.uid), userData, { merge: true });
        console.log("User data stored in Firestore:", userData);
      }
    };
    storeUserData();
  }, [
    user,
    username,
    profilePic,
    fullName,
    phoneNumber,
    dateOfBirth,
    streetAddress,
    city,
    state,
    country,
    zipCode,
    role,
    joinDate,
    lastLogin,
    accountStatus,
    emailVerified,
  ]);

  // Function to update user data in Firestore
  // This function can be used to update user data in Firestore after signing up or signing in
  const updateUserData = async (newData) => {
    try {
      await updateDoc(doc(db, "users", user.uid), newData);
      // If role is updated, update local state immediately for UI reactivity
      if (newData.role !== undefined) {
        setRole(newData.role);
      }
      //Handle error
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUsername(data?.username);
        setProfilePic(data?.profilePic);
        setFullName(data?.fullName);
        setPhoneNumber(data?.phoneNumber);
        setDateOfBirth(data?.dateOfBirth);
        setStreetAddress(data?.streetAddress);
        setCity(data?.city);
        setState(data?.state);
        setCountry(data?.country);
        setZipCode(data?.zipCode);
        setRole(data?.role);
        setJoinDate(data?.joinDate);
        setLastLogin(data?.lastLogin);
        setAccountStatus(data?.accountStatus || "Active");
        setEmailVerified(data?.emailVerified ?? user?.emailVerified ?? false);
        setEmail(user?.email);
      }
    });
    return () => unsubscribe();
  }, [user]);

  // Function to get user data from Firestore
  // This function can be used to retrieve user data from Firestore

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data?.username);
          setProfilePic(data?.profilePic);
          setFullName(data?.fullName);
          setPhoneNumber(data?.phoneNumber);
          setDateOfBirth(data?.dateOfBirth);
          setStreetAddress(data?.streetAddress);
          setCity(data?.city);
          setState(data?.state);
          setCountry(data?.country);
          setZipCode(data?.zipCode);
          setEmail(user?.email);
          setRole(user?.role);
          setJoinDate(data?.joinDate);
          setLastLogin(data?.lastLogin);
          setAccountStatus(data?.accountStatus || "Active");
          setEmailVerified(data?.emailVerified ?? user?.emailVerified ?? false);
          console.log(data);
          return data;
        } else {
          console.log("No such document!");
        }
      }
    };
    getUserData();
  }, [user]);

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
        // handleUpload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
