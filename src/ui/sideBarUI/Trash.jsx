import { FaTrash } from "react-icons/fa";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTasks } from "../../customHooks/tasks/useTasks";

function Trash() {
  const { trashData } = useTasks();
  const trashTaskNum = trashData?.length;
  return (
    <>
      <PageNavigator to="/layout/trash" activeClassName={" h-6"}>
        <Ui
          label={"trash"}
          taskNum={trashTaskNum > 0 ? trashTaskNum : ""}
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
