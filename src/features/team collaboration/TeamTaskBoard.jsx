import { useTeamCollab } from "../../customHooks/team-collaboration/useTeamCollab";

export default function TeamTaskBoard() {
  const { tasks = [], onTaskSelect, onAssign } = useTeamCollab();
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-200 mb-4">
        Team Tasks
      </h2>
      <ul className="space-y-2">
        {tasks.length === 0 && (
          <li className="text-slate-400 dark:text-emerald-200">
            No tasks yet.
          </li>
        )}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white dark:bg-[#23272f] rounded-lg shadow px-4 py-3 flex justify-between items-center cursor-pointer hover:ring-2 hover:ring-emerald-400 transition"
            onClick={() => onTaskSelect(task.id)}
          >
            <div>
              <div className="font-semibold text-slate-800 dark:text-emerald-100">
                {task.title}
              </div>
              <div className="text-xs text-slate-400 dark:text-emerald-400">
                {task.description}
              </div>
            </div>
            <div>
              <select
                value={task.assigneeId || ""}
                onChange={(e) => onAssign && onAssign(task.id, e.target.value)}
                className="rounded border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#23272f] text-xs px-2 py-1"
              >
                <option value="">Unassigned</option>
                {/* Map team members here */}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
