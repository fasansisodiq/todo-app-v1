import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function ProfileHider({ children, header }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full mb-2 bg-white/80 dark:bg-[#2f3532] rounded-lg shadow p-4">
      <button
        className="flex items-center justify-between w-full capitalize font-semibold text-emerald-700 dark:text-yellow-600 mb-2 focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`profile-hider-content-${header}`}
        type="button"
      >
        <span>{header}</span>
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </button>
      {isOpen && <div id={`profile-hider-content-${header}`}>{children}</div>}
    </div>
  );
}

export default ProfileHider;
