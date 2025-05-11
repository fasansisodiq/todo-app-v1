import { useTasks } from "../../customHooks/tasks/useTasks";
import TableHeader from "./TableHeader";

function TaskOverviewHeader() {
  const { task } = useTasks();
  return (
    <div className="w-full text-emerald-600 relative ">
      <div className="flex justify-center items-center ">
        <h1 className="capitalize  text-[1rem] lg:text-2xl my-2 flex justify-center items-center font-bold">
          {task?.title} tasks
        </h1>
      </div>
      <TableHeader />
    </div>
  );
}

export default TaskOverviewHeader;
