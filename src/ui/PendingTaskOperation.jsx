import { MdPending } from "react-icons/md";
import ChildModal from "../utils/childModal";
import ModalBtn from "../utils/ModalBtn";
import PendingTaskModal from "./PendingTaskModal";
import { FaClock } from "react-icons/fa6";
<<<<<<< HEAD
=======

>>>>>>> b0528648e0864a1dea51f45cedd58e3e8dc69ba1
import TaskOperation from "../utils/TaskOperation";
import { useTodos } from "../customHooks/TodosContext";

function PendingTaskOperation({ tittle }) {
<<<<<<< HEAD
  const { onMarkTaskPend,openMarkTaskPend } = useTodos();
  return (
    <>
      <TaskOperation
        onClick={onMarkTaskPend}
        state={openMarkTaskPend}
=======
  // const { onMarkTaskPend } = useTodos();
  return (
    <>
      <TaskOperation
        onClick={() => {}}
>>>>>>> b0528648e0864a1dea51f45cedd58e3e8dc69ba1
        label={"Mark as pending"}
        icon={<MdPending />}
        childModal={<PendingTaskModal tittle={tittle} />}
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
