import { MdPending } from "react-icons/md";
import AlertingModal from "../../utils/AlertingModal";
import CustomButton from "../../utils/CustomButton";
import { useOperation } from "../../customHooks/operation/useOperation";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useNavigate } from "react-router";
import TaskOperationModal from "../../utils/TaskOperationModal";

function PendingTaskModal({ task }) {
  const navigate = useNavigate();
  // const [openMarkPend, setOpenMarkPen] = useState()
  const { openMarkPend, onCloseMarkPend } = useOperation();
  const { updateTask } = useTasks();

  async function handleMarkAsPending() {
    await updateTask(task.id, {
      pending: true,
      status: "pending",
      completed: false,
    });
    navigate(`/layout/${task.taskClass}`);
  }
  return (
    <>
      <TaskOperationModal
        task={task}
        isOpen={openMarkPend}
        submitLabel="mark as pending"
        onSave={handleMarkAsPending}
      />
    </>
    // <AlertingModal
    //   tittle={tittle}
    //   isOpen={openMarkPend}
    //   onClick={onCloseMarkPend}
    //   iconColor={"text-yellow-400 "}
    //   modalMessage={"You want to mark this task as pending?"}
    //   icon={<MdPending />}
    // >
    //   <CustomButton
    //     onClick={onCloseMarkPend}
    //     size={"sm"}
    //     type={"secondary"}
    //     label={"no"}
    //   />
    //   <CustomButton
    //     size={"sm"}
    //     type={"others"}
    //     bg={"bg-yellow-600"}
    //     label={"yes"}
    //     txtColor={"text-white"}
    //     onClick={handleMarkAsPending}
    //   />
    // </AlertingModal>
  );
}

export default PendingTaskModal;
