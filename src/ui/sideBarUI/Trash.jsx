import { FaTrash } from "react-icons/fa";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTasks } from "../../customHooks/tasks/useTasks";

function Trash() {
  const { trashData, subtasksMap } = useTasks();
  const trashTaskNum = trashData?.length;
  const subtaskTrashNum = subtasksMap?.subtaskTrash?.length;
  const totalTrashNum = trashTaskNum + subtaskTrashNum;
  return (
    <>
      <PageNavigator to="/layout/trash" activeClassName={" h-6"}>
        <Ui
          label={"trash"}
          taskNum={totalTrashNum > 0 ? totalTrashNum : ""}
          icon={
            <span className="text-fuchsia-600">
              <FaTrash />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Trash;
