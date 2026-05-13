import React, { useState, useEffect } from "react";

function DateRangePicker() {
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [start, setStart] = useState(dateRange?.start || "");
  const [end, setEnd] = useState(dateRange?.end || "");

  // Keep local state in sync with parent dateRange
  useEffect(() => {
    if (dateRange?.start !== start) setStart(dateRange?.start || "");
    if (dateRange?.end !== end) setEnd(dateRange?.end || "");
    // eslint-disable-next-line
  }, [dateRange]);

  const handleStartChange = (e) => {
    const newStart = e.target.dateRange;
    setStart(newStart);
    setDateRange && setDateRange({ start: newStart, end });
  };

  const handleEndChange = (e) => {
    const newEnd = e.target.dateRange;
    setEnd(newEnd);
    setDateRange && setDateRange({ start, end: newEnd });
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-[#2f3532] rounded-lg shadow px-3 py-2">
      <div className="flex flex-col items-start">
        <label
          htmlFor="start-date"
          className="text-xs text-emerald-700 dark:text-emerald-200 font-semibold mb-1"
        >
          Start
        </label>
        <input
          id="start-date"
          type="date"
          dateRange={start}
          onChange={handleStartChange}
          className="rounded border border-emerald-200 dark:border-yellow-200 px-2 py-1 text-sm dark:[color-scheme:dark] focus:border-emerald-500 dark:focus:border-yellow-500 focus:ring-emerald-100 dark:focus:ring-yellow-100 transition"
        />
      </div>
      <span className="text-slate-400 dark:text-emerald-300 font-bold pt-5">
        —
      </span>
      <div className="flex flex-col items-start">
        <label
          htmlFor="end-date"
          className="text-xs text-emerald-700 dark:text-emerald-200  font-semibold mb-1"
        >
          End
        </label>
        <input
          id="end-date"
          type="date"
          dateRange={end}
          onChange={handleEndChange}
          className="rounded border border-emerald-200 dark:border-yellow-200 px-2 py-1 text-sm dark:[color-scheme:dark] focus:border-emerald-500 dark:focus:border-yellow-500 focus:ring-emerald-100 dark:focus:ring-yellow-100 transition"
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
