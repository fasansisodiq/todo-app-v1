import ViewDescriptionOperation from "./ViewDescriptionOperation";
import EditTaskOperation from "./EditTaskOperation";
import DeleteTaskOperation from "./DeleteTaskOperation";
import CompletedTaskOperation from "./CompletedTaskOperation";
import PendingTaskOperation from "./PendingTaskOperation";

function TaskOperations({ description, tittle }) {
  return (
    <div
      className={` relative border-y-15 justify-center items-start bg-white
       border-y-green-700  z-50 w-50 h-58 sm:w-60 md:w-70 md:h-70 lg:w-70
        lg:h-100 xl:w-80 xl:h-90 p-2   border-2  text-slate-700 flex flex-col
        border-slate-200 rounded-7xl text-[1rem] sm:text-sm md:text-lg lg:text-xl
         xl:text-xl shadow-gray-100   `}
    >
      <h1 className="self-center pb-4 font-semibold capitalize">
        task operations
      </h1>
      <ViewDescriptionOperation
        description={description}
        tittle={tittle}
        key={"tittle"}
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
