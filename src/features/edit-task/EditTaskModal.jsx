import { BiEdit } from "react-icons/bi";

import { Link } from "react-router-dom";
import AlertingModal from "../../utils/AlertingModal";
import CustomButton from "../../utils/CustomButton";
import { useOperation } from "../../customHooks/operation/useOperation";

function EditTaskModal({ title, id, task }) {
  const { openEdit, onCloseEdit, setOpenModal } = useOperation();

  function handleEdit() {
    // updateTask("tasks", id, task);
    onCloseEdit();
    setOpenModal(null);
  }

  return (
    <AlertingModal
      title={title}
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

      <Link
        to={`${id}?id=${id}&title=${task.title}&assignee=${task.assignee}&dueDate=${task.dueDate}&description=${task.description}&priority=${task.priority}&taskClass=${task.taskClass}`}
      >
        <CustomButton
          onClick={handleEdit}
          size={"sm"}
          type={"others"}
          bg={"bg-blue-700"}
          txtColor={"text-white"}
          label={"edit"}
        />
      </Link>
    </AlertingModal>
  );
}

export default EditTaskModal;
