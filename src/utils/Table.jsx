function Table({ bg, children, className, height, type }) {
  return (
    <div
      className={`
        w-full flex items-stretch lg:gap-4 xl:gap-4 justify-between text-center capitalize
        text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]
        ${bg}
        ${
          type === "header"
            ? "bg-emerald-100 dark:bg-[#232b25] text-emerald-700 dark:text-yellow-200 font-bold"
            : "border-1 border-slate-200 dark:border-emerald-900"
        }
        border-t-0 border-x-0
        ${className} ${height}
      `}
    >
      {children}
    </div>
  );
}

export default Table;
