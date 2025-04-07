
import { useTodos } from "../customHooks/TodosContext";
import { MdOutlineChevronRight } from "react-icons/md";

function TaskOperation({
  childModal,
  mClassName,
  label,
  icon,
  onClick,
  state,
  rightAngle,
}) {
  const {openViewDesc,
        openDelTask,
        openMarkTaskComp,
        openMarkTaskPend} = useTodos()
  return (
    <div
      type="button"
      onClick={onClick}
      className={`w-full hover:w-full  h-fit   relative cursor-pointer ${openViewDesc||
        openDelTask||
        openMarkTaskComp||
        openMarkTaskPend ? "" : "hover:bg-slate-200" } `}
       onMouseEnter={()=> {}}
      // onMouseLeave={onClose}
    >
      <div className=" flex justify-between items-center   py-3 w-full  xl:w-full sm:h-6 md:h-8 lg:h-9 xl:h-10  pl-8  h-fit  xl:pr-4   ">
        <div className={`flex  ${rightAngle === 'yes' ? "justify-between w-80":"justify-center"} items-center gap-2`}>
          <span className="flex gap-2 lg:gap-4">
            <span className="text-slate-700 sm:text-xl md:text-2xl lg:text-3xl ">{icon}</span>
          <span className="capitalize">{label}</span>
          </span>
          <span>{rightAngle === 'yes'? <span className="lg:text-4xl"><MdOutlineChevronRight/></span>: ""}</span>
        </div>
        {state && childModal}
      </div>     
    </div>
  );
}

export default TaskOperation;
