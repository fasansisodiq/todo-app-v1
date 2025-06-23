import { Link } from "react-router";
import { useOperation } from "../../customHooks/operation/useOperation";
import CustomButton from "../../utils/CustomButton";
import AlertingModal from "../../utils/AlertingModal";
import { FaShareAlt } from "react-icons/fa";
import { useTasks } from "../../customHooks/tasks/useTasks";

function ShareTaskModal({ title, id, recipientIdentifier = "new user" }) {
  const { openShare, onCloseShare, setOpenModal } = useOperation();
  const { shareTaskWithUser } = useTasks();

  // async function handleShare() {
  //   console.log(recipientIdentifier);
  //   await shareTaskWithUser(id, recipientIdentifier);
  //   onCloseShare();
  //   setOpenModal(null);
  // }

  const handleShare = async () => {
    console.log("handleShare called with recipient:", recipientIdentifier);
    try {
      await shareTaskWithUser(id, recipientIdentifier);
      alert("Task shared!");
      onCloseShare();
      setOpenModal(null);
    } catch (error) {
      console.error("Error in handleShare:", error);
      alert("Failed to share task. Please check permissions and try again.");
    }
  };
  // handleShare();
  return (
    <AlertingModal
      title={title}
      isOpen={openShare}
      onClick={onCloseShare}
      iconColor={"text-emerald-400 "}
      // animation={" animate-ping"}
      modalMessage={` You are about to share this task with ${recipientIdentifier}?`}
      icon={<FaShareAlt />}
    >
      <CustomButton
        onClick={onCloseShare}
        size={"sm"}
        type={"secondary"}
        label={"cancel"}
      />

      <Link
        // to={`${id}?id=${id}&title=${task.title}&assignee=${task.assignee}&dueDate=${task.dueDate}&description=${task.description}&priority=${task.priority}&taskClass=${task.taskClass}`}
        to="/layout/share"
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
