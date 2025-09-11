import { Outlet, useNavigate, useLocation } from "react-router";
import { GoPlus } from "react-icons/go";
import CustomButton from "../../utils/CustomButton";
import QuickActionBtn from "../../utils/QuickActionBtn";

const taskRoutes = [
  "today",
  "planned",
  "important",
  "assigned",
  "project",
  "work",
  "personal",
  "house",
  "social",
  "completed",
  "trash",
  "pending",
];

function OverviewScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  // Show header only if current path is /layout or /layout/{taskRoute}
  const showHeaderAndFilter =
    location.pathname === "/layout" ||
    location.pathname === "/layout/" ||
    taskRoutes.some((route) => location.pathname === `/layout/${route}`);

  return (
    <main className="w-full min-h-full flex flex-col items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]  px-2 pr-4 transition-colors duration-300">
      <section
        className={
          "w-full max-w-5xl  rounded-2xl shadow-2xl border border-emerald-100 dark:border-emerald-900 p-6 md:p-10 flex flex-col gap-6 transition-colors duration-300 "
        }
      >
        {showHeaderAndFilter && (
          <header className="flex flex-col  items-center justify-between gap-4 mb-4">
            {/* Add Task Button (example quick action) */}
            <div className="w-full flex justify-end">
              <QuickActionBtn
                label="new task"
                onClick={() => navigate("/layout/task/new")}
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700 dark:text-yellow-200 tracking-wide">
                Task Overview
              </h1>
              <p className="text-slate-500 dark:text-slate-300 text-sm sm:text-base md:text-lg mt-1">
                See your progress, stats, and manage your tasks at a glance.
              </p>
            </div>
          </header>
        )}
        <div className="w-full flex-1 items-center">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default OverviewScreen;
