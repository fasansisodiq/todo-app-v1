import TaskItem from "./TaskItem";

function TaskItems() {
  const tasks = [
    {
      id: 1,
      tittle: "reading",
      assignee: "myself",
      dueDate: "02/05/2025",
      taskClass: "personal",
      priority: "yes",
      description: "exam reading according to exam times table",
    },
    {
      id: 2,
      tittle: "wedding",
      assignee: "myself",
      dueDate: "22/05/2025",
      taskClass: "social",
      priority: "no",
      description: "kazeem wedding",
    },
    {
      id: 3,
      tittle: "bank app project",
      assignee: "myself",
      dueDate: "03/06/2025",
      taskClass: "planned",
      priority: "yes",
      description:
        "front-end design and development for bank of nigeria mobile app",
    },
  ];
  return (
    <div className=" ">
      <ul>
        {tasks.map((task, idx) => (
          <TaskItem task={task} key={idx + 1} idx={idx} />
        ))}
      </ul>
    </div>
  );
}

export default TaskItems;
