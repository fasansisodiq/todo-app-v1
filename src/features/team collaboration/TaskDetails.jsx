import React from "react";

export default function TaskDetails({ task }) {
  if (!task) return null;
  return (
    <div className="p-6 border-b border-emerald-100 dark:border-emerald-900">
      <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-200">
        {task.title}
      </h3>
      <p className="text-slate-700 dark:text-emerald-100 mt-2">
        {task.description}
      </p>
      <div className="mt-4 text-xs text-slate-400 dark:text-emerald-400">
        Assigned to: {task.assigneeEmail || "Unassigned"}
      </div>
    </div>
  );
}
