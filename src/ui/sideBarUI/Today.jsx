import { IoTodaySharp } from "react-icons/io5";
import Ui from "../../utils/Ui";
import PageNavigator from "../../utils/PageNavigator";
import { todayDate } from "../../customHooks/tasks/DateFormerter";
import { useTasks } from "../../customHooks/tasks/useTasks";

function Today() {
  const { tasks } = useTasks();
  const todayNumTasks = tasks.filter(
    (task) => task.dueDate === todayDate
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
