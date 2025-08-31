import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import { useTasks } from "../../customHooks/taskData/useTasks";
import Spinner from "../../utils/Spinner";
import Message from "../../utils/Message";
import ReusableTaskItem from "../../utils/ReusableTaskItem";

function TaskItemList() {
  const { taskData, isLoading } = useTasks();

  if (isLoading) return <Spinner text={"loading"} />;
  if (!Array.isArray(taskData) || taskData.length === 0)
    return <Message msg="No task available" color="red" />;

  return (
    <div className="flex flex-col gap-2 ">
      <TaskOverviewHeader />
      <ul className="space-y-2">
        {taskData.map((task) => (
          <li
            className="flex items-center gap-3 p-2 rounded-lg border border-emerald-50 dark:border-emerald-800 bg-emerald-50 dark:bg-[#23272f] shadow-sm relative"
            key={task?.id}
          >
            <ReusableTaskItem task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskItemList;
