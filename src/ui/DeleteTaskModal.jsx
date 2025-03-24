import { PiWarningCircle } from "react-icons/pi";
import { useModal } from "../customHooks/useModal";
import AlertingModal from "../utils/AlertingModal";
import CustomButton from "../utils/CustomButton";

function DeleteTaskModal({ tittle, tasks, task }) {
  const { onCloseChild } = useModal();
  function handleDeleteTask(id) {
    tasks.filter((task) => task.id !== id);
  }
  return (
    <AlertingModal
      tittle={tittle}
      iconColor={"text-rose-600 "}
      animation={" animate-ping"}
      modalMessage={" Are you sure you want to delete this task?"}
      icon={<PiWarningCircle />}
    >
      <CustomButton
        onClick={() => onCloseChild}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />
      <CustomButton
        onClick={() => handleDeleteTask(task.id)}
        size={"sm"}
        type={"others"}
        bg={"bg-rose-600"}
        label={"delete"}
      />
    </AlertingModal>
  );
}

export default DeleteTaskModal;
