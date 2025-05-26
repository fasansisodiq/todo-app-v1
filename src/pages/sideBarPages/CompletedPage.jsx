import { useTasks } from "../../customHooks/tasks/useTasks";
import TableHeader from "../../ui/taskOverviewUI/TableHeader";
import TaskItem from "../tasks/TaskItem";

function CompletedPage() {
  const { taskData } = useTasks();

  return (
    <div className="w-full">
      <TableHeader />
      <ul>
        {taskData?.length > 0 &&
          taskData
            .filter((task) => task.completed === true)
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default CompletedPage;
