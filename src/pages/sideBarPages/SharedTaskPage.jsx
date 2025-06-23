import { useTasks } from "../../customHooks/tasks/useTasks";
import TrashedTaskItem from "../../features/move-task-to-trash/TrashedTaskItem";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";

function SharedTaskPage() {
  const { sharedTasks } = useTasks();
  console.log(sharedTasks);
  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {sharedTasks?.length > 0 &&
          sharedTasks.map((task, idx) => (
            <TrashedTaskItem task={task} key={idx + 1} idx={idx} />
          ))}
      </ul>
    </div>
  );
}

export default SharedTaskPage;
