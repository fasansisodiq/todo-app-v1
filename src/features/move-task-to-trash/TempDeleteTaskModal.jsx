import { PiWarningCircle } from "react-icons/pi";
import AlertingModal from "../../utils/AlertingModal";
import CustomButton from "../../utils/CustomButton";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useOperation } from "../../customHooks/operation/useOperation";

function TempDeleteTaskModal({ title, id, task }) {
  const { openTrash, onCloseTrash, setOpenModal } = useOperation();
  const { trashTask } = useTasks();

  async function handleTrashTask() {
    await trashTask(id, task);

    onCloseTrash();
    setOpenModal(null);
  }
  return (
    <AlertingModal
      title={title}
      isOpen={openTrash}
      onClick={onCloseTrash}
      iconColor={"text-rose-400 "}
      // animation={" animate-ping"}
      modalMessage={" Are you sure you want to delete this task?"}
      icon={<PiWarningCircle />}
    >
      <CustomButton
        onClick={onCloseTrash}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />
      <CustomButton
        onClick={handleTrashTask}
        size={"sm"}
        type={"others"}
        bg={"bg-rose-600"}
        label={"delete"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default TempDeleteTaskModal;
