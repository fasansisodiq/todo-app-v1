import { PiGreaterThanBold } from "react-icons/pi";

function ModalBtn({ children, leftIcon, onClick }) {
  return (
    <div className="xl:hover:w-full hover:bg-slate-200">
      <button
      onClick={onClick}
      className=" flex justify-between items-center gap-4 py-3 w-full  xl:w-full xl:h-8  pl-8  h-fit  xl:pr-4   "
    >
      <div className="flex justify-center items-center gap-2">
        <span className="text-slate-700 ">{leftIcon}</span>
      <span>{children}</span>
      </div>
      <span><PiGreaterThanBold/></span>
    </button>
    </div>
  );
}

export default ModalBtn;
