import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";

function OptionGroup({ label, children, myKey }) {
  const [hide, setHide] = useState(false);
  const [opt, setOpt] = useState(false);
  function handleHide() {
    setHide(true);
    setOpt(!opt);
  }
  return (
    <div
      className="w-full h-fit flex flex-col justify-start p-1 pl-2 text-slate-600 hover:bg-teal-200 dark:text-yellow-200 dark:bg-[#747976] dark:hover:bg-[#919397]"
      key={myKey}
    >
      <h2
        onClick={handleHide}
        className="flex justify-between items-center"
        onMouseEnter={() => setHide(true)}
        onMouseLeave={() => setHide(false)}
      >
        {label}
        {hide && <MdKeyboardArrowRight size={25} onClick={handleHide} />}
        {!hide && opt && <IoChevronDownOutline size={25} />}
      </h2>
      {opt && children}
    </div>
  );
}

export default OptionGroup;
