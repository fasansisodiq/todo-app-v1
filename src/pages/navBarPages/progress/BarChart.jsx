function BarChart({ chartData, barColor = "#10b981", bgColor = "#e5e7eb" }) {
  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <div className="w-full flex items-end gap-3 h-40 px-2">
      {chartData.map((d, i) => (
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
          <span className="mt-2 text-xs md:text-sm text-slate-500">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default BarChart;
