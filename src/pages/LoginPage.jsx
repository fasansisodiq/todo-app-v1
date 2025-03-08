import Input from "../utils/Input";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import Button from "../utils/Button";
import { BiSolidRightArrowCircle } from "react-icons/bi";
import logo from "../logo/logo-big.png";
import { getUser } from "../services/apiUserData";

function LoginPage() {
  const navigate = useNavigate();
  const { users } = useLoaderData();
  console.log(users);
  return (
    <div className=" w-250 h-full bg-[#f0f4f3] flex flex-col justify-center items-center gap-5 text-center ">
      <h1 className="text-[#183a1f] text-4xl mt-5 font-extrabold">
        welcome back!!!
      </h1>
      <img className="w-110 opacity-70 h-110" src={logo} alt="app logo" />
      <Form className="flex flex-col items-center w-150 h-180  ">
        <div>
          <h2 className="text-3xl text-[#286135] mb-4  ">Login</h2>
          <div className="flex flex-col gap-8  ">
            <Input
              type={"email"}
              placeholder={"Enter your email"}
              name={"email"}
              id={"email"}
            />
            <Input
              type={"password"}
              placeholder={"Enter your password"}
              name={"password"}
              id={"password"}
            />
            <div className="flex justify-center items-center gap-2 text-center text-2xl text-[#50c269]">
              <Link to="/#">
                <span className="capitalize flex justify-center items-center gap-2 p-4 hover:text-[#fff] hover:font-bold hover:border-2 hover:rounded-3xl hover:border-[#286135]  hover:bg-[#286135]  ">
                  <span>forget password ? </span>
                  <span className="text-3xl">
                    <BiSolidRightArrowCircle />
                  </span>
                </span>
              </Link>
            </div>
            <Button label="login" />
            <div className="capitalize  text-2xl text-center text-[#183a1f]">
              <span>new user ?</span>
              <span className="text-[#50c269]">
                <button type="link" onClick={() => navigate("/signup")}>
                  sign up
                </button>
              </span>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
("/layout");
export async function loader() {
  const users = await getUser();
  redirect("/layout");
  return users;
}
export default LoginPage;
