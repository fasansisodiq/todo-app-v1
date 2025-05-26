import { FaListUl } from "react-icons/fa";

function TopProjects({ topProjects = [] }) {
  // console.log(topProjects);
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold text-emerald-700 mb-4 flex items-center gap-2">
        <FaListUl /> Top Projects/Lists
      </h2>
      <ul className="space-y-3">
        {topProjects.length === 0 ? (
          <li className="text-slate-400 italic">No top projects found</li>
        ) : (
          topProjects.map(({ name, tasks }) => (
            <li
              key={name}
              className="flex justify-between items-center border-b last:border-b-0 border-emerald-50 pb-2"
            >
              <span className="capitalize font-semibold text-slate-700">
                {name}
              </span>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                {tasks} tasks
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TopProjects;
