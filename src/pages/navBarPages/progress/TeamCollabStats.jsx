import React from "react";
import { FaUsers } from "react-icons/fa";

function TeamCollabStats({
  teamStats = [
    { name: "Alice", completed: 25 },
    { name: "Bob", completed: 20 },
    { name: "You", completed: 35 },
  ],
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
        <FaUsers /> Team Collaboration
      </h2>
      <ul className="space-y-2">
        {teamStats.length === 0 ? (
          <li className="text-slate-400 italic">No team stats available</li>
        ) : (
          teamStats.map((member, i) => (
            <li
              key={i}
              className="flex justify-between items-center border-b last:border-b-0 border-emerald-50 pb-2"
            >
              <span className="font-semibold text-slate-700">
                {member.name}
              </span>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                {member.completed} completed
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TeamCollabStats;
