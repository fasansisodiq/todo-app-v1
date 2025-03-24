import { BiPlus } from "react-icons/bi";
import TodoNavigator from "../utils/TodoNavigator";

function AddNewTaskBtn() {
  return (
    <div className="flex ">
      <TodoNavigator
        to="new-task"
        mClassName={
          "w-21 h-4 sm:h-5 sm:w-23 sm:-right-9 sm:-bottom-6 md:h-6 md:w-26 md:-right-9 md:-bottom-7 lg:w-6 lg:h-8 -right-6 -bottom-5.5  lg:w-35 xl:w-38  lg:-right-35 lg:-bottom-12 xl:h-10 xl:-right-14 xl:-bottom-12 "
        }
        element={
          <button className="text-slate-700  text-[0.8rem] md:text-lg lg:text-2xl xl:text-2xl ">
            <BiPlus />
          </button>
        }
        message={"add new task"}
      />
    </div>
  );
}

export default AddNewTaskBtn;
