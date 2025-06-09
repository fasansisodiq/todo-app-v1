import TaskItem from "../TaskItem";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import { useTasks } from "../../customHooks/taskData/useTasks";
import Spinner from "../../utils/Spinner";
import Message from "../../utils/Message";

function TaskItemList() {
  const { taskData, isLoading } = useTasks();
  if (isLoading) return <Spinner text={"loading"} />;
  if (!Array.isArray(taskData) || taskData.length === 0)
    return <Message msg="No task avialable" color="red" />;

  return (
    <div className="flex flex-col gap-2 ">
      <TaskOverviewHeader />
      <ul>
        {taskData.map((task, idx) => (
          <TaskItem task={task} key={idx} idx={idx} />
        ))}
      </ul>
    </div>
  );
}

export default TaskItemList;
