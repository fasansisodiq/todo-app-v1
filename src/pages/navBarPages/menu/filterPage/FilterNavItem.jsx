function FilterNavItem({ label, children, onClick }) {
  return (
    <button
      type="button"
      className="p-0.5 lg:p-1 w-full text-emerald-700 hover:text-white hover:bg-teal-600 active:bg-teal-800 active:text-white transition-colors rounded text-left dark:text-yellow-100 dark:hover:bg-[#65686d] dark:hover:text-white dark:active:bg-yellow-600 dark:active:text-white font-semibold"
      onClick={() => onClick(label)}
    >
      <span className="px-2">{label || children}</span>
    </button>
  );
}

export default FilterNavItem;
