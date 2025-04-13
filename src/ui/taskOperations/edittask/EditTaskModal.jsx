import { BiEdit } from "react-icons/bi";
import { useOperation } from "../../../customHooks/useOperation";
import AlertingModal from "../../../utils/AlertingModal";
import CustomButton from "../../../utils/CustomButton";
import { useRef, useState } from "react";
import { useEditing } from "../../../customHooks/tasks/useEditing";

function EditTaskModal({ tittle, tasks, task }) {
  const { openEdit, onCloseEdit } = useOperation();
  const { handleEditTask } = useEditing();

  // function handleEditTask(id) {
  //   tasks.filter((task) => task.id !== id);
  // }
  return (
    <AlertingModal
      tittle={tittle}
      isOpen={openEdit}
      onClick={onCloseEdit}
      iconColor={"text-blue-400 "}
      // animation={" animate-ping"}
      modalMessage={" you want to edit this task?"}
      icon={<BiEdit />}
    >
      <CustomButton
        onClick={onCloseEdit}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />
      <CustomButton
        onClick={handleEditTask}
        size={"sm"}
        type={"others"}
        bg={"bg-blue-700"}
        txtColor={"text-white"}
        label={"edit"}
      />
    </AlertingModal>
  );
}

export default EditTaskModal;
