import { BiMenu } from "react-icons/bi";
import TableHeader from "./TableHeader";
import { useState } from "react";

function TaskOverviewHeader({ tittle }) {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <div className="w-full text-emerald-600 relative ">
      <div className="flex justify-center items-center ">
        <h1 className="capitalize  text-[1rem] lg:text-3xl my-2 flex justify-center items-center font-bold">
          {tittle} task
        </h1>
        <span
          onMouseEnter={() => setShowMessage(true)}
          onMouseLeave={() => setShowMessage(false)}
          className="  text-slate-800 absolute top-3 right-4"
        >
          <BiMenu />
          {showMessage && (
            <span className=" right-2 md:right-4 top-1 absolute w-30 flex justify-center items-center h-6 px-2 py-1 capitalize text-slate-700 sm:text-[0.7rem] md:text-[0.8rem]  border-1 border-slate-700 bg-slate-50 rounded shadow-2xl z-50">
              <p>more options</p>
            </span>
          )}
        </span>
      </div>
      <TableHeader />
    </div>
  );
}

export default TaskOverviewHeader;
