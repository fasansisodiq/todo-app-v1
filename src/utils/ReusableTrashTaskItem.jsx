import { useState } from "react";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import { useTasks } from "../customHooks/tasks/useTasks";
import { MdDelete, MdRestoreFromTrash } from "react-icons/md";
import { RxTriangleDown, RxTriangleUp } from "react-icons/rx";
import CountdownToFutureDate from "./CountdownTofutureDate";
import { FaEllipsisV } from "react-icons/fa";
import Subtasks from "../features/add-subtasks/Subtasks";

function ReusableTrashTaskItem({ task }) {
  const [expandedId, setExpandedId] = useState(null);
  const [taskMenuId, setTaskMenuId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { restoreTrashTask, deleteTask } = useTasks();
  const isExpanded = expandedId === task?.id;
  const handleToggleLabel = () => {
    setExpandedId(isExpanded ? null : task?.id);
  };

  // task menu handlers
  const handleTaskMenuOpen = (taskId) => setTaskMenuId(taskId);
  const handleTaskMenuClose = () => setTaskMenuId(null);

  const trashTaskOperationModalDatas = [
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
  ];

  // Restore handler
  const handleRestore = async () => {
    await restoreTrashTask(task.id, task);
  };

  // Permanent delete handler
  const handleDelete = async () => {
    await deleteTask(task.id);
  };
  return (
    <div>
      <div
        className={`w-full rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-[#1a2220] mb-4 transition-all`}
      >
        {/* Top Row: Title, Due, Priority, More */}
        <div className="flex flex-wrap justify-between items-center gap-4 px-4 py-3">
          <button
            type="button"
            className="text-emerald-600 dark:text-yellow-600 hover:bg-emerald-100 dark:hover:bg-yellow-100 rounded-full p-1 transition"
            onClick={handleToggleLabel}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            {isExpanded ? (
              <RxTriangleUp size={28} />
            ) : (
              <RxTriangleDown size={28} />
            )}
          </button>

          <div
            className={`${
              isExpanded &&
              " bg-emerald-100 dark:bg-emerald-900 p-2 md:px-4 rounded-lg border border-emerald-200 dark:border-emerald-700"
            } flex items-center gap-2 md:gap-4 w-full sm:w-auto`}
          >
            <span
              className={`font-medium ${
                task.completed
                  ? "line-through text-slate-400 dark:text-emerald-400"
                  : "text-slate-800 dark:text-emerald-100"
              }" font-bold text-lg md:text-xl text-emerald-800 dark:text-yellow-200 truncate max-w-[180px]"`}
            >
              {capitalizeFirstLetter(task?.title)}
            </span>
            <span
              className={`rounded px-2 py-1 text-xs font-semibold ${
                task?.priority === "High"
                  ? "bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200"
                  : task?.priority === "Medium"
                  ? "bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200"
                  : "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
              }`}
            >
              {task?.priority || "Low"}
            </span>
            <>
              {" "}
              {task.dueDate && (
                <span className="flex gap-1 items-center ml-2 text-xs md:text-[0.7rem] lg:text-[0.9rem] text-slate-400 dark:text-emerald-400">
                  Due:{" "}
                  {<CountdownToFutureDate targetDateString={task?.dueDate} />}
                </span>
              )}
            </>
          </div>

          {/* <button
            className="ml-auto p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
            onClick={() => handleTaskMenuOpen(task.id)}
            aria-label="task operations"
            type="button"
            onMouseEnter={() => handleTaskMenuOpen(task.id)}
          >
            <FaEllipsisV />
          </button> */}
          <button
            className=" ml-auto p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Subtask options"
            type="button"
          >
            <FaEllipsisV />
          </button>
        </div>
        {/* Expanded Details */}
        {isExpanded && (
          <div className="w-full px-4 pb-4">
            <Subtasks task={task} />
          </div>
        )}
      </div>
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
      {taskMenuId === task.id &&
        trashTaskOperationModalDatas.map((menu) => (
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
    </div>
  );
}

export default ReusableTrashTaskItem;
