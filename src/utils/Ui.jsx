import { useTasks } from "../customHooks/tasks/useTasks";

function Ui({ icon, label, taskNum }) {
  const { handleSort } = useTasks();
  return (
    <div
      onClick={() => handleSort()}
      className={`
        flex justify-between items-center px-3 py-2 my-1 rounded-xl cursor-pointer
        bg-gradient-to-r from-emerald-50 via-white to-emerald-100
        hover:from-emerald-100 hover:to-emerald-200 hover:shadow-lg
        transition-all duration-200 border border-emerald-100 group
      `}
      style={{
        boxShadow: "0 2px 8px 0 rgba(16,185,129,0.06)",
      }}
    >
      <span className="flex items-center gap-3">
        <span className="text-emerald-500 text-xl lg:text-2xl group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
        <span className="capitalize font-semibold text-base lg:text-lg text-emerald-800 group-hover:text-emerald-600 transition-colors duration-200">
          {label}
        </span>
      </span>
      <div className="flex items-center justify-center min-w-[2rem] h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm shadow group-hover:bg-emerald-200 transition-colors duration-200">
        {taskNum}
      </div>
    </div>
  );
}

export default Ui;
