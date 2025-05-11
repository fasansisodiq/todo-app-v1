import { MdDescription } from "react-icons/md";
import { useOperation } from "../../../customHooks/operation/useOperation";
import AlertingModal from "../../../utils/AlertingModal";
import CloseBtn from "../../../utils/CloseBtn";

function TaskDescriptionModal({ description, title }) {
  const { openDesc, onCloseDesc } = useOperation();
  return (
    <AlertingModal
      title={title}
      isOpen={openDesc}
      onClick={onCloseDesc}
      icon={<MdDescription />}
      iconColor={"text-blue-400"}
    >
      <span>{description}</span>
    </AlertingModal>
  );
}

export default TaskDescriptionModal;
