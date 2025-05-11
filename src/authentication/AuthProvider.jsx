import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  updateProfile,
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

export function AuthProvider({ children }) {
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
  // const handleUpload = async () => {
  //   if (!profilePic) return;

  //   const imageRef = ref(storage, `images/${profilePic.name}`);
  //   await uploadBytes(imageRef, profilePic);
  //   const downloadURL = await getDownloadURL(imageRef);
  //   setProfilePic(downloadURL);
  //   console.log(downloadURL);
  //   await updateProfile(auth.currentUser, {
  //     displayName: username,
  //     photoURL: downloadURL,
  //   });
  //   // Use downloadURL to update user profile or display the profilePic
  // };

  const updatePhotoURL = async (file) => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    } // No file selected
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setProfilePic(url);
      console.log(url);
      await updateProfile(user, {
        photoURL: url,
      });
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
  ]);

  // Function to update user data in Firestore
  // This function can be used to update user data in Firestore after signing up or signing in
  const updateUserData = async (newData) => {
    try {
      await updateDoc(doc(db, "users", user.id), newData);
    } catch (error) {
      // Handle errors
      console.error("Error updating user data:", error);
      // alert("Error updating user data:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "user"), (snapshot) => {
      const user = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsername(user?.username);
      setProfilePic(user?.profilePic);
      setFullName(user?.fullName);
      setPhoneNumber(user?.phoneNumber);
      setDateOfBirth(user?.dateOfBirth);
      setStreetAddress(user?.streetAddress);
      setCity(user?.city);
      setState(user?.state);
      setCountry(user?.country);
      setZipCode(user?.zipCode);
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

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

        // handleUpload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
