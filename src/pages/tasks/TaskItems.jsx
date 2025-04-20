import TaskItem from "../TaskItem";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import { useTasks } from "../../customHooks/tasks/useTasks";
import Spinner from "../../utils/Spinner";
import Message from "../../utils/Message";

function TaskItems() {
  const { tasks, isLoading } = useTasks();
  if (isLoading) return <Spinner text={"loading"} />;
  if (!tasks.length) return <Message />;

  return (
    <div className="flex flex-col gap-2 ">
      <TaskOverviewHeader />
      <ul>
        {tasks.map((task, idx) => (
          <TaskItem task={task} key={task.id} idx={idx} />
        ))}
      </ul>
    </div>
  );
}

export default TaskItems;
