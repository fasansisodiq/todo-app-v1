function TaskPriority({ value, onChange }) {
  return (
    <div className="w-full shadow-sm rounded-lg p-3 bg-emerald-50 dark:bg-[#23272f] border border-emerald-200 dark:border-emerald-700">
      <label
        htmlFor="priority"
        className="block text-sm font-medium text-emerald-700 dark:text-yellow-200 mb-1"
      >
        Priority
      </label>
      <select
        id="priority"
        name="priority"
        value={value}
        onChange={onChange}
        className=" rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#181f1b] text-slate-800 dark:text-emerald-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 dark:focus:ring-yellow-500"
        required
      >
        <option value="please select">please select</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}

export default TaskPriority;
