import {
  MdCancel,
  MdDelete,
  MdDescription,
  MdDone,
  MdEdit,
  MdPending,
} from "react-icons/md";
import ModalBtn from "../utils/ModalBtn";
import { useState } from "react";
import TaskDescription from "./TaskDescription";

function Operation({ onCloseModal, description, tittle }) {
  const [showDescription, setShowDescription] = useState(false);
  function handleShowDescription() {
    setShowDescription((showDescription) => !showDescription);
  }

  return (
    <div className=" absolute border-b-5 border-b-green-700 z-50 w-60 h-58 p-2 pt-6 border-2 left-2 md:left-27  text-slate-700   grid justify-center items-center gap-4 border-slate-200 rounded-lg text-[0.8rem] shadow-2xl ">
      <ModalBtn onClick={handleShowDescription} icon={<MdDescription />}>
        View description
      </ModalBtn>
      <ModalBtn icon={<MdEdit />}>Edit</ModalBtn>
      <ModalBtn icon={<MdDelete />}> Delete </ModalBtn>
      <ModalBtn icon={<MdDone />}>Mark as completed</ModalBtn>
      <ModalBtn icon={<MdPending />}>Mark as pending</ModalBtn>
      <button
        onClick={onCloseModal}
        className=" absolute top-2 right-3 md:top-1 md:right-1 lg:right-2 lg:top-2"
      >
        <MdCancel size={"1.3rem"} />
      </button>
      <span className="pt-5">
        {showDescription && (
          <TaskDescription
            description={description}
            tittle={tittle}
            onShowDescription={handleShowDescription}
          />
        )}
      </span>
    </div>
  );
}

export default Operation;
