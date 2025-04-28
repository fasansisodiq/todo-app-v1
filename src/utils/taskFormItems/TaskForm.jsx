function TaskForm({ header, onSubmit, children }) {
  return (
    <div className="relative w-60 h-100 sm:w-80 sm:h-105 md:w-100 md:h-150 lg:w-110 lg:h-150 xl:w-150 xl:h-full flex flex-col p-5  gap-2 items-center justify-between xl:justify-center  capitalize text-slate-800    rounded-lg bg-[#c0efe3] shadow-2xl my-4">
      <h1
        className="flex self-center px-auto pl-6 md:pl-15  pb-1 pt-2 xl:pb-10  text-emerald-600  text-[1rem]
      sm:text-xl md:text-2xl   lg:text-3xl xl:text-4xl font-bold"
      >
        {header}
      </h1>
      <form
        onSubmit={onSubmit}
        method="post"
        id="task-form"
        className="flex flex-col items-center gap-3 lg:gap-2  xl:gap-4"
      >
        {children}
      </form>
    </div>
  );
}

export default TaskForm;
