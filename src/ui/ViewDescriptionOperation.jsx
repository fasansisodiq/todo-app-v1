import { MdDescription } from "react-icons/md";
import ChildModal from "../utils/childModal";
import ModalBtn from "../utils/ModalBtn";
import TaskDescription from "./TaskDescription";
import TaskOperation from "../utils/TaskOperation";
import { useTodos } from "../customHooks/TodosContext";

function ViewDescriptionOperation({ description, tittle }) {
  const { onViewDesc } = useTodos();
  return (
    <>
      <TaskOperation
        onClick={onViewDesc}
        label={"View description"}
        icon={<MdDescription />}
        childModal={
          <TaskDescription description={description} tittle={tittle} />
        }
      />
    </>
  );
}

export default ViewDescriptionOperation;
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
