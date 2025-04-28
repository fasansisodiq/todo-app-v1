import { useTasks } from "../../customHooks/tasks/useTasks";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import TaskItem from "../tasks/TaskItem";

function ImportantPage() {
  const { taskData } = useTasks();
  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {taskData?.length > 0 &&
          taskData
            .filter(
              (task) => task.completed === false && task.priority === "on"
            )
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default ImportantPage;
