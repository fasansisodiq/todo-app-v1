import { useState } from "react";
import Table from "./Table";
import DisplayHoverMessage from "./DisplayHoverMessage";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./Modal";

function ReusableTaskItem({ task, idx, children }) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Table bg="bg-green-80" col={8} className="py-2 lg:w-[90%]">
        <span>{idx + 1}</span>
        <span>{task?.title}</span>
        <span>{task?.assignee}</span>
        <span>{task?.dueDate}</span>
        <span>{task?.taskClass}</span>
        <span>{task?.priority === "on" ? "yes" : "no"}</span>
        <span>{task?.completed === true ? "yes" : "no"}</span>
        <DisplayHoverMessage
          element={
            <span className="p-2 w-10 h-10 hover:bg-slate-300 hover:rounded-full flex items-center justify-center">
              <button
                type="button"
                className="sm:text-lg lg:text-2xl"
                onClick={handleOpenModal}
                aria-label="Open task options"
              >
                <BsThreeDotsVertical />
              </button>
            </span>
          }
          message="open more"
          mClassName="w-18 md:w-24 sm:w-20 sm:-right-5 sm:bottom-8 lg:w-28 xl:w-35 xl:h-10 h-4 sm:h-6 md:h-7 right-5 bottom-5 lg:w-30 lg:h-8 lg:right-6 lg:bottom-10 xl:-right-10"
        />
      </Table>
      {openModal && (
        <Modal isOpen={openModal} onClose={handleCloseModal}>
          {children}
        </Modal>
      )}
    </>
  );
}

export default ReusableTaskItem;
