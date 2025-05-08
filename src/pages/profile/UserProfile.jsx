import { Link, useNavigate } from "react-router";

import { useAuth } from "../../authentication/useAuth";
import AboutUser from "./AboutUser";
import UserAdress from "./UserAddress";
import { BsChevronLeft } from "react-icons/bs";
import ProfileDesign from "./ProfileDesign";

function UserProfile() {
  const navigate = useNavigate();
  const { profilePic, fullName, username } = useAuth();

  return (
    <ProfileDesign>
      <span className="flex justify-between items-center w-full  ">
        <span
          role="button"
          onClick={() => navigate("/layout")}
          className="text-slate-500 cursor-pointer  text-[1.5rem] lg:text-2xl"
        >
          <BsChevronLeft />
        </span>
        <Link
          to={"/edit-profile"}
          className="w-fit self-end capitalize border border-gray-400  hover:bg-emerald-600 hover:border-emerald-600 hover:text-white py-1 px-2 rounded-lg text-slate-500 cursor-pointer text-[1.5rem] lg:text-2xl "
        >
          edit profile
        </Link>
      </span>
      <h1 className="self-center capitalize text-gray-600 font-bold">
        my profile
      </h1>
      <div className="w-full  flex justify-start items-center font-semibold pt-5">
        <span className="w-20 h-20 sm:w-30 sm:h-30 md:w-35 md:h-35  flex justify-center items-center  lg:w-50 lg:h-50 xl:w-50 xl:h-50 font-bold rounded-full  p-2  border-2 border-emerald-700">
          {profilePic}
        </span>
        <div className="flex flex-col items-start justify-center gap-2  pl-4">
          <span className=" capitalize">{fullName} </span>
          <span className="text-lg text-slate-400">{username}</span>
        </div>
      </div>
      <AboutUser />
      <UserAdress />
    </ProfileDesign>
  );
}

export default UserProfile;
