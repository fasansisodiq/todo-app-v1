import { BiTask } from "react-icons/bi";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { useTaskNumberFetcher } from "../../customHooks/tasks/TaskNumberFetcher";

function Task() {
  const taskNum = useTaskNumberFetcher("task");
  return (
    <>
      <PageNavigator
        to="/layout/task"
        activeClassName={" h-6"}
        notActiveClassName={"hover:bg-slate-300 hover:px-0.5 px-0.5"}
      >
        <Ui
          label={"task"}
          taskNum={taskNum}
          icon={
            <span className="text-blue-400">
              <BiTask />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Task;
