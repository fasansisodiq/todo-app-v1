import { useTasks } from "../../customHooks/tasks/useTasks";
import ReusableTaskItem from "../../utils/ReusableTaskItem";

function ImportantPage() {
  const { taskData } = useTasks();
  return (
    <div className="w-full">
      <ul>
        {taskData?.length > 0 &&
          taskData
            .filter(
              (task) =>
                task.completed === false &&
                task.priority.toLowerCase() === "high"
            )
            .map((task) => <ReusableTaskItem task={task} key={task.id} />)}
      </ul>
    </div>
  );
}

export default ImportantPage;
