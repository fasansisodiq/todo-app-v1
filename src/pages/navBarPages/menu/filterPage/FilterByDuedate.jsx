import React from "react";
import { useTasks } from "../../../../customHooks/tasks/useTasks";
import TaskItem from "../../../tasks/TaskItem";

function FilterByDuedate({ filter, name, cbFunc, days }) {
  const { taskData } = useTasks();
  return (
    <ul>
      {days &&
        filter === name &&
        taskData?.length > 0 &&
        taskData
          .filter((task) => cbFunc(task.dueDate) <= days)
          .map((task, idx) => <TaskItem task={task} key={task.id} idx={idx} />)}
      {filter === name &&
        taskData?.length > 0 &&
        taskData
          .filter((task) => cbFunc(task.dueDate))
          .map((task, idx) => <TaskItem task={task} key={task.id} idx={idx} />)}
    </ul>
  );
}

export default FilterByDuedate;
