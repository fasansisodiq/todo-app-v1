import { FaChevronRight } from "react-icons/fa";
import Ui from "../../../utils/Ui";
import { Link } from "react-router";
import { useState } from "react";

function MenuItem({ label, icon, onClick, to }) {
  const [show, setShow] = useState(false);
  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className=" flex justify-between items-center  hover:bg-emerald-100 cursor-pointer p-2"
    >
      <Ui
        label={label}
        taskNum={""}
        icon={<span className="text-slate-500 lg:text-2xl">{icon}</span>}
      />
      <span className="text-slate-500 text-sm lg:text-xl ">
        {show ? <FaChevronRight /> : ""}
      </span>
    </Link>
  );
}

export default MenuItem;
