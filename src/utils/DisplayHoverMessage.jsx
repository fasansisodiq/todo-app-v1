function DisplayHoverMessage({ element, message, mClassName = "" }) {
  return (
    <div className="relative group">
      {element}
      <span
        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1 rounded text-center bg-white dark:bg-[#232b25] whitespace-nowrap text-emerald-700 dark:text-yellow-200 shadow text-xs md:text-sm md:shadow-lg border border-emerald-200 dark:border-yellow-400 opacity-0 group-hover:opacity-100 transition pointer-events-none z-50 ${mClassName}`}
      >
        {message}
      </span>
    </div>
  );
}

export default DisplayHoverMessage;
