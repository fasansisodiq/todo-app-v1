function TaskOperation({ children, mClassName, label, icon, open, onClick }) {
  return (
    <div
      // onClick={onClick}
      type="button"
      className={`w-full hover:w-full  h-fit flex justify-between items-center   py-3    sm:h-6 md:h-8 lg:h-9 xl:h-10  pl-8   xl:pr-4      relative cursor-pointer ${
        open ? "" : "hover:bg-slate-200"
      } ${mClassName}`}
    >
      <div
        onClick={onClick}
        className={`flex  
           items-center `}
      >
        <span className="flex gap-2 lg:gap-4">
          <span className="text-slate-700 sm:text-xl md:text-2xl lg:text-3xl ">
            {icon}
          </span>
          <span className="capitalize">{label}</span>
        </span>
      </div>
      {open && children}
    </div>
  );
}

export default TaskOperation;
