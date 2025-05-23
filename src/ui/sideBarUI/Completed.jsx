import { MdDone } from "react-icons/md";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTasks } from "../../customHooks/tasks/useTasks";

function Completed() {
  const { taskData } = useTasks();
  const completedTaskNum = taskData.filter(
    (task) => task.completed === true
  ).length;

  return (
    <>
      <PageNavigator to="/layout/completed" activeClassName={" h-6"}>
        <Ui
          label={"completed"}
          taskNum={completedTaskNum < 1 ? "" : completedTaskNum}
          icon={
            <span className="text-black-600">
              <MdDone />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Completed;
