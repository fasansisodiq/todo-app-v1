import { IoTodaySharp } from "react-icons/io5";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { formattedTodayDate } from "../../customHooks/tasks/DateFormerter";
import { useTasks } from "../../customHooks/tasks/useTasks";

function Today() {
  const { taskData } = useTasks();
  const todayNumTasks = taskData.filter(
    (task) => task.dueDate === formattedTodayDate
  ).length;
  return (
    <PageNavigator to="/layout/today" activeClassName={" h-6"}>
      <Ui
        label={"today"}
        taskNum={todayNumTasks < 1 ? "" : todayNumTasks}
        icon={
          <span className="text-rose-500">
            <IoTodaySharp />
          </span>
        }
      />
    </PageNavigator>
  );
}

export default Today;
