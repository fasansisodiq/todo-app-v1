import Input from "../utils/Input";
import {
  Form,
  Link,
  // redirect,
  // useLoaderData,
  useNavigate,
} from "react-router-dom";
import Button from "../utils/Button";
import { BiSolidRightArrowCircle } from "react-icons/bi";
// import logo from "../logo/logo-big.png";
// import { getUser } from "../services/apiUserData";
import { useEffect, useState } from "react";
// import { dispatch } from "../customHooks/authentication/AuthProvider";
import { getUser } from "../services/apiUserData";
import { useAuth } from "../customHooks/authentication/useAuth";
function LoginPage() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const userData = { email: email, password: password };

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const user = getUser(userData);
  console.log(user);
  // useEffect(
  //   function login(email, password) {
  //     if (email === userData.email && password === userData.password) {
  //       dispatch({ type: "login", payload: userData });
  //     }
  //   },
  //   [userData]
  // );

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  // const existingUser = useLoaderData();
  // console.log(existingUser);
  return (
    <div className=" w-100 md:w-150 lg:w-170  h-150  bg-[#f0f4f3] flex flex-col justify-center items-center  text-center shadow-2xl ">
      <h1 className="text-[#183a1f] text-4xl  font-extrabold pb-8 sm:pb-10">
        welcome back!!!
      </h1>
      {/* <img className="size-50 opacity-80" src={logo} alt="app logo" /> */}
      <form
        className="flex flex-col items-center w-150 h-fit  "
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-3xl text-[#286135] pb-6  ">Log in to TodoPro</h2>
          <div className="flex flex-col  gap-4 items-center ">
            <Input
              type={"email"}
              placeholder={"Enter your email"}
              name={"email"}
              id={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type={"password"}
              placeholder={"Enter your password"}
              name={"password"}
              id={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button label="login" />
            <div className="flex justify-center items-center gap-2 text-center text-2xl text-blue-600">
              <Link to="/#">
                <span className="capitalize flex justify-center items-center gap-2 p-4   ">
                  <span>forget password ? </span>
                  <span className="text-3xl">
                    <BiSolidRightArrowCircle />
                  </span>
                </span>
              </Link>
            </div>

            <div className="capitalize  text-2xl text-center text-[#183a1f]">
              <span>new user ? </span>
              <span className="text-blue-600">
                <button type="link" onClick={() => navigate("/signup")}>
                  sign up
                </button>
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// export async function loader() {
//   const users = await getUser();
//   console.log(users);
//   if (users) {
//     return redirect("/layout");
//   }
//   return users || null;
// }
export default LoginPage;
