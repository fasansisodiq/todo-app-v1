import { useState } from "react";

import { CiBellOn } from "react-icons/ci";
import NotificationBell from "./NotificationBell";
import NewTask from "./NewTask";

function Profile({ setShow }) {
  const [notification, setNotification] = useState(true);
  const fullName = ["Sodiq Ajagun"];
  const monogram = fullName
    .toString()
    .split(" ")
    .map((name) => name[0])
    .reduce((acc, curr) => acc + curr)
    .toUpperCase();

  return (
    <div className="relative w-120  flex flex-col justify-even items-center gap-4 pr-14 pt-4  text-[#183a1f]  ">
      <h1 className="text-2xl opacity-75 font-semibold capitalize flex self-start ">
        todo
      </h1>
      <span className="absolute right-27 text-inherit">
        <NewTask setShow={setShow} />
      </span>
      <div className="flex justify-between items-center gap-15">
        <div className="flex items-center gap-8 pr-12">
          <span className="w-15 h-15 text-2xl font-bold rounded-full  p-2  border-2 border-emerald-500 outline-2 outline-offset-2 outline-emerald-700 ">
            <span className="opacity-75 "> {monogram} </span>
          </span>
          <span className="text-2xl opacity-75 font-semibold">{fullName}</span>
        </div>
        <span className="flex self-center font-bold text-3xl">
          {notification ? <CiBellOn /> : <NotificationBell />}
        </span>
      </div>
    </div>
  );
}

export default Profile;
{
  /* <span className="w-1 h-1 p-1 rounded-full outline-2 outline-offset-2 outline-red-600 text-xs absolute top-[-1] shadow-[#fff]">5</span> */
}
