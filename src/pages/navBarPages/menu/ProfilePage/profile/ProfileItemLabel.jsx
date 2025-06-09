import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

function ProfileItemLabel({ label, data, icon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex justify-start items-center gap-2 py-1 px-3 rounded transition-colors ${
        onClick ? "hover:bg-gray-100 cursor-pointer" : ""
      } text-base`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={onClick ? label : undefined}
    >
      <span className="flex items-center gap-2">
        <span className="text-gray-500 dark:text-yellow-400 text-base">
          {icon}
        </span>
        <span className="capitalize text-gray-500 dark:text-yellow-300 text-base">
          {label}:
        </span>
        <span className="text-slate-700  dark:text-yellow-50 font-semibold pl-2 pr-10 lg:pr-20 normal-case text-base">
          {data}
        </span>
      </span>
      {onClick && (
        <span className="ml-auto">{isHovered && <FaAngleRight />}</span>
      )}
    </div>
  );
}

export default ProfileItemLabel;
