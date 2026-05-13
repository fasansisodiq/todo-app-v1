import { useNavigate } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";

function BackBtn({label}) {
  const navigate = useNavigate();
  return (
    <button
      role="button"
      aria-label="Go back"
      onClick= {label ==="back to layout"? () => navigate("/layout"): () => navigate(-1)}
      className="flex items-center   p-2 py-1  rounded-full bg-white/80 dark:bg-emerald-900/60 shadow-md hover:shadow-lg border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-yellow-200 hover:bg-emerald-50 dark:hover:bg-emerald-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      title={label=== "back to layout"? "Back to layout": "prev"}
    >
      {label === "back to layout" ? <span className="capitalize">back</span>: <IoIosArrowRoundBack className="text-xl sm:text-2xl md:text-3xl lg:text-4xl" />}
      {/* <span className="hidden sm:inline font-medium">Back</span> */}
    </button>
  );
}

export default BackBtn;
