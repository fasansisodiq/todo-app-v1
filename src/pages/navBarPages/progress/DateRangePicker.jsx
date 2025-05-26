import React, { useState, useEffect } from "react";

function DateRangePicker({ value, onChange }) {
  const [start, setStart] = useState(value?.start || "");
  const [end, setEnd] = useState(value?.end || "");

  // Keep local state in sync with parent value
  useEffect(() => {
    if (value?.start !== start) setStart(value?.start || "");
    if (value?.end !== end) setEnd(value?.end || "");
    // eslint-disable-next-line
  }, [value]);

  const handleStartChange = (e) => {
    const newStart = e.target.value;
    setStart(newStart);
    onChange && onChange({ start: newStart, end });
  };

  const handleEndChange = (e) => {
    const newEnd = e.target.value;
    setEnd(newEnd);
    onChange && onChange({ start, end: newEnd });
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2">
      <div className="flex flex-col items-start">
        <label
          htmlFor="start-date"
          className="text-xs text-emerald-700 font-semibold mb-1"
        >
          Start
        </label>
        <input
          id="start-date"
          type="date"
          value={start}
          onChange={handleStartChange}
          className="rounded border border-emerald-200 px-2 py-1 text-sm focus:border-emerald-500 focus:ring-emerald-100 transition"
        />
      </div>
      <span className="text-slate-400 font-bold pt-5">—</span>
      <div className="flex flex-col items-start">
        <label
          htmlFor="end-date"
          className="text-xs text-emerald-700 font-semibold mb-1"
        >
          End
        </label>
        <input
          id="end-date"
          type="date"
          value={end}
          onChange={handleEndChange}
          className="rounded border border-emerald-200 px-2 py-1 text-sm focus:border-emerald-500 focus:ring-emerald-100 transition"
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
