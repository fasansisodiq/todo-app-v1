import React, { useState } from "react";
import { FaRegCircle, FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import Modal from "../../utils/Modal";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { MdCancel, MdDelete, MdRestoreFromTrash } from "react-icons/md";

function TrashedSubtaskItem({ subtask, idx }) {
  const { restoreTrashedSubtask, deleteSubtask } = useTasks();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Restore handler
  const handleRestore = async () => {
    await restoreTrashedSubtask(subtask.parentTaskId, subtask.id);
    setModalOpen(false);
  };

  // Permanent delete handler
  const handleDelete = async () => {
    await deleteSubtask(subtask.parentTaskId, subtask.id);
    setModalOpen(false);
  };

  const trashSubtaskOperationDatas = [
    {
      id: "restore",
      icon: <MdRestoreFromTrash />,
      label: "Restore",
      action: () => handleRestore(),
    },
    {
      id: "delete",
      icon: <MdDelete />,
      label: "permanent delete",
      action: () => handleDelete(),
    },
    // {
    //   id: "close",
    //   icon: <MdCancel />,
    //   label: "close",
    //   action: () => setModalOpen(false),
    // },
  ];
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg border border-emerald-100 dark:border-emerald-800 bg-white dark:bg-[#23272f] shadow mb-2 relative "
      key={subtask.id || idx}
    >
      <span>
        {subtask.completed ? (
          <FaCheckCircle className="text-emerald-600 text-lg" />
        ) : (
          <FaRegCircle className="text-slate-400 dark:text-emerald-700 text-lg" />
        )}
      </span>
      <span
        className={`font-medium ${
          subtask.completed
            ? "line-through text-slate-400 dark:text-emerald-400"
            : "text-slate-800 dark:text-emerald-100"
        }`}
      >
        {subtask.title}
      </span>
      {subtask.priority && (
        <span
          className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
            subtask.priority === "High"
              ? "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200"
              : subtask.priority === "Medium"
              ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200"
              : "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
          }`}
        >
          {subtask.priority}
        </span>
      )}
      {subtask.dueDate && (
        <span className="ml-2 text-xs text-slate-400 dark:text-emerald-400">
          Due: {subtask.dueDate}
        </span>
      )}
      {subtask.assignee && (
        <span className="ml-2 text-xs text-slate-500 dark:text-emerald-300">
          Assignee: {subtask.assignee}
        </span>
      )}

      {/* trashSubtask operation menu */}
      <button
        className=" ml-auto p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Subtask options"
        type="button"
      >
        <FaEllipsisV />
      </button>
      {menuOpen && (
        <div className="absolute right-10 top-2 z-20 bg-white dark:bg-[#23272f] border border-emerald-200 dark:border-emerald-700 shadow-lg py-2 p-6 max-w-sm mx-auto   rounded-xl">
          <button
            className="w-full text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition"
            onClick={() => {
              setModalOpen(true);
              setMenuOpen(false);
            }}
          >
            Restore
          </button>
          <button
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-800 transition"
            onClick={() => {
              setModalOpen(true);
              setMenuOpen(false);
            }}
          >
            Delete Permanently
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            onClick={() => setMenuOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Modern modal for subtask operations */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6 max-w-md mx-auto bg-white dark:bg-[#23272f] rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-emerald-700 dark:text-yellow-300">
            Subtask: <span className="font-semibold">{subtask.title}</span>
          </h3>
          <div className="mb-2 text-sm">
            <span className="font-semibold text-emerald-700 dark:text-yellow-200">
              Description:
            </span>{" "}
            <span className="text-slate-700 dark:text-emerald-100">
              {subtask.description || "No description"}
            </span>
          </div>
          <div className="mb-2 text-sm">
            <span className="font-semibold text-emerald-700 dark:text-yellow-200">
              Due Date:
            </span>{" "}
            <span className="text-slate-700 dark:text-emerald-100">
              {subtask.dueDate || "None"}
            </span>
          </div>
          <div className="mb-2 text-sm">
            <span className="font-semibold text-emerald-700 dark:text-yellow-200">
              Priority:
            </span>{" "}
            <span className="text-slate-700 dark:text-emerald-100">
              {subtask.priority}
            </span>
          </div>
          <div className="mb-2 text-sm">
            <span className="font-semibold text-emerald-700 dark:text-yellow-200">
              Assignee:
            </span>{" "}
            <span className="text-slate-700 dark:text-emerald-100">
              {subtask.assignee || "Unassigned"}
            </span>
          </div>
          {trashSubtaskOperationDatas.map((menu) => (
            <div className="flex gap-2 mt-4" key={menu.id}>
              <button
                className={`flex-1 px-4 py-2 rounded-lg transition  text-white
                ${
                  menu.label === "permanent delete"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700 "
                }`}
                onClick={menu.action}
              >
                {menu.label}
              </button>
            </div>
          ))}
          <button
            className="mt-4 w-full px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-emerald-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            onClick={() => setModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TrashedSubtaskItem;
