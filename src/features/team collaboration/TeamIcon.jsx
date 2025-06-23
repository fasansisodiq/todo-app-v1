function TeamIcon() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5.13a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    </span>
  );
}

export default TeamIcon;
