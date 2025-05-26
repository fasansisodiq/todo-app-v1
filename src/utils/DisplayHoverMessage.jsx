import { useState } from "react";

function DisplayHoverMessage({ mClassName = "", element, message }) {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div
      className="w-fit h-fit p-1 relative cursor-pointer"
      onMouseEnter={() => setShowMessage(true)}
      onMouseLeave={() => setShowMessage(false)}
    >
      {element}
      {showMessage && (
        <span
          className={`
            absolute left-1/2 -translate-x-1/2 top-full mt-2
            flex justify-center items-center px-4 py-2
            rounded-xl bg-white text-slate-700 text-xs md:text-sm shadow-lg border border-emerald-200
            z-50 whitespace-nowrap
            ${mClassName}
          `}
        >
          <p className="capitalize">{message}</p>
        </span>
      )}
    </div>
  );
}

export default DisplayHoverMessage;
