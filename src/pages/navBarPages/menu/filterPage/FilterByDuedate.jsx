import { formattedDate } from "../../../../customHooks/tasks/DateFormerter";
import { useTasks } from "../../../../customHooks/tasks/useTasks";
import ReusableTaskItem from "../../../../utils/ReusableTaskItem";

const FILTER_PROPS = [
  {
    name: [
      "1 week",
      "2-3 weeks",
      "1 month",
      "2-3 months",
      "3-6 months",
      "6-9 months",
      "year",
      "overdue",
    ],
  },
  { daysLimit: [7, 21, 30, 90, 180, 270, 365, 0] },
  { from: [0, 7, 21, 30, 90, 180, 270, 0] },
];

function FilterByDuedate({ opt }) {
  const { taskData, getDateObj } = useTasks();
  if (
    !FILTER_PROPS ||
    !Array.isArray(FILTER_PROPS) ||
    FILTER_PROPS.length === 0
  )
    return null;

  const names = FILTER_PROPS.find((p) => p.name)?.name || [];
  const daysLimits = FILTER_PROPS.find((p) => p.daysLimit)?.daysLimit || [];
  const froms = FILTER_PROPS.find((p) => p.from)?.from || [];
  const idx = names.findIndex((n) => n === opt);

  const todayDate = getDateObj(formattedDate(new Date()));

  // Overdue: dueDate < today
  if (opt === "overdue") {
    return (
      <div>
        {taskData
          ?.filter((task) => {
            const dueDateObj = getDateObj(task.dueDate);
            return dueDateObj < todayDate;
          })
          .sort((a, b) => getDateObj(a.dueDate) - getDateObj(b.dueDate))
          .map((task, tIdx) => (
            <ReusableTaskItem task={task} key={task.id} idx={tIdx} />
          ))}
      </div>
    );
  }

  // Year: dueDate >= today && dueDate >= one year from today
  if (opt === "year") {
    const oneYearFromToday = new Date(todayDate);
    oneYearFromToday.setFullYear(todayDate.getFullYear() + 1);

    return (
      <div>
        {taskData
          ?.filter((task) => {
            const dueDateObj = getDateObj(task.dueDate);
            return dueDateObj >= todayDate && dueDateObj >= oneYearFromToday;
          })
          .map((task, tIdx) => (
            <TaskItem task={task} key={task.id} idx={tIdx} />
          ))}
      </div>
    );
  }

  // Other options: use isDateWithinFutureLimit
  if (idx === -1) return null;
  const filter = {
    name: names[idx],
    daysLimit: daysLimits[idx],
    from: froms[idx],
  };

  function isDateWithinFutureLimit(dateToCheck, from, daysLimit) {
    const limitDate = getDateObj(
      formattedDate(new Date(Date.now() + daysLimit * 24 * 60 * 60 * 1000))
    );
    const fromDate = getDateObj(
      formattedDate(new Date(Date.now() + (from || 0) * 24 * 60 * 60 * 1000))
    );
    const checkDate = getDateObj(dateToCheck);

    return (
      checkDate >= todayDate && checkDate > fromDate && checkDate <= limitDate
    );
  }

  return (
    <div>
      {taskData
        ?.filter((task) =>
          isDateWithinFutureLimit(task.dueDate, filter.from, filter.daysLimit)
        )
        .map((task, tIdx) => (
          <TaskItem task={task} key={task.id} idx={tIdx} />
        ))}
    </div>
  );
}

export default FilterByDuedate;
