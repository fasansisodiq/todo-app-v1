import { MdHourglassEmpty } from "react-icons/md";
import PageNavigator from "../../utils/PageNavigator";
import { useTasks } from "../../customHooks/tasks/useTasks";
import Ui from "../../utils/Ui";

function Pending() {
  const { taskData } = useTasks();
  const pendingTaskNum = taskData?.filter(
    (task) => task.completed === false && task.pending === true
  ).length;
  return (
    <>
      <PageNavigator to="/layout/pending" activeClassName={" h-6"}>
        <Ui
          label={"pending"}
          taskNum={pendingTaskNum < 1 ? "" : pendingTaskNum}
          icon={
            <span className="text-orange-400">
              <MdHourglassEmpty />
            </span>
          }
        />
      </PageNavigator>
    </>
  );
}

export default Pending;
