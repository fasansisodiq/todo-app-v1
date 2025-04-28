import { FaRotateLeft } from "react-icons/fa6";

import { useOperation } from "../../customHooks/operation/useOperation";
import TaskOperation from "../../utils/TaskOperation";

import RestoreTaskModal from "./RestoreTaskModal";

function Restore({ task }) {
  const { openRestore, onOpenRestore } = useOperation();
  return (
    <>
      <TaskOperation
        label={"Restore"}
        open={openRestore}
        onClick={onOpenRestore}
        icon={<FaRotateLeft />}
      >
        <RestoreTaskModal task={task} />
      </TaskOperation>
    </>
  );
}

export default Restore;
