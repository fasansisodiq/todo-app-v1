import { useState } from "react";
import Table from "./Table";
import DisplayHoverMessage from "./DisplayHoverMessage";
import { BsThreeDots } from "react-icons/bs";
import Modal from "./Modal";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import CountdownToFutureDate from "./CountdownTofutureDate";
import TaskProperties from "./TaskProperties";

function ReusableTaskItem({ task, children, expandedId, setExpandedId }) {
  const [openModal, setOpenModal] = useState(false);

  // Use expandedId and setExpandedId for controlling expanded state

  const isExpanded = expandedId === task?.id;

  const handleToggleLabel = () => {
    if (isExpanded) {
      setExpandedId(null);
    } else {
      setExpandedId(task?.id);
    }
  };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="w-full flex flex-col items-center">
      <Table bg="bg-green-80 " col={3} className="py-2 w-full">
        <div className="w-full flex flex-col gap-2">
          {/* Top Row: Title, Due, Priority, More */}
          <div className="w-full flex flex-wrap justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <button
                type="button"
                className="text-emerald-600 dark:text-yellow-600 hover:bg-emerald-100 dark:hover:bg-yellow-100 rounded-full p-1 transition"
                onClick={handleToggleLabel}
                aria-label={isExpanded ? "Collapse details" : "Expand details"}
              >
                {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
              </button>
              <span className="font-semibold text-slate-800 dark:text-yellow-400 dark:opacity-80 text-base md:text-lg">
                {task?.title}
              </span>
            </div>
            <span className="normal-case text-xs md:text-sm flex-1 text-center">
              <CountdownToFutureDate targetDateString={task?.dueDate} />
            </span>
            <div className="flex gap-2 items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                  task?.priority === "on"
                    ? "bg-red-100 dark:bg-yellow-100 text-red-600 dark:text-yellow-800 dark:opacity-60"
                    : "bg-slate-100 text-slate-500 dark:text-slate-300 dark:bg-slate-700"
                }`}
              >
                {task?.priority ? "High" : "Low"}
              </span>
              <DisplayHoverMessage
                element={
                  <span className="p-1 w-7 h-7 lg:p-2 lg:w-10 lg:h-10 hover:bg-slate-200 dark:hover:bg-emerald-700 dark:text-yellow-100 hover:rounded-full flex items-center justify-center">
                    <button
                      type="button"
                      className="sm:text-sm md:text-lg lg:text-2xl"
                      onClick={handleOpenModal}
                      aria-label="Open task options"
                    >
                      <BsThreeDots />
                    </button>
                  </span>
                }
                message="Open more"
              />
            </div>
          </div>
          {/* Expanded Details */}
          {isExpanded && (
            <div className="w-full flex flex-wrap justify-between items-center gap-4 mt-2">
              <TaskProperties label="category" value={task?.taskClass} />
              <TaskProperties label="assignee" value={task?.assignee} />
              <TaskProperties
                label="status"
                value={task?.completed ? "completed" : "in progress"}
              />
            </div>
          )}
        </div>
      </Table>

      {/* Modal for task actions */}
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {children}
      </Modal>
    </div>
  );
}

export default ReusableTaskItem;
