import { MdPending } from "react-icons/md";
import PendingTaskModal from "./PendingTaskModal";
import TaskOperation from "../../utils/TaskOperation";
import { useOperation } from "../../customHooks/operation/useOperation";

function PendingTaskOperation({ tittle, task }) {
  const { openMarkPend, onOpenMarkPend } = useOperation();
  return (
    <>
      <TaskOperation
        label={"mark as Pending"}
        icon={<MdPending />}
        open={openMarkPend}
        onClick={onOpenMarkPend}
      >
        <PendingTaskModal tittle={tittle} task={task} />
      </TaskOperation>
    </>
  );
}

export default PendingTaskOperation;
