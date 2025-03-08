function Task() {
  const task = {
    tittle: "reading",
    assignee: "myself",
    dueDate: "02/05/2025",
    taskClass: "personal",
    priority: true,
    description: "exam reading according to exam times table",
  };
  return (
    <div className=" flex  justify-between items-center self-start ml-2 gap-12 capitalize text-[#183a1f] opacity-85">
      <span>{task.tittle}</span>
      <span>{task.assignee}</span>
      <span>{task.dueDate}</span>
      <span>{task.taskClass}</span>
      <span>{task.priority === true ? (task.priority = "important") : ""}</span>
      <span className="text-2">{task.description}</span>
    </div>
  );
}

export default Task;
