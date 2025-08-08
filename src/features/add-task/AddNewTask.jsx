import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useTasks } from "../../customHooks/tasks/useTasks";

import TaskForm from "../../utils/taskFormItems/TaskForm";
import Title from "../../utils/taskFormItems/Title";
import TaskAssignee from "../../utils/taskFormItems/Assignee";
import TaskDueDate from "../../utils/taskFormItems/TaskDueDate";
import TaskClass from "../../utils/taskFormItems/TaskClass";
import TaskPriority from "../../utils/taskFormItems/TaskPriority";
import Description from "../../utils/taskFormItems/Description";
import TaskFormButtons from "../../utils/taskFormItems/TaskFormButtons";

function AddNewTask() {
  const navigate = useNavigate();

  const {
    task,
    setTask,
    addNewTask,
    handleChange,
    handleCancel,
    initialTaskState,
  } = useTasks();

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
      status: "in progress",
      userId: auth?.currentUser?.uid,
      createdBy: auth?.currentUser?.uid,
      createdAt: new Date().toLocaleString(),
    };

    // Add the new task to Firestore
    await addNewTask(newTaskData);

    // Reset form
    setTask(initialTaskState);

    navigate(`/layout/${task.taskClass}`);
  };

  function onHandleCancel() {
    setTask(initialTaskState);
    handleCancel(task.taskClass);
  }
  return (
    <TaskForm header="add new task" onSubmit={handleSubmit}>
      <Title onChange={handleChange} value={task.title || ""} />
      <TaskAssignee onChange={handleChange} value={task.assignee || ""} />
      <TaskDueDate onChange={handleChange} value={task.dueDate || ""} />
      <TaskClass onChange={handleChange} value={task.taskClass || ""} />
      <Description onChange={handleChange} value={task.description || ""} />
      <TaskPriority onChange={handleChange} checked={task.priority || ""} />
      <TaskFormButtons
        submitLabel="add task"
        onSave={handleSubmit}
        onCancel={onHandleCancel}
        disabled={
          !task.title.trim() && !task.description.trim() && !task.dueDate
        }
      />
    </TaskForm>
  );
}

export default AddNewTask;
