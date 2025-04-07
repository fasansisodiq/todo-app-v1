import TaskDescriptionOperation from "./TaskDescriptionOperation";
import EditTaskOperation from "./EditTaskOperation";
import DeleteTaskOperation from "./DeleteTaskOperation";
import CompletedTaskOperation from "./CompletedTaskOperation";
import PendingTaskOperation from "./PendingTaskOperation";

function TaskOperations({ description, tittle }) {
  return (
    <div
      className={`w-full h-full text-center sm:gap-8 `}
    >
      <h1 className="self-center pt-4 text-emerald-700 font-semibold capitalize lg:text-3xl xl:text-4xl lg:pb-4">
        task operations
      </h1>
      <TaskDescriptionOperation
        description={description}
        tittle={tittle}
        
      />
      <EditTaskOperation />
      <DeleteTaskOperation tittle={tittle} />
      <CompletedTaskOperation tittle={tittle} />
      <PendingTaskOperation tittle={tittle} />
    </div>
  );
}

export default TaskOperations;
// ${
//         openChild === null ? "opacity-100" : "opacity-0"
//       }
