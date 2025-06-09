import { useState } from "react";
import Table from "./Table";
import DisplayHoverMessage from "./DisplayHoverMessage";
import { BsThreeDots } from "react-icons/bs";
import Modal from "./Modal";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import CountdownToFutureDate from "./CountdownTofutureDate";

// Category color map for TaskProperties
const categoryColors = {
  work: "bg-blue-100 text-blue-700",
  personal: "bg-pink-100 text-pink-700",
  house: "bg-yellow-100 text-yellow-700",
  social: "bg-purple-100 text-purple-700",
  project: "bg-green-100 text-green-700",
  important: "bg-red-100 text-red-700",
  planned: "bg-cyan-100 text-cyan-700",
  assigned: "bg-orange-100 text-orange-700",
  completed: "bg-emerald-100 text-emerald-700",
  trash: "bg-gray-100 text-gray-700",
  pending: "bg-amber-100 text-amber-700",
  default: "bg-slate-100 text-slate-700",
};
//Modern TaskProperties with color
function TaskProperties({ label, value }) {
  const colorClass =
    categoryColors[(value || "").toLowerCase()] || categoryColors.default;
  return (
    <div className={`flex flex-col items-start min-w-[80px]`}>
      <span className="text-xs text-slate-400 dark:text-slate-300 dark:opacity-65 capitalize">
        {label}
      </span>
      <span
        className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize ${colorClass}`}
      >
        {value || "-"}
      </span>
    </div>
  );
}
export default TaskProperties;
