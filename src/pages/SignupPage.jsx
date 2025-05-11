import { useState } from "react";
import { Link, useNavigate } from "react-router";

import Input from "../utils/Input";
import Button from "../utils/Button";

import { useAuth } from "../authentication/useAuth.js";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

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

  const getStrengthWidth = () => {
    if (strength === "weak") return "w-1/2";
    if (strength === "medium") return "w-1/2";
    if (strength === "strong") return "w-1/2";
    return "w-0";
  };
  // Function to create a new user
  const handleSignup = (e) => {
    e.preventDefault();
    if (strength !== "strong") {
      alert(
        "Your password must contain at least 1 number and 1 uppercase and 1 lowercase and 1 special character"
      );
      return;
    }
    signUp(email, password);
    navigate("/login");
  };

  return (
    <div className="w-100 md:w-150 lg:w-170  min-h-150 md:min-h-fit md:pb-12 rounded-lg md:mt-4 shadow-2xl   bg-white  flex flex-col   items-center gap-4 ">
      <h1 className="capitalize text-3xl  text-emerald-700 font-bold mt-10">
        welcome onboard!!
      </h1>
      <span className="mb-4 text-lg md:text-2xl text-[#08130a] opacity-70 font-semibold">
        let&apos;s help you to meet up your task
      </span>

      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-4 bg-[#f0f4f3] p-4  md:p-8 lg:p-12 border-2 border-slate-100 rounded-lg shadow-sm"
      >
        <span className="capitalize text-lg md:text-xl text-stone-800 pb-1   self-start">
          sign up
        </span>

        <Input
          type={"email"}
          placeholder={"Enter your email"}
          name={"email"}
          id={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex flex-col gap-4">
          <Input
            type={`${hidePassword ? "password" : "text"}`}
            placeholder={"Enter new password"}
            name={" password"}
            id={" password"}
            value={password}
            onChange={handlePasswordChange}
          />
          {strength && (
            <div className="flex justify-center items-center max-h-fit gap-2 bg-slate-200 p-1 shadow-lg overflow-x-hidden">
              {strength && (
                <div
                  className={` ${getStrengthWidth()}   bg-gray-300 rounded-full h-1.5 md:h-2 lg:h-2.5 dark:bg-gray-700 transition-all duration-500  `}
                >
                  <div
                    className={`${getStrengthColor()} w-${
                      strength === "weak"
                        ? 15
                        : strength === "medium"
                        ? 35
                        : strength === "strong"
                        ? 62
                        : 0
                    } h-full transition-all duration-500 rounded-full `}
                  ></div>
                </div>
              )}
              {strength && (
                <div className="text-[0.6rem] sm:text-sm text-gray-600 flex gap-1 self-center">
                  {strength === "weak" && "Weak"}
                  {strength === "medium" && "Medium"}
                  {strength === "strong" && "Strong"}
                  <p> password</p>
                </div>
              )}

              {strength && (
                <span
                  className="self-end text-lg lg:text-2xl"
                  onClick={toggleHidePassword}
                >
                  {hidePassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </span>
              )}
            </div>
          )}
        </div>

        {/* <Input
            type={"password"}
            placeholder={"Confirm  password"}
            name={"confirmPassword"}
            id={"confirmPassword"}
          /> */}

        <span className="flex self-center pt-4 lg:pt-8">
          {isSubmitting ? (
            <Button label="submitting...." />
          ) : (
            <Button disabled={isSubmitting} label="sign up" />
          )}
        </span>
      </form>
      <div className=" w-full flex justify-center items-center border-t-1 mt-4 pt-4 border-t-slate-300 gap-2 lg:pt-6 capitalize text-xl md:text-2xl text-[#38884a]">
        <span>existing user ?</span>
        <Link to="/login">
          <span className="flex justify-center items-center gap-2 text-blue-600 hover:underline">
            <span>sign in</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
export default SignupPage;
