import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";

function BackBtn() {
  const navigate = useNavigate();
  return (
    <button
      role="button"
      aria-label="Go back"
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-emerald-900/60 shadow-md hover:shadow-lg border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-yellow-200 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      title="Back"
    >
      <IoIosArrowRoundBack className="text-xl" />
      <span className="hidden sm:inline font-medium">Back</span>
    </button>
  );
}

export default BackBtn;
