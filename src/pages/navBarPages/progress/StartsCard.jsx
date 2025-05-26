import React from "react";

function StartsCard({
  icon,
  label,
  value,
  color = "text-emerald-600",
  bg = "bg-white",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl shadow p-5 gap-2 transition hover:shadow-lg ${bg}`}
    >
      <span className={`text-3xl ${color}`}>{icon}</span>
      <span className="text-2xl font-bold text-slate-700">{value}</span>
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );
}

export default StartsCard;
