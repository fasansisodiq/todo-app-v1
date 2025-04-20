import TaskItem from "../../pages/tasks/TaskItem";
import { getTask } from "../../services/apiTaskData";
import TaskOverviewHeader from "../taskOverviewUI/TaskOverviewHeader";

function Task() {
  return (
    <div>
      <TaskOverviewHeader />
      <TaskItem />
    </div>
  );
}
export async function loader({ params }) {
  const order = await getTask(params.taskId);
  console.log(order);
  return null;
}
export default Task;
