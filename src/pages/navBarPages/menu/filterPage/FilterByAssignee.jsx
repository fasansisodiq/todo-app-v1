import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TaskItem from "../../../tasks/TaskItem";

function FilterByAssignee({ opt, name }) {
  const { taskData, getDateObj } = useTasks();

  if (opt !== name) return null;

  // Sort all tasks by assignee name alphabetically, then filter by selected assignee
  const filteredTasks =
    taskData
      ?.slice() // create a shallow copy to avoid mutating original
      .sort((a, b) => {
        if (a.assignee && b.assignee) {
          return a.assignee.localeCompare(b.assignee);
        }
        return 0;
      })
      .filter((task) => task.assignee === name)
      .sort((a, b) => getDateObj(a.dueDate) - getDateObj(b.dueDate)) || [];

  if (filteredTasks.length === 0) return null;

  return (
    <ul>
      {filteredTasks.map((task, idx) => (
        <li key={task.id}>
          <TaskItem task={task} idx={idx} />
        </li>
      ))}
    </ul>
  );
}

export default FilterByAssignee;
