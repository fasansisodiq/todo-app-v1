function Ui({ icon, label, taskNum, onClick }) {
  return (
    <>
      {
        <div
          onClick={onClick}
          className={`
      w-full flex-1 flex justify-between items-center px-1.5 py-1 sm:px-3 sm:py-2 sm:my-1 rounded-xl cursor-pointer
      bg-gradient-to-r from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25]
      hover:from-emerald-100 hover:to-emerald-200 dark:hover:from-[#232b25] dark:hover:to-[#232b25] hover:shadow-lg
      transition-all duration-200 border border-emerald-100 dark:border-emerald-800 group
    `}
          style={{
            boxShadow: "0 2px 8px 0 rgba(16,185,129,0.06)",
          }}
        >
          <span className="flex items-center gap-3">
            <span className="text-emerald-500 dark:text-yellow-300 text-sm sm:text-xl lg:text-2xl group-hover:scale-110 transition-transform duration-200">
              {icon}
            </span>
            <span className="capitalize font-semibold text-xs sm:text-base lg:text-lg text-emerald-800 dark:text-yellow-100 group-hover:text-emerald-600 dark:group-hover:text-yellow-300 transition-colors duration-200">
              {label}
            </span>
          </span>
          <div
            className={`flex items-center justify-center ${
              taskNum &&
              "min-w-[1rem] h-3.5 sm:min-w-[2rem] sm:h-7 rounded-full"
            } bg-emerald-100 dark:bg-[#232b25] text-emerald-700 dark:text-yellow-200 font-bold text-xs sm:text-sm shadow group-hover:bg-emerald-200 dark:group-hover:bg-[#181f1b] transition-colors duration-200"`}
          >
            {taskNum}
          </div>
        </div>
      }
    </>
  );
}

export default Ui;
