import { BsChevronLeft } from "react-icons/bs";
import ProfileUi from "./ProfileUI";
import TaskFilter from "./filterPage/TaskFilter";
import { useNavigate } from "react-router";

function MenuPage() {
  const navigate = useNavigate();
  return (
    <div className="mt-4 absolute flex flex-col justify-start p-4 pl-5 gap-2 w-100 h-120 shadow-2xl border-4 border-white dark:border-emerald-900 bg-white dark:bg-[#232b25] rounded-2xl lg:text-2xl transition-colors duration-300">
      <div className="flex justify-start items-center lg:gap-30 gap-2 w-full pb-2 lg:pb-4">
        <span
          role="button"
          onClick={() => navigate("/layout")}
          className="text-slate-500 dark:text-yellow-300 cursor-pointer text-[1.5rem] lg:text-2xl transition-colors duration-200"
        >
          <BsChevronLeft />
        </span>
        <h1 className="text-center font-semibold text-slate-800 dark:text-yellow-200">
          Menu
        </h1>
      </div>
      <TaskFilter />
      <ProfileUi />
    </div>
  );
}

export default MenuPage;
