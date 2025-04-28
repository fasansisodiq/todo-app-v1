import React from "react";
import { useOperation } from "../../customHooks/operation/useOperation";
import { useTasks } from "../../customHooks/tasks/useTasks";
import AlertingModal from "../../utils/AlertingModal";
import CustomButton from "../../utils/CustomButton";
import { PiWarningCircle } from "react-icons/pi";

function PermDeleteTaskModal({ title, id, task }) {
  const { openDelete, onCloseDelete, setOpenModal } = useOperation();
  const { deleteTask } = useTasks();

  async function handlePermDeleteTask() {
    await deleteTask(id, task);

    onCloseDelete();
    setOpenModal(null);
  }
  return (
    <AlertingModal
      title={title}
      isOpen={openDelete}
      onClick={onCloseDelete}
      iconColor={"text-rose-400 "}
      // animation={" animate-ping"}
      modalMessage={" Clicking delete will permanently delete this task?"}
      icon={<PiWarningCircle />}
    >
      <CustomButton
        onClick={onCloseDelete}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />
      <CustomButton
        onClick={handlePermDeleteTask}
        size={"sm"}
        type={"others"}
        bg={"bg-rose-600"}
        label={"delete"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default PermDeleteTaskModal;
