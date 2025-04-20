import { useOperation } from "../../../customHooks/operation/useOperation";
import CloseBtn from "../../../utils/CloseBtn";

function TaskDescriptionModal({ description, tittle }) {
  const { openDesc, onCloseDesc } = useOperation();
  return (
    <div
      className={`  fixed inset-0  z-20 flex justify-center items-center transition-colors  ${
        openDesc ? "" : "backdrop-blur-sm"
      }`}
    >
      <div className="absolute w-fit h-fit lg:h-7/10   flex flex-col gap-2  items-start justify-center pt-8 lg:text-2xl xl:p-4 px-2 rounded shadow-2xl z-50 text-[0.8rem] border-b-5 bg-white border-b-green-700 sm:text-[1rem] md:text-[1.2rem] ">
        <h3 className=" self-center capitalize pt-1  text-green-700 font-semibold">
          {tittle} description
        </h3>
        <span>{description}</span>

        <CloseBtn
          isOpen={openDesc}
          btnPosition={
            "bottom-20 left-56 sm:bottom-22 sm:left-77 md:bottom-25 md:left-87 lg:bottom-39 lg:left-82"
          }
          mClassName={
            " bottom-36 left-12 sm:bottom-49 sm:left-9 sm:text-lg sm:h-7 md:bottom-52 md:left-11 lg:bottom-52  lg:left-79  lg:h-8 h-4"
          }
          onClick={onCloseDesc}
        />
      </div>
    </div>
  );
}

export default TaskDescriptionModal;
