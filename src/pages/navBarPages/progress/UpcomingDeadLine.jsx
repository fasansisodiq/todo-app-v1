import React from "react";
import { MdOutlineUpcoming } from "react-icons/md";
import { useTaskStats } from "./Utils";

function UpcomingDeadLine() {
  const { upComingDeadlines } = useTaskStats();
  return (
    <div className="bg-white dark:bg-[#2f3532] rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
        <MdOutlineUpcoming /> Upcoming Deadlines
      </h2>
      <ul className="space-y-2">
        {upComingDeadlines.length === 0 ? (
          <li className="text-slate-400 dark:text-yellow-50 italic">
            No upcoming deadlines
          </li>
        ) : (
          upComingDeadlines.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center border-b last:border-b-0 border-emerald-50 dark:border-yellow-50/10 pb-2"
            >
              <span className="font-semibold text-slate-700 dark:text-yellow-300/60">
                {item.title}
              </span>
              <span className="bg-emerald-100 dark:bg-yellow-50 dark:text-yellow-700/80 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                {item.dueDate}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default UpcomingDeadLine;
