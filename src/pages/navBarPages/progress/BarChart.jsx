import { useTaskStats } from "./Utils";

function BarChart({ barColor = "#10b981", bgColor = "#e5e7eb" }) {
  // Use completedPerDay from your stats hook
  const { completedPerDay } = useTaskStats();

  // If completedPerDay is an array of { label, value } and value is an array of tasks, use .length
  const chartData = completedPerDay.map((d) => ({
    label: d.label,
    value: Array.isArray(d.value) ? d.value.length : d.value,
  }));

  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <div className="w-full flex items-end gap-3 h-40 px-2">
      {chartData.map((d) => (
        <div key={d.label} className="flex flex-col items-center flex-1">
          <div
            className="w-6 md:w-8 rounded-t-lg transition-all"
            style={{
              height: `${(d.value / maxValue) * 100}%`,
              background: barColor,
              minHeight: "0.5rem",
              boxShadow: "0 2px 8px 0 rgba(16,185,129,0.10)",
            }}
            title={`${d.value} tasks`}
          />
          <span className="mt-2 text-xs md:text-sm text-slate-500 dark:text-yellow-200">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
