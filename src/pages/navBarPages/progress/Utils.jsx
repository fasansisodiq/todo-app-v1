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
} from "date-fns";

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
  const completedPerDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
    (day) => ({
      label: day,
      value: taskArrayFilter(
        taskData,
        (t) =>
          t.completed === true &&
          t.completedAt &&
          getDayLabel(t.completedAt) === day
      ),
    })
  );

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
        .slice(0, 3)
    : [];

  // Format activities for display
  const formattedActivities =
    Array.isArray(activities) && activities.length > 0
      ? activities.map((act) => {
          let actionText = "";
          switch (act.type) {
            case "created":
              actionText = `Created "${act.taskTitle}"`;
              break;
            case "completed":
              actionText = `Completed "${act.taskTitle}"`;
              break;
            case "deleted":
              actionText = `Deleted "${act.taskTitle || act.taskId}"`;
              break;
            case "updated":
              actionText = `Updated "${act.taskTitle}"`;
              break;
            case "restored":
              actionText = `Restored "${act.taskTitle}"`;
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
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
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
  };
}
