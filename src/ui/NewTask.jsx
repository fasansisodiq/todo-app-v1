import { NavLink } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
function NewTask({ setShow }) {
  const [showMessage, setShowMessage] = useState(false);
  function handleShow() {
    setShow((show) => !show);
  }
  return (
    <div
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      <button onClick={handleShow}>
        <NavLink to="/layout/new-task">
          <span className="text-slate-700 ">
            <BiPlus size={"1.5rem"} />
          </span>
        </NavLink>
      </button>
      {showMessage && (
        <span className="left-5  top-1 absolute capitalize text-sm text-slate-700 w-30 flex justify-center items-center h-6 px-2 py-1  sm:text-[0.7rem] md:text-[0.8rem]  border-1 border-slate-700 bg-slate-50 rounded shadow-2xl z-50">
          add new task
        </span>
      )}
    </div>
  );
}

export default NewTask;
