import { PiWarningCircle } from "react-icons/pi";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskOperation from "../../../utils/TaskOperation";
import { useOperation } from "../../../customHooks/useOperation";

function DeleteTaskOperation({ id, tittle }) {
  const { openDelete, onOpenDelete } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Delete"}
        open={openDelete}
        onClick={onOpenDelete}
        icon={<PiWarningCircle />}
      >
        <DeleteTaskModal tittle={tittle} id={id} />
      </TaskOperation>
    </>
  );
}

export default DeleteTaskOperation;
