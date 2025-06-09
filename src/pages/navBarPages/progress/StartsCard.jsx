function StartsCard({
  icon,
  label,
  value,
  color = "text-emerald-600 dark:text-yellow-300",
  bg = "bg-white dark:bg-[#2f3532]",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl shadow p-5 gap-2 transition hover:shadow-lg ${bg}`}
    >
      <span className={`text-3xl ${color}`}>{icon}</span>
      <span className="text-2xl font-bold text-slate-700 dark:text-yellow-100">
        {value}
      </span>
      <span className="text-sm text-slate-500 dark:text-emerald-200">
        {label}
      </span>
    </div>
  );
}

export default StartsCard;
