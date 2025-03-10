import { useState } from "react";
import Input from "../utils/Input";
import Button from "../utils/Button";
import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import { CreateUser } from "../services/apiUserData";
import { Form } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting...";
  const formErrors = useActionData();

  return (
    <div className="w-250 h-full bg-[#f0f4f3]  flex flex-col  items-center gap-4 ">
      <h1 className="capitalize text-3xl md:text-5xl text-[#204e2a] font-bold mt-10">
        welcome onboard!!
      </h1>
      <span className="mb-4 text-lg md:text-2xl text-[#08130a] opacity-70 font-semibold">
        let&apos;s help you to meet up your task
      </span>
      <Form method="POST">
        <div className="flex flex-col justify-center items-center gap-8">
          <div>
            <Input
              type={"text"}
              placeholder={"Enter your fullName"}
              name={"fullName"}
              id={"fullName"}
            />
            {formErrors?.fullName && <span>{formErrors.fullName}</span>}
          </div>
          <div>
            <Input
              type={"email"}
              placeholder={"Enter your email"}
              name={"email"}
              id={"email"}
            />
            {formErrors?.email && <span>{formErrors.email}</span>}
          </div>
          <div>
            <Input
              type={"password"}
              placeholder={"Enter new password"}
              name={" password"}
              id={" password"}
            />
            {formErrors?.password && <span>{formErrors.password}</span>}
          </div>
          <div>
            <Input
              type={"password"}
              placeholder={"Confirm  password"}
              name={"confirmPassword"}
              id={"confirmPassword"}
            />
            {formErrors?.confirmPassword && (
              <span>{formErrors.confirmPassword}</span>
            )}
          </div>
          {isSubmitting ? (
            <Button label="submitting...." />
          ) : (
            <Button disabled={isSubmitting} label="Register" />
          )}
        </div>
      </Form>
      <div className="flex justify-center items-center gap-2  capitalize text-xl md:text-2xl text-[#38884a]">
        <span>existing user ?</span>
        <button onClick={() => navigate("/login")}>
          <span className="flex justify-center items-center gap-2">
            <span>sign in</span>
            <span className="text-3xl">
              <BiSolidRightArrowCircle />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  console.log(user);
  const errors = {};
  if (!user.fullName.trim()) {
    errors.fullName = "Username is required";
  } else if (user.fullName.length < 4) {
    errors.fullName = "Username must be at least 4 characters long";
  }
  if (!user.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = "Email is invalid";
  }

  if (!user.password) {
    errors.password = "Password is required";
  } else if (user.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  if (user.confirmPassword !== user.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors) > 0) return errors;

  const newUser = await CreateUser(user);
  console.log(newUser);
  // if (newUser) {
  //   return redirect("/login");
  // }
  // return newUser;
  return redirect("/login");
}
export default SignupPage;
