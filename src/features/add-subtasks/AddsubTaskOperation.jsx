import { TbSubtask } from "react-icons/tb";

import { useOperation } from "../../customHooks/operation/useOperation";
import TaskOperation from "../../utils/TaskOperation";
import AddSubTaskModal from "./AddSubTaskModal";

function AddsubTaskOperation({ task }) {
  const { openSubTask, onOpenSubTask } = useOperation();
  return (
    <>
      <TaskOperation
        label={" Add SubTask"}
        icon={<TbSubtask />}
        open={openSubTask}
        onClick={onOpenSubTask}
      >
        <AddSubTaskModal task={task} />
      </TaskOperation>
    </>
  );
}

export default AddsubTaskOperation;
