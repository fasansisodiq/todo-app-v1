function TaskForm({ header, onSubmit, children }) {
  return (
    <div className="relative w-80 h-full sm:w-90  md:w-110  xl:w-150 flex flex-col p-5 pb-10  gap-2 items-center justify-between xl:justify-center  capitalize text-slate-800 dark:text-yellow-200  border border-emerald-100 dark:border-emerald-900  bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]  rounded-lg shadow-2xl my-4">
      <h1
        className="flex self-center px-auto pl-6 md:pl-15  pb-1 pt-2 xl:pb-10  text-emerald-600 dark:text-yellow-300   text-[1rem]
      sm:text-xl md:text-2xl   lg:text-3xl xl:text-4xl font-bold"
      >
        {header}
      </h1>
      <form
        onSubmit={onSubmit}
        method="post"
        id="task-form"
        className="w-full flex flex-col items-center gap-3 md:gap-4 xl:gap-6"
      >
        {children}
      </form>
    </div>
  );
}

export default TaskForm;
