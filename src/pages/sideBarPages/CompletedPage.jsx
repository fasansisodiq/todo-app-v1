import { useTasks } from "../../customHooks/tasks/useTasks";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import TaskItem from "../tasks/TaskItem";

function CompletedPage() {
  const { taskData } = useTasks();

  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {taskData?.length > 0 &&
          taskData
            .filter((task) => task.completed === true)
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default CompletedPage;
