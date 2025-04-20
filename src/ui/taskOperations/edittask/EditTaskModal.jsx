import { BiEdit } from "react-icons/bi";
import AlertingModal from "../../../utils/AlertingModal";
import CustomButton from "../../../utils/CustomButton";
import { useOperation } from "../../../customHooks/operation/useOperation";
import { Link } from "react-router-dom";

function EditTaskModal({ tittle, id, task }) {
  const { openEdit, onCloseEdit, setOpenModal } = useOperation();
  // const { handleEditTask } = useEditing();

  function handleEdit() {
    onCloseEdit();
    setOpenModal(null);
  }
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

      <Link
        to={`${id}?title=${task.tittle}&assignee=${task.assignee}&dueDate=${task.dueDate}&description=${task.description}&priority=${task.priority}&taskClass=${task.taskClass}`}
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
