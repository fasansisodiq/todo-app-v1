// import { useState } from "react";

function Ui({ icon, label, taskNum }) {
  // const [isActive, setIsActive] = useState(false);
  // function handleIsActive() {
  //   setIsActive((active) => !active);
  // }
  return (
    <div
      className={` w-35  md:w-70 lg-w-90 hover:w-35 md:hover:w-70 lg:w-90 flex justify-between items-center pr-3 text-lg lg:text-xl text-slate-800  cursor-pointer hover:bg-[#cbedd2] hover:h-4 md:hover:h-6 lg:hover:h-8 hover:px-1 md:hover:px-2 lg:hover:px-3 transition-all duration-75  hover:border-l-6
          border-l-green-800 
     `}
      // onClick={handleIsActive}
      // key={label}
    >
      <span className="flex justify-between items-center gap-1 text-[0.8rem] lg:gap-4 lg:text-lg ">
        <span>{icon}</span>
        <span className=" capitalize font-semibold text-[0.8rem] lg:text-lg opacity-75">
          {label}
        </span>
      </span>
      <div className=" flex self-end mr-1 text-[0.8rem] lg:text-xl font-semi-bold text-emerald-950 opacity-75">
        {taskNum}
      </div>
    </div>
  );
}

export default Ui;
//  ${
//         isActive
//           ? "bg-[#cbedd2] border-l-6 p-2 pr-3 w-full h-full border-l-green-800"
//           : ""
//       }
