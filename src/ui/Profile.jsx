import { useState } from "react";
import { CiBellOn } from "react-icons/ci";
import NewTask from "./NewTask";
import { Link } from "react-router-dom";

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
    <div className="relative w-30 md:w-60 lg:w-90  flex flex-col justify-between items-center gap-4 pr-14 pt-4  text-slate-800  ">
      <h1 className="text-sm lg:text-2xl opacity-75 font-semibold capitalize flex self-start ">
        todo
      </h1>
      <span className=" relative left-20 md:left-35 bottom-10 lg:bottom-12 lg:left-40 text-inherit">
        <NewTask setShow={setShow} />
      </span>
      <div className="flex self-start justify-center items-center gap-9 md:w-59 lg:w-89  md:justify-between lg:gap-4  ">
        <div className="flex  items-center gap-2 md:gap-4 ">
          <span className=" w-4 h-4 md:w-10 md:h-10  flex justify-center items-center text-[0.5rem] md:text-lg lg:w-15 lg:h-15 lg:text-2xl font-bold rounded-full  p-2  border-2 border-emerald-500 outline-2 outline-offset-2 outline-emerald-700 ">
            <span className="opacity-75 "> {monogram} </span>
          </span>
          <span className=" text-[0.7rem] text-lg md:text-lg lg:text-xl opacity-75 font-semibold">
            {fullName}
          </span>
        </div>
        <Link to={"/layout/notification"}>
          <span className=" font-bold text-sm mb-6 md:text-2xl lg:text-3xl lg:pr-15">
            {notification && <CiBellOn size={"1.2rem"} />}
          </span>
          <span className="w-2.5 h-2.5 text-[0.5rem] flex justify-center items-center  rounded-full  border-1 border-red-600 bg-red-600  absolute text-slate-300 font-bold shadow z-50 top-26 md:top-27 md:right-1.5 lg:top-28 lg:right-11.5 right-1 ">
            5
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
