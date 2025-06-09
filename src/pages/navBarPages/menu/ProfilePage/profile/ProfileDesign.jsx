import React from "react";

function ProfileDesign({ children, bg }) {
  return (
    <div
      className={`flex flex-col justify-start gap-1 mt-4 py-8 w-1/2 h-fit  rounded-lg shadow-md dark:shadow-lg p-4  pl-8 lg:pl-15 lg:text-2xl text-lg sm:text-xl text-slate-600 ${bg}`}
    >
      {children}
    </div>
  );
}

export default ProfileDesign;
