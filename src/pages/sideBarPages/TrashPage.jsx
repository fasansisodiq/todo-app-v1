import { useTasks } from "../../customHooks/tasks/useTasks";
import TrashedSubtaskItem from "../../features/move-subtask-to-trash/TrashSubtaskItem";
import ReusableTrashTaskItem from "../../utils/ReusableTrashTaskItem";

function TrashPage() {
  const { trashData, subtasksMap } = useTasks();
  return (
    <div className="w-full">
      <ul>
        {trashData?.length > 0 &&
          trashData.map((task, idx) => (
            <ReusableTrashTaskItem task={task} key={idx + 1} />
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
