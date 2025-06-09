import React from "react";
import { FaTrophy } from "react-icons/fa";
import { useTaskStats } from "./Utils";

function Achievement() {
  const { achievements } = useTaskStats();
  return (
    <div className="bg-white dark:bg-[#2f3532] rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
        <FaTrophy /> Achievements
      </h2>
      <ul className="space-y-2">
        {achievements.length === 0 ? (
          <li className="text-slate-400 dark:text-yellow-200 italic">
            No achievements yet
          </li>
        ) : (
          achievements.map((ach, i) => (
            <li key={i} className="flex items-center gap-2">
              {ach.icon}
              <span className="text-slate-700 dark:text-yellow-200/80">
                {ach.label}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Achievement;
