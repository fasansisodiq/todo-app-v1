import { FaCheckDouble } from "react-icons/fa6";
import AlertingModal from "../../../utils/AlertingModal";
import CustomButton from "../../../utils/CustomButton";
import { useComplete } from "../../../customHooks/tasks/useComplete";
import { useOperation } from "../../../customHooks/operation/useOperation";

function CompletedTaskModal({ id, tittle }) {
  const { openMarkComp, onCloseMarkComp } = useOperation();
  const { completedTask } = useComplete();

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
        onClick={() => completedTask(id)}
        size={"sm"}
        type={"primary"}
        label={"yes"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default CompletedTaskModal;
