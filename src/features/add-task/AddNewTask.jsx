import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import { useTasks } from "../../customHooks/tasks/useTasks";
import TaskForm from "../../utils/taskFormItems/TaskForm";
import TaskTitle from "../../utils/taskFormItems/TaskTitle";
import TaskAssignee from "../../utils/taskFormItems/TaskAssignee";
import TaskDueDate from "../../utils/taskFormItems/TaskDueDate";
import TaskClass from "../../utils/taskFormItems/TaskClass";
import TaskPriority from "../../utils/taskFormItems/TaskPriority";
import TextArea from "../../utils/taskFormItems/TextArea";
import TaskFormButtons from "../../utils/TaskFormButtons";

function AddNewTask() {
  const navigate = useNavigate();

  const { task, setTask, addNewTask, handleChange } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTaskData = {
      title: task.title,
      assignee: task.assignee,
      dueDate: task.dueDate,
      taskClass: task.taskClass,
      priority: task.priority,
      description: task.description,
      completed: false,
      pending: false,
      userId: auth?.currentUser?.uid,
    };

    addNewTask(newTaskData);
    setTask({
      title: "",
      assignee: "",
      dueDate: "",
      taskClass: "",
      priority: false,
      description: "",
      completed: false,
      pending: false,
    });
    navigate(`/layout/${task.taskClass}`);
  };

  return (
    <TaskForm header={"add new task"} onSubmit={handleSubmit}>
      <TaskTitle onChange={handleChange} value={task.title} />
      <TaskAssignee onChange={handleChange} value={task.assignee} />
      <TaskDueDate onChange={handleChange} value={task.dueDate} />
      <div className=" self-start  px-auto lg:pl-3 ">
        <TaskClass onChange={handleChange} value={task.taskClass} />
      </div>
      <TaskPriority onChange={handleChange} checked={task.priority} />
      <TextArea onChange={handleChange} value={task.description} />
      <TaskFormButtons
        submitLabel={"add task"}
        onSave={handleSubmit}
        onCancel={() => navigate(`/layout/${task.taskClass}`)}
      />
    </TaskForm>
  );
}

export default AddNewTask;
