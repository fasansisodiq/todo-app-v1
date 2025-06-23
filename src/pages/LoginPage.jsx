import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill, BsGoogle } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { useAuth } from "../authentication/useAuth.js";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase.js";
import Message from "../utils/Message.jsx";
import Logo from "../utils/Logo";

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

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
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
  const handleSignInWithGoogle = async () => {
    try {
      await googleSignin();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-2">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl border border-emerald-100 p-8 flex flex-col items-center gap-6">
        <Logo size={48} />
        <h1 className="text-emerald-700 text-3xl font-extrabold text-center tracking-wide">
          Welcome Back!
        </h1>
        <form className={`flex flex-col gap-6 w-full`} onSubmit={handleLogin}>
          <div>
            <h2 className="text-xl md:text-2xl text-slate-800 mb-4 font-semibold text-center">
              Log in to your account
            </h2>
            <div className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="relative">
                <Input
                  width="w-full"
                  type="email"
                  error={incorrectEmail}
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pr-10"
                />
                {(incorrectEmail || userNotFound) && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 text-xl">
                    <CiWarning />
                  </span>
                )}
              </div>
              {/* Password Input */}
              <div className="relative">
                <Input
                  width="w-full"
                  error={incorrectPassword}
                  type={hidePassword ? "password" : "text"}
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                {password.length > 0 && (
                  <span
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-emerald-600 text-xl cursor-pointer"
                    onClick={toggleHidePassword}
                  >
                    {hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                  </span>
                )}
                {incorrectPassword && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-600 text-xl">
                    <CiWarning />
                  </span>
                )}
              </div>
              {/* Error Messages */}
              {userNotFound && (
                <Message
                  color="red"
                  msg="The username or password you entered is incorrect or Invalid login credentials"
                />
              )}
              {incorrectPassword && (
                <Message
                  color="red"
                  msg="The username or password you entered is incorrect or Invalid login credentials"
                />
              )}
              {incorrectEmail && (
                <Message
                  color="red"
                  msg="We couldn't find a user with that email. Please double-check your input"
                />
              )}
            </div>
          </div>
          <Button
            label="Log In"
            className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg transition-all duration-200 text-lg"
          />
        </form>
        <div className="flex justify-between items-center w-full mt-2">
          <Link
            to="/forget-password"
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Forgot password?
          </Link>
          <span className="text-slate-400 text-sm">or</span>
          <button
            onClick={handleSignInWithGoogle}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 bg-white hover:bg-emerald-50 text-emerald-700 font-semibold shadow transition-all duration-200 text-sm"
          >
            <BsGoogle className="text-lg" />
            Login with Google
          </button>
        </div>
        <div className="w-full text-center mt-4 text-[#183a1f] text-sm lg:text-base">
          <span>New user? </span>
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
