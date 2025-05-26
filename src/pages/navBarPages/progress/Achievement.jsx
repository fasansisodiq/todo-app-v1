import React from "react";
import { FaTrophy } from "react-icons/fa";

function Achievement({
  achievements = [
    {
      icon: <FaTrophy className="text-yellow-500" />,
      label: "100 Tasks Completed",
    },
    { icon: <FaTrophy className="text-emerald-500" />, label: "7-Day Streak" },
  ],
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
        <FaTrophy /> Achievements
      </h2>
      <ul className="space-y-2">
        {achievements.length === 0 ? (
          <li className="text-slate-400 italic">No achievements yet</li>
        ) : (
          achievements.map((ach, i) => (
            <li key={i} className="flex items-center gap-2">
              {ach.icon}
              <span className="text-slate-700">{ach.label}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Achievement;
