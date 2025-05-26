import React from "react";
import { MdOutlineUpcoming } from "react-icons/md";

function UpcomingDeadLine({
  deadlines = [
    { task: "Submit Report", due: "2024-06-01" },
    { task: "Client Review", due: "2024-06-03" },
    { task: "Deploy Update", due: "2024-06-05" },
  ],
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
        <MdOutlineUpcoming /> Upcoming Deadlines
      </h2>
      <ul className="space-y-2">
        {deadlines.length === 0 ? (
          <li className="text-slate-400 italic">No upcoming deadlines</li>
        ) : (
          deadlines.map((item, i) => (
            <li
              key={i}
              className="flex justify-between items-center border-b last:border-b-0 border-emerald-50 pb-2"
            >
              <span className="font-semibold text-slate-700">{item.title}</span>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
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
