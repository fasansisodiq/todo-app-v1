import { useTasks } from "../../customHooks/tasks/useTasks";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import TaskItem from "../TaskItem";

function ImportantPage() {
  const { tasks } = useTasks();
  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {tasks &&
          tasks.length > 0 &&
          tasks
            .filter((task) => task.priority === "yes")
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default ImportantPage;
