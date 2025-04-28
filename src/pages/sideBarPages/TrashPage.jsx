import { useTasks } from "../../customHooks/tasks/useTasks";
import TrashedTaskItem from "../../features/move-task-to-trash/TrashedTaskItem";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";

function TrashPage() {
  const { trashData } = useTasks();

  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {trashData?.length > 0 &&
          trashData.map((task, idx) => (
            <TrashedTaskItem task={task} key={idx + 1} idx={idx} />
          ))}
      </ul>
    </div>
  );
}

export default TrashPage;
