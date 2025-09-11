import Input from "./Input";
import TextArea from "./TextArea";
import TaskFormButtons from "./taskFormItems/TaskFormButtons";

const SUBTASK_FIELDS = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "dueDate", label: "Due Date", type: "date" },
  { key: "assignee", label: "Assignee", type: "text" },
];

function SubtaskForm({
  header,
  task,
  onSubmit,
  onSave,
  onCancel,
  handleInputChange,
  form,
  submitLabel,
}) {
  return (
    <div
      className="bg-white dark:bg-[#23272f] rounded-lg p-6 shadow-lg w-full max-w-lg mx-auto"
      key={header}
    >
      {(header || task?.title) && (
        <h2 className="text-xl font-bold mb-4 text-emerald-700 dark:text-yellow-300">
          {header}
          {task?.title && <span className="font-semibold">: {task.title}</span>}
        </h2>
      )}

      <form onSubmit={onSubmit} className="space-y-3 mb-4">
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
          submitLabel={submitLabel}
          onSave={onSave}
          onCancel={onCancel}
          disabled={!form.title.trim() || form.priority === "please select"}
        />
      </form>
    </div>
  );
}

export default SubtaskForm;
