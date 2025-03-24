import ModalBtn from "../utils/ModalBtn";
import CompletedTaskModal from "./CompletedTaskModal";
import { FaCheckDouble } from "react-icons/fa6";
import TaskOperation from "../utils/TaskOperation";
import { useTodos } from "../customHooks/TodosContext";

function CompletedTaskOperation({ tittle }) {
  const { onMarkTaskComp } = useTodos();
  return (
    <>
      <TaskOperation
        onClick={onMarkTaskComp}
        label={"Mark as completed"}
        icon={<FaCheckDouble />}
        // childModal={<CompletedTaskModal tittle={tittle} />}
      />
    </>
  );
}

export default CompletedTaskOperation;
{
  /* <div>
      <ChildModal
        modal={
          <ModalBtn
            // onClickHandler={() => onOpenChild(id)}
            leftIcon={<MdDone />}
          >
            Mark as completed
          </ModalBtn>
        }
        childModal={
          <CompletedTaskModal tittle={tittle} icon={<FaCheckDouble />} />
        }
      />
      <span className="pt-5 absolute inset-0 xl:-top-6 xl:-right-1.5">
        {openChild && (
          <CompletedTaskModal tittle={tittle} icon={<FaCheckDouble />} />
        )}
      </span>
    </div> */
}
