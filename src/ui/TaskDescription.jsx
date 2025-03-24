import { MdCancel } from "react-icons/md";
import { useModal } from "../customHooks/useModal";
function TaskDescription({ description, tittle }) {
  const { onCloseChild } = useModal();
  return (
    <div className="absolute w-60 h-fit sm:h-fit md:h-fit lg:h-70 xl:h-fit xl:w-70 flex flex-col gap-2  items-start justify-center xl:p-4 px-2 rounded shadow-2xl z-50 text-[0.8rem] border-b-5 bg-white border-b-green-700 md:text-[1rem] lg:text-lg">
      <h3 className=" self-center capitalize pt-1  text-green-700 font-semibold">
        {tittle} description
      </h3>
      <span>{description}</span>
      <button onClick={onCloseChild} className="absolute right-0 -top-2">
        <MdCancel size={"1.3rem"} />
      </button>
    </div>
  );
}

export default TaskDescription;
