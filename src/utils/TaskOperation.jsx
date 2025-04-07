function TaskOperation({
  childModal,
  mClassName,
  label,
  icon,
  onClick,
  onClose,
}) {
  const { openDelTask, openMarkTaskComp, openMarkTaskPend } = true;
  return (
    <div
      type="button"
      onClick={onClick}
      className=" w-full hover:w-full hover:bg-slate-200 h-fit   relative cursor-pointer "
      onMouseEnter={onclick}
      onMouseLeave={onClose}
    >
      <div className=" flex justify-between items-center gap-2 py-3 w-full  xl:w-full sm:h-6 md:h-8 lg:h-9 xl:h-10  pl-8  h-fit  xl:pr-4   ">
        <div className="flex justify-center items-center gap-2">
          <span className="text-slate-700 ">{icon}</span>
          <span>{label}</span>
        </div>
        {childModal}
      </div>

      {/* {openViewDesc && (
        <span
          className={` absolute 
             flex justify-center items-center  z-40  ${mClassName}`}
        >
          {childModal}
        </span>
      )} */}
      {openDelTask && (
        <span
          className={` absolute 
             flex justify-center items-center  z-40  ${mClassName}`}
        >
          {childModal}
        </span>
      )}
      {openMarkTaskPend && (
        <span
          className={` absolute 
             flex justify-center items-center  z-40  ${mClassName}`}
        >
          {childModal}
        </span>
      )}
      {openMarkTaskComp && (
        <span
          className={` absolute 
             flex justify-center items-center  z-40  ${mClassName}`}
        >
          {childModal}
        </span>
      )}
    </div>
  );
}

export default TaskOperation;
