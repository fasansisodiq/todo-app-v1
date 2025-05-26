import { useTasks } from "../customHooks/tasks/useTasks";
import TaskItem from "../pages/tasks/TaskItem";
import TableHeader from "../ui/taskOverviewUI/TableHeader";

function TaskFetcher({ taskClass }) {
  const { taskData } = useTasks();

  const filteredTasks =
    taskData?.filter(
      (task) => task.taskClass === taskClass && task.completed === false
    ) || [];

  if (filteredTasks.length === 0) {
    return (
      <div className="w-full">
        <TableHeader />
        <div className="text-center text-gray-500 py-4">No tasks found.</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TableHeader />
      <ul>
        {filteredTasks.map((task, idx) => (
          <li key={task.id}>
            <TaskItem task={task} idx={idx} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskFetcher;
