import { useState } from "react";
import { RxTriangleUp, RxTriangleDown } from "react-icons/rx";
import { FaEllipsisV } from "react-icons/fa";

import CountdownToFutureDate from "./CountdownTofutureDate";
import Subtasks from "../features/add-subtasks/Subtasks";
import TaskOperationModal from "./TaskOperationModal";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import AddSubTaskModal from "../features/add-subtasks/AddSubTaskModal";
import { useTasks } from "../customHooks/tasks/useTasks";

function TaskItem({ task, onSave, operationLabel }) {
  const [expandedId, setExpandedId] = useState(null);
  const [targetLabel, setTargetLabel] = useState("");

  const {
    taskModal,
    taskMenuId,
    handleTaskModalOpen,
    handleTaskModalClose,
    handleTaskMenuOpen,
    handleTaskMenuClose,
  } = useTasks();

  // function to expand task to see subtasks
  const isExpanded = expandedId === task?.id;
  const handleToggleLabel = () => {
    setExpandedId(isExpanded ? null : task?.id);
  };

  return (
    <div className="w-full flex flex-col items-center">
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

          <button
            className="ml-auto p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 transition dark:text-yellow-100 "
            onClick={() => handleTaskMenuOpen(task.id)}
            aria-label="task operations"
            type="button"
            onMouseEnter={() => handleTaskMenuOpen(task.id)}
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
        {taskMenuId === task.id && (
          <div
            className="absolute right-10 top-2 z-20 bg-white dark:bg-[#23272f] border border-emerald-200 dark:border-emerald-700 rounded-lg shadow-lg py-2 w-40 md:w-60"
            onMouseLeave={handleTaskMenuClose}
          >
            {operationLabel.map((menu) => (
              <div
                key={menu.id}
                className="dark:text-emerald-100 text-slate-700"
              >
                <button
                  className="w-full flex gap-2 md:gap-3 items-center text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800  transition"
                  onClick={(e) => {
                    const target = e.target.textContent.toLowerCase().trim();
                    target !== "cancel" && handleTaskModalOpen(task);
                    setTargetLabel(target);
                    // console.log(e.target);
                  }}
                >
                  {menu.icon && <span>{menu.icon}</span>}
                  <span>{menu.label}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for task actions */}
      <TaskOperationModal
        taskModal={taskModal}
        onCloseTaskOperationModal={handleTaskModalClose}
        task={task}
        submitLabel={targetLabel}
        onSave={() => onSave(targetLabel)}
      />
      <AddSubTaskModal task={task} />
    </div>
  );
}

export default TaskItem;
