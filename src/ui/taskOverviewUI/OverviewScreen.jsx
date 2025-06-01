import { Outlet, useNavigate, useLocation } from "react-router";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";

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
  const [filterUsed, setFilterUsed] = useState(false);

  const handleFilterClick = () => {
    setFilterUsed(true);
    navigate("/layout/filter");
  };

  // Show header only if current path is /layout or /layout/{taskRoute}
  const showHeaderAndFilter =
    location.pathname === "/layout" ||
    location.pathname === "/layout/" ||
    taskRroutes.some((route) => location.pathname === `/layout/${route}`);

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-8 px-2">
      <section className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-2xl border border-emerald-100 p-6 md:p-10 flex flex-col gap-6">
        {showHeaderAndFilter && (
          <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-emerald-700 tracking-wide">
              Task Overview
            </h1>

            {/* Quick Action Button */}
            <button
              className="flex self-end items-center gap-2 px-2 sm:px-5 py-2 rounded-full bg-emerald-600 text-white font-bold shadow hover:bg-emerald-700 transition-all text-[0.6rem] sm:text-base"
              onClick={handleFilterClick}
              aria-label="filter task"
              disabled={filterUsed}
            >
              <FiFilter className="text-sm sm:text-lg" />
              Filter Task
            </button>
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
