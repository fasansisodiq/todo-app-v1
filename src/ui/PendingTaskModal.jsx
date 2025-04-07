import { MdPending } from "react-icons/md";
import AlertingModal from "../utils/AlertingModal";
import CustomButton from "../utils/CustomButton";
import { useTodos } from "../customHooks/TodosContext";

function PendingTaskModal({ tittle }) {
  const {onCloseChild} = useTodos()
  return (
    <AlertingModal
      tittle={tittle}
      iconColor={"text-yellow-500 "}
      modalMessage={"You want to mark this task as pending?"}
      icon={<MdPending />}
    >
      <CustomButton onClick={onCloseChild} size={"sm"} type={"secondary"} label={"no"} />
      <CustomButton
        size={"sm"}
        type={"others"}
        bg={"bg-yellow-500"}
        label={"yes"}
      />
    </AlertingModal>
  );
}

export default PendingTaskModal;
