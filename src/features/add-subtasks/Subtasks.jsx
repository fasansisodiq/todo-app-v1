import { useEffect, useState } from "react";
import { useTasks } from "../../customHooks/tasks/useTasks";
import {
  FaCheckCircle,
  FaRegCircle,
  FaTrashAlt,
  FaEdit,
  FaEllipsisV,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";

import Modal from "../../utils/Modal";
import { useOperation } from "../../customHooks/operation/useOperation";
import QuickActionBtn from "../../utils/QuickActionBtn";

const subtaskDetails = [
  "title",
  "description",
  "dueDate",
  "priority",
  "assignee",
];

function Subtasks({ task }) {
  const [subtaskMenuId, setSubtaskMenuId] = useState(null);
  const [subtaskModal, setSubtaskModal] = useState({
    open: false,
    subtask: null,
  });

  const {
    getSubtasksForTask,
    listenToSubtasks,
    updateSubtask,
    deleteSubtask,
    trashSubtask,
  } = useTasks();
  const { onOpenSubTask } = useOperation();

  // Listen to subtasks in real time for this task
  // (Assumes listenToSubtasks sets the global subtasks state for the current task)
  useEffect(() => {
    if (task?.id) {
      const unsub = listenToSubtasks(task.id);
      return () => unsub && unsub();
    }
  }, [task?.id, listenToSubtasks]);

  const subtasks = getSubtasksForTask(task.id);

  // Subtask menu handlers
  const handleSubtaskMenuOpen = (subtaskId) => setSubtaskMenuId(subtaskId);
  const handleSubtaskMenuClose = () => setSubtaskMenuId(null);

  // Subtask operation modal handlers
  const openSubtaskOperationModal = (sub) =>
    setSubtaskModal({ open: true, subtask: sub });
  const closeSubtaskOperationModal = () =>
    setSubtaskModal({ open: false, subtask: null });

  // Subtask operation actions
  const handleSubtaskCompleteToggle = async (sub) => {
    await updateSubtask(task.id, sub.id, { completed: !sub.completed });
    handleSubtaskMenuClose();
    closeSubtaskOperationModal();
  };

  const handleSubtaskDelete = async (sub) => {
    await deleteSubtask(task.id, sub.id);
    handleSubtaskMenuClose();
    closeSubtaskOperationModal();
  };

  const handleSubtaskTrash = async (sub) => {
    await trashSubtask(task.id, sub.id);
    handleSubtaskMenuClose();
    closeSubtaskOperationModal();
  };

  const subtaskMenus = [
    {
      id: "view/edit",
      icon: <FaEdit />,
      label: "  View / Edit",
      action: (sub) => {
        openSubtaskOperationModal(sub);
        handleSubtaskMenuClose();
      },
    },
    {
      id: "complete",
      icon: <FaCheckCircle />,
      label: "Mark as complete",
      action: (sub) =>
        updateSubtask(task.id, sub.id, { ...sub, completed: true }),
    },
    {
      id: "trash",
      icon: <FaTrashAlt />,
      label: "Move to trash",
      action: (sub) => handleSubtaskTrash(sub),
    },
    {
      id: "edit",
      icon: <FaEdit />,
      label: "Edit",
      action: (sub) => {
        openSubtaskOperationModal(sub);
        handleSubtaskMenuClose();
      },
    },

    {
      id: "cancel",
      icon: <MdCancel />,
      label: "Cancel",
      action: handleSubtaskMenuClose,
    },
  ];

  const subtaskModalBtn = [
    {
      label: subtaskModal.subtask?.completed
        ? "Mark as incomplete"
        : "Mark as complete",
      action: () => handleSubtaskCompleteToggle(subtaskModal.subtask),
      style: "bg-emerald-600  hover:bg-emerald-700 ",
    },
    {
      label: "Move to Trash",
      action: () => handleSubtaskTrash(subtaskModal.subtask),
      style: "bg-yellow-500  hover:bg-yellow-600 ",
    },
    {
      label: "Edit",
      action: () => handleSubtaskDelete(subtaskModal.subtask),
      style: "bg-blue-500  hover:bg-blue-600 ",
    },
  ];

  return (
    <>
      <section className="mt-2">
        <div className="flex justify-between items-center pb-4">
          <h4 className="text-base font-semibold text-emerald-700 dark:text-yellow-200 mb-2">
            Subtasks
          </h4>
          {/* Add subTask Button (example quick action) */}
          <QuickActionBtn label="new subtask" onClick={onOpenSubTask} />
        </div>

        {subtasks && subtasks.length > 0 ? (
          <ul className="space-y-2">
            {subtasks.map((sub) => (
              <li
                key={sub.id}
                className="flex items-center gap-3 p-2 rounded-lg border border-emerald-50 dark:border-emerald-800 bg-emerald-50 dark:bg-[#23272f] shadow-sm relative"
              >
                <button
                  aria-label={
                    sub.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                  onClick={() =>
                    updateSubtask(task.id, sub.id, {
                      ...sub,
                      completed: !sub.completed,
                    })
                  }
                  className="focus:outline-none"
                >
                  {sub.completed ? (
                    <FaCheckCircle className="text-emerald-600 text-lg" />
                  ) : (
                    <FaRegCircle className="text-slate-400 dark:text-emerald-700 text-lg" />
                  )}
                </button>
                <span
                  className={`font-medium ${
                    sub.completed
                      ? "line-through text-slate-400 dark:text-emerald-400"
                      : "text-slate-800 dark:text-emerald-100"
                  }`}
                >
                  {sub.title}
                </span>
                {sub.priority && (
                  <span
                    className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                      sub.priority === "High"
                        ? "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200"
                        : sub.priority === "Medium"
                        ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200"
                        : "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
                    }`}
                  >
                    {sub.priority}
                  </span>
                )}
                {sub.dueDate && (
                  <span className="ml-2 text-xs text-slate-400 dark:text-emerald-400">
                    Due: {sub.dueDate}
                  </span>
                )}
                {/* Subtask menu button */}
                <button
                  className="ml-auto p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 dark:text-yellow-100 transition"
                  onClick={() => handleSubtaskMenuOpen(sub.id)}
                  onMouseEnter={() => handleSubtaskMenuOpen(sub.id)}
                  aria-label="Subtask options"
                  type="button"
                >
                  <FaEllipsisV />
                </button>
                {/* Subtask menu dropdown */}
                {subtaskMenuId === sub.id && (
                  <div
                    onMouseLeave={handleSubtaskMenuClose}
                    className="text-slate-700 dark:text-emerald-100 absolute right-10 top-2 z-20 bg-white dark:bg-[#23272f] border-8 border-white dark:border-[#23272f] rounded-lg shadow-lg  py-2 w-40 sm:w-50 md:w-60"
                  >
                    {subtaskMenus.map((menu) => (
                      <button
                        key={menu.id}
                        className="w-full flex gap-2 md:gap-3 items-center text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition"
                        onClick={() => {
                          menu.action(sub);
                          handleSubtaskMenuClose();
                        }}
                        disabled={menu.id === "complete" && sub.completed}
                      >
                        {menu.icon && <span className="">{menu.icon}</span>}
                        <span>{menu.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-slate-400 dark:text-emerald-300 italic">
            No subtasks yet.
          </div>
        )}
      </section>

      {/* Subtask Operation Modal */}
      <Modal isOpen={subtaskModal.open} onClose={closeSubtaskOperationModal}>
        {subtaskModal.subtask && (
          <div className="p-6 max-w-md mx-auto bg-white dark:bg-[#23272f] rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-emerald-700 dark:text-yellow-300">
              Subtask:{" "}
              <span className="font-semibold">
                {subtaskModal.subtask.title}
              </span>
            </h3>
            {subtaskDetails.map((field) => (
              <div key={field} className="mb-2 text-sm">
                <span className="font-semibold text-emerald-700 dark:text-yellow-200">
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </span>{" "}
                <span className="text-slate-700 dark:text-emerald-100">
                  {subtaskModal.subtask[field] || "None"}
                </span>
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <div className="flex gap-2 mt-4">
                {subtaskModalBtn.map((btn, index) => (
                  <button
                    key={index}
                    className={`flex-1 px-4 py-2 rounded-lg text-white transition ${btn.style}`}
                    onClick={btn.action}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="mt-4 w-full px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-emerald-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              onClick={closeSubtaskOperationModal}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Subtasks;
