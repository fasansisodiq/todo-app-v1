import TaskDescriptionOperation from "../../ui/taskOperations/taskDescription/TaskDescriptionOperation";
import PermDeleteTaskOperation from "../delete-task/PermDeleteTaskOperation";
import RestoreTrashedOperation from "../restore-trash-task/Restore";

function TrashedTaskOperations({ task, description, title }) {
  return (
    <div className={`w-full h-full text-center  flex flex-col gap-2`}>
      <h1 className="self-center pt-4 text-emerald-700 font-semibold capitalize lg:text-3xl xl:text-4xl ">
        task operations
      </h1>
      <div className="flex flex-col lg:gap-2 justify-center items-center w-full h-full">
        <TaskDescriptionOperation description={description} title={title} />
        <PermDeleteTaskOperation title={title} id={task.id} task={task} />
        <RestoreTrashedOperation task={task} />
      </div>
    </div>
  );
}

export default TrashedTaskOperations;
