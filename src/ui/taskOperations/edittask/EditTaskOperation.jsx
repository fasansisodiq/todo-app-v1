import { MdEdit } from "react-icons/md";
import TaskOperation from "../../../utils/TaskOperation";
import EditTaskModal from "./EditTaskModal";
import { useOperation } from "../../../customHooks/operation/useOperation";

function EditTaskOperation({ tittle, id, task }) {
  const { openEdit, onOpenEdit } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Edit"}
        icon={<MdEdit />}
        open={openEdit}
        onClick={onOpenEdit}
      >
        <EditTaskModal tittle={tittle} id={id} task={task} />
      </TaskOperation>
    </>
  );
}

export default EditTaskOperation;
