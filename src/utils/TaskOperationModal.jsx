import { useState } from "react";
import Subtasks from "../features/add-subtasks/Subtasks";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import Modal from "./Modal";
import TaskFormButtons from "./taskFormItems/TaskFormButtons";
import { useOperation } from "../customHooks/operation/useOperation";

const taskDetails = [
  { label: "summary", value: "description" },
  { label: "created date", value: "createdAt" },
  { label: "due date", value: "dueDate" },
  { label: "priority", value: "priority" },
  { label: "assignee", value: "assignee" },
  { label: "status", value: "status" },
  { label: "category", value: "taskClass" },
  // {labe: , value: },
];

function TaskOperationModal({
  onSave,
  task,
  submitLabel,
  taskModal,
  onCloseTaskOperationModal,
}) {
  // console.log(submitLabel.toString().toLowerCase());
  const [seeSubtask, setSeeSubtask] = useState(false);
  const { handleOpenSubTask } = useOperation();

  return (
    <>
      <Modal isOpen={taskModal.open} onClose={onCloseTaskOperationModal}>
        {taskModal.task && taskModal.open && (
          <div className="p-6 max-w-md mx-auto bg-white dark:bg-[#23272f] rounded-xl shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-emerald-700 dark:text-yellow-300">
              Task title :{" "}
              <span className="font-semibold">
                {capitalizeFirstLetter(taskModal.task.title)}
              </span>
            </h3>
            {taskDetails.map((field) => (
              <div key={field.label} className="mb-2 text-sm">
                <span className="font-semibold text-emerald-700 dark:text-yellow-200">
                  {capitalizeFirstLetter(field.label)} :
                </span>{" "}
                <span className="text-slate-700 dark:text-emerald-100">
                  {taskModal.task[field.value] || "none"}
                </span>
              </div>
            ))}
            <button
              className="text-blue-500  text-sm  italic"
              onClick={() => setSeeSubtask(!seeSubtask)}
            >
              {seeSubtask ? "see less" : "see more"}....
            </button>
            {seeSubtask && <Subtasks task={task} />}
            <div className="w-full rounded-2xl shadow-lg border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-[#1a2220] mb-4 transition-all p-2 md:p-6 md:pt-2 md:px-2 mt-4  text-center">
              <span
                className={`${
                  submitLabel.toString().toLowerCase() === " move to trash" &&
                  " text-red-700"
                } `}
              >
                Are you sure you want to carry out this action
                <span className="text-emerald-700 font-bold italic">
                  {" "}
                  "{submitLabel}"
                </span>{" "}
                for this task?
              </span>
              {submitLabel.toString().toLowerCase() === "edit" ? (
                <TaskFormButtons
                  submitLabel={submitLabel}
                  onSave={handleOpenSubTask}
                  disabled={!task.title && !task.description && !task.dueDate}
                  onCancel={onCloseTaskOperationModal}
                  type="link"
                  to={`${task.id}?id=${task.id}&title=${task.title}&assignee=${task.assignee}&dueDate=${task.dueDate}&description=${task.description}&priority=${task.priority}&taskClass=${task.taskClass}`}
                  className="text-base md:text-lg"
                />
              ) : (
                <TaskFormButtons
                  submitLabel={submitLabel}
                  onSave={() => onSave(submitLabel)}
                  disabled={!task.title && !task.description && !task.dueDate}
                  onCancel={onCloseTaskOperationModal}
                  className="text-base md:text-lg"
                />
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default TaskOperationModal;
