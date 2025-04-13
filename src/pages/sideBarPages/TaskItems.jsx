import TaskItem from "../TaskItem";
import TaskOverviewHeader from "../../ui/taskOverviewUI/TaskOverviewHeader";
import { useTasks } from "../../customHooks/tasks/useTasks";

function TaskItems() {
  const { tasks } = useTasks();

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
