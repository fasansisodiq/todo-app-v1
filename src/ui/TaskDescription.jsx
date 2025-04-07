import { MdCancel } from "react-icons/md";

import CloseBtn from "../utils/CloseBtn";
import { useTodos } from "../customHooks/TodosContext";
function TaskDescription({ description, tittle }) {
<<<<<<< HEAD
  const {openViewDesc,
        openDelTask,
        openMarkTaskComp,
        openMarkTaskPend,onCloseDesc} = useTodos()
  
=======
  // const { onCloseChild } = useModal();
>>>>>>> b0528648e0864a1dea51f45cedd58e3e8dc69ba1
  return (
    <div className={`  fixed inset-0  z-20 flex justify-center items-center transition-colors  ${openViewDesc||
        openDelTask||
        openMarkTaskComp||
        openMarkTaskPend ?'backdrop-blur-sm': "" }`}>
    <div className="absolute w-fit h-fit lg:h-7/10   flex flex-col gap-2  items-start justify-center pt-8 lg:text-2xl xl:p-4 px-2 rounded shadow-2xl z-50 text-[0.8rem] border-b-5 bg-white border-b-green-700 sm:text-[1rem] md:text-[1.2rem] ">
      <h3 className=" self-center capitalize pt-1  text-green-700 font-semibold">
        {tittle} description
      </h3>
      <span>{description}</span>
<<<<<<< HEAD
      <CloseBtn btnPosition={'bottom-20 left-56 sm:bottom-22 sm:left-77 md:bottom-25 md:left-87 lg:bottom-39 lg:left-82'} mClassName={' bottom-36 left-12 sm:bottom-49 sm:left-9 sm:text-lg sm:h-7 md:bottom-52 md:left-11 lg:bottom-52  lg:left-79  lg:h-8 h-4'}
      onClick={onCloseDesc}
      />
      
    </div>
=======
      <button onClick={() => {}} className="absolute right-0 -top-2">
        <MdCancel size={"1.3rem"} />
      </button>
>>>>>>> b0528648e0864a1dea51f45cedd58e3e8dc69ba1
    </div>
  );
}

export default TaskDescription;
