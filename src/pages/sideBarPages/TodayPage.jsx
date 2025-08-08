import { formattedTodayDate } from "../../customHooks/tasks/DateFormerter";
import { useTasks } from "../../customHooks/tasks/useTasks";
import ReusableTaskItem from "../../utils/ReusableTaskItem";

function TodayPage() {
  const { taskData } = useTasks();

  return (
    <div className="w-full">
      <ul>
        {taskData &&
          taskData.length > 0 &&
          taskData
            .filter((task) => task.dueDate === formattedTodayDate)
            .map((task, idx) => (
              <ReusableTaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default TodayPage;
