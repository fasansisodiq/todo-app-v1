import Table from "../utils/Table";
import TaskOperations from "../ui/TaskOperations";
import { BsThreeDotsVertical } from "react-icons/bs";
import DisplayHoverMessage from "../utils/DisplayHoverMessage";
import Modal from "../utils/Modal";
import { useTodos } from "../customHooks/TodosContext";

function TaskItem({ task, idx }) {
  const { isOpen, setIsOpen, onClose } = useTodos();
  task = { ...task, priority: task.priority };

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
        <DisplayHoverMessage
          element={
            <span
              className="   
         
          p-2  w-10 h-10 
                lg:hover:w-10 lg:hover:h-10 hover:rounded-ful hover:bg-slate-300"
            >
              <button
                className="sm:text-lg  lg:text-2xl"
                onClick={() => setIsOpen(task.id)}
              >
                <BsThreeDotsVertical />
              </button>
            </span>
          }
          message={"open more"}
          mClassName={
            "w-18 md:w-24 sm:w-20 sm:-right-5 sm:bottom-8 lg:w-28 xl:w-35 xl:h-10 h-4 sm:h-6 md:h-7 right-5 bottom-5  lg:w-30 lg:h-8 lg:right-6 lg:bottom-10 xl:-right-10"
          }
        />
      </Table>

      {isOpen === task.id && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <TaskOperations
            description={task.description}
            tittle={task.tittle}
            key={task.id}
            id={task.id}
          />
        </Modal>
      )}
    </div>
  );
}

export default TaskItem;
