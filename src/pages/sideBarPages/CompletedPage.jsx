import { useTasks } from "../../customHooks/tasks/useTasks";
import ReusableTaskItem from "../../utils/ReusableTaskItem";

function CompletedPage() {
  const { taskData } = useTasks();

  return (
    <div className="w-full">
      <ul>
        {taskData?.length > 0 &&
          taskData
            .filter((task) => task.completed === true)
            .map((task) => <ReusableTaskItem task={task} key={task.id} />)}
      </ul>
    </div>
  );
}

export default CompletedPage;
