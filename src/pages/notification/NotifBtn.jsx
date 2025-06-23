function NotifBtn({ onClick, label }) {
  return (
    <button
      className="ml-4 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-900 dark:text-yellow-200 transition-colors duration-200"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default NotifBtn;
