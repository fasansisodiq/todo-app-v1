function FormatFilterPicker({ children, pickerState, handClear }) {
  return (
    <div className="flex items-center mb-2 border border-emerald-100 rounded p-1 sm:p-4 gap-2 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 dark:from-[#232b25] dark:via-[#181f1b] dark:to-[#232b25] shadow-lg text-emerald-800 dark:text-yellow-50">
      {children}
      {pickerState && (
        <button
          className="ml-2 px-2 py-1 bg-red-500 text-white dark:bg-emerald-500 rounded"
          onClick={handClear}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default FormatFilterPicker;
