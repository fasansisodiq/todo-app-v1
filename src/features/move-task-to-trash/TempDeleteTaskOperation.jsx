import { PiWarningCircle } from "react-icons/pi";
import TempDeleteTaskModal from "./TempDeleteTaskModal";
import TaskOperation from "../../utils/TaskOperation";
import { useOperation } from "../../customHooks/operation/useOperation";

function TempDeleteTaskOperation({ id, title, task }) {
  const { openTrash, onOpenTrash } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Delete"}
        open={openTrash}
        onClick={onOpenTrash}
        icon={<PiWarningCircle />}
      >
        <TempDeleteTaskModal title={title} id={id} task={task} />
      </TaskOperation>
    </>
  );
}

export default TempDeleteTaskOperation;
