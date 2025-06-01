import { useState } from "react";
import Table from "./Table";
import DisplayHoverMessage from "./DisplayHoverMessage";
import { BsThreeDots } from "react-icons/bs";
import Modal from "./Modal";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import CountdownToFutureDate from "./CountdownTofutureDate";
import TaskProperties from "./TaskProperties";

function ReusableTaskItem({ task, children }) {
  const [openModal, setOpenModal] = useState(false);

  const [openLabel, setOpenLabel] = useState(false);
  const [closeLabel, setCloseLabel] = useState(true);

  const handleToggleLabel = () => {
    setOpenLabel(!openLabel);
    setCloseLabel(!closeLabel);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div className="w-full flex flex-col justify-between items-center">
      <Table bg="bg-green-80" col={3} className="py-2  ">
        <div className="w-full flex flex-col  gap-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {closeLabel ? (
                <FaAngleDown onClick={handleToggleLabel} />
              ) : (
                <FaAngleUp onClick={handleToggleLabel} />
              )}

              <span>{task?.title}</span>
            </div>
            <span className="normal-case ">
              <CountdownToFutureDate targetDateString={task?.dueDate} />
            </span>
            <div className="flex  gap-2 items-center">
              <span>{task?.priority === "on" ? "high" : "low"}</span>
              <DisplayHoverMessage
                element={
                  <span className="p-1 w-5 h-5 lg:p-2 lg:w-10 lg:h-10 hover:bg-slate-300 hover:rounded-full flex items-center justify-center self-end">
                    <button
                      type="button"
                      className="sm:text-sm md:text-lg lg:text-2xl "
                      onClick={handleOpenModal}
                      aria-label="Open task options"
                    >
                      <BsThreeDots />
                    </button>
                  </span>
                }
                message="open more"
                mClassName="w-18 md:w-24 sm:w-20 sm:-right-5 sm:bottom-8 lg:w-28 xl:w-35 xl:h-10 h-4 sm:h-6 md:h-7 right-5 bottom-5 lg:w-30 lg:h-8 lg:right-6 lg:bottom-10 xl:-right-10"
              />
            </div>
          </div>
          {openLabel && (
            <div className="w-full flex justify-between items-center">
              <TaskProperties label="category" value={task?.taskClass} />
              <TaskProperties label="assignee" value={task?.assignee} />
              <TaskProperties
                label="status"
                value={task?.completed === true ? "completed" : "in progress"}
              />
            </div>
          )}
        </div>
      </Table>

      {openModal && (
        <Modal isOpen={openModal} onClose={handleCloseModal}>
          {children}
        </Modal>
      )}
    </div>
  );
}

export default ReusableTaskItem;
// border-r-2 border-r-slate-200
