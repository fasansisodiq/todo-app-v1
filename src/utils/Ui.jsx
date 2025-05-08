function Ui({ icon, label, taskNum }) {
  return (
    <div
      className={` flex justify-between items-center px-1 lg:pr-3 text-sm lg:text-2xl 
     `}
    >
      <span className="flex justify-between items-center gap-1 text-[0.8rem] lg:gap-4 lg:text-lg ">
        <span>{icon}</span>
        <span className=" capitalize font-semibold text-[0.8rem] lg:text-2xl opacity-75">
          {label}
        </span>
      </span>
      <div className=" flex self-end  text-[0.8rem] lg:text-xl font-semi-bold opacity-75">
        {taskNum}
      </div>
    </div>
  );
}

export default Ui;
