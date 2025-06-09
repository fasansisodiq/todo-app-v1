import { FaHistory } from "react-icons/fa";
import { useTaskStats } from "./Utils";

function RacentActivity() {
  const { formattedActivities } = useTaskStats();
  return (
    <div className="bg-white dark:bg-[#2f3532]  rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
        <FaHistory /> Recent Activity
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-yellow-100">
        {formattedActivities.length === 0 ? (
          <li className="text-slate-400 dark:text-yellow-50 italic">
            No recent activity
          </li>
        ) : (
          formattedActivities.map((activity, i) => (
            <li
              className="font-semibold text-emerald-950 dark:text-emerald-100/80"
              key={i}
            >
              {activity}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default RacentActivity;
