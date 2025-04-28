import Input from "../utils/Input";
import Button from "../utils/Button";
import { useNavigate } from "react-router";
import { CreateUser } from "../services/apiUserData";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useState } from "react";
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
    <div className="w-100 md:w-150 lg:w-170  h-150 shadow-2xl bg-[#f0f4f3]  flex flex-col   items-center gap-4 ">
      <h1 className="capitalize text-3xl  text-emerald-700 font-bold mt-10">
        welcome onboard!!
      </h1>
      <span className="mb-4 text-lg md:text-2xl text-[#08130a] opacity-70 font-semibold">
        let&apos;s help you to meet up your task
      </span>
      <span className="capitalize text-3xl text-[#286135] pb-1 lg:pl-20 flex self-start">
        sign up
      </span>
      <form onSubmit={handleSignup}>
        <div className="flex flex-col justify-center items-center gap-8">
          {/* <Input
            type={"text"}
            placeholder={"Enter your fullName"}
            name={"fullName"}
            id={"fullName"}
            // value={}
          /> */}
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
              <div className="flex justify-between items-center bg-slate-200 p-4 shadow-lg overflow-x-hidden">
                {strength && (
                  <div
                    className={` ${getStrengthWidth()}   bg-gray-300 rounded-full h-2.5 dark:bg-gray-700 transition-all duration-500  `}
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
                  <div className="mt-1 text-sm text-gray-600 flex gap-2 self-center">
                    {strength === "weak" && "Weak"}
                    {strength === "medium" && "Medium"}
                    {strength === "strong" && "Strong"}
                    <p> password</p>
                  </div>
                )}

                {strength && (
                  <span
                    className="self-end text-2xl"
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
        </div>
        <span className="flex self-center lg:pt-8">
          {isSubmitting ? (
            <Button label="submitting...." />
          ) : (
            <Button disabled={isSubmitting} label="sign up" />
          )}
          {/* <Button label="sign up" /> */}
        </span>
      </form>
      <div className="flex justify-center items-center gap-2 lg:pt-6 capitalize text-xl md:text-2xl text-[#38884a]">
        <span>existing user ?</span>
        <button onClick={() => navigate("/login")}>
          <span className="flex justify-center items-center gap-2 text-blue-600 hover:underline">
            <span>sign in</span>
          </span>
        </button>
      </div>
    </div>
  );
}
export default SignupPage;
// const handleSignup = async function (e) {
//   e.preventDefault();

//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     // User signed up successfully
//     const user = userCredential.user;
//     console.log("User signed up:", user);
//     setIsSubmitting(true);
//     navigate("/login");
//     return user;
//   } catch (error) {
//     console.error("Error signing up:", error.message);
//     throw error;
//   } finally {
//     setIsSubmitting(false);
//   }
// };
//  style={{
//                       width:
//                         strength === "weak"
//                           ? 35
//                           : strength === "medium"
//                           ? 65
//                           : strength === "strong"
//                           ? 100
//                           : 0,
//                     }}
