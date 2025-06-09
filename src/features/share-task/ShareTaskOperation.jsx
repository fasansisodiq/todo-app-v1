import ShareTaskModal from "./ShareTaskModal";
import { FaShareAlt } from "react-icons/fa";
import { useOperation } from "../../customHooks/operation/useOperation";
import TaskOperation from "../../utils/TaskOperation";

function ShareTaskOperation({ title, id, task }) {
  const { openShare, onOpenShare } = useOperation();
  return (
    <>
      <TaskOperation
        label={"share"}
        icon={<FaShareAlt />}
        open={openShare}
        onClick={onOpenShare}
      >
        <ShareTaskModal title={title} id={id} task={task} />
      </TaskOperation>
    </>
  );
}

export default ShareTaskOperation;
