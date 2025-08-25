import BarChart from "./BarChart";
import PieChart from "./PieChart";
import ProgressRing from "./ProgressRing";
import DateRangePicker from "./DateRangePicker";
import StartsCard from "./StartsCard";
import RacentActivity from "./RacentActivity";
import TopProjects from "./TopProjects";
import UpcomingDeadLine from "./UpcomingDeadLine";
import Achievement from "./Achievement";
import TeamCollabStats from "./TeamCollabStats";
import ShareProgress from "./ShareProgress";
import { useRef } from "react";
import { useTaskStats } from "./Utils";
import WeeklySummary from "./WeeklySummary";
import MonthlySummary from "./MonthlySummary";
import { usePDF } from "react-to-pdf";

function ProgressPage() {
  const { totalTasks, completedTasks, stats } = useTaskStats();

  let userList = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 5, name: "Eve" },
    { id: 6, name: "Frank" },
    { id: 7, name: "Grace" },
    { id: 8, name: "Heidi" },
    { id: 9, name: "Ivan" },
    { id: 10, name: "Judy" },
  ];

  const pdfRef = useRef();
  const { toPDF } = usePDF({ filename: "progress.pdf" });

  return (
    <>
      <div
        ref={pdfRef}
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col items-center px-4 py-8 font-sans dark:bg-[#181f1b] dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]
        dark:border-emerald-900 dark:shadow-lg"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 dark:text-emerald-300 mb-6 tracking-wide drop-shadow self-center">
            Progress Overview
          </h1>
          <p className="text-slate-500 dark:text-yellow-100 text-base md:text-lg mt-1 pb-5 ">
            See your progress, stats, and manage your tasks at a glance.
          </p>
        </div>

        {/* Filter/Date Range Picker */}
        <div className="w-full max-w-4xl flex justify-end mb-4 exclude-from-pdf">
          <DateRangePicker />
        </div>

        {/* Progress Ring & Weekly/Monthly Summary */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center justify-center bg-white dark:bg-[#2f3532] rounded-xl shadow p-6">
            <ProgressRing
              percentage={
                totalTasks > 0
                  ? Math.round((completedTasks / totalTasks) * 100)
                  : 0
              }
            />
            <span className="mt-2 text-lg font-semibold text-emerald-700 dark:text-yellow-300">
              {totalTasks > 0
                ? Math.round((completedTasks / totalTasks) * 100)
                : 0}
              % Completed
            </span>
          </div>
          <WeeklySummary />
          <MonthlySummary />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
          {stats.map((stat) => (
            <StartsCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              color={stat.color}
            />
          ))}
        </div>

        {/* Pie Chart & Bar Chart */}
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-[#2f3532] rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-4">
              Task Status Breakdown
            </h2>
            <PieChart />
          </div>
          <div className="bg-white dark:bg-[#2f3532] rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-4">
              Task Completion Trend
            </h2>
            <BarChart />
          </div>
        </div>

        {/* Recent Activity Feed & Top Projects */}
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RacentActivity />
          <TopProjects />
        </div>

        {/* Upcoming Deadlines & Achievements */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <UpcomingDeadLine />
          <Achievement />
        </div>

        {/* Team Collaboration Stats */}
        <div className="w-full max-w-4xl mb-8">
          <TeamCollabStats />
        </div>

        {/* Export/Share Progress */}
        <div className="w-full max-w-4xl flex justify-end exclude-from-pdf">
          <ShareProgress pdfRef={pdfRef} toPDF={toPDF} userList={userList} />
        </div>
      </div>
    </>
  );
}

export default ProgressPage;
