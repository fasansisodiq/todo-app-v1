import { PiWarningCircle } from "react-icons/pi";
import AlertingModal from "../../../utils/AlertingModal";
import CustomButton from "../../../utils/CustomButton";
import { useOperation } from "../../../customHooks/useOperation";
import { useTasks } from "../../../customHooks/tasks/useTasks";

function DeleteTaskModal({ tittle, id }) {
  const { openDelete, onCloseDelete } = useOperation();
  const { setTasks } = useTasks();

  function handleDeleteTask() {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    onCloseDelete();
  }
  return (
    <AlertingModal
      tittle={tittle}
      isOpen={openDelete}
      onClick={onCloseDelete}
      iconColor={"text-rose-400 "}
      // animation={" animate-ping"}
      modalMessage={" Are you sure you want to delete this task?"}
      icon={<PiWarningCircle />}
    >
      <CustomButton
        onClick={onCloseDelete}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />
      <CustomButton
        onClick={handleDeleteTask}
        size={"sm"}
        type={"others"}
        bg={"bg-rose-600"}
        label={"delete"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default DeleteTaskModal;
