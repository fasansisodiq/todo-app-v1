import EditTaskOperation from "../../features/edit-task/EditTaskOperation";
import CompletedTaskOperation from "../../features/mark-as-completed/CompletedTaskOperation";
import PendingTaskOperation from "../../features/mark-as-pending/PendingTaskOperation";
import TaskDescriptionOperation from "./taskDescription/TaskDescriptionOperation";
import TempDeleteTaskOperation from "../../features/move-task-to-trash/TempDeleteTaskOperation";
import ShareTaskOperation from "../../features/share-task/ShareTaskOperation";

function TaskOperations({ task, description, title }) {
  const taskOperations = [
    { label: "Task Description", component: TaskDescriptionOperation },
    { label: "Edit Task", component: EditTaskOperation },
    { label: "Mark as Completed", component: CompletedTaskOperation },
    { label: "Mark as Pending", component: PendingTaskOperation },
    { label: "Temporary Delete Task", component: TempDeleteTaskOperation },
    { label: "Share Task", component: ShareTaskOperation },
  ];
  return (
    <div className={`w-full h-full text-center  flex flex-col gap-2`}>
      <h1 className="self-center pt-4 text-emerald-700 dark:text-yellow-300 font-semibold capitalize text-[1.4rem] sm:text-lg md:text-xl lg:text-2xl xl:text-3xl ">
        task operations
      </h1>
      <div className="flex flex-col lg:gap-2 justify-center items-center w-full h-full">
        {taskOperations.map((operation, index) => {
          const OperationComponent = operation.component;
          return (
            <OperationComponent
              key={index}
              title={title}
              id={task.id}
              task={task}
              description={description}
            />
          );
        })}

        {/* <TaskDescriptionOperation description={description} title={title} />
        <EditTaskOperation title={title} id={task.id} task={task} />
        <TempDeleteTaskOperation title={title} id={task.id} task={task} />
        <CompletedTaskOperation title={title} id={task.id} task={task} />
        <PendingTaskOperation title={title} id={task.id} task={task} /> */}
      </div>
    </div>
  );
}

export default TaskOperations;
// dark:bg-[#232b25]
