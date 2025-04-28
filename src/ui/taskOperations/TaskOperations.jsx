import EditTaskOperation from "../../features/edit-task/EditTaskOperation";
import CompletedTaskOperation from "../../features/mark-as-completed/CompletedTaskOperation";
import PendingTaskOperation from "../../features/mark-as-pending/PendingTaskOperation";
import TaskDescriptionOperation from "./taskDescription/TaskDescriptionOperation";
import TempDeleteTaskOperation from "../../features/move-task-to-trash/TempDeleteTaskOperation";

function TaskOperations({ task, description, title }) {
  return (
    <div className={`w-full h-full text-center  flex flex-col gap-2`}>
      <h1 className="self-center pt-4 text-emerald-700 font-semibold capitalize lg:text-3xl xl:text-4xl ">
        task operations
      </h1>
      <div className="flex flex-col lg:gap-2 justify-center items-center w-full h-full">
        <TaskDescriptionOperation description={description} title={title} />
        <EditTaskOperation title={title} id={task.id} task={task} />
        <TempDeleteTaskOperation title={title} id={task.id} task={task} />
        <CompletedTaskOperation title={title} id={task.id} task={task} />
        <PendingTaskOperation title={title} id={task.id} task={task} />
      </div>
    </div>
  );
}

export default TaskOperations;
