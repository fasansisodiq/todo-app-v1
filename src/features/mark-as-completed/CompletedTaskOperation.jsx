import CompletedTaskModal from "./CompletedTaskModal";
import { FaCheckDouble } from "react-icons/fa6";
import TaskOperation from "../../utils/TaskOperation";
import { useOperation } from "../../customHooks/operation/useOperation";

function CompletedTaskOperation({ id, title }) {
  const { openMarkComp, onOpenMarkComp } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Mark as completed"}
        icon={<FaCheckDouble />}
        open={openMarkComp}
        onClick={onOpenMarkComp}
      >
        <CompletedTaskModal tittle={title} id={id} />
      </TaskOperation>
    </>
  );
}

export default CompletedTaskOperation;
