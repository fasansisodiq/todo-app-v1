function TaskPriority({ checked, defaultChecked, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-3">
        <input
          className="w-5 h-5 accent-emerald-600 dark:accent-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 dark:focus:ring-yellow-500 rounded-lg border-0 dark:border dark:border-emerald-700 focus:outline-none"
          type="checkbox"
          name="priority"
          id="priority"
          defaultChecked={defaultChecked}
          checked={checked}
          onChange={onChange}
        />
        <span className="text-slate-600 dark:text-slate-200 text-sm md:text-base">
          Mark as priority
        </span>
      </div>
    </div>
  );
}

export default TaskPriority;
