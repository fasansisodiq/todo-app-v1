import { Link } from "react-router";
import { useOperation } from "../../customHooks/operation/useOperation";
import CustomButton from "../../utils/CustomButton";
import AlertingModal from "../../utils/AlertingModal";
import { FaShareAlt } from "react-icons/fa";
import { useTasks } from "../../customHooks/tasks/useTasks";

function ShareTaskModal({ title, id, userId = "new user", task }) {
  const { openShare, onCloseShare, setOpenModal } = useOperation();
  const { shareTaskWithUser } = useTasks();
  async function handleShare() {
    await shareTaskWithUser(id, userId);
    onCloseShare();
    setOpenModal(null);
  }
  return (
    <AlertingModal
      title={title}
      isOpen={openShare}
      onClick={onCloseShare}
      iconColor={"text-emerald-400 "}
      // animation={" animate-ping"}
      modalMessage={" you want to share this task?"}
      icon={<FaShareAlt />}
    >
      <CustomButton
        onClick={onCloseShare}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />

      <Link
        to={`${id}?id=${id}&title=${task.title}&assignee=${task.assignee}&dueDate=${task.dueDate}&description=${task.description}&priority=${task.priority}&taskClass=${task.taskClass}`}
      >
        <CustomButton
          onClick={handleShare}
          size={"sm"}
          type={"others"}
          bg={"bg-emerald-700"}
          txtColor={"text-white"}
          label={"share"}
        />
      </Link>
    </AlertingModal>
  );
}

export default ShareTaskModal;
