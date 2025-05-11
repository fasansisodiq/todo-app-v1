import { BsChevronLeft } from "react-icons/bs";
import ProfileUi from "./ProfileUI";
import TaskFilter from "./filterPage/TaskFilter";
import { useNavigate } from "react-router";

function MenuPage() {
  const navigate = useNavigate();
  return (
    <div className=" mt-4 absolute flex flex-col justify-start  p-4 pl-5 gap-2 w-100 h-120 shadow-2xl border-4 border-white bg-white rounded-2xl lg:text-2xl ">
      <div className="flex justify-start items-center  lg:gap-30 gap-2 w-full pb-2 lg:pb-4 ">
        <span
          role="button"
          onClick={() => navigate("/layout")}
          className="text-slate-500 cursor-pointer  text-[1.5rem] lg:text-2xl"
        >
          <BsChevronLeft />
        </span>
        <h1 className="text-center font-semibold   text-slate-800">Menu</h1>
      </div>
      <TaskFilter />
      <ProfileUi />
    </div>
  );
}

export default MenuPage;
