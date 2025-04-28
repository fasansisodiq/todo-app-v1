import { useTasks } from "../customHooks/tasks/useTasks";
import TaskItem from "../pages/tasks/TaskItem";

import TaskOverviewHeader from "../ui/taskOverviewUI/TaskOverviewHeader";

function TaskFetcher({ taskClass }) {
  const { taskData } = useTasks();

  return (
    <div className="w-full">
      <TaskOverviewHeader />
      <ul>
        {taskData &&
          taskData.length > 0 &&
          taskData
            .filter(
              (task) => task.taskClass === taskClass && task.completed === false
            )
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default TaskFetcher;
