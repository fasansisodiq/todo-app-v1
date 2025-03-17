import { useState } from "react";
import Table from "../utils/Table";
import Operation from "../ui/Operation";
import {  BsThreeDotsVertical } from "react-icons/bs";
import DisplayHoverMessage from "../utils/DisplayHoverMessage";
import Modal from "../utils/Modal";
import CustomButton from "../utils/CustomButton";

function TaskItem({ task, idx }) {
  task = { ...task, priority: task.priority };
  const [openModal, setOpenModal] = useState(false);
  
  function handleShowModal() {
    setOpenModal((openModal) => !openModal);
  }
  function handleCloseModal() {
    if (openModal) setOpenModal(false);
  }

  return (
    <div className=" w-full relative">
     
        <Table bg={"bg-green-80"} col={7}>
          <span className="md:mr-4">{idx + 1}</span>
          <span className="pr-8 ">{task.tittle}</span>
          <span className="pl-1">{task.assignee}</span>
          <span className="pl-2 ">{task.dueDate}</span>
          <span className="pl-6">{task.taskClass}</span>
          <span className="pl-7">
            {task.priority}
            {/* {task.priority === "yes" ? (task.priority = "true") : "false"} */}
          </span>
         <DisplayHoverMessage element={ <span className="   
         
          p-2  w-10 h-10 
                lg:hover:w-10 lg:hover:h-10 hover:rounded-ful hover:bg-slate-300">
              <button
              className="lg:text-2xl  "
                onClick={handleShowModal}
              >
                <BsThreeDotsVertical />
              </button>
            </span>
            }
            message={"show more"}
             mClassName={'w-18 md:w-24 sm:w-6 lg:w-28 xl:w-35 xl:h-10 h-4 sm:h-6 md:h-7 right-5 bottom-5  lg:w-30 lg:h-8 lg:right-6 lg:bottom-10 xl:-right-10'}
            />
        </Table>
   
     
      {openModal && (
        <Modal openModal={openModal} onClose={handleCloseModal}>
          <Operation
          onCloseModal={handleCloseModal}
          description={task.description}
          tittle={task.tittle}
        />
        </Modal>
      ) }
    
    </div>
  );
}

export default TaskItem;
