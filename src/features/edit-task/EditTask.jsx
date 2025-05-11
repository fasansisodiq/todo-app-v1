import { useNavigate, useSearchParams } from "react-router-dom";

import TaskForm from "../../utils/taskFormItems/TaskForm";
import TaskTitle from "../../utils/taskFormItems/TaskTitle";
import TaskAssignee from "../../utils/taskFormItems/TaskAssignee";
import TaskDueDate from "../../utils/taskFormItems/TaskDueDate";
import TaskFormButtons from "../../utils/TaskFormButtons";
import TextArea from "../../utils/taskFormItems/TextArea";
import TaskPriority from "../../utils/taskFormItems/TaskPriority";
import TaskClass from "../../utils/taskFormItems/TaskClass";

import { useOperation } from "../../customHooks/operation/useOperation";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { auth } from "../../firebase";
import { useState } from "react";

function EditTask() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { id, title, assignee, dueDate, description, priority, taskClass } =
    params;
  const updatedData = {
    title: title,
    assignee: assignee,
    dueDate: dueDate,
    taskClass: taskClass,
    priority: priority,
    description: description,
    completed: false,
    pending: false,
    userId: auth?.currentUser?.uid,
  };
  // console.log(updatedData);
  const [updatedTask, setUpdatedTask] = useState(updatedData);
  const { onCloseEdit, setOpenModal } = useOperation();
  const { updateTask } = useTasks();

  function handleSubmit(e) {
    e.preventDefault();
    updateTask(id, {
      title: updatedTask.title,
      assignee: updatedTask.assignee,
      dueDate: updatedTask.dueDate,
      taskClass: updatedTask.taskClass,
      priority: updatedTask.priority,
      description: updatedTask.description,
      completed: false,
      pending: false,
      userId: auth?.currentUser?.uid,
    });
    onCloseEdit();
    setOpenModal(null);
    navigate(-1);
  }
  // console.log(updatedTask);

  const handleEditChange = (e) => {
    setUpdatedTask({
      ...updatedTask,
      [e.target.name]: e.target.checked,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <TaskForm header={"edit task"} onSubmit={handleSubmit}>
        <TaskTitle onChange={handleEditChange} value={updatedTask.title} />
        <TaskAssignee
          onChange={handleEditChange}
          value={updatedTask.assignee}
        />
        <TaskDueDate
          onChange={handleEditChange}
          defaultValue={updatedTask.dueDate}
        />
        <div className=" self-start  px-auto lg:pl-3 ">
          <TaskClass
            value={updatedTask.taskClass}
            onChange={handleEditChange}
          />
        </div>
        <TaskPriority defaultChecked={priority} onChange={handleEditChange} />
        <TextArea onChange={handleEditChange} value={updatedTask.description} />
        <TaskFormButtons
          submitLabel={"save"}
          onSave={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </TaskForm>
    </>
  );
}

export default EditTask;
