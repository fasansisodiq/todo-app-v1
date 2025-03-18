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
import ChildModal from "../utils/childModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { PiWarningCircle } from "react-icons/pi";
import CompletedTaskModal from "./CompletedTaskModal";
import { FaCheckDouble, FaClock } from "react-icons/fa6";
import PendingTaskModal from "./PendingTaskModal";


function Operation({ onCloseModal, description, tittle }) {
  const [show, setShow] = useState(false);
  const [showNextModal, setShowNextModal] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  function handleShowD
(id) {
    // setShow((show) => !show)
     setShow(true);
  }
  function handleDeleteTask() {
     setDeleteTask((del) => !del);
  }
function handleClose () {
   setShow(false)
}
  return (
    <div 
    
     className="relative border-y-15  bg-white border-y-green-700  z-50
     w-70 h-58 sm:w-65 md:w-65 lg:w-70 xl:w-100 xl:h-100 p-2 pr-4 xl:pt-12 border-2  text-slate-700 flex flex-col  gap-4 border-slate-200 rounded-7xl text-[1rem] sm:text-sm md:text-lg lg:text-xl xl:text-xl shadow-gray-100   ">
      <h1 className="text-center font-semibold capitalize">task operations</h1>
      <ChildModal
      show={show}
      onShow={handleShow}
      showNextModal={showNextModal}
      setShowNextModal={setShowNextModal}
      modal={ <ModalBtn onClick={handleShow} leftIcon={<MdDescription />}>
        View description
      </ModalBtn>}
      childModal={ <TaskDescription
            description={description}
            tittle={tittle}
            onShowDescription={handleShow}
            onclose={handleClose}
          />}/>
     
      <ModalBtn onClick={""} leftIcon={<MdEdit />}>Edit</ModalBtn>
      <ModalBtn onClick={handleDeleteTask} leftIcon={<MdDelete />}> Delete </ModalBtn>
      <ModalBtn leftIcon={<MdDone />}>Mark as completed</ModalBtn>
      <ModalBtn leftIcon={<MdPending />}>Mark as pending</ModalBtn>
      <button
        onClick={onCloseModal}
        className=" absolute top-2 right-3 md:top-1 md:right-1 lg:right-2 lg:top-2 xl:text-4xl"
      >
        <MdCancel  />
      </button>
      <span className="pt-5 absolute xl:-top-6 xl:-right-1.5">
        {show && (
          <TaskDescription
            description={description}
            tittle={tittle}
            onclose={handleClose}
          />
        )}
         {show && (
          <DeleteTaskModal
            tittle={tittle}
           icon={<PiWarningCircle/>}
          />
        )}
         {show && (
          <CompletedTaskModal
            tittle={tittle}
           icon={<FaCheckDouble/>}
          />
        )}
        {show && (
          <PendingTaskModal
            tittle={tittle}
           icon={<FaClock/>}
          />
        )}
      </span>
    </div>
  );
}

export default Operation;
