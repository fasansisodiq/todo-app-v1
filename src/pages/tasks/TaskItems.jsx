import TaskItem from "../TaskItem";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import { useTasks } from "../../customHooks/taskData/useTasks";
import Spinner from "../../utils/Spinner";
import Message from "../../utils/Message";

function TaskItems() {
  const { taskData, isLoading } = useTasks();
  if (isLoading) return <Spinner text={"loading"} />;
  if (!taskData.length) return <Message />;

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

export default TaskItems;
