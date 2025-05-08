import React from "react";

function ProfileDesign({ children, type }) {
  return (
    <div
      className={`flex flex-col justify-start gap-1 mt-4 py-8 w-1/2 h-fit  rounded-lg shadow-md p-4  pl-8 lg:pl-15 lg:text-2xl text-lg sm:text-xl text-slate-600 bg-[#c0efe3] ${
        type === "edit" ? "overflow-y-auto lg:mt-70  " : " "
      }`}
    >
      {children}
    </div>
  );
}

export default ProfileDesign;
