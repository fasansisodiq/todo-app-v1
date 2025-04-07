import { useTodos } from "../customHooks/TodosContext";
import TaskOverviewHeader from "../ui/TaskOverviewHeader";
import TaskItem from "./TaskItem";

function TaskItems() {
  const {onOpen} = useTodos()
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
    <div className="flex flex-col gap-2 ">
      <TaskOverviewHeader />
      <ul>
        {tasks.map((task, idx) => (
          <TaskItem task={task} key={task.id} idx={idx} />
        ))}
      </ul>
    </div>
  );
}

export default TaskItems;
