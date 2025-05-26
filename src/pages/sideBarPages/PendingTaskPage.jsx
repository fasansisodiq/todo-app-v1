import React from "react";
import { useTasks } from "../../customHooks/tasks/useTasks";
import TaskItem from "../tasks/TaskItem";
import TableHeader from "../../ui/taskOverviewUI/TableHeader";

function PendingTaskPage() {
  const { taskData } = useTasks();

  return (
    <div className="w-full">
      <TableHeader />
      <ul>
        {taskData?.length > 0 &&
          taskData
            .filter((task) => task.completed === false && task.pending === true)
            .map((task, idx) => (
              <TaskItem task={task} key={task.id} idx={idx} />
            ))}
      </ul>
    </div>
  );
}

export default PendingTaskPage;
