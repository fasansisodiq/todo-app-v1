import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

function ProfileHider({ children, header }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col w-full mb-2 bg-white/80 rounded-lg shadow p-4">
      <button
        className="flex items-center justify-between w-full capitalize font-semibold text-emerald-700 mb-2 focus:outline-none"
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
