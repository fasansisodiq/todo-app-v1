import { MdDescription } from "react-icons/md";
import TaskOperation from "../../../utils/TaskOperation";
import TaskDescriptionModal from "./TaskDescriptionModal";
import { useOperation } from "../../../customHooks/operation/useOperation";

function TaskDescriptionOperation({ description, title }) {
  const { openDesc, onOpenDesc } = useOperation();
  return (
    <>
      <TaskOperation
        label={" Task Description"}
        icon={<MdDescription />}
        open={openDesc}
        onClick={onOpenDesc}
      >
        <TaskDescriptionModal description={description} title={title} />
      </TaskOperation>
    </>
  );
}
export default TaskDescriptionOperation;
