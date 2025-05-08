import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";

function ProfileItemLabel({ label, data, icon, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex justify-start text-lg lg:text-2xl items-center gap-2 py-1 px-3 hover:bg-gray-100 cursor-pointer"
    >
      <span className="flex items-center gap-2">
        <span className="text-gray-500 text-lg lg:text-2xl">{icon}</span>
        <span className="capitalize text-gray-500">
          {label}:
          <span className="text-slate-700 font-semibold pl-2 pr-10 lg:pr-20 normal-case">
            {data}
          </span>
        </span>
      </span>
      <span onClick={onClick}>{isHovered && <FaAngleRight />}</span>
    </div>
  );
}

export default ProfileItemLabel;
