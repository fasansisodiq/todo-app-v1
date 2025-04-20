import { useTasks } from "../../customHooks/tasks/useTasks";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import TaskItem from "../tasks/TaskItem";

function TodayPage() {
  const { tasks, todayDate } = useTasks();

  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {tasks &&
          tasks.length > 0 &&
          tasks
            .filter((task) => task.dueDate === todayDate)
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default TodayPage;
