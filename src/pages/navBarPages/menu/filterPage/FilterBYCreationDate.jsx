import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TaskItem from "../../../tasks/TaskItem";

function FilterByCreationDate({ taskData, creationDate }) {
  const { getDateObj } = useTasks;
  // Filter tasks by creation date if a date is selected
  const filteredTasks = creationDate
    ? taskData
        ?.filter(
          (task) =>
            task.createdAt &&
            new Date(task.createdAt).toLocaleDateString() ===
              new Date(creationDate).toLocaleDateString()
        )
        .sort((a, b) => getDateObj(a.dueDate) - getDateObj(b.dueDate))
    : taskData;

  return (
    <div>
      <div className="mt-4">
        {filteredTasks?.length > 0 ? (
          filteredTasks.map((task, idx) => (
            <TaskItem task={task} key={task.id} idx={idx} />
          ))
        ) : (
          <div className="text-gray-500 text-center w-full">
            No tasks found for this date.
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterByCreationDate;
