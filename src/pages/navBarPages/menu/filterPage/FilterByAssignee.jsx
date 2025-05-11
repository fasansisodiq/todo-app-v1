import React from "react";
import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TaskItem from "../../../tasks/TaskItem";

function FilterByAssignee({ filter, name }) {
  const { taskData } = useTasks();
  return (
    <ul>
      {filter === name &&
        taskData?.length > 0 &&
        taskData
          ?.filter((task) => task.assignee === name)
          .map((task, idx) => <TaskItem task={task} key={task.id} idx={idx} />)}
    </ul>
  );
}

export default FilterByAssignee;
