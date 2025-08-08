import { FaTrash } from "react-icons/fa";

import { useOperation } from "../../customHooks/operation/useOperation";
import TaskOperation from "../../utils/TaskOperation";
import PermDeleteTaskModal from "./PermDeleteTaskModal";

function PermDeleteTaskOperation({ task, title }) {
  const { openDelete, onOpenDelete } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Delete"}
        open={openDelete}
        onClick={onOpenDelete}
        icon={<FaTrash />}
      >
        <PermDeleteTaskModal title={title} id={task.id} task={task} />
      </TaskOperation>
    </>
  );
}

export default PermDeleteTaskOperation;
