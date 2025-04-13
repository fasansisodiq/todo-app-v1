function TaskOperation({ children, mClassName, label, icon, open, onClick }) {
  return (
    <div
      type="button"
      className={`w-full hover:w-full  h-fit   relative cursor-pointer ${
        open ? "" : "hover:bg-slate-200"
      } ${mClassName}`}
    >
      <div
        // onClick={(e) => e.stopPropagation()}
        className=" flex justify-between items-center   py-3 w-full  xl:w-full sm:h-6 md:h-8 lg:h-9 xl:h-10  pl-8  h-fit  xl:pr-4   "
      >
        <div
          onClick={onClick}
          className={`flex  
           items-center gap-2`}
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
    </div>
  );
}

export default TaskOperation;
