import { MdEdit } from "react-icons/md";
import { useOperation } from "../../../customHooks/useOperation";
import TaskOperation from "../../../utils/TaskOperation";
import EditTaskModal from "./EditTaskModal";

function EditTaskOperation({ tittle }) {
  const { openEdit, onOpenEdit } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Edit"}
        icon={<MdEdit />}
        open={openEdit}
        onClick={onOpenEdit}
      >
        <EditTaskModal tittle={tittle} />
      </TaskOperation>
    </>
  );
}

export default EditTaskOperation;
