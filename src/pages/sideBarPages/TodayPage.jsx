import { formattedTodayDate } from "../../customHooks/tasks/DateFormerter";
import { useTasks } from "../../customHooks/tasks/useTasks";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import TaskItem from "../tasks/TaskItem";

function TodayPage() {
  const { taskData } = useTasks();

  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {taskData &&
          taskData.length > 0 &&
          taskData
            .filter((task) => task.dueDate === formattedTodayDate)
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default TodayPage;
