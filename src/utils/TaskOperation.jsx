function TaskOperation({
  children,
  mClassName = "",
  label,
  icon,
  open,
  onClick,
}) {
  return (
    <div
      className={`
        w-full h-fit flex justify-between items-center
        py-3 px-4
        rounded-xl
        transition-all duration-200
        cursor-pointer
        ${
          open
            ? "bg-emerald-50 dark:bg-[#777d83] shadow"
            : "hover:bg-emerald-100 dark:hover:bg-[#7b7d82]"
        }
        ${mClassName}
      `}
    >
      <div
        onClick={onClick}
        className="flex items-center gap-3 select-none"
        tabIndex={0}
        role="button"
        aria-label={label}
      >
        <span className="text-emerald-600 dark:text-yellow-400/75 text-lg md:text-xl lg:text-2xl flex items-center">
          {icon}
        </span>
        <span className="capitalize font-semibold text-slate-800 dark:text-yellow-100 text-base md:text-lg">
          {label}
        </span>
      </div>
      {open && <div className="ml-4 flex-1">{children}</div>}
    </div>
  );
}

export default TaskOperation;
