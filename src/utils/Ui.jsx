// import { useState } from "react";

function Ui({ icon, label, taskNum }) {
  // const [isActive, setIsActive] = useState(false);
  // function handleIsActive() {
  //   setIsActive((active) => !active);
  // }
  return (
    <div
      className={` w-100 flex justify-between items-center text-2xl text-[#183a1f]  cursor-pointer hover:bg-[#cbedd2]  hover:h-10 hover:px-2 hover:border-l-6
          border-l-green-800 
     `}
      // onClick={handleIsActive}
      // key={label}
    >
      <span className="flex justify-center items-center gap-4 text-lg ">
        <span>{icon}</span>
        <span className=" capitalize font-semibold text-lg opacity-75">
          {label}
        </span>
      </span>
      <span className="text-xl font-light opacity-75">{taskNum}</span>
    </div>
  );
}

export default Ui;
//  ${
//         isActive
//           ? "bg-[#cbedd2] border-l-6 p-2 pr-3 w-full h-full border-l-green-800"
//           : ""
//       }
