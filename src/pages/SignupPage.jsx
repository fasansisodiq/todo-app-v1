import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "../utils/Input";
import Button from "../utils/Button";
import { useAuth } from "../authentication/useAuth.js";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import Logo from "../utils/Logo";
import H1 from "../utils/H1.jsx";

function SignupPage() {
  const navigate = useNavigate();
  const { signUp, isSubmitting, hidePassword, toggleHidePassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const checkPasswordStrength = (password) => {
    const strongPassword = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );
    const mediumPassword = new RegExp(
      "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
    );

    if (strongPassword.test(password) && password.length >= 8) {
      setStrength("strong");
    } else if (mediumPassword.test(password)) {
      setStrength("medium");
    } else if (password.length > 0) {
      setStrength("weak");
    } else {
      setStrength("");
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const getStrengthColor = () => {
    if (strength === "weak") return "bg-red-500";
    if (strength === "medium") return "bg-yellow-500";
    if (strength === "strong") return "bg-green-500";
    return "bg-gray-200";
  };

  // Function to create a new user
  const handleSignup = (e) => {
    e.preventDefault();
    if (strength !== "strong") {
      alert(
        "Your password must contain at least 1 number, 1 uppercase, 1 lowercase, and 1 special character"
      );
      return;
    }
    signUp(email, password);
    navigate("/login");
  };

  return (
    <div className="w-full sm:w-[25rem] lg:w-[35rem] max-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-2">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl border border-emerald-100 p-8 flex flex-col items-center gap-6">
        <Logo className="size-20 sm:size-20 md:size-25" />
        <H1>Welcome Onboard!</H1>
        <span className=" text-lg md:text-xl text-[#08130a] opacity-70 font-semibold text-center">
          Let&apos;s help you meet your goals
        </span>
        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
          <span className="capitalize text-lg md:text-xl text-stone-800 pb-1 self-start">
            Sign up
          </span>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Input
                type={hidePassword ? "password" : "text"}
                placeholder="Enter new password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-600 text-xl cursor-pointer"
                onClick={toggleHidePassword}
                tabIndex={0}
                role="button"
                aria-label="Toggle password visibility"
              >
                {hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
              </span>
            </div>
            {/* Password strength bar */}
            {strength && (
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${getStrengthColor()}`}
                    style={{
                      width:
                        strength === "weak"
                          ? "33%"
                          : strength === "medium"
                          ? "66%"
                          : strength === "strong"
                          ? "100%"
                          : "0%",
                    }}
                  ></div>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    strength === "weak"
                      ? "text-red-500"
                      : strength === "medium"
                      ? "text-yellow-500"
                      : strength === "strong"
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {strength.charAt(0).toUpperCase() + strength.slice(1)}
                </span>
              </div>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            label={isSubmitting ? "Submitting..." : "Sign Up"}
            className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg transition-all duration-200 text-lg mt-2"
          />
        </form>
        <div className="w-full flex justify-center items-center border-t mt-4 pt-4 border-t-slate-200 gap-2 text-base text-[#38884a]">
          <span>Existing user?</span>
          <Link to="/login">
            <span className="flex items-center gap-2 text-blue-600 hover:underline font-semibold">
              Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
