function TaskForm({ header, onSubmit, children }) {
  return (
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex flex-col p-4 sm:p-6 md:p-8 gap-3 items-center justify-between xl:justify-center capitalize text-slate-800 dark:text-yellow-200 rounded-2xl bg-[#c0efe3] dark:bg-[#232b25] shadow-2xl my-6">
      <h1 className="w-full text-center pb-2 pt-2 xl:pb-8 text-emerald-600 dark:text-yellow-300 text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold truncate">
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
