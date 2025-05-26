import { useTasks } from "../../customHooks/tasks/useTasks";
import TableHeader from "./TableHeader";

function TaskOverviewHeader() {
  const { task } = useTasks();

  return (
    <section className="w-full text-emerald-600 relative">
      <header className="flex justify-center items-center">
        <h1 className="capitalize text-base lg:text-2xl my-2 font-bold">
          {task?.title} tasks
        </h1>
      </header>
      <TableHeader />
    </section>
  );
}

export default TaskOverviewHeader;
