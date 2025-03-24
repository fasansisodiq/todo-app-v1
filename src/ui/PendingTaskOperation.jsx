import { MdPending } from "react-icons/md";
import ChildModal from "../utils/childModal";
import ModalBtn from "../utils/ModalBtn";
import PendingTaskModal from "./PendingTaskModal";
import { FaClock } from "react-icons/fa6";
import { useModal } from "../customHooks/useModal";
import TaskOperation from "../utils/TaskOperation";
import { useTodos } from "../customHooks/TodosContext";

function PendingTaskOperation({ tittle }) {
  const { onMarkTaskPend } = useTodos();
  return (
    <>
      <TaskOperation
        onClick={onMarkTaskPend}
        label={"Mark as pending"}
        icon={<MdPending />}
        // childModal={<PendingTaskModal tittle={tittle} />}
      />
    </>
  );
}

export default PendingTaskOperation;
{
  /* <div>
      <ChildModal
        modal={
          <ModalBtn
            onClickHandler={() => onOpenChild(id)}
            leftIcon={<MdPending />}
          >
            Mark as pending
          </ModalBtn>
        }
        childModal={<PendingTaskModal />}
      />
      <span className="pt-5 absolute sm:-top-5 sm:-left-61 xl:-top-6 xl:-right-1.5">
        {openChild === id && <PendingTaskModal tittle={tittle} />}
      </span>
    </div> */
}
