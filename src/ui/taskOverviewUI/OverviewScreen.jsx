import { Outlet, useNavigate, useLocation } from "react-router";
import { FiPlus } from "react-icons/fi";

const taskRroutes = [
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
    taskRroutes.some((route) => location.pathname === `/layout/${route}`);

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] py-8 px-2 transition-colors duration-300">
      <section className="w-full max-w-5xl bg-white/90 dark:bg-[#232b25]/90 rounded-2xl shadow-2xl border border-emerald-100 dark:border-emerald-900 p-6 md:p-10 flex flex-col gap-6 transition-colors duration-300">
        {showHeaderAndFilter && (
          <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 dark:text-yellow-200 tracking-wide">
                Task Overview
              </h1>
              <p className="text-slate-500 dark:text-slate-300 text-base md:text-lg mt-1">
                See your progress, stats, and manage your tasks at a glance.
              </p>
            </div>
            <div className="flex gap-2">
              {/* Add Task Button (example quick action) */}
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-900 dark:text-yellow-200 transition-all text-sm md:text-base"
                onClick={() => navigate("/layout/task/new")}
                aria-label="Add new task"
              >
                <FiPlus className="text-base" />
                New Task
              </button>
            </div>
          </header>
        )}
        <div className="flex-1">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

export default OverviewScreen;
