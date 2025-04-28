import { FaCheckDouble } from "react-icons/fa6";
import AlertingModal from "../../utils/AlertingModal";
import CustomButton from "../../utils/CustomButton";
import { useOperation } from "../../customHooks/operation/useOperation";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useNavigate } from "react-router";

function CompletedTaskModal({ id, tittle }) {
  const navigate = useNavigate();
  const { openMarkComp, onCloseMarkComp, setOpenModal } = useOperation();
  const { updateTask } = useTasks();

  async function handleMarkAsComplete() {
    await updateTask(id, { completed: true });
    onCloseMarkComp();
    () => setOpenModal(false);
    navigate(-1);
  }

  return (
    <AlertingModal
      tittle={tittle}
      isOpen={openMarkComp}
      onClick={onCloseMarkComp}
      iconColor={"text-emerald-400 "}
      // animation={' animate-ping'}
      modalMessage={"want to mark this task completed?"}
      icon={<FaCheckDouble />}
    >
      <CustomButton
        onClick={onCloseMarkComp}
        size={"sm"}
        type={"secondary"}
        label={"no"}
      />
      <CustomButton
        onClick={handleMarkAsComplete}
        size={"sm"}
        type={"primary"}
        label={"yes"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default CompletedTaskModal;
