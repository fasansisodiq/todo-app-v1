import { useTasks } from "../../customHooks/tasks/useTasks";
import TrashedSubtaskItem from "../../features/move-subtask-to-trash/TrashSubtaskItem";
import TrashedTaskItem from "../../features/move-task-to-trash/TrashedTaskItem";

function TrashPage() {
  const { trashData, subtasksMap } = useTasks();
  // console.log("subtaskTrash", subtasksMap?.subtaskTrash);
  return (
    <div className="w-full">
      <ul>
        {trashData?.length > 0 &&
          trashData.map((task, idx) => (
            <TrashedTaskItem task={task} key={idx + 1} idx={idx} />
          ))}
        {subtasksMap?.subtaskTrash?.length > 0 &&
          subtasksMap.subtaskTrash.map((subtask, idx) => (
            <TrashedSubtaskItem subtask={subtask} key={idx + 1} idx={idx} />
          ))}
      </ul>
    </div>
  );
}

export default TrashPage;
