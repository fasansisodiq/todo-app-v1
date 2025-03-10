import { useState } from "react";
import Table from "../utils/Table";
import Operation from "../ui/Operation";
import { BsThreeDots } from "react-icons/bs";

function TaskItem({ task, idx }) {
  task = { ...task, priority: task.priority };
  const [openModal, setOpenModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  function handleClick() {
    setShowMore((showMore) => !showMore);
  }
  function handleShow() {
    setOpenModal((openModal) => !openModal);
  }
  function handleCloseModal() {
    if (!showMore) return setShowMore(false);
    if (openModal) return setOpenModal(false);
  }

  return (
    <div className="relative w-full">
      <button
        // onMouseEnter={() => setShowMore(true)}
        // onMouseLeave={() => setShowMore(false)}
        onClick={handleClick}
        className="z-10 w-full text-stone-600"
      >
        <Table bg={"bg-green-80"}>
          <span className="md:mr-4">{idx + 1}</span>
          <span>{task.tittle}</span>
          <span>{task.assignee}</span>
          <span className="md:ml-3">{task.dueDate}</span>
          <span className="ml-4">{task.taskClass}</span>
          <span>
            {task.priority === "yes" ? (task.priority = "true") : "false"}
          </span>

          {/* <span className="text-2 cursor-pointer">{task.description}</span> */}
        </Table>
      </button>
      {showMore ? (
        <span className="absolute right-0">
          {openModal ? (
            ""
          ) : (
            <span className="w-4 h-4 px-0.5 z-20 rounded-full border-1 border-slate-300 shadow-xl bg-slate-300">
              <button
                // onMouseEnter={() => setOpenModal(true)}
                // onMouseLeave={() => setOpenModal(false)}
                onClick={handleShow}
              >
                <BsThreeDots />
              </button>
            </span>
          )}
        </span>
      ) : (
        ""
      )}
      {showMore && openModal ? (
        <Operation
          onCloseModal={handleCloseModal}
          description={task.description}
          tittle={task.tittle}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default TaskItem;
