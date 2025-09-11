import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../../firebase";
import { useState } from "react";

import Title from "../../utils/taskFormItems/Title";
import TaskAssignee from "../../utils/taskFormItems/Assignee";
import TaskDueDate from "../../utils/taskFormItems/TaskDueDate";
import TextArea from "../../utils/taskFormItems/Description";
import TaskPriority from "../../utils/taskFormItems/TaskPriority";
import TaskClass from "../../utils/taskFormItems/TaskClass";
import TaskFormButtons from "../../utils/taskFormItems/TaskFormButtons";

import { useOperation } from "../../customHooks/operation/useOperation";
import { useTasks } from "../../customHooks/tasks/useTasks";
import { useNotifications } from "../../customHooks/notification/useNotifications";
import TaskForm from "../../utils/taskFormItems/TaskForm";

function EditTask() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast, handleTaskModalClose } = useTasks();
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
    userId: auth?.currentUser?.uid,
    status: "",
  };

  const [updatedTask, setUpdatedTask] = useState(updatedData);
  const { onCloseEdit } = useOperation();
  const { updateTask } = useTasks();
  const { setUpdateCanceled } = useNotifications();

  function handleSubmit(e) {
    e.preventDefault();
    updateTask(id, {
      ...updatedTask,
      updatedAt: new Date().toLocaleString(),
    });
    onCloseEdit();
    handleTaskModalClose();
    navigate(-1);
    toast(`Task ${updatedTask.title} updated successfully`);
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
    <TaskForm header="Edit Task" onSubmit={handleSubmit}>
      <Title
        onChange={handleEditChange}
        value={updatedTask.title}
        className="text-base md:text-lg"
      />
      <TaskAssignee
        onChange={handleEditChange}
        value={updatedTask.assignee}
        className="flex-1 text-base md:text-lg"
      />
      <TaskDueDate
        onChange={handleEditChange}
        value={updatedTask.dueDate}
        className="flex-1 text-base md:text-lg"
      />
      <TaskClass
        value={updatedTask.taskClass}
        onChange={handleEditChange}
        className="text-base md:text-lg"
      />
      <TaskPriority
        checked={updatedTask.priority}
        onChange={handleEditChange}
        className="text-base md:text-lg"
      />
      <TextArea
        onChange={handleEditChange}
        value={updatedTask.description}
        className="min-h-[100px] text-base md:text-lg"
      />
      <TaskFormButtons
        submitLabel="Save"
        onSave={handleSubmit}
        disabled={!title && !description && !dueDate}
        onCancel={() => {
          setUpdateCanceled(true);
          handleTaskModalClose();
          navigate(`/layout/${taskClass.toLowerCase()}`);
        }}
        className="text-base md:text-lg"
      />
    </TaskForm>
  );
}

export default EditTask;
// <div className="w-full max-w-lg mx-auto bg-white/90 dark:bg-[#232b25] rounded-2xl shadow-2xl border border-emerald-100 dark:border-yellow-100 p-6 md:p-10 mt-8 mb-8">
//   <h2 className="text-xl md:text-2xl font-extrabold text-emerald-700 mb-4 text-center tracking-wide">
//     Edit Task
//   </h2>
//   <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//     <Title
//       onChange={handleEditChange}
//       value={updatedTask.title}
//       className="text-base md:text-lg"
//     />
//     <div className="flex flex-col md:flex-row gap-3">
//       <TaskAssignee
//         onChange={handleEditChange}
//         value={updatedTask.assignee}
//         className="flex-1 text-base md:text-lg"
//       />
//       <TaskDueDate
//         onChange={handleEditChange}
//         value={updatedTask.dueDate}
//         className="flex-1 text-base md:text-lg"
//       />
//     </div>

//     <div className="flex-1">
//       <TaskClass
//         value={updatedTask.taskClass}
//         onChange={handleEditChange}
//         className="text-base md:text-lg"
//       />
//     </div>
//     <div className="flex-1">
//       <TaskPriority
//         checked={updatedTask.priority}
//         onChange={handleEditChange}
//         className="text-base md:text-lg"
//       />
//     </div>

//     <TextArea
//       onChange={handleEditChange}
//       value={updatedTask.description}
//       className="min-h-[100px] text-base md:text-lg"
//     />
//     <div className="flex justify-end gap-3 mt-3">
//       <TaskFormButtons
//         submitLabel="Save"
//         onSave={handleSubmit}
//         disabled={!title && !description && !dueDate}
//         onCancel={() => {
//           setUpdateCanceled(true);
//           handleTaskModalClose();
//           navigate(`/layout/${taskClass.toLowerCase()}`);
//         }}
//         className="text-base md:text-lg"
//       />
//     </div>
//   </form>
// </div>
