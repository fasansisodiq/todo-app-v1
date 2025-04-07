import { MdDescription } from "react-icons/md";
import ChildModal from "../utils/childModal";
import ModalBtn from "../utils/ModalBtn";
import TaskDescription from "./TaskDescription";
import TaskOperation from "../utils/TaskOperation";
import { useTodos } from "../customHooks/TodosContext";

<<<<<<< HEAD:src/ui/TaskDescriptionOperation.jsx
function TaskDescriptionOperation({ description, tittle }) {
  const { onViewDesc,openViewDesc, onHide } = useTodos();
  return (
    <>
      <TaskOperation
        onClick={onViewDesc}
        state={openViewDesc}
=======
function ViewDescriptionOperation({ description, tittle }) {
  // const { onViewDesc } = useTodos();
  return (
    <>
      <TaskOperation
        // onClick={onViewDesc}
>>>>>>> b0528648e0864a1dea51f45cedd58e3e8dc69ba1:src/ui/ViewDescriptionOperation.jsx
        label={"View description"}
        icon={<MdDescription />}
        childModal={
          <TaskDescription description={description} tittle={tittle} />
        }
      />
    </>
  );
}

export default TaskDescriptionOperation;
//  <div>
//       <ChildModal
//         modal={
//           <ModalBtn
//             onClickHandler={() => onOpenChild(tittle)}
//             leftIcon={<MdDescription />}
//             key={id}
//           >
//             View description
//           </ModalBtn>
//         }
//         childModal={
//           <TaskDescription description={description} tittle={tittle} />
//         }
//       />
//       <span className="pt-5 absolute xl:-top-6 xl:-right-1.5">
//         {openChild === id && (
//           <TaskDescription description={description} tittle={tittle} />
//         )}
//       </span>
//     </div>
