function TaskForm({ header, onSubmit, children }) {
  return (
<<<<<<< HEAD
    <div className="relative w-80 h-full sm:w-90  md:w-110  xl:w-150 flex flex-col p-5 pb-10  gap-2 items-center justify-between xl:justify-center  capitalize text-slate-800 dark:text-yellow-200  border border-emerald-100 dark:border-emerald-900  bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]  rounded-lg shadow-2xl my-4">
      <h1
        className="flex self-center px-auto pl-6 md:pl-15  pb-1 pt-2 xl:pb-10  text-emerald-600 dark:text-yellow-300   text-[1rem]
      sm:text-xl md:text-2xl   lg:text-3xl xl:text-4xl font-bold"
      >
=======
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto flex flex-col p-4 sm:p-6 md:p-8 gap-3 items-center justify-between xl:justify-center capitalize text-slate-800 dark:text-yellow-200 rounded-2xl bg-[#c0efe3] dark:bg-[#232b25] shadow-2xl my-6">
      <h1 className="w-full text-center pb-2 pt-2 xl:pb-8 text-emerald-600 dark:text-yellow-300 text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold truncate">
>>>>>>> 62f9fd032727d3c2b77cf99896cea68d9107e1ca
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
