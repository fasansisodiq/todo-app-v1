function TaskOverviewHeader({ tittle }) {
  return (
    <div>
      <h1 className="capitalize text-3xl mt-2 flex justify-center items-center">
        {tittle} task
      </h1>
      <div className="flex justify-between items-center self-start ml-2 mt-4 gap-10 capitalize text-xl">
        <span>tittle</span>
        <span>assignee</span>
        <span>due date</span>
        <span>task class</span>
        <span>priority</span>
        <span>description</span>
      </div>
    </div>
  );
}

export default TaskOverviewHeader;
