import { FaCheckDouble } from "react-icons/fa6";
import AlertingModal from "../utils/AlertingModal";
import CustomButton from "../utils/CustomButton";
import { useTodos } from "../customHooks/TodosContext";

function CompletedTaskModal({ tittle }) {
  const {dispatch} = useTodos()
  return (
    <AlertingModal
      tittle={tittle}
      iconColor={"text-emerald-700 "}
      // animation={' animate-ping'}
      modalMessage={"want to mark this task completed?"}
      icon={<FaCheckDouble />}
    >
      <CustomButton onClick={''} size={"sm"} type={"secondary"} label={"no"} />
      <CustomButton size={"sm"} type={"primary"} label={"yes"} />
    </AlertingModal>
  );
}

export default CompletedTaskModal;
