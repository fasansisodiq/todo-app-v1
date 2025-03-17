
import TableHeader from "./TableHeader";


function TaskOverviewHeader({ tittle }) {
  return (
    <div className="w-full text-emerald-600 relative ">
      <div className="flex justify-center items-center ">
        <h1 className="capitalize  text-[1rem] lg:text-3xl my-2 flex justify-center items-center font-bold">
          {tittle} task
        </h1>
      </div>
      <TableHeader />
    </div>
  );
}

export default TaskOverviewHeader;
