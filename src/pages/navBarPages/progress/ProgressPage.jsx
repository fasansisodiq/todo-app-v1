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
import { FaTasks, FaCheckCircle, FaListUl, FaTrophy } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { useState } from "react";
import { useTaskStats } from "./Utils";
import WeeklySummary from "./WeeklySummary";
import MonthlySummary from "./MonthlySummary";

function ProgressPage() {
  const {
    totalTasks,
    activeTasks,
    completedTasks,
    overDueTasks,
    completedPerDay,
    topTasks,
    upComingDeadlines,
    formattedActivities,
    weeklyCompleted,
    weeklyDiff,
    monthlyCompleted,
    monthlyDiff,
    taskListNum,
  } = useTaskStats();

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <FaTasks />,
      color: "text-emerald-500",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: <FaCheckCircle />,
      color: "text-emerald-600",
    },
    {
      label: "Active",
      value: activeTasks,
      icon: <MdOutlinePendingActions />,
      color: "text-yellow-500",
    },
    {
      label: "Task Lists",
      value: taskListNum,
      icon: <FaListUl />,
      color: "text-blue-500",
    },
  ];

  const pieData = [
    { name: "Completed", value: completedTasks, color: "#059669" },
    { name: "Active", value: activeTasks, color: "#f59e42" },
    { name: "Overdue", value: overDueTasks, color: "#ef4444" },
  ];

  const achievements = [
    {
      icon: <FaTrophy className="text-yellow-500" />,
      label: `${completedTasks} Tasks Completed`,
    },
    { icon: <FaTrophy className="text-emerald-500" />, label: "7-Day Streak" },
  ];

  const teamStats = [
    { name: "Alice", completed: 25 },
    { name: "Bob", completed: 20 },
    { name: "You", completed: 35 },
  ];

  const [dateRange, setDateRange] = useState({ start: null, end: null });

  // Export/share handler (dummy)
  const handleExport = () => {
    alert("Progress exported!");
  };
  const handleShare = () => {
    alert("Share link copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col items-center px-4 py-8 font-sans">
      <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-700 mb-6 tracking-wide drop-shadow self-center">
        Progress Overview
      </h1>

      {/* Filter/Date Range Picker */}
      <div className="w-full max-w-4xl flex justify-end mb-4">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* Progress Ring & Weekly/Monthly Summary */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-6">
          <ProgressRing
            percentage={
              totalTasks > 0
                ? Math.round((completedTasks / totalTasks) * 100)
                : 0
            }
          />
          <span className="mt-2 text-lg font-semibold text-emerald-700">
            {totalTasks > 0
              ? Math.round((completedTasks / totalTasks) * 100)
              : 0}
            % Completed
          </span>
        </div>
        <WeeklySummary tasks={weeklyCompleted} diff={weeklyDiff} />
        <MonthlySummary tasks={monthlyCompleted} diff={monthlyDiff} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
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
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-emerald-700 mb-4">
            Task Status Breakdown
          </h2>
          <PieChart data={pieData} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-emerald-700 mb-4">
            Task Completion Trend
          </h2>
          <BarChart chartData={completedPerDay} />
        </div>
      </div>

      {/* Recent Activity Feed & Top Projects */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RacentActivity activities={formattedActivities} />
        <TopProjects topProjects={topTasks || []} />
      </div>

      {/* Upcoming Deadlines & Achievements */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UpcomingDeadLine deadlines={upComingDeadlines} />
        <Achievement achievements={achievements} />
      </div>

      {/* Team Collaboration Stats */}
      <div className="w-full max-w-4xl mb-8">
        <TeamCollabStats teamStats={teamStats} />
      </div>

      {/* Export/Share Progress */}
      <div className="w-full max-w-4xl flex justify-end">
        <ShareProgress onExport={handleExport} onShare={handleShare} />
      </div>
    </div>
  );
}

export default ProgressPage;
