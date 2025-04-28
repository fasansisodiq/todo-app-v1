import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill, BsGoogle } from "react-icons/bs";

import Input from "../utils/Input";
import Button from "../utils/Button";
import { useAuth } from "../authentication/useAuth.js";
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  inMemoryPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase.js";
import Message from "../utils/Message.jsx";
import { CiWarning } from "react-icons/ci";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, googleSignin, hidePassword, toggleHidePassword, errorCode } =
    useAuth();

  const incorrectPassword = errorCode === "auth/wrong-password";
  const userNotFound = errorCode === "auth/user-not-found";
  const incorrectEmail = errorCode === "auth/wrong-email";
  // Sign in an existing user
  const handleLogin = (e) => {
    e.preventDefault();
    signIn(email, password);
    navigate("/layout");
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  //function to sign in an existing user with google
  const handleSigninWithGoogle = (e) => {
    e.preventDefault();
    googleSignin();
    navigate("/layout");

    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        const provider = new GoogleAuthProvider();
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        return signInWithRedirect(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className=" w-100 md:w-150 lg:w-170  h-150  bg-[#f0f4f3] flex flex-col justify-center items-center  text-center shadow-2xl ">
      <h1 className="text-emerald-700 text-3xl  font-bold pb-8 sm:pb-10">
        welcome back!!!
      </h1>
      <form
        className="flex flex-col justify-center items-center w-150 h-fit border-2 border-slate-200 border-t-0 border-x-0 pb-5 lg:pb-8"
        onSubmit={handleLogin}
      >
        <div>
          <h2 className="text-xl text-[#286135] pb-6 pl-5 flex self-start ">
            Log in to TodoPro
          </h2>
          <div className="flex flex-col  gap-4 items-center ">
            <div className="w-full  p-4 flex h-14 items-center justify-between border-1 border-stone-100">
              <span className="text-red-700  pr-1">
                {incorrectEmail ? <CiWarning /> : ""}
              </span>
              <Input
                width={
                  email.length > 0
                    ? "w-50  sm:w-65 md:w-80 lg:w-110 xl:w-120"
                    : ""
                }
                type={"email"}
                error={incorrectEmail}
                placeholder={"Enter your email"}
                name={"email"}
                id={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full  p-4 flex h-14 items-center justify-between border-1 border-stone-100">
              <span className="text-red-700  pr-1">
                {incorrectPassword ? <CiWarning /> : ""}
              </span>
              <Input
                width={
                  password.length > 0
                    ? "w-50  sm:w-65 md:w-80 lg:w-110 xl:w-120"
                    : ""
                }
                error={incorrectPassword}
                type={`${hidePassword ? "password" : "text"}`}
                placeholder={"Enter your password"}
                name={"password"}
                id={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <span
                  className="self-end text-2xl"
                  onClick={toggleHidePassword}
                >
                  {hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </span>
              )}
            </div>

            {userNotFound && (
              <Message
                color={"red"}
                msg={
                  "The username or password you entered is incorrect or Invalid login credentials"
                }
              />
            )}

            {incorrectPassword && (
              <Message
                color={"red"}
                msg={
                  "The username or password you entered is incorrect or Invalid login credentials"
                }
              />
            )}
            {incorrectEmail && (
              <Message
                color={"red"}
                msg={
                  "We couldn't find a user with that email. Please double-check your input"
                }
              />
            )}

            <span className="lg:pt-4 self-start pl-5 ">
              <Button label="log in" />
            </span>
          </div>
        </div>
      </form>
      <div className="flex justify-center items-center gap-2 text-center text-2xl text-blue-600">
        <Link to="/#">
          <span className="capitalize flex justify-center items-center gap-2 p-4  text-lg ">
            <span>forget password ? </span>
          </span>
        </Link>
      </div>

      <div className="capitalize   text-center text-[#183a1f] text-xl ">
        <span>new user ? </span>
        <span className="text-blue-600">
          <button type="link" onClick={() => navigate("/signup")}>
            sign up
          </button>
        </span>
        <div className=" flex justify-center items-center w-full gap-2.5 pt-5">
          <p className="text-sm text-slate-400">or login with google</p>
          <button onClick={handleSigninWithGoogle} className=" text-red-700 ">
            <BsGoogle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
