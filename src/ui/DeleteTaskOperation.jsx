import { PiWarningCircle } from "react-icons/pi";
import DeleteTaskModal from "./DeleteTaskModal";
import { MdDelete } from "react-icons/md";
import ModalBtn from "../utils/ModalBtn";
import ChildModal from "../utils/childModal";
import TaskOperation from "../utils/TaskOperation";
import { useTodos } from "../customHooks/TodosContext";

<<<<<<< HEAD

function DeleteTaskOperation({tittle}) {
  const {openDelTask,onDelTask} = useTodos()
  return (
    <>
       <TaskOperation
        onClick={onDelTask}
=======
function DeleteTaskOperation() {
  // const { dispatch } = useTodos();
  return (
    <>
      <TaskOperation
        onClick={() => {}}
>>>>>>> b0528648e0864a1dea51f45cedd58e3e8dc69ba1
        label={"Delete"}
        state={openDelTask}
        icon={<PiWarningCircle />}
         childModal={<DeleteTaskModal tittle={tittle} />}
      />
    </>
  );
}

export default DeleteTaskOperation;
//  <ChildModal
//         tittle={tittle}
//         setIsOpen={setIsOpen}
//         modal={
//           <ModalBtn
//             onClickHandler={() => onOpenChild(id)}
//             leftIcon={<MdDelete />}
//           >
//             Delete
//           </ModalBtn>
//         }
//         childModal={
//           <DeleteTaskModal tittle={tittle} icon={<PiWarningCircle />} />
//         }
//       />
//       <span className="pt-5 absolute xl:-top-6 xl:-right-1.5">
//         {openChild === id && (
//           <DeleteTaskModal tittle={tittle} icon={<PiWarningCircle />} />
//         )}
//       </span>
