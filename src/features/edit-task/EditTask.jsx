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

  const [updatedTask, setUpdatedTask] = useState(updatedData);
  const { onCloseEdit, setOpenModal } = useOperation();
  const { updateTask } = useTasks();

  function handleSubmit(e) {
    e.preventDefault();
    updateTask(id, {
      ...updatedTask,
      updatedAt: new Date().toISOString(),
    });
    onCloseEdit();
    setOpenModal(null);
    navigate(-1);
  }

  // Modern, robust change handler
  const handleEditChange = (e) => {
    const { name, type, value, checked } = e.target;
    setUpdatedTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/90 rounded-2xl shadow-2xl border border-emerald-100 p-6 md:p-10 mt-8 mb-8">
      <h2 className="text-xl md:text-2xl font-extrabold text-emerald-700 mb-4 text-center tracking-wide">
        Edit Task
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TaskTitle
          onChange={handleEditChange}
          value={updatedTask.title}
          className="text-base md:text-lg"
        />
        <div className="flex flex-col md:flex-row gap-3">
          <TaskAssignee
            onChange={handleEditChange}
            value={updatedTask.assignee}
            className="flex-1 text-base md:text-lg"
          />
          <TaskDueDate
            onChange={handleEditChange}
            defaultValue={updatedTask.dueDate}
            className="flex-1 text-base md:text-lg"
          />
        </div>

        <div className="flex-1">
          <TaskClass
            value={updatedTask.taskClass}
            onChange={handleEditChange}
            className="text-base md:text-lg"
          />
        </div>
        <div className="flex-1">
          <TaskPriority
            defaultChecked={priority}
            onChange={handleEditChange}
            className="text-base md:text-lg"
          />
        </div>

        <TextArea
          onChange={handleEditChange}
          value={updatedTask.description}
          className="min-h-[100px] text-base md:text-lg"
        />
        <div className="flex justify-end gap-3 mt-3">
          <TaskFormButtons
            submitLabel="Save"
            onSave={handleSubmit}
            onCancel={() => navigate(-1)}
            className="text-base md:text-lg"
          />
        </div>
      </form>
    </div>
  );
}

export default EditTask;
