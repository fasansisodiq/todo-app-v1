import EditTaskOperation from "../../features/edit-task/EditTaskOperation";
import CompletedTaskOperation from "../../features/mark-as-completed/CompletedTaskOperation";
import PendingTaskOperation from "../../features/mark-as-pending/PendingTaskOperation";
import TaskDescriptionOperation from "./taskDescription/TaskDescriptionOperation";
import TempDeleteTaskOperation from "../../features/move-task-to-trash/TempDeleteTaskOperation";
import ShareTaskOperation from "../../features/share-task/ShareTaskOperation";
import AddsubTaskOperation from "../../features/add-subtasks/AddsubTaskOperation";

import { useState } from "react";

function TaskOperations({ task, description, title }) {
  const [taskMenuId, setTaskMenuId] = useState(null);
  // const taskOperations = [
  //   { label: "Task Description", component: TaskDescriptionOperation },
  //   { label: "Add SubTask", component: AddsubTaskOperation },
  //   { label: "Edit Task", component: EditTaskOperation },
  //   { label: "Mark as Completed", component: CompletedTaskOperation },
  //   { label: "Mark as Pending", component: PendingTaskOperation },
  //   { label: "Temporary Delete Task", component: TempDeleteTaskOperation },
  //   { label: "Share Task", component: ShareTaskOperation },
  // ];

  return (
    <div className="absolute right-10 top-2 z-20 bg-white dark:bg-[#23272f] border border-emerald-200 dark:border-emerald-700 rounded-lg shadow-lg py-2 w-40 md:w-60">
      {/* task menu dropdown */}
      {taskMenuId === task.id && (
        <div className="absolute right-10 top-2 z-20 bg-white dark:bg-[#23272f] border border-emerald-200 dark:border-emerald-700 rounded-lg shadow-lg py-2 w-40 md:w-60">
          {taskOperations.map((menu) => (
            <button
              key={menu.id}
              className="w-full flex gap-2 md:gap-3 items-center text-left px-4 py-2 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition"
              onClick={() => {
                menu.action(task);
                handleTaskMenuClose();
              }}
              disabled={menu.id === "complete" && task.completed}
            >
              {menu.icon && <span className="">{menu.icon}</span>}
              <span className="">{menu.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskOperations;
