import React from "react";
import { useTaskStats } from "./Utils";

function MonthlySummary() {
  const { monthlyCompleted, monthlyDiff } = useTaskStats();
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-[#2f3532] rounded-xl shadow p-6">
      <span className="text-emerald-700 dark:text-emerald-300 font-bold text-lg mb-1">
        This Month
      </span>
      <span className="text-2xl font-extrabold text-emerald-600 dark:text-yellow-300">
        {monthlyCompleted} Tasks
      </span>
      <span
        className={`text-sm ${
          monthlyDiff >= 0
            ? "text-emerald-600 dark:text-yellow-200/60"
            : "text-red-500"
        }`}
      >
        {monthlyDiff >= 0 ? "+" : ""}
        {monthlyDiff} from last month
      </span>
    </div>
  );
}

export default MonthlySummary;
