import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TaskItem from "../../../tasks/TaskItem";

function FilterByUpdatedAt({ taskData, days = 7 }) {
  const { getDateObj } = useTasks;
  const now = new Date();
  const daysAgo = new Date(now);
  daysAgo.setDate(now.getDate() - days);

  const filteredTasks = taskData
    ?.filter(
      (task) =>
        task.updatedAt &&
        new Date(task.updatedAt) >= daysAgo &&
        new Date(task.updatedAt) <= now
    )
    .sort((a, b) => getDateObj(a.dueDate) - getDateObj(b.dueDate));

  return (
    <div>
      {filteredTasks && filteredTasks.length > 0 ? (
        filteredTasks.map((task, idx) => (
          <TaskItem task={task} key={task.id} idx={idx} />
        ))
      ) : (
        <div className="text-gray-500 w-full text-center">
          No recently updated tasks found.
        </div>
      )}
    </div>
  );
}

export default FilterByUpdatedAt;
