import { FaCheckCircle, FaListUl, FaTasks, FaTrophy } from "react-icons/fa";
import { useTasks } from "../../../customHooks/tasks/useTasks";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subWeeks,
  subMonths,
  isWithinInterval,
  parseISO,
  addDays,
  isSameDay,
} from "date-fns";
import { MdOutlinePendingActions } from "react-icons/md";

// Helper to get day label from a date string
function getDayLabel(dateStr) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateStr);
  return days[date.getDay()];
}

// Helper to parse date safely
function parseDate(date) {
  if (!date) return null;
  return typeof date === "string" ? parseISO(date) : new Date(date);
}

// Reusable function to filter and count tasks
function taskArrayFilter(data, filterStatement) {
  return Array.isArray(data) ? data.filter(filterStatement).length : 0;
}

// Reusable function to count tasks by a key (e.g., taskClass)
function countByKey(data, key, defaultValue = "Uncategorized") {
  const counts = {};
  if (Array.isArray(data)) {
    data.forEach((item) => {
      const k = item[key] || defaultValue;
      counts[k] = (counts[k] || 0) + 1;
    });
  }
  return counts;
}

// Reusable function to get top N items from a count object
function getTopNFromCounts(counts, n = 3) {
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

// Custom hook to get task stats and formatted activities
export function useTaskStats() {
  const { taskData, activities } = useTasks();
  const now = new Date();

  // Task stats
  const totalTasks = Array.isArray(taskData) ? taskData.length : 0;
  const completedTasks = taskArrayFilter(taskData, (t) => t.completed === true);
  const activeTasks = taskArrayFilter(
    taskData,
    (t) => t.completed === false && t.pending === false
  );
  const overDueTasks = taskArrayFilter(
    taskData,
    (t) =>
      t.completed === false &&
      t.pending === false &&
      t.dueDate &&
      new Date(t.dueDate) < now
  );

  // Completed per day (for the current week)

  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const completedPerDay = Array.from({ length: 7 }).map((_, i) => {
    const dayDate = addDays(weekStart, i);
    const label = dayDate.toLocaleDateString(undefined, { weekday: "short" }); // "Mon", "Tue", etc.
    const value = taskArrayFilter(
      taskData,
      (t) =>
        t.completed === true &&
        t.completedAt &&
        isSameDay(new Date(t.completedAt), dayDate)
    );
    return { label, value };
  });

  // Top 3 task classes by number of tasks (grouped by taskClass)
  const classCounts = countByKey(taskData, "taskClass");
  const topTasks = getTopNFromCounts(classCounts, 3);

  // First three tasks that will be due next (not completed, not overdue, sorted by dueDate)
  const upComingDeadlines = Array.isArray(taskData)
    ? taskData
        .filter(
          (t) =>
            t.completed === false && t.dueDate && new Date(t.dueDate) >= now
        )
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5)
    : [];

  // Format activities for display
  const formattedActivities =
    Array.isArray(activities) && activities.length > 0
      ? activities.map((act) => {
          let actionText = "";
          switch (act.type) {
            case "added":
              actionText = `add "${act.taskTitle}"`;
              break;
            case "completed":
              actionText = `completed "${act.taskTitle}"`;
              break;
            case "deleted":
              actionText = `deleted "${act.taskTitle || act.taskId}"`;
              break;
            case "updated":
              actionText = `updated "${act.taskTitle}"`;
              break;
            case "restored":
              actionText = `restored "${act.taskTitle}"`;
              break;
            case "subtask_added":
              actionText = `added a new subtask: "${act.subtaskTitle}" to "${act.taskTitle}"`;
              break;
            case "subtask_completed":
              actionText = `completed a subtask: "${act.subtaskTitle}" of "${act.taskTitle}"`;
              break;
            case "subtask_deleted":
              actionText = `deleted a subtask: "${act.subtaskTitle}" of "${act.taskTitle}"`;
              break;
            case "subtask_updated":
              actionText = `updated a subtask: "${act.subtaskTitle}" of "${act.taskTitle}"`;
              break;
            case "subtask_restored":
              actionText = `restored a subtask: "${act.subtaskTitle}" of "${act.taskTitle}"`;
              break;
            case "subtask_trashed":
              actionText = `trashed a subtask: "${act.subtaskTitle}" of "${act.taskTitle}"`;
              break;
            default:
              actionText = act.taskTitle || act.type;
          }
          const date = act.timestamp
            ? new Date(act.timestamp).toLocaleString()
            : "";
          return `${act.user ? act.user + " " : ""}${actionText} (${date})`;
        })
      : ["No recent activity"];

  // Weekly completed (this week and last week)
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const lastWeekStart = startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
  const lastWeekEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });

  const weeklyCompleted = taskArrayFilter(
    taskData,
    (t) =>
      t.completed === true &&
      t.completedAt &&
      isWithinInterval(parseDate(t.completedAt), {
        start: weekStart,
        end: weekEnd,
      })
  );

  const lastWeeklyCompleted = taskArrayFilter(
    taskData,
    (t) =>
      t.completed === true &&
      t.completedAt &&
      isWithinInterval(parseDate(t.completedAt), {
        start: lastWeekStart,
        end: lastWeekEnd,
      })
  );

  const weeklyDiff = weeklyCompleted - lastWeeklyCompleted;

  // Monthly completed (this month and last month)
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));

  const monthlyCompleted = taskArrayFilter(
    taskData,
    (t) =>
      t.completed === true &&
      t.completedAt &&
      isWithinInterval(parseDate(t.completedAt), {
        start: monthStart,
        end: monthEnd,
      })
  );

  const lastMonthlyCompleted = taskArrayFilter(
    taskData,
    (t) =>
      t.completed === true &&
      t.completedAt &&
      isWithinInterval(parseDate(t.completedAt), {
        start: lastMonthStart,
        end: lastMonthEnd,
      })
  );

  const monthlyDiff = monthlyCompleted - lastMonthlyCompleted;

  // Count number of tasks per class (taskClass)
  const taskClassCounts = countByKey(taskData, "taskClass");
  const taskListNum = Object.keys(taskClassCounts).length;
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
  return {
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
    taskClassCounts,
    taskListNum,
    getDayLabel,
    pieData,
    achievements,
    stats,
  };
}
