import { FiPlus } from "react-icons/fi";

const QuickActionBtn = ({ onClick, label }) => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500 text-white font-semibold shadow-md hover:shadow-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:bg-emerald-800 dark:hover:bg-emerald-900 dark:text-yellow-200 transition-all duration-200 text-sm sm:text-base md:text-lg"
      onClick={onClick}
      aria-label={label === "new task" ? "Add new task" : label}
    >
      <FiPlus className="text-lg md:text-xl" />
      <span className="truncate">{label}</span>
    </button>
  );
};

export default QuickActionBtn;
