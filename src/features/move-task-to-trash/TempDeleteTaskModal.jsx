import AlertingModal from "../../utils/AlertingModal";
import CustomButton from "../../utils/CustomButton";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useOperation } from "../../customHooks/operation/useOperation";
import { useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";

function TempDeleteTaskModal({ title, id, task }) {
  const navigate = useNavigate();
  const { openTrash, onCloseTrash, setOpenModal } = useOperation();
  const { trashTask } = useTasks();

  async function handleTrashTask() {
    await trashTask(id, task);
    onCloseTrash();
    setOpenModal(null);
    navigate(`/layout/trash`);
  }
  return (
    <AlertingModal
      title={title}
      isOpen={openTrash}
      onClick={onCloseTrash}
      iconColor={"text-rose-400 "}
      // animation={" animate-ping"}
      modalMessage={
        " Are you sure you want to trash this task? you can restore it later."
      }
      icon={<FaTrash />}
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
        label={"trash"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default TempDeleteTaskModal;
