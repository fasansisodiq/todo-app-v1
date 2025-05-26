import React from "react";
import { FaHistory } from "react-icons/fa";

function RacentActivity({
  activities = [
    "Completed 'Design UI Mockups'",
    "Added new task to 'Marketing'",
    "Marked 'Update Docs' as active",
    "Completed 'Team Meeting'",
  ],
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
        <FaHistory /> Recent Activity
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-slate-600">
        {activities.length === 0 ? (
          <li className="text-slate-400 italic">No recent activity</li>
        ) : (
          activities.map((activity, i) => <li key={i}>{activity}</li>)
        )}
      </ul>
    </div>
  );
}

export default RacentActivity;
