import { useTaskStats } from "./Utils";

function PieChart() {
  const { pieData } = useTaskStats();
  const total = pieData.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  // Calculate SVG paths for each slice
  const slices = pieData.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI;

    const x1 = 50 + 40 * Math.sin(startAngle);
    const y1 = 50 - 40 * Math.cos(startAngle);
    const x2 = 50 + 40 * Math.sin(endAngle);
    const y2 = 50 - 40 * Math.cos(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M 50 50`,
      `L ${x1} ${y1}`,
      `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
      `Z`,
    ].join(" ");

    return (
      <path
        key={d.name}
        d={pathData}
        fill={d.color}
        stroke="#fff"
        strokeWidth="2"
      >
        <title>{`${d.name}: ${d.value}`}</title>
      </path>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={120} height={120} viewBox="0 0 100 100" className="mb-4">
        {slices}
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {pieData.map((d) => (
          <span key={d.name} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: d.color }}
            />
            <span className="text-slate-600 dark:text-emerald-200">
              {d.name}
            </span>
            <span className="font-semibold text-slate-800 dark:text-yellow-200">
              {d.value}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default PieChart;
