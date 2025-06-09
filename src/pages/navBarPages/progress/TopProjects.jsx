import { FaListUl } from "react-icons/fa";
import { useTaskStats } from "./Utils";

function TopProjects() {
  const { topTasks } = useTaskStats();
  // console.log(topTasks);
  return (
    <div className="bg-white dark:bg-[#2f3532] rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
        <FaListUl /> Top Projects/Lists
      </h2>
      <ul className="space-y-3">
        {topTasks.length === 0 ? (
          <li className="text-slate-400  dark:text-yellow-50 italic">
            No top projects found
          </li>
        ) : (
          topTasks.map(({ name, count }) => (
            <li
              key={name}
              className="flex justify-between items-center border-b last:border-b-0 border-emerald-50 dark:border-yellow-50/10 pb-2"
            >
              <span className="capitalize font-semibold text-slate-700 dark:text-emerald-200">
                {name}
              </span>
              <span className="bg-emerald-100 dark:bg-yellow-50 text-emerald-700 dark:text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">
                {isNaN(count) ? "0" : count} tasks
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TopProjects;
