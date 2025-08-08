import { FiPlus } from "react-icons/fi";

const QuickActionBtn = ({ onClick, label }) => {
  return (
    <button
      className="flex items-center gap-2 p-2 py-1 rounded-full bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-900 dark:text-yellow-200 transition-all text-sm md:text-base"
      onClick={onClick}
      aria-label={label === "new task" ? "Add new task" : label}
    >
      <FiPlus className="text-base" />
      {label}
    </button>
  );
};

export default QuickActionBtn;
