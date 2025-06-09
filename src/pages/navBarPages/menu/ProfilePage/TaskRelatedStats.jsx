import React from "react";
import { FaTasks, FaCheckCircle, FaListAlt, FaSpinner } from "react-icons/fa";

const statsConfig = [
  {
    label: "Total Tasks",
    icon: <FaTasks className="text-emerald-600 text-2xl mb-1" />,
    key: "totalTasks",
  },
  {
    label: "Completed",
    icon: <FaCheckCircle className="text-green-500 text-2xl mb-1" />,
    key: "completedTasks",
  },
  {
    label: "Active",
    icon: <FaSpinner className="text-yellow-500 text-2xl mb-1" />,
    key: "activeTasks",
  },
  {
    label: "Lists",
    icon: <FaListAlt className="text-blue-500 text-2xl mb-1" />,
    key: "totalLists",
  },
];

function TaskRelatedStats({
  totalTasks = 0,
  completedTasks = 0,
  activeTasks = 0,
  totalLists = 0,
}) {
  const stats = { totalTasks, completedTasks, activeTasks, totalLists };

  return (
    <div className="w-full bg-white/80 dark:bg-[#464c49] rounded-lg shadow p-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statsConfig.map(({ label, icon, key }) => (
          <div key={key} className="flex flex-col items-center">
            {icon}
            <span className="font-bold text-lg dark:text-yellow-100">
              {stats[key]}
            </span>
            <span className="text-xs text-slate-500 dark:text-yellow-50">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskRelatedStats;
