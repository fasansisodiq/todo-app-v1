import { MdCancel } from "react-icons/md";

function TaskDescription({ description, tittle, onClose,}) {
  return (
    <div onClick={onClose} className="absolute w-60 h-40 sm:h-50 md:h-60 lg:h-70 xl:h-fit xl:w-100 flex flex-col gap-2  items-start xl:p-4 px-2 rounded shadow-2xl z-50 text-[0.8rem] border-b-5 bg-white border-b-green-700 md:text-[1rem] lg:text-lg">
      <h3 className=" self-center capitalize  text-green-700 font-semibold">
        {tittle} description
      </h3>
      <span>{description}</span>
      {/* <button onClick={onShowDescription} className="absolute right-0 -top-2">
        <MdCancel size={"1.3rem"} />
      </button> */}
    </div>
  );
}

export default TaskDescription;
