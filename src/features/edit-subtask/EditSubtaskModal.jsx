import { useState, useEffect } from "react";
import { useOperation } from "../../customHooks/operation/useOperation";
import { useNavigate } from "react-router";
import SubtaskForm from "../../utils/SubtaskForm";
import Modal from "../../utils/Modal";
import { useTasks } from "../../customHooks/tasks/useTasks";

function EditSubtaskModal({ task }) {
  const navigate = useNavigate();
  const { updateSubtask, getSubtask } = useTasks();
  const { openEditSubTask, onCloseEditSubTask } = useOperation();
  const subtask = getSubtask(task.id);
  // Prefill form with subtask data
  const [form, setForm] = useState({
    title: subtask?.title || "",
    description: subtask?.description || "",
    dueDate: subtask?.dueDate || "",
    priority: subtask?.priority || "please select",
    completed: subtask?.completed || false,
    assignee: subtask?.assignee || "",
    parentTaskId: task.id,
  });

  // Update form if subtask prop changes
  useEffect(() => {
    setForm({
      title: subtask?.title || "",
      description: subtask?.description || "",
      dueDate: subtask?.dueDate || "",
      priority: subtask?.priority || "please select",
      completed: subtask?.completed || false,
      assignee: subtask?.assignee || "",
      parentTaskId: task.id,
    });
  }, [subtask, task.id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubtask = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const updatedSubtask = { ...form };
    await updateSubtask(task.id, subtask.id, updatedSubtask);
    onCloseEditSubTask();
    navigate(`/layout/${task.taskClass}`);
  };
  const isEdit = true;
  return (
    <>
      {openEditSubTask && (
        <Modal isOpen={openEditSubTask} onClose={onCloseEditSubTask}>
          <SubtaskForm
            header={"Edit Subtask"}
            task={task}
            isEdit={isEdit}
            submitLabel={"Save Changes"}
            onSubmit={handleEditSubtask}
            onSave={handleEditSubtask}
            onCancel={onCloseEditSubTask}
            handleInputChange={handleInputChange}
            form={form}
          />
        </Modal>
      )}
    </>
  );
}

export default EditSubtaskModal;
