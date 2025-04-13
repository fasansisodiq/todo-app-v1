import { MdPending } from "react-icons/md";
import PendingTaskModal from "./PendingTaskModal";
import TaskOperation from "../../../utils/TaskOperation";
import { useOperation } from "../../../customHooks/useOperation";

function PendingTaskOperation({ tittle }) {
  const { openMarkPend, onOpenMarkPend } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Pending"}
        icon={<MdPending />}
        open={openMarkPend}
        onClick={onOpenMarkPend}
      >
        <PendingTaskModal tittle={tittle} />
      </TaskOperation>
    </>
  );
}

export default PendingTaskOperation;
