import { useState } from "react";
import { useNavigate } from "react-router";

import Modal from "../../utils/Modal";
import { useOperation } from "../../customHooks/operation/useOperation";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../../customHooks/tasks/useTasks";
import Input from "../../utils/Input";
import TextArea from "../../utils/TextArea";
import TaskFormButtons from "../../utils/taskFormItems/TaskFormButtons";

const SUBTASK_FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "dueDate", label: "Due Date", type: "date" },
  { key: "assignee", label: "Assignee", type: "text" },
];

function AddSubTaskModal({ task }) {
  const navigate = useNavigate();
  const { openSubTask, onCloseSubTask } = useOperation();
  const { addNewSubtask } = useTasks();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "please select",
    completed: false,
    assignee: "",
    parentTaskId: task.id,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSubtask = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newSubtask = {
      // id: uuidv4(),
      ...form,
    };

    await addNewSubtask(task.id, newSubtask);
    onCloseSubTask();
    setForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "please select",
      completed: false,
      assignee: "",
    });
    navigate(`/layout/${task.taskClass}`);
  };

  return (
    <Modal isOpen={openSubTask} onClose={onCloseSubTask}>
      <div className="bg-white dark:bg-[#23272f] rounded-lg p-6 shadow-lg w-full max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4 text-emerald-700 dark:text-yellow-300">
          Add Subtasks to: <span className="font-semibold">{task?.title}</span>
        </h2>
        <form onSubmit={handleAddSubtask} className="space-y-3 mb-4">
          {SUBTASK_FIELDS.map((field) => (
            <div key={field.key}>
              <label
                className="block text-sm font-medium text-emerald-700 dark:text-yellow-200 mb-1"
                htmlFor={field.key}
              >
                {field.label}
              </label>
              {field.type === "text" && (
                <Input
                  id={field.key}
                  name={field.key}
                  type="text"
                  placeholder={`Enter subtask ${field.label.toLowerCase()}`}
                  value={form[field.key]}
                  onChange={handleInputChange}
                  required={field.required}
                  className="w-full rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#181f1b] text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400"
                />
              )}
              {field.type === "textarea" && (
                <TextArea
                  id={field.key}
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleInputChange}
                  placeholder={`Enter subtask ${field.label.toLowerCase()}`}
                  className="w-full rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#181f1b] text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400"
                />
              )}
              {field.type === "date" && (
                <Input
                  id={field.key}
                  name={field.key}
                  type="date"
                  value={form[field.key]}
                  onChange={handleInputChange}
                  className="w-full rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#181f1b] text-slate-800 dark:text-emerald-100"
                />
              )}
            </div>
          ))}

          {/* Priority and Completed in a single line */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-emerald-700 dark:text-yellow-200 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleInputChange}
                className="w-full rounded-lg px-3 py-2 border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#181f1b] text-slate-800 dark:text-emerald-100  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-700 dark:focus:ring-yellow-500"
                required
              >
                <option value="please select">please select</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <Input
                size="size-sm"
                id="completed"
                name="completed"
                type="checkbox"
                checked={form.completed}
                onChange={handleInputChange}
                className="accent-emerald-600"
              />
              <label
                htmlFor="completed"
                className="ml-2 text-sm font-medium text-emerald-700 dark:text-yellow-200"
              >
                Completed
              </label>
            </div>
          </div>

          <TaskFormButtons
            submitLabel="Add Subtask"
            onSave={handleAddSubtask}
            onCancel={onCloseSubTask}
            disabled={!form.title.trim() || form.priority === "please select"}
          />
        </form>
      </div>
    </Modal>
  );
}

export default AddSubTaskModal;
