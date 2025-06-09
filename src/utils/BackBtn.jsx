import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router";

function BackBtn() {
  const navigate = useNavigate();
  return (
    <span
      role="button"
      onClick={() => navigate("/layout")}
      className="text-slate-500 dark:text-yellow-500/80 dark:hover:text-yellow-300/80 cursor-pointer text-[1.7rem] lg:text-2xl hover:text-emerald-700 transition"
      title="Back"
    >
      <BsChevronLeft />
    </span>
  );
}

export default BackBtn;
