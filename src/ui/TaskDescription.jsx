import { MdCancel } from "react-icons/md";

function TaskDescription({ description, tittle, onShowDescription }) {
  return (
    <div className="relative w-60 h-fit md:h-60 flex flex-col gap-2  items-start px-1 rounded shadow-2xl z-50 text-[0.8rem] border-b-5 border-b-green-700 md:text-[1rem] lg:text-lg">
      <h3 className=" self-start capitalize  text-green-700 font-semibold">
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
