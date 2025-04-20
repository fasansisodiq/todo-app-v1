import DeleteTaskOperation from "./deleteTask/DeleteTaskOperation";
import EditTaskOperation from "./edittask/EditTaskOperation";
import CompletedTaskOperation from "./markCompleted/CompletedTaskOperation";
import PendingTaskOperation from "./markPending/PendingTaskOperation";

import TaskDescriptionOperation from "./taskDescription/TaskDescriptionOperation";

function TaskOperations({ task, description, tittle }) {
  return (
    <div className={`w-full h-full text-center  flex flex-col gap-2`}>
      <h1 className="self-center pt-4 text-emerald-700 font-semibold capitalize lg:text-3xl xl:text-4xl ">
        task operations
      </h1>
      <div className="flex flex-col lg:gap-2 justify-center items-center w-full h-full">
        <TaskDescriptionOperation description={description} tittle={tittle} />
        <EditTaskOperation tittle={tittle} id={task.id} task={task} />
        <DeleteTaskOperation tittle={tittle} id={task.id} />
        <CompletedTaskOperation tittle={tittle} id={task.id} />
        <PendingTaskOperation tittle={tittle} id={task.id} />
      </div>
    </div>
  );
}

export default TaskOperations;
