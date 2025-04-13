import { useTasks } from "../customHooks/tasks/useTasks";
import TaskItem from "../pages/TaskItem";
import TaskOverviewHeader from "../ui/taskOverviewUI/TaskOverviewHeader";

function TaskFetcher({ taskClass }) {
  const { tasks } = useTasks();
  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {tasks &&
          tasks.length > 0 &&
          tasks
            .filter(
              (task) => task.taskClass === taskClass && task.completed === "no"
            )
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default TaskFetcher;
