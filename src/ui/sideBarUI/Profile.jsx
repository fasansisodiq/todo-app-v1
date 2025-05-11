import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { Link } from "react-router-dom";

import DisplayHoverMessage from "../../utils/DisplayHoverMessage";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useAuth } from "../../authentication/useAuth";
import ProfilePicture from "../../pages/navBarPages/menu/ProfilePage/profile/ProfilePicture";

function Profile() {
  const { date } = useTasks();
  const { username, fullName } = useAuth();
  const [notification, setNotification] = useState(true);

  return (
    <div
      className="relative w-30 sm:w-60 md:w-60 lg:w-90  flex flex-col px-1.5 pr-2 lg:pb-6
    items-center gap-4 lg:pr-14 pt-2  text-slate-800  "
    >
      <div className=" w-full flex justify-between items-center text-[0.7rem] md:text-lg lg:text-xl  pb-2  lg:pb-4">
        <h1 className="opacity-75 font-semibold  ">todopro</h1>
        <span className="text-[0.5rem] sm:text-sm md:text-lg">{date}</span>
      </div>
      <div className=" relative flex justify-start items-start  sm:w-47 md:w-59 lg:w-89  md:justify-between lg:gap-4  ">
        <div className="flex-col md:flex justify-center  items-center gap-2   md:gap-4 ">
          <span className="w-20 h-20 sm:w-30 sm:h-30 md:w-35 md:h-35  flex justify-center items-center  lg:w-35 lg:h-35  font-bold rounded-full  p-2  border-2 border-emerald-700 relative">
            <ProfilePicture
              profileClassName={"right-14 top-2 lg:left-26 lg:top-24"}
            />
          </span>
          <span className=" text-[0.7rem] sm:text-sm md:text-lg lg:text-xl lg:pl-18 xl:text-2xl opacity-75 font-semibold">
            {username || fullName || " Sodiq Ajagun"}
          </span>
        </div>
        {notification && (
          <Link to={"/layout/notification"}>
            <DisplayHoverMessage
              element={
                <span className=" font-bold   lg:pr-15">
                  <p className="text-[1rem] sm:text-xl md:text-2xl  lg:text-3xl">
                    <CiBellOn />
                  </p>
                </span>
              }
              message={"see all notification"}
              mClassName={
                "w-28 h-4 sm:h-5 sm:w-29 sm:bottom-3 sm:-right-30 md:h-6 md:w-33 md:bottom-8 md:-right-12 -right-8 -bottom-6  lg:w-45 xl:w-20 lg:h-8 xl:h-10 xl:-right-41 xl:top-1  lg:-right-10 lg:-bottom-10"
              }
            />
            <span
              className={`absolute w-2.5 h-2.5 md:w-3 md:h-3 lg:w-3 lg:h-3 text-[0.5rem] flex justify-center items-center  rounded-full  border-1 border-red-600 bg-red-600   text-slate-300 font-bold shadow z-50 -top-0.5 left-26 
          sm:left-42.5 sm:top-1.5 md:top-2 md:left-54 lg:top-1 lg:left-76 xl:top-2 xl:left-76 `}
            >
              25
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Profile;
// const fullNames = ["Sodiq Ajagun"];
// const monogram = fullNames
//   .toString()
//   .split(" ")
//   .map((name) => name[0])
//   .reduce((acc, curr) => acc + curr)
//   .toUpperCase();
