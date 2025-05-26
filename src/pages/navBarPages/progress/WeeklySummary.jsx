import React from "react";

/**
 * WeeklySummary component
 * @param {Object} props
 * @param {number} props.tasks - Number of tasks completed this week
 * @param {number} props.diff - Difference from last week (positive or negative)
 */
function WeeklySummary({ tasks = 0, diff = 0 }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-6">
      <span className="text-emerald-700 font-bold text-lg mb-1">This Week</span>
      <span className="text-2xl font-extrabold text-emerald-600">
        {tasks} Tasks
      </span>
      <span
        className={`text-sm ${diff >= 0 ? "text-emerald-600" : "text-red-500"}`}
      >
        {diff >= 0 ? "+" : ""}
        {diff} from last week
      </span>
    </div>
  );
}

export default WeeklySummary;
