import React from "react";

function ProgressRing({
  percentage = 0,
  size = 80,
  stroke = 8,
  color = "#10b981",
  bgColor = "#e5e7eb",
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="block">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={stroke}
          className="dark:stroke-[#232b25]"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
          className="dark:stroke-emerald-400"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize={size * 0.28}
          className="font-bold fill-emerald-700 dark:fill-yellow-200"
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}

export default ProgressRing;
