import { MdDescription } from "react-icons/md";
import TaskOperation from "../../../utils/TaskOperation";
import TaskDescriptionModal from "./TaskDescriptionModal";
import { useOperation } from "../../../customHooks/operation/useOperation";

function TaskDescriptionOperation({ description, tittle }) {
  const { openDesc, onOpenDesc } = useOperation();
  return (
    <>
      <TaskOperation
        label={" Task Description"}
        icon={<MdDescription />}
        open={openDesc}
        onClick={onOpenDesc}
      >
        <TaskDescriptionModal description={description} tittle={tittle} />
      </TaskOperation>
    </>
  );
}
export default TaskDescriptionOperation;
