// import { useTasks } from "../../customHooks/tasks/useTasks";
import { FaRotateLeft } from "react-icons/fa6";
import { useOperation } from "../../customHooks/operation/useOperation";
import AlertingModal from "../../utils/AlertingModal";
import CustomButton from "../../utils/CustomButton";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useNavigate } from "react-router";

function RestoreTaskModal({ task }) {
  const navigate = useNavigate();
  const { openRestore, onCloseRestore, setOpenModal } = useOperation();
  const { restoreTrashTask } = useTasks();

  async function handleRestoreTrashTask() {
    await restoreTrashTask(task.id, task);

    onCloseRestore();
    setOpenModal(null);
    navigate(`/layout/${task.taskClass}`);
  }
  return (
    <AlertingModal
      title={task.title}
      isOpen={openRestore}
      onClick={onCloseRestore}
      iconColor={"text-green-400 "}
      // animation={" animate-ping"}
      modalMessage={" You want to restore this task?"}
      icon={<FaRotateLeft />}
    >
      <CustomButton
        onClick={onCloseRestore}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />
      <CustomButton
        onClick={handleRestoreTrashTask}
        size={"sm"}
        type={"others"}
        bg={"bg-green-600"}
        label={"restore"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default RestoreTaskModal;
