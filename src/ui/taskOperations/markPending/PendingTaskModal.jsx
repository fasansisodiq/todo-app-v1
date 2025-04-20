import { MdPending } from "react-icons/md";
import AlertingModal from "../../../utils/AlertingModal";
import CustomButton from "../../../utils/CustomButton";
import { useOperation } from "../../../customHooks/operation/useOperation";

function PendingTaskModal({ tittle }) {
  const { openMarkPend, onCloseMarkPend } = useOperation();
  return (
    <AlertingModal
      tittle={tittle}
      isOpen={openMarkPend}
      onClick={onCloseMarkPend}
      iconColor={"text-yellow-400 "}
      modalMessage={"You want to mark this task as pending?"}
      icon={<MdPending />}
    >
      <CustomButton
        onClick={onCloseMarkPend}
        size={"sm"}
        type={"secondary"}
        label={"no"}
      />
      <CustomButton
        size={"sm"}
        type={"others"}
        bg={"bg-yellow-600"}
        label={"yes"}
        txtColor={"text-white"}
      />
    </AlertingModal>
  );
}

export default PendingTaskModal;
