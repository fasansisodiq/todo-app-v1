import Label from "../Label";

const taskClasses = [
  "work",
  "planned",
  "assigned",
  "project",
  "personal",
  "house",
  "friend",
  "social",
];

function TaskClass({ defaultValue, value, onChange }) {
  const bgStyle = "hover:bg-emerald-100 dark:hover:bg-[#2a3b2c]";
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
      <span className="w-full self-start">
        <Label htmlFor="task type">task class:</Label>
      </span>
      <select
        name="taskClass"
        id="taskClass"
        required
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className="
          capitalize border-0 dark:border dark:border-emerald-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 dark:focus:ring-yellow-500
          p-1 lg:p-2 text-[0.9rem] sm:text-base md:text-sm lg:text-lg xl:text-lg rounded-2xl
          bg-white/90 dark:bg-[#232b25]/90 text-emerald-700 dark:text-yellow-100
          shadow transition-colors duration-200
        "
      >
        <option
          className="flex justify-center items-center text-emerald-400 dark:text-yellow-400/60"
          value={""}
        >
          --please choose task class--
        </option>
        {taskClasses.map((taskClass) => (
          <option
            key={taskClass}
            className={`${bgStyle} text-emerald-700 dark:text-yellow-400/80`}
            value={taskClass}
          >
            {taskClass}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TaskClass;
